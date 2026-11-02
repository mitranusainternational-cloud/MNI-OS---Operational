---
project: MNI OS Operational
type: project-dashboard
status: active
active-version: development
updated: 2026-11-02
---

# MNI OS Operational

> [!summary] Dashboard workspace
> Satu vault untuk source code aplikasi website, dokumentasi penggunaan dan pengembangan, riset, bukti visual, serta roadmap.
>
> **Arah produk:** MNI OS custom berdasarkan proses dan kebutuhan tim Operasional MNI. Referensi eksternal memberi pola pembanding saja; tidak menentukan fitur atau model data.

## Ringkasan progress

| Area | Status | Ringkasan |
|---|---|---|
| Workspace Obsidian | Fondasi tersusun | Vault memiliki dashboard, panduan workspace, progress, roadmap, riset, template, dan indeks screenshot. |
| Aplikasi Gudang & Logistik | Preview lokal aktif | HTML/CSS/JS merespons; Supabase config scaffold tersedia, local DB belum hidup, dan browser visual belum diverifikasi. |
| Dokumentasi | Draf awal tersedia | Panduan penggunaan source-level; SOP proses tetap perlu validasi. |
| Discovery Operasional | Belum dimulai | Arah custom disepakati; proses aktual dan prioritas masih perlu digali bersama tim/pemilik proses. |
| Fondasi database/integrasi | Audit + local scaffold | Hosted Supabase dibaca read-only, local config ada; target/lineage belum jelas dan Docker memblokir local stack. Composio OAuth/Vercel belum disiapkan. |
| Screenshot aplikasi | Menunggu verifikasi browser | Preview `localhost:8002` dan aset merespons 200; render pascaperbaikan belum dapat diperiksa oleh runner, screenshot live belum ditambahkan. |

## Fokus sekarang

- [[documentation/ROADMAP|Roadmap dan checklist]] — urutan kerja Now / Next / Later serta checklist pemakaian Codex, Playwright, Composio, Obsidian, Git, dan GitHub.
- [[documentation/IMPLEMENTATION_PLAN|Rencana implementasi local-first]] — urutan Supabase lokal → vertical slice → Composio → GitHub/Vercel → UAT/domain.
- [[documentation/FOUNDATION_BASELINE|Baseline fondasi dan bukti]] — source, runtime, Supabase discovery, tool gap, serta blocker.
- [[documentation/OPERATIONAL_DISCOVERY|Discovery dan requirement Operasional]] — register kosong untuk menggali, memvalidasi, dan menelusuri kebutuhan custom.
- [[documentation/DATA_SOURCE_CATALOG|Katalog data Operasional]] — inventaris enam workbook, struktur awal, dan tahapan monitoring.
- [[documentation/DATA_DICTIONARY|Kamus data draft]] — label sumber, candidate key, dan definisi yang perlu disahkan.
- [[apps/gudang-logistik/docs/PILOT_BRIEF|Brief pilot lama (hipotesis)]] — inquiry saldo bahan baku belum disepakati; validasi kebutuhan dimulai dari tim Operasional.
- [[documentation/PROJECT_PROGRESS|Progress dan hambatan]] — fakta, status, bukti, dan tindak lanjut.
- [[apps/gudang-logistik/docs/USER_GUIDE|Panduan penggunaan aplikasi]] — orientasi UI dan batasan preview.
- [[apps/gudang-logistik/docs/DEVELOPMENT|Panduan pengembangan]] — source, preview, dan perubahan kode.
- [[apps/gudang-logistik/docs/DATA_MAPPING|Mapping prototype ke schema kandidat]] — semantic mapping provisional, bukan kontrak data.
- [[documentation/screenshots/README|Screenshot dan bukti visual]] — aturan simpan, nama file, dan indeks bukti.

## Peta pengetahuan

- [[documentation/WORKSPACE_GUIDE|Cara memakai vault ini]] — aturan struktur dan pencatatan.
- [[documentation/VERSION_STRATEGY|Strategi versi dan branch]] — `versi-awal`, `development`, `main`, dan `docs`.
- [[documentation/RELEASE_CHECKLIST|Checklist promosi versi]] — gate sebelum perubahan masuk `main`.
- [[documentation/DECISIONS|Log keputusan workspace]] — alasan struktur dan batas klaim.
- [[documentation/TEAM_AND_SKILLS|Tim Codex dan skill lokal]] — peran kerja, alur koordinasi, dan batas QA.
- [[documentation/templates/PROCESS_DISCOVERY_TEMPLATE|Template walkthrough proses Operasional]].
- [[documentation/templates/REQUIREMENT_TEMPLATE|Template requirement custom]].
- [[research/2026-11-02-obsidian-project-workspace-best-practice|Riset workflow Obsidian]].
- [[research/2026-11-02-erp-rationalization-best-practice|Metode discovery umum untuk MNI OS custom]].
- [[research/2026-11-02-agent-team-and-skills-best-practice|Riset tim agent dan skill pengembangan website]].
- [[research/2026-11-02-local-supabase-vercel-composio-readiness|Audit awal kesiapan Supabase, Vercel, dan Composio]].
- [[apps/gudang-logistik/docs/DATA_INVENTORY|Inventaris data indikatif dari source code]].
- [[research/README|Indeks riset]].

## Bagian workspace

- `apps/gudang-logistik/` — website aplikasi, asset source, panduan, dan file HTML referensi.
- `websites/` — proyek website lain dan rencana situs dokumentasi.
- `documentation/` — progress, roadmap, dokumentasi lintas aplikasi, screenshot, dan template.
- `research/` — sumber, temuan, penerapan ke data MNI, ketidakpastian, dan keputusan berbasis bukti.

## Cara memperbarui status

1. Perbarui checklist pada [[documentation/ROADMAP|roadmap]] saat sebuah keluaran benar-benar selesai.
2. Tambahkan tanggal, hasil, bukti, dan hambatan di [[documentation/PROJECT_PROGRESS|progress]].
3. Beri label `source`, `verified`, `inference`, atau `pending` pada data/temuan agar bukti tidak tercampur dengan dugaan.
4. Simpan screenshot hanya jika tidak memuat kredensial atau data personal; hubungkan dengan halaman fitur yang didokumentasikan.
