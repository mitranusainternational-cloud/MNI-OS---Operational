---
type: task
id: T-077
title: "Jadikan regresi E2E runner mandiri dan bagian CI"
phase: P2
epic: E-03
release: v1.0
status: doing
priority: P1
env: development
effort_days: 1.5
depends: [T-023]
owner: "dev"
updated: 2026-11-02
---

# T-077 Jadikan regresi E2E runner mandiri dan bagian CI

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-023

## Kriteria selesai

- [ ] regression.mjs dan run.mjs tersimpan di repo
- [ ] Paket playwright terpasang sebagai devDependency dan npm run test:e2e berjalan
- [ ] Dijalankan di GitHub Actions pada PR (lewat T-046)

## Bukti

- Berkas `apps/platform/tests/e2e/regression.mjs` dan `run.mjs` dibuat dari skenario yang lolos 33/33 lewat Playwright MCP (2026-11-02). Belum dijalankan sebagai runner mandiri dan belum ada devDependency.

## Catatan

Menambah devDependency harus memperbarui package-lock.json agar npm ci tetap lolos.
