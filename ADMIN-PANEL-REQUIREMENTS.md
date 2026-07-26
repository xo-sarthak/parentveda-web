# Admin panel — what needs one, and what doesn't

Where ParentVeda's content should be editable in Directus rather than in code.

Written 26 July 2026, against the live codebase.

---

## The distinction that matters

Not everything on the site should go in an admin panel. Three different things get confused with each other:

| | | Belongs in |
|---|---|---|
| **Content** | Words and data that change without a developer — articles, author bios, FAQs, testimonials | **Directus** |
| **Configuration** | Values that change rarely and break things when wrong — API keys, feature flags, the Play Store package name | **Code / env vars** |
| **Code** | Layout, components, the SVG diagrams inside articles | **Code** |

Putting configuration into a CMS is how sites go down at 2am. Putting content into code is why you currently need a developer and a deploy to fix a typo on the homepage.

Everything below is sorted on that basis.

---

## 1. Already managed in Directus ✅

Working today, no action needed.

### Guide articles
`content_posts` in Supabase. Title, body (Markdown), description, excerpt, tags, author name, reading time, trimester, recipe metadata, source citation, book metadata, and the per-post SEO overrides (`meta_title`, `og_image`, `og_image_alt`, `canonical_path`).

Publishing in Directus shows on the site within about 60 seconds — no deploy. This is the model everything below should follow.

### Guide categories
`content_categories`. Name, singular, tagline, description, icon, tint, sort order.

---

## 2. Needs an admin panel — high priority

### Author profiles 🔴
**Currently:** `src/lib/authors.ts` — a hardcoded array.

Adding a doctor means editing TypeScript and deploying. This will not survive contact with a second or third reviewer, and it is the one piece of content most likely to need a fast correction — a credential, a registration number, a photo.

Fields: name, credentials, role, photo, short bio, full bio (paragraphs), specialties, qualifications (degree / institution / year), memberships, years of experience, medical registration, languages, practice name.

Needs a relation from `content_posts` → author, replacing today's plain `author` text column.

### Organisation & legal details 🔴
**Currently:** `src/lib/legal.ts` (`ORG`).

Legal entity name, contact / privacy / grievance email addresses, named Grievance Officer, postal address, jurisdiction city, policy effective and updated dates.

These are still unfilled placeholders. They appear across all five policy pages and are a legal requirement, not a design choice — a change of Grievance Officer must not require a deploy.

*The policy body text itself can stay in code — it changes rarely and benefits from review. It is the facts above that need to be editable.*

### Homepage FAQ
**Currently:** `FAQS` in `src/lib/content.ts`.

Changes constantly as real questions come in, and it is SEO-visible. Classic CMS content.

### Waitlist & conversion copy
**Currently:** `WAITLIST` in `src/lib/content.ts` — eyebrow, title, body, both checkbox labels, button, microcopy, success message.

This is the copy most worth iterating on, and today every wording test costs a deploy.

### Testimonials & trust stats
**Currently:** `TESTIMONIALS` and `TRUST_STATS` in `src/lib/content.ts`.

Honest placeholders today, and correctly labelled as such in the code — quotes attributed to "Early reader", and stats that make no numeric claims ("Be #1" rather than an invented user count). That restraint is right and should be preserved.

The moment real users exist these need swapping fast, and real quotes need attribution and consent tracked alongside them.

---

## 3. Needs an admin panel — medium priority

### Week-by-week pregnancy data
**Currently:** `WEEKS` in `src/lib/content.ts`.

Per week: number, trimester, size comparison (English + Hindi), fruit key, baby development, note for the mother, nutrition line, and a Hinglish bonding ritual.

The largest body of real product content in the repo, and almost certainly needed by the app too. Worth treating as a shared collection both surfaces read, rather than duplicating it in the app codebase.

### Garbh Sanskar rituals
**Currently:** `GARBH_RITUALS` and `DAILY_MOMENTS`.

Title, Hindi title, description, icon. Editorial content that will grow.

### Journey milestones
**Currently:** `MILESTONES` — week, title, subtitle, icon, tint.

### Feature and step copy
**Currently:** `FEATURES`, `STEPS`, `PROMISES`, `TRUST_POINTS`, `TOOLS`.

The marketing description of the product. Will be rewritten at launch, and again after.

### Ask Veda demo conversation
**Currently:** `ASK_VEDA_CHAT`, `ASK_VEDA_PROMPTS`.

A scripted sample exchange. Content, and worth tuning without a deploy.

---

## 4. Should NOT become new collections — wire to existing content instead

### Homepage article, recipe and journal teasers
**Currently:** `ARTICLES`, `RECIPES`, `FEATURED_JOURNAL` in `src/lib/content.ts`.

These are hardcoded cards that *describe articles* — while the real articles already sit in `content_posts` in Supabase. Two sources of truth for the same thing, and they will drift.

**Fix by reading from Supabase, not by adding a collection.** `getFeaturedPosts()` and `getPostsByCategory()` already exist and already exclude unlisted posts. Adding a "featured on homepage" boolean to `content_posts` would let the homepage pick real, live articles.

---

## 5. Belongs in code or env — do not put in Directus

| Item | Where | Why |
|---|---|---|
| `APP_LIVE` flag | `src/lib/invite.ts` | Deploy-time switch. Flipping it in a CMS could redirect users to a Play listing that doesn't exist. |
| `ANDROID_PACKAGE`, referrer key | `src/lib/invite.ts` | Must stay byte-identical to the app. A typo silently breaks every referral. |
| `SITE_URL`, `BASE_PATH` | `src/lib/site.ts` | Deployment identity. |
| Supabase keys | env vars | Secrets never belong in a CMS. |
| `NAV_LINKS`, `FOOTER_LINKS` | `src/lib/content.ts` | Navigation is routing. A bad link here breaks the site's shape. Low churn. |
| `WHATSAPP_HREF`, `APP_STORE_HREF`, `PLAY_STORE_HREF` | `src/lib/content.ts` | Still `#download` placeholders — set once at launch. |
| `TRIMESTERS` | `src/lib/guides.ts` | Fixed domain facts. Pregnancy will not grow a fourth trimester. |
| Article SVG figures | `src/components/guides/figures/` | Hand-built diagrams. Code, not content. |
| Policy page body text | `src/app/legal/**` | Wants review before it changes. See §2 for the facts that *should* be editable. |

---

## Open points

Carried forward, not forgotten.

### 🔸 The preview article has no entry point
`article/ectopic-pregnancy-preview-x7k2` is tagged `unlisted` — reachable at its own URL, hidden from the hub, category pages, related reads, counts and the sitemap, and marked noindex.

That is deliberate and working as designed. It means the only way to reach it is a direct link.

**Note:** unlisted is not private. Anyone with the link can read it and forward it.

- Live: `parentveda.in/guides/article/ectopic-pregnancy-preview-x7k2`
- Lab layout: `parentveda.in/guides/lab/article/ectopic-pregnancy-preview-x7k2`

**To decide:** does it get published properly (drop the `unlisted` tag), stay a review link, or get deleted once the layout decisions are folded in?

### 🔸 Author profiles are hardcoded, and the pilot uses an override
`src/lib/authors.ts` holds Dr. Mahender Singh as a code constant, plus a temporary `PILOT_AUTHOR_BY_POST` map pinning him to the preview article — because that post's `author` field in Directus still says "Team ParentVeda".

**Two things to close:**
1. Set the post's `author` field in Directus to `Dr. Mahender Singh`, then the override can be deleted and resolution happens by name for every post.
2. Move author profiles into Directus properly — see §2.

**Also still unresolved:** the spelling. The clinic signboard reads **MAHENDER**; it has been written as *Mahendra* elsewhere. The current slug is `dr-mahender-singh`, and it is in a URL — cheapest to settle before anything links to it.

### 🔸 `/guides/lab` is temporary
An unlinked, noindex layout sandbox. Delete the directory once its decisions are folded into the real article route.

---

## Suggested order

1. **Author profiles** — blocking real medical review at any scale, and the E-E-A-T story depends on it
2. **Organisation & legal details** — required before launch, currently placeholders
3. **Homepage teasers → read from Supabase** — removes a whole class of drift rather than adding a collection
4. **FAQ, waitlist copy, testimonials** — the copy iterated on most
5. **Week-by-week data** — largest, and worth coordinating with the app first
6. Everything else in §3, as it starts to hurt
