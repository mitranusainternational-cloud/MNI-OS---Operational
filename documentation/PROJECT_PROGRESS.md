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

- Selesai: salin `mni-app` ke `apps/platform` (tanpa `node_modules`/`.env`); `npm ci` dan `vite build` berhasil.
- Selesai: [[ENVIRONMENTS|panduan tiga versi]] (Development, Main, Docs). Branch sudah ada di GitHub; deploy dan database terpisah belum dibuat.
- Temuan: dev server memuat halaman login, tetapi `app.js` error saat load (lihat [[ENVIRONMENTS]]). Screenshot: [[screenshots/README]].
- Hambatan: `mni-gudang.html` asli tidak ada; extract dicoba dari file reference.
- Berikutnya: selidiki error `addEventListener`, putuskan target Supabase dev/prod, buat project Vercel dan situs docs.

### 2026-11-02 — Perbaikan bootstrap mni-app

- Selesai: `apps/platform/index.html` kini memuat `app.css`, menyisipkan `app-body.html`, lalu memuat `app.js`. Error `addEventListener` hilang.
- Bukti: browser (Playwright) di `127.0.0.1:5175`; screenshot [[screenshots/README]]. Sisa error console hanyalah akses ke Supabase dummy.
- Belum diverifikasi: login OTP, data nyata, RLS, tampilan setelah login. `public/app.*` dihasilkan `npm run extract` dan di-ignore Git.

### 2026-11-02 — Sistem tracking dan rencana go-live

- Selesai: 47 catatan tugas di `tasks/` (T-001 sampai T-074; 5 selesai), `scripts/progress-report.mjs`, [[PROGRESS_SNAPSHOT]], [[PROGRESS_DASHBOARD]] dengan Bases `documentation/dashboards/Tugas.base`, [[templates/TASK_TEMPLATE]], dan [[GO_LIVE_PLAN]].
- Hasil: jalur kritis sisa menuju go-live sekitar 26,5 hari kerja; jalur proses/data menentukan kecepatan.
- Bukti: skrip snapshot berjalan tanpa masalah data (source-level).
- Belum diverifikasi: tampilan Bases di Obsidian (butuh versi 1.9+ dengan core plugin Bases); estimasi effort belum divalidasi.
- Berikutnya: mulai T-010, T-030, T-032, T-040 yang sudah siap dikerjakan.

### 2026-11-02 — T-014 sumber UI mni-app

- Selesai: sumber kebenaran UI = `apps/gudang-logistik/` (reference hanya memakai 15 dari 20 koleksi). `extract-app.js` memakai sumber itu secara default dan reproducible dari klon bersih.
- Bukti: extract + `vite build` + muat di browser tanpa error console (verified in browser, UI saja). Keputusan: [[documentation/DECISIONS]].
- Dampak: T-021 kini menguji sumber yang benar-benar memakai 20 koleksi. Berikutnya: T-010 (Docker).

### 2026-11-02 — Terhubung ke GitHub

- Selesai: `gh` login sebagai `mitranusainternational-cloud` (push: true). Remote `origin` dipasang di `mni-os`; `development` dan `docs` di-push (fast-forward, `be457dc` ke `dfbc7a3`). Terverifikasi lewat GitHub API.
- Sisa T-041: default branch `main` dan branch protection. `main` belum berisi pekerjaan baru; promosi lewat [[RELEASE_CHECKLIST]].
- Catatan: push memakai `-c credential.helper="!gh auth git-credential"` karena Git Credential Manager menyimpan akun lama.

### 2026-11-02 — Roadmap produk dan perapian vault

- Selesai: [[roadmap/PRODUCT_ROADMAP]] (rilis v0.9, v1.0, v1.1, v1.2, v2.0), 14 epic di `roadmap/epics/`, 20 tugas pasca go-live (T-101 sampai T-152), properti `epic` dan `release` pada semua 67 tugas, tampilan Bases `Epic.base`, dan skrip snapshot yang menghitung progress per rilis dan epic.
- Selesai: `scripts/check-vault.mjs` dan [[VAULT_HEALTH]]; perbaiki 21 link rusak, 9 link ambigu, dan 9 catatan tanpa properti. Hasil akhir: 0 rusak, 0 ambigu, 0 properti hilang, 0 yatim (source-level).
- Selesai: Home ditulis ulang sebagai hub (status, "Saya ingin…", peta vault, ritme kerja); WORKSPACE_GUIDE dan indeks dokumentasi diperbarui.
- Belum diverifikasi: tampilan Bases dan embed `![[...#heading]]` di aplikasi Obsidian. Rilis v1.1 sampai v2.0 berisi hipotesis dan perlu ditinjau ulang di gerbang G5 setelah hypercare.

### 2026-11-02 — Proteksi branch main (T-041)

- Selesai: proteksi `main` di GitHub: PR wajib dengan 1 approval, dismiss stale review, percakapan harus selesai, force-push dan delete dilarang; `enforce_admins` mati. Terverifikasi lewat GitHub API.
- Dampak: `main` hanya berubah lewat PR dari `development` sesuai [[RELEASE_CHECKLIST]]. Required status check ditambahkan setelah CI ada (T-046). Karena pemilik repo juga satu-satunya pengembang, approval perlu akun kedua atau bypass admin; putuskan saat PR pertama.

### 2026-11-02 — Pratinjau lokal dan login (T-016)

- Selesai: mode mock lokal (`src/lib/local-supabase.js`, `VITE_LOCAL_MOCK=1`) dengan 5 akun dan data sintetis; adapter dimuat dinamis, bootstrap menunggu `window.claude`. Panduan: [[LOCAL_PREVIEW]].
- Bukti: verified in browser, login admin lalu dashboard dengan data contoh, 0 error console; screenshot di [[screenshots/README]].
- Temuan: Docker tidak bisa start karena virtualisasi CPU nonaktif di BIOS (T-010). Auth, RLS, dan Supabase sungguhan belum teruji.

### 2026-11-02 — Pratinjau lokal dan login (T-016)

- Selesai: mode mock lokal (`src/lib/local-supabase.js`, `VITE_LOCAL_MOCK=1`) dengan 5 akun dan data sintetis; adapter dimuat dinamis, bootstrap menunggu `window.claude`. Panduan: [[LOCAL_PREVIEW]].
- Bukti: verified in browser, login admin lalu dashboard dengan data contoh, 0 error console; screenshot di [[screenshots/README]].
- Temuan: Docker tidak bisa start karena virtualisasi CPU nonaktif di BIOS (T-010). Auth, RLS, dan Supabase sungguhan belum teruji.

### 2026-11-02 — Panduan virtualisasi/Docker dan sinkronisasi vault

- Selesai: [[DOCKER_SETUP]] (diagnosis mesin Lenovo 20R6, langkah BIOS, fitur Windows/WSL, Docker Desktop, `supabase start`). T-010 diubah ke `blocked` dengan pemilik tindakan (pemilik mesin) dan penyebab.
- Selesai: `scripts/sync-vault.mjs` menggabungkan snapshot dan cek kesehatan; aturan di `AGENTS.md`, Home, dashboard, dan WORKSPACE_GUIDE kini memakainya. ROADMAP, PRODUCT_ROADMAP, dan GO_LIVE_PLAN memuat blocker yang sama.
- Bukti: `node scripts/sync-vault.mjs` berakhir OK (69 tugas, 9 selesai, 0 link rusak). Diagnosis hardware: `VirtualizationFirmwareEnabled=False`.
- Berikutnya: setelah BIOS, fitur Windows, dan Docker beres, kerjakan T-011, T-012, T-013, lalu T-020.

### 2026-11-02 — Uji modul dan fitur (mock), 5 bug diperbaiki

- Selesai: uji asap 10 modul (10/10 PASS) dan 14 fitur inti (CRUD bahan baku/barang jadi/SPK/vendor/surat jalan/bongkar muat/master, validasi stok, ekspor CSV 9 modul). Matriks, bug, dan bukti: [[TEST_MATRIX]]. Tugas: T-018, T-019 selesai; T-026 (fitur belum tercakup) dijadwalkan.
- Bug diperbaiki: `USER.profiles` hilang, identitas pengguna tidak muncul setelah login, seed tidak sesuai bentuk data app, ekspor CSV/XLSX/PDF gagal karena `DLS.save` belum ada. B-001, B-002, dan B-005 berada di kode produksi.
- Bukti: verified in browser (mock, data sintetis), 0 pageerror. Skrip: `apps/platform/tests/e2e/modules.mjs`, `flows.mjs` (flows belum dijalankan sebagai berkas mandiri).
- Belum: Supabase nyata, login OTP nyata, RLS, realtime, XLSX/PDF, opname, edit/hapus. Menunggu Docker (T-010) dan T-026.

### 2026-11-02 — T-026 selesai: 30 fitur diuji, 4 bug tambahan

- Selesai: uji lanjutan UI mock (kartu stok, opname barang jadi, ubah item, master ubah/hapus, update produksi, revisi dan duplikat SPK, terima kembali dari vendor dengan reject, status surat jalan, siklus bongkar muat, ekspor Excel dan PDF, pencarian/filter, tema gelap, Back, mobile). Matriks: [[TEST_MATRIX]].
- Bug diperbaiki: B-006 tombol "set semua selesai"; B-007 id dokumen non-UUID; B-008 `spk.no` teks vs angka (edit SPK membuat baris ganda); B-009 dokumen `master/*` memakai kolom key. B-007 sampai B-009 adalah ketidakcocokan app dengan schema Postgres yang disembunyikan oleh mock; mock kini meniru batasan UUID.
- Bukti: verified in browser (mock, data sintetis), 0 pageerror. XLSX dan PDF diperiksa sebagai berkas valid.
- Risiko: perbaikan adapter belum teruji pada Postgres nyata, dijadwalkan T-028 (P0). Sisa fitur di T-027.

### 2026-11-02 — Agenda discovery disiapkan

- Selesai: [[DISCOVERY_AGENDA]] berisi tujuan, peran peserta, aturan sesi, 5 sesi (sekitar 5,5 jam) dengan rincian menit, pertanyaan kunci per topik yang ditautkan ke isu data DQ-*, tabel keputusan D-01 sampai D-10, dan langkah 24 jam setelah sesi. Catatan di T-030, T-031, T-032, dan T-036 menautkannya.
- Belum: tanggal, peserta, dan undangan (pemilik proyek). Sesi belum berlangsung; status tugas tetap todo.

### 2026-11-02 — Regresi penuh 33/33 dan peta koneksi berikutnya

- Selesai: regresi penuh pada pratinjau mock (login, 10 modul, 22 alur inti): 33 PASS, 0 FAIL, 0 pageerror. Regresi menemukan B-010 (lembar SPK kosong yang memblokir layar setelah menerbitkan SPK, akibat pemetaan id B-007); diperbaiki dengan alias id dan penjaga `openSheet`.
- Selesai: inventaris akun cloud hanya-baca: 3 project Supabase (dua aktif berskema ERP berbeda), Vercel team NIJ tanpa project. Opsi koneksi A/B/C tercatat di [[documentation/ENVIRONMENTS]].
- Berikutnya: keputusan pemilik akun atas opsi A (project Supabase baru) atau B (Docker lokal); lalu T-042, T-011, T-020, T-028, T-044.

### 2026-11-02 — Supabase dev dibuat dan schema diselaraskan (T-042 selesai)

- Selesai: project `MNI Gudang - Dev` (ref `inldyqigewmziwazalun`); `MNI OS - Operational` (kosong) dijeda atas persetujuan pemilik karena batas 2 project gratis. Tiga migration terpasang (20 tabel, 39 policy, realtime 17 tabel). Advisor keamanan: hanya peringatan (dicatat di T-060).
- Temuan penting: schema migration awal tidak cocok dengan bentuk dokumen app; ditambahkan model "kolom inti + JSONB `data`" (migration 3, adapter, [[documentation/DECISIONS]]). Mock diperketat meniru PostgREST/Postgres; regresi 33/33 PASS.
- Bukti: Postgres nyata menolak id non-UUID; sisipan SPK dengan JSONB berhasil. Belum: login OTP nyata dan uji app terhadap Supabase dev (T-029).
- Risiko: baris uji SPK `9999` tertinggal karena perintah hapus ditolak; harus dibersihkan sebelum SPK dibuat. Temuan RLS vs alur app dicatat di T-022.
- Berikutnya: email admin awal dari pemilik (T-029), lalu T-021, T-022, T-028, dan Vercel (T-044).

### 2026-11-02 — Admin awal dibuat; uji tingkat database di Supabase dev

- Selesai: admin awal `mitranusainternational@gmail.com` (muser admin + pengguna auth). Server dev ke Supabase berjalan di `http://127.0.0.1:5174/` (`npx vite --mode supabase-dev`). Halaman termuat tanpa respons 4xx setelah perbaikan B-011 (`master`/`log` tidak punya `created_at`).
- Bukti (database nyata, semua di-rollback): 12/12 penulisan bentuk dokumen app berhasil sebagai admin; pengguna tak terdaftar ditolak; matriks hak tulis per role terhitung ([[TEST_MATRIX]]). Pembacaan anonim ke tabel SPK = 0 baris.
- Belum: login OTP oleh pemilik (kode di email), hapus baris uji `9999`, dan uji alur lewat aplikasi pada Supabase (T-029, T-021, T-028).
- Temuan: matriks RLS belum selaras dengan alur app (produksi tidak dapat mencatat mutasi/surat jalan/bongkar; gudang dan produksi tidak dapat menulis kunci di `master`; viewer dapat menulis `log`) — bahan T-022 dan T-036.

### 2026-11-02 — Diagnosis login pertama di Supabase dev

- Temuan dari log Auth/REST: email yang diterima berisi tautan konfirmasi ke `localhost:3000` (bukan kode); permintaan kode ulang kena HTTP 429 (batas email); verifikasi kode 403; `last_sign_in_at` masih kosong dan baris uji `9999` belum terhapus. Seluruh pembacaan REST membalas 200.
- Perbaikan: B-012 (UI tidak lagi mengaku mengirim kode ketika ditolak) dan opsi "Masuk dengan password" untuk Supabase sebagai cadangan; panduan konfigurasi Auth di [[documentation/ENVIRONMENTS]].
- Berikutnya: pemilik mengatur password sendiri dan menghapus baris 9999 lewat SQL Editor, lalu uji alur lewat aplikasi (T-029, T-021, T-028).

### 2026-11-02 — Jalur integrasi, agen, dan skill proyek

- Selesai: [[INTEGRATION_PATH]] (tahap S0 sampai S6 dengan gerbang, aliran data, matriks environment, kriteria VPS), 7 skill dan 6 agen di `.claude/`, `CLAUDE.md`, regresi E2E tersimpan di `apps/platform/tests/e2e/`, epic E-15 (VPS) dan tugas T-075, T-076, T-077, T-160, T-161.
- Rekomendasi: urutan lokal → Supabase dev → GitHub CI → Vercel preview → UAT → production dipakai; CI dipasang sebelum Vercel; VPS menjadi opsi S6 dengan kriteria terukur (mulai dari layanan pendamping), bukan langkah otomatis.
- Bukti: source-level; agen dan skill belum dipanggil satu per satu. Regresi mock 33/33 (sebelumnya) tetap rujukan.
- Berikutnya: login nyata dan uji Supabase (T-029), lalu CI (T-046, T-077) dan Vercel preview (T-044).

### 2026-11-02 — Admin siap login (password sementara) dan baris uji dinetralkan

- Selesai (atas arahan pemilik): password sementara acak untuk `mitranusainternational@gmail.com` diatur dan email dikonfirmasi lewat SQL pada project dev; bcrypt dan identitas email diverifikasi. Password tidak disimpan di vault/Git dan harus diganti pemilik setelah login pertama.
- Baris uji SPK `9999` dinetralkan menjadi `UJI-9999` berstatus `Batal` karena perintah hapus ditolak oleh persetujuan SQL (tiga kali); penomoran SPK pertama akan 1. Hapus permanen oleh pemilik bila diinginkan.
- Belum: login pertama dan uji alur lewat aplikasi (T-029 → T-021, T-028, T-022). Agen tidak masuk sendiri dengan kredensial ini karena kredensial akan dikirim ke layanan cloud di luar pratinjau lokal.

### 2026-11-02 — Login nyata ke Supabase dev berhasil (T-029 selesai)

- Selesai: login password admin berhasil (15:38 UTC). Log API: token 200, `muser` per email 200, lalu 19 koleksi dimuat dengan semua respons 200 dan realtime tersambung (dua kali karena halaman dimuat ulang setelah login, sesuai B-002). RLS memberi admin akses baca.
- Bukti: verified in database + log (bukan hanya source-level). Belum ada penulisan lewat aplikasi.
- Berikutnya: pemilik menjalankan skenario U-01 sampai U-12 ([[UJI_SUPABASE_DEV]]); agen memverifikasi di database dan log, memperbaiki yang gagal, lalu T-021, T-028, T-022 diperbarui.

### 2026-11-02 — Uji tulis nyata di Supabase dev dan B-013

- Selesai: pemilik menjalankan alur di aplikasi yang tersambung ke Supabase dev. Log API dan isi tabel menunjukkan penulisan berhasil untuk rm, fg, mutasi (opname), spk (id UUID, no "1"), mcustomer, mwc, marmada, mvendor, vendor, kirim, bongkar, dan master (katalog, counter, lock). Ringkasan di [[TEST_MATRIX]].
- Temuan: B-013 — 16 dari sekitar 24 penulisan `log` ditolak karena string kosong pada kolom timestamp; kelas masalah yang sama mengancam `spk.due` kosong dan kolom numerik. Diperbaiki di adapter (`STRICT_COLS`), mock diperketat, regresi mock **36/36**; perlu uji ulang di Supabase. Noise 406 dari `.single()` diganti `maybeSingle()`.
- Catatan desain: `mutasi.item_id` NULL (item di `data`), kunci lock bertumpuk dan tidak dilepas; dicatat untuk normalisasi data setelah discovery (T-033).
- Berikutnya: pemilik memuat ulang aplikasi dan mengulang U-02, U-03, U-06 ([[UJI_SUPABASE_DEV]]); agen memverifikasi dan menutup T-021 dan T-028.

### 2026-11-02 — B-013 terverifikasi; terima/pakai material dan revisi SPK lulus di Supabase

- Selesai: ulangan pemilik di aplikasi (16:03–16:13 UTC). Semua `POST log` 201 (34 log, 0 `tgl` NULL), tanpa 400/406 dan tanpa galat Postgres; terima material (+7, `RCV/2026/11/001`), pakai produksi (-3, -1, `PK/2026/11/001`), revisi SPK (`rev = 1`, satu baris, alasan tersimpan), supplier dan counter otomatis tersimpan.
- Bukti: verified in database + log. T-021 dan T-028 berstatus `review` (sisa: duplikat SPK, pengaturan RM, delete, realtime, role selain admin).
- Berikutnya (tahap S2): CI GitHub (build + regresi, T-046, T-077), RLS per role vs alur (T-022, T-036), lalu Vercel preview (T-044). Jalur: [[INTEGRATION_PATH]].

### 2026-11-02 — Uji role pada RLS nyata dan model role selaras aplikasi

- Temuan: aplikasi sudah memuat model role sendiri (admin, ppic, gbb, gbj, logistik, viewer; hak per modul) yang tidak dipakai policy database. Uji alur × role pada RLS nyata (di-rollback) menunjukkan alur lintas peran gagal untuk role selain admin.
- Selesai: migration 4 (`role_modules`, `can_mod`/`can_any`/`is_admin`, policy `_v2` untuk semua tabel) terpasang. Matriks 16 baris × 6 role sesuai model aplikasi ([[TEST_MATRIX]]). Keputusan di [[documentation/DECISIONS]]. Peta role sementara sampai disahkan tim (T-036).
- Hambatan: migration 5 (DROP policy lama) ditolak oleh persetujuan SQL; viewer masih dapat menulis log sampai itu dijalankan (T-078, blocked, pemilik).
- Berikutnya: T-078 (pemilik), T-079 (akun uji per role), lalu CI GitHub (T-046, T-077).

### 2026-11-02 — Penyimpangan role ditutup dan role ditegakkan di UI

- Selesai (database): migration 6 `role_model_supersede` terpasang (ALTER POLICY, tanpa DROP). Uji rollback: viewer dan role lama tidak dapat menulis log atau tabel lain; ppic, gbb, gbj, logistik hanya menulis modulnya. Bukti: verified in database.
- Selesai (UI): peran dari backend dipakai `guard()` tanpa `ROLE_ON`; adapter hanya menganggap admin, ppic, gbb, gbj, logistik sebagai penulis; akun mock memakai role aplikasi (seed v6). Uji `roles.mjs`: 12 PASS di mock.
- Sisa: uji role lewat aplikasi di Supabase dengan akun per role (T-079, butuh akun dari pemilik); regresi penuh 36 diulang saat runner terpasang (T-077); pengesahan peta role oleh tim (T-036).
- Berikutnya: CI GitHub (T-046, T-077), lalu Vercel preview (T-044).

### 2026-11-03 — Uji final di mock dengan Playwright (runner terpasang)

- `playwright` terpasang sebagai devDependency di `apps/platform` (cara pasang diperiksa di dokumentasi resmi lewat Context7: `npm i playwright`, `npx playwright install chromium`, tambahkan `--with-deps` di CI Linux). `tests/e2e/run.mjs` kini menjalankan regresi dan uji role.
- Hasil, dua kali berturut-turut: regresi 36 PASS, 0 FAIL; role 12 PASS, 0 FAIL. Satu kegagalan sementara pada R-05 (jeda tulis) diperbaiki dengan menambah waktu tunggu di `roles.mjs`; tiga ulangan lain bersih.
- Belum: uji aplikasi di Supabase dengan akun per role (T-079, butuh akun dari pemilik) dan workflow CI (T-046).

### 2026-11-03 — Vault `mni-os` didaftarkan di Obsidian dan dirapikan

- Vault terdaftar dan terbuka. `.obsidian`: plugin inti (Bases, Properties, Templates, Bookmarks, Graph), folder template `documentation/templates`, lampiran ke `documentation/screenshots`, bookmark ke Home, Progress, Tugas, Epic, Roadmap, Log progres, Matriks uji, Keputusan, Kesehatan vault, graph berwarna per folder.
- `Home.md` diperbarui sesuai kondisi nyata (Supabase dev, RLS per role, uji Playwright, langkah berikutnya CI).

### 2026-11-03 — Rapikan struktur project

- `apps/mni-app` menjadi `apps/platform`; 55 rujukan di 30 berkas diperbarui; peta folder induk ditulis ulang. Folder lama dipindah ke `_Arsip/`.
- Uji dari lokasi baru: sync vault OK (0 tautan rusak), regresi 36 PASS, role 12 PASS, server Supabase dev 200.

### 2026-11-03 — Uji aplikasi di Supabase dev dari lokal; dua bug nyata ditemukan dan diperbaiki

- Uji lewat Playwright (sesi pemilik) di aplikasi lokal terhubung Supabase dev: alur admin lulus; role gbb, gbj, ppic, viewer diuji lewat aplikasi dengan mengganti role akun pemilik sementara dan memulihkannya ke admin (diverifikasi).
- Bug: B-014 (UI tidak memuat data baru setelah tulis) dan B-015 (nomor dokumen berulang karena counter dibaca salah). Keduanya diperbaiki di adapter; regresi 37 PASS dan role 12 PASS di mock.
- Sisa sebelum naik ke GitHub/Vercel: commit perbaikan, ubah dan hapus master, opname bahan baku (tombol tidak ada), Realtime antar sesi, `mutasi.item_id` kosong (keputusan model data).

### 2026-11-03 — Sisa temuan Supabase diselesaikan

- Diuji di Supabase dev: opname bahan baku (tab), ubah dan hapus master, master terpakai hanya nonaktif. Semua PASS.
- Diperbaiki: B-016 (kolom relasi terisi, migration 8 backfill), UI viewer (tombol catat tersembunyi, banner jelas, teks kaki sesuai koneksi). B-017: Realtime tidak mengirim event; polling 15 detik sebagai cadangan (terverifikasi ±14 detik); penyebab di T-162.
- Regresi 38 PASS, role 12 PASS di mock.

### 2026-11-03 — CI GitHub Actions berjalan (tahap S2)

- Workflow `.github/workflows/ci.yml`: job Vault dan job Aplikasi (build, regresi mock 38, uji role 12). Dicoba dulu di clone bersih lokal, lalu di GitHub: run pertama merah karena uji role, penyebabnya bug aplikasi nyata B-018 (login sangat cepat sebelum pendengar auth terpasang tidak memuat ulang halaman sehingga identitas "Tamu"). Diperbaiki di `index.html`; run berikutnya hijau (41558796125).
- Sisa S2: jadikan dua job itu required check pada `main` (pengaturan repo, butuh persetujuan pemilik). Berikutnya S3: Vercel preview (akun, butuh persetujuan).
