---
type: task
id: T-079
title: "Uji role lewat aplikasi dengan akun uji per role"
phase: P2
epic: E-03
release: v1.0
status: review
priority: P1
env: development
effort_days: 1
depends: [T-078]
owner: "pemilik + dev"
updated: 2026-11-03
---

# T-079 Uji role lewat aplikasi dengan akun uji per role

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-078

## Kriteria selesai

- [x] Role diuji dengan satu akun pemilik yang rolenya diganti sementara (tanpa akun tambahan)
- [x] Setiap role menjalankan alurnya dan alur terlarang di aplikasi (logistik hanya SQL/mock)
- [ ] Pesan galat di UI untuk hak yang ditolak jelas bagi pengguna
- [x] Hasil dicatat di TEST_MATRIX

## Bukti

- Belum. Hak tingkat database terbukti (lihat [[TEST_MATRIX]]).

## Catatan

Diuji lewat aplikasi di Supabase dev (2026-11-03) dengan mengganti role akun pemilik sementara: gbb, gbj, ppic, viewer sesuai matriks; logistik hanya di SQL dan mock. Menemukan B-014 dan B-015 (diperbaiki). Lihat [[TEST_MATRIX]].

Penegakan di UI sudah ada (peran dari `muser` lewat adapter; mock memiliki akun per role, uji `roles.mjs` 12 PASS). Sisa: akun per role di Supabase dev dibuat pemilik, lalu ulangi alur di aplikasi dan catat pesan galat.

UI aplikasi belum menegakkan role (`ROLE_ON=false`); penolakan datang dari database. Pertimbangkan mengaktifkan `ROLE_ON` agar pesan lebih ramah (T-101).
