import Link from "next/link";
import Thumb from "@/components/guides/Thumb";
import { getCategory, postPath, type GuidePost } from "@/lib/guides";

/* PRESERVED — the flat icon-on-gradient thumb (replaced by <Thumb />).
const THUMB: Record<string, string> = {
  brand: "from-brand-100 to-mist",
  coral: "from-coral-100 to-coral-50",
  earth: "from-earth-100 to-earth-50",
};
*/

/** A linked card for a single guide post — used on the hub and category pages. */
export default function PostCard({ post, showCategory = true }: { post: GuidePost; showCategory?: boolean }) {
  const category = getCategory(post.category);

  return (
    <article className="lift group h-full overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06]">
      <Link href={postPath(post.category, post.slug)} className="flex h-full flex-col">
        <div className="relative">
          {category ? <Thumb category={category} className="h-32" /> : null}
          {showCategory && category ? (
            <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-600 shadow-soft">
              {category.singular}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-brand-400">
            <span>{post.readingTime}</span>
          </div>
          <h3 className="mt-2 font-heading text-[1.05rem] font-bold leading-snug tracking-tight text-ink-900">
            {post.title}
          </h3>
          <p className="mt-1.5 flex-1 text-[0.9rem] leading-relaxed text-ink-600">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
            Read
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
