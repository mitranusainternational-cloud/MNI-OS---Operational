-- ============================================================
-- MNI Gudang - Penanda perubahan tabel untuk sinkron antar pengguna (2026-11-03)
-- ============================================================
-- Aplikasi memuat ulang data sebuah tabel hanya bila isinya berubah. Fungsi ini mengembalikan, dalam SATU
-- panggilan kecil, sidik tiap tabel ("jumlah baris|waktu ubah terbaru"). Klien memeriksanya tiap beberapa detik
-- dan memuat ulang hanya tabel yang sidiknya berubah, sehingga perubahan satu pengguna terlihat pengguna lain
-- dalam hitungan detik tanpa mengunduh semua data berulang kali (hemat kuota).
-- SECURITY INVOKER: dihitung dengan hak pemanggil, jadi tunduk pada RLS (hanya baris yang boleh dilihatnya).

CREATE OR REPLACE FUNCTION public.table_stamps()
RETURNS JSONB LANGUAGE plpgsql STABLE SECURITY INVOKER SET search_path = public, pg_temp AS $$
DECLARE
  t TEXT;
  v TEXT;
  res JSONB := '{}'::jsonb;
BEGIN
  FOREACH t IN ARRAY ARRAY['rm','fg','mutasi','spk','vendor','kirim','bongkar','master','mvendor','mcustomer',
                           'msupplier','marmada','rmhist','pr','opname','muser','log','mwc'] LOOP
    EXECUTE format(
      'SELECT count(*)::text || ''|'' || COALESCE(max(COALESCE(to_jsonb(x) ->> ''updated_at'', to_jsonb(x) ->> ''created_at'')), '''') FROM public.%I x', t)
      INTO v;
    res := res || jsonb_build_object(t, v);
  END LOOP;
  RETURN res;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.table_stamps() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.table_stamps() TO authenticated;
