# Panduan pengembangan

## Struktur

- `apps/gudang-logistik/index.html`: kerangka dokumen dan elemen shell aplikasi.
- `apps/gudang-logistik/assets/css/app.css`: seluruh CSS aplikasi.
- `apps/gudang-logistik/assets/js/app.js`: logika runtime aplikasi.
- `apps/gudang-logistik/docs/`: dokumentasi khusus aplikasi.
- `apps/gudang-logistik/reference/`: salinan HTML sumber untuk pembandingan; jangan edit sebagai versi aktif.

## Jalankan untuk inspeksi

Dari root workspace jalankan `python -m http.server 8000`, lalu kunjungi <http://localhost:8000/apps/gudang-logistik/>. Tanpa runtime Claude, UI dapat dimuat tetapi database, otorisasi, sinkronisasi, dan fasilitas unduhan runtime tidak tersedia.

## Cara mengubah aplikasi

1. Cari tampilan melalui daftar `VIEWS` di `assets/js/app.js`.
2. Fungsi render tampilan berada di registri `B` dan toolbar di `T`.
3. Formulir dan handler aksi menggunakan atribut `data-act`.
4. Pembacaan dan penulisan data melalui helper `addDoc`, `updDoc`, dan `delDoc`; semuanya memerlukan adapter database.
5. Perbarui dokumen di `docs/` jika perubahan mengubah alur atau batas sistem.

## Menyiapkan GitHub

Direktori ini belum memiliki remote. Setelah menentukan repositori tujuan:

```powershell
git init
git add .
git commit -m "Organize MNI warehouse logistics app"
git branch -M main
git remote add origin https://github.com/OWNER/REPOSITORY.git
git push -u origin main
```

Ganti `OWNER/REPOSITORY` dengan alamat repositori yang benar. Tinjau isi commit sebelum push dan hindari file `.env`, data nyata, ekspor operasional, serta kredensial.

## Langkah pengembangan berikutnya

- Tetapkan kontrak backend dan adapter lokal yang aman sebelum mengganti `window.claude`.
- Pisahkan modul JavaScript secara bertahap berdasarkan domain setelah perilaku aplikasi terdokumentasi.
- Tambahkan pemeriksaan otomatis dan pengujian alur inti saat arsitektur penyimpanan lokal ditentukan.
- Aktifkan autentikasi dan peran hanya setelah model otorisasi dan aturan akses backend tersedia.
