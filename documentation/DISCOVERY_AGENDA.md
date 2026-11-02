---
type: agenda
status: proposed
updated: 2026-11-02
---

# Agenda sesi discovery dengan tim Operasional

Agenda ini menyiapkan tugas [[tasks/T-030-walkthrough-proses-dengan-process-owner|T-030]] (walkthrough proses), [[tasks/T-032-konfirmasi-owner-dan-cut-off-enam-workbook|T-032]] (owner dan cut-off workbook), [[tasks/T-031-pilih-pilot-pertama-dan-acceptance-criteria|T-031]] (pilot dan kriteria terima), dan [[tasks/T-036-tentukan-user-dan-role-awal|T-036]] (user dan role awal). Jalur ini menentukan kecepatan go-live ([[GO_LIVE_PLAN]]), jadi sesi sebaiknya dijadwalkan dalam minggu yang sama.

Status: **usulan**. Tanggal, peserta, dan undangan belum dibuat; pemilik proyek yang menjadwalkan. Aturan pencatatan mengikuti [[OPERATIONAL_DISCOVERY]]: pisahkan `Observed`, `Interpretation`, `Assumption`, `Proposed`, dan `Approved`.

## 1. Tujuan dan hasil

| Hasil yang harus ada setelah semua sesi | Tugas | Dicatat di |
|---|---|---|
| Alur kerja aktual SPK sampai pengiriman, gudang bahan baku, dan gudang barang jadi, lengkap dengan pengecualian dan kontrol | T-030 | [[OPERATIONAL_DISCOVERY]] memakai [[templates/PROCESS_DISCOVERY_TEMPLATE]] |
| Owner, periode/cut-off, sumber resmi, dan frekuensi pembaruan untuk enam workbook | T-032 | [[DATA_SOURCE_CATALOG]] |
| Satu alur pilot, kriteria terima terukur, dan batas lingkupnya | T-031 | [[OPERATIONAL_DISCOVERY]] memakai [[templates/REQUIREMENT_TEMPLATE]] |
| Daftar user dan role awal (disimpan di luar Git) | T-036 | [[documentation/DECISIONS]] hanya mencatat aturan role, bukan nama |
| Keputusan atas isu data terbuka DQ-PPIC-001 sampai DQ-SPK438-001 | T-032, T-033 | [[DATA_SOURCE_CATALOG]] |

## 2. Peserta (peran, bukan nama)

| Peran | Dibutuhkan di sesi | Alasan |
|---|---|---|
| Pemilik proses Operasional (pengambil keputusan) | Semua | Menyetujui pilot, definisi, dan kriteria terima |
| PPIC / perencana produksi | 1, 3, 4 | Pemilik dashboard PPIC dan alur SPK |
| Staf gudang bahan baku | 2, 3 | Stok, mutasi, opname, buffer |
| Staf gudang barang jadi dan pengiriman | 2, 3 | Mutasi barang jadi, surat jalan, bongkar muat |
| Pemilik workbook (bila berbeda dari PPIC) | 3 | Otoritas data dan perbaikan formula |
| Kepala produksi / work center | 1 | Pencatatan progres per work center |
| Fasilitator proyek (pencatat) | Semua | Mengisi template secara langsung |

## 3. Aturan sesi

1. **Hanya mengamati dan bertanya.** Jangan mengubah workbook atau sistem sumber.
2. **Satu contoh nyata per alur**, diperagakan oleh orang yang mengerjakannya, bukan dijelaskan secara umum.
3. **Jangan menyalin data operasional ke vault, Git, atau screenshot.** Catat struktur dan aturan, bukan baris bisnis. Contoh memakai data sintetis atau disamarkan.
4. **Prototipe hanya pemicu diskusi.** Layar dari [[LOCAL_PREVIEW]] boleh ditampilkan di akhir sesi sebagai bahan tanggapan; fitur dan schema yang ada belum disetujui dan tidak otomatis menjadi kebutuhan.
5. **Setiap keputusan dicatat dengan tanggal, pemilik, dan status** (`Approved`, `Needs clarification`, `Deferred`).
6. Rekam hanya bila semua peserta setuju; catatan tertulis tetap sumber utama.

## 4. Persiapan sebelum sesi

- [ ] Pemilik proyek menetapkan tanggal, peserta, dan media; undangan dikirim oleh pemilik proyek.
- [ ] Peserta membawa/menyiapkan akses ke enam workbook di [[DATA_SOURCE_CATALOG]] untuk ditampilkan di layar (tanpa dikirim ulang).
- [ ] Pemilik proses menyetujui apakah SPK 438 boleh dipakai sebagai contoh sesi 1 (DQ-SPK438-001); bila tidak, pilih SPK lain yang mewakili.
- [ ] Fasilitator menyalin [[templates/PROCESS_DISCOVERY_TEMPLATE]] satu per alur dan menyiapkan tabel keputusan (bagian 6).
- [ ] Fasilitator membuka [[OPERATIONAL_DISCOVERY]] untuk mengisi register proses dan sumber data langsung.

## 5. Susunan sesi

Total sekitar 5,5 jam, dapat dibagi dalam 2 hari. Durasi adalah usulan.

### Sesi 1 — Alur SPK sampai pengiriman (90 menit) → T-030

| Menit | Topik | Hasil |
|---|---|---|
| 0–10 | Tujuan sesi, aturan, perkenalan peran | Kesepahaman cakupan |
| 10–50 | Peragaan satu SPK dari awal: terbit, revisi, produksi per work center, vendor finishing, siap kirim, surat jalan | Langkah, aktor, handoff, dokumen |
| 50–70 | Pengecualian: revisi, keterlambatan, reject vendor, kirim sebagian | Variasi dan kontrol |
| 70–85 | Masalah harian dan alat bantu (workbook, WhatsApp, kertas) | Friksi, bukti |
| 85–90 | Ringkas dan konfirmasi catatan | Status `Observed` |

### Sesi 2 — Gudang bahan baku dan barang jadi (90 menit) → T-030

| Menit | Topik | Hasil |
|---|---|---|
| 0–30 | Penerimaan material: dokumen, pengecekan, pencatatan, lokasi | Alur dan kontrol |
| 30–55 | Pemakaian produksi: kaitan ke SPK, siapa meminta dan menyetujui | Aturan pengeluaran |
| 55–75 | Barang jadi masuk dan keluar, hubungan ke surat jalan | Aturan mutasi |
| 75–90 | Opname, selisih, buffer, dan usulan pembelian | Aturan koreksi dan titik pesan ulang |

### Sesi 3 — Sumber data dan otoritas (60 menit) → T-032

| Menit | Topik | Hasil |
|---|---|---|
| 0–25 | Enam workbook: siapa pemilik, kapan diperbarui, mana sumber resmi | Kolom owner, as-of, frekuensi |
| 25–45 | Isu terbuka DQ-RM-001, DQ-PPIC-002, DQ-FG-001, DQ-FG-002 | Aturan key, revisi, tanggal, SKU |
| 45–60 | Formula error (DQ-PPIC-001): siapa memperbaiki dan kapan | Pemilik tindakan |

### Sesi 4 — Prioritas, pilot, dan kriteria terima (60 menit) → T-031

| Menit | Topik | Hasil |
|---|---|---|
| 0–20 | Daftar masalah dari sesi 1–3, urutkan menurut dampak | Prioritas |
| 20–40 | Pilih **satu** alur pilot dan batasnya (tanpa membuka semua modul) | Pilot dipilih |
| 40–55 | Tulis kriteria terima terukur dan skenario uji | Draf requirement |
| 55–60 | Siapa yang menyetujui dan kapan UAT | Penanggung jawab |

### Sesi 5 — User dan role awal (30 menit) → T-036

| Menit | Topik | Hasil |
|---|---|---|
| 0–15 | Siapa saja user awal dan perannya (admin, manager, gudang, produksi, viewer) | Daftar role |
| 15–30 | Siapa boleh mengubah apa; siapa hanya melihat | Matriks role usulan |

Daftar nama dan email disimpan di luar Git.

## 6. Pertanyaan kunci per topik

### Alur SPK
- Siapa membuat SPK, dari dokumen apa (PO, kontrak), dan siapa menyetujui sebelum terbit?
- Apa yang memicu revisi SPK dan siapa yang boleh merevisi? Apa isi catatan revisi?
- Bagaimana progres produksi dicatat (per item, per work center, per hari)? Siapa yang mencatat?
- Kapan barang dikirim ke vendor finishing, bagaimana kembalinya dicatat, dan apa yang terjadi bila reject?
- Apa definisi "selesai", "siap kirim", "terlambat", dan "jatuh tempo"?
- Kapan surat jalan dibuat dan siapa yang menandai berangkat dan diterima customer?

### Gudang
- Bagaimana stok awal ditetapkan dan kapan terakhir dihitung fisik?
- Pemakaian bahan baku wajib dikaitkan ke SPK? Bagaimana pemakaian non-SPK dicatat dan disetujui?
- Bagaimana buffer dan titik pesan ulang ditentukan, dan siapa yang membuat pembelian?
- Bagaimana selisih opname ditangani: siapa menyetujui koreksi?
- Apa kode atau identitas unik tiap item (SKU, varian)? Apakah dua baris dengan atribut sama memang dua item berbeda?

### Data dan workbook
- Untuk tiap workbook: siapa pemilik, kapan diperbarui, apa tanggal cut-off resmi, dan mana versi yang berlaku?
- Apa grain `monitoring display` (satu baris per SPK, per revisi, atau per item)? Apa arti baris tanpa nomor SPK?
- Aturan tanggal pada transaksi barang jadi: apakah tanggal kosong berarti sama dengan baris di atasnya? Tahun dan format apa yang benar?
- Mana sumber resmi saldo bahan baku saat file raw dan tab dashboard berbeda?
- Siapa memperbaiki formula error dan fungsi warna (`hitungwarna`), dan apakah ada add-in yang dipakai?

### Pilot dan penerimaan
- Masalah mana yang paling merugikan waktu atau uang minggu ini, dan alur mana yang bisa dibuktikan paling cepat?
- Apa tanda bahwa pilot berhasil (misalnya selisih stok, waktu rekap, keterlambatan terdeteksi)? Berapa baseline-nya sekarang?
- Siapa yang menandatangani penerimaan dan kapan mereka bisa menguji?

### User dan role
- Siapa saja yang perlu masuk di minggu pertama dan apa yang boleh mereka ubah?
- Apakah ada orang yang hanya perlu melihat (manajemen)? Siapa admin dan penggantinya?

## 7. Tabel keputusan (diisi saat sesi)

| ID | Keputusan yang dibutuhkan | Pemilik | Status | Tanggal | Catatan |
|---|---|---|---|---|---|
| D-01 | Alur pilot pertama | Pemilik proses | Open | | |
| D-02 | Sumber resmi saldo bahan baku dan cut-off | Owner data | Open | | |
| D-03 | Identitas SPK (nomor + revisi) dan grain monitoring | PPIC | Open | | |
| D-04 | Aturan tanggal transaksi barang jadi | Gudang barang jadi | Open | | |
| D-05 | SKU/varian barang jadi | Owner data | Open | | |
| D-06 | Perbaikan formula error dan pemiliknya | Pemilik workbook | Open | | |
| D-07 | Apakah SPK 438 dipakai sebagai sampel rekonsiliasi | Pemilik proses | Open | | |
| D-08 | Kriteria terima pilot | Pemilik proses | Open | | |
| D-09 | Daftar user dan role awal | Pemilik proses | Open | | |
| D-10 | Jadwal UAT dan penanggung jawab | Pemilik proses | Open | | |

## 8. Setelah sesi (dalam 24 jam)

1. Rapikan catatan menjadi satu halaman proses per alur dari [[templates/PROCESS_DISCOVERY_TEMPLATE]] dan tautkan dari [[OPERATIONAL_DISCOVERY]].
2. Perbarui [[DATA_SOURCE_CATALOG]] (owner, as-of, frekuensi, status isu DQ) dan salin keputusan penting ke [[documentation/DECISIONS]].
3. Ubah status T-030, T-031, T-032, dan T-036 dengan bukti, lalu jalankan `node scripts/sync-vault.mjs`.
4. Kirim ringkasan untuk dikonfirmasi pemilik proses; tandai item `Needs clarification` yang tersisa.
5. Pemilik proyek menetapkan pilot, lalu T-033 (pemetaan kolom) dan T-034 (skrip impor) dimulai.

## 9. Batas dan risiko

- Agenda ini tidak menjadwalkan siapa pun dan tidak mengirim pesan.
- Jawaban tim adalah sumber kebutuhan; hasil lain di vault (inventaris kode, mapping lama) tetap hipotesis sampai disetujui.
- Bila pemilik proses tidak tersedia, jangan menyimpulkan keputusan dari dokumen; catat sebagai `Needs clarification` dan lanjutkan sesi lain.
