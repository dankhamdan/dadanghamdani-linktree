/**
 * Konfigurasi Midtrans.
 *
 * 1. Buat akun gratis di https://midtrans.com → pilih mode SANDBOX
 *    untuk testing. Setelah siap production, ganti mode ke "production".
 * 2. Ambil Server Key & Client Key dari:
 *    Settings → Access Keys
 * 3. Taruh nilai-nilai tersebut di file .env (jangan commit .env).
 */

export type MidtransEnv = "sandbox" | "production";

export const midtransConfig = {
  /** "sandbox" untuk testing, "production" untuk live */
  environment:
    (process.env.MIDTRANS_ENVIRONMENT as MidtransEnv) ?? "sandbox",

  /** Server Key — RAHASIA, hanya dipakai di backend */
  serverKey: process.env.MIDTRANS_SERVER_KEY ?? "",

  /** Client Key — boleh terekspos ke browser */
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? "",

  /** URL Snap.js — otomatis sesuai environment */
  get snapJsUrl() {
    return this.environment === "production"
      ? "https://app.midtrans.com/snap/snap.js"
      : "https://app.sandbox.midtrans.com/snap/snap.js";
  },

  /** Endpoint API Midtrans */
  get apiUrl() {
    return this.environment === "production"
      ? "https://api.midtrans.com"
      : "https://app.sandbox.midtrans.com";
  },

  /** Cek apakah konfigurasi sudah lengkap */
  get isConfigured() {
    return Boolean(this.serverKey && this.clientKey);
  },
};

/**
 * Snap.js client key attribute.
 * Snap.js butuh data-client-key di <script> tag.
 */
export const snapClientKeyAttr = midtransConfig.clientKey;

/**
 * Generate order ID unik.
 * Format: NZ-{productId}-{timestamp}-{random}
 */
export function generateOrderId(productId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NZ-${productId}-${ts}-${rand}`;
}
