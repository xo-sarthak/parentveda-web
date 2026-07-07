import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Icon from "@/components/brand/Icon";
import { FEATURED_JOURNAL } from "@/lib/content";
import { type Tint } from "@/lib/ui";

/**
 * "From the Journal" — a teaser for the content library. The full set of
 * Articles · Recipes · Nushkhe · "Can I…?" answers + FAQ moves to its own
 * SEO-first Journal (Content Hub). The original full Library component is
 * preserved intact at sections/Library.tsx (just no longer rendered).
 */
const THUMB: Record<Tint, string> = {
  brand: "from-brand-100 to-mist",
  coral: "from-coral-100 to-coral-50",
  earth: "from-earth-100 to-earth-50",
};

export default function Journal() {
  return (
    <Section id="journal" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="The Journal"
        title="Trustworthy reading,"
        accent="the calm way."
        subtitle="Stage-aware articles, trimester recipes and gentle traditional nushkhe — and calm answers to the “Can I…?” questions every parent asks."
      />

      <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
        {FEATURED_JOURNAL.map((item) => (
          <RevealItem key={item.title}>
            <article className="lift group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06]">
              <div className={`relative grid h-28 place-items-center bg-gradient-to-br ${THUMB[item.tint]}`}>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-brand-500 shadow-soft backdrop-blur">
                  <Icon name={item.icon} className="h-7 w-7" />
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-600 shadow-soft">
                  {item.tag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-brand-400">
                  <span>{item.category}</span>
                  <span className="h-1 w-1 rounded-full bg-ink-200" />
                  <span className="text-ink-400">{item.read}</span>
                </div>
                <h3 className="mt-2 flex-1 font-heading text-[1.02rem] font-bold leading-snug tracking-tight text-ink-900">
                  {item.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
                  Read
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
                  </svg>
                </span>
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center gap-3">
          {/* Pre-launch: the full Journal (Content Hub) is a separate build.
              For now the CTA gathers readers via the waitlist. Repoint to
              "/journal" once the Content Hub page ships. */}
          <Button href="#waitlist" variant="secondary" size="lg">
            Read the Journal — coming soon
          </Button>
          <p className="text-sm text-ink-500">
            The full library of calm reads lands with the app — join the waitlist to read along.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
