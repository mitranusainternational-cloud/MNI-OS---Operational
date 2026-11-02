---
type: operational-discovery-register
status: discovery-not-started
updated: 2026-11-02
---

# Discovery kebutuhan Operasional MNI

Halaman ini adalah indeks kerja untuk merancang MNI OS custom sesuai proses tim Operasional. Belum ada proses atau fitur yang dianggap disetujui sampai ada bukti dan validasi pemilik proses.

## Aturan pencatatan

- Catat fakta dari walkthrough, wawancara, dokumen, atau data yang memang diizinkan; sertakan tanggal, pemilik/sumber, cakupan, dan keterbatasan.
- Pisahkan `Observed`, `Interpretation`, `Assumption`, `Proposed`, dan `Approved`.
- Jangan menyimpan password, token, data pribadi, atau salinan transaksi yang tidak diperlukan. Gunakan referensi sumber dan data sintetis/masked untuk contoh.
- ERP eksternal dan praktik umum hanya memberi opsi pembanding; tim Operasional MNI dan process owner menetapkan kebutuhan.
- Setiap keputusan mengarah ke requirement ID, bukti, pemilik, dan acceptance criteria.

## Register proses

| Process ID | Nama proses | Pemilik proses | Tim/peran terlibat | Status discovery | Catatan |
|---|---|---|---|---|---|
| — | Belum ada proses yang dicatat | — | — | Not started | Mulai setelah walkthrough bersama tim Operasional. |

## Requirement register

| Requirement ID | Masalah/outcome | Pengguna terdampak | Bukti/sumber | Status | Prioritas | Acceptance criteria | Keputusan/link |
|---|---|---|---|---|---|---|---|
| — | Belum ada requirement tervalidasi | — | — | Not started | — | — | — |

## Inventaris sumber data

| Source ID | Sistem/file/proses | Pemilik | Periode/cakupan | Akses/izin | Sensitivitas | Kualitas/ketidakpastian | Status |
|---|---|---|---|---|---|---|---|
| — | Belum diinventarisasi | — | — | Belum dikonfirmasi | — | — | Not started |

## Urutan discovery

1. Tentukan proses dan tim yang ingin dibantu bersama pengguna/pemilik proses.
2. Lakukan walkthrough satu contoh kerja dan variasinya; jangan mengubah transaksi atau konfigurasi sistem sumber.
3. Catat aktor, pemicu, input, langkah, keputusan, handoff, pengecualian, kontrol, output, masalah, dan definisi istilah.
4. Inventaris data/dokumen yang dipakai, pemilik, periode, akses yang diizinkan, serta keterbatasannya.
5. Tulis requirement ID dengan outcome, bukti, aturan, risiko/dependensi, opsi, prioritas, dan skenario penerimaan.
6. Review bersama pemilik proses; catat `Approved`, `Needs clarification`, atau `Deferred` beserta tanggal dan cakupannya.
7. Baru setelah itu desain UI, schema Supabase Development, permission/RLS, integrasi, dan rencana pengujian.

## Template dan tautan

- [[templates/PROCESS_DISCOVERY_TEMPLATE|Template walkthrough proses]]
- [[templates/REQUIREMENT_TEMPLATE|Template requirement custom]]
- [[DATA_SOURCE_CATALOG|Katalog workbook sumber Operasional]]
- [[DATA_DICTIONARY|Draft kamus data Operasional]]
- [[DECISIONS|Log keputusan]]
- [[PROJECT_PROGRESS|Progress kerja]]
- [[ROADMAP|Roadmap dan checklist]]
- [[research/2026-11-02-erp-rationalization-best-practice|Metode discovery umum (bukan spesifikasi MNI)]]
- [[apps/gudang-logistik/docs/PILOT_BRIEF|Hipotesis lama saldo gudang (belum disetujui)]]
