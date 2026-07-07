import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { Blob } from "@/components/brand/Decor";
import { LogoMark } from "@/components/brand/Logo";
import { PROMISES } from "@/lib/content";

export default function About() {
  return (
    <Section id="about" className="overflow-hidden py-20 sm:py-28">
      <Blob className="-left-28 top-10 h-80 w-80 bg-brand-100/40" />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Narrative */}
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Why ParentVeda exists</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.7rem]">
              Most pregnancy apps feel clinical. ParentVeda feels like{" "}
              <span className="text-gradient italic">home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-pretty text-[1.04rem] leading-relaxed text-ink-600">
              So many apps are clinical, Western and quietly anxious — full of scores,
              alerts and worry. ParentVeda is different. It&apos;s calm by design,
              culturally rooted, and speaks your language: English and Hinglish, side by side.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-pretty text-[1.04rem] leading-relaxed text-ink-600">
              We weave Garbh Sanskar, soothing ragas and dadi-maa ke nuskhe together with
              gentle, evidence-informed guidance. No streaks to chase, no fear to carry —
              just warmth, wisdom and a steady hand, every single week.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-brand-700">
              <LogoMark size={30} />
              <span>With love, Team ParentVeda</span>
            </div>
          </Reveal>
        </div>

        {/* Promise card */}
        <Reveal delay={0.1} className="lg:pl-6">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-mist via-white to-coral-50 p-7 shadow-card ring-1 ring-brand-500/10 sm:p-9">
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-100/50 blur-2xl" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand-500 shadow-soft">
              <Icon name="lotus" className="h-7 w-7" />
            </span>
            <p className="mt-5 font-display text-[1.6rem] font-medium italic leading-snug tracking-[-0.01em] text-ink-900 sm:text-[1.8rem]">
              “Nurturing Wisdom — a calm nursery, never a toy store.”
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-400">
              Our promise to you
            </p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {PROMISES.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 rounded-2xl bg-white/70 px-3.5 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-brand-500/10"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                    <Icon name="check" className="h-4 w-4" strokeWidth={2} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
