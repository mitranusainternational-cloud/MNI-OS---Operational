---
type: task
id: T-075
title: "Bangun agen dan skill proyek di .claude"
phase: P0
epic: E-01
release: v0.9
status: done
priority: P1
env: development
effort_days: 1
depends: []
owner: "dev"
updated: 2026-11-02
---

# T-075 Bangun agen dan skill proyek di .claude

Epic: [[roadmap/epics/E-01-fondasi-workspace-dan-repo|E-01]]
Fase: P0

## Kriteria selesai

- [x] 7 skill proyek di .claude/skills (vault-progress, e2e-regression, supabase-dev-ops, adapter-contract, release-pipeline, vps-readiness, discovery-session)
- [x] 6 agen proyek di .claude/agents (progress-keeper, qa-regression, supabase-engineer, app-engineer, release-manager, ops-analyst)
- [x] CLAUDE.md dan katalog di TEAM_AND_SKILLS memetakan peran per tahap

## Bukti

- Source-level (2026-11-02): berkas ada dan ditautkan di [[TEAM_AND_SKILLS]] dan `CLAUDE.md`. Isinya dirangkum dari alur yang sudah terbukti (regresi 33/33, uji Supabase dev). Belum diuji dengan memanggil agen satu per satu.

## Catatan

Skill dan agen Codex lama (.agents, .codex) dipertahankan. Tinjau isi skill setelah dipakai pertama kali.
