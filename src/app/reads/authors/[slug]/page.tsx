import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Icon from "@/components/brand/Icon";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import PostCard from "@/components/guides/PostCard";
import JsonLd from "@/components/guides/JsonLd";
import AuthorAvatar from "@/components/guides/AuthorAvatar";
import { AUTHORS, authorPath, getAuthorBySlug, resolveAuthor, type Author } from "@/lib/authors";
import { GUIDES_BASE, GUIDES_NAME, getAllPosts } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

/**
 * /reads/authors/[slug] — the author profile page.
 *
 * Route note: this sits *beside* /reads/[category], and Next.js resolves the
 * static "authors" segment ahead of the dynamic [category] one, so it wins.
 * The only way to break that is to create a real category with the slug
 * "authors" in Directus — don't.
 *
 * Both the byline under an article's H1 and the card at its end link here.
 * The page exists as much for Google as for readers: it is where the Person
 * schema, the credentials and the medical council registration live, which is
 * what turns a name on a page into a verifiable author for E-E-A-T purposes.
 */

/* Authors change about as often as the team does. Same ISR window as the rest
   of the hub so the article list below stays current with Directus. */
export const revalidate = 60;

/* The registry is a fixed, small list in code — an unknown slug can only be a
   bad URL, so don't render one on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const author = getAuthorBySlug((await params).slug);
  if (!author) return {};

  const canonical = authorPath(author.slug);
  const title = `${author.name} — ${author.role}`;

  return {
    title: `${author.name}${author.credentials ? `, ${author.credentials}` : ""}`,
    description: author.shortBio,
    alternates: { canonical },
    openGraph: {
      type: "profile",
      url: `${SITE_URL}${canonical}`,
      title,
      description: author.shortBio,
      images: [{ url: author.photo ?? "/parentveda-logo.jpg", alt: author.name }],
    },
    twitter: {
      card: "summary",
      title,
      description: author.shortBio,
    },
  };
}

function buildPersonSchema(author: Author, canonicalAbs: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: canonicalAbs,
    jobTitle: author.role,
    description: author.shortBio,
    honorificPrefix: "Dr.",
    ...(author.photo ? { image: `${SITE_URL}${author.photo}` } : {}),
    knowsAbout: author.specialties,
    ...(author.languages?.length ? { knowsLanguage: author.languages } : {}),
    alumniOf: [...new Set(author.qualifications.map((q) => q.institution))].map((name) => ({
      "@type": "EducationalOrganization",
      name,
    })),
    hasCredential: author.qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: q.degree,
      educationalLevel: q.degree,
      dateCreated: q.year,
      recognizedBy: { "@type": "EducationalOrganization", name: q.institution },
    })),
    memberOf: author.memberships.map((name) => ({ "@type": "Organization", name })),
    ...(author.practice
      ? { worksFor: { "@type": "MedicalBusiness", name: author.practice } }
      : {}),
    ...(author.registration ? { identifier: author.registration } : {}),
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const author = getAuthorBySlug((await params).slug);
  if (!author) notFound();

  const canonical = authorPath(author.slug);

  /* Unlisted posts are excluded here for free — getAllPosts() already drops
     them — which is correct: an unlisted preview must stay off every listing
     surface, this one included. */
  const posts = (await getAllPosts()).filter(
    (p) => resolveAuthor(p)?.slug === author.slug
  );

  const facts = [
    author.experience ? { icon: "calendar" as const, label: "Experience", value: author.experience } : null,
    author.registration ? { icon: "shield" as const, label: "Registration", value: author.registration } : null,
    author.languages?.length
      ? { icon: "globe" as const, label: "Speaks", value: author.languages.join(", ") }
      : null,
    author.practice ? { icon: "heartPulse" as const, label: "Practice", value: author.practice } : null,
  ].filter(Boolean) as { icon: "calendar" | "shield" | "globe" | "heartPulse"; label: string; value: string }[];

  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: GUIDES_NAME, href: GUIDES_BASE },
            { name: author.name, href: canonical },
          ]}
        />

        {/* ---- Profile header ---- */}
        {/* Flat surface, one solid brand purple on the rail. The original
            three-stop brand→coral gradient read as decoration rather than
            brand, so it's gone. */}
        <header className="relative mt-6 overflow-hidden rounded-card bg-surface p-7 shadow-card ring-1 ring-brand-500/10 sm:p-9">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-brand-500" />

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <AuthorAvatar author={author} size={112} />

            <div className="min-w-0">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-500">
                ParentVeda contributor
              </p>

              <h1 className="mt-2.5 text-balance font-display text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink-900 sm:text-[2.5rem]">
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
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-brand-500 shadow-soft">
                    <Icon name={f.icon} className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-400">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-[0.92rem] font-semibold text-ink-800">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        {/* ---- Bio ---- */}
        <section className="mt-12" aria-labelledby="about-heading">
          <h2
            id="about-heading"
            className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
          >
            About
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {author.bio.map((para, i) => (
              <p key={i} className="text-pretty text-[1.02rem] leading-relaxed text-ink-700">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ---- Areas of focus ---- */}
        {author.specialties.length ? (
          <section className="mt-12" aria-labelledby="focus-heading">
            <h2
              id="focus-heading"
              className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
            >
              Areas of focus
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
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
          </section>
        ) : null}

        {/* ---- Qualifications & memberships ---- */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {author.qualifications.length ? (
            <section aria-labelledby="quals-heading">
              <h2
                id="quals-heading"
                className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
              >
                Qualifications
              </h2>
              <ol className="mt-4 flex flex-col gap-4">
                {author.qualifications.map((q) => (
                  <li key={`${q.degree}-${q.year}`} className="relative pl-6">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.45rem] h-2 w-2 rounded-full bg-brand-400 ring-4 ring-brand-100"
                    />
                    <p className="font-heading text-[0.98rem] font-bold text-ink-900">
                      {q.degree}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-ink-500">
                      {q.institution} · {q.year}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {author.memberships.length ? (
            <section aria-labelledby="memberships-heading">
              <h2
                id="memberships-heading"
                className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
              >
                Memberships
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {author.memberships.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-[0.95rem] text-ink-700">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-500">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* ---- Their articles ---- */}
        <section className="mt-14" aria-labelledby="articles-heading">
          <h2
            id="articles-heading"
            className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
          >
            Articles by {author.name}
          </h2>

          {posts.length ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-card bg-mist/60 px-5 py-8 text-center text-ink-500 ring-1 ring-brand-500/10">
              Published pieces from {author.name} will appear here.
            </p>
          )}
        </section>
      </div>

      <JsonLd data={buildPersonSchema(author, `${SITE_URL}${canonical}`)} />
    </Container>
  );
}
