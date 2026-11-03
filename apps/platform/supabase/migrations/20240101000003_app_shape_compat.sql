-- ============================================================
-- MNI Gudang - Kompatibilitas bentuk dokumen app (2026-11-02)
-- ============================================================
-- Alasan: dokumen yang ditulis app (dari prototipe berbasis dokumen) memuat banyak
-- bidang yang tidak ada di migration awal (mis. bongkar.jenis/muatan/pihak, kirim.kendaraan,
-- vendor.riwayat, log.c/d/k, mutasi.item) dan tidak selalu mengisi kolom NOT NULL
-- (mis. mutasi.item_id, bongkar.supplier). Tanpa penyesuaian, Postgres menolak penulisan.
--
-- Pendekatan sementara (sampai discovery menetapkan model data final, T-033):
--   1. Tiap tabel mendapat kolom JSONB "data" untuk bidang tambahan; adapter
--      memecah dan menggabungkannya.
--   2. Kolom NOT NULL tanpa default (selain kunci bisnis) dilonggarkan.
-- Kunci bisnis yang tetap wajib: muser.email, master.key, spk.no.

DO $$
DECLARE
  t TEXT;
  c RECORD;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'mwc','mvendor','mcustomer','msupplier','marmada','muser',
    'rm','fg','mutasi','rmhist','opname','spk','vendor','pr',
    'kirim','bongkar','log','ureq','uinv'
  ])
  LOOP
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS data JSONB NOT NULL DEFAULT ''{}''::jsonb', t);

    FOR c IN
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = t
        AND is_nullable = 'NO' AND column_default IS NULL
        AND column_name NOT IN ('id','data')
        AND NOT (t = 'muser' AND column_name = 'email')
        AND NOT (t = 'spk' AND column_name = 'no')
    LOOP
      EXECUTE format('ALTER TABLE public.%I ALTER COLUMN %I DROP NOT NULL', t, c.column_name);
    END LOOP;
  END LOOP;
END;
$$;

-- Dokumen master (pengaturan) memakai key/value; data adalah JSON bebas.
ALTER TABLE public.master ALTER COLUMN value DROP NOT NULL;

-- Fungsi bantu keamanan: kunci search_path agar tidak bisa dibajak (saran advisor Supabase).
ALTER FUNCTION public.get_user_role() SET search_path = public, pg_temp;
ALTER FUNCTION public.is_authenticated() SET search_path = public, pg_temp;
ALTER FUNCTION public.is_admin_or_manager() SET search_path = public, pg_temp;
ALTER FUNCTION public.update_updated_at() SET search_path = public, pg_temp;
