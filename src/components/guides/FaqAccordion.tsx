import PostBody from "@/components/guides/PostBody";

export type Faq = { q: string; a: string };

/**
 * Collapsed FAQ, modelled on What to Expect's.
 *
 * Theirs is a coloured header bar over a list of question rows that open on
 * click. The win over our current flat H3-and-prose is scanning: thirteen
 * screens of answers become one screen of questions, and the reader opens the
 * one that is actually theirs.
 *
 * Built on <details>, so it works with no JavaScript, the answers stay in the
 * HTML for crawlers, and the FAQPage schema the article already emits still
 * matches what's on the page. Open/close is animated in CSS via
 * ::details-content — see .faq-item in globals.css.
 *
 * WTE's header bar is a purple gradient; ours is one flat brand purple, per
 * the design rule for this route.
 */
export default function FaqAccordion({
  title,
  faqs,
  id,
}: {
  title: string;
  faqs: Faq[];
  id?: string;
}) {
  if (!faqs.length) return null;

  return (
    <section className="mt-14 overflow-hidden rounded-card ring-1 ring-brand-500/10">
      <h2
        id={id}
        className="scroll-mt-24 bg-brand-600 px-6 py-5 font-heading text-[1.35rem] font-extrabold leading-tight tracking-[-0.01em] text-white sm:text-[1.5rem]"
      >
        {title}
      </h2>

      <div className="bg-surface">
        {faqs.map((f, i) => (
          <details
            key={f.q}
            className={`faq-item group px-6 [&_summary::-webkit-details-marker]:hidden ${
              i > 0 ? "border-t border-ink-100" : ""
            }`}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
              <span className="font-heading text-[1.02rem] font-bold leading-snug text-ink-900 transition-colors group-hover:text-brand-700">
                {f.q}
              </span>
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-brand-600 transition-transform duration-300 group-open:rotate-180"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </span>
            </summary>

            <div className="pb-6 pr-10">
              <PostBody body={f.a} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
