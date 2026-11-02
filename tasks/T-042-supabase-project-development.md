---
type: task
id: T-042
title: "Supabase project development"
phase: P4
epic: E-05
release: v1.0
status: done
priority: P0
env: development
effort_days: 0.5
depends: [T-011]
owner: "pemilik akun Supabase"
updated: 2026-11-02
---

# T-042 Supabase project development

Epic: [[roadmap/epics/E-05-environment-cloud-dan-ci-cd|E-05]]  
Fase: P4 Environment cloud  
Bergantung pada: T-011

## Kriteria selesai

- [x] Project terpisah dari prod
- [x] Migration diterapkan lewat CLI
- [x] Target dan lineage tercatat di [[FOUNDATION_BASELINE]]

## Bukti

- Project `MNI Gudang - Dev` (ref `inldyqigewmziwazalun`) dibuat 2026-11-02; 3 migration terpasang; 20 tabel, 39 policy, 17 tabel realtime; advisor keamanan hanya peringatan. Keputusan: [[documentation/DECISIONS]]. Detail: [[documentation/ENVIRONMENTS]].
- Catatan: `MNI OS - Operational` (kosong) dijeda agar muat batas gratis.

## Catatan

Inventaris dan opsi (A: project baru, B: Docker lokal, C: project ERP yang ada) ada di [[documentation/ENVIRONMENTS]]. Dua project Supabase aktif yang ada berskema ERP berbeda dan tidak dipakai. Keputusan dan biaya menunggu pemilik akun (2026-11-02).

-
