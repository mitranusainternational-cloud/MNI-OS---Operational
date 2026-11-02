---
type: task
id: T-021
title: "Verifikasi CRUD dan realtime semua koleksi"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P0
env: development
effort_days: 3
depends: [T-020]
owner: "dev"
updated: 2026-11-02
---

# T-021 Verifikasi CRUD dan realtime semua koleksi

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]  
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-020

## Kriteria selesai

- [ ] 20 koleksi: add, get, set, update, delete lewat claude-adapter
- [ ] Realtime onSnapshot memperbarui UI
- [ ] Daftar bug tercatat

## Bukti

- Sebagian lewat mock (bukan Supabase): CRUD add/update/delete dan validasi diuji pada bahan baku, barang jadi, SPK, vendor, surat jalan, bongkar muat, dan master (14 fitur PASS, lihat [[TEST_MATRIX]]). Realtime dan konflik belum diuji. Tugas tetap `todo` sampai diuji pada Supabase.

## Catatan

Jalur baca terverifikasi pada Supabase nyata dengan sesi admin (19 koleksi, semua 200, 2026-11-02). Penulisan lewat aplikasi diuji dengan skenario U-01 sampai U-12 di [[documentation/UJI_SUPABASE_DEV]].

-
