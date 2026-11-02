---
project: MNI OS Operational
type: project-dashboard
status: active
active-version: development
updated: 2026-11-02
---

# MNI OS — Gudang & Logistik

> [!summary] Satu vault untuk kode, rencana, progress, riset, dan bukti
> Sistem custom untuk tim Operasional MNI. Arah, kebutuhan, dan prioritas berasal dari proses nyata tim; referensi eksternal hanya pembanding. Status di bawah dihitung dari catatan tugas, bukan ditulis tangan.

## 1. Status sekarang

![[PROGRESS_SNAPSHOT#Ringkasan]]

Dashboard interaktif: [[PROGRESS_DASHBOARD]] · Kesehatan vault: [[VAULT_HEALTH]]

| Area | Kondisi | Detail |
|---|---|---|
| Aplikasi | Scaffold `apps/mni-app` build lolos; halaman login dan shell termuat di browser tanpa error JS. Login, database, dan RLS belum diuji | [[documentation/ENVIRONMENTS]] |
| Database | Schema 20 tabel + RLS siap sebagai migration; Docker belum aktif sehingga belum pernah dijalankan | [[documentation/FOUNDATION_BASELINE]] |
| Data | Enam workbook terprofil read-only; sumber resmi dan saldo belum direkonsiliasi | [[documentation/DATA_SOURCE_CATALOG]] |
| Kebutuhan | Discovery bersama tim Operasional belum dimulai; pilot belum dipilih | [[documentation/OPERATIONAL_DISCOVERY]] |
| GitHub | `development` dan `docs` ter-push; `main` dan `versi-awal` baseline; proteksi `main` belum aktif | [[documentation/GITHUB_MIGRATION]] |
| Deploy | Belum ada Supabase dev/prod, Vercel, atau CI | [[GO_LIVE_PLAN]] |

## 2. Saya ingin…

| Tujuan | Buka |
|---|---|
| Tahu apa yang dikerjakan berikutnya | [[PROGRESS_SNAPSHOT#Siap dikerjakan sekarang (dependensi terpenuhi)]] |
| Melihat arah produk dan rilis | [[roadmap/PRODUCT_ROADMAP]] |
| Melihat langkah menuju go-live | [[GO_LIVE_PLAN]] |
| Memperbarui status pekerjaan | [[PROGRESS_DASHBOARD#Cara memperbarui (rutin, 2 menit)]] |
| Membaca keputusan dan alasannya | [[documentation/DECISIONS]] |
| Memahami tiga versi (Development, Main, Docs) | [[documentation/ENVIRONMENTS]] dan [[documentation/VERSION_STRATEGY]] |
| Menjalankan dan mengembangkan aplikasi | [[apps/gudang-logistik/docs/DEVELOPMENT]] dan `apps/mni-app/README.md` |
| Mempelajari cara memakai aplikasi | [[apps/gudang-logistik/docs/USER_GUIDE]] |
| Melihat bukti (screenshot) | [[documentation/screenshots/README]] |
| Merilis ke pengguna | [[documentation/RELEASE_CHECKLIST]] |
| Membaca riset | [[research/README]] |
| Memahami data operasional | [[documentation/DATA_SOURCE_CATALOG]], [[documentation/DATA_DICTIONARY]] |
| Memilih agent atau skill kerja | [[documentation/TEAM_AND_SKILLS]] |

## 3. Peta vault

| Folder | Isi | Dikelola oleh |
|---|---|---|
| `roadmap/` | Roadmap produk dan catatan epic (E-01 sampai E-14) | Tangan (isi), skrip (status) |
| `tasks/` | Satu catatan per tugas, sumber status progress | Tangan |
| `documentation/` | Rencana, progress, keputusan, panduan, template, screenshot, dashboard | Tangan; `PROGRESS_SNAPSHOT` dan `VAULT_HEALTH` oleh skrip |
| `research/` | Riset bertanggal dengan sumber | Tangan |
| `apps/gudang-logistik/` | Sumber UI aktif (HTML/CSS/JS) dan dokumen aplikasi | Tangan |
| `apps/mni-app/` | Scaffold Vite + Supabase + deploy | Tangan |
| `websites/` | Situs lain dan situs Docs (rencana) | Tangan |
| `data/` | Hanya README; workbook privat `data/private-sources/` diabaikan Git | Lokal |
| `scripts/` | `progress-report.mjs`, `check-vault.mjs` | Tangan |
| `.agents/`, `.codex/` | Skill dan agent lokal | Tangan |

Aturan kerja ada di `AGENTS.md`; cara memakai vault: [[documentation/WORKSPACE_GUIDE]].

## 4. Ritme kerja

- **Harian:** ubah status tugas yang disentuh, tulis bukti, jalankan `node scripts/progress-report.mjs`.
- **Mingguan:** tinjau [[PROGRESS_SNAPSHOT]], blocker, dan estimasi; catat di [[documentation/PROJECT_PROGRESS]]; jalankan `node scripts/check-vault.mjs --write`.
- **Per rilis:** [[documentation/RELEASE_CHECKLIST]] dan tinjau ulang [[roadmap/PRODUCT_ROADMAP]].
