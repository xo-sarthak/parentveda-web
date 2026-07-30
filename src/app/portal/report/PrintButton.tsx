"use client";

/**
 * The only client component on the report.
 *
 * `window.print()` needs a browser, which is the whole reason this is split out
 * rather than the page being a client component: everything else on the report
 * is server-rendered, so the figures never travel to the browser as data — only
 * as the finished HTML someone reads.
 */
export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-xl bg-brand-500 px-4 py-2.5 font-jakarta text-sm font-bold text-white transition hover:bg-brand-600"
    >
      Print or save as PDF
    </button>
  );
}
