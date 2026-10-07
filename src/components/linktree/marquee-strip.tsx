"use client";

import * as React from "react";
import { Code2, Smartphone, Bot, Boxes, Sparkle } from "lucide-react";

const TOPICS = [
  { label: "Web Development", icon: Code2 },
  { label: "Mobile App", icon: Smartphone },
  { label: "Artificial Intelligence", icon: Bot },
  { label: "Blockchain & Web3", icon: Boxes },
  { label: "Source Code", icon: Sparkle },
  { label: "Edukasi Praktis", icon: Code2 },
];

export function MarqueeStrip() {
  // Duplicate the list so the marquee loops seamlessly
  const items = [...TOPICS, ...TOPICS];

  return (
    <div
      className="marquee-pause relative mt-5 overflow-hidden border-y border-border/60 bg-card/40 py-2.5 backdrop-blur-sm"
      role="presentation"
      aria-hidden
    >
      {/* edge fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />

      <div className="flex w-max animate-marquee items-center gap-3">
        {items.map((t, i) => {
          const Icon = t.icon;
          return (
            <React.Fragment key={i}>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground sm:text-sm">
                <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={2.2} />
                {t.label}
              </span>
              <span
                className="h-1 w-1 rounded-full bg-border"
                aria-hidden
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
