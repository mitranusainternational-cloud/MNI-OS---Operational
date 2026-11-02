---
type: task
id: T-026
title: "Uji lanjutan UI mock: fitur yang belum tercakup"
phase: P2
epic: E-03
release: v1.0
status: todo
priority: P1
env: development
effort_days: 3
depends: [T-019]
owner: "dev"
updated: 2026-11-02
---

# T-026 Uji lanjutan UI mock: fitur yang belum tercakup

Epic: [[roadmap/epics/E-03-kualitas-aplikasi-dan-keamanan-data|E-03]]
Fase: P2 Aplikasi siap uji  
Bergantung pada: T-019

## Kriteria selesai

- [ ] Stock opname dan kartu stok diuji (hitung, selisih, simpan)
- [ ] Edit dan hapus item gudang dan master data diuji
- [ ] SPK: edit, duplikat, revisi, ubah status, dan pencatatan produksi (prod) diuji
- [ ] Vendor: penerimaan kembali, retur/reject, dan status; surat jalan customer: ubah status
- [ ] Bongkar muat: langkah proses, koreksi, dan batalkan diuji
- [ ] Ekspor XLSX dan PDF/cetak dokumen diuji
- [ ] Filter, pencarian, tema gelap, dan tampilan mobile diperiksa
- [ ] Hasil dicatat di TEST_MATRIX dengan ID fitur baru

## Bukti

- Belum ada. Daftar fitur belum tercakup ada di [[TEST_MATRIX]].

## Catatan

Dikerjakan pada mode mock; ulangi pada Supabase nyata di T-021 setelah Docker tersedia.
