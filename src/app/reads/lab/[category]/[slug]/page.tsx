import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/brand/Icon";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import PostBody from "@/components/guides/PostBody";
import PostCard from "@/components/guides/PostCard";
import ReadingProgress from "@/components/guides/ReadingProgress";
import ArticleByline from "@/components/guides/ArticleByline";
import AuthorCard from "@/components/guides/AuthorCard";
import { tocItems } from "@/components/guides/Toc";
import ArticleRail from "@/components/guides/lab/ArticleRail";
import ArticleHero from "@/components/guides/lab/ArticleHero";
import FaqAccordion, { type Faq } from "@/components/guides/lab/FaqAccordion";
import { headingSlug } from "@/lib/headings";
import { resolveAuthor } from "@/lib/authors";
import {
  GUIDES_BASE,
  GUIDES_NAME,
  categoryPath,
  getCategory,
  getPost,
  getRelatedPosts,
  postPath,
} from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

/* ============================================================
   /reads/lab/[category]/[slug] — LAYOUT SANDBOX.

   A second rendering of an existing post, so a change can be looked at beside
   the live article rather than argued about in the abstract. Same content,
   same Supabase row, different layout:

     /reads/article/<slug>       ← what we ship today
     /reads/lab/article/<slug>   ← this

   What's different here, and why:

     1. Sticky rail (from iMumz) — contents + share follow the reader down the
        page instead of scrolling away after the first screen. On a
        thirteen-heading article the inline TOC is useful for one screen.
     2. Share row — WhatsApp first. We had no sharing at all.
     4. Standfirst — post.description was already written and stored for the
        meta tag; it just never appeared on the page. Free.
     5. Lead visual — articles currently open straight into body text.

   Point 3 from the audit (a "Fact-checked by" line and an editorial-standards
   panel, from What to Expect) is deliberately NOT here. Articles are to be
   verified by doctors before publishing, so a separate reviewer credit would
   be describing a workflow we don't have. Revisit only if doctor review turns
   out not to be reliable and we need to show the two roles separately.

   Design rule for this page: no gradients. One brand purple, used flat and
   consistently — solid accent rails, solid card surfaces, colour carried by
   hover and by the active-section marker rather than by a wash.

   Nothing here is linked from the site and the page is noindex. Delete this
   directory once the decisions are made and folded into the real article
   route.
   ============================================================ */

export const revalidate = 60;
export const dynamicParams = true;

/* Body copy is Source Serif site-wide now (see layout.tsx) and the article
   reading styles have been promoted out of here into .md-body in globals.css,
   so this page no longer overrides type at all. What is still under review
   here is layout: the rail, the FAQ accordion and the callout treatments. */

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
const LAB_HERO_FIGURE = "ectopic-implantation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPost(category, slug);
  if (!post) return {};

  return {
    title: `${post.title} (layout preview)`,
    description: post.description,
    // A sandbox duplicate of a real article — must never be indexed, or it
    // competes with the article it is duplicating.
    robots: { index: false, follow: false },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

export default async function LabPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const labProfile = (slugName: string) => `/reads/lab/authors/${slugName}`;
  const post = await getPost(categorySlug, slug);
  if (!post) notFound();

  const category = await getCategory(post.category);
  if (!category) notFound();

  const canonical = postPath(post.category, post.slug);
  const related = await getRelatedPosts(post, 3);
  const author = resolveAuthor(post);

  /* Drop the [TOC] marker so the inline contents list doesn't render — the
     rail replaces it. Stripping it also makes tocItems() return every H2
     rather than only those below the marker, which is what a persistent rail
     wants. Heading ids are unaffected: both sides number by walking every H2
     in document order. */
  const full = post.body.replace(/^\[toc\]\s*$/gim, "");

  /* Contents come from the FULL body so the FAQ heading still appears in the
     rail. The FAQ is the last section, so removing it below leaves every
     preceding heading id untouched — and the accordion carries the matching
     id itself. */
  const items = tocItems(full);
  const { body, title: faqTitle, faqs, trailing: afterFaq } = splitFaqSection(full);

  /* Share the real article, never this sandbox URL. */
  const shareUrl = `${SITE_URL}${canonical}`;

  return (
    <Container className="py-10 sm:py-14">
      <ReadingProgress />

      {/* Body copy inherits the test typeface; anything that opts into
          font-display / font-heading (the H1, H2s, card titles) keeps
          Fraunces and Plus Jakarta as before. */}
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

          {/* Standfirst — already authored as post.description, previously only
              ever seen by crawlers. */}
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
            profileHref={author ? labProfile(author.slug) : undefined}
          />
        </header>

        <div className="max-w-3xl">
          {/* No visible caption. The alt text still rides on the <img> for
              screen readers; repeating it on screen just described the picture
              to people who can already see it. `credit` is for a real
              photographer or illustrator credit, not for alt text. */}
          <ArticleHero
            src={post.ogImage}
            figure={post.ogImage ? undefined : LAB_HERO_FIGURE}
            alt={post.ogImageAlt}
          />
        </div>

        {/* Measured against iMumz, whose scroll behaviour this follows: a 346px
            sticky rail, an 80px gutter, and a text column that FILLS the space
            it is given (790px on their page). 346 + 80 + 790 = 1216, which is
            why the container above is 1216 rather than a round number — every
            edge then lines up and the only whitespace left is symmetric page
            margin. */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[346px_minmax(0,1fr)] lg:gap-20">
          <ArticleRail items={items} shareUrl={shareUrl} shareTitle={post.title} />

          <div className="min-w-0">
            <article>
              {post.bookMeta ? (
                <div className="flex items-center gap-3 rounded-2xl bg-mist/60 px-5 py-4 ring-1 ring-brand-500/10">
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

            {faqTitle && faqs.length ? (
              <FaqAccordion title={faqTitle} faqs={faqs} id={headingSlug(faqTitle)} />
            ) : null}

            {/* Whatever followed the last question — the medical disclaimer.
                Rendered in the open, never inside a collapsed panel. */}
            {afterFaq ? (
              <div className="mt-8">
                <PostBody body={afterFaq} callouts="aside" />
              </div>
            ) : null}

            {author ? <AuthorCard
                author={author}
                variant="solid"
                role="Medically reviewed by"
                profileHref={labProfile(author.slug)}
              /> : null}

            {/* Soft CTA — flat surface, no gradient wash. */}
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
    </Container>
  );
}
