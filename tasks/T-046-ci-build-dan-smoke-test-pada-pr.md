---
type: task
id: T-046
title: "CI: build dan smoke test pada PR"
phase: P4
epic: E-05
release: v1.0
status: review
priority: P1
env: development
effort_days: 1
depends: [T-041, T-023]
owner: "dev"
updated: 2026-11-03
---

# T-046 CI: build dan smoke test pada PR

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]  
Fase: P4 Environment cloud  
Bergantung pada: T-041, T-023

## Kriteria selesai

- [x] PR ke main menjalankan build dan smoke test
- [ ] Gagal build memblokir merge

## Bukti

- Belum ada.

## Catatan

Workflow `.github/workflows/ci.yml` (push ke development/docs, PR ke main/development): job Vault (`check-vault`) dan Aplikasi (`npm ci --ignore-scripts`, extract, build, Chromium, dev server mock, `test:e2e`). Run pertama menemukan B-018 (login cepat sebelum pendengar auth terpasang membuat app berjalan sebagai Tamu); diperbaiki, lalu hijau. **Sisa:** jadikan job "Vault" dan "Aplikasi" required status check di aturan proteksi `main` (perubahan pengaturan repo, butuh persetujuan pemilik).

-
