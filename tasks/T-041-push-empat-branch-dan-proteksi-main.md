---
type: task
id: T-041
title: "Push empat branch dan proteksi main"
phase: P4
status: doing
priority: P0
env: main
effort_days: 0.5
depends: [T-040]
owner: "pemilik repo"
updated: 2026-11-02
---

# T-041 Push empat branch dan proteksi main

Fase: P4 Environment cloud  
Bergantung pada: T-040

## Kriteria selesai

- [x] versi-awal, development, main, docs ada di GitHub
- [ ] Default main; PR + review wajib
- [ ] Jangan force-push ke riwayat yang berbeda

## Bukti

- `development` dan `docs` di-push ke `dfbc7a3` secara fast-forward (tanpa force); `main` dan `versi-awal` sudah identik di `636325b`. Diverifikasi lewat `gh api .../branches`.
- Sisa: set default branch `main` dan proteksi `main` (PR + review) di GitHub Settings.

## Catatan

Panduan: [[GITHUB_MIGRATION]].
