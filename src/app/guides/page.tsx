import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import CategoryCard from "@/components/guides/CategoryCard";
import PostCard from "@/components/guides/PostCard";
import JsonLd from "@/components/guides/JsonLd";
import { CATEGORIES, GUIDES_BASE, GUIDES_TAGLINE, getFeaturedPosts } from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/site";

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

export default function GuidesHub() {
  const featured = getFeaturedPosts(6);

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
          <span className="text-gradient italic">every step.</span>
        </h1>
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-ink-600">
          {GUIDES_TAGLINE}
        </p>
      </header>

      {/* Categories */}
      <section className="mt-12" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
          Browse by category
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Latest */}
      <section className="mt-16" aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
          Latest reads
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>

      <JsonLd data={jsonLd} />
    </Container>
  );
}
