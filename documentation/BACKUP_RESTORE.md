---
type: runbook
status: active
updated: 2026-11-03
---

# Cadangan dan pemulihan data

Paket Supabase gratis tidak menyediakan cadangan yang dapat dipulihkan. Sampai paket berbayar dipakai, cadangan dibuat dari aplikasi. Syarat go-live: [[RENCANA_ADOPSI]] (G3), tugas T-061.

## Membuat cadangan (super admin)

1. Login sebagai super admin di https://mni-gudang.vercel.app.
2. Klik **Unduh cadangan** (di ringkasan Dashboard, di menu Pengguna & Akses, atau di panel Akun saya).
3. Berkas `MNI-cadangan-<tanggal>.json` terunduh. Simpan di tempat aman di luar repo dan di luar folder vault (mis. drive perusahaan yang dibatasi aksesnya). **Jangan** masukkan ke Git: berisi data operasional nyata (pola `MNI-cadangan-*.json` sudah diabaikan Git).
4. Aplikasi mencatat waktu cadangan terakhir. Dashboard super admin memperingatkan bila belum ada cadangan atau sudah lebih dari 7 hari.

**Jadwal:** setiap hari kerja selama pilot (akhir shift), lalu minimal mingguan. Simpan beberapa generasi terakhir (mis. 14 hari).

Isi cadangan: semua tabel (pengguna, hak peran, pengaturan, master, bahan baku, barang jadi, SPK, mutasi, vendor, kirim, bongkar, PR, opname, log). Tidak ikut: akun login (Auth), yang dibuat ulang lewat menu Pengguna & Akses.

## Memulihkan (latihan atau kejadian nyata)

Pemulihan memakai kunci service-role project tujuan. Kunci itu hanya diketik di terminal saat menjalankan, tidak disimpan di berkas.

1. Siapkan project tujuan **kosong** dengan migration 1–12 terpasang (latihan: project sementara; kejadian nyata: project baru atau yang sudah dikosongkan).
2. Uji kering untuk melihat isi cadangan:

```bash
cd apps/platform
node scripts/restore-backup.mjs <berkas.json>
```

3. Tulis ke database tujuan:

```bash
SUPABASE_URL=https://<ref>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<kunci> node scripts/restore-backup.mjs <berkas.json> --apply
```

4. Buat ulang akun login anggota (email sama dengan baris pengguna) dan cocokkan jumlah baris di aplikasi dengan angka pada uji kering.

Skrip memakai upsert (menimpa baris dengan id sama) dan tidak menghapus data apa pun.

## Latihan pulih (gerbang go-live)

- [ ] Satu kali latihan ke project sementara; catat tanggal, jumlah baris sebelum dan sesudah, dan durasi di [[TEST_MATRIX]].
- [ ] Putuskan peningkatan ke paket berbayar (cadangan harian otomatis) sebelum penggunaan penuh.
