-- ============================================================
-- MNI Gudang - Pembersihan policy lama setelah model role baru (2026-11-02)
-- ============================================================
-- MENGANDUNG DROP POLICY. Peran di lingkungan baru (mis. Supabase production): migration ini berjalan dalam urutan
-- setelah migration 4 sehingga hanya satu set policy (_v2 dan policy baca) yang tersisa; migration 6 dan 9 melewati
-- policy yang sudah tidak ada. Di Supabase dev migration ini TIDAK dijalankan (perintah DROP ditolak persetujuan SQL
-- lewat konektor) sehingga policy lama ada berdampingan dengan _v2 dengan isi identik (migration 6); menjalankannya
-- di SQL Editor dev hanya merapikan duplikat (advisor multiple_permissive_policies) dan tidak mengubah hak.
-- Efeknya: role lama manager/gudang/produksi tidak mendapat hak tulis; viewer tidak menulis log; hanya admin membaca log.
-- Lingkungan baru wajib diuji penuh (matriks role, advisor) sebelum dipakai.

-- Kebijakan tulis lama (FOR ALL berbasis role lama)
DROP POLICY IF EXISTS "mwc_write"       ON public.mwc;
DROP POLICY IF EXISTS "mvendor_write"   ON public.mvendor;
DROP POLICY IF EXISTS "mcustomer_write" ON public.mcustomer;
DROP POLICY IF EXISTS "msupplier_write" ON public.msupplier;
DROP POLICY IF EXISTS "marmada_write"   ON public.marmada;
DROP POLICY IF EXISTS "rm_write"        ON public.rm;
DROP POLICY IF EXISTS "fg_write"        ON public.fg;
DROP POLICY IF EXISTS "mutasi_write"    ON public.mutasi;
DROP POLICY IF EXISTS "rmhist_write"    ON public.rmhist;
DROP POLICY IF EXISTS "opname_write"    ON public.opname;
DROP POLICY IF EXISTS "spk_write"       ON public.spk;
DROP POLICY IF EXISTS "vendor_write"    ON public.vendor;
DROP POLICY IF EXISTS "pr_write"        ON public.pr;
DROP POLICY IF EXISTS "kirim_write"     ON public.kirim;
DROP POLICY IF EXISTS "bongkar_write"   ON public.bongkar;
DROP POLICY IF EXISTS "master_write"    ON public.master;

-- Kebijakan lama pada log, muser, ureq, uinv (digantikan versi _v2)
DROP POLICY IF EXISTS "muser_read_self" ON public.muser;
DROP POLICY IF EXISTS "muser_write"     ON public.muser;
DROP POLICY IF EXISTS "uinv_admin"      ON public.uinv;
DROP POLICY IF EXISTS "log_read"        ON public.log;
DROP POLICY IF EXISTS "log_write"       ON public.log;
DROP POLICY IF EXISTS "ureq_read"       ON public.ureq;
DROP POLICY IF EXISTS "ureq_write"      ON public.ureq;
