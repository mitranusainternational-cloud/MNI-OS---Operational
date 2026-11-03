// Mesin rute produksi multi work center (prototipe lokal, belum tersambung ke UI dan database).
// Fungsi murni: rute standar -> progres kumulatif per langkah -> antrian (WIP) per work center -> beban, utilisasi, dan
// prediksi selesai. Lihat documentation/RUTE_PRODUKSI.md untuk skema, aturan, dan keputusan yang menunggu pemilik.

// Rute standar per produk (judul section SPK). Dapat diubah admin (disimpan sebagai master/rute_produksi).
export const RUTE_STANDAR = {
  'CABLE TRAY': ['Shearing', 'Punching', 'Bending'],
  'PERFORATED CABLE TRAY': ['Shearing', 'Punching', 'Bending'],
  'CABLE LADDER': ['Shearing', 'Punching', 'Bending', 'Welding'],
  'CABLE DUCT': ['Shearing', 'Punching', 'Bending'],
  'COVER TRAY': ['Shearing', 'Bending'],
  'ACCS TRAY': ['CNC Laser', 'Bending', 'Welding'],
  'ACCS LADDER': ['CNC Laser', 'Bending', 'Welding'],
  'ACCS DUCT': ['CNC Laser', 'Bending', 'Welding'],
};

// Pengecualian berdasarkan kata di deskripsi (dicek berurutan, yang pertama cocok menang): bentuk tertentu tidak melewati semua mesin.
export const ATURAN_KHUSUS = [
  { cocok: /cover/i, produk: /LADDER|TRAY|DUCT/, rute: ['Shearing', 'Bending'], alasan: 'Cover: tanpa punching dan welding' },
];

const produkDari = (judul) => {
  const H = String(judul || '').toUpperCase();
  return Object.keys(RUTE_STANDAR).sort((a, b) => b.length - a.length).find((p) => H.startsWith(p)) || '';
};

// Rute untuk sebuah item: dari kolom rute item bila sudah diatur (snapshot), selain itu dari aturan khusus, selain itu rute produk.
export function tentukanRute({ judulSection, deskripsi, ruteItem }, rute = RUTE_STANDAR, aturan = ATURAN_KHUSUS) {
  if (Array.isArray(ruteItem) && ruteItem.length) return { rute: ruteItem.slice(), sumber: 'item' };
  const p = produkDari(judulSection);
  const k = aturan.find((a) => a.cocok.test(String(deskripsi || '')) && (!a.produk || a.produk.test(String(judulSection || '').toUpperCase())));
  if (k) return { rute: k.rute.slice(), sumber: 'aturan', alasan: k.alasan };
  if (p && rute[p]) return { rute: rute[p].slice(), sumber: 'produk' };
  return { rute: [], sumber: 'belum' };
}

// Kejadian produksi (append-only): { spk, item, wc, qty (tambahan, bukan kumulatif), tgl, by }
// Kumulatif per langkah untuk satu item.
export function kumulatif(rute, kejadian) {
  const kum = Object.fromEntries(rute.map((w) => [w, 0]));
  for (const e of kejadian) if (e.wc in kum) kum[e.wc] += Number(e.qty) || 0;
  return kum;
}

// Antrian per langkah: masuk = yang sudah lolos langkah sebelumnya (langkah pertama: seluruh qty SPK).
export function antrianPerLangkah(rute, kum, qtyTotal) {
  return rute.map((w, i) => {
    const masuk = i === 0 ? qtyTotal : kum[rute[i - 1]];
    const selesai = kum[w];
    return { wc: w, masuk, selesai, antri: Math.max(0, masuk - selesai), sisaKeLangkahBerikut: Math.max(0, selesai - (i + 1 < rute.length ? kum[rute[i + 1]] : selesai)) };
  });
}

// Validasi masukan: qty tambahan di sebuah langkah tidak boleh melebihi yang tersedia (lolos langkah sebelumnya dikurangi yang sudah selesai).
export function periksaMasukan(rute, kum, qtyTotal, wc, tambah) {
  const i = rute.indexOf(wc);
  if (i < 0) return { ok: false, alasan: `${wc} tidak ada di rute item ini (${rute.join(' → ')})` };
  if (!(tambah > 0)) return { ok: false, alasan: 'Jumlah harus lebih dari 0' };
  const tersedia = (i === 0 ? qtyTotal : kum[rute[i - 1]]) - kum[wc];
  if (tambah > tersedia) return { ok: false, alasan: `Hanya ${tersedia} yang siap di ${wc}${i ? ' (selesai di ' + rute[i - 1] + ': ' + kum[rute[i - 1]] + ')' : ''}` };
  return { ok: true, tersedia };
}

// Progres item = yang lolos langkah terakhir (kompatibel dengan kolom lama item.prod).
export const progresItem = (rute, kum) => (rute.length ? kum[rute[rute.length - 1]] : 0);

// Beban per work center dari semua item aktif.
// itemAktif: [{ spk, item, kategori, qty, rute, kum, due }]; kapasitas: { 'Shearing': 200, ... } (pcs per hari kerja)
// kejadianHariIni: kejadian pada tanggal hari ini (untuk "selesai hari ini")
export function bebanWC(itemAktif, kapasitas, kejadianHariIni = []) {
  const out = {};
  const wcs = new Set([...Object.keys(kapasitas || {}), ...itemAktif.flatMap((it) => it.rute)]);
  for (const w of wcs) out[w] = { wc: w, antri: 0, spk: new Set(), selesaiHariIni: 0, kapasitas: (kapasitas || {})[w] || 0 };
  for (const it of itemAktif) {
    for (const s of antrianPerLangkah(it.rute, it.kum, it.qty)) {
      if (s.antri > 0) { out[s.wc].antri += s.antri; out[s.wc].spk.add(it.spk); }
    }
  }
  for (const e of kejadianHariIni) if (out[e.wc]) out[e.wc].selesaiHariIni += Number(e.qty) || 0;
  for (const o of Object.values(out)) {
    o.jumlahSpk = o.spk.size; delete o.spk;
    o.hariHabis = o.kapasitas > 0 ? o.antri / o.kapasitas : null;
    o.status = o.kapasitas <= 0 ? 'Kapasitas belum diatur' : o.antri === 0 ? 'Kosong' : o.hariHabis <= 1 ? 'Normal' : o.hariHabis <= 3 ? 'Padat' : 'Overload';
  }
  return out;
}

// Perkiraan hari kerja sampai setiap item selesai. Tiap WC mengerjakan antriannya berurutan menurut due date (paling dekat dulu)
// dengan kapasitas per hari; item selesai ketika langkah terakhirnya selesai. Sengaja sederhana dan transparan (batch bertumpuk).
export function prediksiSelesai(itemAktif, kapasitas) {
  const hariWC = {}; // wc -> { itemKey -> hari selesai antrian item itu di wc }
  const antri = {};
  itemAktif.forEach((it, idx) => antrianPerLangkah(it.rute, it.kum, it.qty).forEach((s) => { if (s.antri > 0) (antri[s.wc] = antri[s.wc] || []).push({ idx, qty: s.antri, due: it.due || '9999-12-31' }); }));
  for (const [w, list] of Object.entries(antri)) {
    const kap = (kapasitas || {})[w] || 0;
    list.sort((a, b) => a.due.localeCompare(b.due));
    let cum = 0; hariWC[w] = {};
    for (const x of list) { cum += x.qty; hariWC[w][x.idx] = kap > 0 ? cum / kap : null; }
  }
  return itemAktif.map((it, idx) => {
    const hari = it.rute.map((w) => (hariWC[w] && idx in hariWC[w] ? hariWC[w][idx] : 0));
    if (hari.some((h) => h === null)) return { spk: it.spk, item: it.item, hari: null, alasan: 'Kapasitas belum diatur untuk WC di rutenya' };
    return { spk: it.spk, item: it.item, hari: Math.max(0, ...hari), penentu: it.rute[hari.indexOf(Math.max(...hari))] };
  });
}

// Tambah hari kerja (Senin sampai Jumat) ke tanggal ISO
export function tambahHariKerja(tglIso, n) {
  const d = new Date(tglIso + 'T00:00:00'); let k = Math.ceil(n);
  while (k > 0) { d.setDate(d.getDate() + 1); const w = d.getDay(); if (w !== 0 && w !== 6) k--; }
  const p = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; // tanggal lokal (toISOString menggeser sehari di zona UTC+7)
}

// Throughput aktual per WC (pcs per hari kerja) dari kejadian N hari terakhir: dasar saran kapasitas
export function throughputAktual(kejadian, dariTgl, sampaiTgl) {
  const per = {};
  const hari = new Set();
  for (const e of kejadian) {
    if (e.tgl < dariTgl || e.tgl > sampaiTgl) continue;
    per[e.wc] = per[e.wc] || { qty: 0, hari: new Set() };
    per[e.wc].qty += Number(e.qty) || 0; per[e.wc].hari.add(e.tgl); hari.add(e.tgl);
  }
  return Object.fromEntries(Object.entries(per).map(([w, v]) => [w, { total: v.qty, hariAktif: v.hari.size, rataPerHari: v.hari.size ? v.qty / v.hari.size : 0 }]));
}

// Belajar dari kejadian nyata: bila sebuah WC mencatat hasil untuk item yang tidak ada di rutenya, usulkan menambahkannya
// (sisip menurut urutan mesin global). Tim cukup menekan "Tambahkan" sekali; tidak perlu mengatur rute di muka.
export function usulanLangkah(rute, kejadian, urutanWC = []) {
  const asing = [...new Set(kejadian.map((e) => e.wc).filter((w) => w && !rute.includes(w)))];
  const pos = (w) => { const i = urutanWC.indexOf(w); return i < 0 ? 1e6 : i; };
  return asing.map((w) => {
    const baru = [...rute, w].sort((a, b) => pos(a) - pos(b) || rute.indexOf(a) - rute.indexOf(b));
    return { wc: w, ruteBaru: baru };
  });
}
