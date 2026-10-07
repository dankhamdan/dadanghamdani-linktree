"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-auto pt-10"
    >
      <div className="flex flex-col items-center gap-3 border-t border-border/70 py-6 text-center">
        <nav
          aria-label="Tautan legal"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
        >
          <motion.a
            href="/terms"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Syarat &amp; Ketentuan
          </motion.a>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <motion.a
            href="/privacy"
            whileHover={{ y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Kebijakan Privasi
          </motion.a>
        </nav>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          © {year} Nadya Zahira
          <span className="mx-1 hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span className="hidden items-center gap-1 sm:inline-flex">
            Dibuat dengan
            <motion.span
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <Heart
                className="h-3 w-3 fill-brand text-brand"
                strokeWidth={2}
              />
            </motion.span>
            di Indonesia
          </span>
        </p>
      </div>
    </motion.footer>
  );
}
