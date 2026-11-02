---
type: progress-snapshot
generated: 2026-11-02
---

# Snapshot progress

> Dibuat otomatis oleh `node scripts/progress-report.mjs` dari catatan di `tasks/`. Jangan edit manual; ubah status di catatan tugas lalu jalankan ulang. Tampilan interaktif: [[PROGRESS_DASHBOARD]]. Rencana: [[GO_LIVE_PLAN]].

## Ringkasan

- Tugas selesai: **5 / 47** (11%)
- Bobot effort selesai: **3.5 / 62 hari kerja** (6%)
- Sisa effort: **58.5 hari kerja**; jalur kritis sisa menuju go-live (T-065): **26.5 hari kerja** (T-030 → T-033 → T-034 → T-035 → T-050 → T-051 → T-052 → T-053 → T-063 → T-065)
- Diblokir: **0**, sedang dikerjakan: **0**
- Estimasi effort bersifat indikatif dan belum memuat waktu tunggu pihak lain.

## Per fase

| Fase | Selesai | Effort selesai | Status |
|---|---|---|---|
| P0 Workspace dan tracking | 5/5 | 3.5/3.5 hari (100%) | selesai |
| P1 Fondasi lokal | 0/5 | 0/3 hari (0%) | belum mulai |
| P2 Aplikasi siap uji | 0/6 | 0/12 hari (0%) | belum mulai |
| P3 Data dan proses | 0/7 | 0/13.5 hari (0%) | belum mulai |
| P4 Environment cloud | 0/8 | 0/5.5 hari (0%) | belum mulai |
| P5 UAT pilot | 0/4 | 0/9.5 hari (0%) | belum mulai |
| P6 Hardening dan rilis | 0/7 | 0/9.5 hari (0%) | belum mulai |
| P7 Operasi dan dokumentasi | 0/5 | 0/5.5 hari (0%) | belum mulai |

## Siap dikerjakan sekarang (dependensi terpenuhi)

- P0 · [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] Aktifkan Docker engine di Windows · 0.5 hari · pemilik mesin
- P0 · [[tasks/T-030-walkthrough-proses-dengan-process-owner|T-030]] Walkthrough proses dengan process owner · 3 hari · tim Operasional
- P0 · [[tasks/T-032-konfirmasi-owner-dan-cut-off-enam-workbook|T-032]] Konfirmasi owner dan cut-off enam workbook · 1 hari · tim Operasional
- P0 · [[tasks/T-040-putuskan-akun-dan-repo-github-target|T-040]] Putuskan akun dan repo GitHub target · 0.5 hari · pemilik proyek
- P1 · [[tasks/T-014-tetapkan-sumber-kebenaran-ui-untuk-extract|T-014]] Tetapkan sumber kebenaran UI untuk extract · 0.5 hari · dev
- P2 · [[tasks/T-070-pilih-generator-situs-docs-dan-klasifikasi-materi|T-070]] Pilih generator situs docs dan klasifikasi materi · 1 hari · dev

## Sedang dikerjakan

- Tidak ada

## Diblokir

- Tidak ada

## Menunggu review

- Tidak ada

## Tugas P0 yang belum selesai

- [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] Aktifkan Docker engine di Windows · todo
- [[tasks/T-011-jalankan-supabase-local-stack-dan-terapkan-migrati|T-011]] Jalankan Supabase local stack dan terapkan migration · todo · menunggu T-010
- [[tasks/T-012-hubungkan-mni-app-ke-supabase-lokal|T-012]] Hubungkan mni-app ke Supabase lokal · todo · menunggu T-011
- [[tasks/T-020-verifikasi-login-otp-end-to-end-lokal|T-020]] Verifikasi login OTP end-to-end (lokal) · todo · menunggu T-012, T-013
- [[tasks/T-021-verifikasi-crud-dan-realtime-semua-koleksi|T-021]] Verifikasi CRUD dan realtime semua koleksi · todo · menunggu T-020
- [[tasks/T-022-uji-rls-per-role-dengan-skenario-negatif|T-022]] Uji RLS per role dengan skenario negatif · todo · menunggu T-021
- [[tasks/T-030-walkthrough-proses-dengan-process-owner|T-030]] Walkthrough proses dengan process owner · todo
- [[tasks/T-031-pilih-pilot-pertama-dan-acceptance-criteria|T-031]] Pilih pilot pertama dan acceptance criteria · todo · menunggu T-030
- [[tasks/T-032-konfirmasi-owner-dan-cut-off-enam-workbook|T-032]] Konfirmasi owner dan cut-off enam workbook · todo
- [[tasks/T-035-rekonsiliasi-saldo-hasil-impor|T-035]] Rekonsiliasi saldo hasil impor · todo · menunggu T-034
- [[tasks/T-040-putuskan-akun-dan-repo-github-target|T-040]] Putuskan akun dan repo GitHub target · todo
- [[tasks/T-041-push-empat-branch-dan-proteksi-main|T-041]] Push empat branch dan proteksi main · todo · menunggu T-040
- [[tasks/T-042-supabase-project-development|T-042]] Supabase project development · todo · menunggu T-011
- [[tasks/T-044-vercel-preview-dari-development-production-dari-ma|T-044]] Vercel: preview dari development, production dari main · todo · menunggu T-041, T-042
- [[tasks/T-045-secrets-github-actions-dan-vercel|T-045]] Secrets GitHub Actions dan Vercel · todo · menunggu T-044
- [[tasks/T-047-konfigurasi-auth-supabase-produksi|T-047]] Konfigurasi Auth Supabase produksi · todo · menunggu T-042
- [[tasks/T-050-siapkan-data-dan-akun-uat-di-dev|T-050]] Siapkan data dan akun UAT di dev · todo · menunggu T-035, T-036, T-044
- [[tasks/T-051-jalankan-uat-skenario-pilot|T-051]] Jalankan UAT skenario pilot · todo · menunggu T-050, T-031
- [[tasks/T-052-perbaiki-issue-uat-dan-regresi|T-052]] Perbaiki issue UAT dan regresi · todo · menunggu T-051
- [[tasks/T-053-sign-off-uat|T-053]] Sign-off UAT · todo · menunggu T-052
- [[tasks/T-060-review-security-dan-performance-advisor|T-060]] Review security dan performance advisor · todo · menunggu T-042
- [[tasks/T-061-backup-restore-drill-dan-rencana-rollback|T-061]] Backup, restore drill, dan rencana rollback · todo · menunggu T-043
- [[tasks/T-063-impor-data-awal-ke-production-dan-rekonsiliasi|T-063]] Impor data awal ke production dan rekonsiliasi · todo · menunggu T-053, T-043
- [[tasks/T-064-checklist-rilis-dan-merge-development-ke-main|T-064]] Checklist rilis dan merge development ke main · todo · menunggu T-053, T-060, T-061, T-062
- [[tasks/T-065-go-live-dan-hypercare-lima-hari|T-065]] Go-live dan hypercare lima hari · todo · menunggu T-064, T-063, T-047
