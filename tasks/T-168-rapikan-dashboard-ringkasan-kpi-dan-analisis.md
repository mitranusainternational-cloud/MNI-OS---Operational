---
type: task
id: T-168
title: "Rapikan dashboard: ringkasan kondisi, KPI bertingkat, funnel SPK"
phase: P2
epic: E-02
release: v0.9
status: review
priority: P1
env: dev
effort_days: 0.5
depends: []
owner: "dev"
updated: 2026-11-03
---

# T-168 Rapikan dashboard: ringkasan kondisi, KPI bertingkat, funnel SPK

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2  
Bergantung pada: tidak ada

## Kriteria selesai

- [x] Ringkasan kondisi di atas (semua terkendali atau N hal perlu perhatian) dengan tautan cepat sesuai hak ubah pengguna
- [x] KPI dua tingkat: Operasional hari ini dan Kinerja 90 hari terakhir; teks kosong yang jelas, bukan tanda "–" saja
- [x] Pipeline SPK sebagai batang bertahap dengan hitungan per tahap
- [x] Susunan dua kolom: analisis di kiri, tindakan dan aktivitas di kanan; panel kosong lebih ringkas
- [x] Tile dan panel hanya untuk modul yang boleh dilihat pengguna; Temuan cek data hanya untuk admin
- [x] Peringatan SPK terlambat tidak lagi ganda
- [x] Regresi mock 38, role 12, akses 15 lulus; tampilan desktop dan ponsel diperiksa
- [ ] Ditinjau pemilik di production setelah digabung ke `main`

## Bukti

- Mock (verified in browser): tampilan desktop dan ponsel; 65 skenario e2e lulus. Hanya perubahan tampilan, tanpa perubahan data atau skema.

## Catatan

Perubahan hanya pada presentasi dashboard (`apps/gudang-logistik`), atas permintaan pemilik. Tidak menambah model data. Perbaikan lanjutan (filter periode, grafik tren) ditunda ke v1.1 setelah pilot.
