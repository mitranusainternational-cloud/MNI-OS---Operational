// Uji modul Penawaran (mock, VITE_LOCAL_MOCK=1) dengan katalog sintetis dari tests/e2e/fixtures.
//   const { pass, fail, detail } = await runPenawaran(page, 'http://127.0.0.1:5173/');
// Angka di layar dibandingkan dengan mesin harga (src/lib/erp/harga.js), bukan dengan angka yang diketik tangan.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { hitungBaris, totalPenawaran } from '../../src/lib/erp/harga.js';

const FX = new URL('./fixtures/', import.meta.url);
const kat = JSON.parse(fs.readFileSync(new URL('katalog-harga-uji.json', FX), 'utf8'));
const sk = JSON.parse(fs.readFileSync(new URL('skenario-harga-uji.json', FX), 'utf8')).skenario;
const berkas = (f) => fileURLToPath(new URL(f, FX));
const angka = (t) => Number(String(t).replace(/[^\d]/g, ''));

export async function runPenawaran(page, base) {
  const R = [];
  const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 160)));
  page.on('dialog', (d) => d.accept());
  const tab = (t) => page.evaluate((t) => JSON.parse(localStorage.getItem('mni-local-mock-db')).tables[t], t);
  const login = async (email) => {
    await page.goto(base);
    await page.evaluate(() => localStorage.removeItem('mni-local-mock-session'));
    await page.reload();
    await page.fill('#auth-email', email); await page.click('#auth-btn');
    await page.waitForSelector('#auth-otp', { state: 'visible' }); await page.fill('#auth-otp', '123456');
    await page.waitForTimeout(2000);
    await page.waitForFunction(() => document.querySelectorAll('#nav a').length > 1 && !/Tamu/.test(document.getElementById('who').innerText), null, { timeout: 30000 });
    await page.waitForTimeout(800);
  };
  const buka = async () => { await page.evaluate(() => { location.hash = '#penawaran'; }); await page.waitForTimeout(600); };
  const toast = () => page.evaluate(() => document.getElementById('toast').textContent);
  const tutupModal = async () => { await page.evaluate(() => { document.querySelector('#modal [data-act="closemodal"]')?.click(); }); await page.waitForTimeout(250); };
  const kirimModal = async () => { await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1200); };
  const status = () => page.evaluate(() => (document.querySelector('.pq-tt .chip') || {}).textContent);
  const nomor = () => page.evaluate(() => document.querySelector('.pq-tt b').textContent.replace('Penawaran ', '').trim());
  const isi = async (r, w, h, l, q) => {
    const row = `#pq-r-${r}`;
    if (w != null) await page.fill(`${row} [data-pqu="w"]`, String(w));
    if (h != null) await page.fill(`${row} [data-pqu="h"]`, String(h));
    if (l != null) await page.fill(`${row} [data-pqu="l"]`, String(l));
    if (q != null) await page.fill(`${row} [data-pqq]`, String(q));
    await page.waitForTimeout(150);
  };
  const jalur = async (email) => { await login(email); await buka(); };

  // ---------- admin: daftar kosong, pasang katalog ----------
  await login('admin@mni.local'); await buka();
  const awal = await page.evaluate(() => ({ nav: !!document.querySelector('#nav a[href="#penawaran"]'), txt: document.getElementById('body').innerText, kpi: document.querySelectorAll('.kpi').length, baru: !!document.querySelector('[data-act="pqbaru"]') }));
  ok('N-01 menu Penawaran terlihat untuk admin; daftar kosong memberi tahu katalog belum dipasang', awal.nav && /Katalog harga belum dipasang/.test(awal.txt) && awal.kpi === 4 && awal.baru, JSON.stringify({ kpi: awal.kpi }));
  await page.click('#tools [data-act="pqkatalog"]'); await page.waitForSelector('#m-kh');
  await page.setInputFiles('#m-kh', berkas('katalog-harga-uji.json')); await page.setInputFiles('#m-sh', berkas('skenario-harga-uji.json'));
  await kirimModal();
  const pasang = await page.evaluate(() => ({ info: window.MNIHarga.info(), ada: window.MNIHarga.ada(), peringatan: /Katalog harga belum dipasang/.test(document.getElementById('body').innerText) }));
  ok('N-02 katalog dan skenario terpasang dari berkas dan tersimpan terkompresi di master; peringatan hilang', pasang.ada && pasang.info.bentuk === 5 && pasang.info.keluarga === 3 && pasang.info.skenario === 2 && !pasang.peringatan && (await tab('master')).some((m) => m.key === 'katalog_harga') && (await tab('master')).some((m) => m.key === 'skenario_harga'), JSON.stringify(pasang.info));

  // ---------- lembar baru: hitung, ganti bentuk, varian ----------
  await page.click('#tools [data-act="pqbaru"]'); await page.waitForTimeout(500);
  const baru = await page.evaluate(() => ({ judul: document.querySelector('.pq-tt').innerText, baris: document.querySelectorAll('#pq-items tbody tr').length, varian: document.querySelectorAll('.pq-vt').length, tools: document.getElementById('tools').hidden }));
  ok('N-03 penawaran baru: Draft tanpa nomor sampai disimpan, satu varian dan satu baris, bilah alat daftar disembunyikan', /baru/.test(baru.judul) && /Draft/.test(baru.judul) && baru.baris === 1 && baru.varian === 1 && baru.tools, JSON.stringify(baru));
  await page.click('[data-act="pqsimpan"]'); await page.waitForTimeout(400);
  ok('N-04 simpan tanpa customer ditolak dengan pesan jelas', /customer/i.test(await toast()) && (await tab('penawaran')).length === 0, await toast());
  await page.fill('#pq-cust', 'PT Contoh Uji'); await page.fill('[data-pqh="attn"]', 'Ibu Contoh'); await page.fill('[data-pqh="proyek"]', 'Gedung Uji');
  await isi(0, 200, 50, 3000, 10);
  const h1 = hitungBaris(kat, sk[0], 'SLU_STRAIGHT_LADDER', { w: 200, h: 50, l: 3000 }, 10);
  const l1 = await page.evaluate(() => ({ hs: document.querySelector('#pq-r-0 .pq-hs').innerText, jm: document.querySelector('#pq-r-0 .pq-jm').innerText, kg: document.querySelector('#pq-r-0 .pq-kg').innerText }));
  ok('N-05 harga satuan, jumlah, dan berat di layar sama dengan mesin harga', angka(l1.hs) === h1.hargaSatuan && angka(l1.jm) === h1.jumlah && Number(l1.kg.replace(',', '.')) === Math.round(h1.kgEstimasiTotal * 100) / 100, JSON.stringify([l1, h1.hargaSatuan]));
  // baris kedua: ganti keluarga
  await page.click('[data-act="pqtambah"]'); await page.waitForTimeout(250);
  const kopi = await page.evaluate(() => ({ kel: document.querySelector('#pq-r-1 [data-pqk]').value, bentuk: document.querySelector('#pq-r-1 [data-pqb]').value }));
  ok('N-06 baris baru mengikuti keluarga dan bentuk baris terakhir agar input beruntun cepat', kopi.kel === 'SLU' && kopi.bentuk === 'SLU_STRAIGHT_LADDER', JSON.stringify(kopi));
  await page.selectOption('#pq-r-1 [data-pqk]', 'STU'); await page.waitForTimeout(250);
  const ganti = await page.evaluate(() => ({ bentuk: document.querySelector('#pq-r-1 [data-pqb]').value, opsi: [...document.querySelector('#pq-r-1 [data-pqb]').options].map((o) => o.value), ukuran: [...document.querySelectorAll('#pq-r-1 [data-pqu]')].map((i) => i.dataset.pqu) }));
  ok('N-07 ganti keluarga menampilkan hanya bentuk keluarga itu dan kolom ukuran yang sesuai', ganti.bentuk === 'STU_STRAIGHT_TRAY' && ganti.opsi.join() === 'STU_STRAIGHT_TRAY,STU_END_STOP' && ganti.ukuran.join() === 'w,l', JSON.stringify(ganti));
  await isi(1, 100, null, 3000, 4);
  // ganti bentuk dalam keluarga SLU mempertahankan ukuran bernama sama
  await page.selectOption('#pq-r-0 [data-pqb]', 'SLU_HORIZONTAL_ELBOW_90'); await page.waitForTimeout(250);
  const el = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('#pq-r-0 [data-pqu]')].map((i) => [i.dataset.pqu, i.value])));
  ok('N-08 ganti bentuk dalam keluarga yang sama mempertahankan ukuran bernama sama (w, h) dan mengosongkan yang baru (r)', el.w === '200' && el.h === '50' && el.r === '', JSON.stringify(el));
  await page.selectOption('#pq-r-0 [data-pqb]', 'SLU_STRAIGHT_LADDER'); await page.waitForTimeout(250);
  await isi(0, null, null, 3000, null);
  const tot1 = await page.evaluate(() => document.getElementById('pq-tot').innerText);
  const hb = hitungBaris(kat, sk[0], 'STU_STRAIGHT_TRAY', { w: 100, l: 3000 }, 4);
  const T1 = totalPenawaran({ jumlah: [h1.jumlah, hb.jumlah], diskon: 0.3, ppn: 0.11, bulatkan: true });
  const nums = [...tot1.matchAll(/Rp\s*([\d.]+)/g)].map((m) => angka(m[1]));
  ok('N-09 ringkasan: subtotal, diskon 30%, setelah diskon, PPN 11%, total dibulatkan Rupiah sama dengan mesin', nums[0] === T1.subtotal && nums[1] === T1.diskon && nums[2] === T1.dpp && nums[3] === T1.ppn && nums[4] === T1.total, JSON.stringify([nums, T1]));
  // varian
  await page.click('[data-act="pqvbaru"]'); await page.waitForTimeout(300);
  await page.selectOption('[data-pqv="skenario"]', '1'); await page.waitForTimeout(250);
  const vtx = await page.evaluate(() => [...document.querySelectorAll('.pq-vt small')].map((b) => Number(b.textContent.replace(/[^\d]/g, ''))));
  const hA = totalPenawaran({ jumlah: [h1.jumlah, hb.jumlah], diskon: 0.3, ppn: 0.11, bulatkan: true }).total;
  const hB = totalPenawaran({ jumlah: [hitungBaris(kat, sk[1], 'SLU_STRAIGHT_LADDER', { w: 200, h: 50, l: 3000 }, 10).jumlah, hitungBaris(kat, sk[1], 'STU_STRAIGHT_TRAY', { w: 100, l: 3000 }, 4).jumlah], diskon: 0.3, ppn: 0.11, bulatkan: true }).total;
  ok('N-10 varian baru menyalin item; skenario B memberi total berbeda yang sama dengan mesin; tab menampilkan total tiap varian', vtx.length === 2 && vtx[0] === hA && vtx[1] === hB && hB < hA, JSON.stringify([vtx, hA, hB]));
  await page.click('[data-act="pqvhapus"]'); await page.waitForTimeout(300);
  ok('N-11 hapus varian menyisakan satu varian', (await page.$$eval('.pq-vt', (a) => a.length)) === 1);
  await page.click('[data-act="pqvbaru"]'); await page.waitForTimeout(300); await page.selectOption('[data-pqv="skenario"]', '1');

  // ---------- simpan, nomor, daftar ----------
  await page.click('[data-act="pqsimpan"]'); await page.waitForTimeout(800);
  const d1 = (await tab('penawaran'))[0];
  const thn = new Date().getFullYear();
  ok('N-12 simpan memberi nomor urutan.KODE/bulan/tahun, menyimpan varian dan item, status Draft', d1 && /^001\.MNI\/\d{2}\/\d{4}$/.test((d1.data && d1.data.nomor) || d1.nomor || '') && (await nomor()).startsWith('001.MNI/') && (d1.data ? d1.data.varian : d1.varian).length === 2 && (await status()) === 'Draft', JSON.stringify({ nomor: await nomor(), thn }));
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(400);
  const dl = await page.evaluate(() => ({ baris: document.querySelectorAll('#pq-list tbody tr').length, teks: document.querySelector('#pq-list tbody tr').innerText.replace(/\s+/g, ' ') }));
  ok('N-13 daftar menampilkan penawaran: nomor, customer dan proyek, jumlah varian, status Draft', dl.baris === 1 && /001\.MNI/.test(dl.teks) && /PT Contoh Uji/.test(dl.teks) && /Gedung Uji/.test(dl.teks) && /Draft/.test(dl.teks), dl.teks);
  await page.click('#pq-list tbody tr'); await page.waitForTimeout(500);
  const buka2 = await page.evaluate(() => ({ cust: document.getElementById('pq-cust').value, vt: document.querySelectorAll('.pq-vt').length, w: document.querySelector('#pq-r-0 [data-pqu="w"]').value }));
  ok('N-14 membuka kembali menampilkan data tersimpan', buka2.cust === 'PT Contoh Uji' && buka2.vt === 2 && buka2.w === '200', JSON.stringify(buka2));

  // ---------- kirim: periksa kelengkapan ----------
  await page.click('[data-act="pqtambah"]'); await page.waitForTimeout(250);
  await page.click('[data-act="pqkirim"]'); await page.waitForTimeout(400);
  const gagal = await toast();
  ok('N-15 kirim ditolak bila ada baris yang ukurannya belum lengkap, pesan menyebut penyebabnya', /Ukuran kurang/.test(gagal) && (await status()) === 'Draft', gagal);
  await page.click('[data-act="pqhapus"][data-i="2"]'); await page.waitForTimeout(250);
  await page.click('[data-act="pqkirim"]'); await page.waitForTimeout(900);
  ok('N-16 diskon dalam batas: kirim langsung menjadi Terkirim, kolom isian terkunci', (await status()) === 'Terkirim' && (await page.$$eval('#pq-cust, [data-pqq]', (a) => a.every((x) => x.disabled))), await status());

  // ---------- setuju customer, revisi ----------
  await page.click('[data-act="pqsetujucustomer"]'); await page.waitForSelector('#m-varian'); await page.selectOption('#m-varian', 'B'); await kirimModal();
  const set = await page.evaluate(() => ({ chip: [...document.querySelectorAll('.pq-vs .chip')].map((c) => c.textContent).join(), aksi: [...document.querySelectorAll('.pq-bar [data-act]')].map((b) => b.dataset.act).join() }));
  ok('N-17 customer setuju: status Disetujui, varian terpilih tercatat, tombol revisi dan cetak tersedia', (await status()) === 'Disetujui' && /Dipilih: B/.test(set.chip) && /pqrevisi/.test(set.aksi) && !/pqkirim/.test(set.aksi), JSON.stringify(set));
  await page.click('[data-act="pqrevisi"]'); await page.waitForTimeout(900);
  const rev = await page.evaluate(() => ({ judul: document.querySelector('.pq-tt').innerText.replace(/\n/g, ' '), riwayat: document.querySelectorAll('.pq-rw .note').length, edit: !document.getElementById('pq-cust').disabled }));
  ok('N-18 revisi: nomor dasar sama dengan Rev.1, kembali Draft dan bisa diedit, riwayat menyimpan versi lama', /001\.MNI\/\d{2}\/\d{4} Rev\.1/.test(rev.judul) && /Draft/.test(rev.judul) && rev.riwayat === 1 && rev.edit, rev.judul);
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);

  // ---------- cetak ----------
  await page.click('#pq-list tbody tr'); await page.waitForTimeout(400);
  const [pop] = await Promise.all([page.waitForEvent('popup'), page.click('[data-act="pqcetak"]')]);
  await pop.waitForLoadState('domcontentloaded');
  const cetak = await pop.evaluate(() => document.body.innerText);
  ok('N-19 cetak untuk customer: nama, nomor, deskripsi item, harga, total; tanpa berat dan biaya', /PT Contoh Uji/.test(cetak) && /001\.MNI/.test(cetak) && /SLU Straight Ladder W200xH50xL3000/.test(cetak) && /TOTAL/.test(cetak) && !/kg|Berat/i.test(cetak), cetak.slice(0, 80).replace(/\n/g, ' '));
  await pop.close();
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);

  // ---------- T-191: muat ke SPK, snapshot PO, pembaruan dari revisi ----------
  const pnwDb = async () => (await tab('penawaran'))[0];
  const dataPnw = (r) => ({ ...(r.data || {}), ...r });
  const spkAll = async () => (await tab('spk')).map((r) => ({ ...(r.data || {}), ...r }));
  const setujui = async () => {
    await page.click('[data-act="pqkirim"]'); await page.waitForTimeout(900);
    await page.click('[data-act="pqsetujucustomer"]'); await page.waitForTimeout(500);
    if (await page.$('#m-varian')) { await page.selectOption('#m-varian', { index: 0 }); await kirimModal(); }
    await page.waitForTimeout(400);
  };
  await page.click('#pq-list tbody tr'); await page.waitForTimeout(400);
  const sebelum = await page.evaluate(() => !!document.querySelector('[data-act="pqmuatspk"]'));
  await setujui();
  const siap = await page.evaluate(() => ({ muat: !!document.querySelector('[data-act="pqmuatspk"]'), buka: !!document.querySelector('[data-act="pqbukaspk"]') }));
  ok('N-28 tombol Muat ke SPK hanya muncul pada penawaran Disetujui (admin berhak SPK)', !sebelum && (await status()) === 'Disetujui' && siap.muat && !siap.buka, JSON.stringify({ sebelum, siap }));
  const n0 = (await spkAll()).length;
  await page.click('[data-act="pqmuatspk"]'); await page.waitForSelector('#m-po'); await page.fill('#m-po', 'PO-UJI-1'); await kirimModal();
  await page.waitForSelector('#editor:not([hidden])', { timeout: 8000 });
  await page.waitForTimeout(500);
  const ed = await page.evaluate(() => ({ cust: document.getElementById('ed-cust').value, po: document.getElementById('ed-po').value, sec: document.querySelectorAll('#ed-secs .esec').length, baris: document.querySelectorAll('#ed-secs tbody tr').length, desc: [...document.querySelectorAll('#ed-secs [data-f="d"]')].map((i) => i.value), w: [...document.querySelectorAll('#ed-secs [data-f="w"]')].map((i) => parseFloat(i.value)), q: [...document.querySelectorAll('#ed-secs [data-f="q"]')].map((i) => parseFloat(i.value)) }));
  ok('N-29 Muat ke SPK membuka editor SPK baru berisi customer, PO, item per keluarga dengan jumlah dan berat real; belum ada SPK tersimpan', ed.cust === 'PT Contoh Uji' && ed.po === 'PO-UJI-1' && ed.sec >= 1 && ed.baris >= 1 && ed.desc.some((d) => /SLU Straight Ladder W200xH50xL3000/.test(d)) && ed.w.every((w) => w > 0) && ed.q.every((q) => q > 0) && (await spkAll()).length === n0, JSON.stringify(ed).slice(0, 220));
  await page.click('[data-act="ed-save"][data-mode="draft"]'); await page.waitForTimeout(1800);
  const lencana = await page.evaluate(() => (document.querySelector('.sh-pnw') || {}).textContent || '');
  await page.evaluate(() => document.querySelector('[data-act="sheet-close"]')?.click()); await page.waitForTimeout(300);
  const sAll = await spkAll(); const sBaru = sAll[sAll.length - 1]; const pn = dataPnw(await pnwDb());
  ok('N-30 SPK Draft tersimpan dengan tautan ke penawaran (nomor, Rev, varian) dan tanpa harga; penawaran menyimpan spkId dan PO', sAll.length === n0 + 1 && sBaru.status === 'Draft' && sBaru.po === 'PO-UJI-1' && sBaru.penawaran && /^001\.MNI\//.test(sBaru.penawaran.nomor) && sBaru.penawaran.rev === pn.rev && pn.spkId === 'spk-' + sBaru.no && String(pn.spkNo) === String(sBaru.no) && pn.po === 'PO-UJI-1' && !/hargaSatuan|jumlah"|total/.test(JSON.stringify(sBaru.items)) && /Dari penawaran 001\.MNI/.test(lencana), JSON.stringify({ n: sAll.length, ref: sBaru.penawaran, spkId: pn.spkId, lencana }));
  const snap1 = JSON.stringify(pn.snapshot);
  const sn = pn.snapshot || {};
  ok('N-31 snapshot PO tersimpan di penawaran: tanggal, PO, Rev, varian, total, berat dan harga per baris; panel Snapshot PO tampil', sn.po === 'PO-UJI-1' && sn.rev === pn.rev && sn.total && sn.total.total > 0 && sn.kg && sn.kg.real > 0 && sn.baris && sn.baris.length >= 1 && sn.baris[0].hargaSatuan > 0 && /snapshot po/i.test(await page.evaluate(() => document.querySelector('.pq-side').innerText)), snap1.slice(0, 120));
  const idem = await page.evaluate(() => ({ muat: !!document.querySelector('[data-act="pqmuatspk"]'), buka: !!document.querySelector('[data-act="pqbukaspk"]'), perbarui: !!document.querySelector('[data-act="pqperbaruispk"]') }));
  ok('N-32 idempoten: setelah ditautkan tidak ada tombol Muat ke SPK lagi, hanya Buka SPK; jumlah SPK tidak bertambah', !idem.muat && idem.buka && !idem.perbarui && (await spkAll()).length === n0 + 1, JSON.stringify(idem));
  await page.click('[data-act="pqrevisi"]'); await page.waitForTimeout(900);
  await isi(0, null, null, null, 20); await page.click('[data-act="pqsimpan"]'); await page.waitForTimeout(700);
  await setujui();
  const pn2 = dataPnw(await pnwDb());
  const idem2 = await page.evaluate(() => (document.querySelector('[data-act="pqperbaruispk"]') || {}).textContent || '');
  ok('N-33 revisi disetujui lagi: snapshot lama tetap beku (Rev lama, total lama) dan muncul Perbarui SPK dari Rev baru', pn2.rev === pn.rev + 1 && JSON.stringify(pn2.snapshot) === snap1 && new RegExp('Rev\\.' + pn2.rev).test(idem2), idem2);
  await page.click('[data-act="pqperbaruispk"]'); await page.waitForSelector('#editor:not([hidden])', { timeout: 8000 }); await page.waitForTimeout(500);
  const ed2 = await page.evaluate(() => ({ po: document.getElementById('ed-po').value, q: parseFloat(document.querySelector('#ed-secs [data-f="q"]').value) }));
  await page.click('[data-act="ed-save"][data-mode="draft"]'); await page.waitForTimeout(1800);
  await page.evaluate(() => document.querySelector('[data-act="sheet-close"]')?.click()); await page.waitForTimeout(300);
  const sAll2 = await spkAll(); const pn3 = dataPnw(await pnwDb());
  const sUpd = sAll2.find((x) => String(x.no) === String(pn.spkNo));
  const sisa = await page.evaluate(() => !!document.querySelector('[data-act="pqperbaruispk"]'));
  ok('N-34 Perbarui SPK memuat item revisi ke SPK yang sama (tanpa SPK baru), PO terjaga, tautan Rev dan snapshot diperbarui', ed2.po === 'PO-UJI-1' && ed2.q === 20 && sAll2.length === n0 + 1 && sUpd && sUpd.penawaran.rev === pn2.rev && sUpd.items.some((i) => i.q === 20) && pn3.spkRev === pn2.rev && pn3.snapshot.rev === pn2.rev && !sisa, JSON.stringify({ ed2, rev: sUpd && sUpd.penawaran, spkRev: pn3.spkRev }));
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);
  await jalur('sales@mni.local');
  await page.click('#pq-list tbody tr'); await page.waitForTimeout(500);
  const sSpk = await page.evaluate(() => ({ muat: !!document.querySelector('[data-act="pqmuatspk"]'), perbarui: !!document.querySelector('[data-act="pqperbaruispk"]'), buka: !!document.querySelector('[data-act="pqbukaspk"]'), st: (document.querySelector('.pq-tt .chip') || {}).textContent }));
  ok('N-35 Sales (tanpa hak ubah SPK) tidak melihat tombol Muat atau Perbarui SPK, hanya Buka SPK', sSpk.st === 'Disetujui' && !sSpk.muat && !sSpk.perbarui && sSpk.buka, JSON.stringify(sSpk));
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);

  // ---------- Sales dan persetujuan diskon ----------
  await jalur('sales@mni.local');
  const sNav = await page.evaluate(() => ({ nav: !!document.querySelector('#nav a[href="#penawaran"]'), katalog: !!document.querySelector('[data-act="pqkatalog"]'), aturan: !!document.querySelector('[data-act="pqaturan"]'), baru: !!document.querySelector('[data-act="pqbaru"]') }));
  ok('N-20 Sales melihat dan membuat penawaran tetapi tidak mengelola katalog dan aturan', sNav.nav && sNav.baru && !sNav.katalog && !sNav.aturan, JSON.stringify(sNav));
  await page.click('[data-act="pqbaru"]'); await page.waitForTimeout(400);
  await page.fill('#pq-cust', 'PT Diskon Besar'); await isi(0, 200, 50, 3000, 5);
  await page.fill('[data-pqv="diskon"]', '45'); await page.waitForTimeout(250);
  const peringatan = await page.evaluate(() => ({ info: !document.getElementById('pq-perlu').hidden, tombol: document.querySelector('[data-act="pqkirim"]').textContent }));
  ok('N-21 diskon di atas batas Sales memunculkan peringatan dan mengubah tombol menjadi Ajukan persetujuan diskon', peringatan.info && /Ajukan persetujuan/.test(peringatan.tombol), JSON.stringify(peringatan));
  await page.click('[data-act="pqkirim"]'); await page.waitForTimeout(900);
  const sAjuan = await page.evaluate(() => ({ st: document.querySelector('.pq-tt .chip').textContent, setuju: !!document.querySelector('[data-act="pqsetujudiskon"]'), info: document.querySelector('.pq-info.warn:not([hidden])') ? document.querySelector('.pq-info.warn:not([hidden])').innerText : '' }));
  ok('N-22 diskon melewati batas: status Menunggu persetujuan; Sales tidak punya tombol setuju', sAjuan.st === 'Menunggu persetujuan' && !sAjuan.setuju && /Menunggu persetujuan super admin/.test(sAjuan.info), JSON.stringify(sAjuan));
  await jalur('admin@mni.local');
  await page.click('#pq-list tbody tr:has-text("PT Diskon Besar")'); await page.waitForTimeout(500);
  const aAjuan = await page.evaluate(() => ({ setuju: !!document.querySelector('[data-act="pqsetujudiskon"]'), kembali: !!document.querySelector('[data-act="pqkembalikan"]') }));
  await page.click('[data-act="pqsetujudiskon"]'); await page.waitForTimeout(900);
  ok('N-23 super admin melihat tombol setuju dan kembalikan; menyetujui membuat penawaran Terkirim', aAjuan.setuju && aAjuan.kembali && (await status()) === 'Terkirim', JSON.stringify(aAjuan));
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);

  // ---------- aturan, penomoran ----------
  await page.click('#tools [data-act="pqaturan"]'); await page.waitForSelector('#m-kode');
  await page.fill('#m-kode', 'BTJ'); await page.fill('#m-bs', '20'); await kirimModal();
  await page.click('#tools [data-act="pqbaru"]'); await page.waitForTimeout(400);
  await page.fill('#pq-cust', 'PT Nomor Baru'); await isi(0, 100, 20, 1000, 1);
  await page.click('[data-act="pqsimpan"]'); await page.waitForTimeout(800);
  const no3 = await nomor();
  ok('N-24 aturan diubah admin berlaku pada penawaran baru: kode baru pada nomor, urutan berlanjut tanpa ganda', /^003\.BTJ\/\d{2}\/\d{4}$/.test(no3), no3);
  await page.click('[data-act="pqtutup"]'); await page.waitForTimeout(300);

  // ---------- hak akses ----------
  const tanpa = [];
  for (const email of ['ppic@mni.local', 'viewer@mni.local', 'produksi@mni.local']) {
    await login(email);
    const v = await page.evaluate(() => !!document.querySelector('#nav a[href="#penawaran"]'));
    await page.evaluate(() => { location.hash = '#penawaran'; }); await page.waitForTimeout(500);
    const hash = await page.evaluate(() => ({ ttl: document.getElementById('ttl').textContent, n: document.querySelectorAll('#pq-list').length }));
    tanpa.push(!v && hash.ttl !== 'Penawaran' && hash.n === 0);
  }
  ok('N-25 PPIC, Viewer, dan Produksi tidak melihat menu Penawaran dan tidak bisa membukanya lewat alamat', tanpa.every(Boolean), JSON.stringify(tanpa));
  // ---------- HP ----------
  await login('admin@mni.local'); await buka();
  await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(300);
  await page.click('#pq-list tbody tr'); await page.waitForTimeout(500);
  const hp = await page.evaluate(() => ({ lebar: document.documentElement.scrollWidth, layar: innerWidth, tabelGulir: (() => { const t = document.querySelector('#pq-items'); const w = t && t.closest('.tbl-wrap'); return w ? w.scrollWidth > w.clientWidth : false; })() }));
  ok('N-26 di HP (390 px) lembar tidak melebarkan halaman; tabel item bergulir di dalam kotaknya', hp.lebar <= hp.layar + 1 && hp.tabelGulir, JSON.stringify(hp));
  await page.setViewportSize({ width: 1280, height: 800 });
  ok('N-27 tanpa pageerror', errs.length === 0, errs.join(' | '));
  const fail = R.filter((x) => x.startsWith('FAIL')).length;
  return { pass: R.length - fail, fail, detail: R };
}
