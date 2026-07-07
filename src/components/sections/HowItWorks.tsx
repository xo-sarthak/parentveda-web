import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { STEPS } from "@/lib/content";

/**
 * How it works — three calm steps. Uses the STEPS data that has always
 * lived in content.ts but was never surfaced; now live on the landing page.
 */
export default function HowItWorks() {
  return (
    <Section id="how" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="Three calm steps to"
        accent="feeling held."
        subtitle="No setup maze, no checklist. Tell us where you are, and ParentVeda meets you there — gently, every day."
      />

      <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-3" stagger={0.08}>
        {STEPS.map((s) => (
          <RevealItem key={s.n}>
            <div className="lift relative flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-brand-500/[0.06]">
              <span className="absolute right-6 top-6 font-display text-4xl font-medium text-brand-100">
                {s.n}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-500">
                <Icon name={s.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-heading text-lg font-bold tracking-tight text-ink-900">
                {s.title}
              </h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-ink-600">
                {s.desc}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
