-- ============================================================
-- MNI Gudang - Supabase Migration v1
-- Migrated from Firestore to PostgreSQL
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================
-- MASTER DATA TABLES
-- ============================================================

-- Master Work Center (mwc)
CREATE TABLE mwc (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kode TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  tipe TEXT NOT NULL DEFAULT 'Internal', -- 'Internal' | 'Subcont'
  urutan INTEGER NOT NULL DEFAULT 0,
  aktif BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Master Vendor (mvendor)
CREATE TABLE mvendor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  kode TEXT,
  alamat TEXT,
  telp TEXT,
  pic TEXT,
  aktif BOOLEAN NOT NULL DEFAULT true,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Master Customer (mcustomer)
CREATE TABLE mcustomer (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  kode TEXT,
  alamat TEXT,
  telp TEXT,
  pic TEXT,
  aktif BOOLEAN NOT NULL DEFAULT true,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Master Supplier (msupplier)
CREATE TABLE msupplier (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nama TEXT NOT NULL,
  kode TEXT,
  alamat TEXT,
  telp TEXT,
  pic TEXT,
  aktif BOOLEAN NOT NULL DEFAULT true,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Master Armada (marmada) - kendaraan pengiriman
CREATE TABLE marmada (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nopol TEXT NOT NULL,
  jenis TEXT,
  kapasitas NUMERIC,
  driver TEXT,
  aktif BOOLEAN NOT NULL DEFAULT true,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Master User (muser)
CREATE TABLE muser (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  nama TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer', -- 'admin' | 'manager' | 'produksi' | 'gudang' | 'viewer'
  aktif BOOLEAN NOT NULL DEFAULT true,
  foto TEXT,
  ket TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- ============================================================
-- INVENTORY TABLES
-- ============================================================

-- Raw Material (rm)
CREATE TABLE rm (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item TEXT NOT NULL,
  ukuran TEXT NOT NULL,
  satuan TEXT NOT NULL DEFAULT 'pcs',
  grade TEXT,
  tebal NUMERIC,
  lebar NUMERIC,
  panjang NUMERIC,
  stok_awal NUMERIC NOT NULL DEFAULT 0,
  tgl_stok_awal DATE,
  buffer NUMERIC DEFAULT 0,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Finished Goods (fg)
CREATE TABLE fg (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kategori TEXT NOT NULL,
  type TEXT,
  ukuran TEXT NOT NULL,
  panjang NUMERIC,
  finishing TEXT,
  tebal NUMERIC,
  satuan TEXT NOT NULL DEFAULT 'pcs',
  stok_awal NUMERIC NOT NULL DEFAULT 0,
  tgl_stok_awal DATE,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- Stock mutation / history (mutasi)
CREATE TABLE mutasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gudang TEXT NOT NULL, -- 'rm' | 'fg'
  item_id UUID NOT NULL, -- references rm.id or fg.id
  tgl DATE NOT NULL,
  jenis TEXT NOT NULL, -- 'masuk' | 'keluar' | 'opname' | 'transfer' | 'retur'
  delta NUMERIC NOT NULL, -- positive = masuk, negative = keluar
  no_dok TEXT,
  ref TEXT,
  pihak TEXT, -- vendor/customer name
  ket TEXT,
  dikoreksi BOOLEAN DEFAULT false,
  koreksi_by TEXT,
  koreksi_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_mutasi_gudang ON mutasi(gudang);
CREATE INDEX idx_mutasi_item_id ON mutasi(item_id);
CREATE INDEX idx_mutasi_tgl ON mutasi(tgl);

-- RM History log (rmhist)
CREATE TABLE rmhist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  rm_id UUID NOT NULL REFERENCES rm(id),
  tgl DATE NOT NULL,
  jenis TEXT NOT NULL,
  qty NUMERIC NOT NULL,
  no_dok TEXT,
  ref TEXT,
  pihak TEXT,
  ket TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX idx_rmhist_rm_id ON rmhist(rm_id);
CREATE INDEX idx_rmhist_tgl ON rmhist(tgl);

-- Opname (stock opname records)
CREATE TABLE opname (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gudang TEXT NOT NULL,
  tgl DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft', -- 'Draft' | 'Selesai'
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{item_id, nama, stok_sistem, stok_fisik, selisih, ket}]
  catatan TEXT,
  selesai_at TIMESTAMPTZ,
  selesai_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

-- ============================================================
-- PRODUCTION TABLES
-- ============================================================

-- SPK (Surat Perintah Kerja / Work Order)
CREATE TABLE spk (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  no TEXT NOT NULL UNIQUE,
  tgl DATE NOT NULL,
  customer TEXT NOT NULL,
  po TEXT,
  sales TEXT,
  lead TEXT,
  material TEXT,
  type TEXT,
  tebal TEXT,
  due DATE,
  status TEXT NOT NULL DEFAULT 'Terbit', -- 'Draft' | 'Terbit' | 'Selesai' | 'Batal'
  rev INTEGER DEFAULT 0,
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{d: description/kode, q: qty, prod: prod_qty, u: unit, w: weight, ket}]
  prod_log JSONB NOT NULL DEFAULT '[]',
  -- prod_log: [{tgl, by, wc, items: [{d, qty, wc}], ket}]
  catatan TEXT,
  terbit_at TIMESTAMPTZ,
  terbit_by TEXT,
  upd_at TIMESTAMPTZ,
  upd_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_spk_no ON spk(no);
CREATE INDEX idx_spk_customer ON spk(customer);
CREATE INDEX idx_spk_status ON spk(status);
CREATE INDEX idx_spk_tgl ON spk(tgl);
CREATE INDEX idx_spk_due ON spk(due);

-- Vendor (WIP at external vendor / subcont)
CREATE TABLE vendor (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  spk_id UUID REFERENCES spk(id),
  vendor TEXT NOT NULL,
  proses TEXT,
  tgl DATE NOT NULL,
  no_sj TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{d, q, u, w, kembali, reject, ket}]
  status TEXT NOT NULL DEFAULT 'Di Vendor', -- 'Di Vendor' | 'Kembali Sebagian' | 'Selesai' | 'Batal'
  catatan TEXT,
  upd_at TIMESTAMPTZ,
  upd_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_vendor_spk_id ON vendor(spk_id);
CREATE INDEX idx_vendor_tgl ON vendor(tgl);
CREATE INDEX idx_vendor_status ON vendor(status);

-- Purchase Request (pr)
CREATE TABLE pr (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  no TEXT,
  tgl DATE NOT NULL,
  jenis TEXT NOT NULL DEFAULT 'RM', -- 'RM' | 'FG' | 'Lainnya'
  status TEXT NOT NULL DEFAULT 'Open', -- 'Open' | 'Partial' | 'Closed' | 'Batal'
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{nama, qty, satuan, supplier, tgl_butuh, status, ket}]
  catatan TEXT,
  approved_at TIMESTAMPTZ,
  approved_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_pr_tgl ON pr(tgl);
CREATE INDEX idx_pr_status ON pr(status);

-- ============================================================
-- LOGISTICS / DELIVERY TABLES
-- ============================================================

-- Kirim (Delivery / Surat Jalan)
CREATE TABLE kirim (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  no_sj TEXT,
  tgl DATE NOT NULL,
  spk_id UUID REFERENCES spk(id),
  customer TEXT NOT NULL,
  nopol TEXT,
  driver TEXT,
  status TEXT NOT NULL DEFAULT 'Disiapkan', -- 'Disiapkan' | 'Dalam Perjalanan' | 'Diterima' | 'Batal'
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{d, q, u, w, ket}]
  catatan TEXT,
  upd_at TIMESTAMPTZ,
  upd_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_kirim_tgl ON kirim(tgl);
CREATE INDEX idx_kirim_spk_id ON kirim(spk_id);
CREATE INDEX idx_kirim_status ON kirim(status);
CREATE INDEX idx_kirim_customer ON kirim(customer);

-- Bongkar (Unloading / Incoming materials)
CREATE TABLE bongkar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tgl DATE NOT NULL,
  supplier TEXT NOT NULL,
  no_do TEXT,
  status TEXT NOT NULL DEFAULT 'Proses', -- 'Proses' | 'Selesai' | 'Batal'
  items JSONB NOT NULL DEFAULT '[]',
  -- items: [{rm_id, nama, qty_order, qty_datang, satuan, ket}]
  catatan TEXT,
  selesai_at TIMESTAMPTZ,
  selesai_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT,
  updated_by TEXT
);

CREATE INDEX idx_bongkar_tgl ON bongkar(tgl);
CREATE INDEX idx_bongkar_status ON bongkar(status);

-- ============================================================
-- SETTINGS & AUDIT TABLES
-- ============================================================

-- Master / App settings (master)
CREATE TABLE master (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  ket TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT
);

-- Activity log (log)
CREATE TABLE log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tgl TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  by TEXT,
  aksi TEXT NOT NULL,
  koleksi TEXT,
  doc_id TEXT,
  detail JSONB,
  ip TEXT
);

CREATE INDEX idx_log_tgl ON log(tgl DESC);
CREATE INDEX idx_log_by ON log(by);
CREATE INDEX idx_log_koleksi ON log(koleksi);

-- User requests (ureq) - e.g. access requests, notifications
CREATE TABLE ureq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tgl TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  from_user TEXT NOT NULL,
  to_user TEXT,
  jenis TEXT NOT NULL, -- 'access' | 'notif' | 'approval'
  status TEXT NOT NULL DEFAULT 'Pending', -- 'Pending' | 'Approved' | 'Rejected'
  payload JSONB,
  diproses_at TIMESTAMPTZ,
  diproses_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ureq_from_user ON ureq(from_user);
CREATE INDEX idx_ureq_status ON ureq(status);

-- User invitations (uinv)
CREATE TABLE uinv (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer',
  token TEXT UNIQUE,
  expires_at TIMESTAMPTZ,
  used_at TIMESTAMPTZ,
  used_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX idx_uinv_email ON uinv(email);
CREATE INDEX idx_uinv_token ON uinv(token);

-- ============================================================
-- AUTO-UPDATE TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN SELECT unnest(ARRAY[
    'mwc','mvendor','mcustomer','msupplier','marmada','muser',
    'rm','fg','mutasi','opname','spk','vendor','pr','kirim',
    'bongkar','master'
  ])
  LOOP
    EXECUTE format('
      CREATE TRIGGER trigger_%I_updated_at
      BEFORE UPDATE ON %I
      FOR EACH ROW EXECUTE FUNCTION update_updated_at()', t, t);
  END LOOP;
END;
$$;

-- ============================================================
-- ENABLE REALTIME
-- ============================================================

-- Enable Supabase Realtime on key tables
ALTER PUBLICATION supabase_realtime ADD TABLE spk;
ALTER PUBLICATION supabase_realtime ADD TABLE kirim;
ALTER PUBLICATION supabase_realtime ADD TABLE vendor;
ALTER PUBLICATION supabase_realtime ADD TABLE mutasi;
ALTER PUBLICATION supabase_realtime ADD TABLE bongkar;
ALTER PUBLICATION supabase_realtime ADD TABLE pr;
ALTER PUBLICATION supabase_realtime ADD TABLE opname;
ALTER PUBLICATION supabase_realtime ADD TABLE log;
ALTER PUBLICATION supabase_realtime ADD TABLE ureq;
ALTER PUBLICATION supabase_realtime ADD TABLE rm;
ALTER PUBLICATION supabase_realtime ADD TABLE fg;
ALTER PUBLICATION supabase_realtime ADD TABLE mwc;
ALTER PUBLICATION supabase_realtime ADD TABLE mvendor;
ALTER PUBLICATION supabase_realtime ADD TABLE mcustomer;
ALTER PUBLICATION supabase_realtime ADD TABLE msupplier;
ALTER PUBLICATION supabase_realtime ADD TABLE marmada;
ALTER PUBLICATION supabase_realtime ADD TABLE muser;
