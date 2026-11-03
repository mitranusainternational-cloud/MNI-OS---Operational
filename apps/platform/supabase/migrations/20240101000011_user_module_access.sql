-- ============================================================
-- MNI Gudang - Hak akses per pengguna dan per modul (2026-11-03)
-- ============================================================
-- Sampai migration 10, hak ditentukan peran (role_modules) dan semua pengguna aktif membaca semua data.
-- Sekarang admin dapat menentukan per pengguna modul mana yang boleh DILIHAT dan mana yang boleh DIUBAH.
--
-- Penyimpanan: muser.data -> 'modul' = objek {"bahan-baku":"ubah","spk":"lihat",...}.
--   - modul memiliki nilai 'ubah' (lihat dan catat) atau 'lihat' (hanya lihat); modul yang tidak tercantum tidak terlihat.
--   - muser.data tanpa kunci 'modul' (NULL) = perilaku lama: hak ubah mengikuti role_modules, semua modul dapat dilihat.
--   - role 'admin' (super admin) selalu memiliki semua modul dengan hak ubah.
-- Hanya MENAMBAH fungsi dan mengubah ekspresi policy baca (ALTER POLICY, tanpa DROP). Aman diputar ulang.

CREATE OR REPLACE FUNCTION public.mod_level(m TEXT)
RETURNS TEXT LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT CASE
    WHEN u.role = 'admin' THEN 'ubah'
    WHEN jsonb_typeof(u.data -> 'modul') = 'object' THEN
      CASE u.data -> 'modul' ->> m WHEN 'ubah' THEN 'ubah' WHEN 'lihat' THEN 'lihat' ELSE NULL END
    WHEN EXISTS (SELECT 1 FROM public.role_modules r WHERE r.role = u.role AND r.module = m) THEN 'ubah'
    ELSE 'lihat'
  END
  FROM public.muser u
  WHERE u.email = (SELECT auth.email()) AND u.aktif;
$$;

CREATE OR REPLACE FUNCTION public.can_view(m TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT public.mod_level(m) IS NOT NULL;
$$;

CREATE OR REPLACE FUNCTION public.can_mod(m TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT COALESCE(public.mod_level(m) = 'ubah', false);
$$;

-- "salah satu modul" (modOf = '*any'): pengguna yang boleh mencatat di setidaknya satu modul
CREATE OR REPLACE FUNCTION public.can_any()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.muser u
    WHERE u.email = (SELECT auth.email()) AND u.aktif
      AND (u.role = 'admin'
        OR (jsonb_typeof(u.data -> 'modul') = 'object'
            AND EXISTS (SELECT 1 FROM jsonb_each_text(u.data -> 'modul') j WHERE j.value = 'ubah'))
        OR (jsonb_typeof(u.data -> 'modul') IS DISTINCT FROM 'object'
            AND EXISTS (SELECT 1 FROM public.role_modules r WHERE r.role = u.role)))
  );
$$;

REVOKE EXECUTE ON FUNCTION public.mod_level(TEXT), public.can_view(TEXT) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.mod_level(TEXT), public.can_view(TEXT) TO authenticated;
REVOKE EXECUTE ON FUNCTION public.can_mod(TEXT), public.can_any() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.can_mod(TEXT), public.can_any() TO authenticated;

-- Peran 'produksi' (tim produksi) pada peta bawaan: mengubah SPK dan progresnya.
INSERT INTO public.role_modules (role, module) VALUES ('produksi', 'spk') ON CONFLICT DO NOTHING;

-- Baca per modul. Master data (vendor, customer, supplier, armada, wc) dan pengaturan (master) tetap
-- terbaca semua pengguna aktif karena dipakai sebagai pilihan di setiap formulir.
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT * FROM (VALUES
    ('rm_read',      'rm',      'public.can_view(''bahan-baku'')'),
    ('rmhist_read',  'rmhist',  'public.can_view(''bahan-baku'')'),
    ('pr_read',      'pr',      'public.can_view(''bahan-baku'')'),
    ('opname_read',  'opname',  'public.can_view(''bahan-baku'')'),
    ('fg_read',      'fg',      'public.can_view(''barang-jadi'')'),
    ('spk_read',     'spk',     'public.can_view(''spk'')'),
    ('vendor_read',  'vendor',  'public.can_view(''vendor'')'),
    ('kirim_read',   'kirim',   'public.can_view(''pengiriman'')'),
    ('bongkar_read', 'bongkar', 'public.can_view(''bongkar-muat'')'),
    ('mutasi_read',  'mutasi',  'public.can_view(CASE WHEN gudang = ''rm'' THEN ''bahan-baku'' ELSE ''barang-jadi'' END)')
  ) AS v(pol, tbl, expr)
  LOOP
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = r.tbl AND policyname = r.pol) THEN
      EXECUTE format('ALTER POLICY %I ON public.%I USING (%s)', r.pol, r.tbl, r.expr);
    ELSE
      EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO authenticated USING (%s)', r.pol, r.tbl, r.expr);
    END IF;
  END LOOP;
END;
$$;

-- Penjaga admin terakhir: selalu harus ada minimal satu super admin aktif.
CREATE OR REPLACE FUNCTION public.guard_last_admin()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public, pg_temp AS $$
BEGIN
  IF OLD.role = 'admin' AND OLD.aktif
     AND (TG_OP = 'DELETE' OR NEW.role <> 'admin' OR NOT NEW.aktif)
     AND NOT EXISTS (SELECT 1 FROM public.muser m WHERE m.role = 'admin' AND m.aktif AND m.id <> OLD.id) THEN
    RAISE EXCEPTION 'Harus ada minimal satu super admin aktif.' USING ERRCODE = 'P0001';
  END IF;
  IF TG_OP = 'DELETE' THEN RETURN OLD; END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.guard_last_admin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_guard_last_admin ON public.muser;
CREATE TRIGGER trg_guard_last_admin BEFORE UPDATE OR DELETE ON public.muser
  FOR EACH ROW EXECUTE FUNCTION public.guard_last_admin();
