"use client";

/*
 * Hero — "the journey runs through it".
 *
 * A centered, editorial masthead (Fraunces, hairline rules, no gradient text)
 * with the week-by-week journey drawn as a real path across the section.
 * The phone stands *on* the path as the Week-20 checkpoint — grounded and
 * bottom-cropped by the section edge, not floating in a glow.
 *
 * The previous composition (split grid + floating pills + twinkles) is
 * preserved untouched in HeroClassic.tsx.
 */

import { motion, useReducedMotion, type Variants } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Fruit from "@/components/brand/Fruit";
import PhoneMock from "@/components/PhoneMock";
import WeekScreen from "@/components/AppScreen";
import { TRUST_POINTS, PRELAUNCH_NOTE } from "@/lib/content";

/* ---------- journey geometry (1200 × 500 design space) ---------- */

type Milestone = { week: number; fruit: string; label: string; x: number; y: number };

const MILESTONES: Milestone[] = [
  { week: 4, fruit: "poppySeed", label: "Poppy seed", x: 90, y: 180 },
  { week: 8, fruit: "raspberry", label: "Raspberry", x: 245, y: 128 },
  { week: 12, fruit: "lime", label: "Lime", x: 385, y: 172 },
  /* week 20 is the phone itself — see WeekScreen's banana */
  { week: 24, fruit: "corn", label: "Corn", x: 815, y: 172 },
  { week: 34, fruit: "coconut", label: "Coconut", x: 960, y: 128 },
  { week: 40, fruit: "watermelon", label: "Hello, baby", x: 1110, y: 180 },
];

const W = 1200;
const H = 500;

/* The trail passes through every milestone (and dips behind the phone at 600). */
const TRAIL_POINTS: Array<[number, number]> = [
  [-50, 150],
  ...MILESTONES.slice(0, 3).map((m) => [m.x, m.y] as [number, number]),
  [600, 162],
  ...MILESTONES.slice(3).map((m) => [m.x, m.y] as [number, number]),
  [1250, 150],
];

const trailD = TRAIL_POINTS.reduce((d, [x, y], i) => {
  if (i === 0) return `M ${x} ${y}`;
  const [px, py] = TRAIL_POINTS[i - 1];
  const mid = (px + x) / 2;
  return `${d} C ${mid} ${py} ${mid} ${y} ${x} ${y}`;
}, "");

/* ---------- entrance choreography ---------- */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

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

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* quiet backdrop — one soft wash, no blobs, no twinkles */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-mist/70 via-canvas to-canvas" />

      <Container>
        {/* ---------- Editorial masthead ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={item}
            className="flex items-center justify-center gap-4 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-brand-600"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-brand-300 sm:w-14" />
            Nurturing Wisdom · Aapka calm companion
            <span aria-hidden className="h-px w-10 bg-gradient-to-l from-transparent to-brand-300 sm:w-14" />
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-balance font-display text-[2.35rem] font-medium leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[3.4rem] sm:leading-[1.06] lg:text-[3.8rem]"
          >
            Your <em className="italic text-brand-600">calm companion</em> through
            every week of pregnancy.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-pretty text-[1.06rem] leading-relaxed text-ink-600 sm:text-lg"
          >
            ParentVeda blends timeless Indian wisdom with gentle, modern guidance —
            bilingual, soothing, and made for you. From week 4 to your baby&apos;s first cry.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#waitlist" size="lg" icon={<WaitlistIcon />}>
              Join the Waitlist
            </Button>
            <Button href="#features" size="lg" variant="secondary" icon={<ArrowDown />}>
              Explore ParentVeda
            </Button>
          </motion.div>

          <motion.p variants={item} className="mt-3.5 text-sm font-medium text-ink-500">
            {PRELAUNCH_NOTE}
          </motion.p>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[0.82rem] font-medium text-ink-500"
          >
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
      </Container>

      {/* ---------- The journey band ---------- */}
      <div className="relative mx-auto mt-10 h-[430px] max-w-[1400px] sm:mt-12 sm:h-[500px]" aria-hidden>
        {/* the arch — soft ground the phone rises from */}
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[min(94vw,900px)] -translate-x-1/2 rounded-t-[999px] border border-b-0 border-brand-500/10 sm:h-[330px]" />
        <div className="absolute bottom-0 left-1/2 h-[260px] w-[min(84vw,780px)] -translate-x-1/2 rounded-t-[999px] bg-gradient-to-b from-mist/90 via-mist/40 to-transparent sm:h-[290px]" />

        {/* the trail — dotted base + a drawn-in gradient, like the Journey Map */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="hero-trail-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-brand-300)" />
              <stop offset="0.5" stopColor="var(--color-brand-400)" />
              <stop offset="1" stopColor="var(--color-coral-400)" />
            </linearGradient>
          </defs>
          <path
            d={trailD}
            fill="none"
            stroke="var(--color-brand-100)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="0.5 13"
          />
          <motion.path
            d={trailD}
            fill="none"
            stroke="url(#hero-trail-grad)"
            strokeWidth={4}
            strokeLinecap="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>

        {/* fruit milestones along the trail (desktop) */}
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.week}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.7 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="absolute hidden -translate-x-1/2 -translate-y-1/2 flex-col items-center md:flex"
            style={{ left: `${(m.x / W) * 100}%`, top: `${(m.y / H) * 100}%` }}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-soft ring-1 ring-brand-500/10">
              <Fruit name={m.fruit} className="h-9 w-9" />
            </span>
            <span className="mt-1.5 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-ink-700">
              Week {m.week}
            </span>
            <span className="text-[0.68rem] font-medium text-ink-400">{m.label}</span>
          </motion.div>
        ))}

        {/* the phone — standing on the path at week 20, cropped by the fold */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-[38px] z-20 -translate-x-1/2 sm:top-[52px]"
        >
          {/* map-label: this checkpoint is you */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute -top-4 left-1/2 z-30 inline-flex -translate-x-1/2 -rotate-2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-600 px-3.5 py-1.5 text-[0.72rem] font-bold text-white shadow-float"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-coral-300" />
            You are here · Week 20
          </motion.span>

          <div className={reduce ? "" : "animate-breathe"}>
            <PhoneMock>
              <WeekScreen />
            </PhoneMock>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
