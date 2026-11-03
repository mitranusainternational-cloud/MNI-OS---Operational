/**
 * MNI Gudang - Klien Supabase tiruan untuk pratinjau lokal TANPA backend.
 *
 * Hanya untuk pengembangan di mesin sendiri (VITE_LOCAL_MOCK=1). Meniru bagian
 * kecil API supabase-js yang dipakai claude-adapter.js: from().select/insert/
 * upsert/update/delete, channel() realtime, dan auth OTP. Data disimpan di
 * localStorage browser dan diisi data SINTETIS. Ini BUKAN bukti bahwa Supabase,
 * RLS, atau Auth sungguhan bekerja; pengujian itu tetap butuh Supabase lokal
 * (Docker) atau project dev (tugas T-011, T-020 sampai T-022).
 */

import { TABLE_COLS, STRICT_COLS } from './schema-columns.js';

const STORE_KEY = 'mni-local-mock-db';
const SESSION_KEY = 'mni-local-mock-session';
const VERSION = 7; // naikkan bila bentuk data seed berubah agar browser memuat seed baru
// Kode masuk untuk pratinjau lokal. Bukan rahasia dan tidak berlaku di environment lain.
export const LOCAL_OTP = '123456';

const iso = (d = new Date()) => d.toISOString();
const day = (offset = 0) => iso(new Date(Date.now() + offset * 864e5)).slice(0, 10);
const uid = () => (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Math.random().toString(16).slice(2) + Date.now());

function seed() {
  const now = iso();
  const base = (o) => ({ id: uid(), created_at: now, updated_at: now, created_by: 'seed', updated_by: 'seed', data: {}, ...o });
  const db = {};
  db.muser = [
    ['admin@mni.local', 'Admin Lokal', 'admin'],
    ['ppic@mni.local', 'PPIC Lokal', 'ppic'],
    ['gbb@mni.local', 'Gudang Bahan Baku Lokal', 'gbb'],
    ['gbj@mni.local', 'Gudang Barang Jadi Lokal', 'gbj'],
    ['logistik@mni.local', 'Logistik Lokal', 'logistik'],
    ['produksi@mni.local', 'Produksi Lokal', 'produksi'],
    ['viewer@mni.local', 'Viewer Lokal', 'viewer'],
  ].map(([email, nama, role]) => base({ email, nama, role, aktif: true }));
  db.mwc = [['CNC', 'CNC Cutting', 'Internal', 1], ['BENDING', 'Bending', 'Internal', 2], ['WELDING', 'Welding', 'Internal', 3],
    ['COATING', 'Coating / Painting', 'Internal', 5], ['QC', 'Quality Control', 'Internal', 6], ['PACKING', 'Packing', 'Internal', 7]]
    .map(([kode, nama, tipe, urutan]) => base({ kode, nama, tipe, urutan, aktif: true }));
  db.mcustomer = [['CUS-A', 'Customer Contoh A'], ['CUS-B', 'Customer Contoh B']].map(([kode, nama]) => base({ kode, nama, aktif: true }));
  db.msupplier = [['SUP-A', 'Supplier Contoh A'], ['SUP-B', 'Supplier Contoh B']].map(([kode, nama]) => base({ kode, nama, aktif: true }));
  db.mvendor = [['VEN-A', 'Vendor Finishing Contoh']].map(([kode, nama]) => base({ kode, nama, aktif: true }));
  db.marmada = [];
  db.rm = [
    ['Plat Besi', '1.2 x 1219 x 2438', 'lbr', 'SPCC', 1.2, 1219, 2438, 120, 30],
    ['Plat Besi', '2.0 x 1219 x 2438', 'lbr', 'SPCC', 2, 1219, 2438, 80, 20],
    ['Plat Stainless', '1.0 x 1219 x 2438', 'lbr', 'SUS304', 1, 1219, 2438, 40, 10],
    ['Pipa Bulat', '25 x 1.2 x 6000', 'btg', 'SS400', 1.2, 25, 6000, 200, 50],
    ['Hollow', '40 x 40 x 1.6 x 6000', 'btg', 'SS400', 1.6, 40, 6000, 150, 40],
    ['Baut M8', 'M8 x 30', 'pcs', null, null, null, null, 5000, 1000],
  ].map(([item, ukuran, satuan, grade, tebal, lebar, panjang, stok_awal, buffer]) =>
    base({ item, ukuran, satuan, grade, tebal, lebar, panjang, stok_awal, tgl_stok_awal: day(-30), buffer }));
  // Bentuk mengikuti label app: kategori + type + ukuran + panjang + finishing + tebal.
  db.fg = [
    ['Hollow', 'Galvanis', '40x40', 6000, 'HDG', 1.6, 'Btg', 120],
    ['Hollow', 'Galvanis', '50x100', 6000, 'PDC', 2.0, 'Btg', 60],
    ['Pipa', 'Bulat', '2 inch', 6000, 'ELG', 1.2, 'Btg', 200],
  ].map(([kategori, type, ukuran, panjang, finishing, tebal, satuan, stok_awal]) =>
    base({ kategori, type, ukuran, panjang, finishing, tebal, satuan, stok_awal, tgl_stok_awal: day(-30) }));
  db.spk = [
    base({ no: '1001', tgl: day(-5), customer: 'Customer Contoh A', po: 'PO-CONTOH-01', due: day(5), status: 'Terbit', rev: 0, material: 'SPCC', tebal: '1.2',
      items: [{ d: 'Hollow 40x40 t1.6 HDG', g: 'Hollow', q: 10, u: 'Btg', w: 0, ket: '', catatan: '', prod: 4 }, { d: 'Hollow 50x100 t2.0 PDC', g: 'Hollow', q: 5, u: 'Btg', w: 0, ket: '', catatan: '', prod: 0 }],
      prod_log: [], catatan: 'Data sintetis', terbit_at: now, terbit_by: 'admin@mni.local' }),
    base({ no: '1002', tgl: day(-2), customer: 'Customer Contoh B', po: 'PO-CONTOH-02', due: day(-1), status: 'Terbit', rev: 0, material: 'SUS304', tebal: '1.0',
      items: [{ d: 'Pipa Bulat 2in t1.2 ELG', g: 'Pipa', q: 3, u: 'Btg', w: 0, ket: '', catatan: '', prod: 0 }],
      prod_log: [], catatan: 'Data sintetis, sengaja lewat jatuh tempo', terbit_at: now, terbit_by: 'admin@mni.local' }),
  ];
  for (const t of ['mutasi', 'rmhist', 'vendor', 'pr', 'kirim', 'bongkar', 'opname', 'log', 'ureq', 'uinv']) db[t] = [];
  db.master = [['app_name', 'MNI Gudang'], ['app_version', '1.0.0-lokal'], ['spk_counter', 1002], ['pr_counter', 1]]
    .map(([key, value]) => ({ id: uid(), key, value, ket: 'seed', updated_at: now }));
  return { v: VERSION, tables: db };
}

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.v === VERSION) return parsed;
    }
  } catch { /* abaikan, buat baru */ }
  return seed();
}
function save(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* penyimpanan penuh atau diblokir */ }
}

// Meniru fungsi SQL mod_level/can_view: hak per modul (muser.data.modul) atau, bila kosong, peta peran bawaan.
const MOD_OF = { rm: 'bahan-baku', rmhist: 'bahan-baku', pr: 'bahan-baku', opname: 'bahan-baku', fg: 'barang-jadi', spk: 'spk', vendor: 'vendor', kirim: 'pengiriman', bongkar: 'bongkar-muat' };
const ROLE_MODS = { ppic: ['spk', 'vendor'], produksi: ['spk'], gbb: ['bahan-baku', 'bongkar-muat'], gbj: ['barang-jadi', 'vendor', 'pengiriman', 'bongkar-muat'], logistik: ['pengiriman', 'bongkar-muat'] };
const levelOf = (u, m) => {
  if (!u || u.aktif === false) return null;
  if (u.role === 'admin') return 'ubah';
  const modul = u.data && u.data.modul;
  if (modul && typeof modul === 'object') return modul[m] || null;
  return (ROLE_MODS[u.role] || []).includes(m) ? 'ubah' : 'lihat';
};

export function createLocalClient() {
  const host = location.hostname;
  if (!['localhost', '127.0.0.1', '[::1]'].includes(host)) {
    throw new Error('Mode mock lokal hanya boleh dipakai di localhost.');
  }
  const state = load();
  save(state);
  const listeners = new Set(); // { table, cb }
  const pkOf = (t) => (t === 'master' ? 'key' : 'id');
  const emit = (table, eventType, row) => listeners.forEach((l) => { if (l.table === table) l.cb({ eventType, new: row, old: row, table }); });

  class Query {
    constructor(table) { this.t = table; this.op = 'select'; this.filters = []; this.sel = false; this.one = false; this.ord = null; this.payload = null; this.opts = {}; }
    select() { this.sel = true; return this; }
    order(col, { ascending = true } = {}) { this.ord = { col, ascending }; return this; }
    eq(col, val) { this.filters.push([col, val]); return this; }
    range(a, b) { this.rg = [a, b]; return this; }
    limit(n) { this.lim = n; return this; }
    single() { this.one = true; return this; }
    maybeSingle() { this.one = true; this.maybe = true; return this; } // nol baris = data null tanpa galat
    insert(p) { this.op = 'insert'; this.payload = p; return this; }
    upsert(p, o = {}) { this.op = 'upsert'; this.payload = p; this.opts = o; return this; }
    update(p) { this.op = 'update'; this.payload = p; return this; }
    delete() { this.op = 'delete'; return this; }
    then(res, rej) { return Promise.resolve().then(() => this.run()).then(res, rej); }
    rows() { return (state.tables[this.t] ||= []); }
    match(r) { return this.filters.every(([c, v]) => r[c] === v); }
    run() {
      const rows = this.rows();
      const pk = pkOf(this.t);
      const stamp = iso();
      let out = [];
      // Meniru Postgres: kolom id bertipe UUID menolak teks lain (error 22P02).
      if (pk === 'id') {
        const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        const given = [...this.filters.filter(([c]) => c === 'id').map(([, v]) => v), ...[].concat(this.payload || []).map((p) => p && p.id).filter((v) => v !== undefined)];
        const bad = given.find((v) => !UUID.test(String(v)));
        if (bad !== undefined) return { data: null, error: { code: '22P02', message: `invalid input syntax for type uuid: "${bad}"` } };
      }
      // Meniru PostgREST: kolom yang tidak ada di tabel ditolak (PGRST204).
      const cols = TABLE_COLS[this.t];
      if (cols && this.payload && (this.op === 'insert' || this.op === 'upsert' || this.op === 'update')) {
        for (const p of [].concat(this.payload)) {
          const unknown = Object.keys(p || {}).find((k) => !cols.includes(k));
          if (unknown) return { data: null, error: { code: 'PGRST204', message: `Could not find the '${unknown}' column of '${this.t}' in the schema cache` } };
        }
      }
      // Meniru Postgres: string kosong ditolak pada kolom DATE/TIMESTAMPTZ/NUMERIC/INTEGER/UUID (22007/22P02).
      const strict = STRICT_COLS[this.t];
      if (strict && this.payload && (this.op === 'insert' || this.op === 'upsert' || this.op === 'update')) {
        for (const p of [].concat(this.payload)) {
          const bad = Object.keys(p || {}).find((k) => strict[k] && p[k] === '');
          if (bad) return { data: null, error: { code: '22007', message: `invalid input syntax for type ${strict[bad].toLowerCase()}: ""` } };
        }
      }
      const has = (c) => !cols || cols.includes(c);
      // Meniru PostgREST: mengurutkan menurut kolom yang tidak ada ditolak (HTTP 400).
      if (this.ord && cols && !cols.includes(this.ord.col)) {
        return { data: null, error: { code: '42703', message: `column ${this.t}.${this.ord.col} does not exist` } };
      }
      if (this.op === 'select') {
        out = rows.filter((r) => this.match(r));
        // Meniru RLS baca per modul (migration 11): tabel modul hanya terbaca bila pengguna punya hak lihat.
        const sess = readSession();
        if (sess && sess.user) {
          const me = state.tables.muser.find((r) => r.email === String(sess.user.email).toLowerCase());
          const modFor = (r) => (this.t === 'mutasi' ? (r.gudang === 'rm' ? 'bahan-baku' : 'barang-jadi') : MOD_OF[this.t]);
          if (MOD_OF[this.t] || this.t === 'mutasi') out = out.filter((r) => levelOf(me, modFor(r)));
        }
        if (this.ord) {
          const { col, ascending } = this.ord;
          out = out.slice().sort((a, b) => ((a[col] ?? '') > (b[col] ?? '') ? 1 : (a[col] ?? '') < (b[col] ?? '') ? -1 : 0) * (ascending ? 1 : -1));
        }
        if (this.rg) out = out.slice(this.rg[0], this.rg[1] + 1);
        if (this.lim != null) out = out.slice(0, this.lim);
      } else if (this.op === 'insert' || this.op === 'upsert') {
        const list = Array.isArray(this.payload) ? this.payload : [this.payload];
        for (const p of list) {
          const key = this.op === 'upsert' ? (this.opts.onConflict || pk) : pk;
          let row = this.op === 'upsert' && p[key] !== undefined ? rows.find((r) => r[key] === p[key]) : null;
          if (row) { Object.assign(row, p, has('updated_at') ? { updated_at: stamp } : {}); emit(this.t, 'UPDATE', row); }
          else {
            if (this.t === 'spk' && p.no && rows.some((r) => r.no === p.no)) return { data: null, error: { code: '23505', message: `Nomor SPK ${p.no} sudah ada` } };
            row = { ...(pk === 'id' ? { id: uid() } : {}), ...(has('created_at') ? { created_at: stamp } : {}), ...(has('updated_at') ? { updated_at: stamp } : {}), ...(cols && cols.includes('data') ? { data: {} } : {}), ...p };
            rows.push(row); emit(this.t, 'INSERT', row);
          }
          out.push(row);
        }
      } else if (this.op === 'update') {
        for (const r of rows.filter((x) => this.match(x))) { Object.assign(r, this.payload, has('updated_at') ? { updated_at: stamp } : {}); out.push(r); emit(this.t, 'UPDATE', r); }
      } else if (this.op === 'delete') {
        for (const r of rows.filter((x) => this.match(x))) { rows.splice(rows.indexOf(r), 1); out.push(r); emit(this.t, 'DELETE', r); }
      }
      if (this.op !== 'select') save(state);
      const copy = out.map((r) => JSON.parse(JSON.stringify(r)));
      if (this.one) {
        if (!copy.length) return this.maybe ? { data: null, error: null } : { data: null, error: { code: 'PGRST116', message: 'Tidak ada baris' } };
        return { data: copy[0], error: null };
      }
      return { data: this.op === 'select' || this.sel ? copy : null, error: null };
    }
  }

  // Auth tiruan: hanya email yang ada di muser (aktif) dan kode LOCAL_OTP.
  const authSubs = new Set();
  const readSession = () => { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } };
  const notify = (event, session) => authSubs.forEach((cb) => cb(event, session));
  const auth = {
    async getSession() { return { data: { session: readSession() }, error: null }; },
    async signInWithOtp({ email }) {
      const u = state.tables.muser.find((r) => r.email === String(email).toLowerCase() && r.aktif);
      if (!u) return { data: null, error: { message: 'Email belum terdaftar di sistem lokal.' } };
      return { data: {}, error: null };
    },
    async verifyOtp({ email, token }) {
      if (token !== LOCAL_OTP) return { data: null, error: { message: 'Kode salah' } };
      const session = { access_token: 'local-mock', user: { id: 'local-' + email, email } };
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch { /* abaikan */ }
      notify('SIGNED_IN', session);
      return { data: { session, user: session.user }, error: null };
    },
    async updateUser() { return { data: {}, error: null }; },
    async signOut() { try { localStorage.removeItem(SESSION_KEY); } catch { /* abaikan */ } notify('SIGNED_OUT', null); return { error: null }; },
    onAuthStateChange(cb) { authSubs.add(cb); return { data: { subscription: { unsubscribe: () => authSubs.delete(cb) } } }; },
  };

  return {
    from: (t) => new Query(t),
    channel() {
      const ch = { _l: [] };
      ch.on = (_type, filter, cb) => { ch._l.push({ table: filter.table, cb }); return ch; };
      ch.subscribe = (cb) => { ch._l.forEach((l) => listeners.add(l)); cb && cb('SUBSCRIBED'); return ch; };
      return ch;
    },
    // Meniru fungsi SQL try_lock (kunci atomik; JS satu utas sehingga tanpa celah).
    async rpc(name, args = {}) {
      if (name === 'table_stamps') {
        const out = {};
        for (const [tbl, rows] of Object.entries(state.tables)) out[tbl] = rows.length + '|' + rows.reduce((m, r) => { const s = r.updated_at || r.created_at || ''; return s > m ? s : m; }, '');
        return { data: out, error: null };
      }
      if (name !== 'try_lock') return { data: null, error: { code: 'PGRST202', message: `Could not find the function public.${name}` } };
      const rows = (state.tables.master ||= []);
      const now = Date.now();
      const { p_key: key, p_holder: holder, p_ttl_ms: ttl = 30000 } = args;
      const row = rows.find((r) => r.key === key);
      const v = row && row.value && typeof row.value === 'object' ? row.value : null;
      if (!row || !v || (Number(v.expires) || 0) <= now || v.holder === holder) {
        const value = { holder, expires: now + ttl };
        if (row) { row.value = value; row.updated_at = iso(); } else rows.push({ key, value, created_at: iso(), updated_at: iso() });
        save(state);
        return { data: { acquired: true }, error: null };
      }
      return { data: { acquired: false, holder: v.holder, expires: v.expires }, error: null };
    },
    // Meniru Edge Function kelola-pengguna (hanya admin): buat pengguna dan atur ulang password.
    functions: {
      async invoke(name, { body = {} } = {}) {
        if (name !== 'kelola-pengguna') return { data: null, error: { message: 'Fungsi tidak ada' } };
        const sess = readSession();
        const me = sess && state.tables.muser.find((r) => r.email === String(sess.user.email).toLowerCase() && r.aktif);
        if (!me || me.role !== 'admin') return { data: { error: 'Hanya super admin yang boleh mengelola pengguna.' }, error: null };
        if (body.action === 'create') {
          const email = String(body.email || '').trim().toLowerCase();
          if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) return { data: { error: 'Email tidak valid.' }, error: null };
          if (state.tables.muser.some((r) => r.email === email)) return { data: { error: 'Email ini sudah terdaftar sebagai pengguna.' }, error: null };
          const row = { id: uid(), email, nama: body.nama, role: body.role, aktif: true, created_at: iso(), updated_at: iso(), created_by: me.email, updated_by: me.email,
            data: { jabatan: body.jabatan || '', ...(body.modul ? { modul: body.modul } : {}) } };
          state.tables.muser.push(row); save(state);
          return { data: { ok: true, id: row.id, dengan_password: !!body.password }, error: null };
        }
        if (body.action === 'reset_password') return { data: { ok: true }, error: null };
        return { data: { error: 'Aksi tidak dikenal.' }, error: null };
      },
    },
    removeChannel(ch) { ch._l.forEach((l) => listeners.delete(l)); return Promise.resolve('ok'); },
    auth,
    __reset() { localStorage.removeItem(STORE_KEY); localStorage.removeItem(SESSION_KEY); location.reload(); },
  };
}
