#!/usr/bin/env node
// Membaca tasks/*.md (properti YAML) dan menulis documentation/PROGRESS_SNAPSHOT.md.
// Sumber kebenaran status = catatan di tasks/. Snapshot ini turunan; jangan edit manual.
// Pakai: node scripts/progress-report.mjs

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PHASES = {
  P0: 'Workspace dan tracking', P1: 'Fondasi lokal', P2: 'Aplikasi siap uji', P3: 'Data dan proses',
  P4: 'Environment cloud', P5: 'UAT pilot', P6: 'Hardening dan rilis', P7: 'Operasi dan dokumentasi',
  P8: 'v1.1 Stabilisasi, akses, kualitas data', P9: 'v1.2 Integrasi dan pelaporan', P10: 'v2.0 Modernisasi dan perluasan',
};
const STATUSES = ['todo', 'doing', 'blocked', 'review', 'done'];

function parse(file, kind = 'task') {
  const m = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const o = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w_]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('[')) v = v.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    else v = v.replace(/^"|"$/g, '');
    o[kv[1]] = v;
  }
  return o.type === kind ? o : null;
}

const dir = resolve(ROOT, 'tasks');
const tasks = readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parse(resolve(dir, f))).filter(Boolean);
const byId = Object.fromEntries(tasks.map((t) => [t.id, t]));
const eff = (t) => Number(t.effort_days) || 0;
const sum = (a) => a.reduce((s, t) => s + eff(t), 0);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const problems = [];
for (const t of tasks) {
  if (!STATUSES.includes(t.status)) problems.push(`${t.id}: status "${t.status}" tidak dikenal`);
  if (!PHASES[t.phase]) problems.push(`${t.id}: fase "${t.phase}" tidak dikenal`);
  for (const d of t.depends || []) if (!byId[d]) problems.push(`${t.id}: dependensi ${d} tidak ada`);
}

const done = tasks.filter((t) => t.status === 'done');
const open = tasks.filter((t) => t.status !== 'done');
const ready = (t) => (t.depends || []).every((d) => byId[d] && byId[d].status === 'done');
const prioRank = { P0: 0, P1: 1, P2: 2 };

// Jalur kritis: rantai dependensi terpanjang (menurut effort_days) di antara tugas yang belum selesai.
const memo = {};
function longest(id) {
  if (memo[id]) return memo[id];
  const t = byId[id];
  let best = { days: 0, path: [] };
  for (const d of t.depends || []) {
    if (byId[d] && byId[d].status !== 'done') {
      const r = longest(d);
      if (r.days > best.days) best = r;
    }
  }
  return (memo[id] = { days: best.days + eff(t), path: [...best.path, id] });
}
let crit = { days: 0, path: [] };
// Jalur kritis menuju go-live (T-065), bukan tugas pasca-rilis.
const GOLIVE = "T-065";
for (const t of open.filter((x) => x.id === GOLIVE)) {
  const r = longest(t.id);
  if (r.days > crit.days) crit = r;
}

const fileOf = {};
for (const f of readdirSync(dir)) fileOf[f.slice(0, 5)] = f.replace(/\.md$/, '');
const L = (t) => `[[tasks/${fileOf[t.id]}|${t.id}]] ${t.title}`;

let out = `---
type: progress-snapshot
status: generated
updated: ${new Date().toISOString().slice(0, 10)}
generated: ${new Date().toISOString().slice(0, 10)}
---

# Snapshot progress

> Dibuat otomatis oleh \`node scripts/progress-report.mjs\` dari catatan di \`tasks/\`. Jangan edit manual; ubah status di catatan tugas lalu jalankan ulang. Tampilan interaktif: [[PROGRESS_DASHBOARD]]. Rencana: [[GO_LIVE_PLAN]] dan [[roadmap/PRODUCT_ROADMAP]].

## Ringkasan

- Tugas selesai: **${done.length} / ${tasks.length}** (${pct(done.length, tasks.length)}%)
- Bobot effort selesai: **${sum(done)} / ${sum(tasks)} hari kerja** (${pct(sum(done), sum(tasks))}%)
- Sisa effort: **${sum(open)} hari kerja**; jalur kritis sisa menuju go-live (T-065): **${crit.days} hari kerja** (${crit.path.join(' → ') || '-'})
- Cakupan go-live (fase P0-P7): **${tasks.filter((t) => /^P[0-7]$/.test(t.phase) && t.status === 'done').length} / ${tasks.filter((t) => /^P[0-7]$/.test(t.phase)).length}** tugas selesai; tugas pasca go-live (P8-P10) sengaja dijadwalkan ulang setelah hypercare.
- Diblokir: **${tasks.filter((t) => t.status === 'blocked').length}**, sedang dikerjakan: **${tasks.filter((t) => t.status === 'doing').length}**
- Estimasi effort bersifat indikatif dan belum memuat waktu tunggu pihak lain.

## Per fase

| Fase | Selesai | Effort selesai | Status |
|---|---|---|---|
`;
for (const [k, name] of Object.entries(PHASES)) {
  const ts = tasks.filter((t) => t.phase === k);
  const d = ts.filter((t) => t.status === 'done');
  out += `| ${k} ${name} | ${d.length}/${ts.length} | ${sum(d)}/${sum(ts)} hari (${pct(sum(d), sum(ts))}%) | ${d.length === ts.length ? 'selesai' : ts.some((t) => t.status === 'blocked') ? 'ada blocker' : d.length ? 'berjalan' : 'belum mulai'} |\n`;
}

// ---- Per rilis dan per epic -------------------------------------------------
const RELEASES = { 'v0.9': 'Fondasi', 'v1.0': 'Pilot go-live', 'v1.1': 'Stabilisasi, akses, kualitas data', 'v1.2': 'Integrasi dan pelaporan', 'v2.0': 'Modernisasi dan perluasan' };
const epicDir = resolve(ROOT, 'roadmap', 'epics');
const epics = [];
try {
  for (const f of readdirSync(epicDir).filter((x) => x.endsWith('.md'))) {
    const e = parse(resolve(epicDir, f), 'epic');
    if (e) epics.push({ ...e, file: f.replace(/\.md$/, '') });
  }
} catch { /* belum ada roadmap/epics */ }
const epicIds = new Set(epics.map((e) => e.id));
for (const t of tasks) {
  if (!t.epic) problems.push(`${t.id}: tidak punya epic`);
  else if (!epicIds.has(t.epic)) problems.push(`${t.id}: epic ${t.epic} tidak ada`);
  else if (epics.find((e) => e.id === t.epic).release !== t.release) problems.push(`${t.id}: release ${t.release} berbeda dengan epic ${t.epic}`);
}
const state = (ts) => {
  const d = ts.filter((t) => t.status === 'done').length;
  return !ts.length ? 'planned' : d === ts.length ? 'done' : ts.some((t) => t.status !== 'todo') ? 'active' : 'planned';
};
out += `\n## Per rilis\n\n| Rilis | Tema | Tugas | Effort | Status |\n|---|---|---|---|---|\n`;
for (const [rel, name] of Object.entries(RELEASES)) {
  const ts = tasks.filter((t) => t.release === rel);
  const d = ts.filter((t) => t.status === 'done');
  out += `| ${rel} | ${name} | ${d.length}/${ts.length} | ${sum(d)}/${sum(ts)} hari (${pct(sum(d), sum(ts))}%) | ${state(ts)} |\n`;
}
out += `\n## Per epic\n\n| Epic | Rilis | Tugas | Progress | Status |\n|---|---|---|---|---|\n`;
for (const e of epics.sort((a, b) => a.id.localeCompare(b.id))) {
  const ts = tasks.filter((t) => t.epic === e.id);
  const d = ts.filter((t) => t.status === 'done');
  const p = pct(sum(d), sum(ts));
  out += `| [[roadmap/epics/${e.file}\\|${e.id}]] ${e.title} | ${e.release} | ${d.length}/${ts.length} | ${p}% | ${state(ts)} |\n`;
  // Tulis ulang properti turunan dan daftar tugas pada catatan epic.
  const p2 = resolve(epicDir, e.file + '.md');
  let txt = readFileSync(p2, 'utf8');
  const set = (k, v) => { txt = txt.replace(new RegExp(`^${k}: .*$`, 'm'), `${k}: ${v}`); };
  set('status', state(ts)); set('progress', p); set('tasks_total', ts.length); set('tasks_done', d.length);
  set('updated', new Date().toISOString().slice(0, 10));
  const list = ts.sort((a, b) => a.id.localeCompare(b.id)).map((t) => `- [${t.status === 'done' ? 'x' : ' '}] ${L(t)} · ${t.status} · ${t.priority} · ${t.effort_days} hari`).join('\n');
  txt = txt.replace(/## Tugas[\s\S]*$/, `## Tugas\n\n${list}\n\n> Properti status, progress, dan jumlah tugas serta daftar ini dibuat otomatis oleh \`node scripts/progress-report.mjs\`. Jangan ubah manual. Tampilan interaktif: [[PROGRESS_DASHBOARD]].\n`);
  writeFileSync(p2, txt);
}

const next = open.filter((t) => t.status === 'todo' && ready(t)).sort((a, b) => (prioRank[a.priority] - prioRank[b.priority]) || a.id.localeCompare(b.id));
out += `\n## Siap dikerjakan sekarang (dependensi terpenuhi)\n\n`;
out += next.length ? next.map((t) => `- ${t.priority} · ${L(t)} · ${t.effort_days} hari · ${t.owner}`).join('\n') : '- Tidak ada';

for (const [title, st] of [['Sedang dikerjakan', 'doing'], ['Diblokir', 'blocked'], ['Menunggu review', 'review']]) {
  const ts = tasks.filter((t) => t.status === st);
  out += `\n\n## ${title}\n\n` + (ts.length ? ts.map((t) => `- ${L(t)} · ${t.owner}`).join('\n') : '- Tidak ada');
}

out += `\n\n## Tugas P0 yang belum selesai\n\n` + (open.filter((t) => t.priority === 'P0').map((t) => `- ${L(t)} · ${t.status}${ready(t) ? '' : ' · menunggu ' + (t.depends || []).filter((d) => byId[d].status !== 'done').join(', ')}`).join('\n') || '- Tidak ada');

if (problems.length) out += `\n\n## Masalah data tugas\n\n` + problems.map((p) => `- ${p}`).join('\n');
writeFileSync(resolve(ROOT, 'documentation', 'PROGRESS_SNAPSHOT.md'), out + '\n');
console.log(`OK: ${tasks.length} tugas, ${done.length} selesai, jalur kritis ${crit.days} hari${problems.length ? `, ${problems.length} masalah` : ''}`);
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
