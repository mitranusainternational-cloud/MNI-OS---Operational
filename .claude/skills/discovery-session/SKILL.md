---
name: discovery-session
description: Siapkan, jalankan, dan catat sesi discovery dengan tim Operasional (alur SPK, gudang, sumber data, pilot, role). Gunakan saat menjadwalkan sesi, mencatat hasil wawancara, atau mengisi register discovery dan keputusan D-01 sampai D-10.
---

# Sesi discovery

Rujukan: `documentation/DISCOVERY_AGENDA.md` (5 sesi, pertanyaan kunci, tabel keputusan), `documentation/OPERATIONAL_DISCOVERY.md`, `documentation/DATA_SOURCE_CATALOG.md`, template `documentation/templates/PROCESS_DISCOVERY_TEMPLATE.md` dan `REQUIREMENT_TEMPLATE.md`.

## Sebelum

- Pemilik proyek menetapkan tanggal dan peserta; agen tidak mengirim undangan atau pesan.
- Siapkan satu salinan template proses per alur dan tabel keputusan.

## Selama

- Hanya mengamati dan bertanya; jangan mengubah workbook atau sistem sumber.
- Catat langkah, aktor, pengecualian, kontrol, dan istilah dengan label `Observed`, `Interpretation`, `Assumption`, `Proposed`, `Approved`.
- Jangan menyalin baris data operasional atau data pribadi; catat struktur dan aturan.
- Prototipe hanya pemicu tanggapan di akhir; bukan kebutuhan.

## Sesudah (24 jam)

1. Rapikan menjadi halaman proses; tautkan dari register di `OPERATIONAL_DISCOVERY.md`.
2. Perbarui katalog data (owner, as-of, frekuensi, isu DQ-*) dan `DECISIONS.md`.
3. Ubah status T-030, T-031, T-032, T-036 dengan bukti; skill `vault-progress`.
4. Kirim ringkasan ke pemilik proses untuk konfirmasi; sisakan `Needs clarification`.
5. Pilot dipilih → mulai T-033 (pemetaan kolom) dan T-034 (impor).
