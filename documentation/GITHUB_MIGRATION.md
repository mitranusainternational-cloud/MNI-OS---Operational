---
type: runbook
status: draft
updated: 2026-11-02
---

# Migrasi ke GitHub

> [!success] 2026-11-02: remote `origin` terpasang ke `mitranusainternational-cloud/MNI-OS---Operational`; `development` dan `docs` sudah di-push. Sisa: default branch dan proteksi `main` (T-041).

Repo lokal ini (`mni-os`) menggantikan salinan kerja sebelumnya dan punya riwayat serta empat branch: `versi-awal`, `development`, `main`, `docs`. 

## Checklist sebelum push pertama

- [ ] Putuskan target: repo organisasi `mitranusainternational-cloud/MNI-OS---Operational` (sudah berisi `main`, `development`, `docs`, `versi-awal` lama) atau repo kosong baru.
- [ ] Login `gh` sebagai akun yang punya izin tulis (`gh auth status`; cek `push: true`).
- [ ] Jika target sudah berisi riwayat berbeda, jangan force-push. Dorong ke repo kosong baru, atau rebase setelah dibandingkan.
- [ ] Periksa tidak ada secret/workbook: `git ls-files | grep -Ei "\.env$|\.xlsx|\.pem|\.key"` harus kosong.
- [ ] Set branch default `main` dan aktifkan branch protection (PR + review) untuk `main`.
- [ ] Pasang secret Actions per environment: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Perintah (dijalankan pemilik akun)

```bash
git remote add origin <URL-repo>
git push -u origin versi-awal main development docs
```

Setelah push, catat hasil verifikasi di [[PROJECT_PROGRESS]].
