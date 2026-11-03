---
type: research
date: 2026-11-02
topic: custom operational system discovery and design
status: general-methods-only
sources-reviewed: Microsoft Learn, SAP Help Portal
---

# Praktik discovery untuk MNI OS custom

## Arah dan batas riset

Keputusan produk MNI OS adalah membangun sistem custom yang mengikuti kebutuhan tim Operasional MNI. Antlia dan produk ERP lain **bukan blueprint**, tidak menentukan modul yang harus ada, dan bukan sumber kebenaran requirement. Catatan ini mempertahankan sumber riset umum sebagai metode kerja saja; semua desain wajib ditautkan ke bukti proses MNI dan divalidasi pemilik proses.

Tidak ada proses MNI yang dibuktikan oleh sumber pada halaman ini. Data ERP/Sheets, walkthrough, dan wawancara Operasional belum diperiksa pada riset awal ini.

## Metode discovery yang disarankan

### Mulai dari pekerjaan nyata

Untuk setiap proses yang dipilih bersama tim, dokumentasikan:

1. Outcome bisnis dan alasan proses dilakukan.
2. Pemicu, aktor/peran, input, langkah, keputusan, handoff, dan output.
3. Variasi, pengecualian, kegagalan, pekerjaan ulang, serta cara tim memulihkan kondisi.
4. Aturan bisnis, otorisasi, kontrol, bukti, audit, dan tenggat.
5. Sistem, file, formulir, percakapan kerja, dan data yang benar-benar digunakan.
6. Masalah serta ukuran dampaknya menurut pengguna/proses owner.

Gunakan wawancara singkat, walkthrough satu kasus nyata yang diizinkan, dan pemeriksaan dokumen/sheet yang relevan. Catat tanggal, narasumber/pemilik proses, cakupan, dan keterbatasan. Jangan mengambil kesimpulan dari nama menu, mockup, atau jumlah baris saja.

### Bedakan bukti dan keputusan

- **Observed:** langsung dilihat/didengar pada sesi atau sumber yang tercatat.
- **Interpretation:** makna yang ditafsirkan dari bukti; butuh konfirmasi.
- **Assumption:** dugaan sementara yang belum diverifikasi.
- **Proposed:** opsi solusi atau rancangan yang diajukan.
- **Approved:** keputusan pemilik proses yang memiliki tanggal dan cakupan.

Simpan referensi sumber tanpa menyalin data personal/operasional yang tidak dibutuhkan. Untuk Sheets, inventaris file, pemilik, tab, definisi kolom, formula, validasi, referensi antar-sheet, periode, dan kualitas data terlebih dahulu; ambil sampel minimum yang diizinkan.

### Turunkan requirement dan desain custom

Satu requirement yang diterima memiliki ID, masalah/outcome, pengguna terdampak, bukti dan pemilik sumber, aturan/kontrol, prioritas, dependensi, risiko, opsi, acceptance criteria, serta status keputusan. Desain pengalaman dan schema database diturunkan dari requirement tervalidasi. Sumber luar boleh membantu membandingkan pola implementasi, tetapi tidak dapat menggantikan validasi kebutuhan lokal.

Setiap fitur dipertimbangkan berdasarkan manfaat proses, biaya kesalahan, kontrol, frekuensi, kualitas sumber, ketergantungan, effort, risiko migrasi, dan kemampuan diuji. Fitur tidak dihapus atau ditambahkan hanya karena ada/tidak ada pada ERP lain atau jarang terlihat di sampel.

### Validasi secara bertahap

Pilih skenario bersama tim Operasional. Acceptance criteria mencakup alur normal dan pengecualian, permission, data invalid/kosong, audit, laporan, integrasi, serta pemulihan sesuai tingkat risiko. Lakukan review prototype dan UAT dengan pengguna/pemilik proses; catat penerimaan, gap, dan keputusan tindak lanjut.

Prinsip umum ini sejalan dengan panduan implementasi yang memulai dari proses bisnis, menginventarisasi sumber data, dan menguji alur end-to-end. Sumber tersebut dipakai sebagai referensi metodologi, bukan sebagai spesifikasi MNI: [Microsoft process-focused implementation](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution), [Microsoft data management and migration](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/data-management-configuration-data-migration), [Microsoft testing strategy](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy).

## Artefak kerja yang akan dipelihara

- Peta current-state per proses Operasional, lengkap dengan variasi dan sumber.
- Requirement register dan backlog prioritas yang dapat ditelusuri.
- Data dictionary serta lineage sumber, setelah akses disetujui.
- Log keputusan produk, arsitektur, permission, dan data.
- Prototype/vertical slice dan acceptance checklist yang terhubung ke requirement.
- Catatan uji, UAT, risiko terbuka, serta runbook penggunaan/pemulihan.

## Status pengetahuan saat catatan dibuat

- **Keputusan produk:** custom untuk kebutuhan tim Operasional; dicatat pada [[documentation/DECISIONS|log keputusan]].
- **Belum diketahui:** current-state tiap proses, role/otorisasi, definisi data, volume/quality, prioritas, dan proses pilot.
- **Hipotesis yang perlu ditinjau:** [[apps/gudang-logistik/docs/PILOT_BRIEF|brief saldo gudang]] dan [[apps/gudang-logistik/docs/DATA_MAPPING|mapping source/schema]].
- **Batas:** riset generik tidak memverifikasi proses MNI; hosted Supabase candidate bukan model data final.

## Sources

- Microsoft, [Implement a solution based on business processes](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/process-focused-solution), accessed 2026-11-02.
- Microsoft, [Manage configuration and migration data](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/data-management-configuration-data-migration), accessed 2026-11-02.
- Microsoft, [Testing strategy planning](https://learn.microsoft.com/en-us/dynamics365/guidance/implementation-guide/testing-strategy-planning), accessed 2026-11-02.
- SAP, [Fit-to-standard workshops](https://help.sap.com/docs/erp-transformation-with-itc/btm/fit-to-standard-workshops?locale=en-US&state=PRODUCTION&version=latest), accessed 2026-11-02; generic workshop-method reference only.
