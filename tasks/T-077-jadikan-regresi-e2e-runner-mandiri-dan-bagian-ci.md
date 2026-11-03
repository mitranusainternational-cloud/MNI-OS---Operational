---
type: task
id: T-077
title: "Jadikan regresi E2E runner mandiri dan bagian CI"
phase: P2
epic: E-03
release: v1.0
status: review
priority: P1
env: development
effort_days: 1.5
depends: [T-023]
owner: "dev"
updated: 2026-11-03
---

# T-077 Jadikan regresi E2E runner mandiri dan bagian CI

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-023

## Kriteria selesai

- [x] regression.mjs dan run.mjs tersimpan di repo
- [x] Paket playwright terpasang sebagai devDependency dan npm run test:e2e berjalan
- [x] Dijalankan di GitHub Actions pada PR (lewat T-046)

## Bukti

- Berkas `apps/platform/tests/e2e/regression.mjs` dan `run.mjs` dibuat dari skenario yang lolos 33/33 lewat Playwright MCP (2026-11-02). Belum dijalankan sebagai runner mandiri dan belum ada devDependency.

## Catatan

CI hijau 2026-11-03 (run 41558796125): vault, build, regresi 38 PASS, role 12 PASS di GitHub Actions. `npm run test:e2e` berjalan lokal dan di CI.

Menambah devDependency harus memperbarui package-lock.json agar npm ci tetap lolos.
