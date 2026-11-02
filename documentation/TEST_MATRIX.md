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
| Fitur diuji dan lulus | 30 (F-01 sampai F-30) |
| Ekspor CSV / Excel / PDF berfungsi | 9 / 9 CSV, Excel dan PDF SPK |
| Bug ditemukan dan diperbaiki | 9 (B-001 sampai B-009) |
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
| F-15 | Kartu stok bahan baku | Buka dari baris | PASS | Panel menampilkan stok, status, titik pesan ulang, grafik pergerakan |
| F-16 | Pengaturan bahan baku (rmset) | Buka dialog | PASS | Dialog lead time dan target stok terbuka |
| F-17 | Stock opname barang jadi | Fisik 118 dari 120 | PASS | Mutasi `opname` delta -2, total stok 380 → 378 |
| F-18 | Ubah data item bahan baku | Buffer 10 → 77 | PASS | Tersimpan |
| F-19 | Master: ubah dan hapus vendor | Ubah PIC; hapus permanen | PASS | Dialog menawarkan hapus permanen atau nonaktifkan; baris terhapus |
| F-20 | Update produksi SPK | 2 dari 3 + work center | PASS | Progres 67%, `prod_log` bertambah |
| F-21 | Set semua item selesai | Tombol prodall | PASS (setelah B-006) | Progres 100%, posisi "Siap kirim" |
| F-22 | Revisi SPK terbit | Ubah PO + alasan | PASS (setelah B-007/B-008) | Rev.1, alasan tercatat, tanpa baris ganda; tanpa alasan ditolak ("Isi alasan revisi.") |
| F-23 | Duplikat SPK | Dari SPK 1001 | PASS | Draft nomor 1004, customer dikosongkan |
| F-24 | Kirim ke vendor, terima kembali | 4 btg: 2 OK + 1 reject, lalu sisa | PASS | Status Di Vendor → Kembali Sebagian → Selesai; reject wajib catatan |
| F-25 | Surat jalan: alur status | Disiapkan → Dalam Perjalanan → Diterima | PASS | Tombol langkah berurutan |
| F-26 | Bongkar muat: siklus | Antri → proses → selesai | PASS | Jam masuk, mulai, selesai tercatat |
| F-27 | Ekspor Excel SPK | Dari panel SPK | PASS | Berkas .xlsx valid (ZIP, 22 KB) |
| F-28 | Ekspor PDF SPK | Dari panel SPK | PASS | Berkas .pdf valid (%PDF-1.3, 284 KB) |
| F-29 | Pencarian dan filter SPK | Cari "Duplikat"; filter Terlambat | PASS | 3 → 1 baris; filter 1 baris |
| F-30 | Tema gelap, tombol Back, tampilan mobile | Ganti tema; Back; lebar 390 px | PASS | Latar berubah; Back kembali ke #spk; tanpa gulir horizontal. Menu mobile menampilkan sebagian item, sisanya perlu digulir |

## Bug dan perbaikan

| ID | Temuan | Penyebab | Perbaikan | Status |
|---|---|---|---|---|
| B-001 | `USER.profiles is not a function` pada setiap render | Adapter user tidak menyediakan `profiles()` yang dipanggil app | `profiles(ids)` ditambahkan di `claude-adapter.js` | Selesai |
| B-002 | Sidebar tetap "Tamu" setelah login | app.js membaca user sekali saat boot (sebelum login) | `index.html` memuat ulang halaman saat `SIGNED_IN`/`SIGNED_OUT` | Selesai |
| B-003 | SPK baru bernomor `1` dan seed tidak terbaca | `no` harus numerik (`nextNo` memakai `+s.no`); seed memakai `SPK-1001` | Seed mock memakai `1001`, `1002` | Selesai (seed). Catatan: schema `spk.no` bertipe TEXT, jadi jangan diisi non-numerik |
| B-004 | Label barang jadi tidak lengkap | Bentuk seed FG tidak sesuai field yang dipakai app | Seed FG memakai kategori/type/ukuran/panjang/finishing/tebal | Selesai (seed) |
| B-005 | Ekspor CSV/XLSX/PDF gagal di semua modul kecuali Cek Data dan Master | App memanggil `DLS.save({filename, data})`; adapter hanya punya `download(blob, name)` | Layanan `downloads` menyediakan `save()` untuk Blob dan Uint8Array | Selesai. **Berlaku juga untuk Supabase sungguhan** |
| B-006 | "Set semua item selesai" tidak berfungsi | `prodall` memakai `closest('tr')`, padahal form berupa kartu | Memakai atribut `max` input | Selesai (kode prototipe `gudang-logistik`) |
| B-007 | Id dokumen app (mis. `spk-1003`) bukan UUID | Kolom `id` di schema UUID; app membuat id string | `toDbId()` memetakan id string ke UUID deterministik; mock kini menolak id non-UUID seperti Postgres | Selesai di adapter. **Perlu diverifikasi pada Postgres nyata (T-028)** |
| B-008 | Edit SPK dianggap ganti nomor dan membuat baris ganda | `spk.no` TEXT di DB, app membandingkan angka dengan `!==` | Adapter mengubah `no` ke angka saat dibaca dan ke teks saat ditulis | Selesai di adapter; verifikasi nyata di T-028 |
| B-009 | Dokumen `master/*` (pengaturan) tidak terbaca atau tertulis | Tabel master memakai kolom `key` + `value`, bukan `id` | Adapter memetakan dokumen master ke objek datar berbasis key | Selesai di adapter; verifikasi nyata di T-028 |

B-001, B-002, dan B-005 berada di kode adapter produksi, bukan hanya mock, sehingga manfaatnya juga berlaku saat memakai Supabase. Pelajaran: kontrak `window.claude` harus dicocokkan dengan pemakaian app (`USER.profiles`, `DLS.save`, bentuk `me()`), bukan dengan dugaan.

## Belum diuji (jadwal di tracking)

Tercatat di [[tasks/T-027-uji-sisa-ui-mock-void-koreksi-pr-dan-role|T-027]]: batalkan dan koreksi bongkar muat, modul PR/usulan pembelian, tab KPI & Analisa, ekspor XLSX modul gudang, opname bahan baku, tampilan per role, dan menu mobile penuh.

**Catatan penting:** B-007, B-008, dan B-009 diperbaiki di adapter dan divalidasi pada mock yang meniru batasan Postgres (id UUID). Perilaku pada Postgres/Supabase sungguhan belum terbukti dan dijadwalkan di [[tasks/T-028-verifikasi-adapter-id-no-spk-dan-master-di-supabas|T-028]]. Ekspor Excel/PDF memuat pustaka dari CDN sehingga butuh internet (lihat T-143).

Di luar mock: login OTP nyata, RLS per role, realtime antar pengguna, dan konflik penulisan tetap menunggu Docker (T-011, T-020 sampai T-022).
