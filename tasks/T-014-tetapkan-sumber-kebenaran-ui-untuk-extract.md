---
type: task
id: T-014
title: "Tetapkan sumber kebenaran UI untuk extract"
phase: P1
epic: E-02
release: v0.9
status: done
priority: P1
env: development
effort_days: 0.5
depends: []
owner: "dev"
updated: 2026-11-02
---

# T-014 Tetapkan sumber kebenaran UI untuk extract

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]  
Fase: P1 Fondasi lokal

## Kriteria selesai

- [x] Keputusan: mni-gudang.html asli, file reference, atau commit hasil extract
- [x] Dicatat di [[documentation/DECISIONS]]
- [x] npm run extract reproducible dari klon baru

## Bukti

- Keputusan di [[documentation/DECISIONS]] (2026-11-02). Skrip: `apps/mni-app/scripts/extract-app.js`.
- Verified in browser: `npm run extract`, `vite build`, muat di `127.0.0.1:5176` tanpa error console; `window.claude` ada, nav 15 item. Auth/DB belum diuji.

## Catatan

Sumber: apps/gudang-logistik. Reference lama hanya memakai 15 dari 20 koleksi.
