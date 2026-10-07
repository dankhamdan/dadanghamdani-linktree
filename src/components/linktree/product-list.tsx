"use client";

import * as React from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <section
      aria-label="Daftar produk"
      className="mt-6 flex flex-col gap-3"
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
