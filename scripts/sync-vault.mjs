#!/usr/bin/env node
// Menyegarkan semua catatan turunan di vault dalam satu perintah:
//   1. progress-report.mjs  -> documentation/PROGRESS_SNAPSHOT.md dan properti epic
//   2. check-vault.mjs --write -> documentation/VAULT_HEALTH.md
// Jalankan setelah mengubah catatan tugas dan sebelum commit. Kode keluar 1 bila ada masalah.

import { spawnSync } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const here = dirname(fileURLToPath(import.meta.url));
let failed = false;
for (const args of [['progress-report.mjs'], ['check-vault.mjs', '--write']]) {
  const r = spawnSync(process.execPath, [resolve(here, args[0]), ...args.slice(1)], { stdio: 'inherit' });
  if (r.status !== 0) failed = true;
}
// Pemeriksaan ulang tanpa --write agar kode keluar mencerminkan keadaan akhir.
const final = spawnSync(process.execPath, [resolve(here, 'check-vault.mjs')], { stdio: 'ignore' });
if (final.status !== 0) failed = true;
console.log(failed ? 'SELESAI DENGAN MASALAH: lihat documentation/VAULT_HEALTH.md dan keluaran di atas' : 'OK: snapshot dan kesehatan vault terbaru');
process.exitCode = failed ? 1 : 0;
