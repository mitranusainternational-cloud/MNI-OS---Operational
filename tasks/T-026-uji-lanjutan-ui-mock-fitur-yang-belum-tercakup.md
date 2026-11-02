---
type: task
id: T-026
title: "Uji lanjutan UI mock: fitur yang belum tercakup"
phase: P2
epic: E-03
release: v1.0
status: done
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

- [x] Stock opname dan kartu stok diuji (hitung, selisih, simpan)
- [x] Edit dan hapus item gudang dan master data diuji
- [x] SPK: edit, duplikat, revisi, ubah status, dan pencatatan produksi (prod) diuji
- [x] Vendor: penerimaan kembali, retur/reject, dan status; surat jalan customer: ubah status
- [x] Bongkar muat: langkah proses diuji (koreksi dan batalkan dipindah ke T-027)
- [x] Ekspor XLSX dan PDF/cetak dokumen diuji
- [x] Filter, pencarian, tema gelap, dan tampilan mobile diperiksa
- [x] Hasil dicatat di TEST_MATRIX dengan ID fitur baru

## Bukti

- Verified in browser (2026-11-02, mock): F-15 sampai F-30 PASS, 4 bug tambahan diperbaiki (B-006 sampai B-009). Rincian di [[TEST_MATRIX]]. Sisa fitur dipindah ke [[tasks/T-027-uji-sisa-ui-mock-void-koreksi-pr-dan-role|T-027]].

## Catatan

Dikerjakan pada mode mock; ulangi pada Supabase nyata di T-021 setelah Docker tersedia.
