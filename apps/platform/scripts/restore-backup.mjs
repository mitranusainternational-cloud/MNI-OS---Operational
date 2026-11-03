// Pulihkan cadangan MNI Gudang (berkas JSON dari tombol "Unduh cadangan") ke sebuah project Supabase.
//
//   node scripts/restore-backup.mjs <berkas.json>            -> uji kering: hanya menampilkan isi dan rencana
//   node scripts/restore-backup.mjs <berkas.json> --apply    -> menulis ke database
//
// Variabel lingkungan (isi sendiri saat menjalankan, JANGAN disimpan di berkas atau Git):
//   SUPABASE_URL                 mis. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    kunci service-role project TUJUAN (Settings > API)
//
// Aturan aman: tujuan sebaiknya project KOSONG dengan migration 1-12 sudah terpasang (latihan pulih atau pemindahan).
// Skrip memakai upsert (menimpa baris dengan id yang sama), tidak pernah menghapus data. Akun login (Auth) tidak
// ikut tercadang; buat ulang lewat menu Pengguna & Akses atau dashboard, email harus sama dengan baris muser.
import fs from 'node:fs';

const [file, ...flags] = process.argv.slice(2);
const apply = flags.includes('--apply');
if (!file) { console.error('Pemakaian: node scripts/restore-backup.mjs <berkas.json> [--apply]'); process.exit(2); }

const backup = JSON.parse(fs.readFileSync(file, 'utf8'));
if (backup.format !== 'mni-gudang-backup' || !backup.data) { console.error('Berkas bukan cadangan MNI Gudang.'); process.exit(2); }

// Urutan aman terhadap kunci asing; kunci konflik tiap tabel
const ORDER = [
  ['muser', 'id'], ['role_modules', 'role,module'], ['master', 'key'], ['mwc', 'id'], ['mvendor', 'id'], ['mcustomer', 'id'],
  ['msupplier', 'id'], ['marmada', 'id'], ['rm', 'id'], ['fg', 'id'], ['spk', 'id'], ['rmhist', 'id'], ['pr', 'id'],
  ['opname', 'id'], ['mutasi', 'id'], ['vendor', 'id'], ['kirim', 'id'], ['bongkar', 'id'], ['log', 'id'],
];

console.log(`Cadangan dibuat ${backup.dibuat} oleh ${backup.oleh || '-'}`);
let total = 0;
for (const [t] of ORDER) { const n = (backup.data[t] || []).length; total += n; console.log(`  ${t.padEnd(14)} ${n}`); }
console.log(`  jumlah baris   ${total}`);
if (!apply) { console.log('\nUji kering selesai. Tambahkan --apply untuk menulis ke database tujuan.'); process.exit(0); }

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error('Isi SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di lingkungan terlebih dulu.'); process.exit(2); }

let done = 0;
for (const [t, conflict] of ORDER) {
  const rows = backup.data[t] || [];
  for (let i = 0; i < rows.length; i += 200) {
    const res = await fetch(`${url}/rest/v1/${t}?on_conflict=${conflict}`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rows.slice(i, i + 200)),
    });
    if (!res.ok) { console.error(`GAGAL ${t} (baris ${i}): ${res.status} ${(await res.text()).slice(0, 300)}`); process.exit(1); }
    done += Math.min(200, rows.length - i);
  }
  console.log(`  ${t.padEnd(14)} ${rows.length} baris dipulihkan`);
}
console.log(`\nSelesai: ${done} baris. Periksa jumlah di aplikasi, lalu buat ulang akun login anggota tim.`);
