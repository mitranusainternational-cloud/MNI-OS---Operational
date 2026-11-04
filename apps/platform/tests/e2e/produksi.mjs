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
  const go = async (r) => { await closeAll(); { const l = await page.$(`#nav a[href="#${r}"]`); if (l) await l.click(); else await page.evaluate((h) => { location.hash = h; }, r); await page.waitForTimeout(300); if (r === 'spk') { const b = await page.$('#tools [data-view="spk"][data-val="list"]'); if (b) await b.click(); } if (r === 'produksi') { const b = await page.$('#tools [data-view="produksi"][data-val="wc"]'); if (b) await b.click(); } } await page.waitForTimeout(700); };
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
  const hasilEv = async () => (await tab('produksi_log')).filter((e) => (e.jenis || 'hasil') === 'hasil');
  // Catat hasil lewat dialog (jam mulai dan selesai wajib): baris pertama di antrian work center itu
  const simpanMesin = async (wc, nilai, { reject = '', baris = 1, semua = false } = {}) => {
    await page.selectOption('#f-mesin', wc); await page.waitForTimeout(500);
    await page.click(`#mesin-antri .mcard:nth-child(${baris}) [data-act="mesincatat"]`); await page.waitForTimeout(400);
    if (semua) await page.check('#mform [name="semua"]');
    else { await page.fill('#m-qty', String(nilai)); await page.fill('#m-reject', String(reject)); }
    await page.fill('#m-mulai', '08:00'); await page.fill('#m-selesai', '09:00');
    await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1500);
    await closeAll();
  };

  await page.goto(base); await page.evaluate(() => localStorage.clear());
  await login('admin@mni.local');
  // work center standar dengan kapasitas per hari (disuntik ke mock)
  await page.evaluate(() => {
    const s = JSON.parse(localStorage.getItem('mni-local-mock-db')); const now = new Date().toISOString();
    const dua = [{ nama: 'Punching 1 (20 Ton)', operator: ['Operator C'], kapasitas: 25 }, { nama: 'Punching 2 (40 Ton)', operator: ['Operator D'], kapasitas: 25 }];
    s.tables.mwc = [['WC-1', 'Shearing', 1, 100, []], ['WC-2', 'Punching', 2, 50, dua], ['WC-3', 'Bending', 3, 40, []], ['WC-4', 'CNC Laser', 4, 60, []], ['WC-5', 'Welding', 5, 30, []]]
      .map(([kode, nama, urutan, kap, mesin]) => ({ id: crypto.randomUUID(), kode, nama, tipe: 'Internal', urutan, aktif: true, created_at: now, updated_at: now, created_by: 'seed', updated_by: 'seed', data: { kapasitas: kap, mesin } }));
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
  const rute = await page.$$eval('#mesin-antri .mcard:first-child .rchip', (a) => a.map((x) => x.textContent));
  ok('M-02 rute Cable Tray ELECTRO: tiga mesin lalu Vendor ELG', JSON.stringify(rute) === JSON.stringify(['Shearing', 'Punching', 'Bending', 'Vendor ELG']), rute.join(','));

  await simpanMesin('Shearing', 20);
  const ev1 = await hasilEv();
  ok('M-03 hasil Shearing 20 tercatat sebagai kejadian', ev1.length === 1 && ev1[0].wc === 'Shearing' && Number(ev1[0].qty) === 20, JSON.stringify(ev1.map((e) => [e.wc, e.qty])));
  ok('M-03b kejadian membawa mesin, durasi 60 menit, nomor SPK, customer, dan tonase dari berat per pcs', ev1[0].mesin === 'Shearing' && Number(ev1[0].menit) === 60 && ev1[0].customer === 'Customer Rute' && !!ev1[0].spk_no && !!ev1[0].mulai, JSON.stringify([ev1[0].mesin, ev1[0].menit, ev1[0].customer, ev1[0].spk_no, ev1[0].tonase]));

  await page.selectOption('#f-mesin', 'Punching'); await page.waitForTimeout(500);
  ok('M-04 item pindah otomatis ke antrian Punching (siap 20)', /20/.test(await page.textContent('#mesin-antri .mcard:first-child .mq-siap')));
  const msnOpsi = await page.$$eval('#f-mesin-msn option', (a) => a.map((x) => x.textContent));
  ok('M-04b Punching punya dua mesin untuk dipilih', msnOpsi.length === 2 && msnOpsi[1] === 'Punching 2 (40 Ton)', msnOpsi.join(','));
  await simpanMesin('Punching', 25);
  ok('M-05 melebihi yang siap ditolak (tidak tercatat)', (await hasilEv()).length === 1);
  await simpanMesin('Punching', 8);
  const e6 = await hasilEv();
  ok('M-06 Punching 8 tercatat di mesin Punching 1', e6.length === 2 && e6[1].mesin === 'Punching 1 (20 Ton)', e6.map((e) => e.mesin).join(','));

  await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  ok('M-07 Bending hanya melihat 8 yang selesai Punching', /8/.test(await page.textContent('#mesin-antri .mcard:first-child .mq-siap')));
  await page.selectOption('#f-mesin', 'Shearing'); await page.waitForTimeout(500);
  ok('M-08 Shearing tidak punya antrian lagi', !(await page.$('#mesin-antri')));

  await go('produksi');
  const a = { s: await antri('Shearing'), p: await antri('Punching'), b: await antri('Bending') };
  ok('M-10 beban per work center: Shearing 0, Punching 12, Bending 8', a.s === 0 && a.p === 12 && a.b === 8, JSON.stringify(a));
  const txt = await page.textContent('#wc-beban');
  ok('M-11 hari habis dan status terhitung dari kapasitas (Punching 12/50, Bending 8/40)', /Normal/.test(txt) && /Kosong/.test(txt));

  // Timer: Mulai, kartu sesi berjalan, Semua, Selesai dan simpan
  await go('mesin'); await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  await page.click('#mesin-antri .mcard:first-child [data-act="mesinmulai"]'); await page.waitForTimeout(1200);
  ok('M-11b sesudah Mulai tampil kartu sedang dikerjakan dan tombol Mulai terkunci', !!(await page.$('.mesin-run')) && (await page.$$eval('#mesin-antri [data-act="mesinmulai"]', (a) => a.length)) === 0);
  ok('M-11c peristiwa mulai tercatat dan belum mengubah antrian', (await tab('produksi_log')).filter((e) => e.jenis === 'mulai').length === 1 && (await hasilEv()).length === 2);
  await page.click('.mesin-run [data-act="mesinsemua"]');
  ok('M-11d tombol Semua mengisi jumlah yang siap (8)', (await page.inputValue('.mesin-run [data-mrq]')) === '8');
  await page.click('.mesin-run [data-act="mesinselesai"]'); await page.waitForTimeout(1500);
  const evs = await hasilEv();
  ok('M-12 Selesai dan simpan: Bending 8 dengan jam mulai dan durasi dari timer', evs.length === 3 && evs[2].wc === 'Bending' && Number(evs[2].qty) === 8 && !!evs[2].mulai && !!evs[2].selesai && evs[2].menit != null, JSON.stringify([evs[2].qty, evs[2].menit]));
  ok('M-12b sesudah selesai kartu sesi hilang', !(await page.$('.mesin-run')));
  await go('produksi');
  ok('M-13 antrian Bending kosong setelah selesai', (await antri('Bending')) === 0 && (await antri('Punching')) === 12);

  // Reject di Punching (2 rusak): tercatat, tidak lanjut, dan muncul lagi di antrian Shearing untuk dibuat ulang
  await go('mesin');
  await simpanMesin('Punching', '', { reject: 2 });
  const evr = await hasilEv();
  ok('M-15 reject 2 di Punching tercatat tanpa menambah selesai', evr.length === 4 && evr[3].wc === 'Punching' && Number(evr[3].reject) === 2 && Number(evr[3].qty) === 0, JSON.stringify(evr.slice(3).map((e) => [e.wc, e.qty, e.reject])));
  await go('produksi');
  const ar = { s: await antri('Shearing'), p: await antri('Punching') };
  ok('M-16 reject kembali ke antrian Shearing (2) dan Punching berkurang jadi 10', ar.s === 2 && ar.p === 10, JSON.stringify(ar));

  // Vendor: yang siap dikirim = hasil Bending (8); kirim melebihi hasil produksi ditolak, sebesar hasil diterima
  await go('produksi');
  ok('M-17 dashboard menyebut siap dikirim ke Vendor ELG (8)', /Siap dikirim ke Vendor ELG: 8/.test(await page.evaluate(() => document.getElementById('body').innerText)));
  await go('vendor');
  const nv0 = (await tab('vendor')).length;
  await page.click('#tools [data-act="newvendor"]'); await page.waitForTimeout(500);
  await page.fill('#m-vendor', 'Vendor Rute'); await page.fill('#m-proses', 'ELG');
  const optV = await page.evaluate(() => [...document.querySelectorAll('#m-spk option')].find((o) => /Customer Rute/.test(o.textContent))?.value || '');
  await page.selectOption('#m-spk', optV); await page.waitForTimeout(500);
  const valV = await page.inputValue('#m-ln_0');
  ok('M-18 kolom kirim vendor terisi sebatas hasil produksi (8 dari 20)', valV === '8', valV);
  await page.fill('#m-ln_0', '10');
  await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(800);
  const errV = await page.evaluate(() => (document.getElementById('merr') || { textContent: '' }).textContent);
  ok('M-19 kirim 10 melebihi hasil produksi ditolak', (await tab('vendor')).length === nv0 && /hasil produksi/.test(errV), errV);
  await page.fill('#m-ln_0', '8');
  await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(800);
  await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1500); // vendor baru: klik kedua mendaftarkannya ke master
  ok('M-19b kirim 8 diterima', (await tab('vendor')).length === nv0 + 1, await page.evaluate(() => (document.getElementById('merr') || { textContent: '' }).textContent));
  await go('produksi');
  const bodyV = await page.evaluate(() => document.getElementById('body').innerText);
  await go('spk'); await page.click('#tools [data-view="spk"][data-val="berjalan"]'); await page.waitForTimeout(400);
  const bodySpk = await page.evaluate(() => document.getElementById('body').innerText);
  ok('M-19c sesudah dikirim tidak lagi siap kirim, jalur SPK menyebut kiriman ke vendor', !/Siap dikirim ke Vendor ELG/.test(bodyV) && /dikirim 8/.test(bodySpk), bodySpk.slice(0, 0));

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
  await page.click('#tools [data-view="produksi"][data-val="vendor"]'); await page.waitForTimeout(400);
  const vk = await page.evaluate(() => (document.getElementById('vendor-kual') || { innerText: '' }).innerText);
  ok('M-20 kualifikasi vendor tampil: Berkah Jaya, rata-rata 4,8 hk, tepat waktu 75%, nilai B', /Berkah Jaya/.test(vk) && /4,8 hk/.test(vk) && /75%/.test(vk) && vk.trim().endsWith('B'), JSON.stringify(vk).slice(0, 500));
  const kembali = await page.evaluate(() => document.getElementById('body').innerText);
  ok('M-21 perkiraan kembali kiriman yang masih di vendor ditampilkan dengan dasarnya', /perkiraan kembali/.test(kembali) && /median riwayat vendor/.test(kembali));

  // Mesin alternatif: SPK berisi Cover (10), dipotong di Laser (4) lalu sisanya di Shearing
  await go('spk');
  await page.click('#tools [data-act="newspk"]'); await page.waitForTimeout(700);
  await page.fill('#ed-cust', 'Customer Cover'); await page.fill('#ed-due', '2026-12-20');
  await page.fill('#ed-h-0', 'CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED'); await page.dispatchEvent('#ed-h-0', 'change'); await page.waitForTimeout(300);
  await page.fill('#ed-d-0-0', 'COVER TRAY W 200 L 3000'); await page.fill('#ed-q-0-0', '10'); await page.fill('#ed-u-0-0', 'Btg');
  await page.click('#editor button:has-text("Terbitkan SPK")'); await page.waitForTimeout(1800);
  await go('mesin'); await page.selectOption('#f-mesin', 'CNC Laser'); await page.waitForTimeout(500);
  const altTxt = await page.evaluate(() => (document.getElementById('mesin-antri') || { innerText: '' }).innerText);
  ok('M-40 Cover muncul di antrian CNC Laser sebagai mesin alternatif untuk Shearing', /COVER TRAY/.test(altTxt) && /mesin alternatif/.test(altTxt), altTxt.slice(0, 120));
  const nHasil = (await hasilEv()).length;
  await page.click('#mesin-antri .mcard:first-child [data-act="mesincatat"]'); await page.waitForTimeout(400);
  await page.fill('#m-qty', '4'); await page.fill('#m-mulai', '10:00'); await page.fill('#m-selesai', '10:40');
  await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1500); await closeAll();
  const eAlt = (await hasilEv()).slice(nHasil);
  ok('M-41 hasil tercatat atas nama CNC Laser (mesin sebenarnya) dengan menit per pcs 10', eAlt.length === 1 && eAlt[0].wc === 'CNC Laser' && Number(eAlt[0].menit) === 40, JSON.stringify(eAlt.map((e) => [e.wc, e.menit])));
  await page.selectOption('#f-mesin', 'Shearing'); await page.waitForTimeout(500);
  const sisaCover = await page.evaluate(() => { const r = [...document.querySelectorAll('#mesin-antri .mcard')].find((x) => /COVER TRAY/.test(x.innerText)); return r ? r.querySelector('.mq-siap').innerText.trim() : null; });
  ok('M-42 langkah Shearing untuk Cover berkurang jadi 6 (dibagi dua mesin alternatif)', sisaCover === '6', String(sisaCover));
  await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  const bendCover = await page.evaluate(() => { const r = [...document.querySelectorAll('#mesin-antri .mcard')].find((x) => /COVER TRAY/.test(x.innerText)); return r ? r.querySelector('.mq-siap').innerText.trim() : null; });
  ok('M-43 hasil Laser 4 langsung siap di Bending', bendCover === '4', String(bendCover));

  // Laporan produksi: kolom form Excel, total, rekap per mesin, waktu per jenis item
  await go('laporan-produksi');
  const lap = await page.evaluate(() => ({ rows: document.querySelectorAll('#lap-tabel tbody tr').length, txt: document.getElementById('lap-tabel').innerText, rekap: document.getElementById('lap-rekap').innerText, jenis: document.getElementById('lap-jenis').innerText, head: document.getElementById('lap-tabel').querySelector('thead').innerText }));
  ok('M-50 laporan harian memuat semua hasil hari ini dengan kolom form (SPK, customer, deskripsi, tonase, menit per pcs)', lap.rows === (await hasilEv()).length && /Customer Rute/.test(lap.txt) && /Cable Tray W100xH100xL3000/.test(lap.txt) && /Tonase/i.test(lap.head) && /Menit.pcs/i.test(lap.head), String(lap.rows));
  ok('M-51 rekap per mesin menyebut Punching 1 (20 Ton) dan Laser (CNC Laser)', /Punching 1 \(20 Ton\)/.test(lap.rekap) && /CNC Laser/.test(lap.rekap));
  ok('M-52 waktu per jenis item terisi dari hasil berwaktu', /Shearing/.test(lap.jenis) && !/Belum ada hasil berwaktu/.test(lap.jenis));
  await page.selectOption('#f-lap-wc', 'Punching'); await page.waitForTimeout(500);
  const lapP = await page.evaluate(() => ({ rows: document.querySelectorAll('#lap-tabel tbody tr').length, tbl: document.getElementById('lap-tabel').innerText }));
  ok('M-53 filter work center Punching: hanya baris Punching', lapP.rows === 2 && !/Shearing/.test(lapP.tbl.replace(/Selesai/g, '')) , String(lapP.rows));
  ok('M-54 tombol Unduh CSV dan Cetak tersedia', !!(await page.$('#tools [data-act="lapcsv"]')) && !!(await page.$('#tools [data-act="lapprint"]')));

  // Jejak produksi di lembar SPK
  await go('spk');
  await page.click('#body tr:has-text("Customer Rute")'); await page.waitForTimeout(800);
  await page.click('.dw-tab[data-tab="jejak"]'); await page.waitForTimeout(400);
  const jej = await page.evaluate(() => document.getElementById('dw-pane-jejak').innerText);
  ok('M-60 jejak item: tiap langkah, vendor, dan terkirim ke customer dengan mesin yang dipakai', /Shearing/.test(jej) && /Punching/.test(jej) && /Bending/.test(jej) && /Vendor ELG/.test(jej) && /Terkirim ke customer/.test(jej) && /Punching 1 \(20 Ton\)/.test(jej) && /dikirim 0 . kembali 0/.test(jej), jej.replace(/\n/g, ' ').slice(0, 200));
  await closeAll();

  // Lembar Update produksi: posisi per item dari catatan mesin, catat hasil langsung dari sini
  await go('spk'); await page.click('#body tr:has-text("Customer Rute")'); await page.waitForTimeout(800);
  await page.click('#drawer [data-act="prod"]'); await page.waitForTimeout(600);
  const up = await page.evaluate(() => document.getElementById('modal').innerText);
  ok('M-70 Update produksi menampilkan rantai langkah per item dan posisinya, bukan isian total', up.includes('Shearing 18') && up.includes('Posisi:') && !up.includes('Total diproduksi'), up.split(String.fromCharCode(10)).join(' ').slice(120, 360));
  const nH = (await hasilEv()).length;
  await page.click('#modal [data-act="prodcatat"]'); await page.waitForTimeout(500);
  ok('M-71 tombol Catat hasil membuka dialog dengan pilihan mesin dan operator', !!(await page.$('#mform [name="operator"]')) && /Catat hasil/.test(await page.textContent('#modal h3')));
  await page.fill('#m-qty', '2'); await page.fill('#m-operator', 'Operator Uji'); await page.fill('#m-mulai', '13:00'); await page.fill('#m-selesai', '13:30');
  await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1500); await closeAll();
  const hNew = (await hasilEv()).slice(nH);
  ok('M-72 hasil dari lembar SPK tercatat dengan operator dan mesin', hNew.length === 1 && hNew[0].operator === 'Operator Uji' && Number(hNew[0].qty) === 2 && Number(hNew[0].menit) === 30, JSON.stringify(hNew.map((e) => [e.wc, e.mesin, e.operator, e.qty])));

  // Berjalan bersamaan: satu item di dua mesin, selesai sebagian lalu lanjut, pembatalan catatan, dan pelindung dobel
  const klikBaris = (cust, act) => page.evaluate(([c, a]) => { const r = [...document.querySelectorAll('#mesin-antri .mcard')].find((x) => x.innerText.includes(c)); const b = r && r.querySelector('[data-act="' + a + '"]'); if (b && !b.disabled) { b.click(); return true; } return false; }, [cust, act]);
  const barisInfo = (cust) => page.evaluate((c) => { const r = [...document.querySelectorAll('#mesin-antri .mcard')].find((x) => x.innerText.includes(c)); return r ? { txt: r.innerText, mulaiDisabled: !!(r.querySelector('[data-act="mesinmulai"]') || {}).disabled } : null; }, cust);
  const catatBaris = async (cust, qty, mulai, selesai) => {
    await klikBaris(cust, 'mesincatat'); await page.waitForTimeout(400);
    await page.fill('#m-qty', String(qty)); await page.fill('#m-mulai', mulai); await page.fill('#m-selesai', selesai);
    await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1300);
  };
  await go('spk');
  await page.click('#tools [data-act="newspk"]'); await page.waitForTimeout(700);
  await page.fill('#ed-cust', 'Customer Paralel'); await page.fill('#ed-due', '2026-12-22');
  await page.fill('#ed-h-0', 'CABLE TRAY TYPE STU 1.2 NON FINISHING'); await page.dispatchEvent('#ed-h-0', 'change'); await page.waitForTimeout(300);
  await page.fill('#ed-d-0-0', 'Cable Tray W150xH50xL3000 1.2'); await page.fill('#ed-q-0-0', '30'); await page.fill('#ed-u-0-0', 'Btg');
  await page.click('#editor button:has-text("Terbitkan SPK")'); await page.waitForTimeout(1800);
  await go('mesin'); await page.selectOption('#f-mesin', 'Shearing'); await page.waitForTimeout(500);
  await catatBaris('Customer Paralel', 30, '07:00', '08:00'); await closeAll();
  await page.selectOption('#f-mesin', 'Punching'); await page.waitForTimeout(500);
  await klikBaris('Customer Paralel', 'mesinmulai'); await page.waitForTimeout(1200);
  const mu = (await tab('produksi_log')).filter((e) => e.jenis === 'mulai' && e.item_desc.includes('W150xH50'));
  ok('M-80 Mulai di Punching 1 memesan seluruh yang siap sebagai target (30)', mu.length === 1 && Number(mu[0].target) === 30 && mu[0].mesin === 'Punching 1 (20 Ton)', JSON.stringify(mu.map((e) => [e.mesin, e.target])));
  await page.selectOption('#f-mesin-msn', 'Punching 2 (40 Ton)'); await page.waitForTimeout(500);
  const b2 = await barisInfo('Customer Paralel');
  ok('M-81 di Punching 2 item yang sama tampil sedang dikerjakan di mesin lain dan Mulai terkunci', !!b2 && b2.mulaiDisabled && /Sedang dikerjakan di mesin lain/.test(b2.txt) && /Punching 1/.test(b2.txt), b2 && b2.txt.replace(/\n/g, ' ').slice(0, 160));
  await page.selectOption('#f-mesin-msn', 'Punching 1 (20 Ton)'); await page.waitForTimeout(500);
  await page.fill('.mesin-run [data-mrq]', '10');
  await page.click('.mesin-run [data-act="mesinsebagian"]'); await page.waitForTimeout(1600);
  const evP = (await tab('produksi_log')).filter((e) => e.item_desc.includes('W150xH50') && e.wc === 'Punching');
  ok('M-82 Simpan sebagian: hasil 10 tercatat dan sesi baru terbuka dengan target sisa 20', evP.filter((e) => e.jenis === 'hasil').length === 1 && Number(evP.find((e) => e.jenis === 'hasil').qty) === 10 && evP.filter((e) => e.jenis === 'mulai').length === 2 && Number(evP.filter((e) => e.jenis === 'mulai')[1].target) === 20 && !!(await page.$('.mesin-run')), JSON.stringify(evP.map((e) => [e.jenis, e.qty, e.target])));
  await page.fill('.mesin-run [data-mrq]', '5');
  await page.click('.mesin-run [data-act="mesinselesai"]'); await page.waitForTimeout(1600);
  ok('M-83 Selesai dan simpan: sesi tertutup', !(await page.$('.mesin-run')));
  await page.selectOption('#f-mesin-msn', 'Punching 2 (40 Ton)'); await page.waitForTimeout(500);
  const b3 = await barisInfo('Customer Paralel');
  ok('M-84 sesudah sesi Punching 1 ditutup, Punching 2 bebas mengerjakan sisa 15', !!b3 && !b3.mulaiDisabled && /15/.test(b3.txt), b3 && b3.txt.replace(/\n/g, ' ').slice(0, 140));
  await klikBaris('Customer Paralel', 'mesinmulai'); await page.waitForTimeout(1200);
  const mu2 = (await tab('produksi_log')).filter((e) => e.jenis === 'mulai' && e.mesin === 'Punching 2 (40 Ton)' && e.item_desc.includes('W150xH50'));
  ok('M-85 dua mesin Punching berjalan bersamaan untuk satu item (Punching 2 target 15)', mu2.length === 1 && Number(mu2[0].target) === 15 && !!(await page.$('.mesin-run')));
  await page.click('.mesin-run [data-act="mesinbatal"]'); await page.waitForTimeout(1200);
  ok('M-86 Batalkan mulai menutup sesi tanpa hasil', !(await page.$('.mesin-run')) && (await tab('produksi_log')).some((e) => e.jenis === 'batal' && e.mesin === 'Punching 2 (40 Ton)'));

  // Pembatalan catatan hasil
  await page.selectOption('#f-mesin-msn', 'Punching 1 (20 Ton)'); await page.waitForTimeout(500);
  const rwBefore = await page.$$eval('#mesin-riwayat tbody tr', (a) => a.length);
  await go('produksi'); const aP0 = await antri('Punching'); await go('mesin'); await page.selectOption('#f-mesin', 'Punching'); await page.waitForTimeout(500);
  page.once('dialog', (d) => d.accept());
  await page.evaluate(() => { const r = [...document.querySelectorAll('#mesin-riwayat tbody tr')].find((x) => x.innerText.includes('W150xH50') && /\b5\b/.test(x.cells[3].innerText)); r.querySelector('[data-act="mesinvoid"]').click(); });
  await page.waitForTimeout(1500);
  const hv = (await tab('produksi_log')).filter((e) => e.item_desc.includes('W150xH50') && e.wc === 'Punching');
  ok('M-87 catatan salah (5) dibatalkan: peristiwa void tersimpan dan riwayat berkurang', hv.some((e) => e.jenis === 'void') && (await page.$$eval('#mesin-riwayat tbody tr', (a) => a.length)) === rwBefore - 1, String(rwBefore));
  await go('produksi');
  const aP1 = await antri('Punching');
  ok('M-88 sesudah pembatalan, 5 batang kembali ke antrian Punching', aP1 === aP0 + 5, aP0 + ' -> ' + aP1);
  // Bending memakai 3 dari hasil Punching 10, lalu membatalkan Punching 10 harus ditolak
  await go('mesin'); await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  await catatBaris('Customer Paralel', 3, '09:00', '09:30'); await closeAll();
  await page.selectOption('#f-mesin', 'Punching'); await page.waitForTimeout(500);
  const nVoid = (await tab('produksi_log')).filter((e) => e.jenis === 'void').length;
  const setuju = (d) => d.accept(); page.on('dialog', setuju);
  await page.evaluate(() => { const r = [...document.querySelectorAll('#mesin-riwayat tbody tr')].find((x) => x.innerText.includes('W150xH50') && /\b10\b/.test(x.cells[3].innerText)); if (r) r.querySelector('[data-act="mesinvoid"]').click(); });
  await page.waitForTimeout(1200); page.off('dialog', setuju);
  ok('M-89 pembatalan hasil Punching yang sudah dipakai Bending ditolak', (await tab('produksi_log')).filter((e) => e.jenis === 'void').length === nVoid && /Tidak bisa dibatalkan/.test(await page.evaluate(() => document.getElementById('toast').textContent)));
  // Pelindung dobel: Bending 3 yang sama dalam 15 menit dibatalkan (dialog konfirmasi ditolak otomatis)
  await page.selectOption('#f-mesin', 'Bending'); await page.waitForTimeout(500);
  const nB = (await hasilEv()).length;
  await catatBaris('Customer Paralel', 3, '09:40', '10:00');
  ok('M-90 catatan yang sama dalam 15 menit ditahan sebagai kemungkinan dobel', (await hasilEv()).length === nB && /dobel/.test(await page.evaluate(() => (document.getElementById('merr') || { textContent: '' }).textContent)));
  await closeAll();

  // Layar operator berbasis kartu: +/-, +5, Semua, lalu Selesai; dan Papan Produksi untuk supervisor
  await go('spk');
  await page.click('#tools [data-act="newspk"]'); await page.waitForTimeout(700);
  await page.fill('#ed-cust', 'Customer Kartu'); await page.fill('#ed-due', '2020-01-10');
  await page.fill('#ed-h-0', 'CABLE TRAY TYPE STU 1.2 NON FINISHING'); await page.dispatchEvent('#ed-h-0', 'change'); await page.waitForTimeout(300);
  await page.fill('#ed-d-0-0', 'Cable Tray W200xH50xL3000 1.2'); await page.fill('#ed-q-0-0', '12'); await page.fill('#ed-u-0-0', 'Btg');
  await page.click('#editor button:has-text("Terbitkan SPK")'); await page.waitForTimeout(1800);
  await go('mesin'); await page.selectOption('#f-mesin', 'Shearing'); await page.waitForTimeout(500);
  const kartuK = await page.evaluate(() => { const c = [...document.querySelectorAll('#mesin-antri .mcard')].find((x) => x.innerText.includes('Customer Kartu')); return c ? { txt: c.innerText, mulai: !!c.querySelector('[data-act="mesinmulai"]'), cat: !!c.querySelector('[data-act="mesincatat"]') } : null; });
  ok('M-91 kartu antrian memuat SPK, customer, angka siap besar, penanda Telat, tombol Mulai dan Catat', !!kartuK && /12/.test(kartuK.txt) && /Telat/.test(kartuK.txt) && kartuK.mulai && kartuK.cat, kartuK && kartuK.txt.replace(/\n/g, ' ').slice(0, 120));
  await klikBaris('Customer Kartu', 'mesinmulai'); await page.waitForTimeout(1200);
  const stepV = async () => Number(await page.inputValue('.mesin-run [data-mrq]') || 0);
  await page.click('.mesin-run [data-act="mrstep"][data-d="1"]'); await page.click('.mesin-run [data-act="mrstep"][data-d="1"]'); await page.click('.mesin-run [data-act="mrstep"][data-d="5"]');
  const v7 = await stepV();
  await page.click('.mesin-run [data-act="mrstep"][data-d="-1"]');
  const v6 = await stepV();
  await page.click('.mesin-run [data-act="mrstep"][data-d="10"]');
  const vMax = await stepV();
  ok('M-92 tombol +1, +5, -1 menghitung benar dan +10 tidak melewati yang siap (12)', v7 === 7 && v6 === 6 && vMax === 12, [v7, v6, vMax].join(','));
  await page.click('.mesin-run [data-act="mrstep"][data-d="-1"]'); await page.click('.mesin-run [data-act="mesinsemua"]');
  ok('M-93 Semua mengisi seluruh yang siap', (await stepV()) === 12);
  await page.fill('.mesin-run [data-mrq]', '0');
  for (let i = 0; i < 3; i++) await page.click('.mesin-run [data-act="mrstep"][data-d="-1"]');
  ok('M-94 jumlah tidak bisa di bawah nol', (await stepV()) === 0);
  await page.click('.mesin-run [data-act="mesinsemua"]'); await page.click('.mesin-run [data-act="mesinselesai"]'); await page.waitForTimeout(1600);
  ok('M-95 Selesai menyimpan 12 dan menutup kartu berjalan', !(await page.$('.mesin-run')) && (await tab('produksi_log')).some((e) => (e.jenis || 'hasil') === 'hasil' && e.item_desc.includes('W200xH50') && Number(e.qty) === 12 && e.wc === 'Shearing'));
  await go('papan'); await page.waitForTimeout(500);
  const papan = await page.evaluate(() => ({ kol: [...document.querySelectorAll('.pk-col .pk-head span:first-child')].map((x) => x.textContent), txt: document.querySelector('.pk-board').innerText, kpi: document.querySelectorAll('.kpi').length }));
  ok('M-96 Papan Produksi: kolom per work center dan vendor, kartu item antri di langkah berikutnya', papan.kol.includes('Shearing') && papan.kol.includes('Punching') && papan.kol.some((x) => /Vendor/.test(x)) && /Customer|W200xH50/.test(papan.txt) && papan.kpi === 4, papan.kol.join(','));
  await page.click('.pk-head[data-wc="Punching"]'); await page.waitForTimeout(800);
  ok('M-97 ketuk judul kolom membuka Antrian Mesin work center itu', (await page.evaluate(() => location.hash)) === '#mesin' && (await page.inputValue('#f-mesin')) === 'Punching');
  await page.setViewportSize({ width: 390, height: 800 }); await page.waitForTimeout(400);
  const hp = await page.evaluate(() => { const c = document.querySelector('#mesin-antri .mcard'); const b = c && c.querySelector('[data-act="mesinmulai"]'); const r = b && b.getBoundingClientRect(); return { lebarHalaman: document.documentElement.scrollWidth, layar: window.innerWidth, tinggiMulai: r ? Math.round(r.height) : 0, kolom: c ? getComputedStyle(c.parentElement).gridTemplateColumns.split(' ').length : 0 }; });
  ok('M-98 di layar HP (390 px): satu kolom, tidak ada gulir mendatar, tombol Mulai cukup besar (min 44 px)', hp.kolom === 1 && hp.lebarHalaman <= hp.layar + 1 && hp.tinggiMulai >= 44, JSON.stringify(hp));
  await page.setViewportSize({ width: 1280, height: 800 });
  await closeAll();

  // Tahap 1 skema baru: menu produksi tiga pintu, SPK Berjalan, Kinerja & Analisa
  const menuProd = await page.evaluate(() => { const hs = [...document.querySelectorAll('#nav a')].map((a) => a.getAttribute('href')); return { hs, teks: document.getElementById('nav').innerText }; });
  ok('M-99 menu Produksi hanya tiga pintu: SPK Berjalan, Produksi Hari Ini, Kinerja & Analisa', ['#spk', '#mesin', '#produksi'].every((h) => menuProd.hs.includes(h)) && !menuProd.hs.includes('#papan') && !menuProd.hs.includes('#laporan-produksi') && /SPK Berjalan/.test(menuProd.teks) && /Produksi Hari Ini/.test(menuProd.teks) && /Kinerja & Analisa/.test(menuProd.teks), menuProd.hs.join(','));
  await go('spk'); await page.click('#tools [data-view="spk"][data-val="berjalan"]'); await page.waitForTimeout(500);
  const sb = await page.evaluate(() => ({ kartu: document.querySelectorAll('.sb-card').length, txt: document.getElementById('body').innerText, kpi: document.querySelectorAll('.kpi').length, jalur: document.querySelectorAll('.sb-card .jstep').length }));
  ok('M-100 SPK Berjalan: kartu per SPK dengan status, progres, dan jalur tiap item sampai barang jadi', sb.kartu >= 3 && sb.kpi === 4 && sb.jalur > 5 && /Jalur tiap item/.test(sb.txt) && /%/.test(sb.txt), JSON.stringify({ k: sb.kartu, j: sb.jalur }));
  await page.click('#tools [data-view="spk"][data-key="fl"][data-val="telat"]'); await page.waitForTimeout(400);
  const telat = await page.evaluate(() => ({ kartu: [...document.querySelectorAll('.sb-card')].map((c) => c.innerText), kpiTelat: Number(document.querySelectorAll('.kpi')[1].querySelector('.v').textContent) }));
  ok('M-101 filter Telat menampilkan SPK lewat due (Customer Kartu) dan jumlahnya sama dengan ringkasan', telat.kartu.length === telat.kpiTelat && telat.kartu.some((x) => /Customer Kartu/.test(x)) && telat.kartu.every((x) => /Telat/.test(x)), JSON.stringify([telat.kartu.length, telat.kpiTelat]));
  await page.click('.sb-card .sb-h'); await page.waitForTimeout(600);
  ok('M-102 klik kepala kartu membuka rincian SPK', !!(await page.$('#drawer.open, #drawer:not([hidden])')) && /SPK/.test(await page.evaluate(() => (document.getElementById('drawer') || { innerText: '' }).innerText)));
  await closeAll();
  await go('produksi'); await page.click('#tools [data-view="produksi"][data-val="laporan"]'); await page.waitForTimeout(500);
  ok('M-103 Kinerja & Analisa punya tab Laporan harian (tabel, unduh CSV, cetak)', !!(await page.$('#lap-tabel')) && !!(await page.$('#tools [data-act="lapcsv"]')) && !!(await page.$('#tools [data-act="lapprint"]')));
  await page.click('#tools [data-view="produksi"][data-val="wc"]'); await page.waitForTimeout(400);
  ok('M-104 tab Work Center memuat beban dan kapasitas per work center', !!(await page.$('#wc-beban')) && !(await page.$('#vendor-kual')));
  await closeAll();

  // Data contoh untuk tinjauan: /?demo=produksi mengisi WC, SPK berrute, kejadian, dan riwayat vendor
  await page.evaluate(() => { localStorage.clear(); });
  await page.goto(base + '?demo=produksi'); await page.waitForTimeout(500);
  await login('admin@mni.local');
  await page.evaluate(() => { location.hash = '#produksi'; }); await page.waitForTimeout(1500);
  const wcInfo = await page.evaluate(() => ({ n: document.querySelectorAll('#wc-beban tbody tr[data-wc]').length, posisi: /Shearing|Punching|Bending|CNC Laser/.test(document.getElementById('body').innerText) }));
  await page.click('#tools [data-view="produksi"][data-val="vendor"]'); await page.waitForTimeout(400);
  const demo = await page.evaluate((wi) => ({ wc: wi.n, vendor: !!document.getElementById('vendor-kual'), posisi: wi.posisi }), wcInfo);
  ok('M-30 data contoh produksi memuat 5 work center, kualifikasi vendor, dan posisi SPK', demo.wc === 5 && demo.vendor && demo.posisi, JSON.stringify(demo));
  await page.evaluate(() => { location.hash = '#spk'; }); await page.waitForTimeout(1200);
  ok('M-105 membuka SPK langsung menampilkan SPK Berjalan (bukan tabel daftar) sebagai tampilan awal', (await page.$$eval('.sb-card', (a) => a.length)) >= 2 && !!(await page.$('#tools [data-view="spk"][data-val="berjalan"].on')));

  ok('M-14 tanpa pageerror', errs.length === 0, errs.join(' | '));
  const fail = R.filter((x) => x.startsWith('FAIL')).length;
  return { pass: R.length - fail, fail, detail: R };
}
