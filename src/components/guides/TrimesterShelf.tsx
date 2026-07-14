import Link from "next/link";
import Icon from "@/components/brand/Icon";
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
    <div className="grid gap-5 md:grid-cols-3">
      {TRIMESTERS.map((t, i) => {
        const posts = byTrimester[i];
        const tint = TINT[t.tint];

        return (
          <section
            key={t.key}
            aria-label={t.name}
            className="flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-brand-500/[0.06]"
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
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-500">{t.blurb}</p>

            <ul className="mt-4 flex flex-1 flex-col divide-y divide-brand-500/[0.07]">
              {posts.map((p) => {
                const category = bySlug.get(p.category);
                return (
                  <li key={`${p.category}/${p.slug}`}>
                    <Link
                      href={postPath(p.category, p.slug)}
                      className="group flex items-start gap-3 py-3 first:pt-1 last:pb-0"
                    >
                      <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${tint.icon}`}>
                        <Icon name={category?.icon ?? "book"} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.92rem] font-semibold leading-snug text-ink-800 transition-colors group-hover:text-brand-600">
                          {p.title}
                        </span>
                        <span className="mt-0.5 block text-[0.75rem] font-medium text-ink-400">
                          {category?.singular} · {p.readingTime}
                        </span>
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
