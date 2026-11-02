---
project: MNI OS Operational
type: project-dashboard
status: active
active-version: development
updated: 2026-11-02
---

# MNI OS Operational

> [!summary] Dashboard proyek
> Workspace Codex untuk merawat aplikasi operasional MNI, mendokumentasikan proses, dan menyimpan hasil riset yang bisa ditelusuri.

## Status saat ini

| Area | Status | Catatan |
|---|---|---|
| Workspace dan navigasi Obsidian | Selesai tahap awal | Dashboard, peta versi, dan log progress tersedia. |
| Aplikasi Gudang & Logistik | Fondasi tersedia | Kode terpisah dari file referensi; koneksi runtime/database belum terbukti aktif. |
| Riset ERP | Berjalan | Best practice awal dicatat; Antlia dan Google Sheets belum diperiksa langsung. |
| Integrasi dan otomasi | Menunggu akses | Perlu sesi browser yang diizinkan dan koneksi Composio yang selesai. |
| GitHub | Branch awal tersusun | `main` dan `versi-awal` berisi baseline; `development` dan `docs` berisi dashboard workspace. |

## Versi kerja

- **Development — aktif:** pengembangan dan pengujian lokal. Lihat [[documentation/VERSION_STRATEGY|strategi versi]].
- **Main:** rilis stabil untuk akses pengguna setelah pemeriksaan dan persetujuan rilis.
- **Docs:** dokumentasi pengembangan website dan panduan proyek.
- **Versi Awal:** snapshot acuan kondisi sistem saat ini; jangan dipakai untuk pekerjaan harian.

## Progress dan keputusan

- [[documentation/PROJECT_PROGRESS|Progress proyek]] — status, bukti, hambatan, dan langkah selanjutnya.
- [[documentation/RELEASE_CHECKLIST|Checklist promosi versi]] — syarat sebelum perubahan masuk ke `main`.
- [[research/2026-11-02-erp-rationalization-best-practice|Riset best practice ERP]] — metode fit-to-standard, inventaris data, dan analisis fitur.

## Area kerja

- [[documentation/README|Dokumentasi]] — SOP, keputusan, proses, dan standar.
- [[websites/README|Website]] — proyek website dan preview lokal.
- [[websites/docs-site/README|Rencana website dokumentasi]] — status dan rencana publikasi dokumentasi.
- [[research/README|Riset]] — sumber, temuan, ketidakpastian, dan implikasi.
- [[apps/gudang-logistik/README|Aplikasi Gudang & Logistik]] — kode, panduan, dan inventaris fitur.
- [[AGENTS|Panduan kerja Codex]] — aturan sumber dan struktur file.

## Rutinitas pembaruan

1. Mulai pekerjaan pada branch `development` dan tulis perubahan yang berdampak di [[documentation/PROJECT_PROGRESS|log progress]].
2. Simpan riset dengan tanggal dan sumber; bedakan observasi langsung dari interpretasi.
3. Tautkan keputusan dan dokumen terkait menggunakan wikilink agar graph Obsidian membentuk konteks proyek.
4. Promosikan perubahan ke `main` hanya melalui checklist rilis.
