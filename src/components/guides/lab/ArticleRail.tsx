"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/components/guides/Toc";
import ShareArticle from "./ShareArticle";

/**
 * Sticky article rail — contents + share.
 *
 * The idea is borrowed from iMumz: a contents list that follows you down the
 * page instead of scrolling away after the first screen, with the section
 * you're currently reading marked. On a thirteen-heading article like this
 * one, an inline TOC is useful for about four seconds; this stays useful for
 * the whole read.
 *
 * Below `lg` it sits in normal flow above the body and collapses, so phones
 * don't lose a screen of height to it.
 *
 * Active section is tracked with a scroll listener rather than an
 * IntersectionObserver: with ~13 headings the cost is trivial, and "the last
 * heading whose top has passed the header" is exactly the rule we want, which
 * is fiddly to express as observer margins.
 */

const HEADER_OFFSET = 110; // px — sticky nav + a little breathing room

export default function ArticleRail({
  items,
  shareUrl,
  shareTitle,
}: {
  items: TocItem[];
  shareUrl: string;
  shareTitle: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!items.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id ?? null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= HEADER_OFFSET) current = it.id;
        else break;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  /* Keep the active entry visible when the list is taller than its box.
     Adjusts the container's own scrollTop rather than calling scrollIntoView,
     which would also yank the page. */
  useEffect(() => {
    const list = listRef.current;
    if (!list || !activeId) return;
    const el = list.querySelector<HTMLElement>(`[data-id="${CSS.escape(activeId)}"]`);
    if (!el) return;

    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top - 8;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight + 8;
  }, [activeId]);

  if (!items.length) return null;

  return (
    /* `self-start` is load-bearing, not decoration.
       This is a grid item, and grid items stretch to fill their row by
       default — so without it the aside is as tall as the whole article and
       `sticky` has no range to move within. It then behaves exactly like a
       static block and scrolls away, which looks like sticky "not working".
       Sized to its contents, it pins under the header for the whole read. */
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <details
        open
        className="group rounded-card bg-surface p-5 ring-1 ring-brand-500/10 [&_summary::-webkit-details-marker]:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-heading text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand-700 lg:cursor-default">
          In this article
          <svg
            className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180 lg:hidden"
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
          <ol
            ref={listRef}
            className="mt-4 max-h-[min(60vh,26rem)] overflow-y-auto border-l border-brand-100 pr-1"
          >
            {items.map((it) => {
              const active = it.id === activeId;
              return (
                <li key={it.id} data-id={it.id} className="relative">
                  <a
                    href={`#${it.id}`}
                    aria-current={active ? "true" : undefined}
                    className={`block py-2 pl-4 pr-2 text-[0.86rem] leading-snug transition-colors ${
                      active
                        ? "font-semibold text-brand-700"
                        : "text-ink-500 hover:text-brand-600"
                    }`}
                  >
                    {/* Flat marker, no gradient — the rule fills solid brand
                        purple for the section being read and stays quiet
                        otherwise. */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-[-1px] top-1 h-[calc(100%-0.5rem)] w-[2px] rounded-full transition-colors ${
                        active ? "bg-brand-500" : "bg-transparent"
                      }`}
                    />
                    {it.text}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </details>

      <div className="mt-6 px-1">
        <ShareArticle url={shareUrl} title={shareTitle} />
      </div>

    </aside>
  );
}
