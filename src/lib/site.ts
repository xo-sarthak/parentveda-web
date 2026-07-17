/* Canonical site origin — used for metadata, canonical URLs, sitemap & JSON-LD.
   Keep in sync with metadataBase in src/app/layout.tsx. */
export const SITE_URL = "https://parentveda.in";
export const SITE_NAME = "ParentVeda";

/* Path prefix the site is served under. Empty at the root (local dev, custom
   domain); set to the repo name by CI when deploying to a GitHub Pages project
   site. Prefix any raw <img>/<a> that points at a /public asset with this so it
   still resolves under the sub-path. next/link & next/font handle it themselves. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Resolve a /public asset path for the current base path. */
export const asset = (path: string) => `${BASE_PATH}${path}`;
