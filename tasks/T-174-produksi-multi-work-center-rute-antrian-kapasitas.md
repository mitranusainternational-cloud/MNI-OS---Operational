---
type: task
id: T-174
title: "Produksi multi work center: rute, antrian mesin, kapasitas, posisi, dan kualifikasi vendor"
phase: P2
epic: E-02
release: v0.9
status: doing
priority: P1
env: dev
effort_days: 4
depends: [T-167]
owner: "dev + pemilik"
updated: 2026-11-03
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-174 Produksi multi work center: rute, antrian mesin, kapasitas, posisi, dan kualifikasi vendor

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2
Bergantung pada: T-167

## Kriteria selesai

- [x] Skema, aturan, dan keputusan di [[RUTE_PRODUKSI]]
- [x] Mesin rute dan kinerja (rute, antrian, validasi, beban, prediksi, posisi, lama proses, vendor) dengan uji unit
- [x] Dibangun di lokal (branch `fitur/produksi-multi-wc`): Antrian Mesin, beban per work center, posisi SPK, kualifikasi vendor, kapasitas di Master Data
- [x] Uji e2e mock: produksi 15 skenario, sapu tampilan 67, total 166 lulus
- [ ] Keputusan pemilik: daftar WC, aturan khusus per bentuk, satuan kapasitas, siapa yang mengisi
- [ ] Pengecualian rute per item di editor SPK, tabel aturan dari aplikasi, usulan langkah dari kejadian
- [ ] Tinjau bersama PPIC dan operator dengan data contoh
- [ ] Terapkan migration 14 (`produksi_log`) dan tayangkan, hanya setelah persetujuan eksplisit pemilik

## Bukti

- Mock (verified in browser, bukan bukti Supabase) dan unit. Belum di-push ke GitHub dan belum ada migration di database mana pun.

## Catatan

Dibangun lokal sesuai permintaan pemilik ("jangan ditayangkan dulu"). Catatan alur kerja: perubahan ada di branch lokal `fitur/produksi-multi-wc`, tidak di `development`, agar tidak ikut tergabung ke `main` tanpa persetujuan.
