---
type: release-checklist
status: active
updated: 2026-11-02
---

# Checklist promosi versi

Gunakan daftar ini saat meninjau perubahan dari `development` ke `main`. Setiap item harus diberi status dan bukti; tulis N/A beserta alasan bila tidak berlaku.

## Sebelum rilis

- [ ] Tujuan dan ruang lingkup perubahan tercatat di [[PROJECT_PROGRESS|log progress]].
- [ ] Perubahan dibandingkan dengan kebutuhan dan tidak mengubah baseline `versi-awal`.
- [ ] Tidak ada kredensial, data personal, atau ekspor transaksi sensitif dalam perubahan.
- [ ] Pemeriksaan yang sesuai dengan perubahan telah dijalankan dan hasilnya dicatat.
- [ ] Alur normal dan pengecualian penting ditinjau pada lingkungan aman.
- [ ] Batas, risiko, dan masalah yang belum selesai terdokumentasi.
- [ ] Dokumentasi dan cara pemulihan diperbarui bila dibutuhkan.
- [ ] Pemilik proyek menyetujui rilis.

## Batas data dan deployment

- [ ] Target deployment dan konfigurasi `main` telah diidentifikasi.
- [ ] Kredensial dan database tidak dibagikan antara development dan main kecuali ada desain dan kontrol yang terdokumentasi.
- [ ] Backup/pemulihan dan pemantauan tersedia bila perubahan menyentuh data atau layanan.
- [ ] Tidak ada klaim kesiapan pengguna sebelum alur aplikasi, akses, dan persistence diverifikasi pada target yang dimaksud.

## Setelah persetujuan

1. Buat pull request `development` → `main` dan tautkan bukti pemeriksaan.
2. Tinjau perubahan, status deployment, dan pemilik rilis.
3. Gabungkan perubahan setelah persetujuan sesuai aturan repository.
4. Catat commit/versi hasil rilis, tanggal, dan verifikasi pasca-rilis di [[PROJECT_PROGRESS|log progress]].

Checklist ini bukan persetujuan otomatis. Branch `main` hanya diperbarui setelah peninjauan dan persetujuan pemilik rilis.
