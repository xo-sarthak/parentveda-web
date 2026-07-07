import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Icon from "@/components/brand/Icon";
import { LogoMark } from "@/components/brand/Logo";
import { WHATSAPP_HREF, type IconKey } from "@/lib/content";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.485 3.488" />
    </svg>
  );
}

const NUDGES: { icon: IconKey; day: string; text: string }[] = [
  { icon: "moon", day: "Monday", text: "A 2-minute breathing reset, just for you." },
  { icon: "music", day: "Wednesday", text: "Tonight's gentle raga for you & baby. 🎶" },
  { icon: "bowl", day: "Friday", text: "This week's nourishing recipe, made simple." },
];

export default function WhatsApp() {
  return (
    <Section id="whatsapp" className="py-20 sm:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-mist via-white to-brand-50 p-8 shadow-card ring-1 ring-brand-500/10 sm:p-12 lg:p-14">
          <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100/40 blur-3xl" />

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* copy */}
            <div className="max-w-lg">
              <Eyebrow>Stay close</Eyebrow>
              <h2 className="mt-5 text-balance font-display text-[2.05rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.55rem]">
                Let&apos;s stay close on{" "}
                <span className="text-gradient italic">WhatsApp.</span>
              </h2>
              <p className="mt-4 text-pretty text-[1.04rem] leading-relaxed text-ink-600">
                Get gentle weekly nudges and ask us anything — right inside WhatsApp.
                Calm reminders, never noise.
              </p>

              <div className="mt-7">
                <Button
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsAppGlyph className="h-5 w-5" />}
                >
                  Chat with us on WhatsApp
                </Button>
                <p className="mt-3 text-xs text-ink-400">
                  Opt in any time · leave any time · always gentle.
                </p>
                <p className="mt-1 text-xs text-ink-400">
                  Tiny nudges through the week here — the longer weekly read comes by{" "}
                  <a href="#waitlist" className="font-semibold text-brand-500 underline-offset-2 hover:underline">
                    email
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* nudge preview (on-brand lavender) */}
            <div className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-3xl bg-white shadow-float ring-1 ring-brand-500/10">
                <div className="flex items-center gap-3 border-b border-brand-500/10 px-4 py-3.5">
                  <LogoMark size={34} />
                  <div className="flex-1">
                    <p className="text-sm font-extrabold text-ink-900">ParentVeda</p>
                    <p className="text-xs text-ink-400">Weekly nudges</p>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-wa/10 text-wa">
                    <WhatsAppGlyph className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 bg-mist/40 px-4 py-5">
                  {NUDGES.map((n) => (
                    <div
                      key={n.day}
                      className="flex items-start gap-3 rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-soft ring-1 ring-brand-500/10"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-500">
                        <Icon name={n.icon} className="h-5 w-5" />
                      </span>
                      <p className="text-[0.85rem] leading-snug text-ink-700">
                        <span className="font-bold text-brand-600">{n.day}: </span>
                        {n.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
