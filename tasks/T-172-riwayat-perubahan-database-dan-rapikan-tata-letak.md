---
type: task
id: T-172
title: "Riwayat perubahan di database, larangan hapus permanen, dan rapikan tata letak"
phase: P5
epic: E-09
release: v1.1
status: doing
priority: P0
env: production
effort_days: 1
depends: [T-167]
owner: "dev + pemilik"
updated: 2026-11-03
---

# T-172 Riwayat perubahan di database, larangan hapus permanen, dan rapikan tata letak

Epic: [[roadmap/epics/E-09-akses-peran-dan-audit|E-09]]
Fase: P5  
Bergantung pada: T-167

## Kriteria selesai

- [x] Migration 13: tabel `audit_log` (siapa, kapan, nilai lama, nilai baru) diisi otomatis oleh pemicu database pada 16 tabel data; hanya super admin yang bisa membaca; tidak bisa diubah atau dihapus lewat API
- [x] Kebijakan DELETE dicabut pada tabel transaksi (SPK, vendor, kirim, bongkar, PR, mutasi, opname, riwayat harga, bahan baku, barang jadi); aplikasi sudah memakai pembatalan lunak
- [x] Panel Riwayat perubahan di menu Pengguna & Akses (super admin); cadangan dan skrip pulih ikut memuat `audit_log`
- [x] Perbaikan tata letak: header lembar SPK (drawer) tanpa gaya, kartu KPI Dashboard Produksi menumpuk satu per baris, grid KPI Master Data melebar di ponsel
- [x] Sapu tampilan otomatis (`tests/e2e/sweep.mjs`): 12 halaman pada desktop, tablet, ponsel, plus lembar SPK; total e2e 38 + 12 + 28 + 38 lulus
- [ ] Terapkan migration 13 di production dan uji dengan transaksi rollback (menunggu persetujuan eksplisit pemilik untuk tahap production)
- [ ] Gabung ke `main`, deploy Vercel, verifikasi di production

## Bukti

- Mock (verified in browser, bukan bukti Supabase): panel riwayat, sapu tampilan, tangkapan layar Dashboard Produksi dan lembar SPK setelah perbaikan.

## Catatan

Migration 13 belum diuji di database mana pun; pengujian pertama dengan transaksi rollback dilakukan di production setelah dipasang. Riwayat tidak bisa dibuat mundur, jadi dipasang sebelum data nyata masuk. Penguncian periode dan batasan stok minus di database ditunda ke setelah pilot.
