// Uji pemetaan deskripsi item SPK -> bentuk dan ukuran -> berat. Contoh memakai item SPK 633 dan contoh Cable Tray dari pemilik.
//   node tests/unit/berat-parser.test.mjs
import fs from 'node:fs';
import { existsSync } from 'node:fs';
if (!existsSync(new URL('../../src/lib/berat/catalog.json', import.meta.url))) {
  console.log('SKIP: catalog.json tidak ada (dibuat lokal dari workbook, tidak disimpan di Git). Jalankan scripts/build-weight-catalog.mjs.');
  process.exit(0);
}
import { hitungItem, bacaUkuran, bacaSection, massaJenis } from '../../src/lib/berat/parser.js';

const catalog = JSON.parse(fs.readFileSync(new URL('../../src/lib/berat/catalog.json', import.meta.url)));
const R = []; const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));

ok('P-01 bacaSection ladder', JSON.stringify(bacaSection('CABLE LADDER TYPE SLW 2.0 HOTDIP GALVANIZED')) === JSON.stringify({ keluarga: 'SLW', tebal: 2 }));
ok('P-02 bacaSection tray', JSON.stringify(bacaSection('CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED')) === JSON.stringify({ keluarga: 'STU', tebal: 1.2 }));
ok('P-03 SLHDC tidak tertukar SLHD', bacaSection('CABLE LADDER TYPE SLHDC 2.5').keluarga === 'SLHDC' && bacaSection('CABLE LADDER TYPE SLHD 2.5').keluarga === 'SLHD');
const u1 = bacaUkuran('Cover Clamp W300xH100, c/w Bolt Hex');
ok('P-04 ukuran dan abaikan c/w', u1.dim.w === 300 && u1.dim.h === 100 && Object.keys(u1.dim).length === 2, JSON.stringify(u1));
const u2 = bacaUkuran('Cable Tray W100xH100xL3000 1.2');
ok('P-05 tebal polos di akhir', u2.dim.l === 3000 && u2.tebal === 1.2, JSON.stringify(u2));
ok('P-06 massa jenis', massaJenis('SPHC').bj === 7.85 && massaJenis('SS304').bj === 7.93 && massaJenis('Aluminium').bj === 2.7 && massaJenis('???') === null);

const SEC = 'CABLE LADDER TYPE SLW 2.0 HOTDIP GALVANIZED';
const kasus = [
  ['Cable Ladder W300xH100xL3000 mm', 'STRAIGHT_SLW'],
  ['Cover Ladder W300xL3000 mm', 'COVER_STRAIGHT_SLW'],
  ['Cover Clamp W300xH100, c/w Bolt Hex', 'COVER_CLAMP_SLW'],
  ['Jointing Ladder H100, c/w Bolt Nut', 'JOINTING_SLW'],
  ['Horizontal Adjustable H100 c/w RHSN M10x20', 'HORIZONTAL_FISH_PLATE_SLW'],
  ['Vertical Adjustable H100 c/w RHSN M10x20', 'VERTICAL_FISH_PLATE_SLW'],
  ['End Plate W300xH100 c/w RHSN M10x20', 'END_STOP_SLW'],
  ['Horizontal Elbow Ladder W300xH100xR600 mm', 'ELBOW_SLW_R_D'],
  ['Cover Elbow Ladder W300xR600 mm', 'COVER_ELBOW_SLW_R_D'],
  ['Cover Equal Tee Ladder W300xR600 mm', 'COVER_TEE_SLW_R_D'],
  ['Inside Riser Ladder W300xH100xR600 mm', 'INSIDE_SLW_R_D'],
  ['Cover Inside Riser Ladder W300xR600 mm', 'COVER_INSIDE_SLW_R_D'],
  ['Outside Riser Ladder W300xH100xR600 mm', 'OUTSIDE_SLW_R_D'],
];
kasus.forEach(([d, want], i) => {
  const r = hitungItem(catalog, { judulSection: SEC, deskripsi: d, material: 'SPHC' });
  ok(`P-${String(10 + i)} ${d.slice(0, 38)}`, r.ok && r.bentuk === want && r.beratSPK > 0, r.ok ? `${r.bentuk} ${r.beratSPK.toFixed(3)} kg` : r.alasan);
});
const out = hitungItem(catalog, { judulSection: SEC, deskripsi: 'Cover Outside Riser Ladder W300xR600 mm', material: 'SPHC' });
ok('P-30 ukuran kurang -> tidak menebak angka', out.ok === false && /h/.test(out.alasan), out.alasan);
const tray = hitungItem(catalog, { judulSection: 'CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED', deskripsi: 'Cable Tray W100xH100xL3000 1.2', material: 'SPHC' });
ok('P-31 Cable Tray STU 100x100x3000 t1.2', tray.ok && tray.bentuk === 'STRAIGHT_STU' && tray.params.t === 1.2 && tray.beratSPK > 5 && tray.beratSPK < 15, tray.ok ? tray.beratSPK.toFixed(3) + ' kg' : tray.alasan);
const alum = hitungItem(catalog, { judulSection: 'CABLE TRAY TYPE STU 1.2', deskripsi: 'Cable Tray W100xH100xL3000', material: 'Aluminium' });
const baja = hitungItem(catalog, { judulSection: 'CABLE TRAY TYPE STU 1.2', deskripsi: 'Cable Tray W100xH100xL3000', material: 'SPHC' });
ok('P-32 aluminium lebih ringan dari baja (rasio massa jenis)', alum.ok && baja.ok && Math.abs(alum.beratSPK / baja.beratSPK - 2.7 / 7.85) < 1e-9, alum.ok ? (alum.beratSPK / baja.beratSPK).toFixed(4) : alum.alasan);
const nomat = hitungItem(catalog, { judulSection: SEC, deskripsi: 'Cable Ladder W300xH100xL3000 mm', material: '' });
ok('P-33 material kosong -> tidak menebak', nomat.ok === false && /Material/.test(nomat.alasan));
const asing = hitungItem(catalog, { judulSection: SEC, deskripsi: 'Baut M10 custom', material: 'SPHC' });
ok('P-34 deskripsi asing -> ditolak, bukan ditebak', asing.ok === false);

const fail = R.filter((x) => x.startsWith('FAIL')).length;
console.log(R.join('\n') + `\n${R.length - fail} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
