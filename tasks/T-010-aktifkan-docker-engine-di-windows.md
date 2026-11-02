---
type: task
id: T-010
title: "Aktifkan Docker engine di Windows"
phase: P1
epic: E-02
release: v0.9
status: blocked
priority: P0
env: development
effort_days: 0.5
depends: []
owner: "pemilik mesin (BIOS + admin Windows)"
updated: 2026-11-02
---

# T-010 Aktifkan Docker engine di Windows

Epic: [[roadmap/epics/E-02-aplikasi-berjalan-lokal|E-02]]  
Fase: P1 Fondasi lokal

## Kriteria selesai

- [ ] docker version menampilkan Client dan Server
- [ ] Virtualisasi/WSL2 aktif

## Bukti

- Belum ada.

## Catatan

**Blocked:** virtualisasi CPU nonaktif di BIOS. Pemilik tindakan: pemilik mesin. Langkah lengkap: [[DOCKER_SETUP]] (BIOS Lenovo F1 → Security → Virtualization → Intel Virtualization Technology = Enabled; lalu fitur Windows + WSL, restart, Docker Desktop).

Blocker lokal utama. Diagnosis 2026-11-02: Docker Desktop dijalankan tetapi engine tidak start; `VirtualizationFirmwareEnabled=False` dan hypervisor tidak ada. Tindakan pemilik mesin: aktifkan Intel VT-x/Virtualization di BIOS, aktifkan fitur Windows Virtual Machine Platform dan WSL (admin), `wsl --install --no-distribution`, restart. Sementara itu pratinjau memakai [[LOCAL_PREVIEW|mode mock]] (T-016).
