import type { NextConfig } from "next";

/* Rendering: server-rendered with ISR (Vercel), NOT a static export.
 *
 * PRESERVED — the previous GitHub Pages static-export config:
 *
 *   const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;
 *   const nextConfig: NextConfig = {
 *     output: "export",
 *     trailingSlash: true,
 *     basePath,
 *     images: { unoptimized: true },
 *   };
 *
 * `output: 'export'` emits a fully static /out at build time, which cannot
 * revalidate — a post published in Directus would not appear until someone
 * redeployed, and `dynamicParams: true` is meaningless without a server.
 * Guides now read live from Supabase, so the site needs a Node runtime.
 *
 * Consequences of the switch, all handled:
 *   - .github/workflows/deploy.yml (Pages) is disabled — it uploaded ./out.
 *   - basePath/BASE_PATH stay supported for a sub-path deploy, but Vercel
 *     serves from the root, so NEXT_PUBLIC_BASE_PATH is simply unset there.
 *   - images.unoptimized is dropped so next/image optimisation works again.
 *
 * To revert to a static export, restore the block above and re-enable the
 * workflow trigger — but note guides would then be frozen at build time.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  basePath,
  trailingSlash: true,

  /* /guides was renamed to /reads on 29 July 2026.
   *
   * These redirects are not optional politeness — links to the old paths are
   * already out in the world: the ectopic preview has been shared for review,
   * the sitemap has been submitted, and Google has crawled the section. A 404
   * on any of them loses the page and whatever ranking it had.
   *
   * `permanent: true` sends a 308, which tells Google to move the indexed URL
   * to the new one rather than treating this as a temporary detour.
   *
   * The wildcard covers every depth in one rule: the hub, categories,
   * articles, author profiles and the lab sandbox. */
  /* Category slugs were pluralised on 30 July 2026 so each URL matches the
   * heading on the page it opens (/reads/articles/ is titled "Articles").
   *
   * TWO THINGS THAT ARE EASY TO GET WRONG HERE, both learned the hard way:
   *
   * 1. Every destination ends in a slash. `trailingSlash: true` does NOT
   *    normalise redirect destinations — a destination of `/reads/articles`
   *    emits that literal Location, which then 308s again to add the slash.
   *    Cheap to miss, because following the chain still lands on a 200; you
   *    only see it by counting hops.
   *
   * 2. The /guides rules are written per-category rather than leaning on the
   *    /guides wildcard. Next matches the INCOMING path top to bottom and
   *    redirects once per request, so a wildcard-only chain would send
   *    /guides/article/x through /reads/article/x and pick up the category
   *    rename on a later round trip — four hops for the oldest links. Naming
   *    both renames in one rule collapses that to one.
   *
   * Order matters: the specific /guides/<old-category> rules must precede the
   * generic /guides wildcard, or the wildcard swallows them first.
   *
   * `parenting-faq` is absent from the rename list deliberately: its slug did
   * not change, so the plain /guides wildcard already handles it. */
  async redirects() {
    const CATEGORY_RENAMES: Array<[string, string]> = [
      ["article", "articles"],
      ["research-summary", "research-summaries"],
      ["book-summary", "book-summaries"],
      ["recipe", "recipes"],
    ];

    const renameRules = CATEGORY_RENAMES.flatMap(([from, to]) =>
      ["/reads", "/guides"].flatMap((base) => [
        { source: `${base}/${from}`, destination: `/reads/${to}/`, permanent: true },
        {
          source: `${base}/${from}/:slug*`,
          destination: `/reads/${to}/:slug*/`,
          permanent: true,
        },
      ])
    );

    return [
      ...renameRules,
      { source: "/guides", destination: "/reads/", permanent: true },
      { source: "/guides/:path*", destination: "/reads/:path*/", permanent: true },
    ];
  },
};

export default nextConfig;
