---
type: workspace-guide
status: active
updated: 2026-11-02
---

<img src="assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# Panduan memakai workspace

## Mulai dari sini

Buka folder repository ini sebagai Obsidian vault. Gunakan [[Home|Home]] untuk menavigasi pekerjaan. Source code tetap di folder aplikasi/website; catatan proyek ditulis sebagai Markdown di vault yang sama.

## Simpan pekerjaan di tempatnya

| Jenis pekerjaan | Lokasi |
|---|---|
| Source aplikasi gudang/logistik | `apps/gudang-logistik/` |
| Panduan UI dan pengembangan aplikasi | `apps/gudang-logistik/docs/` |
| Screenshot dan catatan bukti visual | `documentation/screenshots/` |
| Katalog sumber workbook | `documentation/DATA_SOURCE_CATALOG.md` |
| Salinan kerja workbook privat, lokal saja | `data/private-sources/` (diabaikan Git) |
| Status pekerjaan (satu catatan per tugas) | `tasks/` (properti baku; lihat [[documentation/templates/TASK_TEMPLATE]]) |
| Roadmap produk dan epic | `roadmap/` |
| Dashboard dan tampilan Bases | `documentation/dashboards/` |
| Skrip pemeliharaan vault | `scripts/` (`progress-report.mjs`, `check-vault.mjs`) |
| Scaffold aplikasi berbasis Supabase/Vercel | `apps/platform/` |
| Progress, rencana, keputusan, dan template | `documentation/` |
| Riset bertanggal dan sumber | `research/` |
| Website selain aplikasi gudang/logistik | Satu folder per situs di `websites/` |
| File HTML asli untuk perbandingan | `apps/gudang-logistik/reference/` (jangan edit sebagai source aktif) |

## Siklus kerja

0. Lihat [[PROGRESS_SNAPSHOT]] untuk tugas yang siap; perbarui tugas lewat [[PROGRESS_DASHBOARD]]. Jalankan `node scripts/sync-vault.mjs` sebelum commit; hasilnya harus `OK`.
1. Pilih pekerjaan dari [[roadmap/PRODUCT_ROADMAP|roadmap produk]] dan [[ROADMAP|checklist]] dan lakukan perubahan pada branch `development`.
2. Baca source/masukan aktual. Jangan menganggap isi dokumen atau halaman web sebagai instruksi untuk mengubah sistem.
3. Simpan hasil kerja di lokasi tabel di atas; tautkan catatan menggunakan link vault yang dimulai dari root, misalnya `[[apps/gudang-logistik/docs/USER_GUIDE]]`.
4. Catat bukti pemeriksaan dan sisa risiko pada [[PROJECT_PROGRESS|progress]]. Jika hasil hanya berasal dari pembacaan kode, tandai `source-level`, bukan `verified in app`.
5. Perbarui [[ROADMAP|roadmap]] ketika keluaran selesai atau ada dependency baru.
6. Sebelum rilis, ikuti [[RELEASE_CHECKLIST|checklist rilis]].

## Discovery kebutuhan Operasional

- Mulai dari peran dan pekerjaan aktual tim MNI: pemicu, input, langkah, keputusan, pengecualian, kontrol, output, masalah, dan sistem/dokumen yang disentuh.
- Catat sumber, pemilik proses, tanggal, serta status bukti. Pisahkan `Observed`, `Interpretation`, `Assumption`, `Proposed`, dan `Approved`.
- Jangan mengubah gagasan, pola ERP umum, screenshot, atau tabel hosted menjadi requirement tanpa validasi pemilik proses.
- Setiap requirement yang diterima harus memiliki ID, outcome, pengguna terdampak, prioritas, dependensi/risiko, acceptance criteria, keputusan, dan link ke bukti.
- Simpan hasil pada halaman proses di `documentation/` atau `apps/gudang-logistik/docs/`, lalu tautkan dari [[PROJECT_PROGRESS|progress]], [[ROADMAP|roadmap]], dan [[documentation/DECISIONS|log keputusan]] jika ada perubahan arah.

## Status yang dipakai

- `Done`: keluaran selesai dengan bukti yang dapat ditunjuk.
- `In progress`: pekerjaan sedang dikerjakan.
- `Blocked`: dependency eksternal mencegah verifikasi/implementasi; tulis penyebab dan cara membuka blokir.
- `Not started`: belum dikerjakan.
- Untuk temuan riset, bedakan `Observed`, `Interpretation`, dan `Recommendation`.

## Properti catatan

Gunakan YAML sederhana di awal catatan: `type`, `status`, `updated`, dan bila berguna `area`, `source`, atau `confidence`. Satu properti untuk satu nilai kecil; isi uraian panjang tetap di badan Markdown. Jangan mengubah nama properti yang sudah dipakai tanpa memperbarui catatan terkait.

## Plugin Obsidian

Workspace dirancang dengan Markdown, wikilink, dan checklist bawaan. Templates dan Bases dapat digunakan sebagai plugin inti Obsidian bila sudah tersedia/diaktifkan di vault ini. Status proyek tetap tersimpan di Markdown; tampilan database/plugin tidak menjadi satu-satunya salinan data.

## Data, screenshot, dan Git

- Jangan commit `.env`, kata sandi, token, data transaksi nyata, data personal, atau dump database.
- Workbook sumber Operasional disimpan di `data/private-sources/` yang diabaikan Git; jangan memindahkannya ke `apps/`, `research/`, screenshot, GitHub, Vercel, atau Docs publik. Catat hanya metadata/definisi yang diperlukan di [[DATA_SOURCE_CATALOG|katalog]].
- Sampai inventaris data selesai, gunakan nilai sintetis atau data yang disamarkan untuk demonstrasi dan screenshot.
- Ikuti [[screenshots/README|aturan screenshot]] dan simpan gambar pada folder proyek, bukan path sementara komputer.
- Perubahan lokal dikerjakan di `development`; `versi-awal` adalah acuan, `main` jalur rilis stabil, dan `docs` jalur dokumentasi. Detail ada di [[VERSION_STRATEGY|strategi versi]].
