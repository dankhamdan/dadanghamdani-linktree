"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, ArrowRight, Lock, Loader2 } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatRupiah } from "@/lib/products";
import { useMidtrans } from "@/hooks/use-midtrans";

function calcDiscount(oldPrice: number, price: number): number {
  if (oldPrice <= 0 || price <= 0 || price >= oldPrice) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export function ProductCard({ product }: { product: Product }) {
  const isFree = product.price === null;
  const hasDiscount =
    product.oldPrice && product.price !== null && product.oldPrice > product.price;
  const discountPct = hasDiscount
    ? calcDiscount(product.oldPrice!, product.price!)
    : 0;

  const { pay, loading } = useMidtrans();

  const ctaLabel = isFree ? "Klaim Gratis" : "Beli Sekarang";

  const handleBuy = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Produk gratis → lewati ke paymentUrl langsung
      if (isFree) return;
      // Produk berbayar → buka Midtrans Snap popup
      e.preventDefault();
      if (loading) return;
      pay({ productId: product.id });
    },
    [isFree, loading, pay, product.id]
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md sm:p-4"
    >
      {/* Hover gradient ring on the left edge */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-brand via-rose-400 to-violet-500 transition-transform duration-300 group-hover:scale-y-100"
        aria-hidden
      />

      <div className="flex items-start gap-4">
        {/* Image */}
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Lihat detail ${product.title}`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:h-24 sm:w-24 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {hasDiscount && (
            <span className="absolute left-1 top-1 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-bold leading-none text-brand-foreground shadow">
              -{discountPct}%
            </span>
          )}
        </a>

        {/* Info + CTA */}
        <div className="flex min-w-0 flex-1 flex-col">
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand sm:text-[15px]">
              {product.title}
            </h3>
          </a>

          <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className={
                isFree
                  ? "text-sm font-bold text-brand sm:text-base"
                  : "text-sm font-bold text-foreground sm:text-base"
              }
            >
              {formatRupiah(product.price)}
            </span>
            {hasDiscount && product.oldPrice != null && (
              <span className="text-xs text-muted-foreground line-through">
                {formatRupiah(product.oldPrice)}
              </span>
            )}
            {product.badge && (
              <span className="ml-auto inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                {product.badge}
              </span>
            )}
          </div>

          {/* Action row */}
          <div className="mt-2.5 flex items-center gap-2">
            <motion.a
              href={isFree ? product.paymentUrl : "#"}
              onClick={handleBuy}
              target={isFree ? "_blank" : undefined}
              rel={isFree ? "noopener noreferrer" : undefined}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-disabled={loading}
              aria-label={`${ctaLabel} ${product.title}`}
              className="glow-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:text-[13px]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.4} />
                  Memuat...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {ctaLabel}
                </>
              )}
            </motion.a>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lihat detail"
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Detail
              <ArrowRight
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={2.2}
              />
            </a>
          </div>

          {/* Trust line — payment security cue */}
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted-foreground/80">
            <Lock className="h-2.5 w-2.5" strokeWidth={2.4} />
            {isFree
              ? "Produk gratis · Langsung diunduh"
              : "Pembayaran aman via Midtrans · QRIS, VA, e-wallet, kartu"}
          </p>
        </div>

        {/* Chevron — purely decorative now */}
        <ChevronRight
          className="hidden h-5 w-5 shrink-0 self-center text-muted-foreground transition-all duration-200 group-hover:translate-x-0 group-hover:text-brand sm:block"
          strokeWidth={2}
        />
      </div>
    </motion.article>
  );
}
