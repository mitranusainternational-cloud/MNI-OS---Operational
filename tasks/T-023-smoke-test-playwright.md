---
type: task
id: T-023
title: "Smoke test Playwright"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P1
env: development
effort_days: 2
depends: [T-021]
owner: "dev"
updated: 2026-11-02
---

# T-023 Smoke test Playwright

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]  
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-021

## Kriteria selesai

- [ ] Skenario: login, buat SPK, mutasi stok, kirim
- [ ] Berjalan dengan satu perintah npm
- [ ] Data sintetis saja

## Bukti

- Skrip awal: `apps/mni-app/tests/e2e/modules.mjs` (smoke 10 modul) dan `flows.mjs` (alur inti). Dijalankan manual lewat Playwright MCP. Sisa: runner `npm run test:e2e`, dependensi Playwright, dan integrasi CI (T-046).

## Catatan

-
