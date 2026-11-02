---
type: task
id: T-019
title: "Perbaiki bug hasil uji UI (B-001 sampai B-005)"
phase: P2
epic: E-03
release: v1.0
status: done
priority: P0
env: development
effort_days: 1.5
depends: [T-018]
owner: "dev"
updated: 2026-11-02
---

# T-019 Perbaiki bug hasil uji UI (B-001 sampai B-005)

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-018

## Kriteria selesai

- [x] USER.profiles tersedia di adapter (B-001)
- [x] Identitas pengguna tampil setelah login (B-002)
- [x] Seed SPK dan barang jadi sesuai bentuk data app (B-003, B-004)
- [x] Ekspor CSV berfungsi di 9 modul (B-005)

## Bukti

- Verified in browser (2026-11-02): nama "Admin Lokal" di sidebar, SPK baru bernomor 1003, 9/9 ekspor CSV menghasilkan file. Detail dan penyebab: [[TEST_MATRIX]].
- Perbaikan B-001, B-002, B-005 ada di adapter dan index.html produksi, bukan hanya mock.

## Catatan

Setiap bug punya ID di TEST_MATRIX agar terlacak. Uji ulang akan dijalankan pada Supabase nyata di T-021.
