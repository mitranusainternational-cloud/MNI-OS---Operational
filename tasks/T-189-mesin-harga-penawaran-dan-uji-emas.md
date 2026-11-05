---
type: task
id: T-189
title: "Mesin harga penawaran dan uji emas"
phase: P9
epic: E-16
release: v1.2
status: todo
priority: P2
env: dev
effort_days: 3
depends: [T-187]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-189 Mesin harga penawaran dan uji emas

Epic: [[roadmap/epics/E-16-erp-penawaran-estimasi-dan-monitoring|E-16]]
Fase: P9
Bergantung pada: T-187
Rancangan: [[documentation/ERP_QUOTATION_ANALISIS]]

## Kriteria selesai

- [ ] Katalog harga diekstrak dari workbook (6 keluarga × 32 bentuk) tanpa menulis ulang rumus manual; disimpan terkompresi di master, dimuat setelah login
- [ ] Lapisan harga murni di src/lib/erp: harga satuan, baut, subtotal, diskon, PPN, total, kebutuhan kg
- [ ] Skenario harga (satu model, banyak skenario) menggantikan tiga sheet salinan
- [ ] Uji emas per bentuk terhadap nilai Excel; uji skenario, total, dan masukan tidak dikenali (null, bukan 0)
- [ ] Pembanding uji adalah nilai hitung workbook penawaran (keputusan pemilik 2026-11-06); katalog awal 6 keluarga, 192 bentuk
- [ ] Fixture nyata hanya di data/private-sources; uji CI memakai fixture sintetis

## Bukti

- Belum.

## Catatan

Dikerjakan agen pricing-engineer dengan skill erp-quotation-engine. Tahap E0. Lokal dulu; tidak menyentuh production sebelum persetujuan eksplisit pemilik.
