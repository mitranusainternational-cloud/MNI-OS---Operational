---
type: task
id: T-028
title: "Verifikasi adapter id, no SPK, dan master di Supabase"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P0
env: development
effort_days: 1
depends: [T-012, T-021]
owner: "dev"
updated: 2026-11-02
---

# T-028 Verifikasi adapter id, no SPK, dan master di Supabase

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-012, T-021

## Kriteria selesai

- [ ] Buat, ubah (revisi), dan duplikat SPK berjalan di Postgres tanpa baris ganda
- [ ] Id non-UUID (mis. spk-1003) tersimpan lewat pemetaan UUID
- [ ] Dokumen master/setting dan pengaturan RM tersimpan dan terbaca
- [ ] Hasil dicatat di TEST_MATRIX

## Bukti

- Belum ada. Perbaikan B-007, B-008, B-009 hanya divalidasi pada mock yang meniru batasan UUID.

## Catatan

Prioritas P0 karena kegagalan ini baru muncul di Postgres sungguhan.
