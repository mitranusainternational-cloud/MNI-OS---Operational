---
type: task
id: T-162
title: "Selidiki event Realtime Supabase yang tidak tiba"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P2
env: development
effort_days: 0.5
depends: [T-021]
owner: "dev + pemilik akun Supabase"
updated: 2026-11-03
---

# T-162 Selidiki event Realtime Supabase yang tidak tiba

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-021

## Kriteria selesai

- [ ] Penyebab event postgres_changes tidak tiba diketahui (RLS pada subscriber, pengaturan Realtime project, atau lainnya)
- [x] Keputusan resmi memakai polling saja (pemilik, 2026-11-03); Realtime hanya bila diselidiki kelak
- [ ] Uji dua sesi (admin dan role lain) mencatat hasilnya

## Bukti

- Channel SUBSCRIBED dan slot replikasi aktif; publikasi memuat 17 tabel; tidak ada event setelah UPDATE dari SQL (2026-11-03). Mitigasi: polling 15 detik (lihat [[TEST_MATRIX]] B-017).

## Catatan

**Keputusan pemilik 2026-11-03:** diagnostik GRANT ke anon tidak diizinkan; polling 15 detik jadi mekanisme resmi. Tugas ini opsional dan bisa diambil lagi lewat Realtime Inspector bila latensi 15 detik tidak cukup.

Langkah aman: Realtime Inspector di dashboard (sebagai postgres dan authenticated). Dugaan: select policy memakai `is_authenticated()` yang EXECUTE-nya dicabut dari anon dan PUBLIC di migration 7. Diagnostik GRANT sementara ditolak persetujuan karena melemahkan keamanan; butuh keputusan pemilik. Alternatif: policy SELECT yang tidak memanggil fungsi tersebut.
