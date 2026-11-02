---
type: task
id: T-078
title: "Jalankan migration pembersihan policy role lama"
phase: P2
epic: E-03
release: v1.0
status: blocked
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

- [ ] Migration 20240101000005_role_model_cleanup.sql dijalankan di SQL Editor project dev
- [ ] Uji ulang: viewer tidak dapat menulis log; role lama tidak lagi berlaku
- [ ] Advisor keamanan dijalankan dan dicatat

## Bukti

- Belum. Migration berisi DROP POLICY; perintah lewat konektor ditolak oleh persetujuan SQL (2026-11-02).

## Catatan

**Blocked:** butuh persetujuan/eksekusi pemilik. Tempel isi `apps/mni-app/supabase/migrations/20240101000005_role_model_cleanup.sql` ke SQL Editor project "MNI Gudang - Dev" lalu Run. Sebelum itu pastikan semua akun yang dipakai memiliki role aplikasi (admin, ppic, gbb, gbj, logistik, viewer).
