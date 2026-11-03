---
type: task
id: T-171
title: "Logo PT Mitra Nusa Internasional di sistem dan semua dokumen"
phase: P5
epic: E-06
release: v1.0
status: review
priority: P1
env: production
effort_days: 0.5
depends: []
owner: "dev"
updated: 2026-11-03
---

# T-171 Logo PT Mitra Nusa Internasional di sistem dan semua dokumen

Epic: [[roadmap/epics/E-06-uat-hardening-dan-go-live|E-06]]
Fase: P5  
Bergantung pada: tidak ada

## Kriteria selesai

- [x] Logo resmi (berkas dari pemilik) menjadi `apps/platform/public/logo-mni.png`, lambang saja `logo-mni-mark.png`, favicon dan ikon layar utama
- [x] Sidebar memakai lambang; halaman masuk memakai logo lengkap menggantikan ikon sementara; favicon dan apple-touch-icon diganti
- [x] Semua dokumen keluaran sistem memakai logo baru: ekspor Excel dan PDF (konstanta `LOGO_B64` diganti, rasio sama), pratinjau dan lembar cetak surat jalan, checklist bongkar muat yang dicetak (sebelumnya teks "PT MNI")
- [x] Dokumen vault: logo di bagian atas 37 dokumen (README, Home, CHANGELOG, SECURITY, documentation, templat, roadmap) lewat `scripts/add-logo-docs.mjs`; dokumen yang dibuat otomatis dilewati
- [x] Uji mock: e2e 38 + 12 + 27 lulus; tampilan halaman masuk dan sidebar diperiksa
- [ ] Ditinjau pemilik di production setelah digabung ke `main` (termasuk satu ekspor PDF dan satu Excel)

## Bukti

- Mock (verified in browser): halaman masuk dan sidebar menampilkan logo baru; `vite build` berhasil.

## Catatan

Berkas logo asli dari pemilik; jangan diubah warna atau proporsinya. Untuk mengganti logo: timpa `apps/platform/public/logo-mni.png` dan `documentation/assets/logo-mni.png`, lalu jalankan `node scripts/crop-logo.mjs` dan `node scripts/logo-dokumen.mjs` di `apps/platform`. Dokumen yang dibuat otomatis (snapshot, dashboard, VAULT_HEALTH) belum memuat logo.
