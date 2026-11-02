# MNI OS Operational — Codex Workspace

Repository ini sekaligus menjadi Obsidian vault untuk mengembangkan website/aplikasi MNI dan menelusuri progress proyek. Dashboard proyek ada di [`Home.md`](Home.md); cara mengelola vault ada di [`documentation/WORKSPACE_GUIDE.md`](documentation/WORKSPACE_GUIDE.md).

## Versi dan branch

| Versi | Branch | Kegunaan |
|---|---|---|
| Versi Awal | `versi-awal` | Snapshot referensi kondisi awal. |
| Development | `development` | Pengembangan dan pengujian lokal; branch kerja. |
| Main | `main` | Versi stabil untuk pengguna setelah tinjauan rilis. |
| Docs | `docs` | Dokumentasi pengembangan dan materi website dokumentasi. |

Rincian alur dan batas tiap environment ada di [`documentation/VERSION_STRATEGY.md`](documentation/VERSION_STRATEGY.md). Peta tugas ada di [`documentation/PROJECT_PROGRESS.md`](documentation/PROJECT_PROGRESS.md). Branch saja belum memisahkan deployment atau database.

## Peta workspace

```text
.
├── Home.md                         # Halaman awal vault Obsidian
├── AGENTS.md                       # Cara Codex bekerja di workspace ini
├── documentation/                  # Progress, roadmap, panduan, screenshot, template
├── websites/                       # Website lain dan situs dokumentasi
├── research/                       # Riset bertanggal dan penerapan ke data MNI
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
4. Catat hasil di [`documentation/PROJECT_PROGRESS.md`](documentation/PROJECT_PROGRESS.md) dan urutan pekerjaan di [`documentation/ROADMAP.md`](documentation/ROADMAP.md).
5. Gunakan wikilink yang path-nya dimulai dari root vault dan jangan menjadikan plugin sebagai satu-satunya penyimpanan status.

## Aplikasi Gudang & Logistik

Mulai dari [`apps/gudang-logistik/README.md`](apps/gudang-logistik/README.md), [`USER_GUIDE.md`](apps/gudang-logistik/docs/USER_GUIDE.md), dan [`DEVELOPMENT.md`](apps/gudang-logistik/docs/DEVELOPMENT.md). Jalankan preview mengikuti panduan development dan gunakan `/apps/gudang-logistik/`. Aplikasi memerlukan `window.claude` untuk database/runtime; server statis hanya membantu meninjau UI. Screenshot dan batas akses dicatat di [`documentation/screenshots/README.md`](documentation/screenshots/README.md).

## GitHub

Repo: [mitranusainternational-cloud/MNI-OS---Operational](https://github.com/mitranusainternational-cloud/MNI-OS---Operational)  
Branch snapshot awal: `versi-awal`. Kerja lokal berlanjut pada `development`; lihat `documentation/VERSION_STRATEGY.md` sebelum melakukan rilis atau sinkronisasi.

Jangan menyimpan kredensial, data operasional personal, atau ekspor transaksi ke repository. Detail historis dan sumber riset harus diberi tanggal serta tautan sumber.
