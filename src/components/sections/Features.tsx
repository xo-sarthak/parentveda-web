import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { FEATURES, TOOLS } from "@/lib/content";
import { TINT } from "@/lib/ui";

export default function Features() {
  return (
    <Section id="features" className="bg-mist/40 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Everything inside"
        title="One calm home for your"
        accent="whole journey."
        subtitle="Real, gentle features — built around Indian wisdom and your everyday rhythm. Never noisy, never a checklist."
      />

      <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" stagger={0.07}>
        {FEATURES.map((f) => {
          const tint = TINT[f.tint];
          const isTools = f.key === "tools";
          return (
            <RevealItem
              key={f.key}
              className={isTools ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <div className="lift flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-brand-500/[0.06]">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${tint.icon}`}
                >
                  <Icon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold tracking-tight text-ink-900">
                  {f.title}
                </h3>
                <p className="mt-1.5 max-w-md text-[0.92rem] leading-relaxed text-ink-600">
                  {f.desc}
                </p>

                {isTools ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TOOLS.map((t) => (
                      <span
                        key={t.label}
                        className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink-700 ring-1 ring-brand-500/10"
                      >
                        <Icon name={t.icon} className="h-3.5 w-3.5 text-brand-400" strokeWidth={1.8} />
                        {t.label}
                      </span>
                    ))}
                  </div>
                ) : f.chips ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {f.chips.map((c) => (
                      <span
                        key={c}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${tint.chip} ${tint.text}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </RevealItem>
          );
        })}

        {/* Closing accent tile — the gentle "more inside" modules */}
        <RevealItem>
          <a
            href="#waitlist"
            className="lift group flex h-full flex-col justify-between gap-6 rounded-card bg-gradient-to-br from-brand-500 to-brand-700 p-6 text-white shadow-card"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
              <Icon name="sparkle" className="h-6 w-6" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold tracking-tight">
                And gentle more, inside
              </h3>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-white/85">
                Read Next, Recipes &amp; Nushkhe, &ldquo;Can I…?&rdquo; safety lookups and
                Ask Veda — all in one soothing place.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold">
              Join the waitlist
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
              </svg>
            </span>
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
