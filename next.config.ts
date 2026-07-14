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
};

export default nextConfig;
