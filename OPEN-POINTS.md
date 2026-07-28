# Open points

Everything outstanding on parentveda.in, in one place.

**Kept current** — items get added as they come up and struck off when closed,
rather than living in chat scrollback. Last updated 27 July 2026 (second pass).

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

## 🆕 Raised today

- [ ] **JSON-LD still says `author`, but the page says reviewer.** The byline and
      closing card now read "Medically reviewed by", while the structured data
      still claims Dr. Mahender Singh authored the piece. Google reads that, and
      on YMYL health content the author/reviewer distinction is precisely what it
      weighs. The content team's own SEO pack asks for `MedicalWebPage +
      FAQPage + Person (author + reviewer)`. Needs a decision on **who the author
      is** (in-house? ParentVeda as an Organization?) and a `reviewer` column on
      `content_posts`, which does not exist yet.
- [ ] **The emergency-signs recap was removed** with the "When to consult your
      doctor" section. The information survives earlier in the piece under "Signs
      that need immediate medical attention", but it was the last thing a reader
      saw before the references. On a condition where delay is the danger, that
      repetition may have been earning its place.
- [ ] **The pull quote is unattributed.** Written to be a doctor's line; the
      reviewing obstetrician-gynaecologist is still TBD, so attributing it now
      would put words in the mouth of someone unassigned.
- [ ] **`author_slug` exists on `content_posts` and is set**, and the site ignores
      it — bylines match on the author's *name string* instead. Rename
      "Dr. Mahender Singh" to "Dr Mahender Singh" and every byline silently falls
      back to plain text. Also unused: `hero_image`, `hero_file`, `og_image_file`,
      `verdict`. Ask the app terminal what they are for.
- [ ] **Em-dash sweep** across the 10 other live articles (3–7 each). Editorial
      work, not find-and-replace. Back the bodies up to a committed file first —
      they are live and content has no git history.

## ❓ Decisions needed

- [ ] **The preview article.** `article/ectopic-pregnancy-preview-x7k2` is tagged
      `unlisted` — reachable at its URL, hidden from every listing and the
      sitemap, noindex. Publish it properly, keep it as a review link, or delete
      it? *(Note: unlisted is not private. Anyone with the link can read and
      forward it.)*
- [ ] **`/guides/lab`.** Unlinked, noindex layout sandbox. Decide what graduates
      to the real article route — the sticky rail, share row, FAQ accordion, lead
      visual — then delete the directory.
- [ ] **A new cover image** for the ectopic article — one was asked for and not
      yet supplied. When it lands it should go in `hero_image`, not `og_image`:
      the share card and the on-page hero are different jobs and that column
      exists for exactly this.
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

- [ ] **Superscript citation markers.** The ectopic article now has a References
      section, but nothing in the prose points into it. What to Expect uses
      numbered markers that jump to the source. Worth doing once a second
      article needs it.
- [ ] **Inline links on the other 10 articles.** The ectopic piece has 18; the
      rest still have none.
- [ ] **Homepage teasers duplicate real articles.** `ARTICLES`, `RECIPES` and
      `FEATURED_JOURNAL` in `src/lib/content.ts` are hardcoded cards describing
      articles that already exist in Supabase. Two sources of truth, guaranteed
      to drift. Fix by reading from `getFeaturedPosts()`, not by adding a CMS
      collection. See ADMIN-PANEL-REQUIREMENTS.md §4.
- [ ] **Author profiles → Directus.** Still a hardcoded array in
      `src/lib/authors.ts`; adding a second doctor means editing TypeScript and
      deploying. See ADMIN-PANEL-REQUIREMENTS.md §2. *(The pilot override is
      gone — that half is done.)*

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
- ~~**Author profiles pilot override**~~ — the post's Directus `author` field is
  set, so `PILOT_AUTHOR_BY_POST` is gone and bylines resolve by name.
- ~~**Inline hyperlinking**~~ — 18 links in the ectopic article, was zero.
- ~~**References**~~ — a proper `## References` section with nine sources.
- ~~**The stand-in hero image**~~ — replaced with a real photograph, so the
  anatomy diagram no longer does double duty.
- ~~**Article column geometry**~~ — matched to the iMumz reference (1216 / 346
  rail / 80 gutter / 790px of text); the 68ch cap had been leaving ~170px of
  dead space inside the column.
- ~~**The sticky rail never actually stuck**~~ — it is a grid item, grid items
  stretch to fill their row, so `sticky` had no range to travel. `self-start`
  fixed it.
