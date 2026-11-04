---
type: task
id: T-173
title: "Berat otomatis pada SPK dari kalkulator penghitung berat"
phase: P2
epic: E-02
release: v0.9
status: doing
priority: P1
env: dev
effort_days: 3
depends: []
owner: "dev + pemilik"
updated: 2026-11-03
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-173 Berat otomatis pada SPK dari kalkulator penghitung berat

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2  
Bergantung pada: tidak ada

## Kriteria selesai

- [x] Membaca workbook kalkulator: 6 sheet (STU, STC, SLU, SLW, SLHD, SLHDC), 192 bentuk, 1.505 rumus
- [x] Kerangka dan pemetaan di [[KALKULATOR_BERAT]]
- [x] Pengevaluasi rumus Excel dan mesin hitung; semua sel workbook direproduksi dengan 0 selisih
- [x] Parser teks item SPK ke bentuk, ukuran, material; menolak yang tidak dikenali
- [x] Uji otomatis `npm run test:berat` (6 + 24 lulus)
- [x] Keputusan pemilik atas enam pertanyaan (disetujui 2026-11-03; pengguna tetap fleksibel menimpa)
- [x] Katalog rumus dimuat dari database setelah login (master/katalog_berat, terkompresi); unggah oleh super admin di Master Data
- [x] Integrasi ke formulir SPK: isi otomatis, lencana auto dan manual, timpa manual, hitung ulang, tempel dari Excel
- [x] Uji mock (e2e A-29 sampai A-34)
- [ ] Pasang katalog asli di production dan bandingkan beberapa SPK nyata dengan hitungan Excel

## Bukti

- Production (verified in browser, hanya baca): PR #13 digabung (b7f661f), mesin dan tombol Katalog berat tampil, tidak ada rumus di berkas publik; lihat [[TEST_MATRIX]].
- Unit (source-level): mesin dan parser lulus uji terhadap nilai tersimpan workbook.
- Mock (verified in browser): alur isi otomatis, timpa manual, hitung ulang, dan item tak dikenali; total e2e 38 + 12 + 34 + 62 lulus.

## Catatan

Katalog turunan workbook tidak masuk Git (repo publik); dibangun lokal. Cara memasang katalog: lihat [[KALKULATOR_BERAT]] bagian 7.
