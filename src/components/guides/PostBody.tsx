import Markdown, { type Components } from "react-markdown";
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

/* Built per render rather than shared at module scope, because the heading
   anchors and the [TOC] marker both need this specific body. */
function makeComponents(body: string): Components {
  const items = tocItems(body);

  /* Mirrors the de-duplication in tocItems so an <h2 id> always matches the
     href the contents list generated for it. H2s render in document order,
     which is what keeps the two counters in step. */
  const used = new Map<string, number>();
  const nextHeadingId = (text: string) => {
    const base = headingSlug(text);
    const n = (used.get(base) ?? 0) + 1;
    used.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };

  return {
  h2: ({ children }) => (
    <h2
      id={nextHeadingId(blockText(children))}
      className="mt-3 scroll-mt-24 font-display text-[1.6rem] font-medium leading-snug tracking-[-0.01em] text-ink-900"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-2 font-heading text-[1.15rem] font-bold tracking-tight text-ink-900">
      {children}
    </h3>
  ),
  p: ({ children }) => {
    if (TOC_MARKER.test(blockText(children).trim())) return <Toc items={items} />;
    return <p className="text-pretty text-[1.05rem] leading-relaxed text-ink-700">{children}</p>;
  },
  ul: ({ children }) => <ul className="flex flex-col gap-2.5">{children}</ul>,
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
        <span className="my-4 block">
          <span className="block overflow-x-auto rounded-2xl bg-surface p-4 ring-1 ring-brand-500/10">
            <Figure />
          </span>
          {title ? (
            <span className="mt-2 block text-center text-[0.85rem] italic text-ink-500">{title}</span>
          ) : null}
        </span>
      );
    }

    return (
      <span className="my-3 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="w-full rounded-2xl ring-1 ring-brand-500/10"
        />
        {title ? (
          <span className="mt-2 block text-center text-[0.85rem] italic text-ink-500">
            {title}
          </span>
        ) : null}
      </span>
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
  table: ({ children }) => (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-brand-500/10">
      <table className="w-full border-collapse text-left text-[0.95rem]">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-brand-500/10 bg-mist/60 px-4 py-2.5 font-heading text-[0.8rem] font-bold uppercase tracking-wide text-ink-700">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-brand-500/[0.06] px-4 py-2.5 text-ink-700">{children}</td>
  ),
  };
}

export default function PostBody({ body }: { body: string }) {
  return (
    <div className="md-body flex flex-col gap-5">
      <Markdown remarkPlugins={[remarkGfm]} components={makeComponents(body)}>
        {body}
      </Markdown>
    </div>
  );
}
