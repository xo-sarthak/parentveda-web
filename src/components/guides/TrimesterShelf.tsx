import Link from "next/link";
import {
  CATEGORIES,
  TRIMESTERS,
  getPostsByTrimester,
  postPath,
  type GuideCategory,
} from "@/lib/guides";
import { TINT } from "@/lib/ui";

/**
 * "Reading for where you are" — the hub's ParentVeda-specific shelf.
 *
 * Spacing note: these cards hold titles that mostly wrap to two lines, so the
 * defaults that suit a one-line list read as congested here. The row padding,
 * card padding and title leading are all deliberately looser than elsewhere —
 * three columns of two-line links need the air more than a single column does.
 * Instead of generic categories, posts are grouped by the trimester the
 * reader is actually in (the `trimester` column, or their stage tags).
 *
 * Server component: all three trimester reads plus the category lookup run
 * concurrently and resolve from one cached posts fetch.
 */
export default async function TrimesterShelf() {
  const [categories, ...byTrimester] = await Promise.all([
    CATEGORIES(),
    ...TRIMESTERS.map((t) => getPostsByTrimester(t.key)),
  ]);

  const bySlug = new Map<string, GuideCategory>(categories.map((c) => [c.slug, c]));

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TRIMESTERS.map((t, i) => {
        const posts = byTrimester[i];
        const tint = TINT[t.tint];

        return (
          <section
            key={t.key}
            aria-label={t.name}
            className="flex h-full flex-col rounded-card bg-surface p-7 shadow-card ring-1 ring-brand-500/[0.06]"
          >
            <span className={`h-1 w-10 rounded-full ${tint.dot}`} aria-hidden />
            <div className="mt-3.5 flex items-baseline justify-between gap-3">
              <h3 className="font-heading text-lg font-bold tracking-tight text-ink-900">
                {t.name}
              </h3>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide ${tint.chip} ${tint.text}`}>
                {t.weeks}
              </span>
            </div>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-500">{t.blurb}</p>

            <ul className="mt-6 flex flex-1 flex-col divide-y divide-ink-100">
              {posts.map((p) => {
                const category = bySlug.get(p.category);
                return (
                  <li key={`${p.category}/${p.slug}`}>
                    <Link
                      href={postPath(p.category, p.slug)}
                      className="group block py-5 first:pt-0 last:pb-0"
                    >
                      {/* No icon. It said "Article" and so does the line
                          directly beneath it, and at ~45px it was taking width
                          out of an already narrow column — which is what forced
                          most of these titles onto a third line. */}
                      <span className="block text-[0.95rem] font-semibold leading-[1.45] text-ink-800 transition-colors line-clamp-2 group-hover:text-brand-600">
                        {p.title}
                      </span>
                      {/* Tight to its own title, so the generous gap BETWEEN
                          items is what the eye uses to separate one link from
                          the next. Before, both gaps were about equal and the
                          list read as one block. */}
                      <span className="mt-1 block text-[0.75rem] font-medium text-ink-400">
                        <span className={tint.text}>{category?.singular}</span> · {p.readingTime}
                      </span>
                    </Link>
                  </li>
                );
              })}
              {!posts.length ? (
                <li className="py-3 text-sm text-ink-400">
                  Gentle new pieces for this stage are on their way.
                </li>
              ) : null}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
