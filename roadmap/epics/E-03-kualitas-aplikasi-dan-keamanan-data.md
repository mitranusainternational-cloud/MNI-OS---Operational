---
type: epic
id: E-03
title: "Kualitas aplikasi dan keamanan data"
release: v1.0
theme: Kualitas
priority: P0
status: active
progress: 27
tasks_total: 11
tasks_done: 3
updated: 2026-11-02
---

# E-03 Kualitas aplikasi dan keamanan data

Rilis target: **v1.0** · Tema: Kualitas · Prioritas: P0
Induk: [[roadmap/PRODUCT_ROADMAP|Roadmap produk]]

## Hasil yang diinginkan

Login OTP, CRUD, realtime, dan RLS per role terbukti dengan uji otomatis.

## Risiko dan asumsi

Adapter meniru API Firestore di atas Postgres; perilaku realtime dan lock perlu pembuktian.

## Tugas

- [x] [[tasks/T-018-uji-asap-10-modul-ui-pada-pratinjau-mock|T-018]] Uji asap 10 modul UI pada pratinjau mock · done · P0 · 1 hari
- [x] [[tasks/T-019-perbaiki-bug-hasil-uji-ui-b-001-sampai-b-005|T-019]] Perbaiki bug hasil uji UI (B-001 sampai B-005) · done · P0 · 1.5 hari
- [ ] [[tasks/T-020-verifikasi-login-otp-end-to-end-lokal|T-020]] Verifikasi login OTP end-to-end (lokal) · todo · P0 · 1 hari
- [ ] [[tasks/T-021-verifikasi-crud-dan-realtime-semua-koleksi|T-021]] Verifikasi CRUD dan realtime semua koleksi · doing · P0 · 3 hari
- [ ] [[tasks/T-022-uji-rls-per-role-dengan-skenario-negatif|T-022]] Uji RLS per role dengan skenario negatif · todo · P0 · 2 hari
- [ ] [[tasks/T-023-smoke-test-playwright|T-023]] Smoke test Playwright · todo · P1 · 2 hari
- [ ] [[tasks/T-024-perbaikan-bug-hasil-verifikasi-buffer|T-024]] Perbaikan bug hasil verifikasi (buffer) · todo · P1 · 3 hari
- [x] [[tasks/T-026-uji-lanjutan-ui-mock-fitur-yang-belum-tercakup|T-026]] Uji lanjutan UI mock: fitur yang belum tercakup · done · P1 · 3 hari
- [ ] [[tasks/T-027-uji-sisa-ui-mock-void-koreksi-pr-dan-role|T-027]] Uji sisa UI mock: void, koreksi, PR, dan role · todo · P2 · 1.5 hari
- [ ] [[tasks/T-028-verifikasi-adapter-id-no-spk-dan-master-di-supabas|T-028]] Verifikasi adapter id, no SPK, dan master di Supabase · doing · P0 · 1 hari
- [ ] [[tasks/T-077-jadikan-regresi-e2e-runner-mandiri-dan-bagian-ci|T-077]] Jadikan regresi E2E runner mandiri dan bagian CI · doing · P1 · 1.5 hari

> Properti status, progress, dan jumlah tugas serta daftar ini dibuat otomatis oleh `node scripts/progress-report.mjs`. Jangan ubah manual. Tampilan interaktif: [[PROGRESS_DASHBOARD]].
