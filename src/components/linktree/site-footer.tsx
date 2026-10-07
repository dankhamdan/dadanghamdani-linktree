"use client";

import * as React from "react";
import { Heart } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pt-10">
      <div className="flex flex-col items-center gap-3 border-t border-border/70 py-6 text-center">
        <nav
          aria-label="Tautan legal"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
        >
          <a
            href="/terms"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Syarat &amp; Ketentuan
          </a>
          <span className="hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <a
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Kebijakan Privasi
          </a>
        </nav>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          © {year} Nadya Zahira
          <span className="mx-1 hidden h-1 w-1 rounded-full bg-border sm:inline-block" />
          <span className="hidden items-center gap-1 sm:inline-flex">
            Dibuat dengan
            <Heart
              className="h-3 w-3 fill-brand text-brand"
              strokeWidth={2}
            />
            di Indonesia
          </span>
        </p>
      </div>
    </footer>
  );
}
