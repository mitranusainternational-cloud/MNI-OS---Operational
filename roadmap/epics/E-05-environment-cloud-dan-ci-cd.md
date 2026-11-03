---
type: epic
id: E-05
title: "Environment cloud dan CI/CD"
release: v1.0
theme: Platform
priority: P0
status: active
progress: 20
tasks_total: 7
tasks_done: 2
updated: 2026-11-03
---

# E-05 Environment cloud dan CI/CD

Rilis target: **v1.0** · Tema: Platform · Prioritas: P0
Induk: [[roadmap/PRODUCT_ROADMAP|Roadmap produk]]

## Hasil yang diinginkan

Dev dan prod terpisah (Supabase, Vercel, secrets), CI memblokir build rusak.

## Risiko dan asumsi

Biaya dan manajemen secret; akun pemilik harus tersedia.

## Tugas

- [x] [[tasks/T-029-buat-admin-awal-dan-uji-login-otp-di-supabase-dev|T-029]] Buat admin awal dan uji login OTP di Supabase dev · done · P0 · 0.5 hari
- [x] [[tasks/T-042-supabase-project-development|T-042]] Supabase project development · done · P0 · 0.5 hari
- [ ] [[tasks/T-043-supabase-project-production-kosong|T-043]] Supabase project production (kosong) · todo · P1 · 0.5 hari
- [ ] [[tasks/T-044-vercel-preview-dari-development-production-dari-ma|T-044]] Vercel: preview dari development, production dari main · todo · P0 · 1 hari
- [ ] [[tasks/T-045-secrets-github-actions-dan-vercel|T-045]] Secrets GitHub Actions dan Vercel · todo · P0 · 0.5 hari
- [ ] [[tasks/T-046-ci-build-dan-smoke-test-pada-pr|T-046]] CI: build dan smoke test pada PR · review · P1 · 1 hari
- [ ] [[tasks/T-047-konfigurasi-auth-supabase-produksi|T-047]] Konfigurasi Auth Supabase produksi · todo · P0 · 1 hari

> Properti status, progress, dan jumlah tugas serta daftar ini dibuat otomatis oleh `node scripts/progress-report.mjs`. Jangan ubah manual. Tampilan interaktif: [[PROGRESS_DASHBOARD]].
