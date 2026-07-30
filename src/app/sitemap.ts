import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LEGAL_BASE, LEGAL_PAGES, legalPath } from "@/lib/legal";
import {
  CATEGORIES,
  GUIDES_BASE,
  categoryPath,
  getAllPosts,
  postPath,
} from "@/lib/guides";

/* Live content: regenerate on the same cadence as the guide pages, so a post
   published in Directus is submitted to search engines within the minute.
   (Was `dynamic = "force-static"` for the `output: 'export'` build.) */
export const revalidate = 60;

/* The site runs `trailingSlash: true`, so /reads/articles 308s to
   /reads/articles/ and the canonical tag on the page carries the slash. A
   sitemap listing the slash-less form therefore submits 25 URLs that all
   redirect to the ones we actually want indexed — Search Console flags it,
   and it spends crawl budget confirming what the canonical already said.
   The path helpers omit the slash because Link and the router handle it;
   only the absolute URLs we hand to crawlers need it added back. */
const abs = (path: string) =>
  `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, categories] = await Promise.all([getAllPosts(), CATEGORIES()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs(GUIDES_BASE), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    /* Policies are low-priority but should be indexable: an app store review,
       a partner or a reader may need to find them without a link. */
    { url: abs(LEGAL_BASE), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ...LEGAL_PAGES.map((p) => ({
      url: abs(legalPath(p.slug)),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: abs(categoryPath(c.slug)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: abs(p.canonicalPath ?? postPath(p.category, p.slug)),
    lastModified: p.updated ?? p.date ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
