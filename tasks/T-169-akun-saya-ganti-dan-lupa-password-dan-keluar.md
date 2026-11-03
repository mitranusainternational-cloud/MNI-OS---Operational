---
type: task
id: T-169
title: "Akun saya: ganti password, lupa password, dan tombol keluar"
phase: P5
epic: E-09
release: v1.1
status: review
priority: P0
env: production
effort_days: 0.5
depends: [T-167]
owner: "dev"
updated: 2026-11-03
---

# T-169 Akun saya: ganti password, lupa password, dan tombol keluar

Epic: [[roadmap/epics/E-09-akses-peran-dan-audit|E-09]]
Fase: P5  
Bergantung pada: T-167

## Kriteria selesai

- [x] Klik nama pengguna membuka Akun saya: peran, akses modul, Ganti password, Keluar (sebelumnya belum ada tombol keluar sama sekali)
- [x] Ganti password sendiri dengan validasi (minimal 8 karakter, kedua isian sama)
- [x] Lupa password di halaman masuk dan halaman buat password baru dari tautan pemulihan
- [x] Uji mock: A-15 sampai A-19 (akun, validasi, keluar), total e2e 38 + 12 + 19 lulus
- [ ] Uji tautan pemulihan dengan email sungguhan di production (butuh SMTP kustom agar tidak kena batas email bawaan)
- [ ] Pemilik menyiapkan SMTP kustom di Supabase Auth

## Bukti

- Mock (verified in browser, bukan bukti Supabase): akun, validasi, keluar. Alur tautan pemulihan hanya source-level sampai diuji dengan email nyata.

## Catatan

Syarat go-live: akun baru memakai password sementara dari super admin, jadi pengguna harus bisa menggantinya sendiri. Bila email pemulihan gagal terkirim (batas email bawaan Supabase), super admin tetap bisa mengatur ulang password lewat menu Pengguna & Akses.
