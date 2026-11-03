-- ============================================================
-- MNI Gudang - Model role selaras aplikasi (2026-11-02) — bagian TAMBAHAN
-- ============================================================
-- Masalah: policy awal memakai role admin/manager/gudang/produksi/viewer, sedangkan aplikasi
-- (ROLES/MODL/modOf di apps/gudang-logistik) mendefinisikan role admin, ppic, gbb, gbj,
-- logistik, viewer dengan hak per modul. Akibatnya alur nyata gagal bagi role non-admin.
--
-- Migration ini hanya MENAMBAH (tanpa DROP): tabel role_modules, fungsi can_mod()/can_any()/is_admin(),
-- dan policy baru. Policy lama dibersihkan di 20240101000005_role_model_cleanup.sql (berisi DROP,
-- perlu persetujuan eksplisit). Policy bersifat permisif (OR), jadi sampai cleanup dijalankan, hak lama
-- (role manager/gudang/produksi) masih berlaku bersama hak baru; role app (ppic, gbb, gbj, logistik)
-- hanya mendapat hak baru.
--
-- Peta role ke modul bersifat SEMENTARA sampai disahkan tim Operasional (T-036); ubah dengan mengisi
-- tabel role_modules. Peta modul ke tabel mengikuti modOf() di aplikasi.

CREATE TABLE public.role_modules (
  role   TEXT NOT NULL,
  module TEXT NOT NULL,
  PRIMARY KEY (role, module)
);
ALTER TABLE public.role_modules ENABLE ROW LEVEL SECURITY;

INSERT INTO public.role_modules (role, module) VALUES
  ('ppic',     'spk'),          ('ppic',     'vendor'),
  ('gbb',      'bahan-baku'),   ('gbb',      'bongkar-muat'),
  ('gbj',      'barang-jadi'),  ('gbj',      'vendor'),  ('gbj', 'pengiriman'), ('gbj', 'bongkar-muat'),
  ('logistik', 'pengiriman'),   ('logistik', 'bongkar-muat');
-- admin memiliki semua modul (ditangani di fungsi); viewer tidak memiliki modul.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (SELECT 1 FROM public.muser u WHERE u.email = auth.email() AND u.aktif AND u.role = 'admin');
$$;

CREATE OR REPLACE FUNCTION public.can_mod(m TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.muser u
    WHERE u.email = auth.email() AND u.aktif
      AND (u.role = 'admin' OR EXISTS (SELECT 1 FROM public.role_modules r WHERE r.role = u.role AND r.module = m))
  );
$$;

-- "salah satu modul" (modOf = '*any'): pengguna yang boleh mencatat apa pun
CREATE OR REPLACE FUNCTION public.can_any()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.muser u
    WHERE u.email = auth.email() AND u.aktif
      AND (u.role = 'admin' OR EXISTS (SELECT 1 FROM public.role_modules r WHERE r.role = u.role))
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin(), public.can_mod(TEXT), public.can_any() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.is_admin(), public.can_mod(TEXT), public.can_any() TO authenticated;

-- Kebijakan baru (semua TO authenticated; nama berakhiran _v2 agar tidak bentrok dengan kebijakan lama)
CREATE POLICY "role_modules_read"  ON public.role_modules FOR SELECT TO authenticated USING (public.is_authenticated());
CREATE POLICY "role_modules_write" ON public.role_modules FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "muser_read_v2"  ON public.muser FOR SELECT TO authenticated USING (public.is_authenticated() AND (email = auth.email() OR public.is_admin()));
CREATE POLICY "muser_write_v2" ON public.muser FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "uinv_admin_v2"  ON public.uinv FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Tabel dengan hak tulis menurut modul: INSERT (WITH CHECK), UPDATE (USING + WITH CHECK), DELETE (USING).
DO $$
DECLARE
  spec RECORD;
BEGIN
  FOR spec IN SELECT * FROM (VALUES
    ('rm',        'public.can_mod(''bahan-baku'')'),
    ('rmhist',    'public.can_mod(''bahan-baku'')'),
    ('pr',        'public.can_mod(''bahan-baku'')'),
    ('opname',    'public.can_mod(''bahan-baku'')'),
    ('fg',        'public.can_mod(''barang-jadi'')'),
    ('spk',       'public.can_mod(''spk'')'),
    ('vendor',    'public.can_mod(''vendor'')'),
    ('kirim',     'public.can_mod(''pengiriman'')'),
    -- master data: tambah/ubah oleh siapa pun yang boleh mencatat; hapus hanya admin (modul master-data)
    ('mwc',       'public.can_any()'),
    ('mvendor',   'public.can_any()'),
    ('mcustomer', 'public.can_any()'),
    ('msupplier', 'public.can_any()'),
    ('marmada',   'public.can_any()')
  ) AS v(tbl, expr)
  LOOP
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO authenticated WITH CHECK (%s)', spec.tbl || '_ins_v2', spec.tbl, spec.expr);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO authenticated USING (%s) WITH CHECK (%s)', spec.tbl || '_upd_v2', spec.tbl, spec.expr, spec.expr);
    IF spec.tbl IN ('mwc', 'mvendor', 'mcustomer', 'msupplier', 'marmada') THEN
      EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING (public.can_mod(''master-data''))', spec.tbl || '_del_v2', spec.tbl);
    ELSE
      EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO authenticated USING (%s)', spec.tbl || '_del_v2', spec.tbl, spec.expr);
    END IF;
  END LOOP;
END;
$$;

-- mutasi: modul ditentukan kolom gudang ('rm' = bahan-baku, selain itu barang-jadi); modOf() di app.
CREATE POLICY "mutasi_ins_v2" ON public.mutasi FOR INSERT TO authenticated
  WITH CHECK (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END));
CREATE POLICY "mutasi_upd_v2" ON public.mutasi FOR UPDATE TO authenticated
  USING      (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END))
  WITH CHECK (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END));
CREATE POLICY "mutasi_del_v2" ON public.mutasi FOR DELETE TO authenticated
  USING (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END));

-- bongkar: entri otomatis (dari surat jalan/kirim vendor; data.auto = true) boleh oleh siapa pun yang boleh
-- mencatat (modOf '*any'); entri manual hanya modul bongkar-muat.
CREATE POLICY "bongkar_ins_v2" ON public.bongkar FOR INSERT TO authenticated
  WITH CHECK (public.can_mod('bongkar-muat') OR (COALESCE((data ->> 'auto')::boolean, false) AND public.can_any()));
CREATE POLICY "bongkar_upd_v2" ON public.bongkar FOR UPDATE TO authenticated
  USING      (public.can_mod('bongkar-muat') OR (COALESCE((data ->> 'auto')::boolean, false) AND public.can_any()))
  WITH CHECK (public.can_mod('bongkar-muat') OR (COALESCE((data ->> 'auto')::boolean, false) AND public.can_any()));
CREATE POLICY "bongkar_del_v2" ON public.bongkar FOR DELETE TO authenticated USING (public.can_mod('bongkar-muat'));

-- master (pengaturan, penghitung nomor, kunci dokumen): siapa pun yang boleh mencatat (modOf '*any').
CREATE POLICY "master_ins_v2" ON public.master FOR INSERT TO authenticated WITH CHECK (public.can_any());
CREATE POLICY "master_upd_v2" ON public.master FOR UPDATE TO authenticated USING (public.can_any()) WITH CHECK (public.can_any());
CREATE POLICY "master_del_v2" ON public.master FOR DELETE TO authenticated USING (public.can_any());

-- log aktivitas dan permintaan akses
CREATE POLICY "log_read_v2"  ON public.log FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "log_write_v2" ON public.log FOR INSERT TO authenticated WITH CHECK (public.can_any());
CREATE POLICY "ureq_read_v2"  ON public.ureq FOR SELECT TO authenticated USING (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()));
CREATE POLICY "ureq_write_v2" ON public.ureq FOR ALL TO authenticated
  USING (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()))
  WITH CHECK (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()));
