# Setup Midtrans — Dadang Hamdani Linktree

Integrasi pembayaran Midtrans Snap sudah siap. Berikut cara mengaktifkannya.

## 1. Daftar Akun Midtrans (gratis)

1. Buka https://midtrans.com → **Sign Up**
2. Pilih tipe bisnis (Personal / Company)
3. Verifikasi email & nomor HP
4. Setelah login, masuk ke **Settings → Access Keys**
5. Anda akan melihat 2 pasang key:
   - **Sandbox** (untuk testing) — prefix `SB-Mid-`
   - **Production** (untuk live) — prefix `Mid-`

## 2. Set Environment Variables

Edit file `.env` di root project:

```bash
# Untuk TESTING (sandbox)
MIDTRANS_ENVIRONMENT=sandbox
MIDTRANS_SERVER_KEY=SB-Mid-server-GANTI_DENGAN_SERVER_KEY_ANDA
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=SB-Mid-client-GANTI_DENGAN_CLIENT_KEY_ANDA
NEXT_PUBLIC_SITE_URL=https://dadanghamdani.my.id
```

Setelah ganti key, restart dev server (Ctrl+C lalu `bun run dev`).

## 3. Test di Mode Sandbox

Midtrans menyediakan kartu & akun test di:
https://docs.midtrans.com/docs/testing-payment-methods

Contoh kartu kredit test:
- **Visa success**: `4811 1111 1111 1114`, exp `12/25`, CVV `123`
- **Visa deny**: `4911 1111 1111 1113`
- **Visa challenge**: `4511 1111 1111 1117`

VA / e-wallet / QRIS test juga tersedia di link di atas.

## 4. Set Webhook Notification (opsional, untuk auto-fulfillment)

Di dashboard Midtrans:
1. **Settings → Configuration → Payment Notification URL**
2. Isi: `https://dadanghamdani.my.id/api/midtrans/notification`
3. Save

Endpoint `/api/midtrans/notification` sudah dibuat dan akan:
- Verifikasi signature key dari Midtrans (SHA-512)
- Verifikasi ulang ke API Midtrans (defense in depth)
- Log status transaksi (success/pending/failed)

**TODO untuk Anda**: implementasi penyimpanan ke database (Prisma sudah siap di `prisma/schema.prisma`). Lihat komentar `TODO` di `src/app/api/midtrans/notification/route.ts`.

## 5. Pindah ke Production

Saat siap menerima pembayaran asli:

1. Di dashboard Midtrans: **Settings → Access Keys** → aktifkan Production key
2. Verifikasi dokumen (KTP, NPWP, rekening) — proses 1-3 hari kerja
3. Update `.env`:

```bash
MIDTRANS_ENVIRONMENT=production
MIDTRANS_SERVER_KEY=Mid-server-PRODUCTION_SERVER_KEY
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=Mid-client-PRODUCTION_CLIENT_KEY
```

4. Restart server. Snap.js otomatis load dari production URL.

## 6. Alur Pembayaran (Ringkasan Teknis)

```
User klik "Beli Sekarang"
        ↓
Frontend (useMidtrans hook)
        ↓
POST /api/midtrans/create-transaction
  { product_id: "1" }
        ↓
Backend buat Snap transaction
  via midtrans-client SDK
        ↓
Midtrans balikin { token, redirect_url }
        ↓
Frontend panggil window.snap.pay(token)
        ↓
Popup Midtrans terbuka
  (QRIS, VA BCA/BNI/BRI/Mandiri, GoPay,
   ShopeePay, kartu kredit, Indomaret, Alfamart, Akulaku)
        ↓
User bayar → callback onSuccess/onPending/onError
        ↓
Toast notification muncul di UI
        ↓
(asynchronously)
Midtrans → POST /api/midtrans/notification
  { transaction_status, order_id, signature_key }
        ↓
Backend verifikasi signature → update DB → trigger fulfillment
```

## 7. File Terkait

| File | Fungsi |
|------|--------|
| `src/lib/midtrans.ts` | Konfigurasi (env vars, helper) |
| `src/app/api/midtrans/create-transaction/route.ts` | Endpoint buat Snap transaction |
| `src/app/api/midtrans/notification/route.ts` | Webhook handler |
| `src/hooks/use-midtrans.ts` | Hook client-side untuk buka popup |
| `src/app/layout.tsx` | Load Snap.js script |
| `src/components/linktree/product-card.tsx` | Tombol Beli Sekarang → Midtrans |
| `.env` | Server key, client key, environment |

## 8. Metode Pembayaran yang Diaktifkan

Saat ini semua metode umum aktif (`enabled_payments` di API route):

- ✅ Kartu kredit (Visa, Mastercard, JCB)
- ✅ Virtual Account: BCA, BNI, BRI, Mandiri, Permata, lainnya
- ✅ E-wallet: GoPay, ShopeePay
- ✅ QRIS (semua bank & e-wallet)
- ✅ Convenience store: Indomaret, Alfamart
- ✅ Akulaku (BNPL)

Untuk menonaktifkan metode tertentu, edit array `enabled_payments` di
`src/app/api/midtrans/create-transaction/route.ts`.
