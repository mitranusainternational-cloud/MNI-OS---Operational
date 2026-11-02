---
type: research
date: 2026-11-02
topic: local-first-supabase-vercel-composio-readiness
status: initial-audit
---

# Audit awal: Supabase, Vercel, dan Composio untuk MNI OS

## Tujuan dan cakupan

Menyiapkan urutan untuk mematangkan aplikasi Gudang & Logistik di lokal, lalu menyiapkan Supabase sebagai database, Vercel untuk web deployment/domain, dan Composio untuk integrasi layanan yang benar-benar diperlukan. Pemeriksaan hosted Supabase dan koneksi Composio pada 2026-11-02 bersifat read-only. Tidak ada migration, transaksi, koneksi OAuth, perubahan akun, atau deployment yang dijalankan.

## Fakta yang diamati

### Checkout lokal

- Repository aktif berada di branch `development` dan memiliki remote bernama `origin` ke repository MNI-OS---Operational. Tidak ada push atau publish yang dilakukan.
- Aplikasi di `apps/gudang-logistik/` sekarang berupa HTML/CSS/JavaScript statis. Belum ada `package.json`, folder `supabase/`, file migration lokal, atau konfigurasi Vercel pada checkout ini.
- `window.claude` adalah adapter data di prototype. Ini bukan konektor Supabase yang telah diverifikasi.
- Pada folder sibling bernama `MNI OS - Dept. Operational` di parent project ditemukan dua SQL migration (`202610300001_operational_foundation.sql`, `202610300002_harden_foundation.sql`), tetapi folder itu bukan repository checkout ini. Migration tersebut memakai model `organizations`/`organization_members`, sedangkan project hosted yang diperiksa memakai `tenants`/`tenant_memberships`.
- Node/npm dan Docker CLI ditemukan; Supabase CLI tidak ditemukan. Status Docker daemon belum diperiksa.
- Preview statis lokal berjalan pada `http://localhost:8002/`. Itu menyajikan file UI dan tidak membuktikan Auth/database/persistence.

### Supabase yang dapat diakses

- Akun Supabase yang tersambung menampilkan project bernama **MNI - Operational**, status `ACTIVE_HEALTHY`, region `ap-southeast-2`, Postgres 17.
- Inventaris read-only menampilkan 80 tabel pada schema `public`; seluruhnya melaporkan RLS aktif dan nol baris pada ringkasan metadata. Ini bukan bukti audit lengkap seluruh objek atau kebijakan runtime.
- Migration ledger menampilkan 19 migration records hingga versi `20261019231625` / `020_seed_demo_data`. Berkas SQL migration tersebut tidak ada dalam checkout lokal ini.
- **Interpretation:** SQL pada folder sibling kemungkinan merupakan generasi/model schema berbeda dari project hosted (mis. organization vs tenant). Jangan salin atau apply sebelum lineage, pemilik, dan target databasenya dicocokkan.
- Struktur tabel mengindikasikan model tenant, membership, company/plant/warehouse, inventory, work order, purchasing, sales, delivery, dan invoicing. Kesesuaian skema ini dengan prototype/fungsi yang diminta belum divalidasi.
- Security advisor (2026-11-02) melaporkan: tiga function dengan mutable `search_path`; satu `SECURITY DEFINER` inventory function dapat dipanggil `anon`; tujuh function `SECURITY DEFINER` dapat dipanggil `authenticated`; leaked-password protection nonaktif.
- Performance advisor melaporkan: 94 foreign key belum memiliki covering index; 20 policy RLS menggunakan pola auth-initplan yang berpotensi tidak efisien; 109 index belum terpakai. Temuan performa ini perlu ditinjau sesuai pola pemakaian dan umur statistik.
- Temuan advisor adalah sinyal untuk review per objek; tidak diperbaiki otomatis dan tidak otomatis membuktikan eksploitasi.

### Composio dan Vercel

- Composio melaporkan belum ada koneksi aktif untuk Google Drive, Google Sheets, GitHub, maupun Nango pada pencarian workflow ini. Pencarian tidak memulai OAuth.
- Hasil rencana Google Sheets menyarankan inventaris metadata dan pembacaan range terbatas; validasi tab/headers dahulu dan paginasi pencarian file.
- Konteks proyek meminta perubahan lokal dulu. Vercel/GitHub linkage dan deployment menunggu hasil lokal siap, konfigurasi env terpisah, dan persetujuan promosi.

## Interpretasi dan rekomendasi

1. Project Supabase bernama sama/serupa **belum dianggap target database aplikasi ini** sampai asal-usul schema/migrations dan pemilik project mengonfirmasi pemetaan. Jangan jalankan `db push`, migration, seed, atau DDL ke project tersebut sekarang.
2. Buat alur lokal yang dapat direproduksi dari migration source yang ditinjau. Jika migration SQL untuk project yang sudah ada tidak bisa ditemukan, putuskan apakah local foundation baru perlu dibangun atau source migration dipulihkan dari repository/backup yang berwenang.
3. Sebelum integrasi UI, tetapkan alur identitas secara eksplisit: user membership → tenant → active company → plant/site → warehouse → storage location. Nilai dari browser tidak boleh dianggap otorisasi tanpa validasi membership/RLS.
4. Jangan memasukkan service-role key atau Composio API key ke browser, HTML, repo, screenshot, atau vault. Gunakan hanya public/publishable key pada client dengan Auth/RLS; operasi privileged perlu server-side dan otorisasi yang terbatas.
5. Perlakukan Composio sebagai alat akses konektor/agent yang scope-nya dipilih per use case. Hubungkan Drive/Sheets satu per satu setelah koneksi diaktifkan oleh pemilik; default read-only; jangan hubungkan semua plugin tanpa inventaris kebutuhan.
6. Vercel cocok untuk frontend statis ini, tetapi domain/prod tidak ditautkan sebelum code dan local acceptance siap di GitHub. Konfigurasikan root project ke `apps/gudang-logistik`, framework preset `Other`, tanpa build command bila tetap static. Preview branch dan production branch punya env/DB yang terpisah.
7. Jangan migrasi ke React/Vite hanya untuk koneksi database. Putuskan setelah kebutuhan Auth, routing, komponen, dan integration surface dinilai; gunakan migrasi bertahap dan bukti penerimaan.

## Gate sebelum mulai implementasi Supabase lokal

- [ ] Pastikan apakah **MNI - Operational** adalah project Supabase yang memang ditujukan bagi checkout ini.
- [ ] Pulihkan/verifikasi source SQL yang cocok dengan 20 versi migration ledger; bandingkan dengan migration pada folder sibling dan tandai schema lineage/drift; jangan menyusun ulang schema hanya dari nama tabel.
- [ ] Tentukan modul dan satu alur pilot, role, company/plant/warehouse, serta data sintetis untuk local dev.
- [ ] Tentukan apakah penggunaan Docker lokal di komputer ini tersedia dan berfungsi.
- [ ] Siapkan konfigurasi lokal dan `.env.example` tanpa secret; verifikasi ignore untuk `.env*`.
- [ ] Tinjau Security Advisor findings per function/auth setting sebelum koneksi aplikasi diizinkan.

## Sumber teknis (diakses 2026-11-02)

- Supabase CLI: [README dan workflow migration/local DB](https://github.com/supabase/cli/blob/develop/README.md)
- Supabase RLS: [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- Vercel static app: [Builds tanpa langkah build untuk static site](https://vercel.com/docs/builds)
- Vercel monorepo config: [Project configuration](https://vercel.com/docs/project-configuration/vercel-json)
- Vercel branch deployments: [Automatic deployments](https://vercel.com/docs/git/vercel-for-origin)
- Composio: [Per-user sessions](https://docs.composio.dev/docs/consumer-agents), [managed auth](https://docs.composio.dev/docs/authentication/managed-auth-for-custom-tools)

## Hubungan catatan

- [[documentation/IMPLEMENTATION_PLAN|Rencana implementasi local-first]]
- [[documentation/ROADMAP|Roadmap dan checklist]]
- [[documentation/PROJECT_PROGRESS|Progress proyek]]
- [[documentation/VERSION_STRATEGY|Strategi branch dan versi]]
