import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { Blob, Twinkles } from "@/components/brand/Decor";
import PhoneMock from "@/components/PhoneMock";
import WeekScreen from "@/components/AppScreen";

/**
 * Download — pre-launch "Coming soon" variant. The app isn't live yet, so the
 * store badges are inert "Coming soon" chips and the primary CTA points to the
 * waitlist. The original live-store Download section is preserved intact at
 * sections/Download.tsx (just no longer rendered) — swap back on launch.
 */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.6 2.13-3.84 2.22-3.9-1.21-1.78-3.1-2.02-3.77-2.05-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.36 1.02-4.26 2.58-1.82 3.16-.47 7.84 1.3 10.41.86 1.26 1.89 2.67 3.24 2.62 1.3-.05 1.79-.84 3.36-.84 1.57 0 2.01.84 3.39.81 1.4-.02 2.29-1.28 3.15-2.55.99-1.46 1.4-2.88 1.42-2.95-.03-.01-2.73-1.05-2.76-4.16zM14.69 4.7c.72-.87 1.2-2.08 1.07-3.28-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.59 3.03-1.46z" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M3.9 2.3c-.3.2-.5.5-.5 1v17.4c0 .5.2.8.5 1l9.3-9.7L3.9 2.3z" opacity="0.9" />
      <path fill="currentColor" d="M3.9 2.3l9.3 9.7 3.7-3.8L6.2 1.7C5.3 1.2 4.4 1.3 3.9 2.3z" opacity="0.7" />
      <path fill="currentColor" d="M16.9 8.2l-3.7 3.8 3.7 3.8 4.2-2.4c1-.6 1-1.8 0-2.4l-4.2-2.8z" opacity="0.85" />
      <path fill="currentColor" d="M3.9 21.7c.5.9 1.4 1 2.3.5l10.7-6.4-3.7-3.8L3.9 21.7z" opacity="0.6" />
    </svg>
  );
}

function ComingSoonBadge({
  glyph,
  bottom,
}: {
  glyph: React.ReactNode;
  bottom: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-ink-900/90 px-4 py-2.5 text-white/90 shadow-card">
      <span className="grid h-7 w-7 place-items-center text-white/80">{glyph}</span>
      <span className="text-left leading-none">
        <span className="block text-[0.62rem] font-medium uppercase tracking-wide text-white/55">
          Coming soon to
        </span>
        <span className="mt-1 block font-heading text-[1.05rem] font-bold leading-none">
          {bottom}
        </span>
      </span>
    </div>
  );
}

export default function DownloadComingSoon() {
  return (
    <Section
      id="download"
      className="relative overflow-hidden bg-gradient-to-b from-mist via-brand-50 to-coral-50/60 py-20 sm:py-28"
    >
      <Blob className="-left-24 top-6 h-80 w-80 bg-brand-200/40" animate />
      <Blob className="-right-20 bottom-0 h-80 w-80 bg-coral-100/50" animate />
      <Twinkles />

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        {/* copy */}
        <div className="max-w-xl">
          <Reveal>
            <Eyebrow>Almost here</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-[2.5rem] font-medium leading-[1.04] tracking-[-0.03em] text-ink-900 sm:text-[3.2rem]">
              Coming soon to your{" "}
              <span className="text-gradient italic">home screen.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md text-pretty text-[1.06rem] leading-relaxed text-ink-600">
              ParentVeda is almost ready. A calmer, more rooted pregnancy will be just a
              tap away — and the waitlist gets it first.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ComingSoonBadge glyph={<AppleGlyph className="h-6 w-6" />} bottom="App Store" />
              <ComingSoonBadge glyph={<PlayGlyph className="h-6 w-6" />} bottom="Google Play" />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-7">
              <Button href="#waitlist" size="lg">
                Join the Waitlist
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <ul className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm font-semibold text-ink-600">
              {["Free to start", "Bilingual", "Made with love for Indian parents"].map((t, i) => (
                <li key={t} className="flex items-center gap-2">
                  {i > 0 ? <span className="text-brand-300" aria-hidden>·</span> : null}
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-coral-500" aria-hidden>❤</span>
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* phone */}
        <Reveal delay={0.1} className="flex justify-center">
          <div className="animate-float-slow">
            <PhoneMock>
              <WeekScreen
                greeting="Almost there,"
                week={40}
                sizeName="Watermelon"
                sizeHi="tarbooj"
                fruit="watermelon"
                note="Any day now"
                ritual="Breathe. Aap taiyaar ho. You are ready."
                nutrition="Light, warm, easy meals — khichdi is kind."
              />
            </PhoneMock>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
