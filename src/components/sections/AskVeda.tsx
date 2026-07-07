"use client";

// import { useState } from "react"; // PRESERVED — used by the commented-out NotifyForm below
import { motion, useReducedMotion } from "motion/react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { LogoMark } from "@/components/brand/Logo";
import { Blob } from "@/components/brand/Decor";
import { ASK_VEDA_CHAT, ASK_VEDA_PROMPTS } from "@/lib/content";

export default function AskVeda() {
  return (
    <Section id="ask-veda" className="overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-mist/50 to-canvas" />
      <Blob className="-right-24 top-0 h-80 w-80 bg-coral-100/40" animate />
      <Blob className="-left-20 bottom-0 h-72 w-72 bg-brand-100/50" />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + notify */}
        <div className="max-w-xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <Eyebrow>Ask Veda</Eyebrow>
              <ComingSoonBadge />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.7rem]">
              Meet Ask Veda — your personal{" "}
              <span className="text-gradient italic">pregnancy guide.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-[1.04rem] leading-relaxed text-ink-600">
              Ask anything — &ldquo;Can I…?&rdquo;, foods, symptoms, traditions — and get
              warm, personalized, bilingual answers made just for you. Like a wise friend
              who&apos;s always awake.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap gap-2">
              {ASK_VEDA_PROMPTS.map((p) => (
                <span
                  key={p}
                  className="rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-brand-700 shadow-soft ring-1 ring-brand-500/10"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Pre-launch: Ask Veda ships with the app, so the CTA funnels to the
                single canonical waitlist form (§11) instead of a third email box.
                The original inline NotifyForm is preserved (commented) below. */}
            <div className="mt-8">
              <p className="text-[0.95rem] leading-relaxed text-ink-600">
                Ask Veda arrives with the app —{" "}
                <span className="font-semibold text-brand-700">join the waitlist to be first.</span>
              </p>
              <div className="mt-4">
                <Button href="#waitlist" size="lg">
                  Join the waitlist
                </Button>
              </div>
              <p className="mt-2.5 text-xs text-ink-400">
                Not a doctor — gentle guidance only. No spam, ever.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: chat mockup */}
        <Reveal delay={0.1}>
          <ChatMock />
        </Reveal>
      </div>
    </Section>
  );
}

function ComingSoonBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-100 px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-coral-700">
      <span className="h-1.5 w-1.5 animate-twinkle rounded-full bg-coral-500" />
      Coming soon
    </span>
  );
}

/* PRESERVED — original Ask Veda email-capture form (pre-waitlist).
   Re-enable by restoring the `useState` import and rendering <NotifyForm /> above.
function NotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="mt-8">
      {sent ? (
        <p className="inline-flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 ring-1 ring-brand-500/15">
          <span className="text-coral-500">🌸</span>
          You&apos;re on the list — we&apos;ll whisper when Ask Veda arrives.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) setSent(true);
          }}
          className="flex flex-col gap-2.5 sm:flex-row"
        >
          <label htmlFor="askveda-email" className="sr-only">
            Your email
          </label>
          <input
            id="askveda-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email, for a gentle heads-up"
            className="h-[52px] flex-1 rounded-input bg-white px-4 text-[0.95rem] text-ink-900 shadow-soft ring-1 ring-brand-500/15 outline-none transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500/40"
          />
          <Button type="submit" className="shrink-0">
            Get notified
          </Button>
        </form>
      )}
      <p className="mt-2.5 text-xs text-ink-400">
        Not a doctor — gentle guidance only. No spam, ever.
      </p>
    </div>
  );
}
*/

function ChatMock() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto max-w-sm">
      <div className="overflow-hidden rounded-[28px] bg-white shadow-float ring-1 ring-brand-500/10">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-brand-500/10 bg-gradient-to-r from-mist to-white px-5 py-4">
          <LogoMark size={38} />
          <div className="flex-1">
            <p className="font-heading text-sm font-extrabold text-ink-900">Ask Veda</p>
            <p className="text-xs text-brand-500">Your bilingual guide · coming soon</p>
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-500">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 1.3 4.7L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
            </svg>
          </span>
        </div>

        {/* messages */}
        <div className="flex flex-col gap-3 bg-gradient-to-b from-white to-mist/40 px-4 py-5">
          {ASK_VEDA_CHAT.map((m, i) => (
            <motion.div
              key={i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className={m.from === "user" ? "flex justify-end" : "flex items-end gap-2"}
            >
              {m.from === "veda" ? (
                <span className="mb-0.5 shrink-0">
                  <LogoMark size={24} />
                </span>
              ) : null}
              <p
                className={`max-w-[78%] text-[0.86rem] leading-snug ${
                  m.from === "user"
                    ? "rounded-2xl rounded-br-md bg-brand-500 px-3.5 py-2.5 text-white"
                    : "rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-ink-700 shadow-soft ring-1 ring-brand-500/10"
                }`}
              >
                {m.text}
              </p>
            </motion.div>
          ))}

          {/* typing indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex items-end gap-2"
          >
            <span className="mb-0.5 shrink-0">
              <LogoMark size={24} />
            </span>
            <span className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-soft ring-1 ring-brand-500/10">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-twinkle rounded-full bg-brand-300"
                  style={{ animationDelay: `${d * 0.2}s` }}
                />
              ))}
            </span>
          </motion.div>
        </div>

        {/* input (disabled, coming soon) */}
        <div className="flex items-center gap-2 border-t border-brand-500/10 bg-white px-4 py-3">
          <span className="flex-1 rounded-full bg-mist px-4 py-2.5 text-sm text-ink-400">
            Ask Veda anything…
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-200 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
