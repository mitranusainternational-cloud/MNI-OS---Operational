// Uji hak akses per pengguna dan per modul di UI (mock, VITE_LOCAL_MOCK=1):
// super admin menambah anggota dengan hak modul khusus, anggota itu hanya melihat modul yang diizinkan,
// hak lihat saja mengunci tombol catat, dan perubahan hak oleh admin berlaku setelah muat ulang.
// Penegakan di database (RLS) diuji terpisah dengan transaksi yang di-rollback (lihat TEST_MATRIX).

export async function runAccess(page, base) {
  const R = [];
  const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 160)));
  const tab = (t) => page.evaluate((t) => JSON.parse(localStorage.getItem('mni-local-mock-db')).tables[t], t);
  const opt = (sel, n) => page.evaluate(([s, n]) => [...document.querySelector(s).options].find((o) => o.text.includes(n))?.value, [sel, n]);
  const closeAll = async () => {
    await page.evaluate(() => { document.querySelector('#modal [data-act="closemodal"]')?.click(); document.querySelector('#drawer [data-act="closedrawer"]')?.click(); });
    await page.waitForTimeout(300);
  };
  const navIds = () => page.evaluate(() => [...document.querySelectorAll('#nav a')].map((a) => a.getAttribute('href').slice(1)));
  const go = async (r) => { await closeAll(); await page.click(`#nav a[href="#${r}"]`); await page.waitForTimeout(550); };
  const submit = async () => { await page.evaluate(() => document.getElementById('msub').click()); await page.waitForTimeout(1500); };
  const login = async (email) => {
    await page.evaluate(() => localStorage.removeItem('mni-local-mock-session'));
    await page.goto(base); await page.reload();
    await page.fill('#auth-email', email); await page.click('#auth-btn');
    await page.waitForSelector('#auth-otp', { state: 'visible' }); await page.fill('#auth-otp', '123456');
    await page.waitForTimeout(2000);
    await page.waitForFunction(() => document.querySelectorAll('#nav a').length > 1 && !/Tamu/.test(document.getElementById('who').innerText), null, { timeout: 30000 });
    await page.waitForTimeout(800);
  };
  const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

  await page.goto(base); await page.evaluate(() => localStorage.clear());

  // admin melihat menu Pengguna & Akses; peran lain tidak
  await login('viewer@mni.local');
  ok('A-01 viewer: menu Pengguna & Akses tidak tampil', !(await navIds()).includes('pengguna'));
  await login('admin@mni.local');
  ok('A-02 admin: menu Pengguna & Akses tampil', (await navIds()).includes('pengguna'));

  // admin menambah anggota: gudang bahan baku (ubah), bongkar muat (lihat saja), tanpa SPK
  await go('pengguna');
  await page.click('[data-act="uinvite"]'); await page.waitForTimeout(400);
  await page.fill('#m-nama', 'Tim Gudang Uji'); await page.fill('#m-email', 'timgudang@mni.local');
  await page.selectOption('select[name="role"]', 'gbb');
  await page.selectOption('select[name="mod_bongkar-muat"]', 'lihat');
  await page.selectOption('select[name="mod_spk"]', '');
  await submit();
  const pesan = await page.evaluate(() => (document.getElementById('m-invmsg') || {}).value || '');
  ok('A-03 akun dibuat dan pesan password tampil', /Password sementara: \S{8,}/.test(pesan) && pesan.includes('timgudang@mni.local'), pesan ? 'pesan siap' : 'tanpa pesan');
  await closeAll();
  const mu = (await tab('muser')).find((r) => r.email === 'timgudang@mni.local');
  ok('A-04 hak modul tersimpan', !!mu && mu.role === 'gbb' && mu.data.modul['bahan-baku'] === 'ubah' && mu.data.modul['bongkar-muat'] === 'lihat' && !mu.data.modul.spk, JSON.stringify(mu && mu.data));
  ok('A-05 daftar pengguna memuat anggota baru', (await page.evaluate(() => document.getElementById('body').innerText)).includes('timgudang@mni.local'));

  // anggota baru hanya melihat modul yang diizinkan
  await login('timgudang@mni.local');
  const ids = await navIds();
  ok('A-06 menu hanya modul yang diizinkan', sameSet(ids, ['dashboard', 'bahan-baku', 'bongkar-muat', 'master-data']), ids.join(','));
  await page.evaluate(() => { location.hash = '#spk'; }); await page.waitForTimeout(600);
  ok('A-07 membuka modul tanpa akses dialihkan ke dashboard', (await page.evaluate(() => document.getElementById('ttl').textContent)) === 'Dashboard');
  const nSpk = await page.evaluate(() => new Promise(async (res) => { const db = await window.claude.use('db'); db.collection('spk').onSnapshot((s) => res(s.docs.length)); }));
  ok('A-08 data SPK tidak terbaca tanpa akses', nSpk === 0, String(nSpk));
  await go('bahan-baku');
  await page.click('#tools [data-act="mv"]:has-text("Terima material")'); await page.waitForTimeout(400);
  const n0 = (await tab('mutasi')).length;
  await page.selectOption('#m-item-0', await opt('#m-item-0', 'Plat')); await page.fill('#m-qty-0', '3'); await page.fill('#m-pihak', 'Supplier Contoh A');
  await submit(); await closeAll();
  ok('A-09 hak ubah: terima material tercatat', (await tab('mutasi')).length === n0 + 1);
  await go('bongkar-muat');
  ok('A-10 hak lihat saja: perkakas modul terkunci', await page.evaluate(() => document.getElementById('tools').classList.contains('locked')));
  const asAdmin = await page.evaluate(async () => { const u = await window.claude.use('user'); try { await u.manage('create', { email: 'x@mni.local', nama: 'X', role: 'viewer' }); return 'lolos'; } catch (e) { return e.message; } });
  ok('A-11 bukan admin: kelola pengguna ditolak', /super admin/i.test(asAdmin), asAdmin);

  // admin menambah hak SPK; berlaku setelah anggota memuat ulang
  await login('admin@mni.local'); await go('pengguna');
  await page.evaluate(() => { [...document.querySelectorAll('#body tr')].find((tr) => tr.innerText.includes('timgudang@mni.local')).querySelector('[data-act="uedit"]').click(); });
  await page.waitForTimeout(400);
  await page.selectOption('select[name="mod_spk"]', 'lihat');
  await submit();
  const mu2 = (await tab('muser')).find((r) => r.email === 'timgudang@mni.local');
  ok('A-12 admin menambah hak SPK (lihat)', mu2.data.modul.spk === 'lihat' && mu2.data.modul['bahan-baku'] === 'ubah');
  await login('timgudang@mni.local');
  ok('A-13 menu SPK muncul setelah muat ulang', (await navIds()).includes('spk'));
  const nSpk2 = await page.evaluate(() => new Promise(async (res) => { const db = await window.claude.use('db'); db.collection('spk').onSnapshot((s) => res(s.docs.length)); }));
  ok('A-14 data SPK terbaca setelah diberi akses', nSpk2 > 0, String(nSpk2));

  ok('A-15 tanpa pageerror', errs.length === 0, errs.join(' | '));
  const fail = R.filter((x) => x.startsWith('FAIL')).length;
  return { pass: R.length - fail, fail, detail: R };
}
