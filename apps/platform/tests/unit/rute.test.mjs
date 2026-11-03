// Uji mesin rute produksi multi work center.  node tests/unit/rute.test.mjs
import { usulanLangkah, tentukanRute, kumulatif, antrianPerLangkah, periksaMasukan, progresItem, bebanWC, prediksiSelesai, tambahHariKerja, throughputAktual } from '../../src/lib/produksi/rute.js';

const R = []; const ok = (id, pass, info = '') => R.push((pass ? 'PASS ' : 'FAIL ') + id + (info ? ' · ' + info : ''));
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Rute standar sesuai uraian pemilik
ok('R-01 Cable Tray: Shearing, Punching, Bending', eq(tentukanRute({ judulSection: 'CABLE TRAY TYPE STU 1.2 ELECTRO GALVANIZED', deskripsi: 'Cable Tray W100xH100xL3000 1.2' }).rute, ['Shearing', 'Punching', 'Bending']));
ok('R-02 Accs: CNC Laser, Bending, Welding', eq(tentukanRute({ judulSection: 'ACCS LADDER TYPE SLW 2.0 HOTDIP GALVANIZED', deskripsi: 'Horizontal Elbow Ladder W300xH100xR600 mm' }).rute, ['CNC Laser', 'Bending', 'Welding']));
ok('R-03 Ladder: Shearing, Punching, Bending, Welding', eq(tentukanRute({ judulSection: 'CABLE LADDER TYPE SLW 2.0 HOTDIP GALVANIZED', deskripsi: 'Cable Ladder W300xH100xL3000 mm' }).rute, ['Shearing', 'Punching', 'Bending', 'Welding']));
const cov = tentukanRute({ judulSection: 'CABLE LADDER TYPE SLW 2.0', deskripsi: 'Cover Ladder W300xL3000 mm' });
ok('R-04 Cover kondisional: tanpa punching dan welding', eq(cov.rute, ['Shearing', 'Bending']) && cov.sumber === 'aturan', cov.alasan);
ok('R-05 rute yang diatur pada item menang (fleksibel)', tentukanRute({ judulSection: 'CABLE TRAY TYPE STU', deskripsi: 'x', ruteItem: ['Shearing', 'Bending'] }).sumber === 'item');
ok('R-06 produk tak dikenal: belum ada rute', tentukanRute({ judulSection: 'LAIN-LAIN', deskripsi: 'x' }).sumber === 'belum');

// Progres kumulatif dan antrian: Cable Tray 16 btg, shearing 16, punching 10, bending 4
const rute = ['Shearing', 'Punching', 'Bending'];
const ev = [{ wc: 'Shearing', qty: 10 }, { wc: 'Shearing', qty: 6 }, { wc: 'Punching', qty: 10 }, { wc: 'Bending', qty: 4 }];
const kum = kumulatif(rute, ev);
ok('R-10 kumulatif per langkah', eq(kum, { Shearing: 16, Punching: 10, Bending: 4 }));
const aq = antrianPerLangkah(rute, kum, 16);
ok('R-11 antrian: shearing 0, punching 6, bending 6', aq[0].antri === 0 && aq[1].antri === 6 && aq[2].antri === 6, JSON.stringify(aq.map((x) => x.antri)));
ok('R-12 progres item = lolos langkah terakhir (kompatibel item.prod)', progresItem(rute, kum) === 4);

// Validasi masukan
ok('R-20 tidak bisa bending melebihi yang selesai punching', periksaMasukan(rute, kum, 16, 'Bending', 7).ok === false && periksaMasukan(rute, kum, 16, 'Bending', 6).ok === true);
ok('R-21 WC di luar rute ditolak', periksaMasukan(rute, kum, 16, 'Welding', 1).ok === false);
ok('R-22 jumlah nol atau negatif ditolak', periksaMasukan(rute, kum, 16, 'Punching', 0).ok === false);
ok('R-23 langkah pertama dibatasi qty SPK', periksaMasukan(rute, { Shearing: 16, Punching: 0, Bending: 0 }, 16, 'Shearing', 1).ok === false);

// Beban WC: dua SPK, kapasitas per hari
const kapasitas = { Shearing: 100, Punching: 50, Bending: 40, Welding: 30, 'CNC Laser': 60 };
const items = [
  { spk: 633, item: 'Cable Ladder', qty: 100, rute: ['Shearing', 'Punching', 'Bending', 'Welding'], kum: { Shearing: 100, Punching: 60, Bending: 20, Welding: 0 }, due: '2026-11-12' },
  { spk: 640, item: 'Cable Tray', qty: 200, rute, kum: { Shearing: 0, Punching: 0, Bending: 0 }, due: '2026-11-20' },
];
const b = bebanWC(items, kapasitas, [{ wc: 'Punching', qty: 25 }, { wc: 'Shearing', qty: 40 }]);
ok('R-30 antrian per WC (shearing 200, punching 40, bending 40, welding 20)', b.Shearing.antri === 200 && b.Punching.antri === 40 && b.Bending.antri === 40 && b.Welding.antri === 20, JSON.stringify(['Shearing', 'Punching', 'Bending', 'Welding'].map((w) => b[w].antri)));
ok('R-31 hari habis = antrian / kapasitas', Math.abs(b.Shearing.hariHabis - 2) < 1e-9 && Math.abs(b.Bending.hariHabis - 1) < 1e-9);
ok('R-32 status: Shearing Padat, Punching Normal, CNC Laser Kosong', b.Shearing.status === 'Padat' && b.Punching.status === 'Normal' && b['CNC Laser'].status === 'Kosong');
ok('R-33 selesai hari ini dari kejadian hari ini', b.Punching.selesaiHariIni === 25 && b.Shearing.selesaiHariIni === 40);
const tanpaKap = bebanWC(items, { Shearing: 100 }, []);
ok('R-34 kapasitas belum diatur ditandai, tidak dianggap tak terbatas', tanpaKap.Punching.status === 'Kapasitas belum diatur' && tanpaKap.Punching.hariHabis === null);

// Prediksi: SPK dengan due lebih dekat didahulukan
const p = prediksiSelesai(items, kapasitas);
ok('R-40 prediksi memakai antrian menurut due date (SPK 633 lebih dulu)', p[0].hari <= p[1].hari && p[0].hari > 0, JSON.stringify(p.map((x) => [x.spk, x.hari, x.penentu])));
ok('R-41 tanpa kapasitas: prediksi null dengan alasan', prediksiSelesai(items, { Shearing: 100 })[0].hari === null);
ok('R-42 tanggal selesai = hari ini + hari kerja (lewati akhir pekan)', tambahHariKerja('2026-11-06', 3) === '2026-11-11', tambahHariKerja('2026-11-06', 3)); // Jumat + 3 hk = Rabu

// Throughput aktual (dasar saran kapasitas)
const th = throughputAktual([{ wc: 'Shearing', qty: 80, tgl: '2026-11-02' }, { wc: 'Shearing', qty: 120, tgl: '2026-11-03' }, { wc: 'Bending', qty: 30, tgl: '2026-11-03' }, { wc: 'Shearing', qty: 999, tgl: '2026-10-01' }], '2026-11-01', '2026-11-05');
ok('R-50 throughput aktual: shearing 100 per hari (2 hari aktif)', th.Shearing.total === 200 && th.Shearing.rataPerHari === 100 && th.Bending.hariAktif === 1, JSON.stringify(th.Shearing));

// Belajar dari kejadian: welding dicatat untuk item yang rutenya tidak memuat welding -> usul sisip menurut urutan mesin
const us = usulanLangkah(['Shearing', 'Bending'], [{ wc: 'Welding', qty: 2 }, { wc: 'Bending', qty: 1 }], ['Shearing', 'Punching', 'Bending', 'Welding']);
ok('R-60 usulan langkah dari kejadian nyata', us.length === 1 && us[0].wc === 'Welding' && JSON.stringify(us[0].ruteBaru) === JSON.stringify(['Shearing', 'Bending', 'Welding']), JSON.stringify(us));

const fail = R.filter((x) => x.startsWith('FAIL')).length;
console.log(R.join('\n') + `\n${R.length - fail} PASS, ${fail} FAIL`);
process.exit(fail ? 1 : 0);
