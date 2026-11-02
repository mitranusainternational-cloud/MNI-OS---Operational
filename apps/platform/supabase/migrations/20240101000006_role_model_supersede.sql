-- ============================================================
-- MNI Gudang - Policy lama diganti isinya (ALTER, tanpa DROP) — 2026-11-02
-- ============================================================
-- Tujuan sama dengan 20240101000005 (menghapus hak role lama manager/gudang/produksi dan hak tulis log
-- untuk viewer) tetapi memakai ALTER POLICY sehingga tidak ada pernyataan DROP. Setelah ini setiap
-- policy lama memiliki aturan yang sama dengan padanan _v2-nya (duplikat tidak berbahaya). Migration 5
-- (DROP) menjadi pembersihan kosmetik opsional untuk menghapus duplikat.

-- Master data
ALTER POLICY "mwc_write"       ON public.mwc TO authenticated       USING (public.can_any()) WITH CHECK (public.can_any());
ALTER POLICY "mvendor_write"   ON public.mvendor TO authenticated   USING (public.can_any()) WITH CHECK (public.can_any());
ALTER POLICY "mcustomer_write" ON public.mcustomer TO authenticated USING (public.can_any()) WITH CHECK (public.can_any());
ALTER POLICY "msupplier_write" ON public.msupplier TO authenticated USING (public.can_any()) WITH CHECK (public.can_any());
ALTER POLICY "marmada_write"   ON public.marmada TO authenticated   USING (public.can_any()) WITH CHECK (public.can_any());
ALTER POLICY "master_write"    ON public.master TO authenticated    USING (public.can_any()) WITH CHECK (public.can_any());

-- Gudang
ALTER POLICY "rm_write"     ON public.rm TO authenticated     USING (public.can_mod('bahan-baku')) WITH CHECK (public.can_mod('bahan-baku'));
ALTER POLICY "rmhist_write" ON public.rmhist TO authenticated USING (public.can_mod('bahan-baku')) WITH CHECK (public.can_mod('bahan-baku'));
ALTER POLICY "pr_write"     ON public.pr TO authenticated     USING (public.can_mod('bahan-baku')) WITH CHECK (public.can_mod('bahan-baku'));
ALTER POLICY "opname_write" ON public.opname TO authenticated USING (public.can_mod('bahan-baku')) WITH CHECK (public.can_mod('bahan-baku'));
ALTER POLICY "fg_write"     ON public.fg TO authenticated     USING (public.can_mod('barang-jadi')) WITH CHECK (public.can_mod('barang-jadi'));
ALTER POLICY "mutasi_write" ON public.mutasi TO authenticated
  USING      (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END))
  WITH CHECK (public.can_mod(CASE WHEN gudang = 'rm' THEN 'bahan-baku' ELSE 'barang-jadi' END));

-- Produksi dan logistik
ALTER POLICY "spk_write"    ON public.spk TO authenticated    USING (public.can_mod('spk')) WITH CHECK (public.can_mod('spk'));
ALTER POLICY "vendor_write" ON public.vendor TO authenticated USING (public.can_mod('vendor')) WITH CHECK (public.can_mod('vendor'));
ALTER POLICY "kirim_write"  ON public.kirim TO authenticated  USING (public.can_mod('pengiriman')) WITH CHECK (public.can_mod('pengiriman'));
ALTER POLICY "bongkar_write" ON public.bongkar TO authenticated
  USING      (public.can_mod('bongkar-muat') OR (COALESCE((data ->> 'auto')::boolean, false) AND public.can_any()))
  WITH CHECK (public.can_mod('bongkar-muat') OR (COALESCE((data ->> 'auto')::boolean, false) AND public.can_any()));

-- Pengguna, undangan, log, permintaan akses
ALTER POLICY "muser_read_self" ON public.muser TO authenticated USING (public.is_authenticated() AND (email = auth.email() OR public.is_admin()));
ALTER POLICY "muser_write"     ON public.muser TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
ALTER POLICY "uinv_admin"      ON public.uinv TO authenticated  USING (public.is_admin()) WITH CHECK (public.is_admin());
ALTER POLICY "log_read"        ON public.log TO authenticated   USING (public.is_admin());
ALTER POLICY "log_write"       ON public.log TO authenticated   WITH CHECK (public.can_any());
ALTER POLICY "ureq_read"       ON public.ureq TO authenticated  USING (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()));
ALTER POLICY "ureq_write"      ON public.ureq TO authenticated
  USING      (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()))
  WITH CHECK (public.is_authenticated() AND (from_user = auth.email() OR public.is_admin()));
