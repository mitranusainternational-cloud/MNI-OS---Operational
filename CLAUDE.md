# MNI OS — panduan untuk Claude Code

Vault Obsidian sekaligus repository aplikasi MNI Gudang & Logistik. Aturan kerja lengkap ada di [AGENTS.md](AGENTS.md); dashboard di [Home.md](Home.md). Baca keduanya sebelum bekerja.

## Rangkuman cepat

- **Aplikasi:** UI aktif `apps/gudang-logistik/`; scaffold produksi `apps/mni-app/` (Vite + Supabase). Pratinjau mock: `apps/mni-app` dengan `VITE_LOCAL_MOCK=1`. Supabase dev: `npx.cmd vite --mode supabase-dev --port 5174` (PowerShell memblokir `npx.ps1`).
- **Status:** `tasks/` (satu catatan per tugas) adalah sumber kebenaran; `node scripts/sync-vault.mjs` menyegarkan snapshot dan memeriksa vault dan harus berakhir `OK` sebelum commit.
- **Jalur rilis:** lokal → Supabase dev → GitHub CI → Vercel preview → UAT → production → VPS opsional ([documentation/INTEGRATION_PATH.md](documentation/INTEGRATION_PATH.md)).
- **Branch:** kerja di `development`; `main` hanya lewat PR (1 approval); `versi-awal` beku; `docs` mengikuti dokumentasi. Push dari mesin ini: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin development docs`.

## Skill proyek (`.claude/skills/`)

`vault-progress`, `e2e-regression`, `supabase-dev-ops`, `adapter-contract`, `rls-roles`, `release-pipeline`, `vps-readiness`, `discovery-session`.

## Agen proyek (`.claude/agents/`)

`progress-keeper`, `qa-regression`, `supabase-engineer`, `app-engineer`, `release-manager`, `ops-analyst`. Peta peran per tahap: [documentation/TEAM_AND_SKILLS.md](documentation/TEAM_AND_SKILLS.md).

## Aturan penting

- Jangan menyimpan atau mencetak kunci service-role, password, token, atau data operasional nyata. Workbook privat tetap di `data/private-sources/` (diabaikan Git).
- Bedakan bukti: `source-level`, `verified in browser`, `verified in database`. Mock bukan bukti Supabase.
- Setiap perubahan adapter atau UI diikuti regresi penuh (0 FAIL).
- Tindakan akun (membuat project cloud, menghubungkan Vercel, DNS, merge ke `main`) hanya setelah persetujuan eksplisit pemilik.
- Skill dan agen Codex lama tetap ada di `.agents/` dan `.codex/`; pekerjaan baru memakai `.claude/`.
