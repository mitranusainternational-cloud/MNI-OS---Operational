---
type: visual-evidence-index
status: pending-capture
updated: 2026-11-02
---

# Screenshot dan bukti visual

Screenshot aplikasi disimpan di folder ini agar berada di vault dan repository yang sama. **Belum ada screenshot aplikasi live yang diverifikasi dan ditambahkan setelah perbaikan preview.** Server `http://localhost:8002/` telah mengembalikan HTTP 200 untuk HTML, CSS, dan JavaScript; akses browser lokal untuk runner dinonaktifkan oleh pengaturan Work, jadi render harus diverifikasi melalui browser yang diizinkan sebelum screenshot baru dicatat.

## Format file

```text
YYYY-MM-DD__area__scenario__branch.png
```

Contoh nama: `2026-11-02__spk__monitoring__development.png`.

## Syarat capture

- Pastikan URL, halaman, branch/commit, dan skenario capture diketahui.
- Gunakan data sintetis atau data yang sudah dianonimkan.
- Sembunyikan kredensial, token, informasi pribadi, kontak pelanggan, nomor kendaraan, dan detail transaksi nyata.
- Tangkap keadaan UI secara utuh dan terbaca; jangan pangkas bagian yang mengubah makna bukti.
- Beri catatan di indeks ini dan embed gambar pada panduan fitur terkait.
- Tandai apakah UI, koneksi data, dan tindakan yang terlihat sudah diverifikasi terpisah.

## Daftar screenshot

| File | Halaman/skenario | Versi/commit | Bukti yang didukung | Status |
|---|---|---|---|---|
| — | Dashboard, gudang, SPK, logistik, master data | Menunggu preview | Tidak ada screenshot aplikasi yang tersimpan saat ini. | Pending |

## Template catatan capture

- **Tanggal/waktu:**
- **Halaman dan skenario:**
- **URL lokal:**
- **Branch/commit:**
- **Sumber data:** sintetis / disamarkan / lainnya (jelaskan izin)
- **UI terverifikasi:** ya/tidak
- **Database/persistence terverifikasi:** ya/tidak
- **File screenshot:**
- **Catatan/redaksi:**

## Indeks tambahan

| File | Halaman/skenario | Versi | Bukti | Status |
|---|---|---|---|---|
| `2026-11-02-mni-app-login-development.png` | Login `apps/mni-app`, `127.0.0.1:5174`, tanpa data | `development`, sebelum commit | UI login termuat; console error `addEventListener` pada null. Auth/DB tidak diuji. | Verified in browser (UI saja) |
