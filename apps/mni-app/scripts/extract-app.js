#!/usr/bin/env node
/**
 * MNI Gudang - Extract App Script
 *
 * The original mni-gudang.html is a single-file app.
 * This script extracts the <script> content from it and
 * writes it to public/app.js so Vite can serve it.
 *
 * USAGE:
 *   node scripts/extract-app.js
 *   node scripts/extract-app.js --input ./path/to/mni-gudang.html
 *
 * The extracted app.js is a non-module script (global scope),
 * intentionally — the original app uses globals like window.claude.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const args = process.argv.slice(2);
const inputIdx = args.indexOf('--input');
const INPUT = inputIdx >= 0
  ? resolve(args[inputIdx + 1])
  : resolve(ROOT, '..', 'mni-gudang.html'); // default: sibling of mni-app/

const OUTPUT_JS = resolve(ROOT, 'public', 'app.js');
const OUTPUT_CSS = resolve(ROOT, 'public', 'app.css');

console.log('📦 MNI Gudang - Extract App');
console.log('   Input:', INPUT);
console.log('   Output JS:', OUTPUT_JS);
console.log('   Output CSS:', OUTPUT_CSS);

let html;
try {
  html = readFileSync(INPUT, 'utf-8');
} catch (e) {
  console.error(`\n❌ Cannot read input file: ${INPUT}`);
  console.error('   Pastikan mni-gudang.html ada di:', resolve(ROOT, '..'));
  console.error('   Atau jalankan dengan: node scripts/extract-app.js --input /path/to/mni-gudang.html\n');
  process.exit(1);
}

// ── Extract <style> blocks ────────────────────────────────────────────────────
const styleMatches = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
const css = styleMatches.map(m => m[1]).join('\n\n');

// ── Extract <script> blocks (non-src, non-type=module) ────────────────────────
// We want the inline scripts — the main app logic
const scriptMatches = [...html.matchAll(/<script(?![^>]*\bsrc\b)(?![^>]*\btype="module"\b)[^>]*>([\s\S]*?)<\/script>/gi)];
const js = scriptMatches.map(m => m[1]).join('\n\n');

// ── Extract <body> HTML (non-script, non-style) ───────────────────────────────
// Get body content for HTML injection
let bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
let bodyHtml = bodyMatch ? bodyMatch[1] : '';

// Remove script and style tags from body HTML
bodyHtml = bodyHtml
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .trim();

// ── Write outputs ─────────────────────────────────────────────────────────────
mkdirSync(resolve(ROOT, 'public'), { recursive: true });

// CSS
if (css.trim()) {
  writeFileSync(OUTPUT_CSS, `/* Auto-extracted from mni-gudang.html */\n${css}`, 'utf-8');
  console.log(`✅ CSS written: ${css.length} chars`);
} else {
  console.log('⏭  No CSS found');
}

// JS
const jsHeader = `/* Auto-extracted from mni-gudang.html — DO NOT EDIT DIRECTLY */
/* Edit the source file and re-run: node scripts/extract-app.js */

`;

writeFileSync(OUTPUT_JS, jsHeader + js, 'utf-8');
console.log(`✅ JS written: ${js.length} chars`);

// HTML fragment (for reference / future SPA builds)
const htmlFragOutput = resolve(ROOT, 'public', 'app-body.html');
writeFileSync(htmlFragOutput, bodyHtml, 'utf-8');
console.log(`✅ Body HTML written: ${bodyHtml.length} chars`);

console.log('\n✨ Done! Files ready in public/');
console.log('   Run: npm run dev');
