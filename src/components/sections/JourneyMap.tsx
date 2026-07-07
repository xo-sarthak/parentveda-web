"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/brand/Icon";
import { MILESTONES, type IconKey } from "@/lib/content";
import { TINT, type Tint } from "@/lib/ui";

const N = MILESTONES.length;
const STEP = 176;
const PAD = 56;
const H = PAD * 2 + STEP * (N - 1);
const VW = 160;
const CX = VW / 2;

const nodes = MILESTONES.map((m, i) => ({
  ...m,
  y: PAD + i * STEP,
  side: i % 2 === 0 ? "left" : "right",
}));

// Serpentine path connecting the centred checkpoints.
const pathD = (() => {
  let d = `M ${CX} ${nodes[0].y}`;
  for (let i = 1; i < N; i++) {
    const p = nodes[i - 1].y;
    const c = nodes[i].y;
    const bulge = i % 2 === 1 ? CX + 42 : CX - 42;
    d += ` C ${bulge} ${p + (c - p) * 0.42} ${bulge} ${c - (c - p) * 0.42} ${CX} ${c}`;
  }
  return d;
})();

export default function JourneyMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.55"],
  });

  return (
    <Section id="journey" className="overflow-hidden bg-mist/40 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Pregnancy Journey Map"
        title="A winding little map, from"
        accent="week 4 to Birth."
        subtitle="Follow the trail and watch the milestones light up — every checkpoint a small, celebrated step toward meeting your baby."
      />

      <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
        {/* ---------- Desktop: serpentine ---------- */}
        <div className="relative mx-auto hidden md:block" style={{ height: H }}>
          <svg
            width={VW}
            height={H}
            viewBox={`0 0 ${VW} ${H}`}
            className="absolute left-1/2 top-0 -translate-x-1/2 overflow-visible"
            aria-hidden
          >
            <defs>
              <linearGradient id="trail-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-brand-400)" />
                <stop offset="1" stopColor="var(--color-coral-400)" />
              </linearGradient>
            </defs>
            <path
              d={pathD}
              fill="none"
              stroke="var(--color-brand-100)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeDasharray="0.5 13"
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#trail-grad)"
              strokeWidth={5}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : scrollYProgress }}
            />
          </svg>

          {nodes.map((n, i) => (
            <div
              key={n.week}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: n.y }}
            >
              <MapNode
                icon={n.icon}
                tint={n.tint}
                progress={scrollYProgress}
                threshold={i / (N - 1)}
                reduce={Boolean(reduce)}
              />
              <MapCard
                week={n.week}
                title={n.title}
                sub={n.sub}
                tint={n.tint}
                progress={scrollYProgress}
                threshold={i / (N - 1)}
                side={n.side as "left" | "right"}
                reduce={Boolean(reduce)}
              />
            </div>
          ))}
        </div>

        {/* ---------- Mobile: timeline ---------- */}
        <div className="relative md:hidden">
          <div className="absolute bottom-3 left-[23px] top-3 w-[3px] rounded-full bg-brand-100" />
          <motion.div
            className="absolute bottom-3 left-[23px] top-3 w-[3px] origin-top rounded-full bg-gradient-to-b from-brand-400 to-coral-400"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          <ul className="flex flex-col gap-4">
            {MILESTONES.map((m) => (
              <li key={m.week} className="relative flex items-start gap-4">
                <span
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-soft ring-1 ${TINT[m.tint].ring} ${TINT[m.tint].text}`}
                >
                  <Icon name={m.icon} className="h-6 w-6" />
                </span>
                <div className="flex-1 rounded-2xl bg-surface p-4 shadow-soft ring-1 ring-brand-500/[0.06]">
                  <p className={`text-xs font-bold uppercase tracking-[0.1em] ${TINT[m.tint].text}`}>
                    {m.week}
                  </p>
                  <h3 className="mt-0.5 font-heading text-base font-bold text-ink-900">
                    {m.title}
                  </h3>
                  <p className="text-sm text-ink-600">{m.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function MapNode({
  icon,
  tint,
  progress,
  threshold,
  reduce,
}: {
  icon: IconKey;
  tint: Tint;
  progress: MotionValue<number>;
  threshold: number;
  reduce: boolean;
}) {
  const on = useTransform(progress, [threshold - 0.05, threshold + 0.01], [0, 1]);
  const scale = useTransform(on, [0, 1], [0.5, 1]);
  const ringScale = useTransform(on, [0, 1], [0.8, 1.35]);
  const ringOpacity = useTransform(on, [0, 0.6, 1], [0, 0.35, 0]);

  return (
    <div className="relative z-10 grid h-14 w-14 place-items-center">
      {/* pulse ring as it activates */}
      <motion.span
        aria-hidden
        className={`absolute inset-0 rounded-full ${TINT[tint].dot}`}
        style={reduce ? { opacity: 0 } : { scale: ringScale, opacity: ringOpacity }}
      />
      <span className="absolute inset-0 rounded-full bg-white shadow-soft ring-1 ring-brand-500/10" />
      <motion.span
        className={`absolute inset-1 rounded-full ${TINT[tint].soft}`}
        style={reduce ? { opacity: 1 } : { opacity: on }}
      />
      <motion.span
        className={`relative ${TINT[tint].text}`}
        style={reduce ? { scale: 1 } : { scale }}
      >
        <Icon name={icon} className="h-6 w-6" />
      </motion.span>
    </div>
  );
}

function MapCard({
  week,
  title,
  sub,
  tint,
  progress,
  threshold,
  side,
  reduce,
}: {
  week: string;
  title: string;
  sub: string;
  tint: Tint;
  progress: MotionValue<number>;
  threshold: number;
  side: "left" | "right";
  reduce: boolean;
}) {
  const appear = useTransform(progress, [threshold - 0.06, threshold + 0.02], [0, 1]);
  const x = useTransform(appear, [0, 1], [side === "left" ? 24 : -24, 0]);

  return (
    <motion.div
      style={reduce ? undefined : { opacity: appear, x }}
      className={`absolute top-1/2 w-[266px] -translate-y-1/2 ${
        side === "left" ? "right-[calc(100%+28px)] text-right" : "left-[calc(100%+28px)] text-left"
      }`}
    >
      <div className="rounded-2xl bg-surface p-4 shadow-card ring-1 ring-brand-500/[0.06]">
        <p className={`text-xs font-bold uppercase tracking-[0.12em] ${TINT[tint].text}`}>
          {week}
        </p>
        <h3 className="mt-0.5 font-heading text-base font-bold text-ink-900">{title}</h3>
        <p className="text-sm text-ink-600">{sub}</p>
      </div>
    </motion.div>
  );
}
