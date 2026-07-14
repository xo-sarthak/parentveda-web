import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Icon from "@/components/brand/Icon";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import FeaturedPost from "@/components/guides/FeaturedPost";
import TrimesterShelf from "@/components/guides/TrimesterShelf";
import PostCard from "@/components/guides/PostCard";
import JsonLd from "@/components/guides/JsonLd";
import {
  CATEGORIES,
  GUIDES_BASE,
  GUIDES_TAGLINE,
  categoryPath,
  getAllPosts,
} from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { TINT } from "@/lib/ui";

/* PRESERVED — the previous hub layout (uniform CategoryCard grid + flat
   "Latest reads" grid) used:
     import CategoryCard from "@/components/guides/CategoryCard";
   and rendered CATEGORIES.map(c => <CategoryCard ... />) followed by
   getFeaturedPosts(6) as an even grid. The component file is untouched. */

export const metadata: Metadata = {
  title: "Pregnancy & Parenting Guides",
  description: GUIDES_TAGLINE,
  alternates: { canonical: GUIDES_BASE },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${GUIDES_BASE}`,
    title: "Pregnancy & Parenting Guides · ParentVeda",
    description: GUIDES_TAGLINE,
  },
};

/* Live content: re-render at most once a minute so a Directus publish shows
   up without a redeploy. */
export const revalidate = 60;

export default async function GuidesHub() {
  // One posts read serves the lead story, the latest grid and the per-category
  // counts; the two reads below are independent, so run them together.
  const [posts, categories] = await Promise.all([getAllPosts(), CATEGORIES()]);

  const hero = posts[0];
  const latest = posts.slice(1, 7);

  const counts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Guides`,
    description: GUIDES_TAGLINE,
    url: `${SITE_URL}${GUIDES_BASE}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Guides", href: GUIDES_BASE }]} />

      <header className="mt-6 max-w-2xl">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-500">
          ParentVeda Guides
        </p>
        <h1 className="mt-3 text-balance font-display text-[2.3rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[2.9rem]">
          Calm, trustworthy reading for{" "}
          <em className="italic text-brand-600">every step.</em>
        </h1>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-600">
          {GUIDES_TAGLINE}
        </p>
      </header>

      {/* The lead story */}
      {hero ? (
        <section className="mt-10" aria-label="Featured guide">
          <FeaturedPost post={hero} />
        </section>
      ) : null}

      {/* Stage-aware shelf — the axis only a pregnancy library has */}
      <section className="mt-16" aria-labelledby="stage-heading">
        <h2 id="stage-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
          Reading for where you are
        </h2>
        <div className="mt-5">
          <TrimesterShelf />
        </div>
      </section>

      {/* Latest */}
      {latest.length ? (
        <section className="mt-16" aria-labelledby="latest-heading">
          <h2 id="latest-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
            Latest reads
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (
              <PostCard key={`${p.category}/${p.slug}`} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Compact category index */}
      <section className="mt-16" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
          Browse by category
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const count = counts[c.slug] ?? 0;
            return (
              <Link
                key={c.slug}
                href={categoryPath(c.slug)}
                className="lift group flex items-center gap-3 rounded-2xl bg-surface px-4 py-3.5 shadow-soft ring-1 ring-brand-500/[0.06]"
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${TINT[c.tint].icon}`}>
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.92rem] font-bold text-ink-900 transition-colors group-hover:text-brand-600">
                    {c.name}
                  </span>
                  <span className="block text-xs font-medium text-ink-400">
                    {count} {count === 1 ? "piece" : "pieces"}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Nothing published yet — better an honest, indexable page than a broken one. */}
      {!posts.length ? (
        <p className="mt-10 rounded-card bg-mist/60 px-5 py-8 text-center text-ink-500 ring-1 ring-brand-500/10">
          Gentle new pieces are on their way.
        </p>
      ) : null}

      <JsonLd data={jsonLd} />
    </Container>
  );
}
