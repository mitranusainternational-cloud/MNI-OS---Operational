---
type: dashboard
status: active
updated: 2026-11-02
---

# Dashboard progress

Satu sumber kebenaran: **catatan tugas di `tasks/`**. Dashboard ini hanya menampilkan ulang. Tidak ada status yang disimpan di tempat lain.

## Ringkasan statis (terbaca di GitHub dan tanpa plugin)

![[PROGRESS_SNAPSHOT]]

## Roadmap per rilis dan epic (Bases)

Status, progress, dan jumlah tugas epic dihitung otomatis. Ringkasan narasi: [[roadmap/PRODUCT_ROADMAP]].

![[Epic.base]]

## Tugas (Bases, fitur inti Obsidian)

Butuh Obsidian 1.9 atau lebih baru dengan core plugin **Bases** aktif (Settings → Core plugins → Bases). Tampilan: semua tugas per fase, belum selesai, P0 terbuka, per rilis dan epic, diblokir/review.

![[Tugas.base]]

## Cara memperbarui (rutin, 2 menit)

1. Buka catatan tugas di `tasks/`, ubah `status` (`todo`, `doing`, `blocked`, `review`, `done`) dan `updated`.
2. Centang kriteria selesai dan tulis **bukti** (commit, URL, screenshot, hasil uji) di bagian Bukti. Tanpa bukti, jangan ubah ke `done`.
3. Jalankan `node scripts/progress-report.mjs` untuk menyegarkan [[PROGRESS_SNAPSHOT]]. Skrip menandai dependensi atau status yang salah.
4. Tambahkan entri bertanggal di [[PROJECT_PROGRESS]] untuk perubahan yang berdampak (isi: hasil, bukti, hambatan, langkah berikut).

## Aturan

- Satu tugas = satu hasil yang dapat diverifikasi, effort kurang dari sekitar 5 hari. Pecah bila lebih besar.
- `blocked` wajib menyebut penyebab dan pemilik tindakan di bagian Catatan.
- Prioritas: **P0** menahan go-live, **P1** penting, **P2** boleh ditunda.
- Versi (`env`): `development`, `main`, atau `docs` menunjukkan branch tempat hasil kerja mendarat.
- Tugas baru: salin [[documentation/templates/TASK_TEMPLATE|template tugas]] ke `tasks/`, beri ID berikutnya, tautkan dependensi.
- Tugas baru wajib punya `epic` dan `release` yang sama dengan epic-nya (skrip akan menandai bila tidak).
- Rencana go-live: [[GO_LIVE_PLAN]]. Arah produk: [[roadmap/PRODUCT_ROADMAP]]. Checklist Now/Next/Later: [[ROADMAP]].
