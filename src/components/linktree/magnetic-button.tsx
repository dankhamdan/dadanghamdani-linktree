"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  children: React.ReactNode;
  strength?: number; // 0..1, default 0.35
  className?: string;
} & Omit<React.ComponentProps<typeof motion.div>, "ref">;

/**
 * Wraps any element so it follows the pointer slightly when hovered,
 * giving a "magnetic" feel. Returns a div — wrap your button/link in it.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const handleMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    },
    [x, y, strength]
  );

  const handleLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
