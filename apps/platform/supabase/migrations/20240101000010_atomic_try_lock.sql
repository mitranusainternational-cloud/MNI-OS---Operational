-- ============================================================
-- MNI Gudang - Kunci atomik untuk penomoran dokumen (2026-11-03)
-- ============================================================
-- Sebelumnya adapter membaca lalu menulis baris kunci di tabel master (cek-lalu-tulis), sehingga dua pengguna
-- yang menyimpan pada milidetik yang sama dapat sama-sama "mendapat" kunci dan memakai nomor dokumen yang sama.
-- try_lock memakai satu pernyataan INSERT ... ON CONFLICT DO UPDATE ... WHERE yang atomik: kunci hanya berpindah
-- bila sudah kedaluwarsa atau dipegang pemanggil yang sama. SECURITY INVOKER: RLS tabel master tetap berlaku.

CREATE OR REPLACE FUNCTION public.try_lock(p_key TEXT, p_holder TEXT, p_ttl_ms BIGINT DEFAULT 30000)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  now_ms BIGINT := (extract(epoch FROM clock_timestamp()) * 1000)::BIGINT;
  got TEXT;
  cur JSONB;
BEGIN
  INSERT INTO public.master AS m (key, value)
  VALUES (p_key, jsonb_build_object('holder', p_holder, 'expires', now_ms + p_ttl_ms))
  ON CONFLICT (key) DO UPDATE
    SET value = jsonb_build_object('holder', p_holder, 'expires', now_ms + p_ttl_ms),
        updated_at = now()
    WHERE COALESCE((CASE WHEN jsonb_typeof(m.value) = 'object' THEN m.value ->> 'expires' END)::BIGINT, 0) <= now_ms
       OR (CASE WHEN jsonb_typeof(m.value) = 'object' THEN m.value ->> 'holder' END) = p_holder
  RETURNING m.key INTO got;

  IF got IS NOT NULL THEN
    RETURN jsonb_build_object('acquired', true);
  END IF;

  SELECT value INTO cur FROM public.master WHERE key = p_key;
  RETURN jsonb_build_object('acquired', false,
    'holder', CASE WHEN jsonb_typeof(cur) = 'object' THEN cur ->> 'holder' END,
    'expires', CASE WHEN jsonb_typeof(cur) = 'object' THEN (cur ->> 'expires')::BIGINT END);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.try_lock(TEXT, TEXT, BIGINT) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.try_lock(TEXT, TEXT, BIGINT) TO authenticated;
