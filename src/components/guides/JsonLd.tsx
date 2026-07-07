/**
 * Renders a JSON-LD structured-data block. Used for Article / Recipe /
 * FAQPage / BreadcrumbList schemas so search engines can show rich results.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is trusted, build-time content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
