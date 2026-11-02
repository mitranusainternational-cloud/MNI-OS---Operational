// Uji asap per modul untuk pratinjau lokal mode mock (VITE_LOCAL_MOCK=1).
// Fungsi menerima objek `page` Playwright, jadi bisa dijalankan lewat Playwright MCP
// (browser_run_code_unsafe) atau dari runner Playwright biasa.
//
//   await runModules(page, 'http://127.0.0.1:5173/')  -> { results, errors }
//
// Setiap modul diklasifikasikan: PASS bila judul sesuai, isi tampil, dan tidak ada
// galat JavaScript selama modul dibuka. Ini uji UI dengan data sintetis mock;
// bukan uji Supabase, Auth nyata, atau RLS.

export const MODULES = [
  ['dashboard', 'Dashboard'],
  ['bahan-baku', 'Gudang Bahan Baku'],
  ['barang-jadi', 'Gudang Barang Jadi'],
  ['bongkar-muat', 'Bongkar Muat'],
  ['vendor', 'Kirim ke Vendor'],
  ['pengiriman', 'Kirim ke Customer'],
  ['spk', 'Monitoring SPK'],
  ['produksi', 'Dashboard Produksi'],
  ['cek-data', 'Cek Data'],
  ['master-data', 'Master Data'],
];

export async function login(page, base, email = 'admin@mni.local', otp = '123456') {
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForSelector('#auth-email', { timeout: 10000 });
  await page.fill('#auth-email', email);
  await page.click('#auth-btn');
  await page.waitForSelector('#auth-otp', { state: 'visible' });
  await page.fill('#auth-otp', otp);
  // Setelah login halaman dimuat ulang agar app.js membaca sesi (lihat index.html), jadi tunggu shell siap.
  await page.waitForTimeout(3000);
  await page.waitForFunction(() => getComputedStyle(document.getElementById('auth-gate')).display === 'none' && document.querySelectorAll('#nav a').length > 5, null, { timeout: 8000 });
  await page.waitForTimeout(800);
}

export async function runModules(page, base) {
  const errors = [];
  page.on('pageerror', (e) => errors.push({ at: Date.now(), msg: String(e.message || e).slice(0, 200) }));
  await login(page, base);
  const results = [];
  for (const [route, label] of MODULES) {
    const before = errors.length;
    await page.click(`#nav a[href="#${route}"]`);
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => ({
      title: document.getElementById('ttl')?.textContent?.trim(),
      len: (document.getElementById('body')?.innerText || '').trim().length,
      tools: document.getElementById('tools')?.children.length || 0,
    }));
    const errs = errors.slice(before).map((e) => e.msg);
    const ok = info.title === label && info.len > 30 && errs.length === 0;
    results.push({ route, label, status: ok ? 'PASS' : 'FAIL', title: info.title, textLen: info.len, tools: info.tools, errors: errs });
  }
  return { results, errors };
}
