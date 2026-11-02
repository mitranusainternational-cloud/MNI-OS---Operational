---
type: guide
status: active
updated: 2026-11-02
---

# Pratinjau lokal mni-app (mode mock)

Cara menjalankan dan mencoba aplikasi di mesin sendiri **tanpa Docker dan tanpa Supabase**. Data bersifat sintetis dan disimpan di `localStorage` browser. Mode ini untuk meninjau UI dan alur; **bukan** bukti bahwa Supabase, Auth, RLS, atau realtime sungguhan bekerja (lihat [[GO_LIVE_PLAN]] T-011, T-020 sampai T-022).

## Menjalankan

```bash
cd apps/mni-app
npm ci
npm run extract
npx vite --host 127.0.0.1 --port 5173 --no-open
```

Di PowerShell yang memblokir skrip (`npx.ps1 cannot be loaded`), pakai `npx.cmd` sebagai ganti `npx`. Buka `http://127.0.0.1:5173/`. File `apps/mni-app/.env.local` (diabaikan Git) berisi `VITE_LOCAL_MOCK=1`; salin dari `.env.example` bila belum ada.

## Login lokal

Masukkan salah satu email di bawah, klik **Kirim Kode Masuk**, lalu isi kode **123456**. Kode dan akun ini hanya berlaku di mode mock lokal dan tidak dikenali Supabase mana pun.

| Email | Role |
|---|---|
| `admin@mni.local` | admin |
| `manager@mni.local` | manager |
| `gudang@mni.local` | gudang |
| `produksi@mni.local` | produksi |
| `viewer@mni.local` | viewer |

## Data contoh

Enam bahan baku, tiga barang jadi, dua SPK (satu sengaja lewat jatuh tempo), master customer/supplier/vendor/work center, dan counter. Semuanya fiktif. Perubahan yang Anda buat tersimpan di browser; hapus dengan `localStorage.removeItem('mni-local-mock-db')` lalu muat ulang, atau gunakan jendela privat.

## Batasan yang diketahui

- Mock meniru batasan UUID Postgres untuk kolom id agar ketidakcocokan id terdeteksi lebih awal.
- Hak akses per role belum ditegakkan (di aplikasi `ROLE_ON=false`; mock tidak meniru RLS).
- Realtime hanya dalam satu tab, bukan antar pengguna.
- Nama pengguna kini tampil setelah login (B-002). Teks "Backend belum terhubung" bawaan prototipe masih ada di sidebar; lihat [[tasks/T-017-rapikan-identitas-pengguna-dan-teks-backend-di-mni|T-017]].
- Seed memakai nomor SPK numerik (1001, 1002) dan bentuk barang jadi sesuai label app; jika browser menyimpan seed lama, versi seed (`VERSION` di `local-supabase.js`) menimpanya otomatis.
- Mock hanya aktif di `localhost` / `127.0.0.1` dan menolak dijalankan di host lain.
- Pengujian nyata tetap butuh Supabase lokal. Di mesin ini Docker Desktop tidak dapat start karena virtualisasi CPU nonaktif di BIOS (lihat [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]]).

Hasil uji modul dan fitur: [[TEST_MATRIX]]. Bukti: [[screenshots/README]].
