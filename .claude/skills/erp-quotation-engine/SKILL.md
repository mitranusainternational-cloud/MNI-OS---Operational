---
name: erp-quotation-engine
description: Aturan membangun dan merawat mesin harga dan estimasi penawaran (berat estimasi dan real, harga satuan, subtotal, diskon, PPN, biaya saat PO) dari workbook penawaran, dengan katalog rumus, parameter per skenario, dan uji emas. Gunakan sebelum menulis atau mengubah kode di apps/platform/src/lib/erp.
---

# Mesin harga dan estimasi

## Prinsip
- **Satu mesin untuk berat dan harga.** Workbook penawaran memakai model rumus yang sama dengan kalkulator berat (6 keluarga × 32 bentuk = 192 produk): berat rel dan anak tangga, dua versi (ESTIMASI dengan tebal estimasi dan waste sekitar 1,1; REAL dengan tebal real dan waste sekitar 1,0). Harga satuan = berat estimasi × harga per kg, dibulatkan ke ratusan, ditambah jumlah baut × harga baut untuk aksesori. Gunakan ulang `src/lib/berat/{formula,engine,parser}.js`; tambahkan lapisan harga di `src/lib/erp/`.
- **Rumus tidak ditulis ulang manual.** Katalog diambil dari workbook (skill `excel-model-extraction`) dan dievaluasi mesin. Workbook diperbarui, katalog dibangun ulang.
- **Parameter terpisah dari rumus.** Harga per kg, tebal estimasi dan real, massa jenis (baja 7,85; SS304 sekitar 7,91; aluminium 2,71), waste, harga baut, diskon, PPN, margin target adalah **skenario harga** (satu kumpulan parameter). Tiga sheet workbook adalah tiga skenario, bukan tiga model. Di sistem: satu penawaran memilih satu skenario atau lebih (varian A, B, C).
- **Tidak ada angka tebakan.** Masukan kurang atau rumus galat menghasilkan `null` dengan alasan, bukan 0. Bagi nol (qty kosong) tidak boleh menghasilkan angka aneh seperti di workbook.
- **Estimasi lawan real** adalah fitur, bukan galat: selisih berat dan biaya dipantau (skill `erp-flow-hulu-hilir`).

## Data sensitif
Rumus dan harga adalah milik perusahaan dan repo bersifat publik. Katalog dan skenario harga **tidak dikemas di berkas JavaScript publik**; simpan terkompresi di tabel `master` (kunci mis. `katalog_harga`, `skenario_harga`) dan muat setelah login, meniru `katalog_berat`. Fixture uji dari angka nyata berada di `data/private-sources/`; uji CI memakai fixture sintetis.

## Uji wajib
1. **Uji emas** terhadap nilai tersimpan Excel untuk setiap bentuk (kg estimasi, kg real, harga satuan) dengan selisih sama dengan pembulatan.
2. Uji skenario: ganti parameter, hasil berubah sesuai rumus; tebal, harga per kg, dan waste tidak tertukar antar keluarga (ladder memakai kolom parameter sendiri, tray memakai kolom lain).
3. Uji total: subtotal, diskon, dasar PPN, PPN, total, dibulatkan konsisten; revisi tidak mengubah nomor penawaran.
4. Uji `null`: masukan tidak dikenali, dimensi kurang, qty 0.
Jalankan juga `npm run test:berat` dan regresi penuh (skill `e2e-regression`) bila adapter atau UI tersentuh.

Rujukan: [[documentation/ERP_QUOTATION_ANALISIS]], [[documentation/KALKULATOR_BERAT]].
