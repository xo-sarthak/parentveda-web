import Link from "next/link";
import Icon from "@/components/brand/Icon";
import Thumb from "@/components/guides/Thumb";
import { getCategory, postPath, type GuidePost } from "@/lib/guides";

/**
 * The hub's editorial opener — one lead story at full width, serif title,
 * with the crafted Thumb as its cover panel. Gives the hub a front page
 * instead of a uniform grid.
 */
export default async function FeaturedPost({ post }: { post: GuidePost }) {
  const category = await getCategory(post.category);
  if (!category) return null;

  return (
    <Link
      href={postPath(post.category, post.slug)}
      className="lift group block overflow-hidden rounded-xl2 bg-surface shadow-card ring-1 ring-brand-500/[0.06]"
    >
      <article className="grid md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
          <p className="flex items-center gap-2.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-coral-400" aria-hidden />
            Featured · {category.singular}
          </p>

          <h2 className="mt-4 text-balance font-display text-[1.65rem] font-medium leading-[1.14] tracking-[-0.02em] text-ink-900 transition-colors duration-300 group-hover:text-brand-700 sm:text-[2.05rem]">
            {post.title}
          </h2>

          <p className="mt-3.5 max-w-xl text-pretty text-[0.98rem] leading-relaxed text-ink-600">
            {post.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            <span>{post.author}</span>
            <span className="text-ink-300" aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
            Read the full piece
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </span>
        </div>

        <div className="relative min-h-[200px] md:min-h-0">
          <Thumb category={category} className="absolute inset-0" />
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-wide text-brand-700 shadow-soft backdrop-blur">
            <Icon name={category.icon} className="h-3.5 w-3.5" />
            {category.singular}
          </span>
        </div>
      </article>
    </Link>
  );
}
