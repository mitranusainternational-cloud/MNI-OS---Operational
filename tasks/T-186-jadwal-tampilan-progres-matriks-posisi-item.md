---
type: task
id: T-186
title: "Jadwal: tampilan Progres (matriks posisi tiap item per langkah) sebagai tampilan utama"
phase: P2
epic: E-02
release: v0.9
status: review
priority: P1
env: dev
effort_days: 1
depends: [T-185]
owner: "dev + pemilik"
updated: 2026-11-05
---

<img src="../documentation/assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# T-186 Jadwal: tampilan Progres

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]
Fase: P2
Bergantung pada: [[T-185-papan-jadwal-v3-interaktif-dan-urutan-tab-spk]]
Kebutuhan: [[PRD_PRODUKSI]] bagian 16

Masukan pemilik: Gantt masih kurang bagus; yang penting bisa memantau progres, boleh dibuat dengan bentuk lain.

Alasan bentuk baru: Gantt menjawab "kapan", sedangkan pemantauan harian menjawab "sekarang di mana dan sudah berapa". Batang Gantt kecil, sebagian besar ruangnya kosong, dan progres tiap langkah tidak terbaca.

## Kriteria selesai

- [x] Tampilan Progres menjadi tampilan awal tab Jadwal; Garis waktu (Gantt) dan Per mesin tetap tersedia
- [x] Satu kartu per SPK (urut telat dulu, lalu due date) berisi nomor, customer, sisa hari, progres produksi, tombol Buka
- [x] Satu baris per item, kolom langkah dari Shearing sampai Kirim; tiap sel menunjukkan jumlah selesai terhadap jumlah SPK, batang, dan keterangan (mesin yang sedang berjalan, jumlah dikirim ke vendor)
- [x] Status sel: selesai (centang hijau), berjalan, belum mulai, tidak ada di rute; kolom posisi sekarang bercincin; sel yang sedang dikerjakan berdenyut
- [x] Label posisi per item: Antri di, Di, Menunggu atau Di vendor, Siap kirim, Terkirim; nomor langkah (mis. langkah 2 dari 4)
- [x] Strip "Posisi item sekarang": jumlah item di tiap langkah, klik untuk menyaring
- [x] Buka semua dan Lipat semua; di HP kartu bergulir di dalam kotaknya sendiri tanpa gulir halaman
- [x] Uji e2e M-154 sampai M-158; regresi penuh 0 FAIL; uji alur lengkap SPK 15 PASS
- [ ] Ditinjau pemilik

## Bukti

`verified in browser` (mock, Playwright). E2E: regresi 42, role 12, akses 34, produksi 123, tampilan 72; alur lengkap SPK 15 (0 FAIL). Tangkapan layar: `documentation/screenshots/progres-v1-desktop.png` dan `progres-v1-hp.png`. Bukan bukti Supabase.

## Catatan

Tidak ada perubahan skema dan tidak ada input baru; posisi dihitung dari rute item dan catatan produksi, vendor, dan pengiriman yang sudah ada. Item yang rutenya belum dikenali ditampilkan dengan peringatan, bukan dihitung. Progres produksi resmi di kepala kartu tetap hanya menghitung langkah internal terakhir, sedangkan sel menunjukkan tiap langkah.
