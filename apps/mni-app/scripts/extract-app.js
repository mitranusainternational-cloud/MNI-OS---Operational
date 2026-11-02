#!/usr/bin/env node
/**
 * MNI Gudang - Extract App Script
 *
 * Menyiapkan public/app.js, public/app.css, dan public/app-body.html yang
 * dimuat oleh index.html (lihat bootstrap di index.html).
 *
 * SUMBER KEBENARAN UI: ../gudang-logistik/ (index.html, assets/css/app.css,
 * assets/js/app.js). Lihat documentation/DECISIONS.md (2026-11-02). Folder
 * gudang-logistik/reference/ hanya salinan HTML lama (15 dari 20 koleksi)
 * dan tidak dipakai untuk build.
 *
 * USAGE:
 *   node scripts/extract-app.js                       # default: ../gudang-logistik
 *   node scripts/extract-app.js --source /path/to/app # folder dengan index.html + assets/
 *   node scripts/extract-app.js --input file.html     # mode lama: satu file HTML
 *
 * app.js dimuat sebagai script biasa (global scope): aplikasi memakai global
 * seperti window.claude.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};

const OUT = resolve(ROOT, 'public');
const fail = (msg) => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

let css;
let js;
let bodyHtml;
let origin;

function bodyFragment(html) {
  const m = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return (m ? m[1] : '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<(meta|link)\b[^>]*>/gi, '')
    .trim();
}

if (arg('--input')) {
  // Mode lama: satu file HTML dengan <style> dan <script> inline.
  const file = resolve(arg('--input'));
  if (!existsSync(file)) fail(`File tidak ditemukan: ${file}`);
  const html = readFileSync(file, 'utf-8');
  css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n\n');
  js = [...html.matchAll(/<script(?![^>]*\bsrc\b)(?![^>]*\btype="module"\b)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .join('\n\n');
  bodyHtml = bodyFragment(html);
  origin = file;
} else {
  const dir = resolve(arg('--source') || resolve(ROOT, '..', 'gudang-logistik'));
  const paths = {
    html: resolve(dir, 'index.html'),
    css: resolve(dir, 'assets', 'css', 'app.css'),
    js: resolve(dir, 'assets', 'js', 'app.js'),
  };
  for (const p of Object.values(paths)) if (!existsSync(p)) fail(`Sumber tidak lengkap, tidak ada: ${p}`);
  css = readFileSync(paths.css, 'utf-8');
  js = readFileSync(paths.js, 'utf-8');
  bodyHtml = bodyFragment(readFileSync(paths.html, 'utf-8'));
  origin = dir;
}

if (!js.trim()) fail('JavaScript aplikasi kosong; sumber tidak sesuai.');
if (!bodyHtml) fail('Body HTML kosong; sumber tidak sesuai.');

mkdirSync(OUT, { recursive: true });
writeFileSync(resolve(OUT, 'app.css'), `/* Dihasilkan oleh scripts/extract-app.js — jangan edit; ubah sumbernya lalu jalankan ulang */\n${css}`, 'utf-8');
writeFileSync(resolve(OUT, 'app.js'), `/* Dihasilkan oleh scripts/extract-app.js — jangan edit; ubah sumbernya lalu jalankan ulang */\n${js}`, 'utf-8');
writeFileSync(resolve(OUT, 'app-body.html'), bodyHtml, 'utf-8');

console.log('📦 MNI Gudang - Extract App');
console.log('   Sumber:', origin);
console.log(`✅ app.css ${css.length} | app.js ${js.length} | app-body.html ${bodyHtml.length} karakter`);
