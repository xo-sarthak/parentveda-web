import { FIGURES } from "@/components/guides/figures";
import { asset } from "@/lib/site";

/**
 * Lead visual under the article header.
 *
 * Both reference sites open with one, and both put the credit line above it,
 * right-aligned and small — the picture gets the attention, the attribution
 * stays out of the way. Ours currently has no hero at all: articles open
 * straight into body text.
 *
 * Takes either a real image (`src`, normally the post's og_image) or one of
 * the article's own inline SVG figures (`figure`), so a post without a
 * photograph can still lead with its key diagram.
 *
 * Flat presentation, per the design rule for this page: no gradient wash over
 * the image, no tinted overlay — a plain surface, a hairline brand ring.
 */
export default function ArticleHero({
  src,
  figure,
  alt,
  credit,
}: {
  src?: string;
  figure?: string;
  alt?: string;
  credit?: string;
}) {
  const Figure = figure ? FIGURES[figure] : undefined;
  if (!src && !Figure) return null;

  return (
    <figure className="mt-8">
      {credit ? (
        <figcaption className="mb-1.5 text-right text-[0.7rem] leading-none text-ink-400">
          {credit}
        </figcaption>
      ) : null}

      <div className="overflow-hidden rounded-card bg-surface ring-1 ring-brand-500/10">
        {Figure ? (
          <div className="p-5 sm:p-7">{Figure()}</div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(src as string)}
            alt={alt ?? ""}
            className="block h-auto w-full object-cover"
          />
        )}
      </div>
    </figure>
  );
}
