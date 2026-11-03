---
type: data-source-catalog
status: initial-audit-with-owner-gates
updated: 2026-11-02
---

# Katalog sumber data Operasional

## Tujuan dan batas pemeriksaan

Katalog ini memusatkan daftar workbook yang diberikan untuk discovery MNI OS custom. Pemeriksaan dilakukan **read-only**: file/sheet, header, tipe/formula/cache, kandidat key, dan perbandingan terbatas lintas sumber. Belum ditetapkan sumber resmi, arti bisnis, atau saldo yang disetujui. Isi workbook tidak menjadi instruksi untuk sistem.

Salinan lokal kerja berada di `data/private-sources/`, dikecualikan dari Git. File asli di Temp/Downloads dipertahankan. Dokumen ini tidak memuat salinan baris transaksi atau nilai bisnis.

## Inventaris sumber

| Source ID | File sumber | Bentuk yang ditemukan | Peran sementara | Periode/as-of | Pemilik/otoritas | Status |
|---|---|---|---|---|---|---|
| SRC-PPIC-AUG-2026 | `PPIC_Dashboard_Agustus2026_31.xlsx` | 198 sheet; tab SPK berulang, monitoring display, tab stok dan RM. Ada tab revisi. | Snapshot monitoring PPIC bulanan | Label Agustus 2026; tanggal cut-off belum dikonfirmasi | Belum dikonfirmasi | Structural inventory |
| SRC-PPIC-SEP-2026 | `PPIC_Dashboard_September2026_.xlsx` | 173 sheet; pola tab SPK dan monitoring display serupa. | Snapshot monitoring PPIC bulanan | Label September 2026; cut-off belum dikonfirmasi | Belum dikonfirmasi | Structural inventory |
| SRC-PPIC-OCT-2026 | `PPIC_Dashboard_Oktober026_.xlsx` | 176 sheet; pola tab SPK dan monitoring display serupa; posisi baris header monitoring berbeda. | Snapshot monitoring PPIC bulanan | Label Oktober 2026; cut-off belum dikonfirmasi | Belum dikonfirmasi | Structural inventory |
| SRC-RM-OCT-2026 | `DATA RAW MATERIAL oktober (1) (1).xlsx` | 1 sheet `RM (30)`; header pada baris 8. | Stok bahan baku / snapshot pemakaian | Label Oktober; tanggal cut-off perlu dikonfirmasi | Belum dikonfirmasi | Structural inventory |
| SRC-FG-2026 | `Stock Barang 2026 (1).xlsx` | 3 sheet: `Straight`, `Transaksi - Sep`, `Transaksi - Okt`. | Master produk straight dan mutasi barang jadi | 2026; tanggal saldo awal/cut-off belum dikonfirmasi | Belum dikonfirmasi | Structural inventory |
| SRC-SPK-438 | `SPK 438 - PT TRIAS SENTOSA Tbk.xlsx` | 1 sheet `SPK 438`; detail item dan progress tahap. | Dokumen SPK individual untuk menelusuri kebutuhan detail | Tanggal order/cut-off belum dikonfirmasi | Belum dikonfirmasi | Structural inventory |

Metadata workbook yang diperiksa tidak menunjukkan external-link workbook. Itu tidak membuktikan bahwa nilai/data sudah benar atau formula dihitung ulang.

## Struktur yang teramati

### Monitoring PPIC dan SPK

- Ketiga dashboard bulanan memiliki tab `monitoring display` dengan kolom inti seputar nomor/tanggal, customer, PO/SPK, material/finishing, spesifikasi, estimasi kebutuhan material, pengadaan, lead time, aktual kirim, status, progress, dan alasan keterlambatan.
- Baris header `monitoring display` ada di baris 8 pada Agustus/September dan baris 9 pada Oktober. Ini harus ditangani saat impor; jangan mengasumsikan posisi header seragam.
- Tab detail SPK mengulang pola header item, qty/satuan, berat, produksi/finishing/vendor, pengiriman, kekurangan, progress, dan catatan. Ada variasi nama kolom antar file/tab.
- Nama tab revisi ada. Pencocokan awal berdasarkan nomor dari nama sheet menghasilkan beberapa nomor SPK berulang; identitas kanonis perlu memasukkan revisi dan/atau identitas dokumen sebelum snapshot dibandingkan.
- SPK 438 ditemukan sebagai tab pada ketiga snapshot PPIC dan juga tersedia sebagai workbook individual. Ini kandidat yang bagus untuk walkthrough/reconciliation pertama bila disetujui pemilik proses; belum otomatis dipilih sebagai pilot.
- Workbook individual SPK 438 dan tab dashboard memiliki variasi layout/header tahap. Bandingkan line item dan checkpoint secara field-aware; jangan menganggap copy identik atau menjumlah snapshot bulanan.

### Raw material dan stok barang jadi

- Sheet `RM (30)` memakai kolom seperti nomor, tanggal, item, ukuran, buffer stok, stok, dan satuan; versi di dashboard juga menunjukkan kolom tambahan tentang data 3 bulan terakhir.
- Perbandingan kandidat `ITEM + UKURAN`: file raw material memiliki 23 key, sedangkan setiap tab `RM (30)` dashboard memiliki 22. Ketiga dashboard sama satu sama lain pada 22 key dan field tanggal/buffer/stok/satuan yang dibandingkan. Ada satu key hanya di file raw material dan tidak ada key dashboard-only.
- Pada 22 key bersama, `BUFFER STOK` dan `SATUAN` cocok; `STOK` berbeda pada 11 key; satu pasangan tanggal berbeda. Tidak ada nilai item/kuantitas yang dicantumkan di vault. Ini selisih snapshot, bukan penentuan sumber resmi atau bukti nilai mana yang benar; cut-off dan owner belum dikonfirmasi.
- Sheet `Straight` memuat atribut produk seperti tipe, ukuran, panjang, finishing, ketebalan, kuantitas, dan satuan.
- Sheet transaksi September/Oktober memakai kolom tanggal, klasifikasi/type, ukuran, ketebalan, finishing, masuk, keluar, dan keterangan. Tipe/kelengkapan tanggal telah diprofilkan di bawah; saldo belum dihitung atau direkonsiliasi.

## Audit read-only lanjutan — 2026-11-02

Audit memakai dua pembacaan workbook: formula dan hasil formula yang tersimpan. Tidak ada nilai transaksi/kuantitas yang ditulis ke vault. Profiling dibatasi pada kolom sumber yang relevan; sheet yang memiliki area format sangat lebar diperiksa sampai kolom BH. Mismatch kunci di bawah ini bersifat kandidat karena aturan grain dan revisi belum disahkan.

### Dashboard PPIC

| Snapshot | Sheet | Formula yang diperiksa | Hasil formula error tersimpan | Header monitoring | ID unik tab SPK / monitor | Duplikat key monitor | Monitor tanpa tab / tab tanpa monitor |
|---|---:|---:|---|---:|---:|---:|---:|
| Agustus | 198 | 8.234 | 13: 6 `#REF!`, 4 `#NAME?`, 3 `#VALUE!` | Baris 8 | 176 / 181 | 3 | 6 / 1 |
| September | 173 | 6.013 | 17: 13 `#REF!`, 4 `#NAME?` | Baris 8 | 155 / 154 | 3 | 6 / 7 |
| Oktober | 176 | 6.085 | 6: 3 `#REF!`, 3 `#NAME?` | Baris 9 | 158 / 151 | 1 | 2 / 9 |

Rincian dan batas:

- Formula yang diperiksa memiliki hasil cache tersimpan; error di atas adalah hasil formula error, bukan sekadar formula tanpa hasil cache.
- `#REF!` mencakup referensi rusak langsung dan formula turunan. Contoh lokasi: `SPK 393!H18` pada ketiga snapshot; tab `monitoring display` juga berisi `#REF!`.
- `#NAME?` ditemukan pada `hitungwarna` dan `hitungwarnahijau` di `monitoring display`. Nama tersebut tidak didefinisikan dalam workbook. Ketergantungan add-in/fungsi luar belum diketahui.
- `#VALUE!` Agustus muncul pada formula perhitungan turunan di `monitoring display` (`N229`, `Q229`, `S229`). Input yang memicu error perlu diperiksa bersama pemilik file.
- Ada baris terisi tanpa nomor SPK (61/245 Agustus, 66/223 September, 44/196 Oktober). Sebagian dapat berupa baris judul/catatan/kelompok; belum diklasifikasikan sebagai transaksi.
- Kunci nomor monitor vs nama tab belum cocok 1:1. Normalisasi nomor saja tidak membedakan revisi, data lama, atau perbedaan grain. Jangan menghapus atau menggabungkan data berdasarkan angka ini sebelum owner menetapkan aturan.

### Raw material

- `DATA RAW MATERIAL oktober (1) (1).xlsx` berisi 23 baris dengan `ITEM`. Pada baris berkunci itu, `UKURAN`, `BUFFER STOK`, `STOK`, dan `SATUAN` terisi; buffer dan stok tersimpan sebagai angka bulat, tanpa nilai negatif pada kolom tersebut; tidak ada duplikat kandidat `ITEM + UKURAN`.
- Hasil ini hanya kelengkapan format dan pemeriksaan tanda angka. Sumber resmi, satuan bisnis, tanggal efektif, saldo aktual, serta kecocokan dengan tab RM dashboard belum direkonsiliasi.

### Master dan transaksi barang jadi

- `Straight` memiliki 60 baris kandidat produk dengan kuantitas numerik dan tanpa nilai negatif. Satu kombinasi `Type + Size + Length + Finishing + Thickness` berulang pada baris 14 dan 69. Tanpa kode produk, belum diketahui apakah ini duplikasi master atau dua identitas bisnis yang berbeda.
- `Transaksi - Sep` memiliki 66 baris kandidat dan `Transaksi - Okt` 38. Nilai `Masuk`/`Keluar` yang terisi berupa angka dan tidak negatif; satu baris tidak mengisi kedua kolom sekaligus.
- Tanggal kosong terdapat pada 48/66 baris September dan 28/38 Oktober. Semua baris bertanggal kosong muncul setelah baris yang memiliki tanggal di tab yang sama. Ini konsisten dengan kemungkinan pengelompokan tanggal, tetapi aturan carry-forward harus disahkan sebelum impor.
- Tanggal September bercampur antara enam nilai tanggal Excel dan dua belas nilai teks. Oktober memiliki sepuluh tanggal teks. Perlu normalisasi format setelah aturan tanggal dan tahun dikonfirmasi.
- Tidak ada pemeriksaan saldo awal, saldo berjalan, maupun rekonsiliasi transaksi ke stock fisik pada audit ini.

### Rekonsiliasi contoh SPK 438

- SPK 438 ditemukan pada ketiga dashboard dan workbook individual.
- Dua baris item bernomor pada keempat sumber cocok untuk `DESCRIPTION`, `QTY`, dan `Satuan`.
- Ini membuktikan kecocokan terbatas pada identitas item yang tercatat dan kuantitas/satuan; bukan pembuktian nilai progress, tanggal milestone, status order, atau otoritas versi.
- Workbook individual dan dashboard memakai struktur kolom/tahap berbeda. Tahap dan tanggal harus dipetakan terpisah; jangan menjumlah salinan snapshot.

### Formula error di luar data master

- Raw material, master/transaksi barang jadi, dan workbook SPK 438 tidak menunjukkan cached formula error pada pemeriksaan ini.
- Error formula yang terdeteksi terkonsentrasi di tiga dashboard PPIC; perbaiki atau terima hanya melalui pemilik workbook dan uji ulang formula sumber. Jangan menyamarkan error dengan angka nol.

## Register isu data terbuka

Status `Open` berarti bukti teknis telah dicatat tetapi aturan/keputusan proses belum disahkan. Isu tidak otomatis menunjukkan kesalahan input.

| Issue ID | Bukti teramati | Keputusan/tindakan untuk owner | Status |
|---|---|---|---|
| DQ-PPIC-001 | Hasil formula error tersimpan 13/17/6 pada dashboard Agustus/September/Oktober; termasuk `#REF!`, `#NAME?`, dan Agustus `#VALUE!`. | Tentukan formula yang harus diperbaiki/diganti, sumber fungsi warna, owner perbaikan, lalu verifikasi ulang hasil pada file sumber. | Open |
| DQ-RM-001 | 22 key bersama: buffer/UOM sama, stok berbeda pada 11, tanggal berbeda pada satu; satu key hanya ada di file raw. | Tetapkan pemilik snapshot, cut-off, sumber resmi per field, dan jelaskan selisih/key yang tidak tercakup; rekonsiliasi tanpa mengubah sumber secara otomatis. | Open |
| DQ-PPIC-002 | Kunci angka `monitoring display` dan tab SPK tidak cocok 1:1 di tiga snapshot; ada duplikat dan baris tanpa nomor SPK. | Definisikan grain, revisi, baris heading/kelompok, dan aturan hubungan monitor ↔ detail SPK sebelum import. | Open |
| DQ-FG-001 | Kombinasi atribut produk `Straight` berulang pada dua baris; kode SKU kanonis belum terlihat. | Owner menetapkan SKU/varian dan memastikan apakah dua baris perlu digabung atau memang identitas terpisah. Jangan hapus baris. | Open |
| DQ-FG-002 | Banyak baris transaksi tidak mengulang tanggal di barisnya; format tanggal juga bercampur. | Sahkan aturan tanggal kelompok, tahun, zona/waktu bila relevan, dan semantik transaksi sebelum normalisasi atau perhitungan saldo. | Open |
| DQ-SPK438-001 | Dua line item cocok pada deskripsi/qty/satuan, sementara struktur tahap antar dokumen berbeda. | Putuskan apakah SPK 438 boleh jadi sampel, lalu sahkan revisi, tanggal, dan pemetaan milestone/status. | Open |

## Temuan struktur yang perlu ditangani

1. **Snapshot bulanan:** dashboard memiliki banyak tab detail, bukan satu tabel SPK yang siap digabung. Perlu model `source file → snapshot date → SPK → revision → line → progress event` agar perubahan per bulan dapat dilacak.
2. **Kunci belum seragam:** nama sheet/nomor SPK belum cukup untuk membedakan revisi, duplikat, dan pembaruan. Pemilik proses perlu menetapkan nomor dokumen, revisi, dan relasi ke PO/customer/order.
3. **Header bergeser:** header tampilan monitoring Oktober bergeser satu baris dibanding dua bulan sebelumnya.
4. **Mutasi vs saldo:** file `Stock Barang 2026` memisahkan master barang dari transaksi bulanan. Hubungan saldo awal + barang masuk − barang keluar belum diverifikasi.
5. **As-of tidak diketahui:** nama file memberi petunjuk periode, tetapi timestamp file lokal bukan tanggal efektif saldo/progress. Setiap snapshot perlu tanggal ekstraksi/cut-off resmi.
6. **Sumber ganda:** raw material muncul sebagai file tersendiri dan tab dashboard; potensi perbedaan perlu dibandingkan berdasarkan key, periode, unit, dan pemilik sumber.
7. **Formula dan data quality:** cached formula errors ditemukan di tiga dashboard PPIC. Error dan cakupannya dirinci di audit lanjutan; koreksi sumber, uji ulang rumus, dan penerimaan owner belum dilakukan.

## Rencana tracking bertahap

### Tahap 1 — Otoritas dan definisi

- [ ] Tetapkan owner dan penggunaan resmi tiap workbook/sheet.
- [ ] Konfirmasi tanggal as-of, frekuensi pembaruan, proses pembaruan, dan versi file yang berlaku.
- [ ] Definisikan entitas serta kunci: SPK/revisi/baris, PO/order, item/material, lokasi/gudang, dan transaksi.
- [ ] Setujui istilah/status tahap produksi, vendor/finishing, pengiriman, stok, buffer, masuk, dan keluar.

### Tahap 2 — Kualitas dan rekonsiliasi

- [x] Inventaris header dan posisi header setiap workbook; catat perbedaan yang terlihat.
- [x] Profilkan tipe nilai, formula/cache error, kandidat key, duplikasi, tanggal kosong/teks, dan nilai negatif pada cakupan kolom yang tercatat di audit.
- [x] Cocokkan dua baris item bernomor SPK 438 lintas empat file untuk deskripsi, qty, dan satuan.
- [x] Bandingkan 22 key raw material yang sama di empat snapshot; selisih jumlah dicatat tanpa menyalin nilai transaksi.
- [ ] Dengan owner, sahkan apakah SPK 438 layak dijadikan contoh kontrol, lalu rekonsiliasi identitas revisi, tanggal, milestone, dan status.
- [ ] Rekonsiliasi satu sampel stok barang jadi dan bahan baku ke transaksi sumber serta saldo yang disetujui.
- [ ] Catat selisih tanpa mengubah workbook sumber; pemilik data memutuskan penyebab dan aturan perbaikannya.

### Tahap 3 — Model monitoring

- [x] Buat [[DATA_DICTIONARY|draft kamus data]] dari label yang teramati; validasi definisi, tipe, key, dan relasi masih menunggu owner.
- [ ] Susun source-to-field map final setelah definisi dan owner disepakati.
- [ ] Rancang event/status historis agar progress SPK dan perubahan stok tidak tertimpa oleh snapshot berikutnya.
- [ ] Rancang daftar pengecualian untuk sumber terlambat, key tidak cocok, revisi ambigu, data tanpa tanggal, dan saldo tidak rekonsiliasi.
- [ ] Review KPI/alert bersama Operasional sebelum dipakai untuk mengambil tindakan.

### Tahap 4 — Pilot lokal dan migrasi bertahap

- [ ] Pilih satu alur prioritas dengan tim Operasional; jangan menetapkan SPK 438 atau stok sebagai pilot tanpa persetujuan.
- [ ] Siapkan fixture lokal yang disamarkan/sintetis; jangan salin workbook operasional ke Git atau browser.
- [ ] Implementasikan local Supabase, Auth/RLS, import provenance, dan monitoring untuk lingkup pilot saja.
- [ ] Cocokkan hasil aplikasi dengan sumber resmi, minta UAT, lalu putuskan scope berikutnya.

## Log akses dan perubahan

| Tanggal | Aktivitas | Sumber/cakupan | Hasil dan batas |
|---|---|---|---|
| 2026-11-02 | Baca metadata sheet, header, tab SPK, dan keberadaan formula secara lokal/read-only | Keenam workbook yang tercantum di atas | Struktur terinventarisasi; belum ada nilai transaksi yang direkonsiliasi atau diubah. |
| 2026-11-02 | Profil formula dan tipe data, cek kandidat key dan baris item SPK 438 | Keenam workbook, kolom sumber terpilih; file asli dan salinan lokal | Formula error PPIC, tanggal bertipe campuran, satu key produk berulang, dan kecocokan dua baris SPK 438 dicatat. Definisi bisnis/saldo/otoritas belum diputuskan. |
| 2026-11-02 | Perbandingan RM lintas snapshot dan pencatatan isu | File raw RM Oktober serta 3 tab `RM (30)` dashboard PPIC | 22 key bersama: buffer/UOM cocok, stok berbeda 11, tanggal berbeda 1; satu key raw-only. Dashboard saling sama. Tidak ada nilai mentah disalin; sumber resmi/cut-off menunggu owner. |

## Tautan

- [[OPERATIONAL_DISCOVERY|Register discovery kebutuhan Operasional]]
- [[DATA_DICTIONARY|Draft kamus data Operasional]]
- [[PROJECT_PROGRESS|Log progress]]
- [[ROADMAP|Roadmap]]
- [[apps/gudang-logistik/docs/PILOT_BRIEF|Hipotesis lama saldo gudang — belum disetujui]]
- [[apps/gudang-logistik/docs/DATA_INVENTORY|Inventaris source aplikasi, terpisah dari data workbook aktual]]
