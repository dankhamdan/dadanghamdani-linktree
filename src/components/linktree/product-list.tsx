"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.28 },
        },
      }}
      aria-label="Daftar produk"
      className="mt-6 flex flex-col gap-3"
    >
      {products.map((p) => (
        <motion.div
          key={p.id}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.section>
  );
}
