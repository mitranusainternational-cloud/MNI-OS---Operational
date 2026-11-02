---
project: MNI OS Operational
type: project-dashboard
status: active
active-version: development
updated: 2026-11-03
---

# MNI OS — Gudang & Logistik

> [!summary] Satu vault untuk kode, rencana, progress, riset, dan bukti
> Sistem custom untuk tim Operasional MNI. Arah, kebutuhan, dan prioritas berasal dari proses nyata tim; referensi eksternal hanya pembanding. Status di bawah dihitung dari catatan tugas, bukan ditulis tangan.

## 1. Status sekarang

![[PROGRESS_SNAPSHOT#Ringkasan]]

Dashboard interaktif: [[PROGRESS_DASHBOARD]] · Kesehatan vault: [[VAULT_HEALTH]]

| Area | Kondisi | Detail |
|---|---|---|
| Aplikasi | Pratinjau lokal (mock, 6 role) dan mode Supabase dev berjalan; 10 modul lulus; regresi 36 dan uji role 12 PASS (Playwright) | [[documentation/TEST_MATRIX]] · [[documentation/LOCAL_PREVIEW]] |
| Database | Supabase dev `MNI Gudang - Dev`: 20 tabel, RLS per role aplikasi (migration 1–4, 6, 7 terpasang), advisor tanpa ERROR; uji role di tingkat SQL lulus | [[documentation/ENVIRONMENTS]] · [[documentation/UJI_SUPABASE_DEV]] |
| Data | Enam workbook terprofil read-only; sumber resmi dan saldo belum direkonsiliasi | [[documentation/DATA_SOURCE_CATALOG]] |
| Kebutuhan | Discovery bersama tim Operasional belum dimulai; pilot belum dipilih | [[documentation/OPERATIONAL_DISCOVERY]] |
| GitHub | `development` dan `docs` ter-push; `main` dan `versi-awal` baseline; `main` terproteksi (PR + 1 approval) | [[documentation/GITHUB_MIGRATION]] |
| Deploy | Berikutnya: CI GitHub (T-046, T-077) lalu Vercel preview; Supabase prod dan VPS belum | [[documentation/INTEGRATION_PATH]] · [[GO_LIVE_PLAN]] |

## 2. Saya ingin…

| Tujuan | Buka |
|---|---|
| Tahu apa yang dikerjakan berikutnya | [[PROGRESS_SNAPSHOT#Siap dikerjakan sekarang (dependensi terpenuhi)]] |
| Melihat arah produk dan rilis | [[roadmap/PRODUCT_ROADMAP]] |
| Melihat langkah menuju go-live | [[GO_LIVE_PLAN]] |
| Melihat jalur integrasi lokal → Supabase → GitHub → Vercel → VPS | [[documentation/INTEGRATION_PATH]] |
| Memilih agen atau skill kerja | [[documentation/TEAM_AND_SKILLS]] (`.claude/`) |
| Memahami role dan hak akses | `.claude/skills/rls-roles/SKILL.md` dan [[documentation/DECISIONS]] |
| Memperbarui status pekerjaan | [[PROGRESS_DASHBOARD#Cara memperbarui (rutin, 2 menit)]] |
| Membaca keputusan dan alasannya | [[documentation/DECISIONS]] |
| Menyiapkan sesi dengan tim Operasional | [[documentation/DISCOVERY_AGENDA]] |
| Memahami tiga versi (Development, Main, Docs) | [[documentation/ENVIRONMENTS]] dan [[documentation/VERSION_STRATEGY]] |
| Menjalankan dan mengembangkan aplikasi | [[apps/gudang-logistik/docs/DEVELOPMENT]] dan `apps/platform/README.md` |
| Mempelajari cara memakai aplikasi | [[apps/gudang-logistik/docs/USER_GUIDE]] |
| Melihat bukti (screenshot) | [[documentation/screenshots/README]] |
| Merilis ke pengguna | [[documentation/RELEASE_CHECKLIST]] |
| Membaca riset | [[research/README]] |
| Memahami data operasional | [[documentation/DATA_SOURCE_CATALOG]], [[documentation/DATA_DICTIONARY]] |

## 3. Peta vault

| Folder | Isi | Dikelola oleh |
|---|---|---|
| `roadmap/` | Roadmap produk dan catatan epic (E-01 sampai E-15) | Tangan (isi), skrip (status) |
| `tasks/` | Satu catatan per tugas, sumber status progress | Tangan |
| `documentation/` | Rencana, progress, keputusan, panduan, template, screenshot, dashboard | Tangan; `PROGRESS_SNAPSHOT` dan `VAULT_HEALTH` oleh skrip |
| `research/` | Riset bertanggal dengan sumber | Tangan |
| `apps/gudang-logistik/` | Sumber UI aktif (HTML/CSS/JS) dan dokumen aplikasi | Tangan |
| `apps/platform/` | Scaffold Vite + Supabase + deploy | Tangan |
| `websites/` | Situs lain dan situs Docs (rencana) | Tangan |
| `data/` | Hanya README; workbook privat `data/private-sources/` diabaikan Git | Lokal |
| `scripts/` | `sync-vault.mjs` (jalankan ini), `progress-report.mjs`, `check-vault.mjs` | Tangan |
| `.claude/`, `CLAUDE.md` | Skill dan agen proyek untuk Claude Code | Tangan |
| `.agents/`, `.codex/` | Skill dan agen Codex (lama) | Tangan |

Aturan kerja ada di `AGENTS.md`; cara memakai vault: [[documentation/WORKSPACE_GUIDE]].

## 4. Ritme kerja

- **Harian:** ubah status tugas yang disentuh, tulis bukti, jalankan `node scripts/sync-vault.mjs`.
- **Mingguan:** tinjau [[PROGRESS_SNAPSHOT]], blocker, dan estimasi; catat di [[documentation/PROJECT_PROGRESS]]; tinjau [[VAULT_HEALTH]].
- **Per rilis:** [[documentation/RELEASE_CHECKLIST]] dan tinjau ulang [[roadmap/PRODUCT_ROADMAP]].
