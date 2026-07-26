import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/brand/Icon";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import PostCard from "@/components/guides/PostCard";
import AuthorAvatar from "@/components/guides/AuthorAvatar";
import { getAuthorBySlug, resolveAuthor, type Author } from "@/lib/authors";
import { GUIDES_BASE, getAllPosts } from "@/lib/guides";

/* ============================================================
   /guides/lab/authors/[slug] — LAYOUT SANDBOX.

   The profile page as the sandbox renders it, so the whole journey can be
   reviewed in one pass: lab article → byline → this page.

   Reading type is now shared with the live site, so what differs here is the
   heavier profile header and the flat (gradient-free) treatment. Kept as a
   duplicate so the live author page stays prerendered and untouched while
   these are still being decided.

   Delete with the rest of /guides/lab.
   ============================================================ */

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const author = getAuthorBySlug((await params).slug);
  if (!author) return {};
  return {
    title: `${author.name} (layout preview)`,
    description: author.shortBio,
    robots: { index: false, follow: false },
  };
}

export default async function LabAuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = getAuthorBySlug((await params).slug);
  if (!author) notFound();

  const posts = (await getAllPosts()).filter((p) => resolveAuthor(p)?.slug === author.slug);
  const facts = buildFacts(author);

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Guides", href: GUIDES_BASE },
            { name: author.name, href: `/guides/lab/authors/${author.slug}` },
          ]}
        />

        {/* Flat surface, one solid brand purple on the rail — no gradient. */}
        <header className="relative mt-6 overflow-hidden rounded-card bg-surface p-7 shadow-card ring-1 ring-brand-500/10 sm:p-9">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-brand-500" />

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <AuthorAvatar author={author} size={112} />

            <div className="min-w-0">
              <p className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-500">
                ParentVeda contributor
              </p>

              {/* Heavier and larger than the live page, matching the article's
                  new heading scale. */}
              <h1 className="mt-2.5 text-balance font-display text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink-900 sm:text-[2.7rem]">
                {author.name}
              </h1>

              {author.credentials ? (
                <p className="mt-2 font-heading text-sm font-bold tracking-[0.04em] text-brand-600">
                  {author.credentials}
                </p>
              ) : null}

              <p className="mt-1.5 text-[0.98rem] font-semibold text-ink-700">{author.role}</p>
            </div>
          </div>

          {facts.length ? (
            <dl className="mt-7 grid gap-x-6 gap-y-4 border-t border-brand-500/10 pt-6 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-mist text-brand-500">
                    <Icon name={f.icon} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="font-heading text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-[0.95rem] font-semibold text-ink-800">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        <Section title="About">
          <div className="flex flex-col gap-4">
            {author.bio.map((para, i) => (
              <p key={i} className="text-pretty">
                {para}
              </p>
            ))}
          </div>
        </Section>

        {author.specialties.length ? (
          <Section title="Areas of focus">
            <ul className="flex flex-wrap gap-2.5">
              {author.specialties.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-[0.85rem] font-semibold text-brand-700 ring-1 ring-brand-500/10"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-coral-400" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {author.qualifications.length ? (
            <section>
              <SectionHeading>Qualifications</SectionHeading>
              <ol className="mt-4 flex flex-col gap-4">
                {author.qualifications.map((q) => (
                  <li key={`${q.degree}-${q.year}`} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.45rem] h-2 w-2 rounded-full bg-brand-500 ring-4 ring-brand-100"
                    />
                    <p className="font-heading text-[1rem] font-bold text-ink-900">{q.degree}</p>
                    <p className="mt-0.5 text-[0.9rem] leading-snug text-ink-500">
                      {q.institution} · {q.year}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {author.memberships.length ? (
            <section>
              <SectionHeading>Memberships</SectionHeading>
              <ul className="mt-4 flex flex-col gap-3">
                {author.memberships.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-[0.98rem] text-ink-800">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <Section title={`Articles by ${author.name}`}>
          {posts.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <p className="rounded-card bg-mist/60 px-5 py-8 text-center text-ink-500 ring-1 ring-brand-500/10">
              Published pieces from {author.name} will appear here.
            </p>
          )}
        </Section>
      </div>
    </Container>
  );
}

/* ---- small local pieces, kept out of the flow above ---- */

type Fact = { icon: "calendar" | "shield" | "globe" | "heartPulse"; label: string; value: string };

function buildFacts(author: Author): Fact[] {
  return [
    author.experience
      ? { icon: "calendar" as const, label: "Experience", value: author.experience }
      : null,
    author.registration
      ? { icon: "shield" as const, label: "Registration", value: author.registration }
      : null,
    author.languages?.length
      ? { icon: "globe" as const, label: "Speaks", value: author.languages.join(", ") }
      : null,
    author.practice
      ? { icon: "heartPulse" as const, label: "Practice", value: author.practice }
      : null,
  ].filter(Boolean) as Fact[];
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400">
      {children}
    </h2>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <SectionHeading>{title}</SectionHeading>
      <div className="mt-4">{children}</div>
    </section>
  );
}
