#!/usr/bin/env node
/**
 * MNI Gudang - Firestore → Supabase Migration Script
 *
 * USAGE:
 *   1. Export Firestore data: Firebase Console > Firestore > Export (JSON)
 *      or use: firebase firestore:export ./firestore-export
 *   2. Run: node scripts/migrate-firestore.js --input ./firestore-export.json
 *
 * ENV VARS needed:
 *   SUPABASE_URL=https://xxx.supabase.co
 *   SUPABASE_SERVICE_KEY=your-service-role-key (NOT anon key!)
 *
 * The script maps Firestore document ID → Supabase UUID,
 * normalizes camelCase fields → snake_case,
 * and handles JSONB fields (items, prodLog, etc).
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars: SUPABASE_URL, SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Field mapping: Firestore camelCase → Supabase snake_case ─────────────────
const FIELD_MAP = {
  _id:          null,          // skip, will be handled as UUID
  at:           'created_at',
  by:           'created_by',
  updAt:        'updated_at',
  updBy:        'updated_by',
  stokAwal:     'stok_awal',
  tglStokAwal:  'tgl_stok_awal',
  noSJ:         'no_sj',
  noDok:        'no_dok',
  noDO:         'no_do',
  prodLog:      'prod_log',
  terbitAt:     'terbit_at',
  terbitBy:     'terbit_by',
};

// Collection name → Supabase table name (mostly 1:1)
const TABLE_MAP = {
  rm:         'rm',
  fg:         'fg',
  mutasi:     'mutasi',
  spk:        'spk',
  vendor:     'vendor',
  kirim:      'kirim',
  bongkar:    'bongkar',
  master:     'master',
  mvendor:    'mvendor',
  mcustomer:  'mcustomer',
  msupplier:  'msupplier',
  marmada:    'marmada',
  rmhist:     'rmhist',
  pr:         'pr',
  opname:     'opname',
  muser:      'muser',
  ureq:       'ureq',
  log:        'log',
  uinv:       'uinv',
  mwc:        'mwc',
};

// ── ID remapping (Firestore doc ID → UUID) ───────────────────────────────────
const idMap = {};  // firestoreId → uuid

function getOrCreateUUID(firestoreId) {
  if (!idMap[firestoreId]) {
    // Deterministic UUID from Firestore ID using a simple hash
    // In production, you can use crypto.randomUUID()
    const hash = Buffer.from(firestoreId).toString('hex').padEnd(32, '0').slice(0, 32);
    idMap[firestoreId] = [
      hash.slice(0, 8),
      hash.slice(8, 12),
      '4' + hash.slice(13, 16),
      ((parseInt(hash[16], 16) & 0x3 | 0x8)).toString(16) + hash.slice(17, 20),
      hash.slice(20, 32)
    ].join('-');
  }
  return idMap[firestoreId];
}

// ── Row normalizer ─────────────────────────────────────────────────────────────
function normalizeRow(col, firestoreId, data) {
  const row = { id: getOrCreateUUID(firestoreId) };

  for (const [key, val] of Object.entries(data)) {
    if (key === '_id') continue;

    const dbKey = FIELD_MAP[key] !== undefined ? FIELD_MAP[key] : key;
    if (dbKey === null) continue;  // skip nulled fields

    // Remap foreign key IDs
    if (key === 'spk' && typeof val === 'string') {
      row['spk_id'] = getOrCreateUUID(val);
      continue;
    }
    if (key === 'item' && col === 'mutasi' && typeof val === 'string') {
      row['item_id'] = getOrCreateUUID(val);
      continue;
    }
    if (key === 'rm_id' && typeof val === 'string') {
      row['rm_id'] = getOrCreateUUID(val);
      continue;
    }

    // Timestamps: Firestore Timestamp → ISO string
    if (val && typeof val === 'object' && val._seconds !== undefined) {
      row[dbKey] = new Date(val._seconds * 1000).toISOString();
      continue;
    }

    // JSONB arrays: items, prod_log
    if (Array.isArray(val)) {
      row[dbKey] = val;
      continue;
    }

    row[dbKey] = val;
  }

  return row;
}

// ── Main migration ─────────────────────────────────────────────────────────────
async function migrate(inputPath) {
  console.log(`\n📦 MNI Gudang - Firestore → Supabase Migration`);
  console.log(`   Input: ${inputPath}`);
  console.log(`   Target: ${SUPABASE_URL}\n`);

  let exportData;
  try {
    exportData = JSON.parse(readFileSync(inputPath, 'utf-8'));
  } catch (e) {
    console.error('Failed to read input file:', e.message);
    process.exit(1);
  }

  // Migration order matters (FK references)
  const ORDER = [
    'mwc','mvendor','mcustomer','msupplier','marmada','muser',
    'rm','fg','master',
    'spk','vendor','pr',
    'mutasi','rmhist','opname',
    'kirim','bongkar',
    'ureq','uinv','log'
  ];

  let totalInserted = 0;
  let totalErrors = 0;

  for (const col of ORDER) {
    const table = TABLE_MAP[col];
    if (!table) continue;

    const docs = exportData[col];
    if (!docs || typeof docs !== 'object') {
      console.log(`⏭  ${col}: skipped (no data)`);
      continue;
    }

    const entries = Object.entries(docs);
    if (entries.length === 0) {
      console.log(`⏭  ${col}: 0 documents`);
      continue;
    }

    console.log(`🔄 ${col}: ${entries.length} documents...`);

    const rows = entries.map(([firestoreId, data]) =>
      normalizeRow(col, firestoreId, data)
    );

    // Batch insert (100 at a time)
    const BATCH = 100;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < rows.length; i += BATCH) {
      const batch = rows.slice(i, i + BATCH);
      const { error } = await supabase
        .from(table)
        .upsert(batch, { onConflict: 'id', ignoreDuplicates: false });

      if (error) {
        console.error(`   ❌ Batch ${i}-${i + BATCH}: ${error.message}`);
        errors += batch.length;
      } else {
        inserted += batch.length;
      }
    }

    console.log(`   ✅ ${inserted} inserted, ${errors} errors`);
    totalInserted += inserted;
    totalErrors += errors;
  }

  console.log(`\n✨ Migration complete!`);
  console.log(`   Total inserted: ${totalInserted}`);
  console.log(`   Total errors:   ${totalErrors}`);

  if (totalErrors > 0) {
    console.log(`\n⚠️  Some records failed. Check errors above.`);
    console.log(`   Run again - upsert is idempotent.`);
  }
}

// ── CLI ───────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const inputIdx = args.indexOf('--input');
const inputPath = inputIdx >= 0 ? args[inputIdx + 1] : './firestore-export.json';

migrate(inputPath).catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
