# Open points

Everything outstanding on parentveda.in, in one place.

**Kept current** — items get added as they come up and struck off when closed,
rather than living in chat scrollback. Last updated 27 July 2026.

Related: [ADMIN-PANEL-REQUIREMENTS.md](./ADMIN-PANEL-REQUIREMENTS.md) — which
content needs to become editable, and which deliberately should not.

---

## 🔴 Blocking launch

### Legal & organisation details
`src/lib/legal.ts` (`ORG`). Five placeholders appear across all five policy
pages. These are legal requirements, not design choices.

- [ ] **Legal entity name** — until a company exists this is legally the operator's own name, not a brand
- [ ] **Three working mailboxes** — `hello@`, `privacy@`, `grievance@parentveda.in`. Under the IT Rules a grievance must be acknowledged in 24h and resolved in 15 days, so these cannot be write-only
- [ ] **A named Grievance Officer** — "The Grievance Officer" is the current placeholder and satisfies nobody in a dispute
- [ ] **City for jurisdiction**, and a **postal address**. The address is omitted from the pages entirely while unset rather than faked — Google Play requires one on the developer account regardless

### Delete the demo Care Partner rows
Seeded by the app terminal for testing. **Live in production right now** —
anyone hitting `parentveda.in/care/MK8UQT96NH` sees a fictional Dr Meera Rao.
Harmless while nothing links there; must not survive launch.

```sql
delete from partner_referrals where partner_id like 'demo_%';
delete from care_partners     where id         like 'demo_%';
```

### Waitlist sends nothing
Signups are stored correctly, and the success copy is deliberately honest about
it — *"we'll write to you the day ParentVeda opens"*, not "check your inbox".
But there is no email provider connected, so nothing is ever sent and there is
no double opt-in.

- [ ] Pick a provider (Brevo / Kit / Resend) and wire confirmation + the weekly letter

---

## ⏳ Waiting on the app being live on Play

Both are one-step once the listing exists.

- [ ] **`APP_LIVE = false` → `true`** in `src/lib/invite.ts:38`. One line, switches
      **both** `/invite` and `/care` from the waitlist CTA to the store redirect.
      It is false today because redirecting would send every scan and every
      shared link to a 404 store page.
- [ ] **`/.well-known/assetlinks.json`** — currently 404, deliberately. Needs the
      **Play App Signing** SHA-256 from Play Console (Setup → App signing), *not*
      a local debug fingerprint. Must be served as `application/json` with no
      redirect on that path. Until it exists, links open in the browser even for
      people who already have the app.

---

## ❓ Decisions needed

- [ ] **The preview article.** `article/ectopic-pregnancy-preview-x7k2` is tagged
      `unlisted` — reachable at its URL, hidden from every listing and the
      sitemap, noindex. Publish it properly, keep it as a review link, or delete
      it? *(Note: unlisted is not private. Anyone with the link can read and
      forward it.)*
- [ ] **`/guides/lab`.** Unlinked, noindex layout sandbox. Decide what graduates
      to the real article route — the sticky rail, share row, FAQ accordion, lead
      visual — then delete the directory.
- [ ] **The lead visual** on that article is a stand-in: the post has no
      `og_image`, so it reuses the article's own implantation diagram and it
      therefore appears twice on the page. Set `og_image` in Directus and it
      takes over.
- [ ] **Homepage in Source Serif.** The font switch reaches every marketing
      section, not just the guides. Those were designed around a sans and have
      not been reviewed since. Worth a look at `/`.

---

## 📋 For the app terminal

- [ ] **Who generates the 10-character Care Partner tokens?** Adding a doctor is
      two rows — the partner, and a `partner_referrals` row. An invalid token
      does **not** fail loudly: the page treats it as malformed and shows the
      generic version, so a doctor's poster looks fine and credits nobody.
- [ ] **Are `care_partners` and `partner_referrals` exposed in Directus?** They
      live in the same Postgres, so Directus *can* manage them, but only if
      they have been added as collections. If not — who adds a doctor in practice?
- [ ] **`care_trust_messages`** (migration 0038) is read by nobody. Inert until
      the admin panel wires it; both the app and the site read
      `care_partners.trust`.

---

## ✍️ Content gaps

- [ ] **Inline hyperlinking.** The pilot article has **zero** inline links. The
      renderer already styles them properly — this is a content gap, not a code
      one, and it is one of the clearest differences between our articles and
      What to Expect's.
- [ ] **References / citations.** The third item of the original SEO list, never
      built. What to Expect uses superscript markers that jump to a numbered
      source list; worth doing the same rather than the single `source` line we
      have now.
- [ ] **Homepage teasers duplicate real articles.** `ARTICLES`, `RECIPES` and
      `FEATURED_JOURNAL` in `src/lib/content.ts` are hardcoded cards describing
      articles that already exist in Supabase. Two sources of truth, guaranteed
      to drift. Fix by reading from `getFeaturedPosts()`, not by adding a CMS
      collection. See ADMIN-PANEL-REQUIREMENTS.md §4.
- [ ] **Author profiles → Directus**, and drop the pilot override:
      `PILOT_AUTHOR_BY_POST` in `src/lib/authors.ts` pins Dr. Mahender Singh to
      the preview post because that post's Directus `author` field still says
      "Team ParentVeda". Set the field, delete the override.

---

## 🅿️ Parked, with reasons

- **"Fact-checked by" line + editorial standards panel** (What to Expect's
  pattern). Deliberately not built: articles are to be verified by doctors
  before publishing, so a separate reviewer credit would describe a workflow
  that does not exist. Revisit only if doctor review stops being reliable and
  the two roles need showing separately.
- **Google Search Console** — if a property exists it should now be
  `parentveda.in`, not the `www` one. Low urgency; the site is new enough that
  there is little authority to consolidate.

---

## ✅ Closed

- ~~**Mahender vs Mahendra**~~ — confirmed **Mahender**, which is what the code
  and the slug `dr-mahender-singh` already used. No change needed.
- ~~**Invite code format**~~ — confirmed exactly **7 characters** from
  `ABCDEFGHJKMNPQRSTUVWXYZ23456789`. The old 4–12 `A-Z0-9` rule accepted codes
  the app can never produce.
- ~~**`/invite/<CODE>` returning 404 in production**~~ — was simply never pushed.
- ~~**Canonical domain mismatch**~~ — the apex now serves and `www` redirects to
  it, matching `SITE_URL`. Every canonical previously pointed at a redirect.
- ~~**Waitlist forms stored nothing**~~ — wired to Supabase via a server action;
  verified end to end.
