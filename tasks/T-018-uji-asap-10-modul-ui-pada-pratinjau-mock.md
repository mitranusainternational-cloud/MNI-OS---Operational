---
type: task
id: T-018
title: "Uji asap 10 modul UI pada pratinjau mock"
phase: P2
epic: E-03
release: v1.0
status: done
priority: P0
env: development
effort_days: 1
depends: [T-016]
owner: "dev"
updated: 2026-11-02
---

# T-018 Uji asap 10 modul UI pada pratinjau mock

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-016

## Kriteria selesai

- [x] Sepuluh modul dibuka tanpa galat JavaScript
- [x] Judul dan isi tiap modul sesuai
- [x] Skrip uji tersimpan di repo

## Bukti

- Verified in browser (2026-11-02): 10/10 PASS, 0 pageerror. Rincian: [[TEST_MATRIX]]. Skrip: `apps/platform/tests/e2e/modules.mjs`.

## Catatan

Uji di mode mock; bukan bukti Supabase, Auth nyata, atau RLS.
