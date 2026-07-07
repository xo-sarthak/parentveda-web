import Logo from "@/components/brand/Logo";
import NewsletterMini from "@/components/ui/NewsletterMini";
import { FOOTER_LINKS, WHATSAPP_HREF } from "@/lib/content";

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}
function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "WhatsApp", href: WHATSAPP_HREF, glyph: WhatsAppGlyph },
  { label: "Instagram", href: "#", glyph: InstagramGlyph },
  { label: "Facebook", href: "#", glyph: FacebookGlyph },
  { label: "X", href: "#", glyph: XGlyph },
];

export default function Footer() {
  return (
    <footer className="border-t border-brand-500/10 bg-mist">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-7 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo size={40} wordmarkClassName="text-[1.3rem]" />
            <p className="mt-4 text-pretty leading-relaxed text-ink-600">
              Nurturing Wisdom — aapka calm companion through every week of pregnancy.
              Bilingual, rooted, and made with love for Indian parents.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {SOCIALS.map((s) => {
                const Glyph = s.glyph;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white text-brand-600 shadow-soft ring-1 ring-brand-500/10 transition-all hover:-translate-y-0.5 hover:text-brand-500"
                  >
                    <Glyph className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>

            {/* Newsletter-only entry point (same intent as the Waitlist module) */}
            <div className="mt-7">
              <NewsletterMini />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-400">
                Explore
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.95rem] font-medium text-ink-600 transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-400">
                Company
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {["Privacy", "Terms", "Contact"].map((t) => (
                  <li key={t}>
                    <a
                      href="#"
                      className="text-[0.95rem] font-medium text-ink-600 transition-colors hover:text-brand-600"
                    >
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-brand-500/10 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ParentVeda · Made with <span className="text-coral-500">❤</span> in India.</p>
          <p className="max-w-md text-xs leading-relaxed text-ink-400 sm:text-right">
            ParentVeda offers gentle, evidence-informed guidance — not medical advice.
            Always consult your doctor.
          </p>
        </div>
      </div>
    </footer>
  );
}
