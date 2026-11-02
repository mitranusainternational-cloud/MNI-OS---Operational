---
type: application-user-guide
area: gudang-logistik
status: draft-source-level
updated: 2026-11-02
---

# Panduan penggunaan — MNI Gudang & Logistik

> Status panduan: draf orientasi antarmuka berdasarkan navigasi dan source code. Ini bukan SOP gudang yang telah disetujui dan bukan bukti bahwa penyimpanan aktif.

## Membuka aplikasi

Untuk inspeksi UI, jalankan server lokal mengikuti [[apps/gudang-logistik/docs/DEVELOPMENT|panduan pengembangan]] dan buka route aplikasi. Pada header, periksa indikator koneksi. Jika database/runtime menunjukkan tidak tersambung, gunakan halaman hanya untuk inspeksi UI; jangan menginput data transaksi dengan harapan data akan tersimpan.

## Peta menu yang tercatat pada source

Nama dan ketersediaan aktual perlu dicocokkan dengan tampilan pada browser saat screenshot/akses tersedia.

| Kelompok | Area/menu | Kegunaan indikatif dari kode |
|---|---|---|
| Pantauan | Dashboard | Ringkasan gudang, logistik, dan SPK. |
| Gudang | Gudang Bahan Baku | Stok material, mutasi, opname, buffer, dan usulan pembelian. |
| Gudang | Gudang Barang Jadi | Catatan/pemantauan barang jadi. |
| Logistik | Bongkar Muat | Antrean dan pencatatan waktu/status bongkar muat. |
| Logistik | Kirim ke Vendor | Kiriman finishing dan catatan hasil kembali. |
| Logistik | Kirim ke Customer | Persiapan dan status pengiriman pelanggan. |
| Produksi | Monitoring SPK | Pemantauan dan beberapa perubahan dokumen SPK. |
| Produksi | Dashboard Produksi | Ringkasan produksi per work center. |
| Data | Cek Data | Pemeriksaan isu kualitas data. |
| Data | Master Data | Item dan master referensi lain. |

## Cara membaca data dan status

1. Pastikan dulu versi halaman/branch yang sedang dibuka.
2. Amati indikator runtime dan hak akses sebelum menyimpulkan data dapat dibaca atau ditulis.
3. Gunakan `Cek Data` sebagai navigasi pemeriksaan yang tersedia di UI; hasilnya perlu dicocokkan dengan definisi kualitas dari pemilik data.
4. Bedakan tampilan source-level, hasil pembacaan langsung, dan transaksi yang berhasil disimpan.
5. Jika halaman menampilkan loading/error atau koneksi database putus, catat waktu dan screenshot tanpa data personal lalu laporkan; jangan menyebut UI sebagai database.

## Peringatan penggunaan

- Source aplikasi mengandalkan `window.claude` untuk database, identitas pengguna, izin, dan unduhan runtime.
- Mode peran masih `ROLE_ON=false` dalam source saat ini; jangan menganggap RBAC aktif.
- Jangan menguji tambah/ubah/hapus pada data operasional nyata tanpa skenario uji, otorisasi, backup, dan persetujuan pemilik proses.
- Aturan stok, alur approval, definisi status, dan urutan kerja dalam panduan ini perlu disahkan oleh pemilik gudang/logistik sebelum dipakai sebagai instruksi kerja.

## Screenshot dan feedback

Screenshot halaman masih menunggu preview browser yang dapat diverifikasi. Setelah tersedia, tautkan bukti dari [[documentation/screenshots/README|indeks screenshot]]. Catat branch, skenario, tanggal, dan gunakan data sintetis atau yang sudah dianonimkan.

## Dokumen terkait

- [[apps/gudang-logistik/docs/DEVELOPMENT|Panduan pengembangan]]
- [[apps/gudang-logistik/docs/DATA_INVENTORY|Inventaris data dari source code]]
- [[apps/gudang-logistik/docs/INVENTORY|Inventaris fitur]]
- [[apps/gudang-logistik/docs/DECISIONS|Keputusan teknis]]
- [[documentation/PROJECT_PROGRESS|Progress proyek]]
