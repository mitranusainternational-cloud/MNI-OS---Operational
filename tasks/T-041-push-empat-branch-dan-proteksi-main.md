---
type: task
id: T-041
title: "Push empat branch dan proteksi main"
phase: P4
epic: E-01
release: v0.9
status: done
priority: P0
env: main
effort_days: 0.5
depends: [T-040]
owner: "pemilik repo"
updated: 2026-11-02
---

# T-041 Push empat branch dan proteksi main

Epic: [[roadmap/epics/E-01-fondasi-workspace-dan-repo|E-01]]  
Fase: P4 Environment cloud  
Bergantung pada: T-040

## Kriteria selesai

- [x] versi-awal, development, main, docs ada di GitHub
- [x] Default main; PR + review wajib
- [x] Jangan force-push ke riwayat yang berbeda

## Bukti

- `development` dan `docs` di-push ke `dfbc7a3` secara fast-forward (tanpa force); `main` dan `versi-awal` sudah identik di `636325b`. Diverifikasi lewat `gh api .../branches`.
- Sisa: set default branch `main` dan proteksi `main` (PR + review) di GitHub Settings.

## Catatan

Panduan: [[GITHUB_MIGRATION]].
