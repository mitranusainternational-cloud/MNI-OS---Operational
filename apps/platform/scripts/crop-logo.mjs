// Membuat logo-mni-mark.png (lambang saja) dan favicon dari logo-mni.png. Dijalankan sekali; hasilnya masuk Git.
import { chromium } from 'playwright';
import fs from 'node:fs';
const src = fs.readFileSync('public/logo-mni.png').toString('base64');
const b = await chromium.launch();
const p = await b.newPage();
const out = await p.evaluate(async (b64) => {
  const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  // cari batas kanan lambang: kolom pertama yang kosong (transparan atau putih) setelah lambang, sebelum teks
  const c0 = document.createElement('canvas'); c0.width = W; c0.height = H; const x0 = c0.getContext('2d'); x0.drawImage(img, 0, 0);
  const d = x0.getImageData(0, 0, W, H).data;
  const filled = (x) => { for (let y = 0; y < H; y++) { const i = (y * W + x) * 4; if (d[i + 3] > 40 && !(d[i] > 235 && d[i + 1] > 235 && d[i + 2] > 235)) return true; } return false; };
  let x = 0; while (x < W && !filled(x)) x++;
  const left = x; let gap = 0, right = left;
  for (x = left; x < W; x++) { if (filled(x)) { right = x; gap = 0; } else if (++gap > 12) break; }
  const pad = 6, sx = Math.max(0, left - pad), sw = Math.min(W, right + pad) - sx;
  const mk = (size) => { const s = document.createElement('canvas'); s.width = size; s.height = size; const g = s.getContext('2d'); const k = Math.min(size / sw, size / H); g.drawImage(img, sx, 0, sw, H, (size - sw * k) / 2, (size - H * k) / 2, sw * k, H * k); return s.toDataURL('image/png').split(',')[1]; };
  const full = document.createElement('canvas'); full.width = sw; full.height = H; full.getContext('2d').drawImage(img, sx, 0, sw, H, 0, 0, sw, H);
  return { W, H, sx, sw, mark: full.toDataURL('image/png').split(',')[1], f32: mk(32), f180: mk(180) };
}, src);
fs.writeFileSync('public/logo-mni-mark.png', Buffer.from(out.mark, 'base64'));
fs.writeFileSync('public/favicon-32.png', Buffer.from(out.f32, 'base64'));
fs.writeFileSync('public/apple-touch-icon.png', Buffer.from(out.f180, 'base64'));
console.log('logo', out.W + 'x' + out.H, 'lambang x=' + out.sx + ' lebar=' + out.sw);
await b.close();
