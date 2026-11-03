#!/usr/bin/env node
// Memeriksa kesehatan vault: wikilink rusak/ambigu, properti wajib, catatan yatim.
// Pakai: node scripts/check-vault.mjs [--write]   (--write menulis documentation/VAULT_HEALTH.md)
// Kode keluar 1 bila ada link rusak atau properti wajib hilang.

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { dirname, relative, resolve, basename, extname, sep } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.obsidian', '.playwright-mcp', 'private-sources']);
// Catatan vault yang wajib punya properti. Folder lain (kode aplikasi, skill) dilewati.
const REQUIRE_PROPS = {
  'documentation/': ['type', 'status', 'updated'],
  'research/': ['type', 'status'],
  'roadmap/': ['type', 'status', 'updated'],
  'tasks/': ['type', 'id', 'status', 'phase', 'updated'],
};
const POSIX = (p) => p.split(sep).join('/');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT).map((f) => POSIX(relative(ROOT, f)));
const notes = files.filter((f) => extname(f) === '.md');
const byBase = new Map(); // nama tanpa ekstensi (lowercase) -> [path]
for (const f of files) {
  const keys = [basename(f, extname(f)).toLowerCase(), basename(f).toLowerCase()];
  for (const k of new Set(keys)) byBase.set(k, [...(byBase.get(k) || []), f]);
}
const allPaths = new Set(files.map((f) => f.toLowerCase()));
const noExt = new Set(files.map((f) => f.replace(/\.md$/, '').toLowerCase()));

function stripCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}
function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const o = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w_-]+):/);
    if (kv) o[kv[1]] = true;
  }
  return o;
}

const broken = [];
const ambiguous = [];
const missingProps = [];
const inbound = new Map(notes.map((n) => [n, 0]));

for (const note of notes) {
  if (note === 'documentation/VAULT_HEALTH.md') continue; // laporan hasil skrip ini sendiri
  const text = readFileSync(resolve(ROOT, note), 'utf8');
  const fm = frontmatter(text);
  for (const [prefix, props] of Object.entries(REQUIRE_PROPS)) {
    if (!note.startsWith(prefix)) continue;
    if (/(^|\/)README\.md$/.test(note) && prefix === 'documentation/' && note.includes('/screenshots/')) continue;
    const missing = props.filter((p) => !fm || !fm[p]);
    if (missing.length) missingProps.push(`${note}: ${fm ? 'kurang ' + missing.join(', ') : 'tanpa properti'}`);
  }
  const body = stripCode(text.replace(/^---[\s\S]*?\r?\n---/, ''));
  for (const m of body.matchAll(/!?\[\[([^\]\n]+?)\]\]/g)) {
    let target = m[1].split('|')[0].split('#')[0].replace(/\\$/, '').trim();
    if (!target) continue; // [[#heading]] di catatan yang sama
    const lower = target.toLowerCase();
    let hit = null;
    if (allPaths.has(lower)) hit = lower;
    else if (noExt.has(lower)) hit = files.find((f) => f.replace(/\.md$/, '').toLowerCase() === lower);
    else if (lower.includes("/") && files.filter((f) => f.replace(/.md$/, "").toLowerCase().endsWith("/" + lower)).length === 1) {
      // Obsidian menerima path parsial dari belakang, mis. [[screenshots/README]].
      hit = files.find((f) => f.replace(/.md$/, "").toLowerCase().endsWith("/" + lower));
    } else {
      const c = byBase.get(lower.replace(/\.md$/, '')) || byBase.get(lower);
      if (c && c.length === 1) hit = c[0];
      else if (c && c.length > 1) {
        // Obsidian memilih path terpendek; lapor sebagai ambigu agar ditulis dengan path.
        ambiguous.push(`${note}: [[${target}]] cocok dengan ${c.join(', ')}`);
        hit = c.slice().sort((a, b) => a.length - b.length)[0];
      }
    }
    if (!hit) broken.push(`${note}: [[${target}]]`);
    else if (inbound.has(hit)) inbound.set(hit, inbound.get(hit) + (hit === note ? 0 : 1));
  }
}

const skipOrphan = (n) => /(^|\/)README\.md$/.test(n) || n.startsWith('tasks/') || n.startsWith('.agents/') || n.startsWith('.claude/') || n === 'CLAUDE.md' || n.startsWith('apps/platform/') || n.startsWith('documentation/templates/') || n === 'Home.md' || n === 'AGENTS.md';
const orphans = [...inbound].filter(([n, c]) => c === 0 && !skipOrphan(n)).map(([n]) => n);

const section = (title, list) => `## ${title} (${list.length})\n\n${list.length ? list.map((x) => `- ${x}`).join('\n') : '- Tidak ada'}\n`;
const report = [
  section('Wikilink rusak', broken),
  section('Wikilink ambigu (tulis dengan path)', ambiguous),
  section('Properti wajib hilang', missingProps),
  section('Catatan yatim (tidak ditautkan dari mana pun)', orphans),
].join('\n');

console.log(`Catatan: ${notes.length} | rusak: ${broken.length} | ambigu: ${ambiguous.length} | properti: ${missingProps.length} | yatim: ${orphans.length}`);
if (process.argv.includes('--write')) {
  writeFileSync(
    resolve(ROOT, 'documentation', 'VAULT_HEALTH.md'),
    `---\ntype: vault-health\nstatus: active\nupdated: ${new Date().toISOString().slice(0, 10)}\n---\n\n# Kesehatan vault\n\n> Dibuat oleh \`node scripts/check-vault.mjs --write\`. Jangan edit manual. Target: rusak 0, properti 0.\n\n${report}`
  );
} else console.log('\n' + report);
process.exitCode = broken.length || missingProps.length ? 1 : 0;
