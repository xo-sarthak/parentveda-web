-- ============================================================
-- ParentVeda — waitlist & newsletter signups.
--
-- Run once, in Supabase → SQL Editor → New query → paste → Run.
-- Safe to re-run: everything is IF NOT EXISTS / OR REPLACE.
--
-- Supabase will warn that this query is "destructive". That is its linter
-- reacting to the words DROP and REVOKE. Every one of them is scoped to the
-- waitlist_signups table created a few lines above — no existing table,
-- function, policy or grant anywhere else in the database is touched.
--
-- WHAT THIS SETS UP
--   A table for signups, locked so that NOTHING public can read or write it.
--   Writes happen server-side with the service-role key, which bypasses RLS.
--   The website's anon key stays read-only, exactly as it is today.
--
-- WHY NOT LET THE BROWSER INSERT DIRECTLY
--   The anon key ships in the page source. An RLS policy allowing anonymous
--   INSERT would work, but anyone could then find the endpoint and fill the
--   table with junk. Going through our own server lets us validate, dedupe
--   and rate-limit first. The alternative is at the bottom if you want it.
-- ============================================================

-- Case-insensitive text, so Priya@x.com and priya@x.com are the same person
-- without having to remember to lowercase at every call site.
create extension if not exists citext;

create table if not exists public.waitlist_signups (
  id               uuid        primary key default gen_random_uuid(),
  email            citext      not null unique,

  -- What they actually agreed to. Under the DPDP Act this pair IS the consent
  -- record — keep it accurate, and never tick one on someone's behalf.
  wants_waitlist   boolean     not null default false,
  wants_newsletter boolean     not null default false,

  -- Which surface they signed up from ('waitlist-section', 'footer', ...).
  -- Useful later for knowing which parts of the site actually convert.
  source           text        not null default 'website',

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.waitlist_signups is
  'Pre-launch email signups. Personal data — see /legal/privacy. Server-side writes only.';

-- Reject anything that obviously is not an email before it reaches the table.
-- Validation still belongs in the app too; this is the last line, not the first.
alter table public.waitlist_signups
  drop constraint if exists waitlist_signups_email_shape;
alter table public.waitlist_signups
  add constraint waitlist_signups_email_shape
  check (email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$');

-- Keep updated_at honest when someone re-submits with different preferences.
--
-- Named after the table on purpose. A generic `touch_updated_at()` is a very
-- common helper, and Directus or an earlier migration may already have one —
-- `create or replace` on a shared name would silently rewrite it underneath
-- whatever else depends on it. This name can only ever belong to us.
create or replace function public.waitlist_signups_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists waitlist_signups_touch on public.waitlist_signups;
create trigger waitlist_signups_touch
  before update on public.waitlist_signups
  for each row execute function public.waitlist_signups_touch_updated_at();

-- ------------------------------------------------------------
-- Lock it down.
--
-- RLS on with NO policies means: denied for everyone, always. The
-- service-role key bypasses RLS entirely, so the server can still write.
-- The revokes are belt-and-braces in case a policy is added carelessly later.
-- ------------------------------------------------------------
alter table public.waitlist_signups enable row level security;

revoke all on public.waitlist_signups from anon, authenticated;

-- ------------------------------------------------------------
-- Check it worked. Expect: rowsecurity = true, and zero policies.
-- ------------------------------------------------------------
-- select relrowsecurity as rls_on from pg_class where relname = 'waitlist_signups';
-- select count(*) as policy_count from pg_policies where tablename = 'waitlist_signups';

-- ============================================================
-- ALTERNATIVE — browser-side inserts, no server code.
--
-- Only if you decide you would rather not run a server action. It lets the
-- public anon key INSERT into this one table and nothing else: no SELECT, so
-- the list can never be read back, and no UPDATE, so rows cannot be altered.
-- The trade-off is spam — there is no rate limit on a public endpoint.
--
--   grant insert on public.waitlist_signups to anon;
--   create policy "anon may sign up"
--     on public.waitlist_signups for insert
--     to anon
--     with check (true);
-- ============================================================
