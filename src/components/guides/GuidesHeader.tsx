import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { CATEGORIES, GUIDES_BASE, categoryPath } from "@/lib/guides";

/**
 * Slim header for the Guides hub. Unlike the landing Navbar (which uses
 * same-page hash anchors), this links across real routes, so the logo goes
 * home and the category links are crawlable internal links (good for SEO).
 */
export default async function GuidesHeader() {
  const categories = await CATEGORIES();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-500/10 glass">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-8">
        <div className="flex h-[68px] items-center justify-between gap-4">
          <Link href="/" aria-label="ParentVeda — home" className="rounded-xl">
            <Logo size={34} wordmarkClassName="text-[1.15rem]" />
          </Link>

          <nav aria-label="Guide categories" className="hidden items-center gap-1 lg:flex">
            <Link
              href={GUIDES_BASE}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-600 transition-colors hover:text-brand-600"
            >
              All Guides
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={categoryPath(c.slug)}
                className="rounded-full px-3 py-2 text-sm font-semibold text-ink-600 transition-colors hover:text-brand-600"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/#waitlist"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-btn bg-brand-500 px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600"
          >
            Join the Waitlist
          </Link>
        </div>

        {/* Mobile: horizontally scrollable category rail */}
        <nav aria-label="Guide categories" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 pb-2.5 lg:hidden">
          <Link
            href={GUIDES_BASE}
            className="shrink-0 rounded-full bg-mist px-3 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-500/10"
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={categoryPath(c.slug)}
              className="shrink-0 rounded-full bg-mist px-3 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-500/10"
            >
              {c.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
