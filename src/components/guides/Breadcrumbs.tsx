import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * Visual breadcrumb trail + matching BreadcrumbList JSON-LD (drives the
 * breadcrumb rich result in Google). Pass the full trail including the
 * current page as the last crumb.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 ? <span className="text-ink-300" aria-hidden>/</span> : null}
              {last ? (
                <span className="font-semibold text-ink-700" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="font-medium text-brand-600 underline-offset-4 hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={jsonLd} />
    </nav>
  );
}
