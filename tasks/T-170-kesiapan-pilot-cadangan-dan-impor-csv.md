---
type: task
id: T-170
title: "Kesiapan pilot: cadangan data dan impor CSV master dan stok awal"
phase: P5
epic: E-06
release: v1.0
status: review
priority: P0
env: production
effort_days: 1
depends: [T-167]
owner: "dev + pemilik"
updated: 2026-11-03
---

# T-170 Kesiapan pilot: cadangan data dan impor CSV master dan stok awal

Epic: [[roadmap/epics/E-06-uat-hardening-dan-go-live|E-06]]
Fase: P5
Bergantung pada: T-167

## Kriteria selesai

- [x] Data uji production dibersihkan (satu baris bongkar muat uji dihapus; SPK dan customer milik pemilik dibiarkan)
- [x] Unduh cadangan (JSON) untuk super admin, penanda waktu cadangan, peringatan di dashboard bila belum ada atau lebih dari 7 hari
- [x] Skrip pemulihan `apps/platform/scripts/restore-backup.mjs` (uji kering dan --apply) dan runbook [[BACKUP_RESTORE]]
- [x] Impor CSV untuk vendor, customer, supplier, armada, bahan baku, dan barang jadi dengan stok awal, dengan templat, pratinjau, dan penolakan bila ada baris bermasalah; panduan [[IMPOR_DATA_AWAL]]
- [x] Uji mock: 27 skenario akses (termasuk cadangan dan impor), total e2e 38 + 12 + 27 lulus; tampilan tablet diperiksa
- [ ] Latihan pulih ke project sementara (butuh kunci service-role tujuan; dikerjakan pemilik dengan skrip siap)
- [ ] Uji cadangan dan impor di production setelah digabung ke main
- [ ] SMTP kustom, admin kedua (tugas pemilik)

## Bukti

- Mock (verified in browser, bukan bukti Supabase): cadangan berisi semua tabel, penanda tersimpan, impor menolak baris bermasalah dan memasukkan baris valid, hanya admin melihat tombolnya.
- Production (verified in database): satu baris uji dihapus dengan kondisi id dan nopol yang tepat.

## Catatan

Menjawab daftar "belum siap" dari penilaian kesiapan 2026-11-03. Tidak menambah fitur di luar syarat go-live.
