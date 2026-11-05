// Aturan dan alur penawaran (fungsi murni, tanpa DOM, tanpa akses data).
// Dipakai modul Penawaran (UI) dan diuji tanpa katalog nyata. Harga dan berat dihitung oleh ./harga.js.
//
// Dokumen penawaran (kolom aplikasi; sisanya tersimpan di kolom JSONB data):
//   { no, nomor, rev, tgl, berlaku, customer, attn, proyek, sales, franco, kirim, bayar, catatan, status, pilih,
//     varian: [{ k:'A', nama, skenario, diskon, ppn, items:[{ id, kel, bentuk, u:{w,h,l,r..}, q, ket }] }],
//     riwayat: [{ rev, status, tgl, varian }] }
import { hitungBaris, masukanBentuk, cariBentuk, totalPenawaran, kebutuhanKg } from './harga.js';

export const STATUS = ['Draft', 'Menunggu persetujuan', 'Terkirim', 'Disetujui', 'Ditolak'];
/** Nilai awal aturan; pemilik dapat mengubahnya (tersimpan di master penawaran_aturan). batasSales: diskon tertinggi tanpa persetujuan. */
export const ATURAN_DEFAULT = { kode: 'MNI', berlakuHari: 7, diskonDefault: 0.3, batasSales: 0.3, ppn: 0.11 };

const salin = (x) => JSON.parse(JSON.stringify(x));
const num = (v, d) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : d);
const ms = (d) => Date.parse(d + 'T00:00:00Z');
export const geserTanggal = (d, n) => new Date(ms(d) + n * 864e5).toISOString().slice(0, 10);

/** Gabungkan aturan tersimpan dengan nilai awal; nilai tidak sah diganti nilai awal. */
export function aturan(tersimpan) {
  const t = tersimpan || {};
  return {
    kode: String(t.kode || ATURAN_DEFAULT.kode).trim().toUpperCase().replace(/[^A-Z0-9]/g, '') || ATURAN_DEFAULT.kode,
    berlakuHari: Math.max(1, Math.round(num(t.berlakuHari, ATURAN_DEFAULT.berlakuHari))),
    diskonDefault: Math.min(1, num(t.diskonDefault, ATURAN_DEFAULT.diskonDefault)),
    batasSales: Math.min(1, num(t.batasSales, ATURAN_DEFAULT.batasSales)),
    ppn: Math.min(1, num(t.ppn, ATURAN_DEFAULT.ppn)),
  };
}

/** Nomor: urutan.KODE/bulan/tahun, mis. 040.MNI/07/2026. */
export function nomorPenawaran(urut, kode, tgl) {
  const [y, m] = String(tgl).slice(0, 7).split('-');
  return `${String(urut).padStart(3, '0')}.${kode}/${m}/${y}`;
}
export const labelNomor = (p) => (p.nomor || '–') + (p.rev > 0 ? ' Rev.' + p.rev : '');

/** Diskon tertinggi tanpa persetujuan menurut peran: admin tanpa batas, Sales sesuai aturan, peran lain 0. */
export function batasDiskon(a, peran) { return peran === 'admin' ? 1 : peran === 'sales' ? a.batasSales : 0; }
export const diskonTertinggi = (p) => Math.max(0, ...(p.varian || []).map((v) => +v.diskon || 0));
export function perluPersetujuan(a, peran, p) { return peran !== 'admin' && diskonTertinggi(p) > batasDiskon(a, peran) + 1e-9; }
export const kedaluwarsa = (p, hariIni) => ['Draft', 'Terkirim'].includes(p.status) && !!p.berlaku && p.berlaku < hariIni;

export function varianBaru(kode, skenario, a) { return { k: kode, nama: 'Varian ' + kode, skenario: skenario || 0, diskon: a.diskonDefault, ppn: a.ppn, items: [] }; }
export function penawaranBaru({ tgl, sales = '', a, nomor = '', no = 0 }) {
  return { no, nomor, rev: 0, tgl, berlaku: geserTanggal(tgl, a.berlakuHari), customer: '', attn: '', proyek: '', sales, franco: '', kirim: '', bayar: '', catatan: '', status: 'Draft', pilih: null, varian: [varianBaru('A', 0, a)], riwayat: [] };
}
let _id = 0;
export function itemBaru(kel = '', bentuk = '', q = 1) { return { id: 'i' + Date.now().toString(36) + (_id++).toString(36), kel, bentuk, u: {}, q, ket: '' }; }

/** Daftar keluarga produk dan bentuk di katalog (untuk pilihan di lembar). */
export const daftarKeluarga = (katalog) => [...new Set((katalog.bentuk || []).map((b) => b.keluarga))];
export const bentukDiKeluarga = (katalog, kel) => (katalog.bentuk || []).filter((b) => b.keluarga === kel).map((b) => ({ id: b.id, judul: b.judul, masukan: masukanBentuk(katalog, b.id) }));

/** Teks deskripsi item untuk cetak: "SLU Straight Ladder W200xH50xL3000". */
export function deskripsiItem(katalog, it) {
  const b = cariBentuk(katalog, it.bentuk);
  if (!b) return '(bentuk tidak dikenal)';
  const ukuran = (masukanBentuk(katalog, it.bentuk) || []).map((n) => n.toUpperCase() + (it.u && Number.isFinite(+it.u[n]) ? +it.u[n] : '?')).join('x');
  return `${b.keluarga} ${b.judul}${ukuran ? ' ' + ukuran : ''}`.replace(/\s+/g, ' ').trim();
}

/** Hitung satu varian: baris (harga, jumlah, kg), total (dibulatkan ke Rupiah), kg total, dan jumlah baris bergalat. */
export function hitungVarian(katalog, skenarioList, varian) {
  const sk = (skenarioList || [])[varian.skenario || 0];
  const baris = (varian.items || []).map((it) => ({ ...it, hasil: sk ? hitungBaris(katalog, sk, it.bentuk, it.u || {}, +it.q || 0) : { galat: 'Skenario tidak tersedia' } }));
  const total = totalPenawaran({ jumlah: baris.map((b) => b.hasil.jumlah), diskon: +varian.diskon || 0, ppn: +varian.ppn || 0, bulatkan: true });
  return { baris, total, kg: kebutuhanKg(baris.map((b) => b.hasil)), galat: baris.filter((b) => b.hasil.galat).length };
}

/** Daftar masalah yang menghalangi pengiriman penawaran; kosong berarti siap. */
export function periksaKirim(p, katalog, skenarioList) {
  const m = [];
  if (!String(p.customer || '').trim()) m.push('Customer belum diisi.');
  if (!(p.varian || []).length) m.push('Belum ada varian.');
  (p.varian || []).forEach((v) => {
    const h = hitungVarian(katalog, skenarioList, v);
    if (!h.baris.length) m.push(`${v.nama || 'Varian ' + v.k}: belum ada item.`);
    h.baris.forEach((b, i) => {
      if (!(+b.q > 0)) m.push(`${v.nama || 'Varian ' + v.k} baris ${i + 1}: jumlah harus lebih dari 0.`);
      if (b.hasil.galat) m.push(`${v.nama || 'Varian ' + v.k} baris ${i + 1}: ${b.hasil.galat}.`);
    });
  });
  return m;
}

/** Aksi yang tersedia menurut status dan peran. */
export function aksiTersedia(p, peran) {
  const admin = peran === 'admin';
  const s = p.status;
  const a = [];
  if (s === 'Draft') a.push('simpan', 'kirim');
  if (s === 'Menunggu persetujuan' && admin) a.push('setujuDiskon', 'kembalikan');
  if (s === 'Terkirim') a.push('setujuCustomer', 'tolak');
  if (['Terkirim', 'Disetujui', 'Ditolak'].includes(s)) a.push('revisi');
  a.push('cetak');
  return a;
}

export function buatRevisi(p, { tgl, a }) {
  const snap = { rev: p.rev, status: p.status, tgl: p.tglKirim || p.tgl, varian: salin(p.varian) };
  const n = salin(p);
  n.riwayat = [...(p.riwayat || []), snap];
  n.rev = p.rev + 1; n.status = 'Draft'; n.pilih = null; n.tglKirim = null; n.tglSetuju = null; n.alasan = ''; n.berlaku = geserTanggal(tgl, a.berlakuHari);
  return n;
}

/** Terapkan aksi dan kembalikan salinan baru. Melempar Error untuk aksi yang tidak diizinkan. */
export function terapkan(p, aksi, { peran, a, tgl, oleh = '', varian = null, alasan = '' } = {}) {
  if (!aksiTersedia(p, peran).includes(aksi)) throw new Error(`Aksi ${aksi} tidak tersedia untuk status ${p.status}.`);
  const n = salin(p);
  switch (aksi) {
    case 'kirim':
      if (perluPersetujuan(a, peran, p)) { n.status = 'Menunggu persetujuan'; n.diajukanOleh = oleh; break; }
      n.status = 'Terkirim'; n.tglKirim = tgl; break;
    case 'setujuDiskon': n.status = 'Terkirim'; n.tglKirim = tgl; n.diskonDisetujuiOleh = oleh; break;
    case 'kembalikan': n.status = 'Draft'; n.catatanPenyetuju = alasan; break;
    case 'setujuCustomer':
      if (!varian || !(p.varian || []).some((v) => v.k === varian)) throw new Error('Pilih varian yang disetujui customer.');
      n.status = 'Disetujui'; n.pilih = varian; n.tglSetuju = tgl; break;
    case 'tolak': n.status = 'Ditolak'; n.alasan = alasan; break;
    case 'revisi': return buatRevisi(p, { tgl, a });
    default: break;
  }
  return n;
}
