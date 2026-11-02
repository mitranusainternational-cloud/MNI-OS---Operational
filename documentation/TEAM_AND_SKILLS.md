---
type: team-operating-model
status: active
updated: 2026-11-02
---

# Tim kerja Codex dan skill lokal

Model ini membagi pekerjaan berdasarkan hasil yang dibutuhkan. Definisi agent adalah panduan spesialis lokal; ia tidak menjalankan tim paralel secara otomatis. Koordinator memilih peran yang relevan untuk setiap pekerjaan.

## Tim inti

| Peran | File agent | Keluaran |
|---|---|---|
| Koordinator produk/proyek | Codex utama + halaman ini | Brief, prioritas, acceptance criteria, pembagian tugas, keputusan, progress |
| Analis proses Operasional | `.codex/agents/erp-process-analyst.toml` (agent existing, cakupan diarahkan ke proses MNI) | Peta current-state, kebutuhan, aturan, pengecualian, kontrol, inventaris data, dan bukti; read-only saat discovery |
| Analis kebutuhan website | `.codex/agents/web-product-analyst.toml` | Brief fitur, aktor, journey, aturan bisnis, skenario normal/pengecualian, acceptance criteria |
| Engineer frontend | `.codex/agents/frontend-engineer.toml` | Perubahan UI yang kecil dan sesuai stack aktif, catatan file dan dampak |
| QA E2E Playwright | `.codex/agents/playwright-e2e-runner.toml` | Rencana/skenario E2E, hasil uji yang diminta, artifact dan batas cakupan |
| Peneliti/dokumentator | `.codex/agents/project-documentarian.toml` | Catatan riset dengan sumber, panduan pengguna/pengembang, indeks screenshot, update vault |

## Skill yang tersedia

- [ERP process discovery](../.agents/skills/erp-process-discovery/SKILL.md) — pakai teknik discovery secara read-only untuk proses dan data Operasional MNI; bukan untuk menyalin blueprint vendor.
- [Website product discovery](../.agents/skills/website-product-discovery/SKILL.md) — memahami kebutuhan dan mengubahnya menjadi spesifikasi terukur.
- [Vanilla frontend maintenance](../.agents/skills/vanilla-frontend-maintenance/SKILL.md) — menjaga aplikasi HTML/CSS/JS saat ini dengan perubahan bertahap.
- [Playwright E2E](../.agents/skills/playwright-e2e/SKILL.md) — menulis dan menjalankan skenario melalui browser yang didukung, dengan data uji aman.
- [Project documentation](../.agents/skills/project-documentation/SKILL.md) — dokumentasi source/evidence dan navigasi vault Obsidian.

## Alur satu pekerjaan

1. **Pahami:** koordinator menulis tujuan, pengguna, proses, ruang lingkup, serta apa yang tidak boleh berubah.
2. **Spesifikasikan:** gunakan analis kebutuhan/proses Operasional bila alur atau data belum jelas. Gali proses MNI terlebih dahulu dan catat fakta, asumsi, opsi, serta keputusan terpisah.
3. **Implementasikan:** engineer mengerjakan setelah acceptance criteria dapat diperiksa.
4. **Verifikasi:** QA membuat/menjalankan pemeriksaan yang diminta setelah code tersedia dan environment aman/terakses. Catat cakupan dan hasil aktual.
5. **Dokumentasikan:** dokumentator memperbarui halaman aplikasi dan progress, lalu menghubungkan screenshot tanpa data sensitif.
6. **Tinjau:** koordinator memeriksa diff, kriteria, hambatan, dan gate rilis. Keputusan proses/fitur dan rilis tetap pada pemiliknya.

## Pembagian cepat

- Boleh paralel: riset sumber read-only, analisis proses independen, audit dokumentasi, atau penyusunan skenario uji.
- Hindari paralel: perubahan bersamaan pada file/fungsi yang sama, perubahan schema/data sambil UI belum disepakati, atau QA pada environment yang belum diketahui.
- Gunakan satu brief kerja dan satu acceptance checklist sebagai titik temu seluruh peran.
- Untuk perubahan rutin, gunakan branch `development`; jangan stage `.obsidian/` dan jangan promosi ke `main` tanpa gate pada [[RELEASE_CHECKLIST|checklist rilis]].

## Batas dan status saat ini

- Stack source saat ini: HTML/CSS/JavaScript. Jangan migrasi framework sampai keputusan arsitektur dibuat.
- Kebutuhan tim Operasional MNI menjadi sumber requirement; tidak ada ERP vendor yang menjadi blueprint fitur atau model data.
- Persistence/backend dan E2E browser belum diverifikasi; jangan menyatakan transaksi tersimpan atau alur browser berhasil tanpa bukti.
- Skill QA tidak mengizinkan akses melalui cookies, token, browser profile, CDP, atau API tersembunyi.
- Agent ERP tetap read-only. Penggunaan Composio Sheets menunggu koneksi aktif dan ruang lingkup yang ditentukan.
- Untuk referensi dan alasan pemilihan peran, lihat [[../research/2026-11-02-agent-team-and-skills-best-practice|riset tim dan skill]].
