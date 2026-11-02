---
date: 2026-11-02
topic: agent-team-and-skills-for-website-development
status: synthesized
---

# Riset: tim agent dan skill untuk pengembangan website

## Pertanyaan

Bagaimana membagi pekerjaan Codex untuk mempercepat pengembangan MNI OS Operational tanpa mengaburkan kebutuhan pengguna, bukti, atau batas perubahan?

## Ringkasan temuan

- **Observed:** katalog AI Templates memisahkan agent, skill, command, hooks, MCP, dan konfigurasi; setiap komponen dapat dibaca sebagai file sebelum dipasang.
- **Observed:** Claude Skills Hub mengelompokkan skill menurut pekerjaan seperti frontend, testing, documentation, dan research. Ini direktori pihak ketiga, bukan sumber kebenaran untuk kebutuhan MNI.
- **Observed:** contoh `e2e-runner` menekankan perjalanan pengguna, artifact hasil uji, flaky tests, CI, dan laporan. Isinya panjang dan mengasumsikan toolchain tertentu.
- **Observed:** repositori `chatgpt-skills` menggunakan skill yang dipaketkan bersama instruksi dan bahan/tool pendukung; pendekatan tersebut mendukung skill yang spesifik serta dapat diaudit.
- **Observed, project:** aplikasi saat ini berbasis HTML/CSS/JavaScript dengan adapter `window.claude`; browser/runtime dan penyimpanan database belum terbukti. Sudah ada agent ERP read-only yang cocok untuk riset proses.
- **Recommendation:** gunakan empat spesialisasi lokal yang kecil, ditambah satu koordinator dan gate review. Pertahankan stack sekarang sampai kebutuhan dan backend terverifikasi.

## Rekomendasi tim untuk workspace ini

| Peran | Hasil utama | Batas tanggung jawab |
|---|---|---|
| Koordinator produk/proyek (Codex utama) | Memahami permintaan, menulis acceptance criteria, memecah pekerjaan, mengelola roadmap/progress | Pemilik proses/pengguna tetap memutus prioritas, perubahan alur, dan rilis |
| Analis proses Operasional | Peta current-state, requirement, aturan, pengecualian, kontrol, dan bukti MNI | Read-only saat discovery; teknik ERP generik tidak menjadi blueprint |
| Engineer frontend | Implementasi UI kecil sesuai acceptance criteria dan arsitektur aktif | Jangan mengganti stack atau mengklaim persistence/backend tanpa bukti |
| QA Playwright | Skenario E2E, hasil dan artifact yang dapat ditinjau | Gunakan permukaan browser terdukung; data sintetis/non-produksi; jangan melewati akses yang tidak tersedia |
| Peneliti & dokumentator | Catatan sumber, panduan pengguna/pengembang, progress dan screenshot terindeks | Bedakan fakta, inferensi, rekomendasi; jangan dokumentasikan rahasia/data pribadi |
| Gate reviewer (koordinator + QA/engineer) | Tinjauan perubahan dan checklist kesiapan promosi | `main`/rilis menunggu penerimaan pemilik rilis |

## Cara mempercepat tanpa konflik

1. Koordinator membentuk satu tiket/pekerjaan dengan tujuan, konteks proses, cakupan, acceptance criteria, risiko, dan file yang diperkirakan berubah.
2. Paralelkan tugas yang independen dan read-only, misalnya pemetaan kebutuhan dan inventaris dokumentasi. Hindari dua agent mengedit file/fungsi yang sama secara bersamaan.
3. Engineer mengerjakan perubahan setelah kriteria disepakati; dokumentator dapat menyiapkan panduan dari kriteria yang sama.
4. QA memeriksa build/flow setelah implementasi hanya saat pemeriksaan diminta dan permukaan uji tersedia. Simpan screenshot/trace sintetis dengan metadata branch, commit, route, skenario, dan tanggal.
5. Koordinator menyatukan hasil, mencatat status/evidence di vault, lalu meminta validasi pengguna pada perubahan alur yang berdampak.

## Batas penerapan

- Keberadaan file agent/skill tidak berarti beberapa agent sedang berjalan otomatis; itu definisi peran dan alur kerja yang dapat dipanggil sesuai tugas.
- Tidak menambahkan framework, dependency, CI, atau test suite hanya demi meniru contoh. Tentukan setelah pemeriksaan arsitektur dan kebutuhan.
- Jangan menaruh kredensial ERP/Google, cookie, token, ekspor transaksi, atau screenshot sensitif di repository/vault.
- Sumber katalog bersifat pihak ketiga dan dapat berubah; catat URL/tanggal, telaah isi dan lisensi sebelum menyalin atau memasang aset eksternal. File lokal pada workspace ini ditulis ulang untuk konteks MNI, bukan salinan sumber.

## Sumber (diakses 2026-11-02)

1. [AI Templates — katalog agent, skill, commands dan konfigurasi](https://www.aitmpl.com/)
2. [Claude Skills Hub — direktori keterampilan pihak ketiga](https://claudeskills.info/)
3. [WorldFlowAI — contoh agent e2e-runner](https://github.com/WorldFlowAI/everything-claude-code/blob/main/agents/e2e-runner.md)
4. [dkyazzentwatwa — pustaka ChatGPT skills](https://github.com/dkyazzentwatwa/chatgpt-skills)

## Tindak lanjut

- Tetapkan/ubah peran setelah kebutuhan fitur pertama dipilih.
- Catat proses dan acceptance criteria sebelum mengubah alur gudang/logistik.
- Tinjau ketersediaan browser dan backend sebelum QA E2E atau klaim data tersimpan.
- Tautkan perubahan penting dari [[documentation/PROJECT_PROGRESS|progress]] dan [[documentation/ROADMAP|roadmap]].
