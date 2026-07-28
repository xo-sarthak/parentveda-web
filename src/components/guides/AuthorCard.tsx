import Link from "next/link";
import AuthorAvatar from "./AuthorAvatar";
import Icon from "@/components/brand/Icon";
import { authorPath, type Author } from "@/lib/authors";

/**
 * "About the author" — the card that closes an article.
 *
 * The whole card is the link, via a stretched overlay rather than wrapping
 * everything in an <a>: it keeps a single focusable target for keyboard and
 * screen-reader users while still letting the entire surface be clickable.
 * That means nothing inside may be interactive — the overlay sits above it.
 *
 * Together with <ArticleByline /> at the top, this is the second gateway into
 * the author's profile page.
 */
export default function AuthorCard({
  author,
  variant = "gradient",
  profileHref,
  role = "About the author",
}: {
  author: Author;
  /** The person's relationship to THIS article, not a property of the person.
      A doctor who medically reviews a piece did not write it, and saying they
      did overstates their involvement — on health content that matters. */
  role?: string;
  /** Overrides the profile link — see ArticleByline. */
  profileHref?: string;
  /**
   * "solid" drops the three-stop wash and the gradient accent rail for a flat
   * surface and one brand purple. Used by the /reads/lab layout, where the
   * house rule is a single consistent purple rather than gradients.
   */
  variant?: "gradient" | "solid";
}) {
  const solid = variant === "solid";
  const facts = [
    author.experience ? { icon: "calendar" as const, text: author.experience } : null,
    author.registration ? { icon: "shield" as const, text: author.registration } : null,
    author.languages?.length
      ? { icon: "globe" as const, text: author.languages.join(", ") }
      : null,
  ].filter(Boolean) as { icon: "calendar" | "shield" | "globe"; text: string }[];

  return (
    <section className="mt-14" aria-labelledby="about-the-author">
      <h2
        id="about-the-author"
        className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-ink-400"
      >
        {role}
      </h2>

      <div
        className={`group relative mt-5 overflow-hidden rounded-card p-6 shadow-card ring-1 ring-brand-500/10 transition-shadow duration-300 hover:shadow-float sm:p-7 ${
          solid ? "bg-surface" : "bg-gradient-to-br from-mist via-surface to-brand-50/70"
        }`}
      >
        {/* Accent rail. Flat brand purple in the solid variant; the original
            three-stop brand→coral gradient otherwise. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 left-0 w-1 ${
            solid ? "bg-brand-500" : "bg-gradient-to-b from-brand-400 via-brand-500 to-coral-400"
          }`}
        />

        <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
          <AuthorAvatar author={author} size={84} className="sm:mt-1" />

          <div className="min-w-0">
            <h3 className="font-heading text-[1.2rem] font-extrabold leading-tight tracking-[-0.01em] text-brand-800">
              {author.name}
            </h3>

            {author.credentials ? (
              <p className="mt-1 text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-brand-500">
                {author.credentials}
              </p>
            ) : null}

            <p className="mt-1.5 text-sm font-semibold text-ink-700">{author.role}</p>

            <p className="mt-3 text-pretty text-[0.95rem] leading-relaxed text-ink-600">
              {author.shortBio}
            </p>

            {facts.length ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {facts.map((f) => (
                  <li
                    key={f.text}
                    className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-ink-500"
                  >
                    <Icon name={f.icon} className="h-3.5 w-3.5 text-brand-400" />
                    {f.text}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Read more about {author.name}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </div>
        </div>

        {/* Stretched link — covers the card, keeps one accessible target. */}
        <Link
          href={profileHref ?? authorPath(author.slug)}
          className="absolute inset-0 rounded-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <span className="sr-only">Read more about {author.name}</span>
        </Link>
      </div>
    </section>
  );
}
