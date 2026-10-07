import { NextRequest, NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import { midtransConfig, generateOrderId } from "@/lib/midtrans";
import { products } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CreateTransactionBody = {
  product_id?: string;
  customer?: {
    first_name?: string;
    email?: string;
    phone?: string;
  };
};

/**
 * POST /api/midtrans/create-transaction
 *
 * Body: { product_id: string, customer?: {...} }
 * Response: { token: string, redirect_url: string, order_id: string }
 *
 * Membuat Snap transaction untuk produk tertentu dan
 * mengembalikan token yang dipakai frontend untuk membuka popup Snap.js.
 */
export async function POST(req: NextRequest) {
  // 1. Validasi konfigurasi
  if (!midtransConfig.isConfigured) {
    return NextResponse.json(
      {
        error: "midtrans_not_configured",
        message:
          "MIDTRANS_SERVER_KEY dan NEXT_PUBLIC_MIDTRANS_CLIENT_KEY belum diset di .env. Lihat README atau src/lib/midtrans.ts.",
      },
      { status: 503 }
    );
  }

  // 2. Parse body
  let body: CreateTransactionBody;
  try {
    body = (await req.json()) as CreateTransactionBody;
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Body bukan JSON valid." },
      { status: 400 }
    );
  }

  const { product_id, customer } = body;
  if (!product_id) {
    return NextResponse.json(
      { error: "missing_product_id", message: "Field product_id wajib diisi." },
      { status: 400 }
    );
  }

  // 3. Cari produk
  const product = products.find((p) => p.id === product_id);
  if (!product) {
    return NextResponse.json(
      { error: "product_not_found", message: `Produk id=${product_id} tidak ditemukan.` },
      { status: 404 }
    );
  }

  // 4. Validasi harga
  if (product.price === null) {
    return NextResponse.json(
      {
        error: "free_product",
        message:
          "Produk gratis tidak butuh transaksi Midtrans. Arahkan ke paymentUrl untuk klaim langsung.",
      },
      { status: 400 }
    );
  }

  // 5. Buat Snap instance
  const snap = new Midtrans.Snap({
    isProduction: midtransConfig.environment === "production",
    serverKey: midtransConfig.serverKey,
    clientKey: midtransConfig.clientKey,
  });

  const orderId = generateOrderId(product.id);
  const grossAmount = product.price;

  // 6. Bangun parameter transaksi
  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },
    item_details: [
      {
        id: product.id,
        name: product.title.slice(0, 50), // Midtrans batas 50 char
        price: grossAmount,
        quantity: 1,
        brand: "Nadya Zahira",
        category: "Digital Product",
        merchant_name: "Nadya Zahira",
      },
    ],
    customer_details: {
      first_name: customer?.first_name || "Pelanggan",
      email: customer?.email || "pelanggan@example.com",
      phone: customer?.phone || "081234567890",
    },
    credit_card: {
      secure: true,
    },
    // Aktifkan semua metode pembayaran yang umum dipakai di Indonesia
    enabled_payments: [
      "credit_card",
      "bca_va",
      "bni_va",
      "bri_va",
      "mandiri_va",
      "permata_va",
      "other_va",
      "gopay",
      "shopeepay",
      "qris",
      "indomaret",
      "alfamart",
      "akulaku",
    ],
    callbacks: {
      finish: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nadyazahira.my.id"}/payment/finish?order_id=${orderId}`,
      error: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nadyazahira.my.id"}/payment/error?order_id=${orderId}`,
      pending: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://nadyazahira.my.id"}/payment/pending?order_id=${orderId}`,
    },
  };

  // 7. Buat transaksi
  try {
    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      order_id: orderId,
      gross_amount: grossAmount,
      environment: midtransConfig.environment,
    });
  } catch (err) {
    console.error("[midtrans] create_transaction_error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        error: "midtrans_api_error",
        message,
      },
      { status: 502 }
    );
  }
}
