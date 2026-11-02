-- ============================================================
-- MNI Gudang - Row Level Security Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE mwc ENABLE ROW LEVEL SECURITY;
ALTER TABLE mvendor ENABLE ROW LEVEL SECURITY;
ALTER TABLE mcustomer ENABLE ROW LEVEL SECURITY;
ALTER TABLE msupplier ENABLE ROW LEVEL SECURITY;
ALTER TABLE marmada ENABLE ROW LEVEL SECURITY;
ALTER TABLE muser ENABLE ROW LEVEL SECURITY;
ALTER TABLE rm ENABLE ROW LEVEL SECURITY;
ALTER TABLE fg ENABLE ROW LEVEL SECURITY;
ALTER TABLE mutasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE rmhist ENABLE ROW LEVEL SECURITY;
ALTER TABLE opname ENABLE ROW LEVEL SECURITY;
ALTER TABLE spk ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor ENABLE ROW LEVEL SECURITY;
ALTER TABLE pr ENABLE ROW LEVEL SECURITY;
ALTER TABLE kirim ENABLE ROW LEVEL SECURITY;
ALTER TABLE bongkar ENABLE ROW LEVEL SECURITY;
ALTER TABLE master ENABLE ROW LEVEL SECURITY;
ALTER TABLE log ENABLE ROW LEVEL SECURITY;
ALTER TABLE ureq ENABLE ROW LEVEL SECURITY;
ALTER TABLE uinv ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- HELPER FUNCTION: get current user role
-- ============================================================

CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  SELECT role INTO v_role
  FROM muser
  WHERE email = auth.email()
    AND aktif = true;
  RETURN COALESCE(v_role, 'viewer');
EXCEPTION WHEN OTHERS THEN
  RETURN 'viewer';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- HELPER: Check if user is authenticated and active
-- ============================================================

CREATE OR REPLACE FUNCTION is_authenticated()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated') AND EXISTS (
    SELECT 1 FROM muser WHERE email = auth.email() AND aktif = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin_or_manager()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN get_user_role() IN ('admin', 'manager');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- MASTER DATA POLICIES (READ = all authenticated, WRITE = admin/manager)
-- ============================================================

-- mwc
CREATE POLICY "mwc_read" ON mwc FOR SELECT USING (is_authenticated());
CREATE POLICY "mwc_write" ON mwc FOR ALL USING (is_admin_or_manager());

-- mvendor
CREATE POLICY "mvendor_read" ON mvendor FOR SELECT USING (is_authenticated());
CREATE POLICY "mvendor_write" ON mvendor FOR ALL USING (is_admin_or_manager());

-- mcustomer
CREATE POLICY "mcustomer_read" ON mcustomer FOR SELECT USING (is_authenticated());
CREATE POLICY "mcustomer_write" ON mcustomer FOR ALL USING (is_admin_or_manager());

-- msupplier
CREATE POLICY "msupplier_read" ON msupplier FOR SELECT USING (is_authenticated());
CREATE POLICY "msupplier_write" ON msupplier FOR ALL USING (is_admin_or_manager());

-- marmada
CREATE POLICY "marmada_read" ON marmada FOR SELECT USING (is_authenticated());
CREATE POLICY "marmada_write" ON marmada FOR ALL USING (is_admin_or_manager());

-- muser (only admin can manage users, all can read own data)
CREATE POLICY "muser_read_self" ON muser FOR SELECT USING (
  is_authenticated() AND (email = auth.email() OR is_admin_or_manager())
);
CREATE POLICY "muser_write" ON muser FOR ALL USING (get_user_role() = 'admin');

-- master (settings)
CREATE POLICY "master_read" ON master FOR SELECT USING (is_authenticated());
CREATE POLICY "master_write" ON master FOR ALL USING (is_admin_or_manager());

-- ============================================================
-- INVENTORY POLICIES
-- ============================================================

-- rm & fg: read all, write = admin/manager/gudang
CREATE POLICY "rm_read" ON rm FOR SELECT USING (is_authenticated());
CREATE POLICY "rm_write" ON rm FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

CREATE POLICY "fg_read" ON fg FOR SELECT USING (is_authenticated());
CREATE POLICY "fg_write" ON fg FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- mutasi: read all, write = gudang+
CREATE POLICY "mutasi_read" ON mutasi FOR SELECT USING (is_authenticated());
CREATE POLICY "mutasi_write" ON mutasi FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- rmhist: read all, write = gudang+
CREATE POLICY "rmhist_read" ON rmhist FOR SELECT USING (is_authenticated());
CREATE POLICY "rmhist_write" ON rmhist FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- opname: read all, write = gudang+
CREATE POLICY "opname_read" ON opname FOR SELECT USING (is_authenticated());
CREATE POLICY "opname_write" ON opname FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- ============================================================
-- PRODUCTION POLICIES
-- ============================================================

-- spk: read all, write = produksi+
CREATE POLICY "spk_read" ON spk FOR SELECT USING (is_authenticated());
CREATE POLICY "spk_write" ON spk FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'produksi')
);

-- vendor: read all, write = produksi+
CREATE POLICY "vendor_read" ON vendor FOR SELECT USING (is_authenticated());
CREATE POLICY "vendor_write" ON vendor FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'produksi')
);

-- pr: read all, write = manager+
CREATE POLICY "pr_read" ON pr FOR SELECT USING (is_authenticated());
CREATE POLICY "pr_write" ON pr FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- ============================================================
-- LOGISTICS POLICIES
-- ============================================================

-- kirim: read all, write = gudang+
CREATE POLICY "kirim_read" ON kirim FOR SELECT USING (is_authenticated());
CREATE POLICY "kirim_write" ON kirim FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- bongkar: read all, write = gudang+
CREATE POLICY "bongkar_read" ON bongkar FOR SELECT USING (is_authenticated());
CREATE POLICY "bongkar_write" ON bongkar FOR ALL USING (
  get_user_role() IN ('admin', 'manager', 'gudang')
);

-- ============================================================
-- AUDIT & NOTIFICATION POLICIES
-- ============================================================

-- log: read = admin/manager, write = all authenticated
CREATE POLICY "log_read" ON log FOR SELECT USING (is_admin_or_manager());
CREATE POLICY "log_write" ON log FOR INSERT WITH CHECK (is_authenticated());

-- ureq: read own, write own
CREATE POLICY "ureq_read" ON ureq FOR SELECT USING (
  is_authenticated() AND (from_user = auth.email() OR is_admin_or_manager())
);
CREATE POLICY "ureq_write" ON ureq FOR ALL USING (is_authenticated());

-- uinv: admin only
CREATE POLICY "uinv_admin" ON uinv FOR ALL USING (get_user_role() = 'admin');
