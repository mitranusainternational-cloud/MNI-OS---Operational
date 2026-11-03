---
type: task
id: T-167
title: "Hak akses per pengguna dan per modul, kelola pengguna dari aplikasi"
phase: P5
epic: E-09
release: v1.1
status: doing
priority: P0
env: production
effort_days: 2
depends: [T-163]
owner: "dev + pemilik"
updated: 2026-11-03
---

# T-167 Hak akses per pengguna dan per modul, kelola pengguna dari aplikasi

Epic: [[roadmap/epics/E-09-akses-peran-dan-audit|E-09]]
Fase: P5  
Bergantung pada: T-163

## Kriteria selesai

- [x] Model hak: super admin (semua modul), peran sebagai paket bawaan, hak per pengguna `lihat` atau `ubah` per modul disimpan di `muser.data.modul`
- [x] Migration 11 (fungsi `mod_level`, `can_view`, `can_mod`, `can_any`; baca per modul; penjaga admin terakhir) dan migration 12 (`table_stamps`)
- [x] Menu dan tampilan per pengguna, modul tanpa hak tidak tampil; tombol catat terkunci pada hak lihat
- [x] Menu Pengguna & Akses untuk super admin: tambah anggota, atur modul, nonaktifkan, atur ulang password
- [x] Edge Function `kelola-pengguna` (buat akun dan atur ulang password dengan kunci server)
- [x] Sinkron antar pengguna: cek sidik perubahan tiap 4 detik, hanya tabel berubah yang dimuat ulang
- [x] Uji mock: 15 skenario akses (`tests/e2e/access.mjs`) dan regresi 38 + role 12 tetap lulus
- [x] Terapkan migration 11 dan 12 di Supabase production, uji RLS dengan transaksi yang di-rollback
- [x] Pasang Edge Function di production (aktif, verify_jwt)
- [x] Uji buat akun lewat menu (anggota pertama dibuat pemilik; akun dan hak modul tersimpan benar)
- [ ] Uji reset password sungguhan lewat menu
- [ ] Uji dua sesi: perubahan pengguna A terlihat pengguna B dalam hitungan detik
- [ ] Catat hasil di [[TEST_MATRIX]] dan [[ENVIRONMENTS]]

## Bukti

- Mock: 38 + 12 + 15 PASS (verified in browser, mock; bukan bukti Supabase).
- Production: migration 11 dan 12 terpasang; uji RLS rollback lulus (verified in database); lihat [[TEST_MATRIX]].

## Catatan

Pemasangan di production adalah perubahan skema dan fungsi pada sumber daya bersama, dikerjakan setelah persetujuan pemilik. Rencana lengkap: [[RENCANA_ADOPSI]].
