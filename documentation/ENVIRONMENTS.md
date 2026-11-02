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
- `npm run extract` memakai sumber aktif `apps/gudang-logistik/` (keputusan T-014 di [[documentation/DECISIONS]]); tidak butuh file di luar repo. Terverifikasi: ekstrak, build, dan muat di browser tanpa error JS.
- Dev server: error `addEventListener` pada null sudah **diperbaiki** (2026-11-02). Penyebab: `index.html` tidak memuat `public/app.css` dan tidak menyisipkan `public/app-body.html` ke `#app-root`, sehingga `app.js` mencari elemen (`#editor`, `#toast`, dst.) yang belum ada. Kini `index.html` memuat CSS, menyisipkan body, lalu memuat `app.js`. Terverifikasi di browser: login tampil, tidak ada error JS; sisa error console hanya koneksi ke Supabase dummy (`example.invalid`).
- Login OTP, RLS, dan persistence belum diuji; Supabase belum tersambung.
- Migration scaffold tidak otomatis menjadi schema MNI OS; ikuti aturan di [[FOUNDATION_BASELINE]].
- Workflow `deploy.yml` men-deploy dari `main` dan PR ke Vercel. Belum ada secret terpasang, jadi belum berjalan.

Bukti: [[screenshots/README]].

## Inventaris akun cloud (dibaca 2026-11-02, hanya metadata)

| Layanan | Temuan | Arti untuk mni-app |
|---|---|---|
| GitHub | Repo organisasi `mitranusainternational-cloud/MNI-OS---Operational`, `main` terproteksi | Siap menerima kode |
| Supabase (org `nurilhamj@gmail.com`) | 3 project: "MNI OS" (aktif, 1 tenant, tabel ERP multi-tenant: tenants, items, BOM, routings), "MNI OS - Operational" (aktif, 80 tabel ERP, 0 baris), "Marketing OS - NIJ" (nonaktif) | Dua project aktif berskema ERP **berbeda** dari schema mni-app (20 tabel `rm`, `fg`, `spk`, …). Jangan dipakai tanpa keputusan |
| Vercel (team NIJ) | 0 project | Belum ada deployment |

Biaya project Supabase baru tidak bisa saya baca (izin konektor ditolak); periksa di dashboard sebelum membuat. Batas paket gratis biasanya dua project aktif.

### Opsi koneksi berikutnya

| Opsi | Langkah | Kelebihan | Kekurangan |
|---|---|---|---|
| A. Project Supabase baru khusus mni-app (dev) | Buat project, terapkan 2 migration, isi `.env.local`, uji T-020/T-028, lalu Vercel preview | Tercepat menuju sistem yang dipakai; tidak butuh Docker; terpisah dari project ERP | Mungkin berbiaya; data dev di cloud |
| B. Docker lokal | Aktifkan virtualisasi BIOS lalu `supabase start` | Gratis, terkendali | Menunggu tindakan di BIOS; hanya di satu mesin |
| C. Pakai project yang ada | Terapkan migration ke project ERP | Tanpa project baru | Skema berbeda, risiko merusak; tidak direkomendasikan |

Urutan setelah database ada: terapkan migration, uji login OTP dan adapter di Postgres (T-020, T-021, T-028), sambungkan Vercel ke GitHub (butuh izin aplikasi Vercel pada organisasi GitHub), preview dari `development`, lalu UAT.
