---
name: e2e-regression
description: Jalankan dan catat regresi UI penuh untuk pratinjau lokal mni-app (login, 10 modul, 22 alur inti). Wajib setelah mengubah adapter Supabase, local-supabase.js, schema-columns.js, apps/gudang-logistik, atau index.html mni-app.
---

# Regresi E2E (mode mock)

Tujuan: memastikan perubahan tidak merusak alur yang sudah lulus (36 PASS, 0 FAIL pada 2026-11-02).

## Menjalankan

1. Pastikan dependensi dan UI siap: `cd apps/platform && npm ci && npm run extract`.
2. Jalankan dev server mock di terminal terpisah: `npx.cmd vite --host 127.0.0.1 --port 5173 --no-open` (di PowerShell yang memblokir skrip pakai `npx.cmd`). `.env.local` berisi `VITE_LOCAL_MOCK=1`.
3. Pakai **satu tab** browser. Setelah itu jalankan `runRoles(page, base)` dari `tests/e2e/roles.mjs` (penegakan role, 12 pemeriksaan). Jalankan `runRegression(page, 'http://127.0.0.1:5173/')` dari `apps/platform/tests/e2e/regression.mjs` lewat Playwright MCP (`browser_run_code_unsafe`) atau `node tests/e2e/run.mjs` bila paket `playwright` terpasang (T-077).
4. Hasil harus `fail: 0`. Satu kegagalan = berhenti, cari penyebab, perbaiki, ulangi dari awal.

## Setelah selesai

- Catat hasil dan bug baru (ID B-xxx) di `documentation/TEST_MATRIX.md`, perbarui tugas terkait, lalu jalankan skill `vault-progress`.
- Jika regresi menemukan bug dari perbaikan sebelumnya, tulis sebagai regresi (contoh B-010) dan tambahkan pemeriksaannya ke `regression.mjs`.

## Batas

- Mock meniru batasan Postgres (id UUID, kolom tak dikenal, pengurutan kolom) tetapi bukan Supabase. Bug yang hanya muncul di Postgres nyata (mis. B-007 sampai B-011) ditemukan lewat uji di Supabase dev: lihat skill `supabase-dev-ops`.
- Jangan menyimpan unduhan (`*.csv`, `*.xlsx`, `*.pdf`) atau tangkapan layar di repo kecuali sebagai bukti yang diindeks di `documentation/screenshots/README.md`.
- Data hanya sintetis.
