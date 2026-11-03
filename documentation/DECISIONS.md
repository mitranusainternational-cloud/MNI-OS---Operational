---
type: decision-log
status: active
updated: 2026-11-02
---

# Log keputusan workspace

## 2026-11-03 — Migration tahan-urutan dan merge ke main

- **Konteks:** migration 5 (DROP policy lama) tidak dijalankan di dev, tetapi di lingkungan baru ia berjalan sebelum migration 6 yang meng-ALTER policy lama; tanpa pengaman, migration 6 akan gagal di project kosong (production).
- **Keputusan:** migration 6 dan 9 membungkus setiap ALTER dengan pemeriksaan keberadaan policy; migration 5 tetap berurutan. Advisor performa diperbaiki lewat migration 9 (initplan `auth.email()`, `pg_trgm` ke schema `extensions`). PR #1 development ke main digabung oleh pemilik dengan hak admin (syarat approval dilewati karena hanya satu akun), CI hijau.
- **Konsekuensi:** CI juga berjalan pada push ke main. Production wajib diuji penuh di project kosong sebelum dipakai.

## 2026-11-03 — CI wajib lulus sebelum merge ke main

- **Keputusan (pemilik):** job CI "Vault (tautan dan properti)" dan "Aplikasi (build dan regresi mock)" menjadi required status check pada `main`; strict (branch harus up to date) dimatikan; admin tidak dikecualikan secara berbeda dari sebelumnya.
- **Konsekuensi:** PR dari `development` ke `main` hanya bisa digabung bila kedua job hijau dan 1 approval ada. Mengubah nama job berarti memperbarui aturan ini.

## 2026-11-03 — Pembaruan data antar sesi memakai polling, bukan push Realtime

- **Konteks:** di Supabase dev channel Realtime SUBSCRIBED tetapi tidak ada event yang tiba (B-017). Diagnostik yang butuh melonggarkan hak fungsi untuk anon ditolak karena melemahkan keamanan.
- **Keputusan (pemilik):** pakai polling. Adapter memuat ulang tiap 15 detik saat tab terlihat dan saat tab kembali fokus (`POLL_MS` mengatur interval); render dilewati bila data sama.
- **Konsekuensi:** perubahan sesi lain tampil dalam sekitar 15 detik; beban sekitar 20 permintaan per tab tiap 15 detik. T-162 menjadi opsional (P2).

## 2026-11-03 — Struktur folder dibersihkan: satu kanonik, sisanya arsip

- **Konteks:** tiga folder bernama mirip (`mni-app`, `MNI OS - Dept. Operasional`, `MNI OS - Dept. Operational`) dan `apps/mni-app` di dalam repo membuat rancu mana yang aktif; Obsidian sempat membuka folder yang salah.
- **Keputusan:** `mni-os/` satu-satunya folder kerja (repo + vault). `apps/mni-app` diganti nama menjadi `apps/platform` (semua rujukan diperbarui). Folder lama dipindah ke `_Arsip/` di induk, tanpa dihapus.
- **Konsekuensi:** perintah dan dokumen memakai `apps/platform`; dev server dijalankan dari sana. Regresi 36 dan role 12 lulus dari lokasi baru.

## 2026-11-02 — Policy lama diganti isinya (ALTER), role ditegakkan di UI lewat peran dari backend

- **Konteks:** migration 5 (DROP POLICY) ditolak persetujuan SQL, sedangkan policy lama masih memberi hak pada role lama dan viewer dapat menulis log.
- **Keputusan:** migration 6 memakai `ALTER POLICY` (tanpa DROP) sehingga isi policy lama sama dengan padanan `_v2`. Migration 5 menjadi opsional. UI: bila adapter menyediakan `me().role` (mode Supabase dan mock), `myAcc()` memakai peran itu dan `guard()` aktif tanpa `ROLE_ON`; `ROLE_ON` (fitur menu Pengguna, undangan, klaim) tetap nonaktif sampai T-101 lanjutan. Akun mock diganti ke role aplikasi (ppic, gbb, gbj, logistik, viewer, admin).
- **Alasan:** satu model hak di UI dan database tanpa operasi destruktif; platform asli tidak terpengaruh.
- **Konsekuensi:** pengguna dengan role lama (manager/gudang/produksi) menjadi viewer di UI dan database; pindahkan akun ke role aplikasi. Seed mock naik ke versi 6.

## 2026-11-02 — Model role RLS mengikuti model role aplikasi (sementara)

- **Konteks:** policy awal memakai role admin/manager/gudang/produksi/viewer, sedangkan aplikasi mendefinisikan admin, ppic, gbb, gbj, logistik, viewer dengan hak per modul (`ROLES`, `modOf`; belum aktif karena `ROLE_ON=false`). Uji pada RLS nyata menunjukkan alur lintas peran gagal (mis. produksi tidak dapat mencatat mutasi atau surat jalan; kunci dokumen di tabel `master` tidak dapat ditulis non-admin; viewer dapat menulis log).
- **Keputusan:** hak tulis di database ditentukan tabel `role_modules` (role → modul) dan fungsi `can_mod(modul)`/`can_any()`/`is_admin()`; peta modul → tabel mengikuti `modOf`. Peta role ke modul adalah **model aplikasi apa adanya** dan **sementara** sampai disahkan tim Operasional (T-036). Migration 4 menambah (tanpa DROP); migration 5 menghapus policy lama dan menunggu persetujuan eksplisit.
- **Alasan:** satu model hak yang sama di UI dan database; mengubah hak cukup dengan mengisi `role_modules`, tanpa mengubah policy.
- **Konsekuensi:** role lama (manager, gudang, produksi) tidak lagi bermakna setelah migration 5; akun harus memakai role aplikasi. Pengguna tidak terdaftar tidak dapat membuat permintaan akses (login dibatasi ke `muser`).

## 2026-11-02 — Database dev: project Supabase baru dan model "kolom inti + JSONB data" (T-042)

- **Konteks:** akun Supabase sudah memiliki dua project aktif berskema ERP berbeda dan batas paket gratis (2 project aktif) penuh. Schema migration awal `mni-app` juga tidak cocok dengan bentuk dokumen yang ditulis app: mis. `bongkar` memakai jenis/muatan/pihak, `mutasi` memakai `item` (bukan `item_id` wajib), `log` memakai c/d/k/op, `vendor`/`kirim` memuat kendaraan, riwayat, dan referensi SPK.
- **Keputusan:** (1) buat project baru `MNI Gudang - Dev` (ref `inldyqigewmziwazalun`, ap-southeast-1) dan jeda project kosong `MNI OS - Operational` (0 baris data, bisa dipulihkan) agar muat di batas gratis, atas persetujuan pemilik; (2) tambahkan migration `20240101000003_app_shape_compat.sql`: kolom JSONB `data` di 19 tabel untuk bidang tambahan dan pelonggaran NOT NULL selain kunci bisnis (`muser.email`, `master.key`, `spk.no`); adapter memecah dan menggabungkan `data` berdasarkan `schema-columns.js`.
- **Alasan:** membuat app berjalan di Postgres nyata sekarang tanpa menebak model data final; model normal ditetapkan setelah discovery (T-033).
- **Konsekuensi:** kueri langsung ke bidang di `data` lebih sulit dan tanpa constraint; update parsial pada `data` adalah baca-ubah-tulis (tidak atomik). Normalisasi tabel kunci (SPK, mutasi, stok) menjadi pekerjaan lanjutan setelah pilot dipilih.

## 2026-11-02 — Sumber kebenaran UI untuk build mni-app (T-014)

- **Konteks:** `apps/platform` mengekstrak UI ke `public/app.*` dan semula meminta `mni-gudang.html` yang tidak ada. Dua kandidat sumber: `apps/gudang-logistik/reference/*.html` (salinan HTML lama) dan `apps/gudang-logistik/{index.html,assets/}` (sumber aktif).
- **Bukti (source-level):** setelah whitespace dinormalisasi, JS reference 224.784 karakter vs sumber aktif 369.415; reference hanya memakai 15 dari 20 koleksi di schema `mni-app` (tidak ada `mwc`, `log`, `uinv`, `muser`, `ureq`), sumber aktif memakai ke-20-nya.
- **Keputusan:** sumber kebenaran UI = `apps/gudang-logistik/` (index.html, assets/css/app.css, assets/js/app.js). `reference/` hanya arsip pembanding dan tidak dipakai build. `scripts/extract-app.js` memakai sumber itu secara default; `--source` dan `--input` tetap tersedia.
- **Alasan:** hanya sumber aktif yang sesuai dengan schema 20 tabel; perubahan UI dikerjakan di satu tempat; extract reproducible tanpa file di luar repo.
- **Konsekuensi:** `public/app.*` tetap dihasilkan dan di-ignore Git. Perubahan di `gudang-logistik` otomatis ikut build mni-app, jadi regresi harus dicek di keduanya. Verifikasi: ekstrak, build, dan muat di browser tanpa error JS (nav 15 item, `window.claude` ada).

## 2026-11-02 — MNI OS custom berdasarkan kebutuhan Operasional

- **Konteks:** arah sebelumnya terlalu menempatkan ERP Antlia dan praktik fit-gap vendor sebagai acuan produk.
- **Keputusan:** MNI OS dirancang sebagai sistem custom. Kebutuhan, proses aktual, kontrol, data, dan masukan tim Operasional MNI menjadi sumber utama desain dan prioritas. Antlia tidak menjadi blueprint atau daftar fitur wajib.
- **Cara memakai referensi eksternal:** praktik rekayasa, keamanan, UX, dan data boleh dipakai sebagai pola pembanding; keputusan alur dan fitur harus ditelusuri ke bukti serta validasi pemilik proses MNI.
- **Konsekuensi:** backlog, pilot saldo bahan baku, mapping schema hosted, dan usulan modul lama berstatus hipotesis sampai divalidasi. Model data Supabase lokal dirancang dari kebutuhan yang diterima, bukan diturunkan otomatis dari project hosted yang ditemukan.
- **Rujukan:** [[ROADMAP|Roadmap]], [[PROJECT_PROGRESS|Progress]], dan [[research/2026-11-02-erp-rationalization-best-practice|catatan riset yang dibingkai ulang]].

## 2026-11-02 — Source code dan vault berada di workspace yang sama

- **Konteks:** proyek mencakup website/aplikasi, panduan, progress, roadmap, riset, dan bukti visual; semua harus mudah ditinjau dari Obsidian.
- **Keputusan:** folder repository root dipakai sebagai vault; source tetap dalam `apps/` dan `websites/`; dokumen lintas proyek di `documentation/`; riset bertanggal di `research/`.
- **Alasan:** satu sumber Markdown yang bisa ditautkan ke kode dan dilacak di Git tanpa menyalin source ke vault kedua.
- **Konsekuensi:** pengaturan vault `.obsidian/` tetap lokal; preferensi pribadi tidak perlu masuk Git.

## 2026-11-02 — Markdown-first untuk progress dan roadmap

- **Konteks:** perlu melihat status kerja dan rencana tanpa harus memasang plugin pihak ketiga.
- **Keputusan:** Home adalah indeks; `PROJECT_PROGRESS.md` menyimpan status/bukti; `ROADMAP.md` menyimpan urutan hasil Now/Next/Later dan checklist.
- **Alasan:** properti, link internal, dan checklist Markdown bisa dibaca langsung, disimpan bersama source, serta menjadi basis untuk tampilan Bases bila kelak diperlukan.
- **Konsekuensi:** status harus dipelihara pada dokumen sumbernya; plugin/database view bersifat opsional.
- **Rujukan:** [[research/2026-11-02-obsidian-project-workspace-best-practice|Riset workflow Obsidian]].

## 2026-11-02 — Klaim harus menyebut tingkat bukti

- **Konteks:** source code menyebut data/runtime, tetapi browser, backend dan workbook aktual belum berhasil diakses pada sesi ini.
- **Keputusan:** label `source-level`, `verified in browser`, dan `verified in database` dipakai terpisah; screenshot aktual menunggu akses preview yang dapat diverifikasi.
- **Alasan:** mencegah inventaris kode atau screenshot UI dianggap sebagai bukti transaksi/persistence.
- **Rujukan:** [[PROJECT_PROGRESS|Progress proyek]] dan [[apps/gudang-logistik/docs/DATA_INVENTORY|inventaris data indikatif]].
