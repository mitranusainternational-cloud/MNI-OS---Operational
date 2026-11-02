---
name: vps-readiness
description: Nilai kesiapan dan putuskan apakah serta kapan MNI OS dipindah atau dilengkapi dengan VPS (self-host Supabase, layanan pendamping, backup, monitoring). Gunakan sebelum menyentuh docker-compose, nginx, atau server VPS.
---

# Kesiapan VPS

VPS **bukan tahap berikutnya otomatis**. Production awal memakai Supabase cloud + Vercel. VPS dipertimbangkan setelah sistem stabil, lewat penilaian ini.

## Yang sudah ada

`apps/platform/docker-compose.yml` menjalankan Nginx + Kong + GoTrue (auth) + PostgREST + Realtime + Postgres + Storage; `nginx/nginx.conf` melayani SPA dan proxy `/api/`. Belum ada: Studio, pg-meta, edge functions, backup terjadwal, monitoring, SMTP, pembaruan keamanan, dan `.env.vps.example` (tidak ter-commit karena aturan `.gitignore`).

## Kapan VPS masuk akal (butuh minimal satu alasan terukur)

- Biaya Supabase cloud melewati anggaran, atau butuh kendali penuh atas data/lokasi data.
- Perlu layanan pendamping: backup ke penyimpanan sendiri, monitoring, cron/otomasi (impor workbook, notifikasi), situs Docs.
- Ada staf yang akan merawat server (patch OS, TLS, backup, restore).

## Penilaian (isi di `documentation/` sebagai catatan bertanggal)

1. Kebutuhan dan alasan: data, biaya, kepatuhan, siapa perawat.
2. Spesifikasi: CPU/RAM/disk, OS, lokasi, akses SSH, domain, TLS.
3. Rancangan: self-host penuh vs layanan pendamping saja; strategi backup (frekuensi, lokasi, uji restore); rencana rollback.
4. Migrasi data: ekspor dari Supabase cloud, impor ke Postgres VPS, uji integritas, jendela henti.
5. Risiko: satu server = titik gagal; pembaruan Supabase self-host; email OTP butuh SMTP.
6. Keputusan di `documentation/DECISIONS.md`.

## Aturan

- Jangan men-deploy ke VPS sebelum S4 (UAT) selesai dan penilaian di atas disetujui.
- Jangan menyimpan kredensial server di repo; gunakan variabel lingkungan dan pengelola rahasia.
- Uji restore backup sebelum go-live VPS. Catat hasil di tugas T-160 dan T-161.
