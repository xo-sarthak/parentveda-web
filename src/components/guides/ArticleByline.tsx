import Link from "next/link";
import AuthorAvatar from "./AuthorAvatar";
import { authorPath, type Author } from "@/lib/authors";

/**
 * The meta row directly under an article's H1.
 *
 * Two shapes, deliberately:
 *
 *  - With a resolved Author, it becomes a real byline — headshot, linked name,
 *    credentials, professional title. This is the top-of-page half of the
 *    author gateway; the card at the end of the article is the other half.
 *  - With only a name string ("Team ParentVeda"), it renders the plain
 *    name · date · reading-time line the article had before, unchanged.
 *
 * `role` is the relationship to this specific article, not a property of the
 * person — the same author can be "Written by" on one piece and "Medically
 * reviewed by" on another.
 */
export default function ArticleByline({
  author,
  authorName,
  role = "Written by",
  date,
  dateLabel,
  readingTime,
  profileHref,
}: {
  author?: Author;
  authorName: string;
  role?: string;
  date?: string;
  dateLabel?: string;
  readingTime?: string;
  /** Overrides the profile link. Lets the layout sandbox point its byline
      at the sandbox profile (carrying ?font=) so the whole flow can be
      reviewed in one pass. Defaults to the real author page. */
  profileHref?: string;
}) {
  const meta = (
    <>
      {date && dateLabel ? <time dateTime={date}>{dateLabel}</time> : null}
      {date && dateLabel && readingTime ? (
        <span className="text-ink-300" aria-hidden>
          ·
        </span>
      ) : null}
      {readingTime ? <span>{readingTime}</span> : null}
    </>
  );

  if (!author) {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
        <span>{authorName}</span>
        {date && dateLabel ? (
          <span className="text-ink-300" aria-hidden>
            ·
          </span>
        ) : null}
        {meta}
      </div>
    );
  }

  return (
    <div className="mt-5 flex items-center gap-3.5">
      <Link href={profileHref ?? authorPath(author.slug)} aria-label={`About ${author.name}`}>
        <AuthorAvatar
          author={author}
          size={44}
          className="transition-transform duration-300 hover:scale-[1.04]"
        />
      </Link>

      <div className="min-w-0 text-sm">
        <p className="text-ink-500">
          <span className="text-ink-400">{role} </span>
          <Link
            href={profileHref ?? authorPath(author.slug)}
            className="font-semibold text-brand-700 underline-offset-[3px] hover:underline"
          >
            {author.name}
          </Link>
          {author.credentials ? (
            <span className="text-ink-400">, {author.credentials}</span>
          ) : null}
        </p>

        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.82rem] text-ink-400">
          <span>{author.role}</span>
          {(date && dateLabel) || readingTime ? (
            <span className="text-ink-300" aria-hidden>
              ·
            </span>
          ) : null}
          {meta}
        </p>
      </div>
    </div>
  );
}
