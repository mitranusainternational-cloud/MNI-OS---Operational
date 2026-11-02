---
type: task
id: T-040
title: "Putuskan akun dan repo GitHub target"
phase: P4
status: done
priority: P0
env: main
effort_days: 0.5
depends: []
owner: "pemilik proyek"
updated: 2026-11-02
---

# T-040 Putuskan akun dan repo GitHub target

Fase: P4 Environment cloud

## Kriteria selesai

- [x] Repo target dipilih (org atau baru)
- [x] Akun yang dipakai punya push: true (cek gh api)

## Bukti

- Target: repo organisasi `mitranusainternational-cloud/MNI-OS---Operational`. `gh` login sebagai akun organisasi; `gh api` melaporkan admin/push: true (2026-11-02).

## Catatan

Saat ini nurilhamjn hanya punya akses baca ke repo organisasi.
