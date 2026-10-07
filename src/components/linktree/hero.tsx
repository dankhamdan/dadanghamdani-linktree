"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PROFILE_NAME = "Nadya Zahira";
const PROFILE_BIO =
  "Edukasi seputar website, aplikasi, AI dan Blockchain";
const PROFILE_INITIALS = "NZ";

export function Hero() {
  return (
    <header className="relative">
      {/* Cover with animated gradient */}
      <div className="relative h-44 w-full overflow-hidden sm:h-56 md:h-64">
        <div className="cover-gradient absolute inset-0" aria-hidden />
        <div className="grain-overlay absolute inset-0" aria-hidden />
        {/* soft fade to background at the bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
      </div>

      {/* Avatar + name + bio */}
      <div className="relative z-10 -mt-14 flex flex-col items-center px-4 text-center sm:-mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* spinning gradient ring */}
          <div
            className="avatar-ring absolute -inset-1 rounded-full blur-[2px] opacity-80"
            aria-hidden
          />
          <div className="relative h-28 w-28 rounded-full border-4 border-background bg-card shadow-xl sm:h-32 sm:w-32">
            {/* Initials avatar — clean and on-brand */}
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand/15 via-card to-accent">
              <span className="select-none bg-gradient-to-br from-brand to-rose-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                {PROFILE_INITIALS}
              </span>
            </div>
            <span className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-brand text-brand-foreground shadow-md">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          {PROFILE_NAME}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base"
        >
          {PROFILE_BIO}
        </motion.p>
      </div>
    </header>
  );
}
