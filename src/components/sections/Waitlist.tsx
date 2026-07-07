"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Icon from "@/components/brand/Icon";
import { Blob, Twinkles } from "@/components/brand/Decor";
import { WAITLIST } from "@/lib/content";

/**
 * Waitlist + Newsletter — the primary conversion module (NEW).
 *
 * One email field + two intent boxes (waitlist / newsletter), both pre-checked,
 * with "at least one must be checked" enforced. A honeypot guards against bots.
 *
 * NOTE (developer): this currently confirms client-side only. To wire the real
 * flow, POST to `/api/subscribe` with:
 *   { email, waitlist: boolean, newsletter: boolean, source: "waitlist-section" }
 * then move to a tagged, double-opt-in list (Brevo / Kit / Resend). The Ask Veda
 * form and the footer newsletter mini-form should feed the same endpoint with
 * their own `source` tag. See §11 of the landing-page spec for the full contract.
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [waitlist, setWaitlist] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [trap, setTrap] = useState(""); // honeypot — real users never fill this
  const [sent, setSent] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = emailOk && (waitlist || newsletter) && trap === "";

  return (
    <Section id="waitlist" className="overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-mist via-brand-50 to-coral-50/60" />
      <Blob className="-left-24 top-6 h-80 w-80 bg-brand-200/40" animate />
      <Blob className="-right-20 bottom-0 h-80 w-80 bg-coral-100/50" animate />
      <Twinkles />

      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Left: copy + form */}
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>{WAITLIST.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.6rem]">
              Be first to meet{" "}
              <span className="text-gradient italic">ParentVeda.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-[1.04rem] leading-relaxed text-ink-600">
              {WAITLIST.body}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            {sent ? (
              <p className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3.5 text-sm font-semibold text-brand-700 ring-1 ring-brand-500/15">
                <span className="text-coral-500">🌸</span>
                {WAITLIST.success}
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (canSubmit) setSent(true);
                }}
                className="mt-8"
              >
                {/* honeypot — visually hidden, off-screen, not tabbable */}
                <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                  />
                </div>

                <label htmlFor="waitlist-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="h-[54px] w-full rounded-input bg-white px-4 text-[0.95rem] text-ink-900 shadow-soft ring-1 ring-brand-500/15 outline-none transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500/40"
                />

                <div className="mt-4 flex flex-col gap-3">
                  <Checkbox
                    id="opt-waitlist"
                    checked={waitlist}
                    onChange={setWaitlist}
                    icon="sparkle"
                    label={WAITLIST.waitlistLabel}
                  />
                  <Checkbox
                    id="opt-newsletter"
                    checked={newsletter}
                    onChange={setNewsletter}
                    icon="book"
                    label={WAITLIST.newsletterLabel}
                  />
                </div>

                <div className="mt-5">
                  <Button type="submit" size="lg" disabled={!canSubmit} className="w-full sm:w-auto">
                    {WAITLIST.button}
                  </Button>
                </div>

                {!waitlist && !newsletter ? (
                  <p className="mt-2.5 text-xs font-semibold text-coral-700">
                    Pick at least one — the launch heads-up or the weekly letter.
                  </p>
                ) : (
                  <p className="mt-2.5 text-xs text-ink-400">{WAITLIST.micro}</p>
                )}
              </form>
            )}
          </Reveal>
        </div>

        {/* Right: the gentle-letter preview */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-sm">
            <div className="overflow-hidden rounded-[28px] bg-white shadow-float ring-1 ring-brand-500/10">
              <div className="flex items-center gap-3 border-b border-brand-500/10 bg-gradient-to-r from-mist to-white px-5 py-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-500">
                  <Icon name="book" className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="font-heading text-sm font-extrabold text-ink-900">The gentle letter</p>
                  <p className="text-xs text-brand-500">One soft email a week</p>
                </div>
                <span className="rounded-full bg-coral-100 px-3 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-coral-700">
                  Preview
                </span>
              </div>

              <ul className="flex flex-col gap-2.5 bg-gradient-to-b from-white to-mist/40 px-4 py-5">
                {LETTER_BITS.map((b) => (
                  <li
                    key={b.label}
                    className="flex items-start gap-3 rounded-2xl bg-white px-3.5 py-3 shadow-soft ring-1 ring-brand-500/10"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <p className="text-[0.85rem] leading-snug text-ink-700">
                      <span className="font-bold text-brand-600">{b.label}: </span>
                      {b.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const LETTER_BITS: { icon: "bowl" | "music" | "moon"; label: string; text: string }[] = [
  { icon: "bowl", label: "This week's recipe", text: "A warm, easy dish suited to your trimester." },
  { icon: "music", label: "A raga to unwind", text: "One soft track for you and baby tonight." },
  { icon: "moon", label: "A calm read", text: "A gentle few minutes on what you're feeling now." },
];

function Checkbox({
  id,
  checked,
  onChange,
  label,
  icon,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  icon: "sparkle" | "book";
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-3 ring-1 transition-colors ${
        checked ? "bg-white ring-brand-500/20" : "bg-white/60 ring-brand-500/10"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ring-1 transition-colors ${
          checked ? "bg-brand-500 text-white ring-brand-500" : "bg-white text-transparent ring-brand-500/25"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4 4 10-10" />
        </svg>
      </span>
      <span className="flex items-center gap-2 text-[0.92rem] font-semibold text-ink-700">
        <Icon name={icon} className="h-4 w-4 text-brand-400" />
        {label}
      </span>
    </label>
  );
}
