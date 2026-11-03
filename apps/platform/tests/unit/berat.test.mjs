// Uji mesin hitung berat terhadap nilai tersimpan di workbook Excel asli (192 bentuk, 6 keluarga).
//   node tests/unit/berat.test.mjs
// Setiap sel rumus dihitung ulang dari sampel masukan sheet dan dibandingkan dengan hasil yang disimpan Excel.
import fs from 'node:fs';
import { existsSync } from 'node:fs';
if (!existsSync(new URL('../../src/lib/berat/catalog.json', import.meta.url))) {
  console.log('SKIP: catalog.json tidak ada (dibuat lokal dari workbook, tidak disimpan di Git). Jalankan scripts/build-weight-catalog.mjs.');
  process.exit(0);
}
import { evalRow, hitung } from '../../src/lib/berat/engine.js';

const catalog = JSON.parse(fs.readFileSync(new URL('../../src/lib/berat/catalog.json', import.meta.url)));
const expected = JSON.parse(fs.readFileSync(new URL('./berat-excel-expected.json', import.meta.url)));
const R = []; const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
const close = (a, b) => Math.abs(a - b) <= 1e-6 * Math.max(1, Math.abs(b));

let cells = 0, mism = [];
for (const [fam, list] of Object.entries(expected)) {
  for (const e of list) {
    const b = catalog.keluarga[fam].bentuk.find((x) => x.id === e.id);
    const got = evalRow(b, e.sample);
    for (const [col, want] of Object.entries(e.cached)) {
      cells++;
      const g = got[col];
      const wantErr = want && typeof want === 'object';
      const okCell = wantErr ? !(typeof g === 'number' && Number.isFinite(g)) : typeof want === 'number' ? typeof g === 'number' && close(g, want) : true;
      if (!okCell) mism.push(`${fam}/${e.id}!${col} mesin=${g} excel=${JSON.stringify(want)}`);
    }
  }
}
ok('B-01 semua sel rumus Excel direproduksi', mism.length === 0, `${cells} sel, ${mism.length} selisih${mism.length ? ': ' + mism.slice(0, 3).join(' ; ') : ''}`);

// Contoh kunci dari sheet STU (angka tersimpan Excel: P7 = 18.6516, AG7 = 12.7220868, AJ7 = 17.543808, AM7 = 12.3066648)
const r1 = hitung(catalog, 'STU', 'STRAIGHT_STU', { w: 400, h: 100, l: 3000, t: 1.2, bj: 7.85 });
ok('B-02 STU straight 400x100x3000 t1.2 (estimasi)', r1 && close(r1.estimasi, 18.6516) && close(r1.estimasiLubang, 17.543808), JSON.stringify(r1));
const r2 = hitung(catalog, 'STU', 'STRAIGHT_STU', { w: 100, h: 100, l: 3000, t: 1.8, bj: 7.85 });
ok('B-03 STU straight 100x100x3000 t1.8 (real)', r2 && close(r2.real, 12.7220868) && close(r2.realLubang, 12.3066648), JSON.stringify(r2));
const r3 = hitung(catalog, 'STU', 'STRAIGHT_STU', { w: 100, h: 100, l: 3000, t: 1.2 });
ok('B-04 masukan kurang (tanpa bj): hasil null, bukan angka salah', r3 && r3.real === null && r3.estimasi === null);
const r4 = hitung(catalog, 'XXX', 'STRAIGHT_XXX', { w: 1 });
ok('B-05 keluarga tidak dikenal: null', r4 === null);
const r5 = hitung(catalog, 'STU', 'ELBOW_STU_R_D', { w: 100, h: 100, r: 300, thk: 2, bj: 7.85 });
ok('B-06 elbow (parameter thk dan r)', r5 && close(r5.estimasi, 8.158348) && typeof r5.real === 'number' && r5.real > 0 && r5.real < r5.estimasi, JSON.stringify(r5));

const fail = R.filter((x) => x.startsWith('FAIL')).length;
console.log(R.join('\n') + `\n${R.length - fail} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
