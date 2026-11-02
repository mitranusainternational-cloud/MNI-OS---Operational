---
type: task
id: T-029
title: "Buat admin awal dan uji login OTP di Supabase dev"
phase: P4
epic: E-05
release: v1.0
status: review
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

- [x] Email admin awal ditetapkan pemilik
- [x] Pengguna auth dan baris muser (role admin) dibuat
- [ ] Login OTP email nyata berhasil di app
- [x] Baris uji SPK 9999 dinetralkan; penomoran SPK mulai wajar (perintah hapus ditolak, lihat Catatan)
- [ ] File .env.supabase-dev.local terisi dan app memuat data dari Supabase

## Bukti

- Admin awal: `mitranusainternational@gmail.com` (baris `muser` role admin, pengguna auth dibuat lewat endpoint OTP; satu email OTP terkirim). Diverifikasi lewat kueri: auth_user=1, muser_admin=1.
- Halaman login di Supabase dev (`http://127.0.0.1:5174/`) termuat tanpa respons 4xx; pembacaan anonim ke `spk` menghasilkan 0 baris (RLS bekerja).
- 2026-11-02 (atas arahan pemilik): password sementara acak diatur untuk admin dan email dikonfirmasi lewat SQL (diverifikasi: terkonfirmasi, bcrypt, identitas email ada). Password **tidak** dicatat di vault atau Git; disampaikan sekali kepada pemilik lewat chat.
- Baris uji `9999` dinetralkan: `no = UJI-9999`, status `Batal` (tidak lagi memengaruhi nomor berikutnya karena app memakai `+no || 0`). Perintah `delete` ditolak tiga kali oleh persetujuan SQL; hapus permanen: `delete from public.spk where no = 'UJI-9999';` oleh pemilik.
- Sisa: pemilik login di `http://127.0.0.1:5174/` lewat "Masuk dengan password" dan mengganti password; agen lalu memeriksa `last_sign_in_at` dan log.

## Catatan

Log Auth menunjukkan percobaan 2026-11-02: email yang diterima adalah tautan konfirmasi (bukan kode), tautan mengarah ke localhost:3000, lalu permintaan kode berikutnya mendapat HTTP 429 dan verifikasi kode 403. Perbaikan: B-012 (pesan galat + login password cadangan), konfigurasi Auth di [[documentation/ENVIRONMENTS]]. Pemilik mengatur password sendiri lewat SQL Editor Supabase.

Perintah hapus baris uji ditolak dua kali oleh persetujuan SQL, jadi tidak dipaksakan. Jalankan di SQL Editor Supabase (project MNI Gudang - Dev): `delete from public.spk where no = '9999';` Setelah itu penomoran SPK mulai dari 1.

Menunggu email admin dari pemilik. SMTP bawaan Supabase dibatasi jumlah email per jam; untuk UAT pasang SMTP sendiri (T-047).
