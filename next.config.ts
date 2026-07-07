import type { NextConfig } from "next";

/* Static export for GitHub Pages.
   GitHub Pages serves a project site from a sub-path (e.g. /parentveda-web),
   so the CI build sets NEXT_PUBLIC_BASE_PATH to the repo name. Local `next dev`
   and a future custom-domain build leave it unset → served from the root,
   behaviour unchanged. Keep asset refs in sync via BASE_PATH in src/lib/site.ts. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
