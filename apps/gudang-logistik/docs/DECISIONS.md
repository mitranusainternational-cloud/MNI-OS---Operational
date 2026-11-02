# Catatan keputusan teknis

## 2026-11-01 — Pemisahan struktur awal

- **Konteks:** aplikasi ada sebagai satu file HTML besar dan perlu mudah dibaca lokal, dikelola di GitHub, serta didokumentasikan di Obsidian.
- **Keputusan:** pertahankan implementasi sebagai aplikasi vanilla; pindahkan CSS dan JavaScript ke `assets/`, tambahkan dokumentasi Markdown dan konfigurasi vault minimal.
- **Alasan:** perubahan ini merapikan permukaan proyek sambil menjaga perilaku lama tetap utuh.
- **Konsekuensi:** kode JavaScript masih satu berkas dan adapter `window.claude` tetap menjadi ketergantungan runtime.
