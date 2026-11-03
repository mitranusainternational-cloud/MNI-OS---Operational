---
type: task
id: T-062
title: "Header keamanan dan HTTPS"
phase: P6
epic: E-06
release: v1.0
status: done
priority: P1
env: main
effort_days: 0.5
depends: [T-044]
owner: "dev"
updated: 2026-11-03
---

# T-062 Header keamanan dan HTTPS

Epic: [[roadmap/epics/E-06-uat-hardening-dan-go-live|E-06]]  
Fase: P6 Hardening dan rilis  
Bergantung pada: T-044

## Kriteria selesai

- [x] vercel.json header terverifikasi
- [x] CSP dievaluasi terhadap CDN yang dipakai adapter

## Bukti

- Header keamanan (CSP, HSTS, X-Frame-Options, nosniff) aktif lewat `vercel.json`; ekspor tetap berfungsi di bawah CSP, lihat [[TEST_MATRIX]].
- Belum ada.

## Catatan

-
