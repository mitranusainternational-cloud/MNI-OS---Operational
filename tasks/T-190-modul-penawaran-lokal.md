---
type: task
id: T-190
title: "Modul Penawaran lokal (daftar, lembar, revisi, cetak)"
phase: P9
epic: E-16
release: v1.2
status: todo
priority: P2
env: dev
effort_days: 4
depends: [T-189]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-190 Modul Penawaran lokal (daftar, lembar, revisi, cetak)

Epic: [[roadmap/epics/E-16-erp-penawaran-estimasi-dan-monitoring|E-16]]
Fase: P9
Bergantung pada: T-189
Rancangan: [[documentation/ERP_QUOTATION_ANALISIS]]

## Kriteria selesai

- [ ] Menu Penawaran dengan hak modul sendiri; tampilan lama tidak berubah bagi yang tidak berhak
- [ ] Lembar penawaran: kepala, item dari katalog dengan pratinjau harga dan berat, subtotal, diskon, PPN, catatan, status (Draft, Terkirim, Revisi, Disetujui, Ditolak, Kedaluwarsa)
- [ ] Revisi bernomor, cetak rapi (PDF atau cetak), harga hanya terlihat peran yang berhak
- [ ] Tabel baru sebagai migration draf; mock dan adapter diperluas sesuai kontrak
- [ ] Regresi penuh 0 FAIL dan tangkapan layar desktop dan HP

## Bukti

- Belum.

## Catatan

Dikerjakan agen erp-integrator. Tahap E1. Tinjau dengan pemilik lewat tangkapan layar agar tampilan tidak membingungkan. Lokal dulu; tidak menyentuh production sebelum persetujuan eksplisit pemilik.
