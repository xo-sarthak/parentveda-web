import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import {
  CATEGORIES,
  GUIDES_BASE,
  categoryPath,
  getAllPosts,
  postPath,
} from "@/lib/guides";

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}${GUIDES_BASE}`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE_URL}${categoryPath(c.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}${postPath(p.category, p.slug)}`,
    lastModified: p.updated ?? p.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
