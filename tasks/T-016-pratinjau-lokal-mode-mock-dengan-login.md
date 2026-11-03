---
type: task
id: T-016
title: "Pratinjau lokal mode mock dengan login"
phase: P1
epic: E-02
release: v0.9
status: done
priority: P0
env: development
effort_days: 1
depends: [T-005, T-014]
owner: "dev"
updated: 2026-11-02
---

# T-016 Pratinjau lokal mode mock dengan login

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]  
Fase: P1 Fondasi lokal  
Bergantung pada: T-005, T-014

## Kriteria selesai

- [x] Dev server berjalan di 127.0.0.1:5173
- [x] Login OTP lokal untuk 5 role berhasil
- [x] Dashboard menampilkan data sintetis tanpa error console
- [x] Mock hanya aktif di localhost

## Bukti

- Verified in browser (2026-11-02): login `admin@mni.local` dengan kode lokal, dashboard memuat 2 SPK (1 terlambat) dan stok bahan baku; 0 error console. Screenshot: [[screenshots/README]]. Panduan: [[LOCAL_PREVIEW]].
- Bukan bukti Supabase/Auth/RLS sungguhan.

## Catatan

Dibuat karena Docker tidak dapat start (virtualisasi BIOS nonaktif). Tidak menggantikan T-011, T-012, T-020.
