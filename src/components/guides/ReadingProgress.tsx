"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/** A slim brand→coral bar along the very top that fills as you read. */
export default function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-400 to-coral-400"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
