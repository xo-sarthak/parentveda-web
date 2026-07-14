import Link from "next/link";
import Icon from "@/components/brand/Icon";
import { categoryPath, countByCategory, type GuideCategory } from "@/lib/guides";
import { TINT } from "@/lib/ui";

/** A linked card for a category — used on the Guides hub landing.
    PRESERVED: no longer rendered (the hub now uses the compact category
    strip), but kept working against the async data layer so it stays a
    one-line revert. */
export default async function CategoryCard({ category }: { category: GuideCategory }) {
  const count = await countByCategory(category.slug);
  const tint = TINT[category.tint];

  return (
    <Link
      href={categoryPath(category.slug)}
      className="lift group flex h-full flex-col rounded-card bg-surface p-6 shadow-card ring-1 ring-brand-500/[0.06]"
    >
      <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tint.icon}`}>
        <Icon name={category.icon} className="h-6 w-6" />
      </span>
      <h2 className="mt-4 font-heading text-lg font-bold tracking-tight text-ink-900">
        {category.name}
      </h2>
      <p className="mt-1.5 flex-1 text-[0.92rem] leading-relaxed text-ink-600">
        {category.tagline}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
        {count} {count === 1 ? "piece" : "pieces"}
        <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
        </svg>
      </span>
    </Link>
  );
}
