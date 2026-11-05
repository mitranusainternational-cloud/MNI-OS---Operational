---
type: task
id: T-192
title: "Kebutuhan material dan reservasi stok"
phase: P9
epic: E-16
release: v1.2
status: todo
priority: P2
env: dev
effort_days: 3
depends: [T-191]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-192 Kebutuhan material dan reservasi stok

Epic: [[roadmap/epics/E-16-erp-penawaran-estimasi-dan-monitoring|E-16]]
Fase: P9
Bergantung pada: T-191
Rancangan: [[documentation/ERP_QUOTATION_ANALISIS]]

## Kriteria selesai

- [ ] Panel Kebutuhan material di penawaran dan SPK (kg lalu lembar dengan faktor sisa potong per produk), tanpa mengubah stok pada tahap pratinjau
- [ ] Tautan item SPK ke item bahan baku; reservasi saat SPK terbit; stok tersedia = fisik dikurangi reservasi
- [ ] Konfirmasi gudang mengeluarkan material; revisi dan pembatalan SPK menyesuaikan reservasi; PR otomatis bila kurang
- [ ] Cocok dengan beberapa SPK nyata (angka di folder privat)

## Bukti

- Belum.

## Catatan

Lanjutan diskusi pengurangan bahan baku otomatis. Menunggu keputusan pemilik: waktu stok berkurang, faktor sisa potong, sisa potongan. Lokal dulu; tidak menyentuh production sebelum persetujuan eksplisit pemilik.
