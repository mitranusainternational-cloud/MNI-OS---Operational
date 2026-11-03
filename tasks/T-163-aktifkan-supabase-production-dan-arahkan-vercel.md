---
type: task
id: T-163
title: "Aktifkan Supabase production dan arahkan Vercel"
phase: P5
epic: E-05
release: v1.0
status: doing
priority: P0
env: production
effort_days: 1
depends: [T-162]
owner: "pemilik + dev"
updated: 2026-11-03
---

# T-163 Aktifkan Supabase production dan arahkan Vercel

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]
Fase: P5  
Bergantung pada: T-162

## Kriteria selesai

- [x] Pengguna auth admin dibuat di project MNI Gudang - Production dan login berhasil
- [ ] Auth: Site URL, Redirect URL, sign-up dimatikan, leaked password protection aktif
- [ ] Env Vercel (Production dan Preview) mengarah ke project production
- [x] Uji penuh dari fondasi ke output (RLS, alur aplikasi) di production; ekspor PDF/Excel dan login di Vercel menyusul
- [ ] Catat di ENVIRONMENTS, SISTEM_MAP, TEST_MATRIX

## Bukti

- Uji tulis production lulus 2026-11-03 (nomor dokumen, kolom relasi, kunci atomik; simpan 0,6 sampai 1,5 detik); lihat [[TEST_MATRIX]]. Pembersih data uji: `apps/platform/supabase/ops/bersihkan_data_uji.sql`.
- Login admin dan uji baca production lulus 2026-11-03 (10 modul, 21 tabel, latensi median 233 ms); lihat [[TEST_MATRIX]].
- Migration 1–10 terpasang berurutan pada project kosong, matriks role dan advisor diperiksa (2026-11-03); lihat [[ENVIRONMENTS]].

## Catatan

**Sisa (2026-11-03, diverifikasi):** Site URL masih localhost; pendaftaran bebas masih aktif; env Vercel belum diganti (bundel masih ke dev lama). Langkah aksi pemilik: Supabase Production → Auth → URL Configuration (Site URL `https://mni-gudang.vercel.app`; Redirect URLs `https://mni-gudang.vercel.app/**`, `https://*-mitranusainternational-8337.vercel.app/**`, `http://127.0.0.1:5175/**`), Sign In / Providers (matikan sign-up), Vercel → Environment Variables (`VITE_SUPABASE_URL` = `https://lggqigmvtefkquqjrjsb.supabase.co`, `VITE_SUPABASE_ANON_KEY` = kunci publishable production) lalu Redeploy.

Langkah akun dilakukan pemilik. Region project eu-central-1 (latensi lebih tinggi dari Singapura); ukur setelah login.
