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
import ArticleByline from "@/components/guides/ArticleByline";
import AuthorCard from "@/components/guides/AuthorCard";
import { tocItems } from "@/components/guides/Toc";
import ArticleRail from "@/components/guides/ArticleRail";
import ArticleHero from "@/components/guides/ArticleHero";
import FaqAccordion, { type Faq } from "@/components/guides/FaqAccordion";
import { headingSlug } from "@/lib/headings";
import { authorPath, resolveAuthor, type Author } from "@/lib/authors";
import {
  GUIDES_BASE,
  GUIDES_NAME,
  categoryPath,
  getAllPosts,
  getCategory,
  getPost,
  getRelatedPosts,
  isUnlisted,
  postPath,
  type GuidePost,
} from "@/lib/guides";
import { SITE_URL, SITE_NAME } from "@/lib/site";

/* Content is live: re-render at most once a minute so a Directus publish
   appears without a redeploy. (Valid here — `revalidate` is only removed
   under the Cache Components flag, which this project doesn't enable.) */
export const revalidate = 60;

/* Was `false` while content was hardcoded. Now `true`: a post published in
   Directus AFTER the last build must still render, on-demand, instead of
   404ing until someone redeploys. Unknown slugs still 404 via notFound(). */
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  if (!post) return {};

  // Authored overrides win; otherwise fall back to exactly what we had before.
  const canonical = post.canonicalPath ?? postPath(post.category, post.slug);
  const ogImage = post.ogImage ?? "/parentveda-logo.jpg";

  return {
    title: post.metaTitle ?? post.title,
    description: post.description,
    keywords: post.tags,
    // An unlisted post is a review link, not content we want ranked. Keep it
    // out of the index even though the URL itself is reachable.
    ...(isUnlisted(post) ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonical}`,
      title: post.metaTitle ?? post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogImage, ...(post.ogImageAlt ? { alt: post.ogImageAlt } : {}) }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle ?? post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

/**
 * Lift the FAQ section out of the Markdown so it can render as an accordion.
 *
 * Returns the body with that section removed, plus its heading, the
 * question/answer pairs with their answers left as raw Markdown (so links,
 * lists and emphasis inside an answer still render), and any `trailing`
 * content that followed the last question.
 *
 * That last part matters: in this article the medical disclaimer is a
 * `> Note:` callout sitting after the final question with no heading between
 * them. Treated naively it becomes part of the last answer — which would bury
 * a medical disclaimer inside a collapsed panel. Callouts are article
 * furniture, never answer content, so one starting after a question ends the
 * FAQ and everything from there is returned to be rendered in the open.
 */
function splitFaqSection(md: string): {
  body: string;
  title: string | null;
  faqs: Faq[];
  trailing: string;
} {
  const lines = md.split("\n");
  const isFaqHeading = (line: string) => {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) return false;
    return /common questions|frequently asked|faqs?$/i.test(m[1].replace(/[*_`]/g, "").trim());
  };

  const start = lines.findIndex(isFaqHeading);
  if (start === -1) return { body: md, title: null, faqs: [], trailing: "" };

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i])) {
      end = i;
      break;
    }
  }

  const title = lines[start].replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
  const faqs: Faq[] = [];
  let q: string | null = null;
  let a: string[] = [];
  const flush = () => {
    const answer = a.join("\n").trim();
    if (q && answer) faqs.push({ q, a: answer });
    q = null;
    a = [];
  };

  const trailing: string[] = [];
  let inTrailing = false;

  for (const line of lines.slice(start + 1, end)) {
    if (inTrailing) {
      trailing.push(line);
      continue;
    }

    // A callout opening after a question closes the FAQ — see the note above.
    if (q && /^>\s*(note|important|insight):/i.test(line.trim())) {
      flush();
      inTrailing = true;
      trailing.push(line);
      continue;
    }

    const m = /^###\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      q = m[1].replace(/[*_`]/g, "").trim();
      continue;
    }
    if (q) a.push(line);
  }
  flush();

  return {
    body: [...lines.slice(0, start), ...lines.slice(end)].join("\n"),
    title,
    faqs,
    trailing: trailing.join("\n").trim(),
  };
}

/* A stand-in lead visual, only because this post has no og_image set in
   Directus. It reuses the article's own implantation diagram purely so the
   hero layout can be judged — note it therefore appears twice on this page.
   In production this slot takes post.ogImage; set og_image on the post and
   delete this. */

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

/* JSON-LD wants the answer as plain text. The body is Markdown now, so strip
   the syntax rather than walking Block[]. */
function markdownToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^>\s?note:.*$/gim, " ") // callouts (the disclaimer) aren't the answer
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[>\-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Pull Q&A pairs out of the article's own FAQ section so the schema can never
   drift from what the page actually shows. Each H3 inside the "Common
   questions" H2 is a question; the prose under it is the answer. */
function extractFaqs(body: string): { q: string; a: string }[] {
  const faqs: { q: string; a: string }[] = [];
  let inFaqs = false;
  let question: string | null = null;
  let answer: string[] = [];

  const flush = () => {
    const text = markdownToText(answer.join(" "));
    if (question && text) faqs.push({ q: question, a: text });
    question = null;
    answer = [];
  };

  for (const line of body.split("\n")) {
    const h2 = /^##\s+(.+?)\s*$/.exec(line);
    if (h2) {
      flush();
      inFaqs = /common questions|frequently asked|faqs?$/i.test(h2[1].replace(/[*_`]/g, ""));
      continue;
    }
    if (!inFaqs) continue;

    const h3 = /^###\s+(.+?)\s*$/.exec(line);
    if (h3) {
      flush();
      question = h3[1].replace(/[*_`]/g, "").trim();
      continue;
    }
    if (question) answer.push(line);
  }
  flush();

  return faqs;
}

function buildFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function buildJsonLd(
  post: GuidePost,
  canonicalAbs: string,
  ogImageAbs: string,
  author?: Author
) {
  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/parentveda-mark.png` },
  };

  if (post.category === "recipes" && post.recipe) {
    return {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: post.title,
      description: post.description,
      datePublished: post.date,
      author: { "@type": "Organization", name: SITE_NAME },
      image: [ogImageAbs],
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
          acceptedAnswer: { "@type": "Answer", text: markdownToText(post.body) },
        },
      ],
    };
  }

  /* A credentialed Person with a crawlable URL is worth far more on YMYL
     health content than an Organization name — but it has to say the same
     thing the page says. The page credits Dr. Mahender Singh as REVIEWER
     ("Medically reviewed by"), so claiming him as `author` in the structured
     data asserted something the visible byline never did. On medical content
     the author/reviewer distinction is precisely what Google weighs, and
     getting it wrong is worse than omitting the person entirely.
     `reviewedBy` and `lastReviewed` belong to MedicalWebPage, not Article,
     which is why the node carries both types. */
  const reviewer = author
    ? {
        "@type": "Person",
        name: author.name,
        url: `${SITE_URL}${authorPath(author.slug)}`,
        jobTitle: author.role,
        ...(author.specialties.length ? { knowsAbout: author.specialties } : {}),
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@type": reviewer ? ["Article", "MedicalWebPage"] : "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    /* Nobody is credited as the writer on the page, so the publisher is the
       honest author. Posts still bylined "Team ParentVeda" keep that name —
       their byline shows no reviewer role at all (see ArticleByline). */
    author: reviewer
      ? { "@type": "Organization", name: SITE_NAME, url: SITE_URL }
      : { "@type": "Organization", name: post.author },
    ...(reviewer ? { reviewedBy: reviewer, lastReviewed: post.updated ?? post.date } : {}),
    publisher,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalAbs },
    image: [ogImageAbs],
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const post = await getPost(categorySlug, slug);
  if (!post) notFound();

  const category = await getCategory(post.category);
  if (!category) notFound();

  const canonical = post.canonicalPath ?? postPath(post.category, post.slug);
  const related = await getRelatedPosts(post, 3);
  const ogImage = post.ogImage ?? "/parentveda-logo.jpg";
  const ogImageAbs = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;
  const author = resolveAuthor(post);
  const baseJsonLd = buildJsonLd(post, `${SITE_URL}${canonical}`, ogImageAbs, author);

  /* An article with its own FAQ section gets FAQPage alongside Article. The
     parenting-faq category is skipped: buildJsonLd already returns FAQPage
     for it, and two FAQPage blocks on one URL would compete. */
  const faqs = post.category === "parenting-faq" ? [] : extractFaqs(post.body);
  const jsonLd = faqs.length >= 2 ? [baseJsonLd, buildFaqSchema(faqs)] : baseJsonLd;

  /* Drop the [TOC] marker: the sticky rail replaces the inline contents list,
     and removing it makes tocItems() return every H2 rather than only those
     below the marker, which is what a persistent rail wants. */
  const full = post.body.replace(/^\[toc\]\s*$/gim, "");
  const items = tocItems(full);
  const { body, title: faqTitle, faqs: faqItems, trailing: afterFaq } = splitFaqSection(full);
  const shareUrl = `${SITE_URL}${canonical}`;

  return (
    <Container className="py-10 sm:py-14">
      <ReadingProgress />
      <div className="mx-auto max-w-[1216px]">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: GUIDES_NAME, href: GUIDES_BASE },
            { name: category.name, href: categoryPath(category.slug) },
            { name: post.title, href: canonical },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <Link
            href={categoryPath(category.slug)}
            className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-500/10"
          >
            <Icon name={category.icon} className="h-3.5 w-3.5" />
            {category.singular}
          </Link>

          <h1 className="mt-5 text-balance font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[3rem]">
            {post.title}
          </h1>

          {post.description ? (
            <p className="mt-4 text-pretty text-[1.15rem] leading-relaxed text-ink-500 sm:text-[1.22rem]">
              {post.description}
            </p>
          ) : null}

          <ArticleByline
            author={author}
            authorName={post.author}
            role="Medically reviewed by"
            date={post.date || undefined}
            dateLabel={post.date ? formatDate(post.date) : undefined}
            readingTime={post.readingTime || undefined}
          />
        </header>

        <div className="max-w-3xl">
          <ArticleHero src={post.ogImage} alt={post.ogImageAlt} />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[346px_minmax(0,1fr)] lg:gap-20">
          <ArticleRail items={items} shareUrl={shareUrl} shareTitle={post.title} />

          <div className="min-w-0">
            <article>
              {post.bookMeta ? (
                <div className="mb-8 flex items-center gap-3 rounded-2xl bg-mist/60 px-5 py-4 ring-1 ring-brand-500/10">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-500 shadow-soft">
                    <Icon name="book" className="h-5 w-5" />
                  </span>
                  <p className="text-sm text-ink-600">
                    Summary of{" "}
                    <span className="font-semibold text-ink-900">{post.bookMeta.title}</span> by{" "}
                    {post.bookMeta.author}.
                  </p>
                </div>
              ) : null}

              {post.recipe ? (
                <div className="mb-8 overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06]">
                  <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-brand-500/10 bg-mist/40 px-6 py-4 text-sm">
                    {post.recipe.totalTime ? <Meta label="Total" value={post.recipe.totalTime} /> : null}
                    {post.recipe.prepTime ? <Meta label="Prep" value={post.recipe.prepTime} /> : null}
                    {post.recipe.cookTime ? <Meta label="Cook" value={post.recipe.cookTime} /> : null}
                    {post.recipe.servings ? <Meta label="Serves" value={post.recipe.servings} /> : null}
                  </div>
                  <div className="grid gap-8 p-6 sm:grid-cols-[0.9fr_1.1fr]">
                    <div>
                      <h2 className="font-heading text-base font-bold tracking-tight text-ink-900">
                        Ingredients
                      </h2>
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
                      <h2 className="font-heading text-base font-bold tracking-tight text-ink-900">
                        Method
                      </h2>
                      <ol className="mt-3 flex flex-col gap-3">
                        {post.recipe.steps.map((st, i) => (
                          <li key={i} className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-700">
                            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                              {i + 1}
                            </span>
                            {st}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ) : null}

              <PostBody body={body} callouts="aside" />

              {post.source ? (
                <p className="mt-8 border-t border-brand-500/10 pt-5 text-xs leading-relaxed text-ink-400">
                  <span className="font-semibold text-ink-500">Source: </span>
                  {post.source.href ? (
                    <a
                      href={post.source.href}
                      className="text-brand-600 underline-offset-4 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.source.label}
                    </a>
                  ) : (
                    post.source.label
                  )}
                </p>
              ) : null}
            </article>

            {faqTitle && faqItems.length ? (
              <FaqAccordion title={faqTitle} faqs={faqItems} id={headingSlug(faqTitle)} />
            ) : null}

            {/* Whatever followed the last question — the medical disclaimer.
                Rendered in the open, never inside a collapsed panel. */}
            {afterFaq ? (
              <div className="mt-8">
                <PostBody body={afterFaq} callouts="aside" />
              </div>
            ) : null}

            {author ? <AuthorCard author={author} role="Medically reviewed by" /> : null}

            <div className="mt-12 flex flex-col items-start gap-3 rounded-card bg-mist/70 p-7 shadow-card ring-1 ring-brand-500/10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-heading text-lg font-bold text-ink-900">
                  Want this gentle guidance in your pocket?
                </p>
                <p className="mt-1 text-sm text-ink-600">
                  ParentVeda is launching soon. Join the waitlist to be first.
                </p>
              </div>
              <Link
                href="/#waitlist"
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-btn bg-brand-500 px-6 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600"
              >
                Join the Waitlist
              </Link>
            </div>

            {related.length ? (
              <section className="mt-14" aria-labelledby="related-heading">
                <h2
                  id="related-heading"
                  className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
                >
                  Related reads
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {related.map((p) => (
                    <PostCard key={p.slug} post={p} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
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
