---
date: 2026-11-02
topic: Obsidian workflow for a software project workspace
status: researched
sources-reviewed: Obsidian Help
---

# Best practice workspace proyek software di Obsidian

## Pertanyaan

Bagaimana menyusun satu vault di dalam repository website agar source code, penggunaan, pengembangan, progress, roadmap, riset, data, dan screenshot mudah dilacak tanpa menambah ketergantungan plugin?

## Temuan sumber resmi

### Properties sebagai metadata ringan

**Fakta sumber:** Obsidian menyimpan Properties dalam YAML di awal file. Nama properti harus unik dalam satu note; properti dimaksudkan untuk nilai kecil yang mudah dibaca mesin/manusia. Markdown tidak didukung di dalam nilai Properties. [Panduan Properties](https://obsidian.md/help/properties)

**Penerapan:** gunakan beberapa properti stabil seperti `type`, `status`, `updated`, `area`, `source`, dan `confidence`. Tulis uraian, checklist, dan bukti sebagai isi Markdown biasa.

### Link internal untuk navigasi pengetahuan

**Fakta sumber:** Obsidian mendukung wikilink dan link Markdown; path folder untuk note dimulai dari root vault memakai `/`. Obsidian dapat memperbarui link internal ketika nama file berubah jika opsi tersebut aktif. [Panduan Internal links](https://obsidian.md/help/links)

**Penerapan:** Home menjadi indeks yang mengarah ke progress, roadmap, panduan, riset, dan inventaris data. Catatan memakai link ber-root seperti `[[apps/gudang-logistik/docs/USER_GUIDE]]`, bukan path Windows absolut.

### Templates dan Bases sebagai fitur inti opsional

**Fakta sumber:** Templates tersedia sebagai core plugin untuk memasukkan format awal. Bases adalah core plugin yang dapat menyortir/memfilter catatan dari properties dan menyimpan datanya di Markdown lokal. [Core plugins](https://obsidian.md/help/plugins), [Introduction to Bases](https://obsidian.md/help/bases)

**Penerapan:** mulai dari Markdown/checklist bawaan agar vault tetap bisa dibaca tanpa plugin. Simpan template sebagai file; aktifkan plugin inti jika pengguna ingin menggunakannya. Tambahkan Bases hanya ketika daftar tugas bertambah sehingga tampilan tabel/kanban benar-benar membantu. Jangan buat status berbeda di file Markdown dan plugin tracker.

### Screenshot sebagai attachment yang dapat ditinjau

**Fakta sumber:** Obsidian menerima file gambar seperti PNG/JPEG dan dapat menyematkan attachment ke note. File attachment tetap berada di vault. [Accepted file formats](https://obsidian.md/help/file-formats)

**Penerapan:** simpan gambar pada `documentation/screenshots/`, tautkan dari catatan fitur, lalu catat halaman, versi/branch, waktu, skenario, dan status data. Hindari screenshot yang memuat data pribadi, transaksi nyata, token, atau sesi login.

## Rekomendasi struktur untuk repository ini

1. **Satu Home:** status ringkas dan link ke halaman sumber. Jangan menyalin rincian roadmap ke banyak dashboard.
2. **Progress = catatan aktual:** status, bukti, hambatan, dan log tanggal. Perbarui setelah perubahan yang berdampak.
3. **Roadmap = urutan hasil:** gunakan Now/Next/Later dan checklist; hindari tanggal target sebelum dependensi/kapasitas disepakati.
4. **Dokumentasi berdasarkan pembaca:** penggunaan untuk pengguna aplikasi, development untuk engineer, workspace guide untuk vault, riset untuk kesimpulan dan sumber.
5. **Evidence first:** `source-level` berbeda dari `verified in browser`, dan fakta berbeda dari interpretasi/rekomendasi.
6. **Code dan catatan berdampingan:** source website berada di `apps/` atau `websites/`; catatan Markdown terstruktur di `documentation/` dan `research/`.
7. **Mulai dengan fitur inti Obsidian:** community plugin tidak menjadi syarat untuk membaca status atau mengedit roadmap.

## Cara menerapkannya terhadap data yang tersedia

**Yang tersedia untuk pemeriksaan saat ini:** source JavaScript aplikasi (`apps/gudang-logistik/assets/js/app.js`) dan HTML referensi. Kode menyebut nama koleksi dan jalur baca/tulis, tetapi sesi ini tidak memiliki akses ke record database maupun Google Sheets.

**Langkah yang aman dan dapat ditinjau:**

1. Simpan inventaris tingkat skema dari source code; catat bahwa ini belum schema backend aktual.
2. Saat Sheets diotorisasi, mulai dari metadata file/tab, pemilik, tanggal pembaruan, formula, validasi, used range, dan relasi; jangan unduh seluruh workbook ke repository.
3. Buat data dictionary dengan definisi kolom, tipe, satuan, kunci, sumber/pemilik, klasifikasi sensitivitas, aturan kualitas, dan dependensi.
4. Profilkan nilai hanya di lingkungan yang berizin; masking identitas dan alamat untuk contoh, screenshot, serta fixture.
5. Validasi duplikasi master, tipe/format, jumlah/unit, relasi SPK-dokumen-movement, rentang tanggal, status, dan rekonsiliasi saldo sebelum menyimpulkan.
6. Pisahkan source asli, hasil ekstraksi lokal terbatas, analisis, dan data sintetis. Jangan commit ekspor transaksi atau data personal.
7. Tulis setiap temuan dengan label `Observed`, `Interpretation`, dan `Recommendation`, tautkan kembali ke sumber yang spesifik.

Rincian kode-level yang sudah diamati dicatat di [[apps/gudang-logistik/docs/DATA_INVENTORY|Inventaris data aplikasi]]. Metode discovery generik untuk merancang MNI OS custom ada di [[research/2026-11-02-erp-rationalization-best-practice|Metode discovery Operasional]].

## Batas dan hal yang perlu diuji

- Struktur note bukan bukti bahwa aplikasi berjalan atau data tersimpan.
- Tampilan Bases dan Templates bergantung pada Obsidian yang digunakan serta plugin inti yang diaktifkan di vault. Workspace ini tidak mengaktifkan/mengubah preferensi lokal secara otomatis.
- Catatan riset ini mendahului keputusan MNI OS custom; ERP eksternal bukan blueprint. Google Sheets MNI belum diinspeksi langsung dan bukan requirement sebelum relevansi serta izin akses dikonfirmasi.
- Belum ada screenshot aplikasi live yang tervalidasi di workspace ini.

## Referensi

- Obsidian, [Properties](https://obsidian.md/help/properties), diakses 2026-11-02.
- Obsidian, [Internal links](https://obsidian.md/help/links), diakses 2026-11-02.
- Obsidian, [Core plugins](https://obsidian.md/help/plugins), diakses 2026-11-02.
- Obsidian, [Introduction to Bases](https://obsidian.md/help/bases), diakses 2026-11-02.
- Obsidian, [Accepted file formats](https://obsidian.md/help/file-formats), diakses 2026-11-02.
