---
type: progress-snapshot
status: generated
updated: 2026-11-03
generated: 2026-11-03
---

# Snapshot progress

> Dibuat otomatis oleh `node scripts/progress-report.mjs` dari catatan di `tasks/`. Jangan edit manual; ubah status di catatan tugas lalu jalankan ulang. Tampilan interaktif: [[PROGRESS_DASHBOARD]]. Rencana: [[GO_LIVE_PLAN]] dan [[roadmap/PRODUCT_ROADMAP]].

## Ringkasan

- Tugas selesai: **16 / 83** (19%)
- Bobot effort selesai: **14 / 146 hari kerja** (10%)
- Sisa effort: **132 hari kerja**; jalur kritis sisa menuju go-live (T-065): **26.5 hari kerja** (T-030 → T-033 → T-034 → T-035 → T-050 → T-051 → T-052 → T-053 → T-063 → T-065)
- Cakupan go-live (fase P0-P7): **16 / 61** tugas selesai; tugas pasca go-live (P8-P10) sengaja dijadwalkan ulang setelah hypercare.
- Diblokir: **1**, sedang dikerjakan: **1**
- Estimasi effort bersifat indikatif dan belum memuat waktu tunggu pihak lain.

## Per fase

| Fase | Selesai | Effort selesai | Status |
|---|---|---|---|
| P0 Workspace dan tracking | 7/7 | 5/5 hari (100%) | selesai |
| P1 Fondasi lokal | 2/7 | 1.5/4.5 hari (33%) | ada blocker |
| P2 Aplikasi siap uji | 3/15 | 5.5/23.5 hari (23%) | berjalan |
| P3 Data dan proses | 0/7 | 0/13.5 hari (0%) | belum mulai |
| P4 Environment cloud | 4/9 | 2/6 hari (33%) | berjalan |
| P5 UAT pilot | 0/4 | 0/9.5 hari (0%) | belum mulai |
| P6 Hardening dan rilis | 0/7 | 0/9.5 hari (0%) | belum mulai |
| P7 Operasi dan dokumentasi | 0/5 | 0/5.5 hari (0%) | belum mulai |
| P8 v1.1 Stabilisasi, akses, kualitas data | 0/8 | 0/21 hari (0%) | belum mulai |
| P9 v1.2 Integrasi dan pelaporan | 0/6 | 0/21 hari (0%) | belum mulai |
| P10 v2.0 Modernisasi dan perluasan | 0/8 | 0/27 hari (0%) | belum mulai |

## Per rilis

| Rilis | Tema | Tugas | Effort | Status |
|---|---|---|---|---|
| v0.9 | Fondasi | 11/16 | 7.5/10.5 hari (71%) | active |
| v1.0 | Pilot go-live | 5/45 | 6.5/66.5 hari (10%) | active |
| v1.1 | Stabilisasi, akses, kualitas data | 0/8 | 0/21 hari (0%) | planned |
| v1.2 | Integrasi dan pelaporan | 0/6 | 0/21 hari (0%) | planned |
| v2.0 | Modernisasi dan perluasan | 0/8 | 0/27 hari (0%) | planned |

## Per epic

| Epic | Rilis | Tugas | Progress | Status |
|---|---|---|---|---|
| [[roadmap/epics/E-01-fondasi-workspace-dan-repo\|E-01]] Fondasi workspace dan repo | v0.9 | 7/7 | 100% | done |
| [[roadmap/epics/E-02-aplikasi-berjalan-lokal\|E-02]] Aplikasi berjalan lokal | v0.9 | 4/9 | 45% | active |
| [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data\|E-03]] Kualitas aplikasi dan keamanan data | v1.0 | 3/14 | 24% | active |
| [[roadmap/epics/E-04-proses-data-dan-pilot\|E-04]] Proses, data, dan pilot | v1.0 | 0/7 | 0% | planned |
| [[roadmap/epics/E-05-environment-cloud-dan-ci-cd\|E-05]] Environment cloud dan CI/CD | v1.0 | 2/7 | 20% | active |
| [[roadmap/epics/E-06-uat-hardening-dan-go-live\|E-06]] UAT, hardening, dan go-live | v1.0 | 0/11 | 0% | planned |
| [[roadmap/epics/E-07-dokumentasi-dan-situs-docs\|E-07]] Dokumentasi dan situs Docs | v1.0 | 0/4 | 0% | planned |
| [[roadmap/epics/E-08-operasi-dan-dukungan\|E-08]] Operasi dan dukungan | v1.0 | 0/2 | 0% | planned |
| [[roadmap/epics/E-09-akses-peran-dan-audit\|E-09]] Akses, peran, dan audit | v1.1 | 0/4 | 0% | planned |
| [[roadmap/epics/E-10-kualitas-data-dan-kontrol-stok\|E-10]] Kualitas data dan kontrol stok | v1.1 | 0/4 | 0% | planned |
| [[roadmap/epics/E-11-integrasi-sumber-data\|E-11]] Integrasi sumber data | v1.2 | 0/3 | 0% | planned |
| [[roadmap/epics/E-12-pelaporan-notifikasi-dan-dokumen\|E-12]] Pelaporan, notifikasi, dan dokumen | v1.2 | 0/3 | 0% | planned |
| [[roadmap/epics/E-13-modernisasi-frontend-dan-pengujian\|E-13]] Modernisasi frontend dan pengujian | v2.0 | 0/4 | 0% | planned |
| [[roadmap/epics/E-14-multi-site-dan-mobile\|E-14]] Multi-site dan mobile | v2.0 | 0/2 | 0% | planned |
| [[roadmap/epics/E-15-self-host-vps-dan-layanan-pendamping\|E-15]] Self-host VPS dan layanan pendamping | v2.0 | 0/2 | 0% | planned |

## Siap dikerjakan sekarang (dependensi terpenuhi)

- P0 · [[tasks/T-030-walkthrough-proses-dengan-process-owner|T-030]] Walkthrough proses dengan process owner · 3 hari · tim Operasional
- P0 · [[tasks/T-032-konfirmasi-owner-dan-cut-off-enam-workbook|T-032]] Konfirmasi owner dan cut-off enam workbook · 1 hari · tim Operasional
- P0 · [[tasks/T-044-vercel-preview-dari-development-production-dari-ma|T-044]] Vercel: preview dari development, production dari main · 1 hari · dev
- P0 · [[tasks/T-047-konfigurasi-auth-supabase-produksi|T-047]] Konfigurasi Auth Supabase produksi · 1 hari · dev
- P0 · [[tasks/T-060-review-security-dan-performance-advisor|T-060]] Review security dan performance advisor · 1 hari · dev
- P1 · [[tasks/T-043-supabase-project-production-kosong|T-043]] Supabase project production (kosong) · 0.5 hari · pemilik akun Supabase
- P2 · [[tasks/T-017-rapikan-identitas-pengguna-dan-teks-backend-di-mni|T-017]] Rapikan identitas pengguna dan teks backend di mni-app · 0.5 hari · dev
- P2 · [[tasks/T-027-uji-sisa-ui-mock-void-koreksi-pr-dan-role|T-027]] Uji sisa UI mock: void, koreksi, PR, dan role · 1.5 hari · dev
- P2 · [[tasks/T-070-pilih-generator-situs-docs-dan-klasifikasi-materi|T-070]] Pilih generator situs docs dan klasifikasi materi · 1 hari · dev

## Sedang dikerjakan

- [[tasks/T-077-jadikan-regresi-e2e-runner-mandiri-dan-bagian-ci|T-077]] Jadikan regresi E2E runner mandiri dan bagian CI · dev

## Diblokir

- [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] Aktifkan Docker engine di Windows · pemilik mesin (BIOS + admin Windows)

## Menunggu review

- [[tasks/T-021-verifikasi-crud-dan-realtime-semua-koleksi|T-021]] Verifikasi CRUD dan realtime semua koleksi · dev
- [[tasks/T-022-uji-rls-per-role-dengan-skenario-negatif|T-022]] Uji RLS per role dengan skenario negatif · dev
- [[tasks/T-028-verifikasi-adapter-id-no-spk-dan-master-di-supabas|T-028]] Verifikasi adapter id, no SPK, dan master di Supabase · dev
- [[tasks/T-078-jalankan-migration-pembersihan-policy-role-lama|T-078]] Jalankan migration pembersihan policy role lama · pemilik akun Supabase
- [[tasks/T-079-uji-role-lewat-aplikasi-dengan-akun-uji-per-role|T-079]] Uji role lewat aplikasi dengan akun uji per role · pemilik + dev

## Tugas P0 yang belum selesai

- [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] Aktifkan Docker engine di Windows · blocked
- [[tasks/T-011-jalankan-supabase-local-stack-dan-terapkan-migrati|T-011]] Jalankan Supabase local stack dan terapkan migration · todo · menunggu T-010
- [[tasks/T-012-hubungkan-mni-app-ke-supabase-lokal|T-012]] Hubungkan mni-app ke Supabase lokal · todo · menunggu T-011
- [[tasks/T-020-verifikasi-login-otp-end-to-end-lokal|T-020]] Verifikasi login OTP end-to-end (lokal) · todo · menunggu T-012, T-013
- [[tasks/T-021-verifikasi-crud-dan-realtime-semua-koleksi|T-021]] Verifikasi CRUD dan realtime semua koleksi · review · menunggu T-020
- [[tasks/T-022-uji-rls-per-role-dengan-skenario-negatif|T-022]] Uji RLS per role dengan skenario negatif · review · menunggu T-021
- [[tasks/T-028-verifikasi-adapter-id-no-spk-dan-master-di-supabas|T-028]] Verifikasi adapter id, no SPK, dan master di Supabase · review · menunggu T-012, T-021
- [[tasks/T-030-walkthrough-proses-dengan-process-owner|T-030]] Walkthrough proses dengan process owner · todo
- [[tasks/T-031-pilih-pilot-pertama-dan-acceptance-criteria|T-031]] Pilih pilot pertama dan acceptance criteria · todo · menunggu T-030
- [[tasks/T-032-konfirmasi-owner-dan-cut-off-enam-workbook|T-032]] Konfirmasi owner dan cut-off enam workbook · todo
- [[tasks/T-035-rekonsiliasi-saldo-hasil-impor|T-035]] Rekonsiliasi saldo hasil impor · todo · menunggu T-034
- [[tasks/T-044-vercel-preview-dari-development-production-dari-ma|T-044]] Vercel: preview dari development, production dari main · todo
- [[tasks/T-045-secrets-github-actions-dan-vercel|T-045]] Secrets GitHub Actions dan Vercel · todo · menunggu T-044
- [[tasks/T-047-konfigurasi-auth-supabase-produksi|T-047]] Konfigurasi Auth Supabase produksi · todo
- [[tasks/T-050-siapkan-data-dan-akun-uat-di-dev|T-050]] Siapkan data dan akun UAT di dev · todo · menunggu T-035, T-036, T-044
- [[tasks/T-051-jalankan-uat-skenario-pilot|T-051]] Jalankan UAT skenario pilot · todo · menunggu T-050, T-031
- [[tasks/T-052-perbaiki-issue-uat-dan-regresi|T-052]] Perbaiki issue UAT dan regresi · todo · menunggu T-051
- [[tasks/T-053-sign-off-uat|T-053]] Sign-off UAT · todo · menunggu T-052
- [[tasks/T-060-review-security-dan-performance-advisor|T-060]] Review security dan performance advisor · todo
- [[tasks/T-061-backup-restore-drill-dan-rencana-rollback|T-061]] Backup, restore drill, dan rencana rollback · todo · menunggu T-043
- [[tasks/T-063-impor-data-awal-ke-production-dan-rekonsiliasi|T-063]] Impor data awal ke production dan rekonsiliasi · todo · menunggu T-053, T-043
- [[tasks/T-064-checklist-rilis-dan-merge-development-ke-main|T-064]] Checklist rilis dan merge development ke main · todo · menunggu T-053, T-060, T-061, T-062
- [[tasks/T-065-go-live-dan-hypercare-lima-hari|T-065]] Go-live dan hypercare lima hari · todo · menunggu T-064, T-063, T-047
- [[tasks/T-078-jalankan-migration-pembersihan-policy-role-lama|T-078]] Jalankan migration pembersihan policy role lama · review · menunggu T-022
