---
type: task
id: T-079
title: "Uji role lewat aplikasi dengan akun uji per role"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P1
env: development
effort_days: 1
depends: [T-078]
owner: "pemilik + dev"
updated: 2026-11-02
---

# T-079 Uji role lewat aplikasi dengan akun uji per role

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2  
Bergantung pada: T-078

## Kriteria selesai

- [ ] Akun uji untuk ppic, gbb, gbj, logistik, viewer dibuat oleh pemilik di dashboard (muser + pengguna auth)
- [ ] Setiap role menjalankan alurnya dan alur terlarang di aplikasi
- [ ] Pesan galat di UI untuk hak yang ditolak jelas bagi pengguna
- [ ] Hasil dicatat di TEST_MATRIX

## Bukti

- Belum. Hak tingkat database terbukti (lihat [[TEST_MATRIX]]).

## Catatan

Penegakan di UI sudah ada (peran dari `muser` lewat adapter; mock memiliki akun per role, uji `roles.mjs` 12 PASS). Sisa: akun per role di Supabase dev dibuat pemilik, lalu ulangi alur di aplikasi dan catat pesan galat.

UI aplikasi belum menegakkan role (`ROLE_ON=false`); penolakan datang dari database. Pertimbangkan mengaktifkan `ROLE_ON` agar pesan lebih ramah (T-101).
