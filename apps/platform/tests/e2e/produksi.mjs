// Uji produksi multi work center (mock): rute dari produk, Antrian Mesin per work center, validasi urutan langkah,
// beban per work center di Dashboard Produksi, dan kemajuan item dari kejadian per mesin.
export async function runProduksi(page, base) {
  const R = [];
  const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 160)));
  const tab = (t) => page.evaluate((t) => JSON.parse(localStorage.getItem('mni-local-mock-db')).tables[t] || [], t);
  const closeAll = async () => {
    await page.evaluate(() => { document.querySelector('#modal [data-act="closemodal"]')?.click(); document.querySelector('#drawer [data-act="closedrawer"]')?.click(); document.querySelector('#sheet [data-act="sheet-close"]')?.click(); });
    await page.waitForTimeout(300);
  };
  const go = async (r) => { await closeAll(); await page.click(`#nav a[href="#${r}"]`); await page.waitForTimeout(700); };
  const login = async (email) => {
    await page.evaluate(() => localStorage.removeItem('mni-local-mock-session'));
    await page.goto(base); await page.reload();
    await page.fill('#auth-email', email); await page.click('#auth-btn');
    await page.waitForSelector('#auth-otp', { state: 'visible' }); await page.fill('#auth-otp', '123456');
    await page.waitForTimeout(2000);
    await page.waitForFunction(() => document.querySelectorAll('#nav a').length > 1 && !/Tamu/.test(document.getElementById('who').innerText), null, { timeout: 30000 });
    await page.waitForTimeout(800);
  };
  const antri = (wc) => page.evaluate((w) => { const r = document.querySelector(`#wc-beban tr[data-wc="${w}"]`); return r ? +r.dataset.antri : null; }, wc);
  const simpanMesin = async (wc, nilai) => {
    await page.selectOption('#f-mesin', wc); await page.waitForTimeout(500);
    await page.fill('#mesin-antri [data-mq]', String(nilai));
    await page.click('#mesin-antri [data-act="mesinsimpan"]'); await page.waitForTimeout(1500);
  };

  await page.goto(base); await page.evaluate(() => localStorage.clear());
  await login('admin@mni.local');
  // work center standar dengan kapasitas per hari (disuntik ke mock)
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('mni-local-mock-db')); const now = new Date().toISOString();
    s.tables.mwc = [['WC-1', 'Shearing', 1, 100], ['WC-2', 'Punching', 2, 50], ['WC-3', 'Bending', 3, 40], ['WC-4', 'CNC Laser', 4, 60], ['WC-5', 'Welding', 5, 30]]
      .map(([kode, nama, urutan, kap]) => ({ id: crypto.randomUUID(), kode, nama, tipe: 'Internal', urutan, aktif: true, created_at: now, updated_at: now, created_by: 'seed', updated_by: 'seed', data: { kapasitas: kap } }));
    localStorage.setItem('mni-local-mock-db', JSON.stringify(s));
  });
  await page.reload(); await page.waitForTimeout(3500);

  // SPK Cable Tray 20 btg (rute otomatis: Shearing, Punching, Bending)
  await go('spk');
  await page.click('#tools [data-act="newspk"]'); await page.waitForTimeout(700);
  await page.fill('#ed-cust', 'Customer Rute'); await page.fill('#ed-due', '2026-12-15');
  await page.fill('#ed-h-0', 'CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED'); await page.dispatchEvent('#ed-h-0', 'change'); await page.waitForTimeout(300);
  await page.fill('#ed-d-0-0', 'Cable Tray W100xH100xL3000 1.2'); await page.fill('#ed-q-0-0', '20'); await page.fill('#ed-u-0-0', 'Btg');
  await page.click('#editor button:has-text("Terbitkan SPK")'); await page.waitForTimeout(1800);

  await go('mesin');
  ok('M-01 Antrian Mesin tampil untuk Shearing dengan item SPK baru', (await page.textContent('#mesin-antri')).includes('Cable Tray W100xH100xL3000'));
  const rute = await page.$$eval('#mesin-antri tbody tr:first-child .rchip', (a) => a.map((x) => x.textContent));
  ok('M-02 rute Cable Tray: Shearing, Punching, Bending', JSON.stringify(rute) === JSON.stringify(['Shearing', 'Punching', 'Bending']), rute.join(','));

  await simpanMesin('Shearing', 20);
  const ev1 = await tab('produksi_log');
  ok('M-03 hasil Shearing 20 tercatat sebagai kejadian', ev1.length === 1 && ev1[0].wc === 'Shearing' && Number(ev1[0].qty) === 20, JSON.stringify(ev1.map((e) => [e.wc, e.qty])));

  await page.selectOption('#f-mesin', 'Punching'); await page.waitForTimeout(500);
  ok('M-04 item pindah otomatis ke antrian Punching (siap 20)', /20/.test(await page.textContent('#mesin-antri tbody tr:first-child td:nth-child(4)')));
  await simpanMesin('Punching', 25);
  ok('M-05 melebihi yang siap ditolak (tidak tercatat)', (await tab('produksi_log')).length === 1);
  await simpanMesin('Punching', 8);
  ok('M-06 Punching 8 tercatat', (await tab('produksi_log')).length === 2);

  await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  ok('M-07 Bending hanya melihat 8 yang selesai Punching', /8/.test(await page.textContent('#mesin-antri tbody tr:first-child td:nth-child(4)')));
  await page.selectOption('#f-mesin', 'Shearing'); await page.waitForTimeout(500);
  ok('M-08 Shearing tidak punya antrian lagi', !(await page.$('#mesin-antri')));

  await go('produksi');
  const a = { s: await antri('Shearing'), p: await antri('Punching'), b: await antri('Bending') };
  ok('M-10 beban per work center: Shearing 0, Punching 12, Bending 8', a.s === 0 && a.p === 12 && a.b === 8, JSON.stringify(a));
  const txt = await page.textContent('#wc-beban');
  ok('M-11 hari habis dan status terhitung dari kapasitas (Punching 12/50, Bending 8/40)', /Normal/.test(txt) && /Kosong/.test(txt));

  await go('mesin'); await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  await page.click('#mesin-antri [data-act="mesinsemua"]'); await page.waitForTimeout(1500);
  const evs = await tab('produksi_log');
  ok('M-12 tombol Semua mengisi seluruh yang siap (Bending 8)', evs.length === 3 && evs[2].wc === 'Bending' && Number(evs[2].qty) === 8);
  await go('produksi');
  ok('M-13 antrian Bending kosong setelah selesai', (await antri('Bending')) === 0 && (await antri('Punching')) === 12);

  // Vendor: kecepatan dan kualifikasi dari riwayat kiriman (4 selesai: TAT 4, 4, 3, 8 hari kerja; 1 masih di vendor)
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('mni-local-mock-db')); const now = new Date().toISOString();
    const mk = (tgl, balik, q, rej) => ({ id: crypto.randomUUID(), created_at: now, updated_at: now, data: { vendor: 'Berkah Jaya', proses: 'HDG', tgl, noSJ: 'SJ-V/' + tgl, spk: '', status: balik ? 'Selesai' : 'Di Vendor',
      items: [{ d: 'Cable Tray', g: '', q, u: 'Btg', kembali: balik ? q - rej : 0, reject: balik ? rej : 0 }], riwayat: balik ? [{ tgl: balik, qty: q - rej, rej }] : [] } });
    s.tables.vendor = [mk('2026-10-05', '2026-10-09', 30, 0), mk('2026-10-12', '2026-10-16', 30, 1), mk('2026-10-19', '2026-10-22', 40, 0), mk('2026-10-26', '2026-11-05', 20, 0), mk('2026-11-02', null, 15, 0)];
    localStorage.setItem('mni-local-mock-db', JSON.stringify(s));
  });
  await page.reload(); await page.waitForTimeout(3500);
  await page.evaluate(() => { location.hash = '#produksi'; }); await page.waitForTimeout(1200);
  const vk = await page.evaluate(() => (document.getElementById('vendor-kual') || { innerText: '' }).innerText);
  ok('M-20 kualifikasi vendor tampil: Berkah Jaya, rata-rata 4,8 hk, tepat waktu 75%, nilai B', /Berkah Jaya/.test(vk) && /4,8 hk/.test(vk) && /75%/.test(vk) && vk.trim().endsWith('B'), JSON.stringify(vk).slice(0, 500));
  const kembali = await page.evaluate(() => document.getElementById('body').innerText);
  ok('M-21 perkiraan kembali kiriman yang masih di vendor ditampilkan dengan dasarnya', /perkiraan kembali/.test(kembali) && /median riwayat vendor/.test(kembali));

  // Data contoh untuk tinjauan: /?demo=produksi mengisi WC, SPK berrute, kejadian, dan riwayat vendor
  await page.evaluate(() => { localStorage.clear(); });
  await page.goto(base + '?demo=produksi'); await page.waitForTimeout(500);
  await login('admin@mni.local');
  await page.evaluate(() => { location.hash = '#produksi'; }); await page.waitForTimeout(1500);
  const demo = await page.evaluate(() => ({ wc: document.querySelectorAll('#wc-beban tbody tr[data-wc]').length, vendor: !!document.getElementById('vendor-kual'), posisi: /Shearing|Punching|Bending|CNC Laser/.test(document.getElementById('body').innerText) }));
  ok('M-30 data contoh produksi memuat 5 work center, kualifikasi vendor, dan posisi SPK', demo.wc === 5 && demo.vendor && demo.posisi, JSON.stringify(demo));

  ok('M-14 tanpa pageerror', errs.length === 0, errs.join(' | '));
  const fail = R.filter((x) => x.startsWith('FAIL')).length;
  return { pass: R.length - fail, fail, detail: R };
}
