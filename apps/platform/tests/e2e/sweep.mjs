// Sapu tampilan: buka setiap modul pada tiga ukuran layar (desktop, tablet, ponsel) dengan data contoh (mock),
// lalu periksa galat halaman, galat console, dan tanda tata letak rusak: halaman melebar ke samping, elemen
// keluar dari layar, kartu KPI menumpuk satu per baris di layar lebar, dan header panel tanpa gaya.
// Opsional: SWEEP_SHOTS=<folder> menyimpan screenshot tiap halaman dan ukuran.
//
//   const { pass, fail, detail } = await runSweep(page, 'http://127.0.0.1:5173/');

import fs from 'node:fs';

const VIEWS = ['dashboard', 'bahan-baku', 'barang-jadi', 'bongkar-muat', 'vendor', 'pengiriman', 'spk', 'produksi', 'cek-data', 'master-data', 'kinerja', 'pengguna'];
const SIZES = [['desktop', 1440, 900], ['tablet', 768, 1024], ['ponsel', 390, 844]];

export async function runSweep(page, base) {
  const R = [];
  const errs = [];
  const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
  page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 160)));
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base); await page.evaluate(() => localStorage.clear()); await page.reload();
  await page.fill('#auth-email', 'admin@mni.local'); await page.click('#auth-btn');
  await page.waitForSelector('#auth-otp', { state: 'visible' }); await page.fill('#auth-otp', '123456');
  await page.waitForTimeout(2500);
  await page.waitForFunction(() => document.querySelectorAll('#nav a').length > 5, null, { timeout: 30000 });

  const shots = process.env.SWEEP_SHOTS;
  if (shots) fs.mkdirSync(shots, { recursive: true });

  for (const [sz, w, h] of SIZES) {
    await page.setViewportSize({ width: w, height: h });
    for (const v of VIEWS) {
      await page.evaluate((v) => { location.hash = '#' + v; }, v);
      await page.waitForTimeout(700);
      const r = await page.evaluate(() => {
        const out = { overflowX: document.documentElement.scrollWidth - window.innerWidth, outside: [], stacked: false, rawHeader: false };
        const vw = window.innerWidth;
        for (const el of document.querySelectorAll('#body *')) {
          const b = el.getBoundingClientRect();
          if (b.width > 0 && b.height > 0 && b.right > vw + 2 && !el.closest('.tbl-wrap,table,.tabs,.seg,.scroll-x,[style*="overflow"]')) { out.outside.push((el.className || el.tagName).toString().slice(0, 30)); if (out.outside.length > 3) break; }
        }
        const kr = document.querySelector('.kpi-row,.kpis');
        if (kr && window.innerWidth >= 1000) {
          const tops = [...kr.children].map((c) => Math.round(c.getBoundingClientRect().top));
          out.stacked = tops.length >= 3 && new Set(tops).size === tops.length;
        }
        return out;
      });
      const tag = `${v} @${sz}`;
      ok(`S ${tag}`, r.overflowX <= 2 && r.outside.length === 0 && !r.stacked, `${r.overflowX > 2 ? 'melebar ' + r.overflowX + 'px; ' : ''}${r.outside.length ? 'keluar layar: ' + r.outside.join(',') + '; ' : ''}${r.stacked ? 'KPI menumpuk' : ''}`);
      if (shots) await page.screenshot({ path: `${shots}/${v}-${sz}.png` });
    }
  }

  // Lembar SPK (drawer): header harus bergaya (padding, tombol tutup sejajar)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => { location.hash = '#spk'; }); await page.waitForTimeout(700);
  const row = await page.$('#body tr.click, #body tbody tr');
  if (row) {
    await row.click(); await page.waitForTimeout(700);
    const d = await page.evaluate(() => {
      const hd = document.querySelector('.drawer-panel > header'); if (!hd) return null;
      const cs = getComputedStyle(hd); const x = hd.querySelector('.x'); const hb = hd.getBoundingClientRect(); const xb = x ? x.getBoundingClientRect() : null;
      return { pad: parseFloat(cs.paddingLeft), flex: cs.display === 'flex', xInside: !!xb && xb.top >= hb.top - 1 && xb.bottom <= hb.bottom + 1 };
    });
    ok('S lembar SPK: header bergaya', !!d && d.pad >= 16 && d.flex && d.xInside, d ? JSON.stringify(d) : 'tanpa drawer');
    if (shots) await page.screenshot({ path: `${shots}/drawer-spk.png` });
    await page.evaluate(() => document.querySelector('[data-act="closedrawer"]')?.click());
  }
  ok('S tanpa pageerror dan galat console', errs.length === 0, errs.slice(0, 3).join(' | '));
  const fail = R.filter((x) => x.startsWith('FAIL')).length;
  return { pass: R.length - fail, fail, detail: R };
}
