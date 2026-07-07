import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { LogoMark } from "@/components/brand/Logo";
import { TRUST_STATS, TESTIMONIALS } from "@/lib/content";

/**
 * Social proof (NEW). Pre-launch, so the numbers + quotes are honest
 * placeholders — swap TRUST_STATS / TESTIMONIALS in content.ts for real
 * beta-user data as it arrives. Calm + honest is the brand: no fake reviews.
 */
export default function SocialProof() {
  return (
    <Section id="social" className="bg-mist/40 py-20 sm:py-28">
      <SectionHeading
        eyebrow="You're in gentle company"
        title="Made with love —"
        accent="and with parents like you."
        subtitle="Built on Indian wisdom, shaped with care, and growing with the parents who join us early."
      />

      {/* Trust stat strip */}
      <Reveal delay={0.1}>
        <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {TRUST_STATS.map((s) => (
            <li
              key={s.value}
              className="flex flex-col items-center gap-2 rounded-card bg-surface px-5 py-6 text-center shadow-soft ring-1 ring-brand-500/[0.06]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <p className="mt-1 font-heading text-lg font-extrabold text-ink-900">
                {s.value}
              </p>
              <p className="text-[0.85rem] leading-snug text-ink-600">{s.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Testimonial cards */}
      <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-3" stagger={0.08}>
        {TESTIMONIALS.map((t, i) => (
          <RevealItem key={i}>
            <figure className="flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-brand-500/[0.06]">
              <span className="font-display text-4xl leading-none text-brand-200" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="mt-1 flex-1 text-pretty text-[0.95rem] leading-relaxed text-ink-700">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2.5">
                <LogoMark size={28} />
                <span>
                  <span className="block text-sm font-bold text-ink-900">{t.name}</span>
                  <span className="block text-xs text-ink-400">{t.meta}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-8 text-center text-xs text-ink-400">
          Early voices, lightly paraphrased · real names &amp; stories arrive as our first parents do.
        </p>
      </Reveal>
    </Section>
  );
}
