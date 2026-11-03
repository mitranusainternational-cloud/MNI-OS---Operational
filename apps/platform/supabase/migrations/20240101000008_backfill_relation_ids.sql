-- ============================================================
-- MNI Gudang - Isi kolom relasi dari bidang JSONB (2026-11-03, B-016)
-- ============================================================
-- Sebelumnya app hanya menyimpan item/spk di JSONB "data"; kolom mutasi.item_id, kirim.spk_id, vendor.spk_id
-- kosong. Adapter kini mengisi kolom itu saat menulis (linkIds). Migration ini mengisi baris lama.
-- Hanya UPDATE (tanpa DROP/DELETE); nilai yang bukan UUID atau SPK yang tidak ada dilewati.

UPDATE public.mutasi
   SET item_id = (data ->> 'item')::uuid
 WHERE item_id IS NULL
   AND data ->> 'item' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

UPDATE public.kirim k
   SET spk_id = (k.data ->> 'spk')::uuid
 WHERE k.spk_id IS NULL
   AND k.data ->> 'spk' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
   AND EXISTS (SELECT 1 FROM public.spk s WHERE s.id = (k.data ->> 'spk')::uuid);

UPDATE public.vendor v
   SET spk_id = (v.data ->> 'spk')::uuid
 WHERE v.spk_id IS NULL
   AND v.data ->> 'spk' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
   AND EXISTS (SELECT 1 FROM public.spk s WHERE s.id = (v.data ->> 'spk')::uuid);
