---
type: epic
id: E-02
title: "Aplikasi berjalan lokal"
release: v0.9
theme: Fondasi
priority: P0
status: active
progress: 16
tasks_total: 17
tasks_done: 6
updated: 2026-11-04
---

# E-02 Aplikasi berjalan lokal

Rilis target: **v0.9** · Tema: Fondasi · Prioritas: P0
Induk: [[roadmap/PRODUCT_ROADMAP|Roadmap produk]]

## Hasil yang diinginkan

mni-app berjalan penuh di mesin pengembang dengan Supabase lokal dan data sintetis.

## Risiko dan asumsi

Docker belum aktif di mesin kerja (T-010).

## Tugas

- [x] [[tasks/T-004-scaffold-mni-app-masuk-repo-dan-build-lolos|T-004]] Scaffold mni-app masuk repo dan build lolos · done · P1 · 0.5 hari
- [x] [[tasks/T-005-perbaiki-bootstrap-mni-app-app-js-error|T-005]] Perbaiki bootstrap mni-app (app.js error) · done · P0 · 0.5 hari
- [ ] [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] Aktifkan Docker engine di Windows · blocked · P0 · 0.5 hari
- [ ] [[tasks/T-011-jalankan-supabase-local-stack-dan-terapkan-migrati|T-011]] Jalankan Supabase local stack dan terapkan migration · todo · P0 · 0.5 hari
- [ ] [[tasks/T-012-hubungkan-mni-app-ke-supabase-lokal|T-012]] Hubungkan mni-app ke Supabase lokal · todo · P0 · 0.5 hari
- [ ] [[tasks/T-013-seed-data-sintetis-per-role|T-013]] Seed data sintetis per role · todo · P1 · 1 hari
- [x] [[tasks/T-014-tetapkan-sumber-kebenaran-ui-untuk-extract|T-014]] Tetapkan sumber kebenaran UI untuk extract · done · P1 · 0.5 hari
- [x] [[tasks/T-016-pratinjau-lokal-mode-mock-dengan-login|T-016]] Pratinjau lokal mode mock dengan login · done · P0 · 1 hari
- [ ] [[tasks/T-017-rapikan-identitas-pengguna-dan-teks-backend-di-mni|T-017]] Rapikan identitas pengguna dan teks backend di mni-app · todo · P2 · 0.5 hari
- [ ] [[tasks/T-168-rapikan-dashboard-ringkasan-kpi-dan-analisis|T-168]] Rapikan dashboard: ringkasan kondisi, KPI bertingkat, funnel SPK · review · P1 · 0.5 hari
- [ ] [[tasks/T-173-berat-otomatis-pada-spk-dari-kalkulator|T-173]] Berat otomatis pada SPK dari kalkulator penghitung berat · doing · P1 · 3 hari
- [ ] [[tasks/T-174-produksi-multi-work-center-rute-antrian-kapasitas|T-174]] Produksi multi work center: rute, antrian mesin, kapasitas, posisi, dan kualifikasi vendor · doing · P1 · 4 hari
- [x] [[tasks/T-175-impor-stok-barang-jadi-oktober-2026|T-175]] Impor stok barang jadi dari Stock Barang 2026 ke production (data saja) · done · P1 · 0.5 hari
- [x] [[tasks/T-176-filter-type-gudang-barang-jadi|T-176]] Filter Type di Gudang Barang Jadi (STU, STC, SLU, SLW, SLHD) · done · P2 · 0.25 hari
- [ ] [[tasks/T-177-skema-produksi-tiga-pintu-spk-berjalan|T-177]] Skema produksi tiga pintu: SPK Berjalan, Produksi Hari Ini, Kinerja & Analisa (Tahap 1) · review · P1 · 1.5 hari
- [ ] [[tasks/T-178-kinerja-dan-analisa-produksi-tahap-2|T-178]] Kinerja & Analisa produksi (Tahap 2): per work center, produk, vendor, dan pengiriman · review · P1 · 3 hari
- [ ] [[tasks/T-179-produksi-hari-ini-v2-dan-laporan-produksi|T-179]] Produksi Hari Ini v2 dan Laporan Produksi: input otomatis, analisa qty, tonase, kecepatan, produk bertingkat, KPI operator dan mesin · review · P1 · 2 hari

> Properti status, progress, dan jumlah tugas serta daftar ini dibuat otomatis oleh `node scripts/progress-report.mjs`. Jangan ubah manual. Tampilan interaktif: [[PROGRESS_DASHBOARD]].
