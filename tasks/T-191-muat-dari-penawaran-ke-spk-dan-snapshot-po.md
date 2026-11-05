---
type: task
id: T-191
title: "Muat dari penawaran ke SPK dan snapshot PO"
phase: P9
epic: E-16
release: v1.2
status: todo
priority: P2
env: dev
effort_days: 3
depends: [T-190]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-191 Muat dari penawaran ke SPK dan snapshot PO

Epic: [[roadmap/epics/E-16-erp-penawaran-estimasi-dan-monitoring|E-16]]
Fase: P9
Bergantung pada: T-190
Rancangan: [[documentation/ERP_QUOTATION_ANALISIS]]

## Kriteria selesai

- [ ] Tombol Muat ke SPK dari penawaran disetujui membuat SPK Draft idempoten (tidak ganda) dengan item, berat, customer, PO, due date, dan tautan penawaran
- [ ] Snapshot harga, berat, dan biaya per komponen saat PO disimpan tidak berubah oleh perubahan skenario
- [ ] Revisi penawaran memperbarui SPK sebagai revisi; SPK tetap bebas diubah pengguna
- [ ] Uji alur hulu ke hilir (penawaran, SPK, produksi, vendor, kirim) dengan tangkapan layar

## Bukti

- Belum.

## Catatan

Tahap E2. Kolom referensi baru di tabel spk hanya ditayangkan pada tahap yang disetujui. Lokal dulu; tidak menyentuh production sebelum persetujuan eksplisit pemilik.
