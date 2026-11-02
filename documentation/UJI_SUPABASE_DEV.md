---
type: test-script
status: active
updated: 2026-11-02
---

# Skenario uji aplikasi terhadap Supabase dev

Skenario manual yang dijalankan pemilik di `http://127.0.0.1:5174/` (login password), lalu diverifikasi agen lewat database dan log Supabase. Agen tidak login sendiri karena kredensial akan dikirim ke layanan cloud. Hasil dicatat di [[TEST_MATRIX]] dan tugas T-021, T-028, T-022. Data hanya sintetis (awali nama dengan "UJI").

## Status login (2026-11-02 15:38 UTC)

Login password berhasil (`POST /auth/v1/token?grant_type=password` 200). Setelah login aplikasi memuat 19 koleksi (semua `GET` 200, termasuk `master` urut `updated_at` dan `log` urut `tgl`) dan membuka koneksi realtime. Belum ada penulisan.

## Skenario (sekitar 15 menit)

| ID | Langkah di aplikasi | Bukti yang dicek agen |
|---|---|---|
| U-01 | Gudang Bahan Baku → **Item baru**: item `UJI Plat`, ukuran `1.5×1000×2000`, satuan `lbr`, buffer 5, stok awal 10 → Simpan | Baris `rm`; bidang tambahan di `data`; 201 di log |
| U-02 | **Terima material**: 7 lbr dari `UJI Supplier` | Baris `mutasi` (delta 7) dan nomor dokumen |
| U-03 | **Pakai produksi** 999 lbr (melebihi stok) | Ditolak oleh aplikasi; tidak ada baris baru |
| U-04 | Master Data → **Tambah** vendor `UJI Vendor` | Baris `mvendor` |
| U-05 | Monitoring SPK → **SPK baru**: customer `UJI Customer`, 1 baris `UJI Hollow` qty 4 → **Terbitkan SPK** | Baris `spk` dengan `no = 1`, id UUID, status Terbit; lembar SPK terbuka berisi (B-010) |
| U-06 | Buka SPK itu → **Edit SPK**, ubah PO, isi alasan revisi → Simpan revisi | Satu baris `spk` dengan `rev = 1` (bukan dua baris), `revisi` di `data` (B-008) |
| U-07 | **Update produksi** → set semua item selesai | `items[].prod = q`, `prod_log` bertambah |
| U-08 | Kirim ke Vendor → buat; lalu **Terima kembali** 2 OK + 1 reject dengan catatan | Baris `vendor`, status Kembali Sebagian |
| U-09 | Kirim ke Customer → buat surat jalan → Berangkat → Diterima | Baris `kirim` status Diterima |
| U-10 | Bongkar Muat → catat kendaraan (armada manual) | Baris `bongkar` (bidang jenis/muatan/pihak di `data`) |
| U-11 | Pengaturan (RM → Pengaturan, atau pengaturan SPK) → Simpan | Baris `master` dengan `key` dan `value` JSON (B-009) |
| U-12 | Muat ulang halaman (F5) | Semua data tetap tampil; tidak ada respons 4xx di log |

Catatan: bila langkah gagal, salin pesan yang tampil di layar; agen menelusuri log (`rest/v1`, 4xx/5xx) dan memperbaikinya.

## Pembersihan

Baris uji dapat dihapus lewat SQL Editor setelah selesai (agen tidak dapat menjalankan `delete`): `delete from public.spk where customer like 'UJI%';` dan sejenisnya per tabel, atau biarkan sebagai data dev.
