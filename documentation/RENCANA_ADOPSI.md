---
type: plan
status: active
updated: 2026-11-03
---

<img src="assets/logo-mni.png" alt="PT Mitra Nusa Internasional" width="190">

# Rencana adopsi: dari sistem siap menjadi sistem yang dipakai

Tujuan: tim gudang, PPIC, dan logistik memakai MNI Gudang & Logistik setiap hari karena pekerjaannya jadi lebih cepat dan lebih sedikit salah, bukan karena diwajibkan. Dasar teknis: [[AUDIT_KESIAPAN]], [[ENVIRONMENTS]], [[TEST_MATRIX]]. Peta sumber daya: [[SISTEM_MAP]].

## Prinsip

1. **Satu sumber kebenaran.** Setelah tanggal pindah, data hanya dicatat di sistem; workbook lama menjadi arsip baca-saja.
2. **Mulai kecil, buktikan, lalu lebar.** Satu alur dan beberapa orang dulu (pilot), baru semua tim.
3. **Kurangi ketikan, bukan menambah.** Nomor dokumen otomatis, pilihan dari master, antrean bongkar muat terbentuk dari surat jalan.
4. **Role sempit.** Setiap orang hanya melihat dan mengubah modul yang menjadi tugasnya (admin, ppic, gbb, gbj, logistik, viewer).
5. **Ada jalan mundur.** Cadangan harian dan prosedur pulih tertulis sebelum data nyata masuk.

## Gerbang sebelum data nyata masuk

| # | Gerbang | Pemilik | Bukti |
|---|---|---|---|
| G1 | Login admin di situs Vercel, 10 modul, ekspor PDF/Excel, CSP bersih | dev + pemilik | catatan di [[TEST_MATRIX]] |
| G2 | Data uji production dibersihkan (`bersihkan_data_uji.sql`): **selesai 2026-11-03** | pemilik | hitungan tabel nol kecuali `muser` dan `role_modules` |
| G3 | Cadangan: alat unduh cadangan dan skrip pulih **siap** ([[BACKUP_RESTORE]]); tinggal jadwal harian dan satu latihan pulih; paket berbayar bila memungkinkan | pemilik | tanggal uji pulih tercatat |
| G4 | Akun tim dibuat lewat Auth + `muser` dengan role yang benar; tidak ada pendaftaran bebas | pemilik | daftar akun dan role |
| G5 | Redirect URL Auth dan variabel Preview dirapikan | pemilik | [[ENVIRONMENTS]] |
| G6 | Keputusan repo publik atau privat (T-166) | pemilik | [[documentation/DECISIONS|DECISIONS]] |
| G7 | PR `development` ke `main` digabung, deploy Production hijau | pemilik (persetujuan) | commit sama di GitHub dan Vercel |

## Tahap

| Tahap | Isi | Keluaran | Ukuran berhasil |
|---|---|---|---|
| 0. Persiapan (1 sampai 2 hari) | Selesaikan G1 sampai G7. Impor master nyata (supplier, vendor, customer, item) dari workbook privat tanpa menaruhnya di Git | master terisi dan dicek bersama PPIC | angka master cocok dengan workbook |
| 1. Pilot (1 sampai 2 minggu) | 3 sampai 5 orang: 1 PPIC, 1 gudang bahan baku, 1 gudang barang jadi, 1 logistik. Alur dicatat ganda: di sistem dan di cara lama | daftar masalah per hari (isu GitHub berlabel `temuan`) | selisih sistem vs cara lama nol selama 5 hari kerja beruntun |
| 2. Perluasan (2 minggu) | Tambah pengguna per modul, cara lama dihentikan per modul bila ukuran lolos | satu modul lepas dari workbook setiap beberapa hari | tidak ada pencatatan ganda tersisa |
| 3. Stabil (berjalan) | Rutinitas mingguan, perbaikan berdasarkan pemakaian, pertimbangan VPS ([[SISTEM_MAP]]) | CHANGELOG rutin | lihat ukuran sukses |

Urutan modul pilot yang disarankan: terima material, pakai material, SPK, surat jalan, bongkar muat, opname. Modul yang paling sering dipakai lebih dulu agar manfaatnya terasa cepat.

## Memudahkan pengguna

| Kebutuhan | Langkah |
|---|---|
| Cepat dipelajari | Panduan satu halaman per role (apa yang diklik untuk pekerjaan harian), bahasa operasional, bukan istilah teknis |
| Tidak takut salah | Sesi latihan di mode mock (`VITE_LOCAL_MOCK=1`, data sintetis) sebelum menyentuh production |
| Tahu harus ke mana | Satu orang penanggung jawab sistem (admin) dan satu saluran laporan masalah; laporan masuk sebagai isu `temuan` |
| Tidak kehilangan pekerjaan | Simpan terasa instan; pesan jelas saat gagal; muat ulang otomatis |
| Akses mudah | Pasang di layar utama ponsel (PWA) setelah pilot; satu alamat: https://mni-gudang.vercel.app |
| Lihat nilai | Tampilkan dua angka sejak awal: waktu mencatat satu dokumen dan jumlah koreksi per minggu |

## Risiko dan penanganan

| Risiko | Penanganan |
|---|---|
| Tim kembali ke workbook karena lebih akrab | tanggal henti per modul, workbook dijadikan baca-saja, penanggung jawab menegur lembut |
| Koneksi lambat (Frankfurt, simpan 0,6 sampai 1,5 detik) | ukur di lantai gudang; bila terasa lambat, pindahkan project ke Singapura (migration 1 sampai 10 siap diputar ulang) |
| Data nyata bocor lewat repo publik | data nyata hanya di `data/private-sources/` dan Supabase; putuskan T-166 |
| Satu akun admin tunggal | tambah admin kedua dan simpan cara pulih akun di tempat aman |
| Role salah memberi hak berlebih | uji hak per role setiap kali ada perubahan (regresi role 12 PASS) |
| Supabase gratis dijeda bila tidak aktif | cek mingguan; pertimbangkan paket berbayar sebelum go-live penuh |

## Ukuran sukses (diukur di akhir perluasan)

- 100% dokumen baru (terima, pakai, SPK, surat jalan) tercatat di sistem.
- Selisih stok sistem vs hitungan fisik pada opname di bawah batas yang disepakati gudang.
- Waktu membuat surat jalan turun dibanding cara lama (diukur dua minggu sebelum dan sesudah).
- Laporan masalah berat nol dalam dua minggu terakhir pilot.

## Rutinitas setelah berjalan

Ikuti tabel rutinitas di [[SISTEM_MAP]]. Tambahan: tinjauan pemakaian tiap bulan bersama tim (apa yang masih merepotkan), lalu masukkan ke roadmap sebagai tugas.

## Status gerbang (2026-11-03)

| Gerbang | Status |
|---|---|
| G1 login admin, modul, ekspor, CSP | selesai |
| G2 data uji dibersihkan | selesai (uji tersisa dibersihkan lagi sebelum pilot bila ada) |
| G3 cadangan | alat siap; jadwal dan latihan pulih menunggu pemilik |
| G4 akun tim dengan hak per modul | menu siap dan teruji; akun tim menunggu daftar dari walkthrough |
| G5 Redirect URL dan variabel Preview | menunggu pemilik |
| G6 repo publik atau privat | menunggu keputusan pemilik |
| G7 PR ke main | berjalan per fitur |
| Impor data awal ([[IMPOR_DATA_AWAL]]) | alat siap; isi menunggu sumber resmi dari walkthrough |
