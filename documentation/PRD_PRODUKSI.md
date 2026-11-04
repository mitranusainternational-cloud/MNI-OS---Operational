---
type: design
status: draft
updated: 2026-11-04
---

<img src="assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# PRD Produksi dan Tracking (SPK, work center, vendor, pengiriman)

Dokumen kebutuhan untuk modul produksi. Detail rute dan aturan hitung ada di [[RUTE_PRODUKSI]]; tugas ada di [[T-174-produksi-multi-work-center-rute-antrian-kapasitas]], [[T-177-skema-produksi-tiga-pintu-spk-berjalan]], dan [[T-178-kinerja-dan-analisa-produksi-tahap-2]]. Pengganti form laporan harian produksi (Excel, 15 lembar).

## 1. Masalah

Form Excel menyulitkan: tidak terlihat SPK mana yang sedang jalan, item sudah sampai mana, dan seberapa cepat tiap work center atau vendor bekerja. Tampilan awal sistem juga membingungkan karena terlalu banyak menu dan banyak tempat input.

## 2. Tiga kebutuhan inti (dari pemilik, 2026-11-04)

1. **SPK mana yang sedang dikerjakan.**
2. **Progres tiap item dalam SPK** sampai mana, serta output per work center secepat apa dan kapasitas per hari berapa, agar manajemen dapat memantau.
3. **Posisi SPK secara keseluruhan:** sudah selesai semua atau belum, dan bila belum sudah sampai mana.

## 3. Kebutuhan lanjutan

- **Tracking vendor finishing:** barang keluar dan masuk tercatat, kecepatan (lama proses, tepat waktu, reject) dinilai sehingga terlihat vendor mana yang cepat dan mana yang kurang.
- **Analisa per work center, per produk,** dari work center awal sampai selesai, termasuk kirim ke vendor dan kembali.
- **Loading dan unloading** ke customer tercatat waktunya dan dianalisa.
- Mudah dipakai, tidak ribet, nyaman di HP untuk operator.

## 4. Prinsip rancangan

- **Input hanya di tiga tempat:** Produksi Hari Ini (operator), Kirim ke Vendor (barang keluar dan masuk), Bongkar Muat dan Kirim ke Customer (loading dan unloading). Layar lain hanya untuk dilihat.
- **Satu aksi utama per layar:** operator menekan Mulai lalu Selesai; selebihnya otomatis (rute, pindah ke langkah berikutnya, durasi, tonase).
- **Rute otomatis** dari judul section SPK dan deskripsi item (Cable Tray, Cable Ladder, Accs); langkah vendor ikut sebagai bagian rute.
- Bukti dibedakan: `source-level`, `verified in browser`, `verified in database`. Mock bukan bukti Supabase.

## 5. Skema menu (keputusan 2026-11-04)

| Menu Produksi | Fungsi | Jenis | Menjawab |
|---|---|---|---|
| **SPK Berjalan** | Kartu per SPK: status, progres, jalur tiap item dari work center awal sampai terkirim; filter Berjalan, Telat, Di vendor, Siap kirim, Selesai | Lihat | Kebutuhan 1 dan 3, sebagian 2 |
| **Produksi Hari Ini** | Kartu pekerjaan per mesin; Mulai, jumlah selesai (+ dan −), Selesai | **Input** | Sumber data semua menu |
| **Kinerja & Analisa** | Lima tab: Work Center (output, kapasitas, utilisasi, tren, beban antrian), Produk (lama proses per tahap), Vendor (keluar, masuk, kecepatan, kualifikasi), Pengiriman (loading dan unloading), Laporan harian | Lihat | Kebutuhan 2 dan analisa (Tahap 2 selesai di lokal) |

Rute tersembunyi (masih bisa dibuka lewat alamat): Papan Produksi dan Laporan Produksi. Menu lama Monitoring SPK, Dashboard Produksi, dan Antrian Mesin digantikan tiga menu di atas.

## 6. Pemetaan kebutuhan ke data

| Kebutuhan | Sumber data | Tabel dan kolom |
|---|---|---|
| SPK dan item berjalan | Sesi Mulai yang belum selesai | `produksi_log` (jenis `mulai`, `spk_id`, `item_idx`, `mesin`, `operator`) |
| Progres item per langkah | Penjumlahan hasil per work center, reject dicabut dari langkah sebelumnya | `produksi_log` (jenis `hasil`, `wc`, `qty`, `reject`) |
| Output dan kapasitas per work center | Hasil per mesin per hari, kapasitas di master | `produksi_log`, `mwc` (`kapasitas`, `mesin`) |
| Kecepatan vendor | Tanggal kirim dan kembali per surat jalan, reject | `vendor` (`tgl`, `riwayat`, `items`) |
| Lama proses per produk | Waktu mulai dan selesai per langkah | `produksi_log` (`mulai`, `selesai`, `menit`) |
| Loading dan unloading | Jam masuk, mulai, dan selesai di antrian Bongkar Muat (sudah ada; Loading dan Unloading, jenis muatan, pihak) | `bongkar` (`jenis`, `muatan`, `pihak`, `jamMasuk`, `jamMulai`, `jamSelesai`); **tidak perlu input baru** |

Migration 14 (`produksi_log`) masih **draf** dan belum diterapkan ke Supabase mana pun.

## 7. Di luar cakupan sekarang

Break atau hold per operasi, reversal material, issue material per operasi (ada di Antlia, sengaja tidak dibawa), kunci perubahan rute per item, reject vendor otomatis kembali ke antrian.

## 8. Ukuran keberhasilan (usulan)

- Operator mencatat satu hasil dalam kurang dari 15 detik tanpa membuka lebih dari satu layar.
- Manajemen dapat menjawab "SPK X sampai mana" dalam satu klik dari SPK Berjalan.
- Laporan harian per mesin tidak lagi diisi manual di Excel.

## 9. Pertanyaan terbuka

- Aturan rute Jointing dan Clamp (hanya Cover yang dikonfirmasi), kapasitas per mesin, dan nama mesin pada seed perlu konfirmasi pemilik.
- Apakah loading dan unloading perlu dicatat per kendaraan atau per pengiriman.

## 10. Status pemenuhan (2026-11-04)

| Kebutuhan | Status | Bukti |
|---|---|---|
| 1. SPK mana yang sedang dikerjakan | Selesai lokal | SPK Berjalan, [[T-177-skema-produksi-tiga-pintu-spk-berjalan]] |
| 2. Progres item, output dan kapasitas per work center | Selesai lokal | SPK Berjalan dan tab Work Center, [[T-178-kinerja-dan-analisa-produksi-tahap-2]] |
| 3. Posisi SPK keseluruhan | Selesai lokal | SPK Berjalan (jalur tiap item, filter status) |
| Tracking vendor keluar, masuk, kecepatan | Selesai lokal | Tab Vendor |
| Analisa per produk dari awal sampai customer | Selesai lokal | Tab Produk |
| Loading dan unloading | Selesai lokal | Tab Pengiriman, dari antrian Bongkar Muat |

Semua `verified in browser` pada mock; belum diuji di Supabase. Migration 14 masih draf.

## 11. Kebutuhan tambahan dari tinjauan (2026-11-04)

1. Tampilan input tidak kaku dan rapi; operator cukup menekan tombol, tanggal dan jam terisi otomatis.
2. Catatan terakhir menyebut nama customer, bukan hanya nomor SPK.
3. Laporan Produksi bisa dianalisa by jumlah, by tonase, dan by kecepatan input dan output.
4. Setiap operator dan setiap mesin terlihat KPI-nya: akumulasi, per hari, per minggu, per bulan, per tahun.
5. Terlihat sudah memproduksi Cable Tray berapa, Cable Ladder berapa, Aksesoris berapa (kelompok), dan rinciannya per type (STU, STC, SLU, SLW, SLHD), Cable Duct, serta material tertentu.
6. Prinsip tetap: input paling mudah, hasil analisa paling lengkap.

| Kebutuhan | Pemenuhan | Bukti |
|---|---|---|
| 1 | Tata letak dua kolom; Selesai satu ketukan; Catat hanya jumlah | [[T-179-produksi-hari-ini-v2-dan-laporan-produksi]] |
| 2 | Kolom SPK dan customer pada catatan terakhir | M-123 |
| 3 | Laporan Produksi: Jumlah, Tonase, Kecepatan | M-114 sampai M-115 |
| 4 | Akumulasi hari ini, minggu ini, bulan ini, tahun ini, seluruhnya per operator dan mesin | M-119, M-121 |
| 5 | Pohon produk kelompok > type > material dan finishing, plus akumulasi per kelompok | M-112, M-120 |

Klasifikasi produk tidak diisi operator: dibaca dari judul section SPK (misalnya CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED) dan material SPK, lalu disimpan pada kejadian (kolom `kelompok`, `tipe`, `material`, `finishing` di draf migration 14). Kejadian lama diturunkan dari SPK saat dilaporkan.

## 12. Jadwal SPK (Gantt) (2026-11-04)

Permintaan pemilik: papan jadwal seperti timeline proyek untuk SPK yang berjalan, dari tanggal sampai tanggal, dengan bagan Gantt, tetap dengan input yang semudah mungkin.

| Kebutuhan | Pemenuhan | Bukti |
|---|---|---|
| Lihat SPK berjalan sebagai garis waktu | Tab Jadwal pada SPK Berjalan: batang rencana, produksi, vendor, pengiriman, due date, hari ini | M-129 |
| Mudah dibaca | Status warna (Telat, Berisiko telat), perkiraan selesai, skala minggu dan bulan | M-130, M-132 |
| Rincian per item | Ketuk nama SPK untuk jadwal tiap item | M-131 |
| Input tetap mudah | Tidak ada kolom isian di jadwal; batang mengikuti Mulai, Selesai, Catat, vendor, dan pengiriman | M-129, M-135 |
| Nyaman di HP | Garis waktu bergulir di kotaknya sendiri, kolom nama menempel | M-136 |

Mesin hitung: `src/lib/produksi/jadwal.js` (uji J-01 sampai J-17). Rancangan: [[RUTE_PRODUKSI]] bagian 21; tugas [[T-180-jadwal-spk-gantt]].
