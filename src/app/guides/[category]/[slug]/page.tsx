import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/brand/Icon";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import PostBody from "@/components/guides/PostBody";
import PostCard from "@/components/guides/PostCard";
import ReadingProgress from "@/components/guides/ReadingProgress";
import JsonLd from "@/components/guides/JsonLd";
import {
  GUIDES_BASE,
  categoryPath,
  getAllPosts,
  getCategory,
  getPost,
  getRelatedPosts, // (replaces same-category getPostsByCategory for related reads)
  postPath,
  type Block,
  type GuidePost,
} from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);
  if (!post) return {};

  const canonical = postPath(post.category, post.slug);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonical}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: ["/parentveda-logo.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function isoMinutes(human?: string): string | undefined {
  if (!human) return undefined;
  const m = human.match(/(\d+)/);
  return m ? `PT${m[1]}M` : undefined;
}

function blocksToText(blocks: Block[]): string {
  return blocks
    .filter((b) => b.type !== "callout")
    .map((b) => (b.type === "ul" || b.type === "ol" ? b.items.join(" ") : "text" in b ? b.text : ""))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildJsonLd(post: GuidePost, canonicalAbs: string) {
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/parentveda-mark.png` },
  };

  if (post.category === "recipe" && post.recipe) {
    return {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Organization", name: SITE_NAME },
      image: [`${SITE_URL}/parentveda-logo.jpg`],
      prepTime: isoMinutes(post.recipe.prepTime),
      cookTime: isoMinutes(post.recipe.cookTime),
      totalTime: isoMinutes(post.recipe.totalTime),
      recipeYield: post.recipe.servings,
      recipeIngredient: post.recipe.ingredients,
      recipeInstructions: post.recipe.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: s,
      })),
    };
  }

  if (post.category === "parenting-faq") {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: post.title,
          acceptedAnswer: { "@type": "Answer", text: blocksToText(post.body) },
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalAbs },
    image: [`${SITE_URL}/parentveda-logo.jpg`],
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const post = getPost(categorySlug, slug);
  if (!post) notFound();

  const category = getCategory(post.category)!;
  const canonical = postPath(post.category, post.slug);
  /* PRESERVED — same-category related (replaced by tag-overlap getRelatedPosts):
     const related = getPostsByCategory(post.category).filter((p) => p.slug !== post.slug).slice(0, 3); */
  const related = getRelatedPosts(post, 3);
  const jsonLd = buildJsonLd(post, `${SITE_URL}${canonical}`);

  return (
    <Container className="py-10 sm:py-14">
      <ReadingProgress />
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Guides", href: GUIDES_BASE },
            { name: category.name, href: categoryPath(category.slug) },
            { name: post.title, href: canonical },
          ]}
        />

        <article className="mt-6">
          <header>
            <Link
              href={categoryPath(category.slug)}
              className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-500/10"
            >
              <Icon name={category.icon} className="h-3.5 w-3.5" />
              {category.singular}
            </Link>

            <h1 className="mt-5 text-balance font-display text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink-900 sm:text-[2.7rem]">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
              <span>{post.author}</span>
              <span className="text-ink-300" aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="text-ink-300" aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Book / research citation */}
          {post.bookMeta ? (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-mist/60 px-5 py-4 ring-1 ring-brand-500/10">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-500 shadow-soft">
                <Icon name="book" className="h-5 w-5" />
              </span>
              <p className="text-sm text-ink-600">
                Summary of <span className="font-semibold text-ink-900">{post.bookMeta.title}</span> by{" "}
                {post.bookMeta.author}.
              </p>
            </div>
          ) : null}

          {/* Recipe meta + ingredients + steps */}
          {post.recipe ? (
            <div className="mt-8 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06]">
              <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-brand-500/10 bg-mist/40 px-6 py-4 text-sm">
                {post.recipe.totalTime ? <Meta label="Total" value={post.recipe.totalTime} /> : null}
                {post.recipe.prepTime ? <Meta label="Prep" value={post.recipe.prepTime} /> : null}
                {post.recipe.cookTime ? <Meta label="Cook" value={post.recipe.cookTime} /> : null}
                {post.recipe.servings ? <Meta label="Serves" value={post.recipe.servings} /> : null}
              </div>
              <div className="grid gap-8 p-6 sm:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h2 className="font-heading text-base font-bold tracking-tight text-ink-900">Ingredients</h2>
                  <ul className="mt-3 flex flex-col gap-2">
                    {post.recipe.ingredients.map((ing) => (
                      <li key={ing} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-700">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" aria-hidden />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold tracking-tight text-ink-900">Method</h2>
                  <ol className="mt-3 flex flex-col gap-3">
                    {post.recipe.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-700">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                          {i + 1}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : null}

          {/* Body */}
          <div className="mt-8">
            <PostBody blocks={post.body} />
          </div>

          {post.source ? (
            <p className="mt-8 border-t border-brand-500/10 pt-5 text-xs leading-relaxed text-ink-400">
              <span className="font-semibold text-ink-500">Source: </span>
              {post.source.href ? (
                <a href={post.source.href} className="text-brand-600 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                  {post.source.label}
                </a>
              ) : (
                post.source.label
              )}
            </p>
          ) : null}
        </article>

        {/* Soft CTA */}
        <div className="mt-12 flex flex-col items-start gap-3 rounded-card bg-gradient-to-br from-mist via-white to-coral-50 p-7 shadow-card ring-1 ring-brand-500/10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-heading text-lg font-bold text-ink-900">Want this gentle guidance in your pocket?</p>
            <p className="mt-1 text-sm text-ink-600">ParentVeda is launching soon — join the waitlist to be first.</p>
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-btn bg-brand-500 px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600"
          >
            Join the Waitlist
          </Link>
        </div>

        {/* Related — cross-category, ranked by shared tags */}
        {related.length ? (
          <section className="mt-14" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
              Related reads
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <JsonLd data={jsonLd} />
    </Container>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex flex-col">
      <span className="text-[0.65rem] font-bold uppercase tracking-wide text-brand-400">{label}</span>
      <span className="font-semibold text-ink-800">{value}</span>
    </span>
  );
}
