---
type: epic
id: E-09
title: "Akses, peran, dan audit"
release: v1.1
theme: Keamanan
priority: P1
status: active
progress: 0
tasks_total: 6
tasks_done: 0
updated: 2026-11-03
---

# E-09 Akses, peran, dan audit

Rilis target: **v1.1** · Tema: Keamanan · Prioritas: P1
Induk: [[roadmap/PRODUCT_ROADMAP|Roadmap produk]]

## Hasil yang diinginkan

Hak akses per role ditegakkan di UI dan database; semua perubahan penting punya jejak audit.

## Risiko dan asumsi

Saat ini ROLE_ON=false di prototipe; aturan peran perlu disepakati dengan pemilik proses.

## Tugas

- [ ] [[tasks/T-101-tegakkan-role-di-ui-selaras-rls-role-on|T-101]] Tegakkan role di UI selaras RLS (ROLE_ON) · todo · P1 · 3 hari
- [ ] [[tasks/T-102-jejak-audit-perubahan-stok-dan-spk|T-102]] Jejak audit perubahan stok dan SPK · todo · P1 · 3 hari
- [ ] [[tasks/T-103-manajemen-user-oleh-admin-dari-ui|T-103]] Manajemen user oleh admin dari UI · todo · P1 · 2 hari
- [ ] [[tasks/T-104-tinjau-kebijakan-sesi-dan-otp|T-104]] Tinjau kebijakan sesi dan OTP · todo · P2 · 1 hari
- [ ] [[tasks/T-167-hak-akses-per-pengguna-dan-per-modul|T-167]] Hak akses per pengguna dan per modul, kelola pengguna dari aplikasi · review · P0 · 2 hari
- [ ] [[tasks/T-169-akun-saya-ganti-dan-lupa-password-dan-keluar|T-169]] Akun saya: ganti password, lupa password, dan tombol keluar · review · P0 · 0.5 hari

> Properti status, progress, dan jumlah tugas serta daftar ini dibuat otomatis oleh `node scripts/progress-report.mjs`. Jangan ubah manual. Tampilan interaktif: [[PROGRESS_DASHBOARD]].
