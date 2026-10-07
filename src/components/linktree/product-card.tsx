"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatRupiah } from "@/lib/products";

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

  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="group relative flex items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-4"
    >
      {/* Image */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:h-24 sm:w-24">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-1 top-1 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-bold leading-none text-brand-foreground shadow">
            -{discountPct}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
          {product.title}
        </h3>

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
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatRupiah(product.oldPrice)}
            </span>
          )}
        </div>

        {product.badge && (
          <div className="mt-2">
            <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Chevron */}
      <ChevronRight
        className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand sm:block"
        strokeWidth={2}
      />
    </motion.a>
  );
}
