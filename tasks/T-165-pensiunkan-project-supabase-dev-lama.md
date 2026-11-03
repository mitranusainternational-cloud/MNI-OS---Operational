---
type: task
id: T-165
title: "Pensiunkan project Supabase dev lama"
phase: P5
epic: E-05
release: v1.0
status: todo
priority: P2
env: production
effort_days: 0.2
depends: [T-163]
owner: "pemilik akun Supabase"
updated: 2026-11-03
---

# T-165 Pensiunkan project Supabase dev lama

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]
Fase: P5  
Bergantung pada: T-163

## Kriteria selesai

- [ ] Production terbukti stabil beberapa hari
- [ ] Data atau konfigurasi yang masih dibutuhkan dari dev lama diekspor atau dipastikan tidak ada
- [ ] Project dev lama dijeda atau dihapus oleh pemilik; SISTEM_MAP dan ENVIRONMENTS diperbarui
- [ ] Konektor `plugin_supabase` tidak dipakai lagi untuk project ini

## Bukti

- Belum. Dev lama (`inldyqigewmziwazalun`) hanya berisi data uji.

## Catatan

Penghapusan project bersifat permanen: lakukan oleh pemilik setelah verifikasi.
