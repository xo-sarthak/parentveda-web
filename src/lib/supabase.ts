/* ============================================================
   Supabase — the shared ParentVeda content backend.

   Read-only, server-side only. Content is authored in Directus and
   read here with the anon/publishable key; RLS only exposes rows with
   status='published', so there is nothing secret in this client.

   Caching: supabase-js issues plain `fetch` calls, and since Next 15 an
   uncached fetch opts the whole route into dynamic rendering — which would
   silently turn our prerendered, crawlable guide pages into per-request
   SSR. So we inject a fetch that opts into Next's data cache with a
   revalidate window and a shared tag, keeping guide routes static/ISR.
   The tag also gives us on-demand revalidation later (a Directus webhook
   hitting revalidateTag(CONTENT_TAG) publishes instantly instead of
   waiting out the window).
   ============================================================ */

import { createClient } from "@supabase/supabase-js";

/** Cache tag for every content read — revalidateTag(CONTENT_TAG) flushes all of it. */
export const CONTENT_TAG = "parentveda-content";

/** Seconds before a cached content read is considered stale. */
export const CONTENT_REVALIDATE = 60;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (see .env.example)."
  );
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    fetch: (input, init) =>
      fetch(input, {
        ...init,
        cache: "force-cache",
        next: { revalidate: CONTENT_REVALIDATE, tags: [CONTENT_TAG] },
      } as RequestInit),
  },
});
