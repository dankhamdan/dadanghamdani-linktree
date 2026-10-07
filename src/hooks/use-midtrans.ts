"use client";

import * as React from "react";
import { toast } from "@/hooks/use-toast";

type SnapResult = {
  token: string;
  redirect_url: string;
  order_id: string;
  gross_amount: number;
  environment: string;
};

type SnapErrorResponse = {
  error: string;
  message: string;
};

// Midtrans Snap callbacks
type SnapCallback = {
  onSuccess?: (result: { order_id?: string; status_code?: string }) => void;
  onPending?: (result: { order_id?: string; status_code?: string }) => void;
  onError?: (result: { order_id?: string; status_code?: string }) => void;
  onClose?: () => void;
};

type CreateTransactionArgs = {
  productId: string;
  customer?: {
    first_name?: string;
    email?: string;
    phone?: string;
  };
};

/**
 * Hook untuk membuka popup pembayaran Midtrans Snap.
 *
 * Alur:
 * 1. Klik "Beli Sekarang"
 * 2. Hook POST ke /api/midtrans/create-transaction dengan product_id
 * 3. Backend buat Snap transaction, balikin token
 * 4. Hook panggil window.snap.pay(token, callbacks)
 * 5. Popup Midtrans terbuka dengan semua metode pembayaran
 * 6. User bayar → onSuccess/onPending/onError terpanggil
 */
export function useMidtrans() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Cek apakah Snap.js sudah dimuat
  const snapReady = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as Window & { snap?: unknown }).snap);
  }, []);

  const pay = React.useCallback(
    async (
      args: CreateTransactionArgs,
      callbacks: SnapCallback = {}
    ): Promise<void> => {
      setError(null);
      setLoading(true);

      try {
        // 1. Buat transaksi di backend
        const res = await fetch("/api/midtrans/create-transaction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: args.productId,
            customer: args.customer,
          }),
        });

        const data = (await res.json()) as SnapResult | SnapErrorResponse;

        if (!res.ok || !("token" in data)) {
          const err = (data as SnapErrorResponse)?.message || "Gagal membuat transaksi";
          setError(err);
          toast({
            title: "Gagal memulai pembayaran",
            description: err,
            variant: "destructive",
          });
          return;
        }

        // 2. Cek Snap.js
        if (!snapReady()) {
          // Fallback: redirect ke Snap URL kalau Snap.js belum load
          window.open(data.redirect_url, "_blank");
          return;
        }

        // 3. Buka popup Snap
        const snap = (window as Window & {
          snap?: {
            pay: (
              token: string,
              callbacks?: SnapCallback
            ) => void;
          };
        }).snap!;

        snap.pay(data.token, {
          onSuccess: (r) => {
            toast({
              title: "Pembayaran berhasil",
              description: `Order ${r.order_id ?? ""} — terima kasih!`,
            });
            callbacks.onSuccess?.(r);
          },
          onPending: (r) => {
            toast({
              title: "Menunggu pembayaran",
              description: `Selesaikan pembayaran untuk order ${r.order_id ?? ""}.`,
            });
            callbacks.onPending?.(r);
          },
          onError: (r) => {
            toast({
              title: "Pembayaran gagal",
              description: `Order ${r.order_id ?? ""} gagal diproses.`,
              variant: "destructive",
            });
            callbacks.onError?.(r);
          },
          onClose: () => {
            // User tutup popup tanpa bayar
            callbacks.onClose?.();
          },
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Network error";
        setError(msg);
        toast({
          title: "Gagal memulai pembayaran",
          description: msg,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [snapReady]
  );

  return { pay, loading, error };
}
