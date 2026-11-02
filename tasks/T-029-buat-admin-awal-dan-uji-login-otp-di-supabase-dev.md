---
type: task
id: T-029
title: "Buat admin awal dan uji login OTP di Supabase dev"
phase: P4
epic: E-05
release: v1.0
status: todo
priority: P0
env: development
effort_days: 0.5
depends: [T-042]
owner: "dev + pemilik akun"
updated: 2026-11-02
---

# T-029 Buat admin awal dan uji login OTP di Supabase dev

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]
Fase: P4 Environment cloud  
Bergantung pada: T-042

## Kriteria selesai

- [ ] Email admin awal ditetapkan pemilik
- [ ] Pengguna auth dan baris muser (role admin) dibuat
- [ ] Login OTP email nyata berhasil di app
- [ ] Baris uji SPK 9999 dibersihkan; penomoran SPK mulai wajar
- [ ] File .env.supabase-dev.local terisi dan app memuat data dari Supabase

## Bukti

- Belum ada.

## Catatan

Menunggu email admin dari pemilik. SMTP bawaan Supabase dibatasi jumlah email per jam; untuk UAT pasang SMTP sendiri (T-047).
