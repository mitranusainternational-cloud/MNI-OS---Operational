---
type: environment-guide
status: active
updated: 2026-11-02
---

# Tiga versi: Development, Main, Docs

Jalur tahap lengkap: [[INTEGRATION_PATH]]. Pemetaan permintaan "3 environment" ke branch Git dan target deploy. Aturan branch lengkap ada di [[VERSION_STRATEGY]].

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

## Supabase Development (dibuat 2026-11-02)

| Item | Nilai |
|---|---|
| Project | `MNI Gudang - Dev`, ref `inldyqigewmziwazalun`, region ap-southeast-1 |
| URL | `https://inldyqigewmziwazalun.supabase.co` (bukan rahasia) |
| Migration terpasang | init_schema, rls_policies, app_shape_compat (20 tabel, 19 dengan kolom `data`, 39 policy, 17 tabel realtime) |
| Kunci di aplikasi | hanya kunci anon/publishable (publik); kunci service-role tidak dipakai di mana pun |
| Menjalankan app ke project ini | file lokal `apps/mni-app/.env.supabase-dev.local` (diabaikan Git), lalu `npx vite --mode supabase-dev` |
| Perubahan akun | project `MNI OS - Operational` (kosong) dijeda agar muat di batas gratis; dapat dipulihkan dari dashboard |
| User admin awal | `mitranusainternational@gmail.com` (login password berhasil 2026-11-02; ganti password sementara) |
| Belum ada | data, Vercel, CI |

Temuan advisor keamanan (peringatan, bukan kritis): fungsi `get_user_role`, `is_authenticated`, `is_admin_or_manager` (SECURITY DEFINER) dapat dipanggil lewat RPC oleh anon dan authenticated; ekstensi `pg_trgm` di schema public. Dijadwalkan di T-060.

### Konfigurasi Auth Supabase dev yang perlu disesuaikan (temuan 2026-11-02)

Diamati dari log Auth saat percobaan login pertama:

1. **Email berisi tautan, bukan kode 6 digit.** Akun admin dibuat lewat endpoint OTP sehingga memakai templat "Confirm signup" (tautan `type=signup` dengan `redirect_to=http://localhost:3000`). Aplikasi meminta kode 6 digit. Templat "Magic Link" dan "Confirm signup" perlu menyertakan `{{ .Token }}`.
2. **URL situs salah.** `site_url` masih bawaan `http://localhost:3000`. Atur Authentication → URL Configuration: Site URL `http://127.0.0.1:5174` dan tambahkan `http://127.0.0.1:5174/**` ke Redirect URLs.
3. **Batas pengiriman email.** SMTP bawaan Supabase sangat terbatas per jam; permintaan kode kedua dan ketiga mendapat HTTP 429. Untuk pemakaian nyata pasang SMTP sendiri (T-047).
4. **Cadangan tanpa email.** Aplikasi kini menyediakan "Masuk dengan password" (hanya Supabase nyata). Password diatur sendiri oleh pemilik akun (lihat T-029); password tidak pernah dikirim ke saya atau disimpan di repo.
