## Ringkasan

<!-- Apa yang berubah dan kenapa (1–3 kalimat). Tautkan tugas T-nnn atau temuan B-nnn. -->

## Jenis perubahan

- [ ] Aplikasi (`apps/gudang-logistik`, `apps/platform`)
- [ ] Database (migration baru; **jangan** mengubah migration yang sudah terpasang)
- [ ] CI / Vercel / konfigurasi
- [ ] Dokumentasi / vault

## Bukti pengujian

<!-- Tempel hasil nyata, bukan niat. Bedakan: source-level, verified in browser, verified in database. -->

- [ ] `node scripts/sync-vault.mjs` berakhir `OK`
- [ ] `npm run test:e2e` di `apps/platform`: regresi dan uji role 0 FAIL
- [ ] Migration baru diuji di project/branch kosong dan advisor Supabase diperiksa
- [ ] Tidak ada rahasia, password, atau data operasional nyata di perubahan

## Dampak ke lingkungan

- [ ] Perlu pembaruan env Vercel atau pengaturan Supabase Auth (jelaskan)
- [ ] Perlu pemasangan migration ke Supabase production (jelaskan urutannya)
- [ ] Dokumen diperbarui: `documentation/SISTEM_MAP.md`, `CHANGELOG.md`, `documentation/ENVIRONMENTS.md` bila ada sumber daya berubah
