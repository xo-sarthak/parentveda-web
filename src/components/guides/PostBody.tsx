import Markdown, { defaultUrlTransform, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { FIGURES, FIGURE_SCHEME } from "@/components/guides/figures";
import Toc, { tocItems } from "@/components/guides/Toc";
import { headingSlug } from "@/lib/headings";

/**
 * Renders a post's Markdown body with calm, readable prose.
 *
 * Content is authored in Directus as Markdown (it was a Block[] union when
 * posts were hardcoded). The component map below reproduces the exact
 * typography the Block renderer had, so nothing shifted visually:
 *   h2 → Fraunces display heading      blockquote → serif pull-quote
 *   ul → coral dot bullets             ol → numbered brand chips
 * Plus GFM tables/strikethrough, and the callout convention documented below.
 *
 * Markdown is authored by our own team behind Directus auth, and
 * react-markdown does not render raw HTML unless rehype-raw is added — which
 * it deliberately is not. So there is no injection surface here.
 */

/* The old Block[] union had a "callout" type — the soft lavender panel used
   for the medical disclaimer. Markdown has no such node, so a blockquote whose
   text starts with a known label renders as that callout. Everything else
   stays a pull-quote.

   The Experience System names several callout kinds and warns that stacking
   them blunts their effect, so only the three the articles actually use are
   wired up:
     > Note: …       the medical disclaimer (soft lavender, unchanged)
     > Important: …  safety information that must be noticed (coral)
     > Insight: …    the one ParentVeda Insight per article (brand)  */
const CALLOUTS = [
  { prefix: /^note:\s*/i, kind: "note" as const },
  { prefix: /^important:\s*/i, kind: "important" as const },
  { prefix: /^insight:\s*/i, kind: "insight" as const },
];

/** A line containing only [TOC] is replaced by the contents list. */
const TOC_MARKER = /^\[toc\]$/i;

function blockText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(blockText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return blockText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

/**
 * How callouts present themselves.
 *
 *  "card"  — the original: a filled, rounded panel the full width of the text
 *            column. Reads as another block of the article.
 *  "aside" — a flagged pointer: no fill, a solid accent rule, an icon badge
 *            that overhangs into the margin, and extra air above and below.
 *            The point is that it should NOT look like a section the reader
 *            is meant to work through — it's an annotation on the section
 *            they're already in.
 */
export type CalloutStyle = "card" | "aside";

/* Built per render rather than shared at module scope, because the heading
   anchors and the [TOC] marker both need this specific body. */
function makeComponents(body: string, callouts: CalloutStyle = "card"): Components {
  const items = tocItems(body);

  /* Mirrors the de-duplication in tocItems so an <h2 id> always matches the
     href the contents list generated for it. H2s render in document order,
     which is what keeps the two counters in step. */
  /* "What matters most" is a summary box, not another section — see
     .takeaways-* in globals.css. The heading and its list are siblings, so the
     heading raises a flag that the next list consumes. This relies on blocks
     rendering in document order, the same assumption the heading counter below
     already makes. Any paragraph in between clears it. */
  const TAKEAWAYS_HEADING = /^(what matters most|key takeaways|the short version)$/i;
  let takeawaysNext = false;

  const used = new Map<string, number>();
  const nextHeadingId = (text: string) => {
    const base = headingSlug(text);
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };

  return {
  h2: ({ children }) => {
    const text = blockText(children).trim();
    const isTakeaways = TAKEAWAYS_HEADING.test(text);
    takeawaysNext = isTakeaways;
    return (
      <h2
        id={nextHeadingId(blockText(children))}
        className={`scroll-mt-24 font-display text-ink-900 ${
          isTakeaways ? "takeaways-heading" : "mt-3 text-[1.6rem] font-medium leading-snug tracking-[-0.01em]"
        }`}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-2 font-heading text-[1.15rem] font-bold tracking-tight text-ink-900">
      {children}
    </h3>
  ),
  p: ({ children, node }) => {
    if (TOC_MARKER.test(blockText(children).trim())) return <Toc items={items} />;

    /* Markdown wraps a lone image in a paragraph, but our figures render
       block elements (<figure>, and a grid <div> for the pathway diagram),
       which are invalid inside <p>. The browser would silently close the
       paragraph early and hydration would then mismatch. Drop the wrapper
       when the paragraph holds nothing but the image. */
    const kids = node?.children ?? [];
    const onlyImage =
      kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img";
    if (onlyImage) return <>{children}</>;

    return <p className="text-pretty text-[1.05rem] leading-relaxed text-ink-700">{children}</p>;
  },
  ul: ({ children }) => {
    const takeaways = takeawaysNext;
    takeawaysNext = false;
    return (
      <ul className={`flex flex-col gap-2.5 ${takeaways ? "takeaways-list" : ""}`}>{children}</ul>
    );
  },
  ol: ({ children }) => <ol className="flex flex-col gap-3">{children}</ol>,
  // One markup shape for both list kinds; globals.css styles .md-marker as a
  // coral dot inside ul and a numbered brand chip inside ol (CSS counter),
  // reproducing exactly what the old Block renderer drew.
  li: ({ children }) => (
    <li className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-700">
      <span className="md-marker" aria-hidden />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => {
    const text = blockText(children).trim();
    const match = CALLOUTS.find((c) => c.prefix.test(text));

    if (match) {
      const inner = text.replace(match.prefix, "");

      /* ---- "aside" presentation: a pointer, not a section ---- */
      if (callouts === "aside") {
        if (match.kind === "note") {
          // The medical disclaimer. It has to be present; it does not have to
          // compete. Quietest thing on the page.
          return (
            <p className="callout-note mt-6 border-t border-ink-100 pt-4 text-[0.85rem] leading-relaxed text-ink-400">
              {inner}
            </p>
          );
        }

        /* Important — a notice bar. Safety information that has to be
           noticed, so it takes a tint and a flat left edge: the shape of a
           warning strip, not of another paragraph. */
        if (match.kind === "important") {
          return (
            <aside
              role="note"
              className="callout-aside callout-important my-4 rounded-r-2xl border-l-4 border-coral-500 bg-coral-50/70 py-4 pl-5 pr-5"
            >
              <p className="flex items-center gap-2 font-heading text-[0.7rem] font-bold uppercase tracking-[0.16em] text-coral-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M12 8v5" />
                  <path d="M12 16.5h.01" />
                  <path d="M10.3 3.9 2.4 17.4a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                </svg>
                Important
              </p>
              <p className="mt-2 text-ink-700">{inner}</p>
            </aside>
          );
        }

        /* Insight — the opposite job. No box at all: a badge in the margin
           and the line set large in Fraunces italic, so it reads as a moment
           to pause on rather than a hazard to heed. */
        return (
          <aside className="callout-aside callout-insight relative my-5 pl-14">
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-500 ring-1 ring-brand-500/15"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2l1.6 5.9L19.5 9.5l-5.9 1.6L12 17l-1.6-5.9L4.5 9.5l5.9-1.6L12 2z" />
              </svg>
            </span>

            <p className="font-heading text-[0.78rem] font-extrabold uppercase tracking-[0.18em] text-brand-600">
              ParentVeda Insight
            </p>
            <p className="mt-2.5 font-display italic text-brand-800">{inner}</p>
          </aside>
        );
      }

      /* ---- "card" presentation: the original ---- */
      if (match.kind === "important") {
        return (
          <aside
            role="note"
            className="my-2 rounded-2xl bg-coral-50 px-5 py-4 ring-1 ring-coral-300/40"
          >
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.12em] text-coral-700">
              Important
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">{inner}</p>
          </aside>
        );
      }

      if (match.kind === "insight") {
        return (
          <aside className="my-2 rounded-2xl bg-brand-50 px-5 py-5 ring-1 ring-brand-500/15">
            <p className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.12em] text-brand-600">
              ParentVeda Insight
            </p>
            <p className="mt-2 font-display text-[1.05rem] italic leading-relaxed text-ink-800">
              {inner}
            </p>
          </aside>
        );
      }

      // "Note:" — the medical disclaimer. Unchanged from the Block[] era.
      return (
        <p className="rounded-2xl bg-mist/70 px-5 py-4 text-[0.92rem] leading-relaxed text-ink-600 ring-1 ring-brand-500/10">
          {inner}
        </p>
      );
    }

    return (
      <blockquote className="border-l-4 border-brand-200 pl-5 font-display text-xl italic leading-relaxed text-ink-700">
        {children}
      </blockquote>
    );
  },
  a: ({ children, href }) => (
    <a
      href={href}
      className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-700"
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
  // Markdown images render as a full-width, rounded figure with an optional
  // caption drawn from the image title: ![alt](src "caption"). react-markdown
  // wraps a lone image in a <p>, so the wrapper and caption are <span>s set to
  // display:block — a <figure>/<figcaption> here would be invalid inside <p>.
  img: ({ src, alt, title }) => {
    if (typeof src !== "string") return null;

    // `figure:key` renders a hand-built diagram instead of loading a file.
    if (src.startsWith(FIGURE_SCHEME)) {
      const Figure = FIGURES[src.slice(FIGURE_SCHEME.length)];
      if (!Figure) return null; // Unknown key: render nothing, never a broken image.
      return (
        <figure className="my-2">
          <div className="overflow-x-auto rounded-2xl bg-surface p-4 ring-1 ring-brand-500/10">
            <Figure />
          </div>
          {title ? (
            <figcaption className="mt-2 text-center text-[0.85rem] italic text-ink-500">
              {title}
            </figcaption>
          ) : null}
        </figure>
      );
    }

    return (
      <figure className="my-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="w-full rounded-2xl ring-1 ring-brand-500/10"
        />
        {title ? (
          <figcaption className="mt-2 text-center text-[0.85rem] italic text-ink-500">
            {title}
          </figcaption>
        ) : null}
      </figure>
    );
  },
  strong: ({ children }) => <strong className="font-bold text-ink-900">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-2 border-0 border-t border-brand-500/10" />,
  code: ({ children }) => (
    <code className="rounded-md bg-mist px-1.5 py-0.5 font-mono text-[0.88em] text-brand-700">
      {children}
    </code>
  ),
  /* Tables carry comparison content (treatment options, timelines), so they
     need to be scannable across a row. Solid brand header, generous cells, a
     zebra tint to hold the eye on a line, and the first column set in the UI
     face so the thing being compared reads as the row's label. */
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-card ring-1 ring-brand-500/10">
      <table className="w-full border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="bg-brand-600 px-5 py-3.5 font-heading text-[0.72rem] font-bold uppercase tracking-[0.1em] text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-brand-500/[0.08] px-5 py-4 align-top leading-relaxed text-ink-700 [&:first-child]:font-heading [&:first-child]:font-bold [&:first-child]:text-ink-900">
      {children}
    </td>
  ),
  tr: ({ children }) => <tr className="even:bg-mist/40">{children}</tr>,
  };
}

/* react-markdown sanitises URLs to a safe protocol list, which strips our
   `figure:` scheme to an empty src and would silently render a broken image
   instead of the diagram. Let that one scheme through and defer everything
   else to the default, so the XSS protection stays intact for real links. */
const urlTransform = (url: string): string =>
  url.startsWith(FIGURE_SCHEME) ? url : defaultUrlTransform(url);

export default function PostBody({
  body,
  callouts = "card",
}: {
  body: string;
  /** See CalloutStyle. Defaults to the original filled panels. */
  callouts?: CalloutStyle;
}) {
  return (
    <div className="md-body flex flex-col gap-5">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={makeComponents(body, callouts)}
        urlTransform={urlTransform}
      >
        {body}
      </Markdown>
    </div>
  );
}
