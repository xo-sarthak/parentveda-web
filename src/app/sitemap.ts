import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, categories] = await Promise.all([getAllPosts(), CATEGORIES()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${GUIDES_BASE}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}${categoryPath(c.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}${p.canonicalPath ?? postPath(p.category, p.slug)}`,
    lastModified: p.updated ?? p.date ?? now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
