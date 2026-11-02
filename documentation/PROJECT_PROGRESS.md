---
type: project-progress
status: active
updated: 2026-11-02
---

# Progress MNI OS Operational

Halaman ini menyimpan pekerjaan, temuan, bukti, dan hambatan. Checklist berikutnya berada di [[ROADMAP|roadmap]].

## Ringkasan area

| Area | Status | Bukti/catatan |
|---|---|---|
| Struktur repository dan vault Obsidian | Fondasi lokal tersusun | Dashboard, panduan, roadmap, progress, riset, template, dan indeks screenshot di root workspace. |
| Source aplikasi | Source-level | HTML/CSS/JS dipisah di `apps/gudang-logistik/`; HTML sumber dipertahankan di `reference/`. |
| Preview lokal | HTTP terverifikasi | `http://localhost:8002/` menyajikan halaman dan assets melalui `scripts/preview-server.mjs`; render pascaperbaikan belum diverifikasi runner. |
| Database lokal | Scaffold dibuat, stack belum hidup | Supabase CLI `2.122.0` tersedia via `npx`; config lokal dibuat. Docker Desktop engine tidak tersedia dari sesi ini sehingga Supabase local stack belum berjalan. |
| Hosted Supabase | Metadata diperiksa read-only | Kandidat `MNI - Operational`: 80 tabel public ber-RLS pada metadata, 19 migration records sampai `020_seed_demo_data`, 0 row pada ringkasan. Target checkout dan lineage belum dipastikan; advisor warnings dicatat di [[FOUNDATION_BASELINE|baseline]]. |
| Mapping data | Inventaris observasi/hypothesis | [[apps/gudang-logistik/docs/DATA_MAPPING|Catatan mapping lama]] bukan spesifikasi; schema baru akan diturunkan dari requirement custom yang divalidasi. |
| Pilot aplikasi | Belum dipilih | [[apps/gudang-logistik/docs/PILOT_BRIEF|Brief lama saldo bahan baku]] dipertahankan sebagai hipotesis, bukan komitmen pilot. |
| Tim agent dan skill | Fondasi lokal tersedia | [[TEAM_AND_SKILLS|Model tim]] mencatat spesialisasi, batas, dan alur koordinasi. |
| Browser screenshot/QA | Blocked | Surface browser lokal untuk runner dinonaktifkan; screenshot pascaperbaikan belum dibuat. |
| Kebutuhan tim Operasional | Arah disepakati; discovery belum dilakukan | MNI OS akan dibangun custom sesuai proses, kontrol, data, dan prioritas Operasional. Backlog/pilot lama masih hipotesis sampai divalidasi bersama pemilik proses. |
| Workbook sumber Operasional | Profil read-only selesai; rekonsiliasi owner terbuka | Enam workbook dicatat di [[DATA_SOURCE_CATALOG|katalog data]]. Salinan lokal privat diabaikan Git; file asli tidak diubah. |
| Audit workbook | Profil teknis dan perbandingan awal selesai | 8.234/6.013/6.085 formula; cached errors 13/17/6. Raw RM: 22 key bersama, dashboard saling sama, stok berbeda pada 11 key terhadap file raw, satu key raw-only. Dua baris SPK 438 cocok terbatas pada deskripsi/qty/satuan. Sumber resmi/as-of dan saldo belum tervalidasi. |
| Google Sheets / Composio | Menunggu OAuth/scope | Workflow Composio yang diperiksa belum memiliki koneksi aktif Drive/Sheets/GitHub. Enam file Excel lokal telah dibaca read-only; Google Sheets cloud belum diakses. |
| GitHub/Vercel | Ditahan hingga local-ready | Belum ada commit/push/deployment untuk pekerjaan ini. |

## Fakta runtime dan batas akses

- Preview UI lokal hanya menyajikan file; `window.claude` di source masih adapter prototype, bukan koneksi Supabase.
- Project hosted diperiksa melalui metadata/schema summary, migration ledger, dan advisor; tidak ada baris data operasional yang dibaca atau diubah.
- `supabase/config.toml` dibuat tanpa remote project link, migration, env keys, atau seed. Seed dinonaktifkan sampai schema lokal ditinjau.
- Upaya menyalakan Docker Desktop tidak menghasilkan Docker engine; service Windows `com.docker.service` tidak dapat dibuka oleh sesi ini.
- `supabase projects list` gagal karena CLI belum memiliki access token. Connector manajemen Supabase dapat membaca metadata secara read-only; ini tidak mengautentikasi CLI atau aplikasi.
- `list_branches` untuk project kandidat menghasilkan daftar kosong; belum ada development branch Supabase. Aplikasi dan preview tetap belum tersambung.
- Browser lokal tidak tersedia bagi runner. HTTP 200 pada file tidak membuktikan render, console bersih, Auth, RLS runtime, atau persistence.
- Lihat [[FOUNDATION_BASELINE|baseline fondasi]] untuk daftar bukti, gap, advisor, dan gate berikutnya.

## Log kerja

### 2026-11-02 — Workspace dan dashboard

- Selesai: susun vault Obsidian di root repository beserta panduan workspace, roadmap, progress, riset, template, dan aturan screenshot.
- Selesai: pertahankan branch awal dan gunakan `development` untuk pekerjaan lokal; belum ada deployment atau isolasi database berdasarkan branch.
- Selesai: tulis panduan aplikasi source-level, inventaris fitur, dan inventaris 20 collection dari kode.

### 2026-11-02 — Model tim dan skill

- Selesai: rangkum empat sumber agent/skill dan buat empat agent serta empat skill lokal yang sesuai dengan stack dan batas akses.
- Selesai: pertahankan agent ERP read-only yang sudah ada.
- QA browser belum dijalankan; file agent/skill mendefinisikan workflow, bukan bukti pengujian.

### 2026-11-02 — Preview lokal

- Selesai: buat `apps/gudang-logistik/scripts/preview-server.mjs` untuk menjalankan preview Node pada loopback `127.0.0.1:8002`.
- HTTP 200 diverifikasi untuk halaman, CSS, dan JS dengan Content-Type sesuai.
- Temuan dan perbaikan: server awal memetakan HTML subfolder tetapi tidak URL asset relatif `/assets/...`; server kini memakai folder aplikasi langsung sebagai root.
- Belum diverifikasi: render browser, console, responsive layout, navigasi aktual, dan screenshot setelah perbaikan.

### 2026-11-02 — Supabase, integrasi, dan pilot foundation

- Selesai: audit read-only menemukan project hosted `MNI - Operational` berstatus aktif, Postgres 17, 80 tabel public ber-RLS dan 19 migration records. Nama project belum membuktikan bahwa ia target checkout ini.
- Selesai: catat security advisor findings: 3 mutable search-path functions, 1 `SECURITY DEFINER` RPC yang dapat dipanggil anon, 7 yang dapat dipanggil authenticated, dan leaked-password protection nonaktif. Performance advisor: 94 FK tanpa covering index, 20 auth init-plan findings, dan 109 unused-index notices.
- Selesai: bandingkan migration sibling `organizations`/`organization_members` dengan hosted `tenants`/`tenant_memberships`; lineage berbeda, tidak ada file yang disalin atau diterapkan.
- Selesai: jalankan Supabase CLI `2.122.0` via `npx`, lalu `supabase init` pada folder aplikasi. Config lokal tidak di-link ke hosted project; migrations dan seed belum dibuat.
- Blocked: Docker engine/service gagal diakses dari sesi Windows ini; Supabase local stack belum bisa dijalankan.
- Blocked: daftar project melalui CLI memerlukan Supabase CLI access token yang belum dikonfigurasi. Tidak ada token yang diminta atau disimpan. Management connector hanya dipakai untuk inspeksi read-only; project kandidat belum memiliki development branch.
- Selesai sebagai draft: [[apps/gudang-logistik/docs/PILOT_BRIEF|brief pilot baca saldo]] dan [[apps/gudang-logistik/docs/DATA_MAPPING|mapping awal]]. Butuh validasi process owner.
- Selesai: tulis [[FOUNDATION_BASELINE|baseline fondasi]], rencana integrasi, dan update checklist. Tidak ada perubahan hosted DB, OAuth, GitHub, atau Vercel.

### 2026-11-02 — Percobaan koneksi Supabase langsung

- Hasil: koneksi aplikasi ke Supabase **belum terbentuk**. UI masih memakai adapter `window.claude`; config Supabase hanya scaffold lokal.
- CLI `projects list` terhenti karena access token CLI belum dikonfigurasi; Docker engine tidak tersedia untuk menjalankan database lokal.
- Connector manajemen menunjukkan project kandidat aktif melalui pemeriksaan metadata read-only, tetapi target untuk checkout ini belum dikonfirmasi dan project tidak memiliki development branch.
- Ledger diverifikasi ulang: 19 record (versi terakhir `20261019231625`, nama `020_seed_demo_data`). Koreksi angka lama 20 pada dokumentasi.
- Tidak ada perubahan database hosted, linking, OAuth, migrasi, data operasional, GitHub, atau deployment.

### 2026-11-02 — Perubahan arah produk

- Keputusan pengguna: MNI OS tidak mengacu pada Antlia sebagai blueprint; sistem dikembangkan custom untuk menyelaraskan kebutuhan tim Operasional.
- Roadmap discovery diubah agar dimulai dari proses aktual, wawancara/walkthrough, dokumen dan data sumber yang diizinkan, kontrol, pengecualian, serta validasi pemilik proses.
- Dibuat [[OPERATIONAL_DISCOVERY|register discovery Operasional]] beserta [[templates/PROCESS_DISCOVERY_TEMPLATE|template walkthrough]] dan [[templates/REQUIREMENT_TEMPLATE|template requirement]]; register sengaja kosong karena belum ada kebutuhan yang tervalidasi.
- Rekomendasi generik dari riset eksternal hanya menjadi pola pembanding. Requirement, arsitektur data, dan prioritas wajib ditelusuri ke kebutuhan MNI yang telah divalidasi.
- Brief pilot saldo gudang, inventaris source code, mapping schema hosted, dan hasil riset lama tetap disimpan untuk jejak audit; statusnya hipotesis/provisional sampai divalidasi.
- Supabase target/schema untuk produk custom belum dipilih. Jangan menganggap project hosted kandidat atau model tabelnya sebagai rancangan final.

### 2026-11-02 — Koreksi pesan preview lokal

- Screenshot pengguna menunjukkan UI masih meminta dibuka melalui `claude.ai` dan menampilkan klaim penyimpanan/sinkronisasi bersama, padahal backend belum dikonfigurasi.
- Diperbarui copy status/loading/footer agar menyatakan ini pratinjau lokal, backend belum dikonfigurasi, dan data tidak dimuat/disimpan/disinkronkan. Error aksi simpan/pembuatan pengguna juga tidak lagi menyuruh login ke Claude.
- Status teknis tetap sama: ini koreksi keterangan UI, bukan koneksi Supabase atau implementasi backend. Browser visual tidak dijalankan pada sesi ini.

### 2026-11-02 — Intake workbook Operasional

- Selesai: inventaris struktural read-only terhadap enam workbook PPIC bulanan, raw material, stok barang, dan SPK individual. Header, pola sheet, perbedaan posisi header, tab revisi, dan keberadaan formula dirangkum di [[DATA_SOURCE_CATALOG|katalog sumber data]].
- Selesai: buat salinan lokal di `data/private-sources/`; sumber asli tetap di lokasi semula. Folder kerja dikecualikan dari Git; dokumentasi tidak menyimpan baris atau jumlah transaksi.
- Temuan awal: dashboard PPIC memiliki banyak tab SPK per snapshot; raw material muncul di workbook tersendiri dan dashboard; stok barang jadi memisahkan master `Straight` dari transaksi September/Oktober; SPK 438 memakai variasi struktur kolom.
- SPK 438 juga terdeteksi di tiga dashboard bulanan. Ia dapat menjadi contoh rekonsiliasi lintas sumber setelah owner mengizinkan dan menjelaskan revisi/status yang resmi.
- Belum dilakukan: profiling kualitas nilai, validasi formula/cached values, penetapan as-of/source of truth, rekonsiliasi saldo, atau pemilihan pilot. Perlu konfirmasi owner dan definisi data dari tim.
- Koreksi status setelah audit lanjutan: profiling nilai dan formula/cache telah dilakukan dan dicatat di bawah. Yang masih terbuka adalah owner/as-of/sumber resmi, penyebab dan penanganan formula error, rekonsiliasi saldo, dan pemilihan pilot.

### 2026-11-02 — Audit kualitas dan contoh lintas sumber

- Selesai: audit formula/cache untuk enam workbook. Tiga dashboard PPIC memiliki 13, 17, dan 6 hasil formula error tersimpan. Error mencakup referensi rusak, custom function `hitungwarna`/`hitungwarnahijau` yang tidak didefinisikan di workbook, serta tiga `#VALUE!` pada dashboard Agustus.
- Selesai: raw material memiliki 23 baris ber-ITEM dengan kolom ukuran/buffer/stok/satuan terisi, tidak ada nilai negatif pada buffer/stok atau duplikat kandidat ITEM+UKURAN.
- Selesai: master `Straight` memiliki 60 baris kandidat; satu kombinasi atribut produk berulang pada baris sumber 14 dan 69. Belum diketahui apakah itu duplikasi bisnis karena SKU tidak tersedia.
- Selesai: profil 66 baris transaksi September dan 38 Oktober. Nilai masuk/keluar numerik dan tidak negatif; tanggal kosong selalu mengikuti tanggal sebelumnya, dan format tanggal campuran. Aturan carry-forward belum disahkan.
- Selesai: dua baris item SPK 438 cocok berdasarkan deskripsi, qty, dan satuan pada dokumen individual serta ketiga snapshot. Milestone/status tidak direkonsiliasi.
- Ditambahkan [[DATA_DICTIONARY|draft kamus data]]. Tidak ada workbook diubah; kesimpulan mengenai sumber resmi, arti status, saldo, tanggal, dan key tetap menunggu owner.

### 2026-11-02 — Perbandingan raw material lintas sumber

- Selesai: cocokkan kandidat key `ITEM + UKURAN` pada file raw Oktober dan tiga snapshot dashboard. Ada 22 key bersama; ketiga dashboard sama pada field yang dibandingkan.
- Pada 22 key bersama, buffer dan satuan sama terhadap file raw; stok berbeda pada 11 key dan satu tanggal berbeda. Satu key hanya ada di file raw. Nilai mentah tidak disalin ke vault.
- Dicatat isu `DQ-RM-001` beserta lima isu data/proses lain di [[DATA_SOURCE_CATALOG|register isu data]]. Perbedaan tidak diklasifikasikan sebagai error sampai owner menetapkan cut-off dan sumber resmi.
- Koreksi scope: pemeriksaan tetap read-only; tidak ada workbook yang diubah, nilai bisnis yang dipindahkan, atau sinkronisasi eksternal.

## Fokus tindak lanjut

1. Mulai discovery bersama tim Operasional: pilih proses untuk walkthrough dan identifikasi pemilik proses, artefak, serta batas akses.
2. Dokumentasikan current-state dan requirement; validasi prioritas/outcome bersama pemilik proses. Brief saldo gudang lama tetap hipotesis.
3. Siapkan Docker/Supabase local stack secara terpisah agar siap dipakai setelah kebutuhan data dan environment disepakati.
4. Turunkan schema/migration serta seed sintetis dari requirement custom yang diterima; implementasikan Auth/RLS sebelum vertical slice.
5. Jika perlu akses CLI, gunakan mekanisme login Supabase yang aman di mesin lokal; jangan menempelkan token ke chat, repo, atau `.env` browser.
6. Minta surface browser lokal yang didukung untuk verifikasi visual/QA dan screenshot.

## Tautan kerja

- [[ROADMAP|Roadmap dan checklist]]
- [[FOUNDATION_BASELINE|Baseline fondasi dan bukti]]
- [[IMPLEMENTATION_PLAN|Rencana local-first]]
- [[TEAM_AND_SKILLS|Tim Codex dan skill]]
- [[apps/gudang-logistik/docs/DEVELOPMENT|Panduan pengembangan]]
- [[apps/gudang-logistik/docs/PILOT_BRIEF|Brief pilot]]
- [[apps/gudang-logistik/docs/DATA_MAPPING|Mapping data]]
- [[OPERATIONAL_DISCOVERY|Discovery dan requirement Operasional]]
- [[screenshots/README|Indeks screenshot]]

### 2026-11-02 — Integrasi scaffold mni-app dan tiga versi

- Selesai: salin `mni-app` ke `apps/mni-app` (tanpa `node_modules`/`.env`); `npm ci` dan `vite build` berhasil.
- Selesai: [[ENVIRONMENTS|panduan tiga versi]] (Development, Main, Docs). Branch sudah ada di GitHub; deploy dan database terpisah belum dibuat.
- Temuan: dev server memuat halaman login, tetapi `app.js` error saat load (lihat [[ENVIRONMENTS]]). Screenshot: [[screenshots/README]].
- Hambatan: `mni-gudang.html` asli tidak ada; extract dicoba dari file reference.
- Berikutnya: selidiki error `addEventListener`, putuskan target Supabase dev/prod, buat project Vercel dan situs docs.
