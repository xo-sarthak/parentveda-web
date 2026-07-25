import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required for `output: 'export'` — emit a static robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Referral landing pages — one unique URL per user, near-identical copy,
         no search value. The pages also send noindex themselves; this just
         saves the crawl. Link previews are unaffected: WhatsApp/Facebook
         crawlers fetch shared URLs directly and don't consult robots.txt. */
      disallow: "/invite/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
