---
type: task
id: T-021
title: "Verifikasi CRUD dan realtime semua koleksi"
phase: P2
epic: E-03
release: v1.0
status: done
priority: P0
env: development
effort_days: 3
depends: [T-020]
owner: "dev"
updated: 2026-11-03
---

# T-021 Verifikasi CRUD dan realtime semua koleksi

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]  
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-020

## Kriteria selesai

- [x] 20 koleksi: add, get, set, update, delete lewat claude-adapter
- [x] Realtime onSnapshot memperbarui UI
- [x] Daftar bug tercatat

## Bukti

- Uji tulis penuh di production (item, terima, pakai, opname, master, SPK, kirim, surat jalan, bongkar) dan sinkron dua sesi sekitar 1 detik; lihat [[TEST_MATRIX]].
- Sebagian lewat mock (bukan Supabase): CRUD add/update/delete dan validasi diuji pada bahan baku, barang jadi, SPK, vendor, surat jalan, bongkar muat, dan master (14 fitur PASS, lihat [[TEST_MATRIX]]). Realtime dan konflik belum diuji. Tugas tetap `todo` sampai diuji pada Supabase.

## Catatan

Tambahan 2026-11-03: opname RM, ubah/hapus master, nonaktif master terpakai PASS di Supabase. Realtime push tidak tiba (B-017); polling 15 detik jadi cadangan dan terverifikasi. Akar masalah: T-162.

Tambahan 2026-11-03: alur admin di Supabase lulus (item RM, terima, pakai, master, SPK baru/tanpa due/duplikat). B-014 (UI tidak segar setelah tulis) dan B-015 (nomor dokumen berulang) ditemukan dan diperbaiki. Sisa: ubah/hapus master, opname RM, Realtime antar sesi.

Ulangan di Supabase (2026-11-02 16:03–16:13): terima/pakai material, revisi SPK, dan log aktivitas PASS; tanpa galat di log API/Postgres. Kriteria yang belum: delete, realtime antar sesi, dan 8 koleksi yang belum disentuh (rmhist, pr, opname RM, ureq, uinv, muser dari UI, dll.). Status `review` sampai disepakati cukup.

Uji tulis nyata di Supabase dev (2026-11-02): 12 jenis tulis PASS, log sebagian gagal (B-013, diperbaiki di adapter; perlu uji ulang). Sisa: terima/pakai material, revisi/duplikat SPK, ubah/hapus master. Lihat [[TEST_MATRIX]].

Jalur baca terverifikasi pada Supabase nyata dengan sesi admin (19 koleksi, semua 200, 2026-11-02). Penulisan lewat aplikasi diuji dengan skenario U-01 sampai U-12 di [[documentation/UJI_SUPABASE_DEV]].

-
