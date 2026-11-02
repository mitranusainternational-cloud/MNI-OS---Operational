---
type: environment-guide
status: active
updated: 2026-11-02
---

# Tiga versi: Development, Main, Docs

Pemetaan permintaan "3 environment" ke branch Git dan target deploy. Aturan branch lengkap ada di [[VERSION_STRATEGY]].

| Versi | Branch GitHub | Tujuan | Deploy | Status |
|---|---|---|---|---|
| Development | `development` | Pengembangan dan pengujian | Preview Vercel (PR) + Supabase project terpisah | Branch ada; deploy belum dibuat |
| Main | `main` | Versi untuk pengguna | Vercel Production + Supabase production | Branch ada; masih sama dengan `versi-awal` |
| Docs | `docs` | Dokumentasi pengembangan | Situs statis (kandidat: Quartz/MkDocs dari vault) | Branch ada; situs belum dibuat |
| Baseline | `versi-awal` | Acuan beku | Tidak ada | Beku |

## Aturan isolasi (belum terpenuhi)

Branch hanya memisahkan riwayat kode. Sebelum data nyata dipakai, setiap versi perlu:
1. Supabase project sendiri (dev dan prod). Jangan memakai satu database untuk keduanya.
2. Secret per environment di Vercel/GitHub (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Service-role key tidak boleh masuk client.
3. Promosi `development` -> `main` lewat PR dan [[RELEASE_CHECKLIST]].

## Aplikasi `apps/mni-app` (scaffold Vite + Supabase)

Disalin dari `mni-app/` pada 2026-11-02. Isinya: Vite, `vercel.json`, workflow deploy, docker-compose VPS, dan 2 migration (20 tabel). Status verifikasi:

- `npm ci` dan `vite build`: berhasil (source-level, env dummy).
- `npm run extract` butuh `mni-gudang.html`, yang tidak ada di folder. Dicoba dengan `apps/gudang-logistik/reference/*.html`; JS/CSS berhasil diekstrak.
- Dev server: error `addEventListener` pada null sudah **diperbaiki** (2026-11-02). Penyebab: `index.html` tidak memuat `public/app.css` dan tidak menyisipkan `public/app-body.html` ke `#app-root`, sehingga `app.js` mencari elemen (`#editor`, `#toast`, dst.) yang belum ada. Kini `index.html` memuat CSS, menyisipkan body, lalu memuat `app.js`. Terverifikasi di browser: login tampil, tidak ada error JS; sisa error console hanya koneksi ke Supabase dummy (`example.invalid`).
- Login OTP, RLS, dan persistence belum diuji; Supabase belum tersambung.
- Migration scaffold tidak otomatis menjadi schema MNI OS; ikuti aturan di [[FOUNDATION_BASELINE]].
- Workflow `deploy.yml` men-deploy dari `main` dan PR ke Vercel. Belum ada secret terpasang, jadi belum berjalan.

Bukti: [[screenshots/README]].
