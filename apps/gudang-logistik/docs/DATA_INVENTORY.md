---
type: data-inventory
area: gudang-logistik
status: source-level-only
updated: 2026-11-02
---

# Inventaris data indikatif dari source code

> **Batas penting:** daftar ini diambil dari `COLS` dan pemanggilan database pada `assets/js/app.js`. Ini hanya menunjukkan nama koleksi yang dipakai aplikasi; belum membuktikan skema, isi, kelengkapan, hak akses, atau relasi pada database aktual. Tidak ada record database/Google Sheets yang dibaca untuk catatan ini.

## Koleksi yang ditemukan

Daftar source `COLS` berisi 20 nama: `rm`, `fg`, `mutasi`, `spk`, `vendor`, `kirim`, `bongkar`, `master`, `mvendor`, `mcustomer`, `msupplier`, `marmada`, `rmhist`, `pr`, `opname`, `muser`, `ureq`, `log`, `uinv`, `mwc`.

| Domain indikatif | Koleksi | Contoh field/kegunaan yang disebut source | Perlu diverifikasi |
|---|---|---|---|
| Persediaan | `rm`, `fg` | Item, ukuran/spesifikasi, satuan, buffer/stok awal; barang jadi memuat tipe, panjang, finishing, tebal. | Identitas item, saldo ledger vs saldo awal, satuan baku, lokasi gudang, histori perubahan. |
| Pergerakan & kontrol stok | `mutasi`, `opname`, `rmhist` | Jenis pergerakan, delta/kuantitas, tanggal, nomor dokumen/referensi, stok sistem/fisik, hitungan opname. | Aturan ledger, saldo pembuka, pembatalan/koreksi, penutupan periode, relasi kunci. |
| Produksi | `spk`, `pr` | SPK/items/status/progress dan permintaan pembelian (PR), supplier, jumlah diterima. | Nomor unik, BOM/kebutuhan, status resmi, relasi item dan dokumen sumber. |
| Pengiriman & penerimaan | `vendor`, `kirim`, `bongkar` | Vendor/customer, SPK, item, surat jalan, status, kendaraan, tanggal/waktu, petugas dan catatan. | Alur status, bukti serah-terima, field wajib, pembatalan, privasi sopir/nopol. |
| Master & konfigurasi | `master`, `mvendor`, `mcustomer`, `msupplier`, `marmada`, `mwc` | Pengaturan aplikasi serta referensi vendor, customer, supplier, armada, work center. | Pemilik master, kode unik, duplikasi, histori perubahan, data kontak/alamat. |
| Akses & audit | `muser`, `ureq`, `uinv`, `log` | Source memakai koleksi pengguna/permintaan/invitasi/log aktivitas. | Isi token/invitasi, identitas, role/izin, retensi, audit, redaksi log. |

## Jejak source yang diperiksa

- `assets/js/app.js`: konstanta `COLS` (sekitar baris 52) memuat koleksi yang dilanggan.
- Fungsi `boot()` (sekitar baris 112–135) membaca koleksi melalui listener snapshot.
- `addDoc`, `updDoc`, dan `delDoc` (sekitar baris 136–138) menambahkan metadata waktu/pengguna dan memakai adapter database.
- Banyak pemanggilan tulis menyertakan field operasional; definisi tersebut belum tentu sama dengan schema server.

## Klasifikasi risiko sebelum data digunakan

- **Identitas/personal:** nama pengguna/pemohon, petugas, pengemudi, kontak/PIC.
- **Bisnis terbatas:** data pelanggan/vendor/supplier, stok, order/SPK, harga/kuantitas, surat jalan, catatan transaksi.
- **Keamanan tinggi:** token undangan/sesi, kredensial, akses pengguna, URL bertanda tangan, data autentikasi.

Klasifikasi di atas merupakan hipotesis dari nama/field source. Konfirmasi ke pemilik data dan kebijakan MNI sebelum ekspor, screenshot, masking, atau pemindahan.

## Prosedur saat sumber data aktual diotorisasi

1. Catat file/sistem, owner, URL atau ID internal yang aman, tanggal akses/pembaruan, rentang periode, tabs/collections, dan cakupan data yang dibuka.
2. Buat data dictionary: kolom/field, definisi pemilik, tipe, satuan, nullable, format, primary/business key, referensi, sensitivitas, dan aturan retensi.
3. Periksa kualitas terpilih: nilai kosong, duplikasi key, tipe/format tanggal/angka, kode/satuan, referensi tak cocok, status invalid, dan jumlah yang tidak seimbang.
4. Cocokkan secara end-to-end, misalnya SPK → picking/mutasi bahan baku → hasil produksi → barang jadi → kirim, hanya bila alur tersebut terbukti dipakai MNI.
5. Bandingkan total dengan laporan kontrol/pemilik; simpan definisi formula dan waktu snapshot, bukan hanya hasil agregat.
6. Gunakan salinan terbatas yang disetujui atau data sintetis; jangan commit file operasional ke repository.
7. Pisahkan kolom `Observed`, `Interpretation`, `Recommendation`, dan `Owner validation` pada hasil riset.

## Belum diketahui

- Apakah daftar koleksi ini ada dengan nama yang sama di database produksi/staging.
- Struktur kolom lengkap, indeks, aturan tenant/site, kebijakan akses, dan histori audit server.
- Workbook Sheets yang berlaku, sumber kebenaran, isi formulas, dan hubungan dengan koleksi aplikasi.
- Kebenaran workflow bisnis dan status yang terlihat dari kode.

## Tautan

- [[research/2026-11-02-obsidian-project-workspace-best-practice|Riset praktik workspace dan penggunaan data]]
- [[research/2026-11-02-erp-rationalization-best-practice|Metode discovery umum untuk sistem custom]]
- [[documentation/PROJECT_PROGRESS|Progress dan batas akses]]
