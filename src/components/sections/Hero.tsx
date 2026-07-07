"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Icon from "@/components/brand/Icon";
import { Blob, Twinkles, Sprig } from "@/components/brand/Decor";
import PhoneMock from "@/components/PhoneMock";
import WeekScreen from "@/components/AppScreen";
import { TRUST_POINTS, PRELAUNCH_NOTE } from "@/lib/content";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* PRESERVED — pre-waitlist download icon.
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
    </svg>
  );
}
*/
function WaitlistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M12 20.4c-.5-.4-7.6-5.7-7.6-11.1A4.8 4.8 0 0 1 12 7.1 4.8 4.8 0 0 1 19.6 9.3c0 5.4-7.1 10.7-7.6 11.1Z" />
    </svg>
  );
}
function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14m0 0l6-6m-6 6l-6-6" />
    </svg>
  );
}

function FloatPill({
  children,
  className = "",
  delay = 0,
  drift = 10,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  drift?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 + delay }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -drift, 0] }}
        transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-float ring-1 ring-brand-500/10 backdrop-blur"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 sm:pt-32 lg:pt-36 lg:pb-20">
      {/* ambient backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-mist/70 via-canvas to-canvas" />
      <Blob className="-left-24 -top-16 h-[26rem] w-[26rem] bg-brand-200/40" animate />
      <Blob className="-right-20 top-10 h-[24rem] w-[24rem] bg-coral-100/55" animate />
      <Blob className="bottom-0 left-1/3 h-72 w-72 bg-mist-3/70" />
      <Twinkles />
      <Sprig className="pointer-events-none absolute -right-6 bottom-2 hidden h-44 w-36 text-brand-200/70 lg:block" flip />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* ---------- Left: copy ---------- */}
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-brand-700 shadow-soft ring-1 ring-brand-500/10 backdrop-blur">
                <span className="text-coral-500">❤</span>
                Nurturing Wisdom · Aapka calm companion
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-5 font-display text-[2.7rem] font-medium leading-[1.04] tracking-[-0.03em] text-ink-900 sm:text-[3.3rem] lg:text-[3.55rem]"
            >
              Your{" "}
              <span className="relative inline-block">
                <span className="text-gradient">calm companion</span>
                <Swash />
              </span>{" "}
              through every week of pregnancy.
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-lg text-pretty text-[1.06rem] leading-relaxed text-ink-600 sm:text-lg">
              ParentVeda blends timeless Indian wisdom with gentle, modern guidance —
              bilingual, soothing, and made for you. From week 4 to your baby&apos;s first cry.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#waitlist" size="lg" icon={<WaitlistIcon />}>
                Join the Waitlist
              </Button>
              <Button href="#features" size="lg" variant="secondary" icon={<ArrowDown />}>
                Explore ParentVeda
              </Button>
            </motion.div>

            {/* Pre-launch reassurance under the CTAs */}
            <motion.p variants={item} className="mt-3.5 text-sm font-medium text-ink-500">
              {PRELAUNCH_NOTE}
            </motion.p>

            {/* trust strip */}
            <motion.ul variants={item} className="mt-9 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.82rem] font-medium text-ink-500">
              {TRUST_POINTS.map((point, i) => (
                <li key={point} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-brand-300" aria-hidden>·</span> : null}
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-coral-400" aria-hidden />
                    {point}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------- Right: phone showcase ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-md justify-center"
          >
            {/* glow behind phone */}
            <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-200/40 via-coral-100/40 to-mist-3/40 blur-3xl" />

            <div className={reduce ? "" : "animate-float-slow"}>
              <div className={reduce ? "" : "animate-breathe"}>
                <PhoneMock>
                  <WeekScreen />
                </PhoneMock>
              </div>
            </div>

            {/* floating feature pills */}
            <FloatPill className="-left-2 top-10 sm:left-2" delay={0.2} drift={12}>
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-coral-50 text-coral-500">
                <Icon name="sun" className="h-4 w-4" />
              </span>
              <span className="text-[0.8rem] font-bold text-ink-900">Daily Moment</span>
            </FloatPill>

            <FloatPill className="-right-1 top-28 sm:-right-3" delay={0.5} drift={9}>
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-500">
                <Icon name="map" className="h-4 w-4" />
              </span>
              <span className="text-[0.8rem] font-bold text-ink-900">Journey Map</span>
            </FloatPill>

            <FloatPill className="bottom-16 -left-3 sm:left-0" delay={0.9} drift={11}>
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-brand-500">
                <Icon name="lotus" className="h-4 w-4" />
              </span>
              <span className="text-[0.8rem] font-bold text-ink-900">Garbh Sanskar</span>
            </FloatPill>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/** A hand-drawn coral underline that draws itself in under the accent word. */
function Swash() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 220 18"
      className="absolute -bottom-2 left-0 h-3 w-full"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
    >
      <motion.path
        d="M4 11 C 45 4, 90 4, 130 9 C 160 12, 195 11, 216 6"
        stroke="var(--color-coral-300)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
      />
    </svg>
  );
}
