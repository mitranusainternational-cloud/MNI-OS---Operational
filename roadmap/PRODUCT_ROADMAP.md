---
type: product-roadmap
status: proposed
updated: 2026-11-02
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# Roadmap produk MNI Gudang & Logistik

Roadmap ini mengurutkan **hasil** (bukan tanggal) dari kondisi sekarang sampai sistem dipakai dan berkembang. Status hidup dihitung otomatis dari catatan tugas: lihat [[PROGRESS_SNAPSHOT]] dan [[PROGRESS_DASHBOARD]]. Rencana operasional menuju rilis pertama: [[GO_LIVE_PLAN]]. Daftar periksa Now/Next/Later yang lebih rinci: [[ROADMAP]].

## 1. Posisi sekarang (fakta, 2026-11-02)

| Aspek          | Kondisi                                                                                                                                                                    | Bukti                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Kode aplikasi  | Prototipe vanilla JS (sekitar 3.500 baris `app.js`) memakai 20 koleksi; scaffold `apps/platform` (Vite + Supabase + Vercel) memuatnya dan build lolos                      | [[documentation/ENVIRONMENTS]], [[documentation/DECISIONS]] |
| Browser        | Halaman login dan shell aplikasi termuat tanpa error JS dengan environment dummy                                                                                           | [[documentation/screenshots/README]]                        |
| Database       | Schema 20 tabel + RLS per role ada sebagai migration; belum pernah dijalankan; Docker belum bisa start (virtualisasi BIOS nonaktif); pratinjau lokal berjalan di mode mock | [[documentation/FOUNDATION_BASELINE]]                       |
| Data           | Enam workbook operasional dibaca read-only; saldo antar file belum direkonsiliasi                                                                                          | [[documentation/DATA_SOURCE_CATALOG]]                       |
| Kebutuhan      | Discovery bersama tim Operasional belum dilakukan; pilot belum dipilih                                                                                                     | [[documentation/OPERATIONAL_DISCOVERY]]                     |
| Repo dan versi | 4 branch di GitHub, `development` dan `docs` terkini; `main` belum berisi pekerjaan baru                                                                                   | [[documentation/VERSION_STRATEGY]]                          |
| Cloud          | Belum ada Supabase dev/prod, Vercel, CI, atau pengguna                                                                                                                     | [[documentation/PROJECT_PROGRESS]]                          |

Terverifikasi di mode mock (bukan Supabase): 10 modul UI dan 30 fitur ([[documentation/TEST_MATRIX]]). Belum diverifikasi: login OTP nyata, baca/tulis database, realtime, dan RLS.

> [!info] Jalur integrasi
> Tahap S0 sampai S6 (lokal → Supabase dev → GitHub CI → Vercel preview → UAT → production → VPS opsional), gerbang tiap tahap, dan kriteria VPS ada di [[documentation/INTEGRATION_PATH]]. Agen dan skill proyek: [[documentation/TEAM_AND_SKILLS]].

## 2. Prinsip

1. **Kebutuhan Operasional di atas fitur.** Sistem ini custom; fitur dan schema diturunkan dari proses aktual tim, bukan dari ERP lain.
2. **Pilot kecil dulu.** Satu alur diselesaikan penuh sebelum yang lain.
3. **Bukti sebelum klaim.** `done` hanya dengan bukti; bedakan source-level, verified in browser, dan verified in database.
4. **Data nyata hanya setelah UAT.** Development memakai data sintetis atau impor terkontrol; production tidak disentuh sebelum sign-off.
5. **Satu sumber status.** Catatan tugas di `tasks/`; epic dan rilis dihitung darinya.
6. **Rilis kecil dan dapat dibalik.** Setiap rilis punya rencana rollback.

## 3. Kereta rilis

```text
v0.9 Fondasi ──► v1.0 Pilot go-live ──► v1.1 Stabilisasi ──► v1.2 Integrasi & pelaporan ──► v2.0 Modernisasi & perluasan
 (sedang jalan)   (hasil utama)          (akses, kualitas)     (otomasi, nilai manajemen)     (teknik, hipotesis kebutuhan)
```

### v0.9 Fondasi (sedang berjalan)
**Tujuan:** pengembang dapat menjalankan, menguji, dan melacak pekerjaan dengan andal.
**Epic:** [[roadmap/epics/E-01-fondasi-workspace-dan-repo|E-01]] workspace dan repo, [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]] aplikasi berjalan lokal.
**Keluar bila:** Supabase lokal hidup dengan 20 tabel, mni-app tersambung dan dapat login dengan user seed, `main` terproteksi.
**Blocker:** virtualisasi BIOS untuk Docker (T-010, panduan [[documentation/DOCKER_SETUP]]). Proteksi `main` (T-041) sudah selesai. Pratinjau lokal mock tersedia ([[documentation/LOCAL_PREVIEW]]).

### v1.0 Pilot go-live (rilis utama)
**Tujuan:** satu alur Operasional dipakai nyata oleh user awal di production.
**Epic:** [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]] kualitas dan keamanan, [[roadmap/epics/E-04-proses-data-dan-pilot|E-04]] proses/data/pilot, [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]] cloud dan CI/CD, [[roadmap/epics/E-06-uat-hardening-dan-go-live|E-06]] UAT dan go-live, [[roadmap/epics/E-07-dokumentasi-dan-situs-docs|E-07]] dokumentasi, [[roadmap/epics/E-08-operasi-dan-dukungan|E-08]] operasi.
**Keluar bila:** enam syarat "siap dipakai" di [[GO_LIVE_PLAN]] terpenuhi dan hypercare lima hari tanpa isu kritis.
**Jalur kritis:** wawancara process owner → pemetaan data → impor → rekonsiliasi → UAT → sign-off → go-live (sekitar 26,5 hari kerja effort).
**Tidak termasuk:** integrasi otomatis workbook, notifikasi, dashboard manajemen, refactor besar.

### v1.1 Stabilisasi, akses, dan kualitas data
**Tujuan:** sistem tepercaya dalam pemakaian harian.
**Epic:** [[roadmap/epics/E-09-akses-peran-dan-audit|E-09]] akses, peran, audit; [[roadmap/epics/E-10-kualitas-data-dan-kontrol-stok|E-10]] kualitas data dan kontrol stok.
**Hasil:** role ditegakkan di UI dan database (prototipe memakai `ROLE_ON=false`), jejak audit, manajemen user dari UI, aturan Cek Data disepakati, opname terjadwal, buffer dan usulan pembelian divalidasi.
**Masuk bila:** hypercare selesai; backlog hypercare dan UAT ditriase.

### v1.2 Integrasi dan pelaporan
**Tujuan:** kurangi kerja manual dan beri nilai bagi manajemen.
**Epic:** [[roadmap/epics/E-11-integrasi-sumber-data|E-11]] integrasi sumber data, [[roadmap/epics/E-12-pelaporan-notifikasi-dan-dokumen|E-12]] pelaporan, notifikasi, dokumen.
**Hasil (hipotesis):** impor terjadwal dari sumber resmi, satu sumber master data, dashboard kinerja, notifikasi SPK jatuh tempo dan stok di bawah buffer, dokumen cetak terstandar.
**Syarat masuk:** discovery integrasi (T-121) membuktikan kebutuhan, owner, dan scope; kanal notifikasi dipilih tim.

### v2.0 Modernisasi dan perluasan
**Tujuan:** biaya perubahan turun dan jangkauan naik.
**Epic:** [[roadmap/epics/E-13-modernisasi-frontend-dan-pengujian|E-13]] frontend dan pengujian, [[roadmap/epics/E-14-multi-site-dan-mobile|E-14]] multi-site dan mobile, [[roadmap/epics/E-15-self-host-vps-dan-layanan-pendamping|E-15]] self-host VPS dan layanan pendamping (hipotesis).
**Hasil (hipotesis):** modul ES, uji unit untuk kalkulasi, aset lokal tanpa CDN, CSP ketat; PWA/offline dan multi-gudang hanya bila kebutuhan terbukti.
**Syarat masuk:** keputusan T-144 (tetap vanilla JS atau migrasi) dan bukti kebutuhan T-151.

## 4. Sekarang, berikutnya, nanti

| Kolom | Isi | Pemicu pindah |
|---|---|---|
| **Sekarang** | E-01, E-02; mulai paralel T-030/T-032 (proses dan data), T-040 selesai, T-041 sisa proteksi `main` | Docker aktif membuka E-02 dan E-03 |
| **Berikutnya** | E-03, E-04, E-05 | Seed dan lokal siap; pilot dipilih |
| **Lalu** | E-06, E-07, E-08 | UAT disetujui |
| **Kemudian** | E-09 sampai E-12 | Go-live dan hypercare |
| **Hipotesis** | E-13, E-14 | Keputusan dan bukti kebutuhan |

## 5. Gerbang keputusan

| Gerbang | Pertanyaan | Pemilik | Tugas | Dicatat di |
|---|---|---|---|---|
| G1 Basis aplikasi | Apakah `apps/platform` jalur produksi? | Pemilik proyek | T-031, T-033 | [[documentation/DECISIONS]] |
| G2 Pilot | Alur mana, kriteria terima apa? | Process owner | T-031 | [[documentation/OPERATIONAL_DISCOVERY]] |
| G3 Data | Sumber resmi, cut-off, siapa pemiliknya? | Owner data | T-032, T-035 | [[documentation/DATA_SOURCE_CATALOG]] |
| G4 Rilis | Siap ke production? | Pemilik proyek | T-064 | [[documentation/RELEASE_CHECKLIST]] |
| G5 Pasca go-live | Isi v1.1 sesuai temuan? | Tim | setelah T-065 | tinjau ulang roadmap ini |
| G6 Teknik | Vanilla atau framework? | Tim teknis | T-144 | [[documentation/DECISIONS]] |

## 6. Asumsi dan hipotesis (belum terbukti)

- Schema `mni-app` cukup untuk pilot (diturunkan dari kode prototipe, belum dari proses nyata).
- Vercel cocok sebagai hosting; alternatif VPS Docker tersedia di `apps/platform`.
- Integrasi workbook perlu otomatis (E-11) dan lewat Composio (T-121); bisa berubah.
- Multi-site dan offline (E-14) dibutuhkan; belum ada bukti.
- Estimasi effort indikatif; belum ada kecepatan historis.

## 7. Ukuran keberhasilan (target usulan; tetapkan baseline lebih dulu)

| Rilis | Ukuran teknis yang dapat diverifikasi | Ukuran bisnis (butuh baseline dari tim) |
|---|---|---|
| v0.9 | Seluruh migration terpasang, 0 error JS saat load, login seed berhasil | n/a |
| v1.0 | Matriks RLS 5 role lulus, smoke test hijau di CI, restore backup berhasil, saldo impor terekonsiliasi | Alur pilot dipakai harian oleh user awal; target dan metrik ditetapkan di T-031 |
| v1.1 | 100% mutasi stok dan perubahan SPK punya jejak audit; aturan Cek Data berjalan | Selisih opname dan isu data menurun terhadap baseline v1.0 |
| v1.2 | Impor terjadwal tanpa campur tangan manual; notifikasi terkirim | Waktu rekap manual menurun terhadap baseline |
| v2.0 | Cakupan uji kalkulasi inti; 0 dependensi CDN runtime | Sesuai hasil studi T-151 |

## 8. Risiko lintas rilis

| Risiko | Efek | Mitigasi |
|---|---|---|
| Waktu process owner terbatas | Jalur kritis mundur | Jadwalkan sesi di minggu pertama, mulai satu alur kecil |
| Data workbook tidak konsisten | Saldo awal salah | Rekonsiliasi tertulis dan persetujuan owner (T-035) |
| Schema prototipe tidak cocok dengan proses | Pengerjaan ulang | Migration bertahap; validasi pilot sebelum impor |
| Satu file `app.js` besar | Regresi saat ubah | Smoke test (T-023), kemudian uji unit dan modularisasi (E-13) |
| Ketergantungan CDN | Gagal saat jaringan terbatas | T-143 |
| Perubahan scope setelah UAT | Go-live mundur | Gerbang G5 dan triase backlog |

## 9. Cara memantau di Obsidian

1. Buka [[PROGRESS_DASHBOARD]] untuk tabel interaktif (rilis, epic, tugas) dan [[PROGRESS_SNAPSHOT]] untuk ringkasan.
2. Tiap epic berada di `roadmap/epics/` dengan properti `status`, `progress`, dan daftar tugas otomatis; tampilan Bases `Epic.base` menyusunnya per rilis.
3. Perbarui status tugas, jalankan `node scripts/progress-report.mjs`, lalu `node scripts/check-vault.mjs` untuk memastikan tidak ada link rusak.
4. Tinjau roadmap ini setiap akhir rilis dan di gerbang G5.

## 10. Catatan pembaruan: modul produksi (2026-11-04)

Modul produksi multi work center dibangun **lokal saja** (ditahan dari penayangan). Skema tiga pintu (SPK Berjalan, Produksi Hari Ini, Kinerja & Analisa) selesai di Tahap 1 ([[T-177-skema-produksi-tiga-pintu-spk-berjalan]]); Tahap 2 (analisa per work center, produk, vendor, dan pengiriman, [[T-178-kinerja-dan-analisa-produksi-tahap-2]]) selesai di lokal pada 2026-11-04; disusul Produksi Hari Ini v2 dan Laporan Produksi ([[T-179-produksi-hari-ini-v2-dan-laporan-produksi]]). Kebutuhan di [[PRD_PRODUKSI]]. Penayangan menunggu persetujuan pemilik: migration 14, push, lalu PR ke `main`.
