"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook } from "lucide-react";
import type { SocialLink } from "@/lib/products";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 448 512"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3V349.4A162.6 162.6 0 1 1 185.2 186.9c8.1 0 16 1.1 23.7 2.9v68.2a94.7 94.7 0 1 0 66.3 90.1V0h64.1a122.3 122.3 0 0 0 108.6 105.3z"
      />
    </svg>
  );
}

function SocialIcon({ icon, className }: { icon: SocialLink["icon"]; className?: string }) {
  if (icon === "instagram") return <Instagram className={className} strokeWidth={2} />;
  if (icon === "youtube") return <Youtube className={className} strokeWidth={2} />;
  if (icon === "facebook") return <Facebook className={className} strokeWidth={2} />;
  return <TikTokIcon className={className} />;
}

export function SocialLinks({
  socials,
}: {
  socials: SocialLink[];
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Tautan media sosial"
      className="mt-5 flex items-center justify-center gap-3"
    >
      {socials.map((s) => (
        <motion.a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          title={s.label}
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:border-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          style={{
            // Use CSS variable so we can apply brand color on hover
            ["--social-brand" as string]: s.brand,
          }}
        >
          {/* color blob revealed on hover */}
          <span
            className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ backgroundColor: s.brand }}
            aria-hidden
          />
          <SocialIcon
            icon={s.icon}
            className="relative h-[18px] w-[18px] transition-colors"
          />
        </motion.a>
      ))}
    </motion.nav>
  );
}
