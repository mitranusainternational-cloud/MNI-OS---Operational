---
name: supabase-dev-ops
description: Kerjakan database dan Auth Supabase untuk MNI OS dengan aman: terapkan migration, uji RLS dan bentuk data dengan transaksi yang di-rollback, baca log, dan periksa advisor. Gunakan untuk setiap perubahan schema, uji login nyata, atau diagnosis galat Supabase.
---

# Operasi Supabase (dev)

Project dev: `MNI Gudang - Dev`, ref `inldyqigewmziwazalun`, region ap-southeast-1. Jangan menyentuh project ERP lain di akun yang sama ("MNI OS", "MNI OS - Operational" yang dijeda). Detail: `documentation/ENVIRONMENTS.md`.

## Aturan keras

- Hanya kunci anon/publishable di aplikasi. **Jangan** meminta, mencetak, atau menyimpan kunci service-role atau password.
- Perubahan schema = file migration baru di `apps/platform/supabase/migrations/` **lalu** `apply_migration`. Jangan mengubah migration yang sudah terpasang. Satu migration per panggilan (panggilan bersamaan bertabrakan versi).
- Setelah mengubah kolom tabel, buat ulang `apps/platform/src/lib/schema-columns.js` (daftar kolom dipakai adapter dan mock) dan jalankan skill `e2e-regression`.
- Pernyataan merusak (`delete`, `drop`, `truncate`) dapat ditolak oleh persetujuan SQL; jangan mengakalinya. Minta pemilik menjalankannya di SQL Editor dan beri SQL persisnya.
- Jangan mengirim email ke alamat pihak ketiga. Login OTP hanya untuk pemilik akun; kodenya tidak dapat dibaca agen.

## Pola uji tanpa meninggalkan data

Bungkus uji dalam blok `DO $$ ... RAISE EXCEPTION 'LAPORAN: %', rpt; END $$;` agar semuanya di-rollback dan hasil muncul di pesan galat. Meniru pengguna: `PERFORM set_config('request.jwt.claims', '{"email":"...","role":"authenticated"}', true); SET LOCAL ROLE authenticated;` (baris `muser` uji disisipkan lebih dulu sebagai pemilik, `RESET ROLE` antar peran). Contoh: matriks hak tulis per role di `documentation/TEST_MATRIX.md`.

## Diagnosis galat

- Log API/Auth: `query_logs` dengan `source = 'edge_logs'`, kolom `event_message`, filter `auth/v1/*` atau `rest/v1/*`. Perhatikan 400 (kolom/urutan salah), 403 (RLS/kode salah), 429 (batas email).
- Advisor: `get_advisors` tipe `security` dan `performance` setelah setiap perubahan DDL; catat temuan di tugas T-060.
- Ketidakcocokan yang sudah dikenal: id dokumen non-UUID (dipetakan `toDbId`), `spk.no` TEXT vs angka (adapter), dokumen `master/*` berbasis `key`, bidang tambahan di JSONB `data`, kolom urut berbeda (`master.updated_at`, `log.tgl`).

## Auth

Templat email harus memuat `{{ .Token }}` agar kode 6 digit tampil; Site URL dan Redirect URLs harus menunjuk alamat aplikasi; SMTP bawaan sangat terbatas (T-047). Login password disediakan sebagai cadangan; password diatur pemilik sendiri.

## Selesai

Catat di tugas (T-029, T-021, T-022, T-028) dan jalankan skill `vault-progress`.
