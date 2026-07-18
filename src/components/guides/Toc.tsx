/* ============================================================
   ParentVeda — in-article Table of Contents.

   The Experience System asks for a TOC on articles over ~800 words, placed
   after Key Takeaways, using the same wording as the headings, linking
   directly to sections, and collapsible on mobile.

   Headings are derived from the Markdown body rather than authored twice,
   so the TOC can never drift out of sync with the article. H2 only, per the
   spec ("Display H2 headings by default").

   Rendered from a `[TOC]` line in the body, so the author controls where it
   sits. Built with <details>, which gives collapse-on-mobile with no client
   JavaScript — this stays a server component and the links remain crawlable.
   `sm:open` styling keeps it expanded from the small breakpoint up.

   NOTE: the spec also asks for sticky-on-desktop. That needs a two-column
   article layout, which would change every existing post, so it is
   deliberately not done here.
   ============================================================ */

import { headingSlug } from "@/lib/headings";

export type TocItem = { text: string; id: string };

/**
 * Pull H2 headings out of a Markdown body, in document order.
 *
 * Only headings BELOW the [TOC] marker are listed. A contents list exists to
 * show what is still ahead, so including the sections a reader has already
 * scrolled past (typically Quick Answer and Key Takeaways, which the
 * Experience System places above it) would just be noise.
 *
 * Ids are still assigned by walking every heading, so the numbering stays in
 * lockstep with the counter PostBody uses to stamp `id` onto each <h2>, even
 * when two headings share a slug across the marker.
 */
export function tocItems(body: string): TocItem[] {
  const items: TocItem[] = [];
  const used = new Map<string, number>();
  let past = false;
  let hasMarker = false;

  const lines = body.split("\n");
  hasMarker = lines.some((l) => /^\[toc\]$/i.test(l.trim()));

  for (const line of lines) {
    if (/^\[toc\]$/i.test(line.trim())) {
      past = true;
      continue;
    }

    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue; // "###" fails this on purpose: H2 only.

    // Strip inline emphasis so the TOC reads as plain words.
    const text = m[1].replace(/[*_`]/g, "").trim();
    if (!text) continue;

    const base = headingSlug(text);
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;

    if (!hasMarker || past) items.push({ text, id });
  }

  return items;
}

export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length < 2) return null; // A one-item contents list helps nobody.

  return (
    <details
      open
      className="group my-3 rounded-2xl bg-mist/50 p-5 ring-1 ring-brand-500/10 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-heading text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-700">
        In this article
        <svg
          className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 sm:hidden"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </summary>

      <nav aria-label="Table of contents">
        <ol className="mt-4 flex flex-col gap-2">
          {items.map((it, i) => (
            <li key={it.id} className="flex gap-3 text-[0.95rem] leading-snug">
              <span className="w-4 shrink-0 text-right text-[0.8rem] font-bold text-brand-300" aria-hidden>
                {i + 1}
              </span>
              <a
                href={`#${it.id}`}
                className="text-ink-700 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
              >
                {it.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
