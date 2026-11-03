---
type: guide
status: active
updated: 2026-11-02
---

# Panduan: aktifkan virtualisasi dan Docker untuk Supabase lokal

Tujuan: Docker Desktop berjalan sehingga `supabase start` menyalakan database, Auth, dan realtime lokal. Ini membuka tugas [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]], T-011, T-012, T-013, lalu T-020 sampai T-022 di [[GO_LIVE_PLAN]].

## Diagnosis mesin ini (2026-11-02)

| Item                            | Nilai                                                                | Arti                                                                                    |
| ------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Perangkat                       | Lenovo, tipe 20R6S0L000, BIOS R15ET64W (1.45)                        | Kemungkinan ThinkPad seri L13 Yoga Gen 1 (tipe 20R5/20R6); cek label di bawah perangkat |
| CPU                             | Intel Core i5-10210U                                                 | Mendukung VT-x                                                                          |
| OS                              | Windows 11 Pro Education                                             | Mendukung WSL2 dan Hyper-V                                                              |
| RAM / disk kosong               | 15,7 GB / sekitar 98 GB                                              | Cukup untuk stack Supabase                                                              |
| `VirtualizationFirmwareEnabled` | **False**                                                            | **Penyebab utama:** virtualisasi dimatikan di BIOS                                      |
| Hypervisor aktif                | False                                                                | Akibat di atas                                                                          |
| Docker Desktop                  | Terpasang, engine tidak start (error 500 pada pipe)                  | Bergantung pada virtualisasi                                                            |
| WSL                             | Belum ada distribusi; fitur Windows belum bisa diperiksa tanpa admin | Perlu diaktifkan                                                                        |

## Langkah 1 — Aktifkan virtualisasi di BIOS (perlu Anda, sekitar 5 menit)

1. Simpan pekerjaan lalu **restart** komputer.
2. Saat logo Lenovo muncul, tekan **F1** berulang kali (atau tekan `Enter` lalu pilih `F1: BIOS Setup`).
3. Buka tab **Security** → **Virtualization**.
4. Ubah **Intel Virtualization Technology** menjadi **Enabled**. Jika ada **Intel VT-d Feature**, ubah juga menjadi **Enabled**.
5. Tekan **F10** → **Yes** untuk menyimpan dan keluar.

Jika menu terkunci atau BIOS meminta *Supervisor Password*, komputer ini kemungkinan dikelola institusi atau IT; minta bantuan admin. Jangan mencoba mereset BIOS dengan cara lain.

Verifikasi setelah Windows menyala (PowerShell biasa):

```powershell
(Get-CimInstance Win32_Processor).VirtualizationFirmwareEnabled
```

Hasil harus `True`. Alternatif: Task Manager → Performance → CPU → **Virtualization: Enabled**.

## Langkah 2 — Aktifkan fitur Windows dan WSL (PowerShell sebagai Administrator)

Klik kanan Start → **Terminal (Admin)**, lalu jalankan satu per satu:

```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

```powershell
wsl --install --no-distribution
```

```powershell
wsl --update
```

**Restart** komputer. Jika perintah ditolak atau fitur tidak tersedia, kemungkinan ada kebijakan institusi; catat pesan galatnya.

## Langkah 3 — Jalankan Docker Desktop

1. Buka **Docker Desktop**, terima syarat penggunaan jika diminta, dan pastikan **Use the WSL 2 based engine** aktif (Settings → General). Tunggu sampai status **Engine running**.
2. Uji di terminal:

```powershell
docker run --rm hello-world
```

Pesan "Hello from Docker!" berarti berhasil.

Opsional, batasi memori WSL agar mesin tetap lancar: buat `%USERPROFILE%\.wslconfig` berisi

```ini
[wsl2]
memory=6GB
processors=4
```

lalu `wsl --shutdown` dan buka Docker Desktop lagi.

## Langkah 4 — Jalankan Supabase lokal (bisa dikerjakan agent setelah Docker hidup)

Dari `apps/platform` (di PowerShell yang memblokir skrip, pakai `npx.cmd`):

```powershell
npx.cmd supabase start
```

Unduhan pertama beberapa GB dan memakan beberapa menit. Setelah selesai:
- Studio: `http://127.0.0.1:54323`, API: `http://127.0.0.1:54321`.
- Kode OTP email dibaca di Inbucket: `http://127.0.0.1:54324`.
- `npx.cmd supabase status` menampilkan URL dan anon key untuk `.env.local` (kosongkan `VITE_LOCAL_MOCK`).

Setelah itu tugas T-011 sampai T-013 dikerjakan (migration, koneksi, seed), lalu login OTP nyata diuji di T-020.

## Setelah selesai

Kabari bahwa Langkah 1 sampai 3 berhasil. Status dicatat di [[tasks/T-010-aktifkan-docker-engine-di-windows|T-010]] dan snapshot [[PROGRESS_SNAPSHOT]] diperbarui. Pratinjau tanpa Docker tetap tersedia lewat [[LOCAL_PREVIEW]].
