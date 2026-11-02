---
type: task
id: T-060
title: "Review security dan performance advisor"
phase: P6
epic: E-06
release: v1.0
status: todo
priority: P0
env: main
effort_days: 1
depends: [T-042]
owner: "dev"
updated: 2026-11-02
---

# T-060 Review security dan performance advisor

Epic: [[roadmap/epics/E-06-uat-hardening-dan-go-live|E-06]]  
Fase: P6 Hardening dan rilis  
Bergantung pada: T-042

## Kriteria selesai

- [ ] Temuan advisor dev dan prod ditinjau
- [ ] Kritis diperbaiki, lainnya diterima dengan alasan

## Bukti

- Belum ada.

## Catatan

Advisor keamanan Supabase dev (2026-11-02): fungsi SECURITY DEFINER `get_user_role`, `is_authenticated`, `is_admin_or_manager` dapat dipanggil lewat RPC oleh anon dan authenticated; `pg_trgm` di schema public. Pertimbangkan memindahkan fungsi ke schema privat dan mencabut EXECUTE dari anon.

-
