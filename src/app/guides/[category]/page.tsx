import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import PostCard from "@/components/guides/PostCard";
import JsonLd from "@/components/guides/JsonLd";
import {
  CATEGORIES,
  GUIDES_BASE,
  categoryPath,
  getCategory,
  getPostsByCategory,
} from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

/* Live content: re-render at most once a minute so a Directus publish shows
   up without a redeploy. */
export const revalidate = 60;

/* Categories are a small, stable set authored in Directus. `true` means a
   category added after the last build still renders instead of 404ing;
   an unknown slug still 404s via notFound() below, so no soft 404s. */
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await CATEGORIES();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = await getCategory(categorySlug);
  if (!category) return {};

  const canonical = categoryPath(category.slug);
  return {
    title: `${category.name} — Pregnancy & Parenting`,
    description: category.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: `${SITE_URL}${canonical}`,
      title: `${category.name} · ParentVeda Guides`,
      description: category.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = await getCategory(categorySlug);
  if (!category) notFound();

  const posts = await getPostsByCategory(category.slug);
  const canonical = categoryPath(category.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} — ParentVeda Guides`,
    description: category.description,
    url: `${SITE_URL}${canonical}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}${GUIDES_BASE}/${p.category}/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        trail={[
          { name: "Home", href: "/" },
          { name: "Guides", href: GUIDES_BASE },
          { name: category.name, href: canonical },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <h1 className="text-balance font-display text-[2.2rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[2.7rem]">
          {category.name}
        </h1>
        <p className="mt-3 text-pretty text-[1.05rem] leading-relaxed text-ink-600">
          {category.tagline}
        </p>
      </header>

      {posts.length ? (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} showCategory={false} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-card bg-mist/60 px-5 py-8 text-center text-ink-500 ring-1 ring-brand-500/10">
          Gentle new pieces are on their way to this section.
        </p>
      )}

      <JsonLd data={jsonLd} />
    </Container>
  );
}
