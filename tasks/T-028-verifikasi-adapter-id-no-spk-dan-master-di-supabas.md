---
type: task
id: T-028
title: "Verifikasi adapter id, no SPK, dan master di Supabase"
phase: P2
epic: E-03
release: v1.0
status: review
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

- Sebagian: Postgres nyata menolak id non-UUID (`22P02`), sehingga pemetaan UUID diperlukan (lihat [[TEST_MATRIX]]). Uji penuh lewat app menunggu login nyata (T-029).

## Catatan

Terbukti di Postgres nyata: id UUID, `no` angka-teks, dokumen master, dan revisi SPK satu baris (`rev = 1`). Sisa: duplikat SPK dan pengaturan RM (rmset).

Terbukti di Postgres nyata lewat aplikasi: SPK baru memakai id UUID (B-007) dan `no = "1"` (B-008), dokumen `master/*` (katalog, counter) tersimpan (B-009). Sisa: revisi SPK tanpa baris ganda (U-06).

Skenario U-05, U-06, dan U-11 di [[documentation/UJI_SUPABASE_DEV]] membuktikan id UUID, revisi SPK tanpa baris ganda, dan dokumen master pada Postgres nyata.

Prioritas P0 karena kegagalan ini baru muncul di Postgres sungguhan.
