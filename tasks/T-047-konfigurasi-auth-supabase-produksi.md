---
type: task
id: T-047
title: "Konfigurasi Auth Supabase produksi"
phase: P4
epic: E-05
release: v1.0
status: todo
priority: P0
env: main
effort_days: 1
depends: [T-042]
owner: "dev"
updated: 2026-11-02
---

# T-047 Konfigurasi Auth Supabase produksi

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]  
Fase: P4 Environment cloud  
Bergantung pada: T-042

## Kriteria selesai

- [ ] SMTP produksi, redirect URL, rate limit OTP
- [ ] Self-signup nonaktif; user hanya dari muser

## Bukti

- Belum ada.

## Catatan

Prioritas naik: tanpa SMTP sendiri login OTP terkena batas email (HTTP 429) setelah beberapa permintaan, dan templat email perlu memuat {{ .Token }}. Lihat [[documentation/ENVIRONMENTS]].

-
