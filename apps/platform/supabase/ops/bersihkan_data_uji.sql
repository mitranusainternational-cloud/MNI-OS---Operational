-- ============================================================
-- MNI Gudang - Pembersihan data uji sebelum go-live (bukan migration)
-- ============================================================
-- Jalankan HANYA oleh pemilik di SQL Editor project MNI Gudang - Production, SEBELUM ada data nyata.
-- Mengosongkan semua tabel transaksi, master, log, penghitung nomor (master), dan kunci; mempertahankan
-- `muser` (akun admin) dan `role_modules` (peta hak). Penomoran dokumen akan mulai lagi dari 001.
--
-- Pengaman: berhenti bila ada baris yang tidak bertanda uji. Tanda uji = "UJI-PROD" pada customer SPK,
-- item bahan baku, atau nama vendor/supplier. Jika Anda sudah memasukkan data nyata, JANGAN jalankan skrip ini.

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.spk WHERE customer NOT ILIKE '%UJI-PROD%')
     OR EXISTS (SELECT 1 FROM public.rm WHERE item NOT ILIKE '%UJI-PROD%')
     OR EXISTS (SELECT 1 FROM public.mvendor WHERE nama NOT ILIKE '%UJI-PROD%')
     OR EXISTS (SELECT 1 FROM public.msupplier WHERE nama NOT ILIKE '%UJI-PROD%')
     OR EXISTS (SELECT 1 FROM public.fg)
     OR EXISTS (SELECT 1 FROM public.marmada)
     OR EXISTS (SELECT 1 FROM public.mwc) THEN
    RAISE EXCEPTION 'Ditemukan data yang tidak bertanda UJI-PROD (atau tabel fg/marmada/mwc terisi). Periksa dulu; pembersihan dibatalkan.';
  END IF;
END;
$$;

TRUNCATE TABLE
  public.log, public.mutasi, public.rmhist, public.opname, public.pr,
  public.vendor, public.kirim, public.bongkar, public.spk,
  public.rm, public.fg,
  public.mvendor, public.mcustomer, public.msupplier, public.marmada, public.mwc,
  public.ureq, public.uinv, public.master
RESTART IDENTITY CASCADE;

-- Periksa hasil: semua nol kecuali muser (1+) dan role_modules (10).
SELECT 'muser' AS tabel, count(*) FROM public.muser
UNION ALL SELECT 'role_modules', count(*) FROM public.role_modules
UNION ALL SELECT 'spk', count(*) FROM public.spk
UNION ALL SELECT 'mutasi', count(*) FROM public.mutasi
UNION ALL SELECT 'master', count(*) FROM public.master;
