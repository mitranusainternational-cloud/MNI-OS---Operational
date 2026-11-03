---
name: release-pipeline
description: Jalur rilis bertahap MNI OS dari lokal ke Supabase dev, GitHub, Vercel preview, UAT, production, dan opsi VPS, lengkap dengan gerbang tiap tahap. Gunakan saat menyiapkan CI, deploy, PR ke main, atau menjawab "tahap berikutnya apa".
---

# Pipeline rilis bertahap

Rujukan utama: `documentation/INTEGRATION_PATH.md` (tahap, gerbang, matriks environment, kriteria VPS). Checklist rilis: `documentation/RELEASE_CHECKLIST.md`.

## Urutan dan gerbang

| Tahap | Isi | Gerbang untuk lanjut |
|---|---|---|
| S0 Lokal | Mock + regresi, lalu Supabase lokal (Docker) bila tersedia | Regresi 0 FAIL |
| S1 Supabase dev | Migration, login nyata, uji adapter dan RLS | T-029, T-021, T-022, T-028 selesai |
| S2 GitHub | PR ke `main` dengan CI (build + regresi) wajib hijau | T-046, `main` terproteksi |
| S3 Vercel preview | `development` → Supabase dev, URL preview | Smoke test di URL preview |
| S4 UAT | Data terimpor dan terekonsiliasi, process owner menguji | Sign-off T-053 |
| S5 Production | Supabase prod terpisah + Vercel production dari `main` | [[documentation/RELEASE_CHECKLIST]] + persetujuan pemilik |
| S6 VPS (opsional) | Self-host atau layanan pendamping | Kriteria di INTEGRATION_PATH |

## Aturan

- Hanya `development` menerima kerja harian. `main` berubah lewat PR (1 approval, percakapan selesai); `versi-awal` beku.
- Secret hanya di Vercel dan GitHub Actions per environment; kunci service-role tidak masuk klien atau repo.
- Dev dan prod memakai Supabase, URL, dan secret terpisah. Tidak ada impor data nyata ke prod sebelum sign-off UAT.
- Push dari mesin ini: `git -c credential.helper= -c "credential.helper=!gh auth git-credential" push origin development docs` (Git Credential Manager menyimpan akun lama).
- Pengaturan akun (membuat project, menghubungkan Vercel ke organisasi GitHub, DNS) dikerjakan pemilik atau setelah persetujuan eksplisit; agen menyiapkan langkah dan memverifikasi hasilnya.

## Setiap tahap selesai

Perbarui tugas terkait, `documentation/ENVIRONMENTS.md`, dan jalankan skill `vault-progress`.
