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
- [ ] Keputusan pemilik atas enam pertanyaan di [[KALKULATOR_BERAT]] bagian 4
- [ ] Katalog rumus dimuat dari database setelah login (bukan JavaScript publik)
- [ ] Integrasi ke formulir SPK: isi otomatis, lencana "dari kalkulator", timpa manual
- [ ] Uji di mock dan di production dengan SPK nyata dibandingkan hitungan Excel

## Bukti

- Unit (source-level): mesin dan parser lulus uji terhadap nilai tersimpan workbook. Belum ada bukti di browser karena belum terintegrasi.

## Catatan

Katalog turunan workbook tidak masuk Git (repo publik); dibangun lokal. Pengerjaan integrasi menunggu keputusan pemilik di dokumen kerangka.
