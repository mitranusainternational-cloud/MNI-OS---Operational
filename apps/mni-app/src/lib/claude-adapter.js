/**
 * MNI Gudang - Claude Platform Adapter for Supabase
 *
 * The original app uses window.claude.use('db') which returns a
 * Firestore-compatible DB object. This adapter intercepts that call
 * and returns a Supabase-backed object with the same interface,
 * so the main app HTML doesn't need its business logic changed.
 *
 * INJECT THIS BEFORE THE MAIN APP SCRIPT:
 *   <script type="module" src="/src/lib/claude-adapter.js"></script>
 *
 * The adapter emulates:
 *   DB.collection(col).add(data)
 *   DB.collection(col).onSnapshot(cb, errCb)
 *   DB.doc(path).get()
 *   DB.doc(path).set(data)
 *   DB.doc(path).update(data)
 *   DB.doc(path).delete()
 *   DB.doc(path).acquire(opts)        → optimistic lock (simplified)
 */


// ── Config ────────────────────────────────────────────────────────────────────
const SUPABASE_URL = window.__ENV?.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.__ENV?.SUPABASE_ANON_KEY || '';

// VITE_LOCAL_MOCK=1: pratinjau lokal tanpa backend (data sintetis di localStorage).
// Selain itu memakai Supabase sungguhan. Modul dimuat dinamis agar mode mock tidak butuh internet.
const LOCAL_MOCK = window.__ENV?.LOCAL_MOCK === '1';
let supabase;
if (LOCAL_MOCK) {
  const { createLocalClient } = await import('./local-supabase.js');
  supabase = createLocalClient();
} else {
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true }
  });
}

// ── ID dokumen ───────────────────────────────────────────────────────────────
// App membuat id dokumen berbentuk string (mis. "spk-1003"), sedangkan kolom id di
// schema bertipe UUID. Id non-UUID dipetakan ke UUID deterministik (mirip UUID v5), jadi
// id yang sama selalu menghasilkan UUID yang sama dan pengecekan "sudah dipakai" tetap benar.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
async function toDbId(id) {
  if (UUID_RE.test(String(id))) return id;
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-1', new TextEncoder().encode('mni:' + id))).slice(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const h = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

// Kolom spk.no bertipe TEXT di database, tetapi app memperlakukannya sebagai angka
// (parseInt, perbandingan !==). Tanpa konversi, mengedit SPK dianggap "ganti nomor".
const numericNo = (table, row) => {
  if (table === 'spk' && row && row.no !== undefined && row.no !== null && /^\d+$/.test(String(row.no))) row.no = Number(row.no);
  return row;
};
const textNo = (table, row) => {
  if (table === 'spk' && row && row.no !== undefined && row.no !== null) row.no = String(row.no);
  return row;
};

// ── Field name helpers ────────────────────────────────────────────────────────
// The original app stores _id as the Firestore document ID.
// Supabase uses `id` (UUID). We expose _id = id for compatibility.

function docToRow(docPath, data) {
  // docPath format: "collection/docId" or just collection when insert
  const parts = docPath ? docPath.split('/') : [];
  const id = parts[1] || undefined;
  const row = { ...data };
  delete row._id;
  if (id) row.id = id;
  // Normalize some Firestore-specific fields
  if (row.at && !row.created_at) { row.created_at = row.at; }
  if (row.by && !row.created_by) { row.created_by = row.by; }
  if (row.updAt && !row.updated_at) { row.updated_at = row.updAt; }
  if (row.updBy && !row.updated_by) { row.updated_by = row.updBy; }
  // prodLog → prod_log
  if (row.prodLog !== undefined && row.prod_log === undefined) { row.prod_log = row.prodLog; delete row.prodLog; }
  if (row.stokAwal !== undefined) { row.stok_awal = row.stokAwal; delete row.stokAwal; }
  if (row.tglStokAwal !== undefined) { row.tgl_stok_awal = row.tglStokAwal; delete row.tglStokAwal; }
  if (row.noSJ !== undefined) { row.no_sj = row.noSJ; delete row.noSJ; }
  if (row.noDok !== undefined) { row.no_dok = row.noDok; delete row.noDok; }
  if (row.terbitAt !== undefined) { row.terbit_at = row.terbitAt; delete row.terbitAt; }
  if (row.terbitBy !== undefined) { row.terbit_by = row.terbitBy; delete row.terbitBy; }
  if (row.noSJ !== undefined) { row.no_sj = row.noSJ; delete row.noSJ; }
  // Foreign key: spk string ID → spk_id UUID (for vendor, kirim tables)
  // We keep both for compat; the DB will use spk_id
  return row;
}

function rowToDoc(row) {
  if (!row) return null;
  return {
    ...row,
    _id: row.id,
    // Reverse snake_case to camelCase for app compat
    at: row.at || row.created_at,
    by: row.by || row.created_by,
    updAt: row.updAt || row.updated_at,
    updBy: row.updBy || row.updated_by,
    prodLog: row.prodLog || row.prod_log,
    stokAwal: row.stokAwal !== undefined ? row.stokAwal : row.stok_awal,
    tglStokAwal: row.tglStokAwal || row.tgl_stok_awal,
    noSJ: row.noSJ || row.no_sj,
    noDok: row.noDok || row.no_dok,
    terbitAt: row.terbitAt || row.terbit_at,
    terbitBy: row.terbitBy || row.terbit_by,
  };
}

// ── Table name from "col/id" path ─────────────────────────────────────────────
function tableName(col) {
  // All collections are 1:1 table names in our schema
  return col;
}

// ── DB Collection Proxy ───────────────────────────────────────────────────────
function makeCollection(col) {
  const table = tableName(col);

  return {
    // Firestore: collection(col).add(data) → INSERT
    async add(data) {
      const row = textNo(table, docToRow(null, data));
      delete row.id; // let DB generate UUID
      const { data: result, error } = await supabase
        .from(table)
        .insert(row)
        .select()
        .single();
      if (error) throw new Error(`[add:${table}] ${error.message}`);
      return { id: result.id, ...numericNo(table, result) };
    },

    // Firestore: collection(col).onSnapshot(cb) → Realtime subscription
    onSnapshot(cb, errCb) {
      // Initial load
      const load = async () => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .order('created_at', { ascending: false });
        if (error) { errCb && errCb(error); return; }
        const docs = (data || []).map((r) => (table === 'master' ? masterToDoc(r) : rowToDoc(numericNo(table, r))));
        // Emulate Firestore snapshot shape
        cb({ docs: docs.map(d => ({ data: () => d, id: d._id })) });
      };

      load();

      // Realtime
      const channel = supabase
        .channel(`rt:${table}:${Math.random()}`)
        .on('postgres_changes', { event: '*', schema: 'public', table },
          async () => { await load(); }
        )
        .subscribe((status) => {
          if (status === 'CHANNEL_ERROR') {
            errCb && errCb({ code: 'channel-error', message: 'Realtime channel error' });
          }
        });

      // Return unsubscribe (Firestore returns the unsubscribe fn directly)
      return () => supabase.removeChannel(channel);
    }
  };
}

// ── DB Doc Proxy ──────────────────────────────────────────────────────────────
// Tabel master dan koleksi counter memakai kolom key (teks) dengan nilai JSON, bukan id UUID.
// Dokumen master dipetakan ke objek datar { ...value, _id: key } seperti yang dibaca app.
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
function masterToDoc(row) {
  if (!row) return null;
  let v = row.value;
  if (typeof v === 'string') { try { v = JSON.parse(v); } catch { /* biarkan string */ } }
  return { ...(isObj(v) ? v : { value: v }), _id: row.key, key: row.key, updAt: row.updated_at, at: row.created_at };
}
const stripMeta = (d) => { const o = { ...d }; delete o._id; delete o.key; return o; };

function makeDoc(path) {
  // path = "collection/docId" (struktur bertingkat diratakan)
  const parts = path.split('/');
  const col = parts[0];
  const rawId = parts[1];
  const table = tableName(col);
  const isCounter = col === 'counter';
  const keyed = isCounter || table === 'master';
  const keyOf = () => rawId;
  const idOf = () => toDbId(rawId);

  return {
    // .get()
    async get() {
      if (keyed) {
        const { data } = await supabase.from('master').select('*').eq('key', keyOf()).single();
        return { exists: !!data, data: () => (data ? (isCounter ? { value: data.value } : masterToDoc(data)) : null) };
      }
      const { data, error } = await supabase.from(table).select('*').eq('id', await idOf()).single();
      if (error && error.code !== 'PGRST116') throw error;
      return { exists: !!data, data: () => (data ? rowToDoc(numericNo(table, data)) : null) };
    },

    // .set(data) — upsert
    async set(data) {
      if (keyed) {
        const value = isCounter ? (data.value ?? data) : stripMeta(data);
        const { error } = await supabase.from('master').upsert({ key: keyOf(), value }, { onConflict: 'key' });
        if (error) throw new Error(`[set:master:${keyOf()}] ${error.message}`);
        return;
      }
      const id = await idOf();
      const row = textNo(table, docToRow(path, data));
      row.id = id;
      const { error } = await supabase.from(table).upsert(row, { onConflict: 'id' });
      if (error) throw new Error(`[set:${table}:${id}] ${error.message}`);
    },

    // .update(data) — pembaruan parsial
    async update(data) {
      if (keyed) {
        const { data: cur } = await supabase.from('master').select('*').eq('key', keyOf()).single();
        const old = cur ? (isCounter ? { value: cur.value } : stripMeta(masterToDoc(cur))) : {};
        const value = isCounter ? (data.value ?? data) : { ...old, ...stripMeta(data) };
        const { error } = await supabase.from('master').upsert({ key: keyOf(), value }, { onConflict: 'key' });
        if (error) throw new Error(`[update:master:${keyOf()}] ${error.message}`);
        return;
      }
      const id = await idOf();
      const row = textNo(table, docToRow(path, data));
      delete row.id;
      const { error } = await supabase.from(table).update(row).eq('id', id);
      if (error) throw new Error(`[update:${table}:${id}] ${error.message}`);
    },

    // .delete()
    async delete() {
      if (keyed) {
        await supabase.from('master').delete().eq('key', keyOf());
        return;
      }
      const id = await idOf();
      // Hapus lunak untuk catatan bisnis
      const SOFT = new Set(['spk', 'kirim', 'vendor', 'pr', 'bongkar']);
      if (SOFT.has(table)) {
        const { error } = await supabase.from(table).update({ status: 'Batal' }).eq('id', id);
        if (error) throw new Error(`[softDel:${table}:${id}] ${error.message}`);
      } else {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) throw new Error(`[delete:${table}:${id}] ${error.message}`);
      }
    },

    // .acquire(opts) — kunci optimistis sederhana, disimpan di tabel master dengan key "lock:col:id"
    async acquire({ holder, ttlMs } = {}) {
      const lockKey = `lock:${col}:${rawId}`;
      const now = Date.now();
      const expires = now + (ttlMs || 30000);

      const { data: existing } = await supabase.from('master').select('*').eq('key', lockKey).single();

      if (existing?.value) {
        const lock = typeof existing.value === 'object' ? existing.value :
          (typeof existing.value === 'string' ? JSON.parse(existing.value) : {});
        if (lock.expires > now && lock.holder !== holder) {
          return { acquired: false, holder: lock.holder, expiresAt: new Date(lock.expires).toISOString() };
        }
      }

      await supabase.from('master').upsert({
        key: lockKey,
        value: JSON.stringify({ holder, expires }),
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

      return { acquired: true };
    }
  };
}

// ── Main DB Object (replaces Firestore) ───────────────────────────────────────
const DB_ADAPTER = {
  collection: (col) => makeCollection(col),
  doc: (path) => makeDoc(path),
};

// ── User adapter (replaces window.claude.use('user')) ────────────────────────
async function makeUserAdapter() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) return null;

  // Fetch user role from muser table
  const { data: muser } = await supabase
    .from('muser')
    .select('*')
    .eq('email', user.email)
    .single();

  return {
    me: async () => ({
      id: user.email,
      email: user.email,
      name: muser?.nama || user.email, // dipakai app untuk nama tampilan
      nama: muser?.nama || user.email,
      role: muser?.role || 'viewer',
      isOwner: muser?.role === 'admin',
      canEdit: ['admin', 'manager', 'produksi', 'gudang'].includes(muser?.role),
    }),
    can: async (permission) => {
      const role = muser?.role || 'viewer';
      if (permission === 'data.write') {
        return ['admin', 'manager', 'produksi', 'gudang'].includes(role);
      }
      return role !== 'viewer';
    },
    // App memanggil USER.profiles(ids) untuk warna dan foto avatar (API platform asli).
    // Warna dibuat deterministik dari id; foto belum didukung.
    profiles: async (ids = []) => Object.fromEntries(ids.map((id) => {
      let h = 0;
      for (const ch of String(id)) h = (h * 31 + ch.charCodeAt(0)) % 360;
      return [id, { color: `hsl(${h} 55% 45%)`, avatarUrl: null }];
    })),
    signIn: async (email) => {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
    },
    signOut: async () => await supabase.auth.signOut(),
    onAuthChange: (cb) => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(cb);
      return () => subscription.unsubscribe();
    }
  };
}

// ── Inject into window.claude ─────────────────────────────────────────────────
const CLAUDE_SHIM = {
  use: async (service) => {
    if (service === 'db') return DB_ADAPTER;
    if (service === 'user') return makeUserAdapter();
    if (service === 'downloads') {
      const saveBlob = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      };
      return {
        // API yang dipanggil app: DLS.save({ filename, data }) dengan data Blob atau Uint8Array.
        save: async ({ filename, data }) => saveBlob(data instanceof Blob ? data : new Blob([data]), filename),
        download: saveBlob, // bentuk lama (blob, filename)
      };
    }
    throw new Error(`Unknown service: ${service}`);
  }
};

// Inject before main app loads
window.claude = CLAUDE_SHIM;
window.__supabase = supabase;

console.log('[MNI Gudang] Adapter siap.', LOCAL_MOCK ? 'MODE MOCK LOKAL (bukan Supabase)' : 'Supabase URL: ' + (SUPABASE_URL || '(NOT SET)'));
