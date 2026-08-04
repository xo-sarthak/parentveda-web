# Open points

Everything outstanding on parentveda.in, in one place.

**Kept current** — items get added as they come up and struck off when closed,
rather than living in chat scrollback. Last updated 29 July 2026.

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
- [ ] **`/.well-known/assetlinks.json`** — the file now EXISTS at
      `public/.well-known/assetlinks.json` with a deliberately invalid
      placeholder fingerprint. The path, shape and MIME type are settled; one
      value is not.

      Replace `REPLACE_ME__PLAY_APP_SIGNING_SHA256__SEE_OPEN-POINTS.md` with the
      **Play App Signing** SHA-256 from Play Console (Setup → App signing), *not*
      a local debug fingerprint. The local key signs the APK you upload; Play
      re-signs it with a different one, and pasting the wrong fingerprint fails
      identically to having no file at all — which is why this is worth stating
      twice.

      Verify after deploy. It must be `application/json`, HTTP 200, no redirect
      (`trailingSlash: true` does not rewrite files with an extension in
      `public/`, but confirm rather than assume):

      ```
      curl -sI https://parentveda.in/.well-known/assetlinks.json
      ```

      Until the real fingerprint lands, verification fails and links open in the
      browser — exactly today's behaviour, so the placeholder ships safely.

      **Only `com.parentveda.app` is listed, on purpose.** The doctor build
      (`com.parentveda.app.doctor`) shares one Android manifest with the parent
      app, so it also declares an intent filter for `/care`. It should not: a
      doctor's QR opening ParentVeda+ does nothing, because that app never
      starts the link handler. The fix belongs on the app side — drop the filter
      from the doctor flavour. Adding the doctor package here would instead make
      the wrong app a *verified* handler, which is worse than the ambiguity.

---

## 🆕 Raised today

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

## 🆕 Raised 29 July

- [ ] **Images live in the repo, not in storage.** `public/media/*` is served off
      the filesystem and shipped by `git push`, so adding an article image needs
      a developer and a deploy, and cannot be done from Directus. Fine for a
      handful; a bottleneck the moment publishing is weekly.

      **Answered by the app terminal, 30 July 2026: yes, `hero_file` /
      `og_image_file` are the intended route.** Migration `0046` added them as
      Directus file-picker columns plus a `cms_sync_media()` trigger that
      derives the public URL into `hero_image` / `og_image` on save. So an
      editor uploads, the trigger writes the URL, and this site reads the plain
      text column exactly as it does today — no code change here.

      It is switched OFF: `cms_media_base()` returns `''` until Cloudflare R2 is
      configured, and while it returns empty the trigger writes nothing. Two
      steps to turn on — point Directus storage at the R2 bucket, then make
      `cms_media_base()` return the public base URL. **Treat `hero_image` /
      `og_image` as derived from that day on**: two ways to set an image means
      one of them is wrong and nobody knows which.
- [ ] **Resubmit the sitemap in Search Console.** The whole section moved from
      `/guides` to `/reads`, and on 30 July the category slugs were pluralised
      (`/reads/article/` → `/reads/articles/`). The 308s mean nothing is lost,
      but Search Console holds the old URL list until it recrawls. One trip
      covers both moves — no reason to do it twice.
      Every URL in it now resolves 200 directly. It used to list the
      slash-less form (`/reads/articles`) while the canonical tag carried the
      slash, so all 25 entries 308'd to the page we actually wanted indexed.
- [ ] **8 of 11 posts have no `og_image`**, so their cards fall back to the
      decorative pattern. Cards now use the real image whenever one is set.

## 🆕 Raised 3 August — from the hyperemesis article

- [ ] **10-row doctor validation table** ships with this article, all rows
      unverified: diagnostic criteria, the hCG mechanism, the timeline (text
      *and* the visual), the treatment ladder, IV fluids and thiamine, the red
      flags, and the new medication-safety FAQ. Rows 1–7 are marked High.
- [ ] **Reading times are not derived from anything.** Across 13 posts the
      implied rate runs from 22 to 379 words per minute. Ectopic claims 6 min
      for 2,276 words; the seeded posts claim 5 min for 180. Hyperemesis was
      set at 7 min using the fibroids rate (~230 wpm), which is the only
      realistic one in the set. Either compute it on save or accept that the
      number is decorative.

## ❓ Decisions needed

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

- ~~**JSON-LD said `author` where the page said reviewer**~~ — settled 3 August:
  the credit **is** "Medically reviewed by". The Article node now carries
  `["Article", "MedicalWebPage"]` with the doctor under `reviewedBy` plus
  `lastReviewed`, and `author` set to ParentVeda as the Organization, since
  nobody is credited as the writer on the page. `reviewedBy`/`lastReviewed`
  belong to MedicalWebPage, not Article, which is why the node needs both
  types. Posts bylined "Team ParentVeda" keep the plain `Article` shape and
  emit no reviewer — their byline shows no review credit either. Verified on
  all three doctor-reviewed articles. No `reviewer` column was needed.
- ~~**The hyperemesis Insight was missing its closing line**~~ — the pack's
  notes promised a line the final piece did not contain. Reinstated 3 August,
  reworded away from *"You're ill"*: a label on the person, where the point is
  that the illness is the thing happening **to** her. Now lands on *"What's
  happening to you is an illness, not a failing, and it's one that gets better
  with care."*
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
- ~~**The ectopic article is published**~~ — v6 sits on the canonical
  `ectopic-pregnancy` slug; the `-preview-x7k2` row is retired to draft rather
  than deleted, so there is one copy in search, not two.
- ~~**The lab sandbox**~~ — graduated onto the real article route (rail, share,
  standfirst, hero, FAQ accordion, aside callouts) and the directory deleted.
- ~~**Guides renamed to Reads**~~ — label and route, with a permanent 308 on
  `/guides/:path*`.
- ~~**Article images 404ing in production**~~ — the `/guides -> /reads` redirect
  was also catching `public/guides/*`. Images moved to `public/media`, which
  cannot collide with a route.
- ~~**Cards ignored the post's own image**~~ — `Thumb` was purely decorative and
  never looked, so even posts with a photograph showed a generated pattern.

---

## Sponsor portal (`/portal`) — added 29 July 2026

Built from the app repo (`C:\Projects\parentveda`), which owns the migrations
behind it. HR at a customer signs in with **the same ParentVeda account they use
in the app**; the `sponsor_admin` capability (migration 0060) is what reveals
this section. No separate users table, no second password.

Three routes, all `force-dynamic`, all `noindex`: `/portal/login`, `/portal`
(take-up + consultations), `/portal/people` (the follow-up list). Session
refresh lives in `src/middleware.ts`, **matched to `/portal` only** so the rest
of the site stays static/ISR.

### ⚠️ Never import `@/lib/supabase` in the portal

It injects `cache: "force-cache"` with a shared tag into every fetch. Correct
for guides — identical for every visitor. Catastrophic here: every portal
request is `POST /rpc/sponsor_dashboard` with an empty body, byte-identical
between customers, and Next's data cache keys on URL + body, **not headers**.
One company's dashboard would be served to another, with the database having
done nothing wrong. Use `@/lib/supabase-portal` (`cache: "no-store"`).

- [ ] **A forwardable report.** HR sends numbers to their leadership far more
  often than they browse. A consistent branded PDF/print view is worth more
  commercially than more metrics — see `docs/STILL-OPEN.md` §11.2 in the app repo.
- [ ] **Trend over time.** The page shows current state only. `activated_at` and
  `booking_bookings.created_at` already exist, so a monthly rollup needs no new
  tables — "35%, up from 22% last quarter" is the renewal argument.
- [ ] **Password reset.** There is no `/portal/forgot`. Supabase can send the
  email, but the project has no transactional email provider wired yet
  (`STILL-OPEN` §11.6) — same blocker as employee activation.

---

## Publish → this site is now instant (30 July 2026)

`POST /api/revalidate` calls `revalidateTag(CONTENT_TAG)`, so a Directus publish
drops every cached content read at once instead of waiting out the 60-second
window. Without it an editor refreshes, sees the old page, concludes the panel
is broken, and presses Publish again.

**Both halves are needed or it does nothing:**

1. Vercel → Environment Variables → `REVALIDATE_SECRET` = a long random string.
2. Directus → Settings → Flows → **Event Hook (Action, non-blocking)** on
   `items.create` + `items.update` for `content_posts`, `content_categories`,
   `content_authors` → **Webhook** `POST https://parentveda.in/api/revalidate`
   with header `x-revalidate-secret: <the same string>`.

Non-blocking on purpose: if this site is down, saving in Directus must still
work. A publish that fails because a cache could not be cleared is worse than a
page that is 60 seconds stale — which is what happens anyway when the webhook
never arrives.

**Why it needs a secret when every guide is public.** Nothing secret leaks; what
leaks is money and latency. An open cache-buster can be called in a loop, making
every subsequent page view a cold render against Supabase — slower site, higher
bills, and nothing in the logs that looks like an attack. *Authentication is not
only about secrets: anything that lets a stranger make your infrastructure do
expensive work needs a gate.*

An unset `REVALIDATE_SECRET` **fails closed** (503). "No secret configured, so
allow it" would turn a forgotten environment variable into an open endpoint, and
forgetting one is the likeliest way this ends up misconfigured.

⚠️ Next 16 changed the signature: `revalidateTag(tag, profile)`. Calling it with
one argument is a type error — and "fixing" that by dropping the tag turns a
targeted invalidation into nothing at all.

Check a deployment without crafting a POST: `GET /api/revalidate` reports
whether the secret is set (never what it is).
