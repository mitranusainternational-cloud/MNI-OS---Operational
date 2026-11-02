---
name: adapter-contract
description: Aturan untuk mengubah jembatan data app (apps/mni-app/src/lib/claude-adapter.js, local-supabase.js, schema-columns.js) dan UI aktif apps/gudang-logistik. Gunakan sebelum mengedit file tersebut atau saat menambah tabel/kolom.
---

# Kontrak adapter dan sumber UI

## Sumber kebenaran

- UI aktif: `apps/gudang-logistik/` (`index.html`, `assets/css/app.css`, `assets/js/app.js`). `apps/gudang-logistik/reference/` hanya arsip.
- `apps/mni-app` memuat UI itu lewat `npm run extract` (menulis `public/app.*`, diabaikan Git). Mengubah `gudang-logistik` berarti mengubah mni-app: uji keduanya.
- Keputusan: `documentation/DECISIONS.md` (2026-11-02).

## Kontrak `window.claude` yang dipakai app (jangan ditebak)

- `use('db')`: `collection(c).add/onSnapshot`, `doc('c/id').get/set/update/delete/acquire`.
- `use('user')`: objek dengan `me()` (id, name, isOwner, canEdit), `can()`, dan **`profiles(ids)`** (warna/foto avatar).
- `use('downloads')`: **`save({ filename, data })`** (Blob atau Uint8Array).
- `window.__idAlias`: peta id buatan app (`spk-1003`) ke UUID; dipakai `byId`.

## Pemetaan ke Postgres

- Id non-UUID dipetakan ke UUID deterministik (`toDbId`); tabel `master` dan koleksi `counter` memakai kolom `key` (nilai JSON), bukan id.
- Bidang dokumen di luar kolom tabel disimpan di JSONB `data` (`packRow`/`unpackRow`); daftar kolom di `schema-columns.js` (dibuat dari migration). Update parsial `data` = baca-ubah-tulis.
- `spk.no` TEXT di DB tetapi angka bagi app (`numericNo`/`textNo`).
- Pengurutan: kolom pertama yang ada dari `created_at`, `updated_at`, `tgl`.
- Realtime hanya pada tabel dalam publication (17 dari 20).

## Checklist perubahan

1. Ubah schema → migration baru + buat ulang `schema-columns.js` + terapkan ke Supabase dev (skill `supabase-dev-ops`).
2. Ubah adapter/mock/UI → `npm run extract` → skill `e2e-regression` (harus 0 FAIL).
3. Mock harus tetap **lebih ketat atau sama** dengan Postgres (menolak kolom/ id/ urutan yang ditolak Postgres). Jangan melonggarkannya agar tes lulus.
4. Catat bug (B-xxx) dan keputusan; skill `vault-progress`.
5. Jangan menambah dependensi atau mengganti arsitektur tanpa catatan keputusan.
