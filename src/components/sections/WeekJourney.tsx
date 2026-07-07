"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import Fruit from "@/components/brand/Fruit";
import { WEEKS, type IconKey } from "@/lib/content";

const TRIMESTER_LABEL: Record<1 | 2 | 3, string> = {
  1: "First trimester",
  2: "Second trimester",
  3: "Third trimester",
};

export default function WeekJourney() {
  const [i, setI] = useState(4); // start around week 20 (the halfway delight)
  const w = WEEKS[i];
  const scale = 0.62 + (i / (WEEKS.length - 1)) * 0.38;
  const progress = Math.round((w.week / 40) * 100);

  const rows: { icon: IconKey; label: string; text: string; highlight?: boolean }[] = [
    { icon: "seed", label: "Baby this week", text: w.dev },
    { icon: "heart", label: "Your journey", text: w.mom },
    { icon: "bowl", label: "Nourishment", text: w.nutrition },
    { icon: "lotus", label: "Bonding ritual", text: w.ritual, highlight: true },
  ];

  return (
    <Section id="weeks" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Week-on-Week Journey"
        title="Peek inside any week,"
        accent="4 → 40."
        subtitle="A gentle card for every week — baby's growth, your journey, nourishment and a small ritual to bond. Try it: tap a week."
      />

      {/* Week selector */}
      <Reveal delay={0.1}>
        <div className="mt-10 flex items-center justify-center gap-2 sm:gap-3">
          <StepButton
            label="Previous week"
            onClick={() => setI((v) => Math.max(0, v - 1))}
            disabled={i === 0}
            dir="left"
          />
          <div className="no-scrollbar flex max-w-[78vw] gap-1.5 overflow-x-auto rounded-full bg-white p-1.5 shadow-soft ring-1 ring-brand-500/10 sm:max-w-none">
            {WEEKS.map((week, idx) => (
              <button
                key={week.week}
                onClick={() => setI(idx)}
                aria-pressed={i === idx}
                className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold tabular-nums transition-colors ${
                  i === idx
                    ? "bg-brand-500 text-white shadow-soft"
                    : "text-ink-500 hover:bg-mist hover:text-brand-600"
                }`}
              >
                {week.week}
              </button>
            ))}
          </div>
          <StepButton
            label="Next week"
            onClick={() => setI((v) => Math.min(WEEKS.length - 1, v + 1))}
            disabled={i === WEEKS.length - 1}
            dir="right"
          />
        </div>
      </Reveal>

      {/* Week card */}
      <Reveal delay={0.15}>
        <div className="mt-8 grid overflow-hidden rounded-[28px] bg-gradient-to-br from-mist via-white to-coral-50 shadow-card ring-1 ring-brand-500/10 md:grid-cols-[0.92fr_1.08fr]">
          {/* visual */}
          <div className="relative flex flex-col items-center justify-center gap-2 border-b border-brand-500/10 p-8 text-center md:border-b-0 md:border-r">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-600 ring-1 ring-brand-500/10">
              {TRIMESTER_LABEL[w.trimester]}
            </span>

            <div className="grid h-40 w-40 place-items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={w.week}
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="drop-shadow-[0_14px_24px_rgba(45,20,76,0.16)]"
                >
                  <Fruit name={w.fruit} className="h-32 w-32" />
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-sm text-ink-500">Baby is about the size of</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={w.size}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="font-display text-2xl font-medium text-ink-900"
              >
                {w.size}
                <span className="block text-sm font-sans italic text-ink-400">
                  {w.sizeHi}
                </span>
              </motion.p>
            </AnimatePresence>

            {/* progress */}
            <div className="mt-3 w-full max-w-[220px]">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-500">
                <span>Week {w.week}</span>
                <span>of 40</span>
              </div>
              <div className="relative mt-1.5 h-2 rounded-full bg-mist-2">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-coral-400"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* details */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={w.week}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-3"
              >
                {rows.map((r) => (
                  <li
                    key={r.label}
                    className={`flex gap-3.5 rounded-2xl p-3.5 ${
                      r.highlight ? "bg-brand-50 ring-1 ring-brand-500/10" : ""
                    }`}
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                        r.highlight ? "bg-white text-brand-500" : "bg-mist text-brand-500"
                      }`}
                    >
                      <Icon name={r.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-400">
                        {r.label}
                      </p>
                      <p
                        className={`mt-0.5 text-[0.95rem] leading-snug text-ink-700 ${
                          r.highlight ? "italic text-brand-700" : ""
                        }`}
                      >
                        {r.text}
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function StepButton({
  label,
  onClick,
  disabled,
  dir,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-brand-600 shadow-soft ring-1 ring-brand-500/10 transition-all hover:bg-brand-50 disabled:opacity-35 disabled:hover:bg-white"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
