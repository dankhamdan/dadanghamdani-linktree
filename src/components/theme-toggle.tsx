"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/linktree/magnetic-button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current = mounted ? resolvedTheme ?? theme : "dark";
  const isDark = current === "dark";

  return (
    <MagneticButton strength={0.5}>
      <button
        type="button"
        aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inline-flex"
            >
              <Moon className="h-[18px] w-[18px]" strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute inline-flex"
            >
              <Sun className="h-[18px] w-[18px]" strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </MagneticButton>
  );
}
