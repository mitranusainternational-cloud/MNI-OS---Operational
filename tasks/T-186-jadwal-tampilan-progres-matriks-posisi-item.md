---
type: task
id: T-186
title: "Berjalan memuat matriks posisi item; Jadwal menjadi papan jadwal mingguan dengan rencana otomatis"
phase: P2
epic: E-02
release: v0.9
status: review
priority: P1
env: dev
effort_days: 2
depends: [T-185]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-186 Berjalan dan Jadwal dibedakan

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2
Bergantung pada: [[T-185-papan-jadwal-v3-interaktif-dan-urutan-tab-spk]]
Kebutuhan: [[PRD_PRODUKSI]] bagian 16

Masukan pemilik: (1) Gantt kurang bagus untuk memantau progres; (2) tab Jadwal dan Berjalan masih sama, perlu dibedakan, jadwal dibuat seperti papan jadwal Antlia tetapi lebih baik dan tidak kaku; (3) tampilan pertama terlalu membingungkan.

Pembedaan: **Berjalan** menjawab "sekarang di mana dan sudah berapa" (matriks posisi tiap item). **Jadwal** menjawab "kapan dikerjakan dan apakah akan telat" (kalender mingguan per SPK dengan realisasi dan rencana otomatis). Referensi: Production Calendar Antlia (kolom hari, kartu berwarna menurut status, navigasi minggu, tombol Hari ini).

## Kriteria selesai

- [x] Tab Berjalan memuat matriks: baris per item, kolom langkah dari Shearing sampai Kirim; sel menunjukkan jumlah selesai, centang, mesin berjalan; kolom posisi sekarang bercincin; label posisi dan nomor langkah
- [x] Strip posisi item sekarang (klik untuk menyaring), penanda Diam N hari (tanpa catatan baru 2 hari atau lebih), mode Ringkas dan Rinci
- [x] Mesin rencana jadwal `src/lib/produksi/rencana.js` (kapasitas terbatas, urut due date, hari kerja Senin sampai Jumat, vendor 3 hari kerja) dengan uji unit R-01 sampai R-10
- [x] Tab Jadwal membuka Papan jadwal mingguan: satu baris per SPK, tujuh hari, kotak per work center per hari (terisi = realisasi, garis putus = rencana, oranye = sedang dikerjakan, hatch = vendor), bendera due date, perkiraan siap kirim, status prediksi (Aman, Mepet due, Berisiko telat)
- [x] Navigasi minggu (panah dan Hari ini); klik baris atau kotak membuka rencana SPK per item; beban work center per hari di bagian lipat
- [x] Garis waktu (Gantt) dan Per mesin tetap tersedia
- [x] Uji e2e M-100, M-142, M-154 sampai M-168 diperbarui atau ditambah; regresi penuh 0 FAIL
- [ ] Ditinjau pemilik

## Bukti

`verified in browser` (mock, Playwright) dan unit. Unit: rencana 11, jadwal 21, kapasitas 10, semua lainnya PASS. E2E: regresi 42, role 12, akses 34, produksi 133, tampilan 72; alur lengkap SPK 15 (0 FAIL). Tangkapan layar: `documentation/screenshots/papan-v2-desktop.png`, `papan-v2-hp.png`, `berjalan-v3-desktop.png`. Bukan bukti Supabase.

## Catatan

Tidak ada perubahan skema dan tidak ada input baru. Rencana adalah usulan untuk dipantau, bukan perintah kerja; tidak bisa digeser tangan karena jadwal diturunkan dari kapasitas dan catatan produksi. Asumsi: kapasitas dari Master Data (work center tanpa kapasitas dianggap selesai dalam satu hari), Senin sampai Jumat kerja, vendor 3 hari kerja. Percobaan pertama tampilan Progres terpisah dan versi papan per work center dibuang karena membingungkan.
