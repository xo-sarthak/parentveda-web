-- Pluralise the category slugs so every URL matches the heading on the page
-- it opens: /reads/articles/ is titled "Articles". 30 July 2026.
--
--   article           -> articles
--   research-summary  -> research-summaries
--   book-summary      -> book-summaries
--   recipe            -> recipes
--   parenting-faq     -> unchanged; its label already IS "Parenting FAQ"
--
-- Why insert-then-delete instead of `update content_categories set slug = ...`:
-- content_posts.category may reference content_categories.slug as a foreign
-- key. Renaming the parent first would violate it (no ON UPDATE CASCADE), and
-- repointing the children first would violate it too. Creating the new rows
-- before moving the posts means no statement ever leaves a post orphaned.
--
-- Safe to re-run: the insert skips slugs that already exist, the updates match
-- nothing the second time, and the delete is a no-op once the old rows are gone.
--
-- Run this in the Supabase SQL editor. The whole thing is one transaction, so
-- a failure anywhere leaves the categories exactly as they were.

begin;

-- 1. New category rows, copied field for field from the old ones.
insert into public.content_categories
  (slug, name, singular, tagline, description, icon, tint, sort)
select
  case c.slug
    when 'article'          then 'articles'
    when 'research-summary' then 'research-summaries'
    when 'book-summary'     then 'book-summaries'
    when 'recipe'           then 'recipes'
  end,
  c.name, c.singular, c.tagline, c.description, c.icon, c.tint, c.sort
from public.content_categories c
where c.slug in ('article', 'research-summary', 'book-summary', 'recipe')
on conflict (slug) do nothing;

-- 2. Move the posts onto the new slugs.
update public.content_posts set category = 'articles'           where category = 'article';
update public.content_posts set category = 'research-summaries' where category = 'research-summary';
update public.content_posts set category = 'book-summaries'     where category = 'book-summary';
update public.content_posts set category = 'recipes'            where category = 'recipe';

-- 3. Nothing points at the old rows now.
delete from public.content_categories
where slug in ('article', 'research-summary', 'book-summary', 'recipe');

commit;

-- Verify: expect five categories, all plural-matching, and no post left on an
-- old slug.
select slug, name from public.content_categories order by sort;

select category, count(*) from public.content_posts group by category order by category;
