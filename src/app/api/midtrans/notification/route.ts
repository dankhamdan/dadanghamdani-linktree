import { NextRequest, NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { midtransConfig } from "@/lib/midtrans";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/midtrans/notification
 *
 * Webhook yang dipanggil Midtrans setiap kali status transaksi berubah
 * (pending → settlement, deny, expire, cancel, dll).
 *
 * TODO: simpan status transaksi ke database (Prisma) di sini.
 *   - Verifikasi signature_key dari Midtrans
 *   - Update record transaksi berdasarkan order_id
 *   - Trigger fulfillment (kirim ebook, license key, dll) jika settlement
 *
 * Set up URL ini di dashboard Midtrans:
 *   Settings → Configuration → Payment Notification URL
 *   https://dadanghamdani.my.id/api/midtrans/notification
 */
export async function POST(req: NextRequest) {
  if (!midtransConfig.isConfigured) {
    return NextResponse.json(
      { error: "midtrans_not_configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { status: 400 }
    );
  }

  const notification = body as {
    transaction_status?: string;
    order_id?: string;
    status_code?: string;
    gross_amount?: string;
    signature_key?: string;
    payment_type?: string;
    transaction_time?: string;
  };

  if (!notification.order_id) {
    return NextResponse.json(
      { error: "missing_order_id" },
      { status: 400 }
    );
  }

  // Verifikasi signature key (HMAC-SHA512)
  // signature = SHA512(order_id + status_code + gross_amount + server_key)
  const { order_id, status_code, gross_amount, signature_key } = notification;
  const crypto = await import("node:crypto");
  const expectedSignature = crypto
    .createHash("sha512")
    .update(`${order_id}${status_code}${gross_amount}${midtransConfig.serverKey}`)
    .digest("hex");

  if (signature_key !== expectedSignature) {
    console.warn("[midtrans] invalid signature_key for order:", order_id);
    return NextResponse.json(
      { error: "invalid_signature" },
      { status: 403 }
    );
  }

  // Verifikasi ulang ke API Midtrans (defense in depth)
  try {
    const snap = new Midtrans.Snap({
      isProduction: midtransConfig.environment === "production",
      serverKey: midtransConfig.serverKey,
      clientKey: midtransConfig.clientKey,
    });
    const status = await snap.transaction.notification(notification);
    const txStatus = status.transaction_status;
    const orderId = status.order_id;

    console.log(
      `[midtrans] notification verified — order: ${orderId}, status: ${txStatus}, payment_type: ${status.payment_type}`
    );

    // TODO: implement fulfillment
    // if (txStatus === "settlement" || txStatus === "capture") {
    //   await db.transaction.update({ where: { orderId }, data: { status: "paid" } });
    //   await sendDigitalProduct(orderId);
    // } else if (txStatus === "pending") {
    //   await db.transaction.update({ where: { orderId }, data: { status: "pending" } });
    // } else if (["deny", "cancel", "expire", "failure"].includes(txStatus)) {
    //   await db.transaction.update({ where: { orderId }, data: { status: "failed" } });
    // }
  } catch (err) {
    console.error("[midtrans] notification_verify_error:", err);
    return NextResponse.json(
      { error: "verification_failed" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
