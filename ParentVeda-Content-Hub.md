# ParentVeda — Content Hub ("The Journal")

**Purpose of this file:** the build spec for ParentVeda's SEO content engine — the blogs, articles, recipes, nushkhe, "Can I…?" answers and parenting FAQs that live **on the website** (not buried in the app). This is the discovery layer: we rank for what expecting parents already search, then gently route them to the waitlist / app.

> This is a **separate section** from the landing page (`ParentVeda-Website-Content.md`). The landing page only *teases* the Journal with 3–4 featured cards; the full library lives here.

---

## 1. Why this exists (the strategy in one breath)

Expecting Indian parents type things into Google all day — *"can I eat papaya during pregnancy"*, *"normal delivery ke liye exercise"*, *"morning sickness home remedy"*. Today they land on clinical, anxious, Western pages. We want them to land on **ParentVeda's calm, bilingual, culturally-rooted answer** instead — and from there, join the waitlist.

So every page here does three jobs:

1. **Rank** — answer a real search query better and more calmly than anyone else.
2. **Reassure** — deliver the answer in the ParentVeda voice (gentle, never alarmist, English + Hinglish).
3. **Route** — every page ends with a soft CTA to the waitlist / app, and links to 3–4 related reads (so visitors go deeper, not away).

This is a **long-term compounding asset.** It does not need the app to be live — it can start ranking *now* while the app is still "coming soon," and build the audience we hand the app to on launch day.

---

## 2. Information architecture (routes)

Recommended URL structure. Keyword-friendly, top-level category paths (better for SEO than deep nesting):

```
/journal                      → The Journal hub (index of everything, featured + latest)
/articles                     → Articles & Guides index
/articles/[slug]              → a single article  (e.g. /articles/eating-for-two-the-calm-way)
/recipes                      → Recipes & Nushkhe index
/recipes/[slug]               → a single recipe or nushkha
/can-i                        → "Can I…?" hub (the SEO goldmine — see §6)
/can-i/[slug]                 → a single Can-I answer  (e.g. /can-i/eat-papaya-during-pregnancy)
/faq                          → Parenting & pregnancy FAQ (SEO + on-site reference)
```

Notes:
- **"The Journal"** is the brand-facing name shown in the nav and headings. The routes stay keyword-friendly (`/articles`, `/recipes`, `/can-i`) because the words in the URL help ranking.
- Keep slugs human + keyword-rich: `/can-i/eat-papaya-during-pregnancy`, not `/can-i/post-123`.
- `/faq` is shared with the landing page FAQ — same content, canonical home is here.
- All of these names are easy to change later; flagging the choice so it's deliberate. (If you'd rather use `/blog` than `/journal`, say the word — `/journal` just fits the calm brand better and avoids the generic "blog" feel.)

---

## 3. Tech approach (Next.js 16 App Router)

You already have Next 16 + Tailwind v4 + `motion`. Recommended content pipeline:

- **Content as MDX files in the repo** under `content/` (e.g. `content/articles/*.mdx`, `content/can-i/*.mdx`). Dev-owned, version-controlled, free, fast, great for SEO. Use a content layer like **Velite** or **`next-mdx-remote` + `gray-matter`** to read frontmatter + render. (Avoid Contentlayer — maintenance has stalled.)
- If a **non-developer** will publish regularly, use a headless CMS instead — **Sanity** (generous free tier, great editor) or **Hygraph/Contentful**. Tradeoff: more setup + a monthly cost, but marketing can publish without a PR. **Recommendation: start with MDX-in-repo now** (you're dev-driven and pre-launch); migrate to a CMS only once publishing volume justifies it.
- Rendering: each post is a **Server Component** so HTML is fully crawlable. No client-side-only content.
- Reading time: compute from word count at build (don't hardcode).

### SEO plumbing (build all of this — it's the whole point)

- **`generateMetadata`** per route: unique `title`, `description`, `canonical`, OpenGraph + Twitter card, per page. Pull from frontmatter.
- **`app/sitemap.ts`** — auto-generate from the content folder (every article/recipe/can-i/faq URL).
- **`app/robots.ts`** — allow all, point to sitemap.
- **JSON-LD structured data** (inline `<script type="application/ld+json">`), per content type:
  - Articles → `Article` / `BlogPosting`
  - Recipes → `Recipe` (cookTime, ingredients, nutrition — these get rich results with images)
  - "Can I…?" → `FAQPage` (eligible for the expandable Q&A snippet in Google)
  - `/faq` → `FAQPage`
  - Steps/how-to content → `HowTo`
  - Site-wide → `Organization` + `WebSite` (with `SearchAction`)
- **Breadcrumbs** with `BreadcrumbList` schema.
- **`/rss.xml`** feed for the Journal — feeds the newsletter and lets readers subscribe.
- **`next/image`** for every image (responsive, lazy, AVIF/WebP). Hero images need real `alt` text.
- Internal linking: every post links to 3–4 related posts + its category hub. (Internal links are how ranking authority flows.)

---

## 4. Content types & page templates

### 4a. Article / Guide  (`/articles/[slug]`)
The long-form workhorse. Template, top to bottom:
- Breadcrumb · Category chip · Title (H1) · 1-line calm subhead
- Meta row: read time · last-updated date · *"Reviewed for calm, evidence-informed guidance"* badge
- Hero image
- Body: short paragraphs, H2/H3 sections, callout boxes, bilingual lines where natural
- **Disclaimer block** (standard, see §8)
- **Inline CTA** (mid-article, soft): *"ParentVeda walks this week with you →"*
- **End CTA**: waitlist join card
- **Related reads** (3–4 cards)

### 4b. Recipe / Nushkha  (`/recipes/[slug]`)
- Same header pattern + Category chip (`Recipe` / `Nushkhe`) + Trimester/occasion tag
- **At-a-glance card**: prep time · servings · best-for-trimester · veg/sattvic tag
- Ingredients (Indian names + English: *bhige badaam / soaked almonds*)
- Method (numbered steps → `HowTo` / `Recipe` schema)
- *"Why it's kind right now"* — the gentle nutrition note
- Dadi-maa note (the tradition layer) where relevant
- Disclaimer + CTA + related recipes

### 4c. "Can I…?" answer  (`/can-i/[slug]`)  ← the SEO goldmine, detailed in §6
### 4d. FAQ  (`/faq`)
Accordion of questions grouped by theme (Pregnancy basics · Food · Garbh Sanskar · The app · Privacy · For fathers). Each Q is its own anchor (`/faq#is-papaya-safe`) and the page emits `FAQPage` schema. Reuse the 8 FAQs already written on the landing page as the seed, then expand.

---

## 5. Taxonomy

- **By trimester:** Trimester 1 · Trimester 2 · Trimester 3 · Fourth trimester (postpartum)
- **By week tag:** optional (Week 4+, Week 24+ …) — ties content to the app's week stack
- **By theme:** Nutrition · Sleep & rest · Movement & exercise · Symptoms & comfort · Garbh Sanskar & rituals · Recipes · Nushkhe · Postpartum · For fathers · Mind & emotions
- Each post: 1 primary category + up to 3 theme tags. Tags get their own filtered listing pages (more indexable surface area).

---

## 6. The "Can I…?" pattern (build this carefully — highest ROI)

These are the highest-volume, highest-intent, lowest-competition-for-*calm*-answers queries in pregnancy. One tight page per question. Google loves them, and they're perfectly on-brand (Ask Veda is literally "Can I…?").

**Page template — keep it short, scannable, structured:**

1. **Question as H1:** "Can I eat papaya during pregnancy?"
2. **The calm verdict** (one bold line + a colored chip):
   - 🟢 *Yes, gently* · 🟡 *In moderation* · 🟠 *Best avoided* · 🔴 *Please avoid / ask your doctor*
3. **The short why** (2–3 sentences, plain language)
4. **The tradition note** (what dadi-maa / Garbh Sanskar says — our differentiator)
5. **When to check with your doctor** (always present — keeps us responsible)
6. **Bilingual one-liner** (a warm Hinglish reassurance)
7. **Disclaimer block**
8. **Related "Can I…?"** + soft app CTA

Emit `FAQPage` JSON-LD so the verdict can appear directly in search results.

**Starter "Can I…?" set** (India-relevant — expand with keyword research, see §9):

- eat papaya / pineapple / mango / watermelon during pregnancy
- drink coffee / chai / how much caffeine
- eat curd (dahi) at night
- eat saffron (kesar) — *and the "fair baby" myth, handled gently*
- eat ghee for normal delivery — *(popular belief, address honestly)*
- fast / keep vrat (Navratri, Karva Chauth, Ramzan) during pregnancy
- drink coconut water / how much
- eat eggs / non-veg / fish (mercury)
- eat spicy food
- have ice cream / cold water / cold foods
- sleep on my back / which side is best
- travel / fly / take long car journeys
- have sex during pregnancy
- colour or dye my hair
- do yoga / exercise / which poses to avoid
- lift heavy things / lift my older child
- take a hot water bath / sauna
- drink ajwain water / ajwain ke fayde
- eat papite ke beej / raw papaya — (the unripe-papaya nuance)

---

## 7. CTA system (how content converts)

Three reusable CTA blocks, dropped into every post:

- **Inline soft CTA** (mid-article): a one-line, low-pressure nudge. *"ParentVeda turns this into a calm daily moment — week by week."* → links to `/#waitlist`.
- **End-of-post waitlist card**: the real ask. Email field + *"Tell me when the app launches"* (reuses the same `/api/subscribe` endpoint as the landing page — see landing spec §Waitlist). Newsletter checkbox pre-checked.
- **Newsletter-only nudge** (sidebar / between sections): *"Get the gentle letter — one soft email a week."* For readers who want the content cadence but aren't ready for the app.

Rule: **never** more than one hard ask per page, and never alarmist. The content earns the trust; the CTA just opens the door.

---

## 8. Editorial guidelines

- **Voice:** calm, warm, bilingual (English + natural Hinglish), never clinical, never alarmist, never fear-driven. Same voice as the app and landing page. *"A calm nursery, never a toy store."*
- **Length:** Can-I = 250–500 words. Articles = 800–1500. Recipes = as needed. Don't pad for SEO — Google rewards the genuinely useful, concise answer.
- **E-E-A-T / credibility** (matters a lot for health/"YMYL" content):
  - Every post carries the standard **disclaimer block**: *"ParentVeda offers gentle, evidence-informed guidance — not medical advice. Always consult your doctor."*
  - Show a **"last updated"** date and a *"reviewed for calm, evidence-informed guidance"* line. (When you have a doctor/practitioner reviewer, name them — strongest trust signal for health ranking. No founder bios needed, per your call, but a medical reviewer credit is different and worth adding when possible.)
  - Cite sources where you make a factual claim (link reputable sources; keep it light-touch and calm).
  - Handle myths (kesar/fair baby, ghee/normal delivery, eclipse/grahan beliefs) **respectfully and honestly** — acknowledge the tradition, give the gentle evidence-informed take. This honesty is itself a trust differentiator.
- **Bilingual rule:** lead in English, sprinkle Hinglish for warmth — don't translate everything mechanically.

---

## 9. Build & publish workflow

1. **Keyword research first** — before writing, pull real search volumes and pick targets per page. *(You have Semrush connected in this workspace — I can run keyword research to build a prioritized content calendar with volumes/difficulty whenever you want. Just ask.)*
2. Draft in MDX with full frontmatter (schema below).
3. Add hero image (`next/image`, real alt text), internal links to 3–4 related posts.
4. PR → preview on Vercel → publish.
5. Submit sitemap to Google Search Console; track rankings.

### Frontmatter schema (every post)
```yaml
---
title: "Can I eat papaya during pregnancy?"
slug: "eat-papaya-during-pregnancy"
type: "can-i"            # article | recipe | nushkhe | can-i | faq
metaTitle: "Can I Eat Papaya During Pregnancy? | ParentVeda"
metaDescription: "Ripe vs raw papaya in pregnancy — a calm, bilingual answer..."
targetKeyword: "can i eat papaya during pregnancy"
category: "Nutrition"
themeTags: ["Food", "Trimester 1"]
trimester: 1             # optional
weekTag: null            # optional
readTimeMinutes: 3       # auto-computed at build, override if needed
verdict: "moderation"    # only for can-i: yes | moderation | avoid-some | avoid
heroImage: "/journal/papaya.jpg"
heroAlt: "Sliced ripe papaya on a wooden board"
publishedAt: "2026-07-01"
updatedAt: "2026-07-01"
reviewedNote: "Reviewed for calm, evidence-informed guidance"
related: ["eat-pineapple-during-pregnancy", "best-fruits-during-pregnancy"]
---
```

---

## 10. Starter content roadmap (first ~20 to seed the Journal)

**Can I…? (fast wins):** papaya · pineapple · coffee/caffeine · curd at night · ghee for normal delivery · fasting/vrat · saffron · coconut water · sleeping position · travel/flying.

**Articles & Guides (anchor pages):** Indian pregnancy diet — trimester by trimester · Foods to avoid in pregnancy (Indian kitchen edition) · Garbh Sanskar: the complete gentle guide · Morning sickness — dadi-maa ke nuskhe · Tips & gentle exercises for a normal delivery · Understanding baby movements & kick counts · The fourth trimester: postpartum (jaccha-baccha) care · Hospital bag checklist for India · A father's role through pregnancy.

**Recipes & Nushkhe (carry over + extend):** Moong dal khichdi · Lemon-ginger water + soaked almonds · Soothing nighttime remedies · Ragi & date porridge · Gond ke laddu (postpartum) · Methi for lactation · Ajwain water.

> The 8 articles/recipes already drafted on the landing page move *here* as the first published posts — nothing is lost, it just gets a proper home.
