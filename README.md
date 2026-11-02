# MNI OS Operational — Codex Workspace

Workspace kerja untuk mengembangkan sistem operasional MNI bersama Codex. Isi dibagi menurut jenis pekerjaan agar dokumentasi, website, aplikasi, dan hasil riset mudah ditemukan dan ditinjau.

## Peta workspace

```text
.
├── Home.md                         # Halaman awal vault Obsidian
├── AGENTS.md                       # Cara Codex bekerja di workspace ini
├── documentation/                  # Dokumentasi proses dan referensi kerja
├── websites/                       # Website dan landing page
├── research/                        # Riset, sumber, temuan, dan keputusan
└── apps/
    └── gudang-logistik/             # Aplikasi MNI Gudang & Logistik
        ├── index.html
        ├── assets/css/app.css
        ├── assets/js/app.js
        ├── reference/                # Salinan sumber untuk pembandingan
        └── docs/                    # Panduan serta inventaris aplikasi
```

## Mulai bekerja

1. Buka `Home.md` atau buka folder ini sebagai vault Obsidian.
2. Baca `AGENTS.md` untuk aturan kerja dan pencatatan sumber.
3. Pilih folder sesuai hasil kerja: `documentation/`, `websites/`, `research/`, atau `apps/`.
4. Catat keputusan dan tautkan catatan terkait dengan wikilink Obsidian.

## Aplikasi Gudang & Logistik

Mulai di [`apps/gudang-logistik/README.md`](apps/gudang-logistik/README.md). HTML sumber yang dipertahankan untuk pembandingan berada di `apps/gudang-logistik/reference/`; versi aktif dikembangkan dari file terpisah di folder aplikasi. Aplikasi lokal dapat dijalankan dengan `python -m http.server 8000` dari root workspace, lalu buka <http://localhost:8000/apps/gudang-logistik/>. Aplikasi memerlukan `window.claude` agar tersambung ke database dan layanan runtime; preview lokal tanpa runtime hanya untuk meninjau UI.

## GitHub

Repo: [mitranusainternational-cloud/MNI-OS---Operational](https://github.com/mitranusainternational-cloud/MNI-OS---Operational)  
Branch snapshot awal: `versi-awal`.

Jangan menyimpan kredensial, data operasional personal, atau ekspor transaksi ke repository. Detail historis dan sumber riset harus diberi tanggal serta tautan sumber.
