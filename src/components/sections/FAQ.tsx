"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { FAQS } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-mist/40 py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Left: intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-[2.05rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.5rem]">
              Questions, <span className="text-gradient italic">gently answered.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-ink-600">
              Everything you might wonder about ParentVeda — calm, honest and brief.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#whatsapp"
              className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft ring-1 ring-brand-500/10 transition-shadow hover:shadow-card"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
                <Icon name="chat" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-bold text-ink-900">Still curious?</span>
                <span className="block text-sm text-ink-500">
                  Aapke saare sawaal welcome — say hi on WhatsApp.
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Right: accordion */}
        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={faq.q}
                  className={`overflow-hidden rounded-2xl bg-surface shadow-soft ring-1 transition-colors ${
                    isOpen ? "ring-brand-500/20" : "ring-brand-500/[0.06]"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex-1 font-heading text-[1.02rem] font-bold text-ink-900">
                      {faq.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-brand-500 text-white" : "bg-mist text-brand-600"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 pr-12 text-[0.95rem] leading-relaxed text-ink-600">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
