---
name: rls-roles
description: Model role dan RLS MNI OS (role_modules, can_mod/can_any/is_admin, ROLES di app.js) beserta cara mengubah dan mengujinya. Gunakan saat menambah role, mengubah hak modul, menulis policy, atau menguji hak per role.
---

# Role dan RLS

## Model (satu sumber hak, dua tempat penegakan)

- UI: `ROLES`, `MODS`, `modOf()`, `canMod()`, `guard()` di `apps/gudang-logistik/assets/js/app.js`. Role: admin (semua), ppic (spk, vendor), gbb (bahan-baku, bongkar-muat), gbj (barang-jadi, vendor, pengiriman, bongkar-muat), logistik (pengiriman, bongkar-muat), viewer (tidak ada).
- Database: tabel `role_modules(role, module)`, fungsi `is_admin()`, `can_mod(modul)`, `can_any()` (SECURITY DEFINER, EXECUTE hanya untuk authenticated). Policy `*_write` (hasil ALTER di migration 6) dan `*_v2` memakai fungsi itu.
- Peta role ke modul bersifat **sementara** sampai disahkan tim Operasional (T-036). Mengubah hak = mengubah isi `role_modules` (dan `ROLES` di UI), bukan policy.
- Penegakan UI tanpa `ROLE_ON`: bila adapter memberi `me().role`, `myAcc()` memakainya dan `guard()` aktif. `ROLE_ON` mengatur fitur menu Pengguna, undangan, klaim (T-101). Platform asli tidak memberi `role`, perilaku lama tetap.
- Adapter menganggap hanya `admin, ppic, gbb, gbj, logistik` sebagai penulis (`WRITE_ROLES`); role lain (termasuk manager/gudang/produksi lama) = viewer.

## Aturan perubahan

1. Jangan memakai `DROP POLICY`/`DELETE` lewat konektor Supabase: perintah itu ditolak persetujuan SQL. Ganti isi dengan `ALTER POLICY`, tambah dengan `CREATE POLICY`, dan tulis file migration di `apps/mni-app/supabase/migrations/`.
2. Setiap fungsi baru: `REVOKE ... FROM PUBLIC, anon; GRANT ... TO authenticated`.
3. Ubah `ROLES`/`modOf` dan `role_modules` bersamaan; jalankan `npm run extract` (public/app.js dibuat, jangan diedit).
4. Akun mock memakai role aplikasi (`admin|ppic|gbb|gbj|logistik|viewer@mni.local`); naikkan `VERSION` seed bila mengubahnya.

## Menguji

- Database: blok `DO $$ ... RAISE EXCEPTION $$` (otomatis rollback). Sisipkan baris `muser` uji, `set_config('request.jwt.claims', json_build_object('sub', gen_random_uuid(), 'email', ..., 'role','authenticated')::text, true)`, `SET LOCAL ROLE authenticated`, lalu coba INSERT per tabel; kembalikan hasil lewat pesan `RAISE EXCEPTION`. Kolom wajib tiap tabel: `rm(id,item)`, `fg(id,kategori)`, `spk(id,no)`, `log(aksi)`. UPDATE/DELETE di bawah RLS tidak galat saat 0 baris: periksa `ROW_COUNT`.
- UI mock: `apps/mni-app/tests/e2e/roles.mjs` (`runRoles(page, base)`, 12 pemeriksaan) di satu tab. Setelah `extract`.
- Jalankan advisor keamanan setelah setiap migration (`get_advisors`) dan catat di `documentation/ENVIRONMENTS.md`.
- Catat hasil di `documentation/TEST_MATRIX.md` (matriks alur × role) dan tugas T-022, T-079.
