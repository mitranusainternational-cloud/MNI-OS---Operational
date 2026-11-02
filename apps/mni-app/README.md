# MNI Gudang & Logistik

Sistem manajemen produksi, gudang, dan logistik berbasis web.

**Stack:** Vanilla JS + Supabase (PostgreSQL + Realtime + Auth) + Vite + Vercel/VPS

---

## 🚀 Quick Start (Local Dev)

### 1. Prasyarat

- Node.js 18+
- [Supabase CLI](https://supabase.com/docs/guides/cli) (opsional, untuk local Supabase)
- Akun [Supabase](https://supabase.com) (gratis OK untuk dev)
- File `mni-gudang.html` (app asli, taruh di folder parent: `../mni-gudang.html`)

### 2. Clone & Install

```bash
git clone https://github.com/YOUR_ORG/mni-gudang.git
cd mni-gudang
npm install
```

### 3. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` dan isi dengan Supabase keys kamu:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Keys ada di: **Supabase Dashboard → Project Settings → API**

### 4. Extract App dari HTML Original

Script ini mengambil JS dan CSS dari `mni-gudang.html` dan menaruhnya di `public/`:

```bash
# Default: mencari ../mni-gudang.html
npm run extract

# Atau dengan path custom:
node scripts/extract-app.js --input /path/to/mni-gudang.html
```

### 5. Setup Database Supabase

**Opsi A: Supabase Cloud (Recommended untuk dev awal)**

```bash
# Login ke Supabase CLI
npx supabase login

# Link ke project cloud kamu
npx supabase link --project-ref YOUR_PROJECT_ID

# Push schema ke cloud
npx supabase db push
```

**Opsi B: Local Supabase (Docker)**

```bash
# Start local Supabase (butuh Docker)
npm run db:start

# Lihat URL dan keys untuk .env.local
npm run db:status
```

### 6. Jalankan Dev Server

```bash
npm run dev
```

Buka http://localhost:5173

---

## 🗄️ Database Schema

20 tables PostgreSQL, lihat `supabase/migrations/` untuk detail lengkap.

Table utama:
| Table | Fungsi |
|-------|--------|
| `mwc` | Master Work Center |
| `muser` | User & roles |
| `rm` | Stok Raw Material |
| `fg` | Stok Finished Goods |
| `spk` | Surat Perintah Kerja |
| `vendor` | Vendor/Subcon orders |
| `kirim` | Pengiriman |
| `bongkar` | Penerimaan/bongkar |
| `mutasi` | Mutasi stok |
| `master` | Key-value store (counters, settings) |

**Roles:** `admin` > `manager` > `produksi` / `gudang` > `viewer`

---

## 🔑 Cara Tambah User

Supabase menggunakan OTP email untuk login. User harus terdaftar di tabel `muser`.

```sql
-- Di Supabase SQL Editor:
INSERT INTO muser (nama, email, role, aktif)
VALUES ('Nama User', 'email@company.com', 'manager', true);
```

Roles yang tersedia: `admin`, `manager`, `produksi`, `gudang`, `viewer`

---

## 🌐 Deploy ke Vercel (Cloud)

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial setup"
git push origin main
```

### 2. Import di Vercel

1. Buka [vercel.com/new](https://vercel.com/new)
2. Import repository GitHub kamu
3. **Framework Preset:** Vite
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`

### 3. Set Environment Variables di Vercel

Di **Vercel Dashboard → Project → Settings → Environment Variables**, tambahkan:

```
VITE_SUPABASE_URL     = https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGci...
```

### 4. Pastikan extract sebelum build

Tambahkan ke build command:

```
node scripts/extract-app.js && vite build
```

Atau di `vercel.json` (sudah ada):
```json
{
  "buildCommand": "node scripts/extract-app.js && vite build"
}
```

---

## 🖥️ Deploy ke VPS (Production)

### Prasyarat VPS
- Ubuntu 22.04 / 24.04
- Docker + Docker Compose
- Domain (opsional, bisa pakai IP)

### 1. Setup VPS

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker

# Clone repo
git clone https://github.com/YOUR_ORG/mni-gudang.git /opt/mni-gudang
cd /opt/mni-gudang
```

### 2. Setup Environment VPS

```bash
cp .env.vps.example .env
nano .env  # Isi semua nilai dengan benar!
```

**Generate secrets:**

```bash
# PostgreSQL password (32+ chars)
openssl rand -base64 32

# JWT Secret (40+ chars)
openssl rand -base64 40

# Secret Key Base (64 chars)
openssl rand -base64 64
```

**Generate Supabase API Keys:**
- Ikuti: https://supabase.com/docs/guides/self-hosting#api-keys
- Atau pakai: `npx supabase gen keys`

### 3. Build Frontend

```bash
# Di mesin lokal atau CI, build dulu:
node scripts/extract-app.js
npm run build

# Copy dist ke VPS:
scp -r dist/ user@your-vps:/opt/mni-gudang/dist/
```

### 4. Jalankan Stack

```bash
cd /opt/mni-gudang
docker compose up -d

# Cek status
docker compose ps
docker compose logs -f
```

### 5. Inisialisasi Database

Setelah container database running:

```bash
# Wait ~30 detik untuk PostgreSQL siap
docker compose logs supabase-db | tail -5

# Database sudah auto-init dari migrations/ folder
# Cek schema sudah ada:
docker compose exec supabase-db psql -U postgres -c "\dt"
```

### 6. Setup HTTPS (Nginx + Certbot)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate cert (ganti dengan domain kamu)
sudo certbot --nginx -d your-domain.com

# Update nginx/nginx.conf untuk SSL
# (lihat nginx/nginx.conf untuk referensi)
```

---

## 🔄 Migrasi Data dari Firestore

Kalau punya data existing di Firestore:

### 1. Export Firestore

```bash
# Via Firebase Console:
# Firestore Database → Import/Export → Export

# Atau via CLI:
firebase firestore:export ./firestore-export --format json
```

### 2. Jalankan Migration Script

```bash
# Set env vars
export SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
export SUPABASE_SERVICE_KEY=eyJhbGci...  # SERVICE ROLE key, bukan anon!

# Jalankan
node scripts/migrate-firestore.js --input ./firestore-export.json
```

Migration script:
- Map Firestore doc ID → UUID (deterministik, bisa re-run)
- Map camelCase fields → snake_case
- Handle JSONB fields (items, prodLog, dll)
- Batch insert 100 rows at a time
- Idempotent: aman dijalankan ulang

---

## 📁 Struktur Project

```
mni-gudang/
├── index.html              # Entry point (loads adapter + app)
├── public/
│   ├── app.js              # Extracted dari mni-gudang.html (gitignored/generated)
│   ├── app.css             # Extracted CSS
│   └── favicon.svg
├── src/
│   └── lib/
│       ├── claude-adapter.js   # ⭐ Intercepts window.claude.use('db') → Supabase
│       ├── supabase.js         # Supabase client + data layer
│       └── db-adapter.js       # Direct DB adapter
├── supabase/
│   ├── config.toml             # Supabase CLI config
│   ├── migrations/
│   │   ├── 20240101000001_init_schema.sql   # Schema + tables
│   │   └── 20240101000002_rls_policies.sql  # Row Level Security
│   └── seed/
│       └── seed.sql            # Default data (app settings, WC masters)
├── scripts/
│   ├── extract-app.js      # Extract app.js dari mni-gudang.html
│   └── migrate-firestore.js # Migrasi data Firestore → Supabase
├── nginx/
│   └── nginx.conf          # Nginx config untuk VPS
├── docker-compose.yml      # Self-hosted Supabase stack
├── vite.config.js
├── vercel.json
├── .env.example            # Template env untuk cloud/local
└── .env.vps.example        # Template env untuk VPS
```

---

## 🔧 Cara Kerja Adapter

App original (`mni-gudang.html`) menggunakan `window.claude.use('db')` dari platform claude.ai.

Di local dev, kita inject `claude-adapter.js` **sebelum** app load:

```html
<!-- index.html -->
<script type="module" src="/src/lib/claude-adapter.js"></script>
<!-- adapter set window.claude = CLAUDE_SHIM -->
<script src="/app.js" defer></script>
<!-- app.js calls window.claude.use('db') → gets Supabase adapter -->
```

Adapter meng-emulasi Firestore API:
- `DB.collection(col).add(data)` → Supabase INSERT
- `DB.collection(col).onSnapshot(cb)` → Supabase Realtime
- `DB.doc(path).get/set/update/delete` → Supabase CRUD
- `DB.doc(path).acquire(opts)` → Optimistic lock via `master` table

**Zero perubahan** pada business logic di `mni-gudang.html`. ✅

---

## 🛠️ Troubleshooting

**App blank / tidak muncul?**
```bash
# Pastikan extract sudah dijalankan
ls public/app.js  # harus ada
```

**Error "SUPABASE_URL not set"?**
```bash
# Cek .env.local
cat .env.local
# Pastikan tidak ada spasi/quote ekstra
```

**Realtime tidak bekerja?**
- Cek Supabase Dashboard → Realtime → Status
- Pastikan tabel sudah di-enable di `ALTER PUBLICATION`

**Login OTP tidak masuk?**
- Local dev: buka http://localhost:54324 (Inbucket mail catcher)
- Production: cek SMTP settings di Supabase Dashboard → Auth → SMTP

**RLS error / Permission denied?**
```sql
-- Cek apakah user ada di muser
SELECT * FROM muser WHERE email = 'your@email.com';

-- Pastikan aktif = true
UPDATE muser SET aktif = true WHERE email = 'your@email.com';
```

---

## 📞 Support

Untuk pertanyaan, buka issue di GitHub repository ini.
