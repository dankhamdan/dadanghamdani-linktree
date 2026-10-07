"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const PROFILE_NAME = "Dadang Hamdani";
const PROFILE_BIO =
  "Edukasi seputar website, aplikasi, AI dan Blockchain";
const PROFILE_INITIALS = "DH";
const BANNER_IMAGE = "/banner.png";

export function Hero() {
  // Parallax: cover image follows pointer subtly
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });

  // Image transforms: bigger range so the parallax is visible
  const imgX = useTransform(sx, [-0.5, 0.5], ["-3%", "3%"]);
  const imgY = useTransform(sy, [-0.5, 0.5], ["-3%", "3%"]);
  // Overlay moves slightly less for depth
  const ovX = useTransform(sx, [-0.5, 0.5], ["2%", "-2%"]);
  const ovY = useTransform(sy, [-0.5, 0.5], ["2%", "-2%"]);

  const handleMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(px);
      my.set(py);
    },
    [mx, my]
  );

  const handleLeave = React.useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <header className="relative">
      {/* Cover with banner image + parallax + zoom on hover */}
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="group relative h-56 w-full overflow-hidden sm:h-72 md:h-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Banner photo */}
        <motion.img
          src={BANNER_IMAGE}
          alt="Banner Dadang Hamdani"
          style={{ x: imgX, y: imgY }}
          className="absolute inset-0 h-[112%] w-[112%] -translate-x-[5.35%] -translate-y-[5.35%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          draggable={false}
        />
        {/* Gradient overlay for legibility + depth */}
        <motion.div
          style={{ x: ovX, y: ovY }}
          className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
          aria-hidden
        />
        <motion.div
          style={{ x: ovX, y: ovY }}
          className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-violet-500/15 mix-blend-overlay"
          aria-hidden
        />
        {/* Subtle grain */}
        <div className="grain-overlay absolute inset-0" aria-hidden />

        {/* Floating ambient blobs that drift independently */}
        <motion.span
          className="pointer-events-none absolute -left-6 top-6 h-20 w-20 rounded-full bg-brand/30 blur-2xl"
          animate={{ y: [0, 12, 0], x: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <motion.span
          className="pointer-events-none absolute right-8 top-10 h-16 w-16 rounded-full bg-violet-500/30 blur-2xl"
          animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          aria-hidden
        />
      </motion.div>

      {/* Avatar + name + bio */}
      <div className="relative z-10 -mt-16 flex flex-col items-center px-4 text-center sm:-mt-20">
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
            {/* Initials avatar */}
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand/15 via-card to-accent">
              <span className="select-none bg-gradient-to-br from-brand to-rose-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
                {PROFILE_INITIALS}
              </span>
            </div>
            {/* Blue verified checkmark badge */}
            <motion.span
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 16,
              }}
              className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-md"
              style={{ backgroundColor: "#3897F0" }}
              title="Akun terverifikasi"
              aria-label="Akun terverifikasi"
            >
              <BadgeCheck
                className="h-5 w-5 text-white"
                strokeWidth={2.6}
              />
            </motion.span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex items-center justify-center gap-1.5 text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          {PROFILE_NAME}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.45,
              type: "spring",
              stiffness: 400,
              damping: 16,
            }}
            className="inline-flex translate-y-[1px]"
            title="Akun terverifikasi"
            aria-label="Akun terverifikasi"
          >
            <BadgeCheck
              className="h-6 w-6 sm:h-7 sm:w-7"
              strokeWidth={2.4}
              style={{ color: "#3897F0" }}
            />
          </motion.span>
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
