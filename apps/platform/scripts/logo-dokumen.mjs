// Membuat versi logo 600 px (logo-dokumen.png) untuk dokumen cetak dan ekspor, lalu menanamkannya sebagai LOGO_B64
// di apps/gudang-logistik/assets/js/app.js. Jalankan dari apps/platform bila logo-mni.png diganti:
//   node scripts/logo-dokumen.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';

const src = fs.readFileSync('public/logo-mni.png').toString('base64');
const b = await chromium.launch();
const p = await b.newPage();
const b64 = await p.evaluate(async (s) => {
  const img = new Image(); img.src = 'data:image/png;base64,' + s; await img.decode();
  const W = 600, H = Math.round(img.naturalHeight * W / img.naturalWidth);
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(img, 0, 0, W, H);
  return c.toDataURL('image/png').split(',')[1];
}, src);
await b.close();

fs.writeFileSync('public/logo-dokumen.png', Buffer.from(b64, 'base64'));
const appJs = '../gudang-logistik/assets/js/app.js';
let t = fs.readFileSync(appJs, 'utf8');
const re = /const LOGO_B64='[A-Za-z0-9+\/=]+';/;
if (!re.test(t)) throw new Error('LOGO_B64 tidak ditemukan di app.js');
t = t.replace(re, () => `const LOGO_B64='${b64}';`);
fs.writeFileSync(appJs, t);
console.log('logo dokumen 600 px,', Math.round(b64.length / 1024), 'KB base64, tertanam di app.js');
