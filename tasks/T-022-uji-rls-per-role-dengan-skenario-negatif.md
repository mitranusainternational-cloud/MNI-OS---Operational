---
type: task
id: T-022
title: "Uji RLS per role dengan skenario negatif"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P0
env: development
effort_days: 2
depends: [T-021]
owner: "dev"
updated: 2026-11-02
---

# T-022 Uji RLS per role dengan skenario negatif

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]  
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-021

## Kriteria selesai

- [ ] Matriks role x tabel (baca/tulis) diuji
- [ ] viewer tidak bisa menulis; gudang/produksi hanya tabel sesuai peran
- [ ] Hasil disimpan di dokumentasi

## Bukti

- Belum ada.

## Catatan

Matriks hak tulis per role terhitung pada Supabase dev (2026-11-02, rollback) dan dicatat di [[TEST_MATRIX]]. Uji lewat aplikasi dengan login masing-masing role belum dilakukan.

Temuan tinjauan policy (2026-11-02, belum diuji): kunci dokumen (`lock:*`) dan pengaturan disimpan di tabel `master` yang hanya dapat ditulis admin/manager, padahal app memakai kunci saat membuat SPK; role `produksi` dan `gudang` kemungkinan gagal membuat SPK atau mutasi. Selain itu `spk`, `vendor` hanya boleh ditulis produksi, sedangkan `kirim`, `bongkar` hanya gudang; alur lintas peran perlu dicocokkan dengan proses nyata (T-030). Uji dan perbaiki sebelum UAT.

-
