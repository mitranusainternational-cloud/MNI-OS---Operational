---
type: test-matrix
status: active
updated: 2026-11-02
---

# Matriks uji modul dan fitur (pratinjau lokal mode mock)

Hasil uji `apps/mni-app` di browser (Playwright) pada mode mock lokal: data sintetis di `localStorage`, tanpa Supabase. **Yang dibuktikan:** UI dan alur bisnis di sisi klien berjalan dan datanya tersimpan di penyimpanan lokal. **Yang tidak dibuktikan:** Supabase, Auth nyata, RLS, realtime antar pengguna, dan kinerja. Itu tetap tugas [[tasks/T-020-verifikasi-login-otp-end-to-end-lokal|T-020]], T-021, dan T-022 setelah Docker hidup ([[DOCKER_SETUP]]).

Tanggal uji: 2026-11-02 · Cabang: `development` · Panduan menjalankan: [[LOCAL_PREVIEW]] · Skrip: `apps/mni-app/tests/e2e/`.

## Ringkasan

| Hasil | Jumlah |
|---|---|
| Modul dibuka tanpa galat JavaScript | 10 / 10 |
| Fitur inti diuji dan lulus | 14 |
| Ekspor CSV berfungsi | 9 / 9 (setelah perbaikan B-005) |
| Bug ditemukan dan diperbaiki | 5 |
| Fitur belum diuji | lihat bagian terakhir |

## Uji per modul (smoke)

| Modul | Rute | Hasil | Catatan |
|---|---|---|---|
| Dashboard | `#dashboard` | PASS | KPI dihitung dari data seed; konsisten setelah transaksi |
| Gudang Bahan Baku | `#bahan-baku` | PASS | |
| Gudang Barang Jadi | `#barang-jadi` | PASS | |
| Bongkar Muat | `#bongkar-muat` | PASS | |
| Kirim ke Vendor | `#vendor` | PASS | |
| Kirim ke Customer | `#pengiriman` | PASS | |
| Monitoring SPK | `#spk` | PASS | |
| Dashboard Produksi | `#produksi` | PASS | |
| Cek Data | `#cek-data` | PASS | |
| Master Data | `#master-data` | PASS | |

Kriteria PASS: judul benar, isi tampil, tidak ada `pageerror`. Skrip: `tests/e2e/modules.mjs`.

## Uji fitur inti

| ID | Fitur | Skenario | Hasil | Bukti |
|---|---|---|---|---|
| F-01 | Login | Email terdaftar + kode lokal, lalu nama pengguna tampil | PASS | Sidebar "Admin Lokal" setelah perbaikan B-002 |
| F-02 | Bahan baku: item baru | Isi form, simpan | PASS | Baris bertambah, tersimpan, bertahan setelah muat ulang |
| F-03 | Bahan baku: terima material | Tambah 7 lbr | PASS | Stok 10 → 17, mutasi `masuk` dicatat, nomor dok RCV/… |
| F-04 | Bahan baku: pakai produksi | 3 lbr dengan SPK | PASS | Stok 24 → 21, mutasi dicatat |
| F-05 | Validasi: pakai melebihi stok | 999 lbr | PASS | Ditolak, dialog tetap terbuka, mutasi tidak bertambah |
| F-06 | Validasi: pakai tanpa SPK/keterangan | Kosong | PASS | Ditolak |
| F-07 | Barang jadi masuk | +5 btg | PASS | Total stok 380 → 385 |
| F-08 | Barang jadi keluar melebihi stok | 999 | PASS | Ditolak, tidak ada mutasi |
| F-09 | Master: tambah vendor | Isi nama, simpan | PASS | Baris `mvendor` bertambah |
| F-10 | SPK baru dan terbitkan | Isi pelanggan, PO, due, 1 baris | PASS | No otomatis 1003, status Terbit |
| F-11 | Kirim ke vendor | Vendor + SPK 1003 | PASS | Dokumen `vendor` dibuat; antrean bongkar muat otomatis |
| F-12 | Kirim ke customer | SPK 1001 | PASS | Surat jalan SJ/2026/11/001; antrean bongkar muat otomatis |
| F-13 | Bongkar muat: kendaraan masuk | Pihak + armada manual | PASS | Entri unloading tampil; validasi armada wajib |
| F-14 | Ekspor CSV | 9 modul | PASS | `MNI-rm-…csv`, `MNI-fg-…`, `MNI-spk-…`, dan seterusnya |

## Bug dan perbaikan

| ID | Temuan | Penyebab | Perbaikan | Status |
|---|---|---|---|---|
| B-001 | `USER.profiles is not a function` pada setiap render | Adapter user tidak menyediakan `profiles()` yang dipanggil app | `profiles(ids)` ditambahkan di `claude-adapter.js` | Selesai |
| B-002 | Sidebar tetap "Tamu" setelah login | app.js membaca user sekali saat boot (sebelum login) | `index.html` memuat ulang halaman saat `SIGNED_IN`/`SIGNED_OUT` | Selesai |
| B-003 | SPK baru bernomor `1` dan seed tidak terbaca | `no` harus numerik (`nextNo` memakai `+s.no`); seed memakai `SPK-1001` | Seed mock memakai `1001`, `1002` | Selesai (seed). Catatan: schema `spk.no` bertipe TEXT, jadi jangan diisi non-numerik |
| B-004 | Label barang jadi tidak lengkap | Bentuk seed FG tidak sesuai field yang dipakai app | Seed FG memakai kategori/type/ukuran/panjang/finishing/tebal | Selesai (seed) |
| B-005 | Ekspor CSV/XLSX/PDF gagal di semua modul kecuali Cek Data dan Master | App memanggil `DLS.save({filename, data})`; adapter hanya punya `download(blob, name)` | Layanan `downloads` menyediakan `save()` untuk Blob dan Uint8Array | Selesai. **Berlaku juga untuk Supabase sungguhan** |

B-001, B-002, dan B-005 berada di kode adapter produksi, bukan hanya mock, sehingga manfaatnya juga berlaku saat memakai Supabase. Pelajaran: kontrak `window.claude` harus dicocokkan dengan pemakaian app (`USER.profiles`, `DLS.save`, bentuk `me()`), bukan dengan dugaan.

## Belum diuji (jadwal di tracking)

Tercatat di [[tasks/T-026-uji-lanjutan-ui-mock-fitur-yang-belum-tercakup|T-026]]: stock opname, kartu stok, edit dan hapus item/master, edit/duplikat/ubah SPK dan revisi, pencatatan produksi (`prod`), retur vendor dan penerimaan, status surat jalan, langkah bongkar muat dan koreksi, pengaturan buffer/RM, ekspor XLSX dan PDF/cetak dokumen, filter dan pencarian, tema gelap, tampilan mobile, dan KPI Analisa.

Di luar mock: login OTP nyata, RLS per role, realtime antar pengguna, dan konflik penulisan tetap menunggu Docker (T-011, T-020 sampai T-022).
