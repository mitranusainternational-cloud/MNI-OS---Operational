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
| **Kinerja & Analisa** | Tab Work Center (beban dan kapasitas), Vendor (kualifikasi), Laporan harian; Tahap 2: Produk, Pengiriman | Lihat | Kebutuhan 2, analisa |

Rute tersembunyi (masih bisa dibuka lewat alamat): Papan Produksi dan Laporan Produksi. Menu lama Monitoring SPK, Dashboard Produksi, dan Antrian Mesin digantikan tiga menu di atas.

## 6. Pemetaan kebutuhan ke data

| Kebutuhan | Sumber data | Tabel dan kolom |
|---|---|---|
| SPK dan item berjalan | Sesi Mulai yang belum selesai | `produksi_log` (jenis `mulai`, `spk_id`, `item_idx`, `mesin`, `operator`) |
| Progres item per langkah | Penjumlahan hasil per work center, reject dicabut dari langkah sebelumnya | `produksi_log` (jenis `hasil`, `wc`, `qty`, `reject`) |
| Output dan kapasitas per work center | Hasil per mesin per hari, kapasitas di master | `produksi_log`, `mwc` (`kapasitas`, `mesin`) |
| Kecepatan vendor | Tanggal kirim dan kembali per surat jalan, reject | `vendor` (`tgl`, `riwayat`, `items`) |
| Lama proses per produk | Waktu mulai dan selesai per langkah | `produksi_log` (`mulai`, `selesai`, `menit`) |
| Loading dan unloading | Jam mulai dan selesai muat atau bongkar | `bongkar`, `kirim` (perlu dicek; kemungkinan butuh isian jam, T-178) |

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
