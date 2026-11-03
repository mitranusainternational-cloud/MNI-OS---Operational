-- ============================================================
-- MNI Gudang - Perbaikan temuan advisor Supabase (2026-11-03)
-- ============================================================
-- 1) auth_rls_initplan: auth.email() dalam policy dievaluasi per baris; bungkus (select auth.email()) agar
--    dievaluasi sekali per query.
-- 2) extension_in_public: pindahkan pg_trgm dari schema public ke extensions (ALTER EXTENSION, tanpa DROP;
--    indeks yang memakainya tetap valid karena merujuk OID).
-- Setiap perubahan dijaga pemeriksaan keberadaan agar urutan migration di lingkungan baru (policy lama sudah
-- dihapus oleh migration 5) tidak gagal.

DO $$
DECLARE
  r RECORD;
  cond TEXT := 'public.is_authenticated() AND (%s = (SELECT auth.email()) OR public.is_admin())';
BEGIN
  FOR r IN SELECT * FROM (VALUES
    ('muser_read_v2',   'muser', 'email',     true,  false),
    ('muser_read_self', 'muser', 'email',     true,  false),
    ('ureq_read',       'ureq',  'from_user', true,  false),
    ('ureq_read_v2',    'ureq',  'from_user', true,  false),
    ('ureq_write',      'ureq',  'from_user', true,  true),
    ('ureq_write_v2',   'ureq',  'from_user', true,  true)
  ) AS v(pol, tbl, col, has_using, has_check)
  LOOP
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = r.tbl AND policyname = r.pol) THEN
      EXECUTE format('ALTER POLICY %I ON public.%I USING (%s)%s', r.pol, r.tbl,
        format(cond, r.col),
        CASE WHEN r.has_check THEN ' WITH CHECK (' || format(cond, r.col) || ')' ELSE '' END);
    END IF;
  END LOOP;
END;
$$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension e JOIN pg_namespace n ON n.oid = e.extnamespace WHERE e.extname = 'pg_trgm' AND n.nspname = 'public')
     AND EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'extensions') THEN
    ALTER EXTENSION pg_trgm SET SCHEMA extensions;
  END IF;
END;
$$;
