---
type: task
id: T-178
title: "Kinerja & Analisa produksi (Tahap 2): per work center, produk, vendor, dan pengiriman"
phase: P2
epic: E-02
release: v0.9
status: todo
priority: P1
env: dev
effort_days: 3
depends: [T-177]
owner: "dev + pemilik"
updated: 2026-11-04
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-178 Kinerja & Analisa produksi (Tahap 2)

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2
Bergantung pada: T-177
Kebutuhan: [[PRD_PRODUKSI]]

## Kriteria selesai

- [ ] Tab **Work Center**: output per hari, kapasitas, utilisasi, menit per pcs, dan tren
- [ ] Tab **Produk**: lama proses dari work center awal sampai selesai per jenis produk, termasuk waktu di vendor dan waktu kirim
- [ ] Tab **Vendor**: lama proses, tepat waktu, reject, dan barang keluar dan masuk per vendor (perluasan kualifikasi yang sudah ada)
- [ ] Tab **Pengiriman**: lama loading dan unloading ke customer; cek apakah Bongkar Muat dan Kirim ke Customer menyimpan jam mulai dan selesai, bila belum tambah isian jam sederhana
- [ ] Uji e2e dan unit untuk hitungan baru; dokumen dan PRD diperbarui

## Catatan

Dikerjakan lokal. Penayangan (migration 14, push, PR ke `main`) hanya setelah persetujuan eksplisit pemilik.
