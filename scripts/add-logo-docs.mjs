// Menambahkan logo PT Mitra Nusa Internasional di bagian atas dokumen vault (setelah frontmatter). Aman dijalankan ulang.
//   node scripts/add-logo-docs.mjs
// Dokumen yang dibuat otomatis (PROGRESS_SNAPSHOT, PROGRESS_DASHBOARD, VAULT_HEALTH) dilewati: dibuat ulang oleh skrip lain.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd(); // jalankan dari akar repo
const LOGO = 'documentation/assets/logo-mni.png';
if (!fs.existsSync(path.join(root, LOGO))) { console.error('Logo tidak ada di ' + LOGO); process.exit(1); }

const skip = new Set(['PROGRESS_SNAPSHOT.md', 'PROGRESS_DASHBOARD.md', 'VAULT_HEALTH.md']);
const files = [];
for (const f of ['README.md', 'Home.md', 'CHANGELOG.md', 'SECURITY.md']) if (fs.existsSync(path.join(root, f))) files.push(f);
for (const dir of ['documentation', 'documentation/templates', 'roadmap']) {
  const d = path.join(root, dir);
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d)) if (f.endsWith('.md') && !skip.has(f)) files.push(path.posix.join(dir, f));
}

let changed = 0;
for (const rel of files) {
  const p = path.join(root, rel);
  let t = fs.readFileSync(p, 'utf8');
  if (t.includes('logo-mni.png')) continue;
  const from = path.posix.dirname(rel);
  const href = path.posix.relative(from === '.' ? '' : from, LOGO) || LOGO;
  const img = `<img src="${href}" alt="PT Mitra Nusa Internasional" width="190">\n\n`;
  const m = t.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  t = m ? t.slice(0, m[0].length) + '\n' + img + t.slice(m[0].length).replace(/^\s*\n/, '') : img + t;
  fs.writeFileSync(p, t);
  changed++;
}
console.log(`Logo ditambahkan ke ${changed} dokumen (dari ${files.length} yang diperiksa).`);
