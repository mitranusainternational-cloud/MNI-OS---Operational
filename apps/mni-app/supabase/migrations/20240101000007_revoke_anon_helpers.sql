-- ============================================================
-- MNI Gudang - Cabut hak anon atas fungsi pembantu lama (2026-11-02)
-- ============================================================
-- Temuan advisor keamanan: get_user_role(), is_admin_or_manager(), is_authenticated() (SECURITY DEFINER)
-- dapat dipanggil role anon lewat /rest/v1/rpc. Semua policy memakai fungsi ini hanya untuk role
-- authenticated, jadi mencabut dari anon tidak mengubah perilaku aplikasi.
REVOKE EXECUTE ON FUNCTION public.get_user_role(), public.is_admin_or_manager(), public.is_authenticated() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.get_user_role(), public.is_admin_or_manager(), public.is_authenticated() TO authenticated;
