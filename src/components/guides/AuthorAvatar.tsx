import { authorInitials, type Author } from "@/lib/authors";
import { asset } from "@/lib/site";

/**
 * Author headshot, with a monogram fallback.
 *
 * No photo yet is the normal case, not an error state — so the fallback is a
 * designed object (soft brand gradient, letterspaced initials) rather than a
 * grey placeholder. Drop a file in /public and set `photo` on the author to
 * swap it; nothing else changes.
 */
export default function AuthorAvatar({
  author,
  size = 48,
  className = "",
}: {
  author: Author;
  size?: number;
  className?: string;
}) {
  const ring =
    "rounded-full ring-1 ring-brand-500/15 shadow-[0_10px_26px_-14px_rgba(45,20,76,0.45)]";

  if (author.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(author.photo)}
        alt={author.name}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`shrink-0 object-cover ${ring} ${className}`}
        draggable={false}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
      className={`grid shrink-0 place-items-center bg-gradient-to-br from-brand-400 via-brand-500 to-coral-400 font-heading font-bold tracking-[0.06em] text-white ${ring} ${className}`}
    >
      {authorInitials(author.name)}
    </span>
  );
}
