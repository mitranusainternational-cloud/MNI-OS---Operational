---
type: task
id: T-164
title: "Samakan nama folder lokal ke mni-gudang"
phase: P1
epic: E-01
release: v0.9
status: todo
priority: P2
env: production
effort_days: 0.2
depends: []
owner: "pemilik + dev"
updated: 2026-11-03
---

# T-164 Samakan nama folder lokal ke mni-gudang

Epic: [[roadmap/epics/E-01-fondasi-workspace-dan-repo|E-01]]
Fase: P1

## Kriteria selesai

- [ ] Obsidian dan semua terminal yang terbuka di folder lama ditutup
- [ ] Folder `mni-os` diganti nama `mni-gudang` dan vault Obsidian didaftarkan ulang
- [ ] README folder induk, SISTEM_MAP, CLAUDE.md, dan skrip yang memuat path diperbarui
- [ ] Server lokal dan `npm run test:e2e` dijalankan dari folder baru

## Bukti

- Belum. Nama baku `mni-gudang` ditetapkan 2026-11-03 ([[SISTEM_MAP]]).

## Catatan

Penggantian nama folder gagal selama ada proses yang berdiri di dalamnya (terjadi pada folder `mni-app` lama).
