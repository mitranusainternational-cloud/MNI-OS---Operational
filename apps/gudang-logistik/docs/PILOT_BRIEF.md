---
type: feature-brief
status: legacy-hypothesis-not-approved
updated: 2026-11-02
---

# Brief pilot — lihat saldo bahan baku per gudang

> **Status: hipotesis lama, belum dipilih oleh tim Operasional.** Catatan ini dipertahankan untuk jejak keputusan. MNI OS dikembangkan custom dari proses aktual tim; jangan implementasikan brief ini atau menganggapnya sebagai prioritas sebelum discovery dan validasi pemilik proses.

## Tujuan

Memberi pengguna yang berwenang cara melihat saldo bahan baku menurut konteks gudang yang dipilih, dengan sumber saldo dan waktu data yang jelas. Pilot sengaja read-only untuk menguji fondasi identitas, tenant isolation, dan rekonsiliasi sebelum write path dibuat.

## Pengguna awal (usulan)

- Staf gudang: membaca saldo di lokasi yang diberikan.
- Manajer operasional: membaca ringkasan gudang/plant sesuai membership.
- Nama role, ruang lingkup perusahaan/site, dan kemampuan export perlu disetujui pemilik proses.

## Alur yang akan diuji

1. Pengguna masuk melalui Auth yang disepakati.
2. Sistem memuat membership pengguna dan hanya menawarkan tenant/company/plant/warehouse yang memang diizinkan.
3. Pengguna memilih konteks gudang/lokasi yang tersedia.
4. Aplikasi menampilkan item, satuan, saldo sumber resmi, dan waktu pembaruan.
5. Aplikasi menyatakan dengan jelas kondisi loading, belum ada data, error, atau data tidak segar.
6. QA mencoba user tanpa membership/tenant lain dan memastikan hasil tidak terlihat.

## Acceptance criteria kandidat

- [ ] Tidak ada request saldo sebelum sesi Auth dan konteks membership valid.
- [ ] Context mengikuti urutan membership → tenant → company → plant/site → warehouse → storage location.
- [ ] User hanya membaca row untuk tenant dan lokasi yang diizinkan oleh RLS; filter UI tidak dianggap kontrol keamanan.
- [ ] Definisi on-hand disahkan (ledger, view, status posted/hold, satuan, waktu snapshot) dan total dapat direkonsiliasi ke sumber kontrol.
- [ ] Item tanpa saldo, lokasi kosong, dan data error memiliki state UI yang berbeda dan tidak menunjukkan angka palsu.
- [ ] Pilot tidak membuat/mengubah/menghapus transaksi.
- [ ] Uji menggunakan seed sintetis di local Supabase setelah stack tersedia.

## Data map sementara

Lihat [[DATA_MAPPING|catatan mapping lama]]. Nama tabel hosted hanya observasi; tidak menentukan schema sistem custom.

## Keputusan pemilik proses yang dibutuhkan

- Apakah inquiry saldo bahan baku ini workflow pilot pertama?
- Apa arti resmi “stok tersedia”: on-hand, available, reserved, quality hold, dan barang dalam transit?
- Siapa yang boleh melihat saldo lintas warehouse, plant, atau company?
- Apa master item, unit, lokasi, dan tanggal/status cut-off yang menjadi sumber kebenaran?
- Adakah laporan/kertas kontrol yang harus direkonsiliasi?

## Gate implementasi

Sebelum memakai brief ini, discovery kebutuhan Operasional harus menunjukkan bahwa masalah ini prioritas dan pemilik proses mengesahkan outcome, definisi, role, serta acceptance criteria. Jika disetujui, desain model/migration lokal dari requirement tersebut; jangan turunkan model data dari hosted project.
