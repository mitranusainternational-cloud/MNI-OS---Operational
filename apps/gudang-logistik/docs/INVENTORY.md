# Inventaris fitur aplikasi

File awal: `MNI Gudang & Logistik.html`.

## Navigasi dan dashboard

- Dashboard operasional, status koneksi, tema terang/gelap/otomatis, dan navigasi responsif.
- Cek data untuk menampilkan isu kualitas data.
- Kinerja tim dan pengguna disembunyikan selama `ROLE_ON` bernilai `false`.

## Gudang

- Gudang bahan baku: stok, mutasi, opname, kartu stok, buffer, usulan pembelian, dan ekspor.
- Gudang barang jadi: pencatatan dan pemantauan stok barang jadi.
- Master item, kategori, grup, satuan, supplier, vendor, customer, armada, dan work center.

## Alur produksi dan logistik

- Monitoring SPK dan editor dokumen SPK.
- Dashboard produksi berdasarkan work center.
- Pengiriman ke vendor finishing dan pencatatan hasil kembali.
- Pengiriman ke customer.
- Antrean bongkar muat, langkah proses, koreksi, dan checklist.

## Dokumen dan data

- Ekspor CSV, Excel, PDF, serta tampilan cetak untuk dokumen tertentu.
- Data dan autentikasi bergantung pada adapter runtime Claude.
- Data ditarik melalui listener koleksi; bukan penyimpanan lokal browser.

## Batasan yang perlu diketahui

- Membuka halaman di browser lokal tidak menghubungkan database bersama.
- Peran pengguna belum diaktifkan (`ROLE_ON=false`).
- Tidak ada backend mandiri atau skema migrasi database di paket HTML sumber.
- Font dan beberapa pustaka ekspor dimuat dari CDN saat fitur terkait dipakai.
