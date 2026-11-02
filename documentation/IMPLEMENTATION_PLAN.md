---
type: implementation-plan
status: proposed
updated: 2026-11-02
---

# Rencana implementasi local-first

## Sasaran

Bangun MNI OS Gudang & Logistik sebagai aplikasi operasional yang dapat diuji secara lokal sebelum source dikirim ke GitHub, Vercel, atau dihubungkan ke data live. Urutan ini memisahkan lingkungan Development, Main, dan Docs.

Baseline bukti terkini ada di [[FOUNDATION_BASELINE|baseline fondasi]]; mulai dari [[OPERATIONAL_DISCOVERY|discovery kebutuhan Operasional]]. Brief saldo gudang lama [[apps/gudang-logistik/docs/PILOT_BRIEF|belum disetujui sebagai pilot]].

## Prinsip produk

MNI OS adalah sistem custom untuk proses tim Operasional MNI. Antlia atau ERP eksternal lain tidak menjadi blueprint, daftar fitur, atau sumber kebenaran kebutuhan. Mulai dari current-state tim: siapa melakukan apa, data/dokumen yang dipakai, aturan dan kontrol, pengecualian, masalah, serta hasil yang dibutuhkan. Validasi dengan pemilik proses sebelum menyetujui fitur atau skema database. Pola umum dari sumber luar hanya membantu membandingkan opsi desain.

## Arsitektur kerja yang dituju

| Bagian | Development lokal | Main / user | Docs |
|---|---|---|---|
| Website | Source dan preview lokal di `apps/gudang-logistik/` | Deployment Vercel setelah gate rilis | Dokumentasi Obsidian/source; website publik hanya bila diklasifikasikan dan direncanakan |
| Database | Supabase local stack, migration dan seed sintetis | Hosted Supabase project yang telah dikonfirmasi dan di-hardening | Tidak menggunakan database operasional |
| Secrets | `.env.local` yang di-ignore | Vercel production environment variables | Tidak menerbitkan secret |
| Git | Local `development` untuk pekerjaan | GitHub `main` setelah review/approval | Branch/docs strategy sesuai kebutuhan, bukan sumber data runtime |

**Catatan:** Supabase project `MNI - Operational` terdeteksi aktif, tetapi belum dipastikan target dan schema-nya bukan rancangan produk custom yang disepakati. Dua migration SQL sibling juga bukan dasar otomatis. Turunkan schema Development dari kebutuhan Operasional yang tervalidasi; baru setelah itu evaluasi apakah project hosted dapat dipakai.

## Tahapan dan kriteria selesai

### Tahap A — Baseline dan desain pilot

- [x] Pertahankan [[apps/gudang-logistik/docs/PILOT_BRIEF|brief hipotesis lama]] untuk jejak audit; belum dipilih sebagai pilot.
- [x] Susun role, journey awal, exception-state, dan acceptance criteria kandidat; statusnya masih usulan.
- [x] Buat [[apps/gudang-logistik/docs/DATA_MAPPING|pemetaan field/source ke entity kandidat]] dengan label confidence/unknown.
- [ ] Temukan dan dokumentasikan proses aktual Operasional sebelum mengunci pilot atau model data.
- [ ] Validasi proses prioritas dan acceptance criteria bersama process owner.
- [ ] Putuskan apakah vanilla JS tetap memadai atau migrasi UI bertahap diperlukan.
- **Selesai bila:** proses prioritas dipilih oleh tim, tiap requirement/acceptance criterion punya bukti dan pemilik yang jelas. Saat ini discovery belum dimulai.

### Tahap B — Supabase lokal

- [ ] Turunkan schema dari requirement Operasional yang disetujui; jangan menebak DDL dari daftar tabel project hosted atau sistem lain.
- [x] Jalankan Supabase CLI `2.122.0` lewat `npx` dan buat `supabase/config.toml` lokal yang tidak di-link ke hosted project.
- [ ] Jalankan local stack — **blocked:** Docker engine/service belum dapat diakses dari sesi Windows ini.
- [ ] Autentikasi Supabase CLI secara lokal bila dibutuhkan untuk daftar/link project — saat ini `projects list` meminta access token; management connector bukan sesi CLI.
- [ ] Simpan schema sebagai timestamped migrations; seed hanya dengan data sintetis.
- [ ] Siapkan `.env.example` dan local env ignored; jangan memasukkan keys ke source.
- [ ] Bangun identity context: membership → tenant → company → plant/site → warehouse → storage location.
- [ ] Terapkan RLS minimum-permission dan validasi dengan user/tenant berbeda pada local DB.
- [x] Tinjau dan dokumentasikan advisor findings untuk hosted candidate di [[FOUNDATION_BASELINE|baseline fondasi]].
- [ ] Tinjau per function/policy dan hardening sebelum hosted use, setelah target migration lineage diketahui.
- **Selesai bila:** reset lokal mereproduksi schema/seed; negative access checks membuktikan tenant isolation; tidak ada production data/secret. Saat ini config hanyalah scaffold dan aplikasi belum terhubung.

### Tahap C — Vertical slice website ↔ database

- [ ] Implementasikan login/session dan pemilihan tenant/company/plant/warehouse context pada satu alur pilot.
- [ ] Ganti adapter demo `window.claude` hanya pada batas modul yang dipilih, bukan rewrite global sekaligus.
- [ ] Cegah write jika user, membership, tenant, company, site, atau warehouse context belum sah.
- [ ] Tampilkan status loading/empty/error/offline secara jujur.
- [ ] Catat audit trail untuk perubahan operasional sesuai kebutuhan proses.
- [ ] Verifikasi alur UI, API/database, dan persistence sebagai klaim terpisah.
- **Selesai bila:** skenario normal dan gagal berjalan di local, data tenant tidak bocor antar user, serta dokumentasi diperbarui.

### Tahap D — Integrasi Composio terpilih

- [ ] Buat daftar per kasus pakai: tool/provider, pemilik akun, kebutuhan data, tindakan read/write, dan retensi.
- [ ] Mulai Drive/Sheets dengan scope read-only untuk inventaris dan validasi sumber, jika memang dibutuhkan pilot.
- [ ] Hubungkan satu provider pada satu waktu; validasi owner dan data yang diizinkan sebelum query.
- [ ] Untuk integrasi di aplikasi user, jalankan Composio SDK/API server-side; derive user/tenant ID dari sesi terautentikasi, bukan input browser/model.
- [ ] Batasi daftar tool, akun terhubung, environment, dan operasi per role; catat audit dan cara revoke.
- **Selesai bila:** connector yang dipakai punya owner, least-privilege scope, skenario test, dan prosedur pencabutan.

### Tahap E — GitHub dan Vercel preview

- [ ] Review diff, secrets, migrations, data fixture, dan dokumentasi lokal sebelum commit/push.
- [ ] Push ke branch `development` setelah workspace lokal dinyatakan siap.
- [ ] Buat Vercel project dengan root `apps/gudang-logistik`, static preset `Other`, dan output sesuai isi folder.
- [ ] Hubungkan Preview deployment ke Supabase Development; jangan memakai production key/data di preview.
- [ ] Periksa build/deployment logs, routing, cache, asset paths, Auth callback URL, dan RLS dari deployment preview.
- **Selesai bila:** deployment preview dapat diperiksa dan tidak menunjuk database Main.

### Tahap F — Main/domain dan operasional

- [ ] Hardening hosted Supabase dan close/accept security findings dengan alasan yang tercatat.
- [ ] Pastikan backup/restore, migration promotion, audit, monitor, rate limits, dan rollback plan.
- [ ] UAT dengan process owner dan role yang benar menggunakan lingkungan aman.
- [ ] Set production branch `main`; pisahkan URL/key Supabase production dari Preview.
- [ ] Kaitkan domain setelah user menerima UAT dan checklist rilis.
- [ ] Catat URL domain, pemilik DNS, renewal, monitoring, support owner, dan prosedur rollback.
- **Selesai bila:** persetujuan rilis eksplisit, UAT diterima, deployment dan domain terverifikasi, serta ada runbook.

### Tahap G — Docs

- [ ] Pisahkan dokumentasi pengguna, pengembang, proses, riset, dan keputusan.
- [ ] Klasifikasikan materi internal versus publik sebelum deployment docs.
- [ ] Buat/build situs dokumentasi hanya bila kebutuhan publikasi dan sumber konten sudah diputuskan.
- **Selesai bila:** sumber dokumentasi bisa dirawat tanpa mengungkap data internal atau membuat klaim proses tanpa validasi.

## Aturan kerja GitHub

- Lokal adalah tempat iterasi dan validasi pertama.
- Jangan push setiap draft; lakukan review lokal, secret scan yang tersedia, migration review, dan acceptance checks dahulu.
- Git branch mengatur perubahan source; ia tidak otomatis mengisolasi database. Vercel environment dan Supabase target harus dipetakan secara terpisah.
- `main` hanya menerima perubahan yang sudah melalui release gate. Jangan deploy source prototype statis sebagai aplikasi multi-user.

## Tools yang dipakai

- **Codex + agent/skill lokal:** kebutuhan, analisis, implementasi, review, dan dokumentasi.
- **Context7:** cek dokumentasi Supabase/Vercel/Composio terkini sebelum memilih perintah/konfigurasi.
- **Supabase CLI/local stack:** migrations, local database, seed sintetis, dan validasi policy.
- **Playwright:** browser acceptance setelah local vertical slice siap dan supported browser tersedia.
- **Composio:** aplikasi pihak ketiga yang ditentukan satu per satu dengan owner, scope, dan least privilege.
- **Obsidian:** roadmap, progress, keputusan, riset, data dictionary, dan panduan.
- **GitHub:** version control setelah gerbang local-ready.
- **Vercel:** Preview dahulu; Main/domain setelah UAT dan release gate.

## Risiko yang perlu dipantau

- Hosted Supabase target/lineage belum dipastikan. Migration SQL sibling berada di luar repo dan berbeda model identitas dari hosted schema.
- Security Advisor hosted project memiliki warning yang harus ditinjau sebelum production connection.
- Supabase CLI `2.122.0` dapat dijalankan via `npx`, tetapi Docker engine belum tersedia pada sesi ini.
- Prototype memakai adapter custom dan UI belum memakai Supabase Auth.
- Composio Sheets/Drive/GitHub belum memiliki koneksi aktif di workflow yang diperiksa.
- Browser runner tidak terhubung untuk E2E visual; HTTP status code saja bukan acceptance proof.

Lihat [[research/2026-11-02-local-supabase-vercel-composio-readiness|audit kesiapan awal]] dan [[ROADMAP|roadmap checklist]].
