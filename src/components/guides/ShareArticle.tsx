"use client";

import { useState } from "react";

/**
 * Share row for the article rail.
 *
 * WhatsApp is first and deliberately so — for an Indian pregnancy audience it
 * is how this content actually travels. Neither reference site offers it.
 *
 * The share URL is the post's canonical, not window.location, so a link shared
 * from localhost or a preview deploy still points at the real article.
 *
 * Colour rule for this page: no gradients. One brand purple, used flat, with
 * hover carrying the emphasis instead of a fill.
 */

type Target = {
  key: string;
  label: string;
  href: (url: string, title: string) => string;
  icon: React.ReactNode;
};

const TARGETS: Target[] = [
  {
    key: "whatsapp",
    label: "Share on WhatsApp",
    href: (u, t) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
    icon: (
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-.98.23-3.3-.69-2.78-1.1-4.55-3.93-4.69-4.11-.14-.18-1.12-1.49-1.12-2.84s.71-2.02.96-2.29c.25-.28.55-.35.73-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.24.55.8 1.9.87 2.04.07.14.12.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.69-.81.88-1.09.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.28.14.46.21.53.32.07.12.07.65-.17 1.33z" />
    ),
  },
  {
    key: "x",
    label: "Share on X",
    href: (u, t) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(u)}`,
    icon: (
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.08l-4.76-6.22L5.46 21H2.44l7.06-8.07L2.25 3h6.24l4.3 5.69L17.53 3zm-1.06 16.17h1.67L7.6 4.74H5.81l10.66 14.43z" />
    ),
  },
  {
    key: "linkedin",
    label: "Share on LinkedIn",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u)}`,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.8v1.64h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.66c0-1.35-.02-3.08-1.9-3.08-1.9 0-2.19 1.46-2.19 2.98V21h-4V9z" />
    ),
  },
  {
    key: "facebook",
    label: "Share on Facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`,
    icon: (
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    ),
  },
];

export default function ShareArticle({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked (insecure origin, denied permission) — the share
         links still work, so fail quietly rather than throwing an error at
         someone who just wanted to send this to their sister. */
    }
  }

  return (
    <div>
      <p className="font-heading text-[0.72rem] font-bold uppercase tracking-[0.14em] text-ink-400">
        Share this
      </p>

      <div className="mt-3 flex items-center gap-2">
        {TARGETS.map((t) => (
          <a
            key={t.key}
            href={t.href(url, title)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.label}
            title={t.label}
            className="grid h-9 w-9 place-items-center rounded-full bg-mist text-brand-600 ring-1 ring-brand-500/10 transition-colors hover:bg-brand-500 hover:text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              {t.icon}
            </svg>
          </a>
        ))}

        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          title={copied ? "Link copied" : "Copy link"}
          className="grid h-9 w-9 place-items-center rounded-full bg-mist text-brand-600 ring-1 ring-brand-500/10 transition-colors hover:bg-brand-500 hover:text-white"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.5 4.5" />
              <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.32-1.32" />
            </svg>
          )}
        </button>
      </div>

      <p
        aria-live="polite"
        className={`mt-2 text-[0.75rem] font-medium text-brand-600 transition-opacity duration-200 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Link copied
      </p>
    </div>
  );
}
