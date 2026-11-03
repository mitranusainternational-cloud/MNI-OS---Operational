-- ============================================================
-- MNI Gudang - Policy lama diganti isinya (ALTER, tanpa DROP) — 2026-11-02, dibuat tahan-urutan 2026-11-03
-- ============================================================
-- Tujuan sama dengan 20240101000005 (menghapus hak role lama manager/gudang/produksi dan hak tulis log
-- untuk viewer) tetapi memakai ALTER POLICY sehingga tidak ada pernyataan DROP. Setiap ALTER hanya dijalankan
-- bila policy-nya ada: di lingkungan baru migration 5 (DROP policy lama) berjalan lebih dulu sehingga ALTER ini
-- dilewati dan hasil akhirnya tetap satu set policy; di Supabase dev (migration 5 tidak pernah dijalankan)
-- policy lama diubah isinya sama dengan padanan _v2.
-- Isi ALTER di bawah identik dengan versi terpasang di dev (2026-11-02); hanya dibungkus pemeriksaan keberadaan.

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT * FROM (VALUES
    ('mwc_write', 'mwc', 'public.can_any()', 'public.can_any()'),
    ('mvendor_write', 'mvendor', 'public.can_any()', 'public.can_any()'),
    ('mcustomer_write', 'mcustomer', 'public.can_any()', 'public.can_any()'),
    ('msupplier_write', 'msupplier', 'public.can_any()', 'public.can_any()'),
    ('marmada_write', 'marmada', 'public.can_any()', 'public.can_any()'),
    ('master_write', 'master', 'public.can_any()', 'public.can_any()'),
    ('rm_write', 'rm', 'public.can_mod(''bahan-baku'')', 'public.can_mod(''bahan-baku'')'),
    ('rmhist_write', 'rmhist', 'public.can_mod(''bahan-baku'')', 'public.can_mod(''bahan-baku'')'),
    ('pr_write', 'pr', 'public.can_mod(''bahan-baku'')', 'public.can_mod(''bahan-baku'')'),
    ('opname_write', 'opname', 'public.can_mod(''bahan-baku'')', 'public.can_mod(''bahan-baku'')'),
    ('fg_write', 'fg', 'public.can_mod(''barang-jadi'')', 'public.can_mod(''barang-jadi'')'),
    ('mutasi_write', 'mutasi', 'public.can_mod(CASE WHEN gudang = ''rm'' THEN ''bahan-baku'' ELSE ''barang-jadi'' END)', 'public.can_mod(CASE WHEN gudang = ''rm'' THEN ''bahan-baku'' ELSE ''barang-jadi'' END)'),
    ('spk_write', 'spk', 'public.can_mod(''spk'')', 'public.can_mod(''spk'')'),
    ('vendor_write', 'vendor', 'public.can_mod(''vendor'')', 'public.can_mod(''vendor'')'),
    ('kirim_write', 'kirim', 'public.can_mod(''pengiriman'')', 'public.can_mod(''pengiriman'')'),
    ('bongkar_write', 'bongkar', 'public.can_mod(''bongkar-muat'') OR (COALESCE((data ->> ''auto'')::boolean, false) AND public.can_any())', 'public.can_mod(''bongkar-muat'') OR (COALESCE((data ->> ''auto'')::boolean, false) AND public.can_any())'),
    ('muser_read_self', 'muser', 'public.is_authenticated() AND (email = auth.email() OR public.is_admin())', NULL),
    ('muser_write', 'muser', 'public.is_admin()', 'public.is_admin()'),
    ('uinv_admin', 'uinv', 'public.is_admin()', 'public.is_admin()'),
    ('log_read', 'log', 'public.is_admin()', NULL),
    ('log_write', 'log', NULL, 'public.can_any()'),
    ('ureq_read', 'ureq', 'public.is_authenticated() AND (from_user = auth.email() OR public.is_admin())', NULL),
    ('ureq_write', 'ureq', 'public.is_authenticated() AND (from_user = auth.email() OR public.is_admin())', 'public.is_authenticated() AND (from_user = auth.email() OR public.is_admin())')
  ) AS v(pol, tbl, u, c)
  LOOP
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = r.tbl AND policyname = r.pol) THEN
      EXECUTE format('ALTER POLICY %I ON public.%I TO authenticated%s%s', r.pol, r.tbl,
        CASE WHEN r.u IS NULL THEN '' ELSE ' USING (' || r.u || ')' END,
        CASE WHEN r.c IS NULL THEN '' ELSE ' WITH CHECK (' || r.c || ')' END);
    END IF;
  END LOOP;
END;
$$;
