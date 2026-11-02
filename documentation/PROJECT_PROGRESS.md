---
type: project-progress
status: active
updated: 2026-11-02
---

# Progress proyek MNI OS

Halaman ini mencatat keadaan berdasarkan bukti yang tersedia. `Selesai` hanya berlaku pada pekerjaan yang tercatat; status tersebut bukan klaim bahwa aplikasi sudah siap produksi.

## Ringkasan

| Area | Status | Bukti atau batas |
|---|---|---|
| Pemisahan dan navigasi workspace | Selesai tahap awal | Struktur `apps/`, `documentation/`, `research/`, `websites/`, serta halaman vault sudah tersedia. |
| Branch lokal | Siap untuk kerja lokal | `versi-awal`, `development`, `main`, dan `docs` mengacu ke baseline saat inisialisasi; branch aktif `development`. Sinkronisasi remote dicatat terpisah. |
| Aplikasi Gudang & Logistik | Fondasi UI tersedia; integrasi belum terverifikasi | Ada salinan HTML sumber, UI aktif, CSS/JS, dan catatan aplikasi. Runtime menampilkan status database belum tersambung. |
| Riset ERP | Riset awal selesai; discovery aktual tertunda | [[../research/2026-11-02-erp-rationalization-best-practice|Catatan riset]] memuat panduan publik, belum temuan langsung dari akun ERP atau Sheets. |
| Antlia ERP | Menunggu sesi akses | Halaman ERP belum diinspeksi dalam sesi browser ini. Jangan menyimpulkan modul atau pola penggunaan aktual. |
| Google Sheets melalui Composio | Menunggu OAuth | Belum ada workbook atau data sheet yang dibaca. Jangan menyimpulkan isi atau kelengkapan data. |
| GitHub | Setelah struktur lokal | Branch akan disinkronkan setelah catatan lokal dan dashboard ditinjau. |

## Langkah berikutnya

1. Tinjau dashboard Obsidian dan struktur empat branch lokal.
2. Sinkronkan `development`, `main`, dan `docs` ke repository GitHub sambil mempertahankan `versi-awal`.
3. Sediakan sesi browser yang diizinkan untuk meninjau alur ERP secara read-only; catat modul yang terlihat dan role/session yang digunakan.
4. Selesaikan koneksi Composio Google Drive/Sheets, inventaris file dan tab, lalu dokumentasikan metadata serta batas data yang diperiksa.
5. Cocokkan proses aktual ERP dengan spreadsheet dan proses pemilik; buat fit-gap serta daftar fitur dengan bukti/dependensi.
6. Tentukan isolasi runtime, database, konfigurasi, dan deployment untuk Development dan Main sebelum memakai data operasional.

## Log perubahan

### 2026-11-02 — Fondasi workspace dan pembagian versi

- Disiapkan: empat branch lokal (`versi-awal`, `development`, `main`, `docs`), dengan `development` sebagai branch aktif.
- Disiapkan: strategi versi, dashboard Home Obsidian, checklist promosi, dan log progress.
- Dipertahankan: HTML sumber awal aplikasi untuk pembandingan dengan implementasi aktif.
- Batas yang diketahui: review aktual ERP tertunda akses browser; Google Sheets tertunda OAuth; runtime aplikasi belum tersambung database.

## Riwayat catatan

- [[VERSION_STRATEGY|Strategi versi dan branch]]
- [[RELEASE_CHECKLIST|Checklist promosi versi]]
- [[../apps/gudang-logistik/README|Aplikasi Gudang & Logistik]]
- [[../research/2026-11-02-erp-rationalization-best-practice|Riset ERP]]
