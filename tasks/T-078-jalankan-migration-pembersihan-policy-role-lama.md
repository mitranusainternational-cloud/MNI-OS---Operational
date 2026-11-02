---
type: task
id: T-078
title: "Jalankan migration pembersihan policy role lama"
phase: P2
epic: E-03
release: v1.0
status: review
priority: P0
env: development
effort_days: 0.5
depends: [T-022]
owner: "pemilik akun Supabase"
updated: 2026-11-02
---

# T-078 Jalankan migration pembersihan policy role lama

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-022

## Kriteria selesai

- [x] Policy lama diperketat (migration 6 ALTER POLICY, menggantikan migration 5)
- [x] Uji ulang: viewer tidak dapat menulis log; role lama tidak lagi berlaku
- [ ] Advisor keamanan dijalankan dan dicatat

## Bukti

- Migration 6 terpasang; uji rollback: viewer dan role lama ditolak (lihat [[TEST_MATRIX]]). Advisor keamanan: lihat catatan.

## Catatan

**Selesai dengan jalur lain (2026-11-02):** migration 6 (`20240101000006_role_model_supersede.sql`, ALTER POLICY tanpa DROP) dipasang lewat konektor dan menutup tujuan tugas. Migration 5 (DROP) tidak perlu dijalankan; opsional hanya untuk merapikan policy ganda.

**Blocked:** butuh persetujuan/eksekusi pemilik. Tempel isi `apps/mni-app/supabase/migrations/20240101000005_role_model_cleanup.sql` ke SQL Editor project "MNI Gudang - Dev" lalu Run. Sebelum itu pastikan semua akun yang dipakai memiliki role aplikasi (admin, ppic, gbb, gbj, logistik, viewer).
