---
type: runbook
status: active
updated: 2026-11-03
---

<img src="assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# Impor data awal (master dan stok awal)

Panduan memasukkan data awal ke sistem lewat **Impor CSV** (Master Data, tombol *Impor CSV*, khusus super admin). Ini bagian dari gerbang go-live G2 di [[RENCANA_ADOPSI]] dan melengkapi pemetaan workbook (T-033, T-034). Aturan data nyata: workbook mentah tetap di `data/private-sources/` (diabaikan Git); jangan menyalin data bisnis ke Git, vault, atau screenshot.

## Urutan impor

Impor berurutan, satu jenis per kali. Master dulu karena dipakai sebagai pilihan di formulir.

| Urutan | Jenis | Kolom wajib | Kolom lain |
|---|---|---|---|
| 1 | Vendor finishing | `nama` | `proses`, `pic`, `telp`, `email`, `alamat` |
| 2 | Customer | `nama` | `kota`, `npwp`, `pic`, `telp`, `email`, `alamat` |
| 3 | Supplier | `nama` | `kota`, `npwp`, `material`, `pic`, `telp`, `email`, `alamat` |
| 4 | Armada | `nopol` | `jenis`, `driver`, `milik` |
| 5 | Item bahan baku + stok awal | `item`, `ukuran` | `satuan`, `buffer`, `stok_awal`, `tanggal_stok_awal` |
| 6 | Item barang jadi + stok awal | `kategori`, `ukuran` | `type`, `panjang`, `finishing`, `tebal`, `satuan`, `stok_awal`, `tanggal_stok_awal` |

## Langkah

1. Di **Master Data**, klik **Impor CSV**, pilih jenis data, klik **Unduh templat CSV**.
2. Isi templat di Excel (hapus baris contoh), simpan sebagai **CSV**. Pemisah koma atau titik koma sama-sama diterima; angka desimal boleh memakai koma.
3. Pilih berkas CSV atau tempel isinya. **Pratinjau** menampilkan: baris siap, dilewati, dan bermasalah beserta nomor barisnya.
4. Perbaiki baris bermasalah di berkas sampai pratinjau bersih, lalu klik **Impor**. Selama masih ada baris bermasalah, tidak ada yang diimpor sama sekali.
5. Catat jumlah baris per jenis dan cocokkan dengan jumlah di sumber (rekonsiliasi, T-035).

## Aturan

- **Tidak menimpa dan tidak menghapus.** Baris yang sudah ada di sistem (nama atau item yang sama) dan baris ganda dalam berkas dilewati.
- Stok awal ditulis sebagai `stok_awal` pada item dengan `tanggal_stok_awal` (format `TTTT-BB-HH`; kosong = hari ini). Pastikan tanggalnya adalah tanggal cut-off resmi dari owner data (keputusan D-02).
- Maksimal 2000 baris sekali impor.
- Setiap impor tercatat di log aktivitas.
- Ambil cadangan sebelum impor besar ([[BACKUP_RESTORE]]).
- Kesalahan yang sudah terlanjur masuk dikoreksi lewat menu normal (ubah item, atau opname untuk stok); bukan lewat impor ulang.

## Yang menunggu hasil walkthrough

Pemetaan kolom dari enam workbook asli ke templat ini (T-033) bergantung pada keputusan sumber resmi, cut-off, dan aturan identitas item (D-02 sampai D-05 di [[DISCOVERY_AGENDA]]). Alat impornya sudah siap; isi dan urutan sumbernya menunggu keputusan itu.
