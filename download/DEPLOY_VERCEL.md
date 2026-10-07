# Deploy ke Vercel — Nadya Zahira Linktree

Project sudah 100% siap deploy. Build verified ✓, lint clean ✓, semua config sudah disiapkan.

## Quick Start (3 menit)

### Opsi A: Via Vercel Dashboard (paling mudah)

1. **Push code ke GitHub** (lihat langkah A di bawah)
2. Buka https://vercel.com/new
3. Import repo GitHub-nya
4. Vercel auto-detect Next.js — klik **Deploy**
5. Set env vars (lihat langkah C)
6. Tunggu 1-2 menit → selesai!

### Opsi B: Via Vercel CLI

```bash
# Install Vercel CLI (kalau belum)
npm i -g vercel

# Login
vercel login

# Deploy dari folder project
cd /home/z/my-project
vercel

# Ikuti prompt:
# ? Set up and deploy "~/my-project"? [Y/n] y
# ? Which scope do you want to deploy to? → pilih akunmu
# ? Link to existing project? [y/N] n
# ? What's your project's name? → nadyazahira-linktree
# ? In which directory is your code located? → ./
# Vercel will detect Next.js automatically

# Set env vars (interaktif)
vercel env add MIDTRANS_ENVIRONMENT
vercel env add MIDTRANS_SERVER_KEY
vercel env add NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
vercel env add NEXT_PUBLIC_SITE_URL

# Deploy ke production
vercel --prod
```

---

## Langkah A: Push ke GitHub

```bash
# Init repo (kalau belum)
cd /home/z/my-project
git init
git add .
git commit -m "Initial commit — Nadya Zahira linktree"

# Buat repo baru di https://github.com/new (jangan centang README)
# Lalu push:
git remote add origin https://github.com/USERNAME/nadyazahira-linktree.git
git branch -M main
git push -u origin main
```

## Langkah B: Connect ke Vercel

1. Buka https://vercel.com/new
2. Pilih repo `nadyazahira-linktree`
3. Vercel auto-detect:
   - **Framework**: Next.js
   - **Build Command**: `next build` (sudah di vercel.json)
   - **Install Command**: `bun install` (sudah di vercel.json)
   - **Region**: Singapore (sin1) — terdekat dengan Indonesia
4. Klik **Deploy** → tunggu 1-2 menit

## Langkah C: Set Environment Variables

Di Vercel dashboard → project → **Settings → Environment Variables**, tambahkan:

| Key | Value | Environment |
|-----|-------|-------------|
| `MIDTRANS_ENVIRONMENT` | `sandbox` atau `production` | Production + Preview |
| `MIDTRANS_SERVER_KEY` | `SB-Mid-server-...` atau `Mid-server-...` | Production + Preview |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | `SB-Mid-client-...` atau `Mid-client-...` | Production + Preview + Development |
| `NEXT_PUBLIC_SITE_URL` | `https://nadyazahira.my.id` | Production + Preview |

⚠️ **Penting**: `NEXT_PUBLIC_*` harus diset di semua environment (Production, Preview, Development) karena dipakai di client-side.

Setelah set env vars → **Redeploy** dari tab Deployments.

## Langkah D: Hubungkan Domain nadyazahira.my.id

1. Vercel dashboard → project → **Settings → Domains**
2. Add domain → `nadyazahira.my.id`
3. Add juga `www.nadyazahira.my.id` (redirect ke root)
4. Vercel kasih instruksi DNS — set nameserver atau A record / CNAME di registrar domain (Niagahoster, Namecheap, dll):

   **Option 1: Nameserver (recommended)**
   - Set nameserver domain ke Vercel:
     - `ns1.vercel-dns.com`
     - `ns2.vercel-dns.com`

   **Option 2: A Record + CNAME**
   - `@` → A record → `76.76.21.21`
   - `www` → CNAME → `cname.vercel-dns.com`

5. Tunggu DNS propagate (5 menit - 24 jam)
6. Vercel auto-issue SSL certificate (Let's Encrypt) — gratis

## Langkah E: Test Setelah Deploy

1. Buka `https://nadyazahira.my.id` — halaman linktree harus tampil
2. Coba klik **Beli Sekarang** di salah satu produk
3. Kalau Midtrans key sudah diisi → popup Snap terbuka
4. Kalau muncul error "Gagal memulai pembayaran" → cek:
   - Env vars sudah diset di Vercel? (Settings → Environment Variables)
   - Sudah redeploy setelah set env vars?
   - Server Key & Client Key benar? (sandbox vs production match)

## Langkah F: Setup Webhook Midtrans (opsional, untuk auto-fulfillment)

Setelah domain live:

1. Login ke dashboard Midtrans
2. **Settings → Configuration → Payment Notification URL**
3. Isi: `https://nadyazahira.my.id/api/midtrans/notification`
4. Save

---

## File Config yang Sudah Disiapkan

| File | Fungsi |
|------|--------|
| `vercel.json` | Region Singapore, cache header, security headers |
| `next.config.ts` | Hapus standalone output (Vercel handle sendiri), strict mode on |
| `tsconfig.json` | Exclude examples/tests/skills/scripts dari build |
| `.gitignore` | Ignore .env*, .next/, node_modules, dll. Allow .env.example |
| `.env.example` | Template env vars (committed, tanpa nilai rahasia) |
| `package.json` | Build command `next build`, postinstall `prisma generate` |
| `public/banner.png` | Foto banner (245KB, sudah di public/) |
| `public/robots.txt` | SEO + sitemap reference |

## Catatan Penting

### Prisma / Database
Project ini pakai Prisma + SQLite untuk scaffold, tapi **tidak dipakai di route manapun** saat ini. Build Vercel akan berhasil tanpa masalah.

Kalau nanti mau pakai database (misal untuk simpan transaksi Midtrans di webhook notification), ganti SQLite ke:
- **Vercel Postgres** (built-in, free tier) — recommended
- **Neon** (Postgres serverless, free tier)
- **Supabase** (Postgres + auth + storage, free tier)

Lalu update `DATABASE_URL` di Vercel env vars dan `prisma/schema.prisma` provider ke `postgresql`.

### Region
Vercel region di-set ke **Singapore (sin1)** — terdekat dengan Indonesia, latency rendah untuk user di Jakarta/Indonesia.

### Custom Domain SSL
Vercel otomatis issue SSL certificate gratis (Let's Encrypt) untuk custom domain. Tidak perlu setup manual.

### Auto-Deploy
Setiap push ke `main` branch GitHub → Vercel auto-deploy ke production.
Setiap pull request → Vercel auto-deploy preview deployment (URL sementara untuk test).

---

## Troubleshooting

### Build gagal di Vercel
- Cek **Functions logs** di Vercel dashboard → Deployments → klik deployment yang gagal
- Biasanya karena env vars belum diset atau TypeScript error
- Build lokal sudah verified ✓ — kalau fail di Vercel, kemungkinan env vars

### Midtrans popup tidak muncul
- Cek console browser (F12) → ada error?
- Pastikan `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` diset di Vercel (bukan cuma `MIDTRANS_SERVER_KEY`)
- Pastikan domain `nadyazahira.my.id` sudah masuk whitelist Midtrans kalau ada (Settings → Snap Preference)

### Domain tidak bisa diakses
- Cek DNS propagation: https://dnschecker.org/#A,nadyazahira.my.id
- Harus resolve ke `76.76.21.21`
- Tunggu hingga 24 jam kalau baru set DNS

### 404 di /terms atau /privacy
- Halaman `/terms` dan `/privacy` belum dibuat (hanya link di footer)
- Tidak blocker untuk deploy — buat halaman ini nanti kalau perlu

---

## Verifikasi Sebelum Deploy

✅ Build lokal berhasil (`next build`)
✅ Lint clean (`eslint .`)
✅ Semua file ada di `public/` (banner.png, robots.txt)
✅ `.env.example` sudah dibuat
✅ `vercel.json` sudah dikonfigurasi
✅ `tsconfig.json` exclude folder non-project
✅ `package.json` build command benar
✅ Prisma postinstall hook ditambahkan

**Project siap deploy! 🚀**
