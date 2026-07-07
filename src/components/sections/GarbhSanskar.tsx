import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { Blob } from "@/components/brand/Decor";
import { GARBH_RITUALS } from "@/lib/content";

/**
 * Garbh Sanskar — the daily five rituals. Surfaces GARBH_RITUALS from
 * content.ts as a dedicated, calm section (was data-only before).
 */
export default function GarbhSanskar() {
  return (
    <Section id="garbh" className="overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-mist/40 to-canvas" />
      <Blob className="-left-24 top-8 h-80 w-80 bg-brand-100/40" />
      <Blob className="-right-20 bottom-0 h-72 w-72 bg-coral-100/40" />

      <SectionHeading
        eyebrow="Garbh Sanskar"
        title="Gently woven"
        accent="into your day."
        subtitle="An age-old Indian practice, made soft and optional — five small rituals to nurture your baby and calm your mind."
      />

      <RevealGroup
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5"
        stagger={0.07}
      >
        {GARBH_RITUALS.map((r) => (
          <RevealItem key={r.title}>
            <div className="lift flex h-full flex-col items-center rounded-card bg-surface p-6 text-center shadow-card ring-1 ring-brand-500/[0.06]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                <Icon name={r.icon} className="h-6 w-6" />
              </span>
              <p className="mt-4 font-display text-2xl font-medium leading-none text-brand-400">
                {r.hindi}
              </p>
              <h3 className="mt-2 font-heading text-base font-bold tracking-tight text-ink-900">
                {r.title}
              </h3>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-600">
                {r.desc}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
