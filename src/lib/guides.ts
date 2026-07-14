/* ============================================================
   ParentVeda — Guides (the SEO content hub).

   Each category and each post becomes its own statically-generated,
   individually-rankable page under /guides/<category>/<slug>.

   This file is the single source of truth for the hub's content and
   its SEO metadata. Real content will replace these samples; the
   structure (categories, slugs, fields) is what matters for ranking.
   ============================================================ */

import type { IconKey } from "@/lib/content";
import type { Tint } from "@/lib/ui";

export const GUIDES_BASE = "/guides";
export const GUIDES_NAME = "Guides";
export const GUIDES_TAGLINE =
  "Calm, evidence-informed reads for pregnancy and early parenthood — articles, research & book summaries, recipes and clear answers.";

/* ---------------- Categories ---------------- */

export type CategorySlug =
  | "article"
  | "research-summary"
  | "book-summary"
  | "recipe"
  | "parenting-faq";

export type GuideCategory = {
  slug: CategorySlug;
  name: string; // plural display
  singular: string; // singular display
  tagline: string; // short line under the title
  description: string; // SEO meta description for the category page
  icon: IconKey;
  tint: Tint;
};

export const CATEGORIES: GuideCategory[] = [
  {
    slug: "article",
    name: "Articles",
    singular: "Article",
    tagline: "Stage-aware, gentle reads for every week.",
    description:
      "Calm, evidence-informed pregnancy and parenting articles — nutrition, symptoms, trimesters and more, in plain English and Hinglish.",
    icon: "book",
    tint: "brand",
  },
  {
    slug: "research-summary",
    name: "Research Summaries",
    singular: "Research Summary",
    tagline: "The science, gently distilled.",
    description:
      "Plain-language summaries of pregnancy and parenting research — what the studies actually say, and what it means for you.",
    icon: "shield",
    tint: "earth",
  },
  {
    slug: "book-summary",
    name: "Book Summaries",
    singular: "Book Summary",
    tagline: "Big pregnancy books, in a calm few minutes.",
    description:
      "Short, honest summaries of the best-loved pregnancy and parenting books — key takeaways you can use today.",
    icon: "star",
    tint: "coral",
  },
  {
    slug: "recipe",
    name: "Recipes",
    singular: "Recipe",
    tagline: "Trimester-friendly food and dadi-maa ke nuskhe.",
    description:
      "Simple, nourishing pregnancy recipes and traditional Indian nushkhe — trimester-friendly, easy to digest and made with love.",
    icon: "bowl",
    tint: "earth",
  },
  {
    slug: "parenting-faq",
    name: "Parenting FAQ",
    singular: "FAQ",
    tagline: "Clear, calm answers to the questions every parent asks.",
    description:
      "Honest, evidence-informed answers to common pregnancy and parenting questions — the “Can I…?” and “Is it safe…?” worries, gently settled.",
    icon: "chat",
    tint: "brand",
  },
];

/* ---------------- Content blocks ---------------- */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "callout"; text: string };

/* ---------------- Posts ---------------- */

export type RecipeMeta = {
  prepTime?: string; // human, e.g. "10 min"
  cookTime?: string;
  totalTime?: string;
  servings?: string; // e.g. "Serves 2"
  ingredients: string[];
  steps: string[];
};

export type GuidePost = {
  slug: string;
  category: CategorySlug;
  title: string; // H1 + SEO title base
  description: string; // meta description (≤ ~160 chars)
  excerpt: string; // listing excerpt
  date: string; // ISO published
  updated?: string; // ISO modified
  readingTime: string;
  author: string;
  tags: string[];
  body: Block[];
  recipe?: RecipeMeta; // recipe category
  source?: { label: string; href?: string }; // research / book citation
  bookMeta?: { title: string; author: string }; // book-summary
};

const DISCLAIMER =
  "ParentVeda offers gentle, evidence-informed guidance — not medical advice. Always check with your doctor for decisions about your pregnancy.";

export const POSTS: GuidePost[] = [
  /* ---------- Articles ---------- */
  {
    slug: "eating-for-two-pregnancy-nutrition-myth",
    category: "article",
    title: "Eating for two? Why pregnancy nutrition isn't about double portions",
    description:
      "“Eating for two” is a myth. Here's what your body actually needs each trimester — calm, practical pregnancy nutrition without the pressure.",
    excerpt:
      "The phrase sounds caring, but it leads to a lot of unnecessary worry. Here's what real nourishment looks like, trimester by trimester.",
    date: "2026-05-12",
    updated: "2026-06-18",
    readingTime: "5 min read",
    author: "Team ParentVeda",
    tags: ["nutrition", "first trimester", "weight"],
    body: [
      { type: "p", text: "“You're eating for two now!” is one of the first things many expecting mothers hear. It's said with love — but it quietly suggests you should be eating twice as much. You don't." },
      { type: "h2", text: "How much extra do you really need?" },
      { type: "p", text: "For most of pregnancy, the extra energy your body needs is small — often nothing in the first trimester, and only a modest amount in the second and third. Think of it as a little more, not double." },
      { type: "ul", items: [
        "First trimester: usually no extra calories needed — focus on quality, not quantity.",
        "Second trimester: a small increase, roughly an extra snack a day.",
        "Third trimester: a little more again, as baby grows fastest.",
      ] },
      { type: "h2", text: "What actually matters" },
      { type: "p", text: "Nourishment matters far more than volume. Iron (palak, dal, gud), calcium (doodh, dahi, ragi, til), folate (leafy greens, citrus) and protein quietly do the heavy lifting. Small, frequent, warm meals are kinder on a queasy stomach than three large ones." },
      { type: "callout", text: DISCLAIMER },
    ],
  },
  {
    slug: "understanding-baby-movements-during-pregnancy",
    category: "article",
    title: "Understanding your baby's movements: what kicks and flutters mean",
    description:
      "When do baby kicks start, what's normal, and when to call your doctor? A calm guide to fetal movement through the second and third trimesters.",
    excerpt:
      "Those first flutters are unforgettable — and later, your baby's pattern becomes a gentle daily reassurance. Here's what to know.",
    date: "2026-05-20",
    readingTime: "4 min read",
    author: "Team ParentVeda",
    tags: ["second trimester", "third trimester", "baby movements"],
    body: [
      { type: "p", text: "Somewhere around weeks 18–22, many mothers feel the first flutters — often mistaken for gas or a tiny bubble. These early movements are called quickening." },
      { type: "h2", text: "How movement changes" },
      { type: "p", text: "As weeks pass, flutters become kicks, rolls and hiccups. By the third trimester, your baby settles into a pattern that's unique to them — some are quiet in the morning and lively at night." },
      { type: "h2", text: "Getting to know the pattern" },
      { type: "p", text: "There's no single “correct” number of kicks. What matters is your baby's own normal. Many mothers notice movement most when resting on their side after a meal." },
      { type: "callout", text: "If you ever notice a clear reduction or change in your baby's usual movements, contact your doctor or hospital right away — it's always okay to check. " + DISCLAIMER },
    ],
  },

  /* ---------- Research Summaries ---------- */
  {
    slug: "folic-acid-pregnancy-research-summary",
    category: "research-summary",
    title: "Folic acid before and during pregnancy: what the evidence says",
    description:
      "A plain-language summary of the research on folic acid in pregnancy — why 400 mcg daily is recommended and how it lowers neural tube defect risk.",
    excerpt:
      "One of the most well-established findings in prenatal care, in plain language: what folic acid does and why timing matters.",
    date: "2026-04-28",
    updated: "2026-06-10",
    readingTime: "5 min read",
    author: "Team ParentVeda",
    tags: ["nutrition", "supplements", "first trimester"],
    source: {
      label: "Based on WHO and national health guidance on periconceptional folic acid supplementation.",
    },
    body: [
      { type: "p", text: "Among all prenatal advice, the case for folic acid is one of the strongest. Decades of research link adequate folate around conception with a markedly lower risk of neural tube defects such as spina bifida." },
      { type: "h2", text: "What the studies show" },
      { type: "ul", items: [
        "Folate is essential for the baby's neural tube, which forms very early — often before a pregnancy is even confirmed.",
        "Major health bodies recommend roughly 400 micrograms of folic acid daily for those planning a pregnancy and through early pregnancy.",
        "Some people — for example with certain medical histories — may be advised a higher dose by their doctor.",
      ] },
      { type: "h2", text: "Why timing matters" },
      { type: "p", text: "Because the neural tube closes in the first weeks, starting before conception (or as early as possible) is what makes folic acid so effective. Food sources like leafy greens, dals and citrus help too, but a supplement is the dependable way to hit the target." },
      { type: "callout", text: "This is a general summary, not a prescription. " + DISCLAIMER },
    ],
  },
  {
    slug: "prenatal-music-and-baby-research-summary",
    category: "research-summary",
    title: "Does prenatal music affect your baby? An honest look at the research",
    description:
      "Garbh Sanskar and prenatal music are deeply loved traditions. Here's a calm, honest summary of what the science does — and doesn't — show.",
    excerpt:
      "Music in pregnancy is a beautiful ritual. We look at what research can actually tell us, without overclaiming.",
    date: "2026-05-02",
    readingTime: "4 min read",
    author: "Team ParentVeda",
    tags: ["garbh sanskar", "wellbeing", "third trimester"],
    source: {
      label: "Summarised from peer-reviewed studies on fetal hearing and maternal relaxation; evidence is still emerging.",
    },
    body: [
      { type: "p", text: "From the second trimester, your baby can hear muffled sounds — your voice, your heartbeat, and the world around you. It's no surprise that traditions like Garbh Sanskar place music at the centre of pregnancy." },
      { type: "h2", text: "What we can say" },
      { type: "ul", items: [
        "Babies respond to sound in the womb — heart rate and movement can change with music or voices.",
        "Calm music can lower the mother's stress, and a calmer mother is good for both of you.",
      ] },
      { type: "h2", text: "What we can't claim" },
      { type: "p", text: "Strong, long-term claims — that a particular raga makes a baby smarter, for instance — aren't well supported yet. The honest takeaway: enjoy music because it soothes you and bonds you, not because it's a performance metric." },
      { type: "callout", text: DISCLAIMER },
    ],
  },

  /* ---------- Book Summaries ---------- */
  {
    slug: "what-to-expect-when-youre-expecting-summary",
    category: "book-summary",
    title: "What to Expect When You're Expecting — a calm summary",
    description:
      "A short, honest summary of 'What to Expect When You're Expecting' — the key takeaways from the classic month-by-month pregnancy guide.",
    excerpt:
      "The famous month-by-month companion, distilled to its most useful ideas — minus the information overload.",
    date: "2026-04-15",
    readingTime: "6 min read",
    author: "Team ParentVeda",
    tags: ["books", "pregnancy guide"],
    bookMeta: { title: "What to Expect When You're Expecting", author: "Heidi Murkoff" },
    body: [
      { type: "p", text: "Heidi Murkoff's classic has guided generations of parents with its month-by-month, question-and-answer style. Here's the gentle gist." },
      { type: "h2", text: "Key takeaways" },
      { type: "ul", items: [
        "Pregnancy unfolds in predictable stages — knowing roughly what each month brings reduces a lot of anxiety.",
        "Most symptoms are common and pass; the book's reassurance is its real value.",
        "Preparation — questions for your doctor, a birth plan, a hospital bag — turns worry into action.",
      ] },
      { type: "h2", text: "Our calm note" },
      { type: "p", text: "The book is thorough, which can occasionally tip into overwhelm. Take what soothes you, skip what spikes worry, and remember that a guide is a companion — not a checklist to be graded on." },
      { type: "callout", text: DISCLAIMER },
    ],
  },
  {
    slug: "ina-mays-guide-to-childbirth-summary",
    category: "book-summary",
    title: "Ina May's Guide to Childbirth — key takeaways",
    description:
      "A short summary of Ina May Gaskin's 'Guide to Childbirth' — what it teaches about trusting your body, relaxation and birth without fear.",
    excerpt:
      "A beloved book on confident, calmer birth. Here are its core ideas, distilled.",
    date: "2026-04-22",
    readingTime: "5 min read",
    author: "Team ParentVeda",
    tags: ["books", "birth", "third trimester"],
    bookMeta: { title: "Ina May's Guide to Childbirth", author: "Ina May Gaskin" },
    body: [
      { type: "p", text: "Ina May Gaskin's book is famous for one quietly radical idea: that fear and tension make birth harder, and calm confidence can make it gentler." },
      { type: "h2", text: "Key takeaways" },
      { type: "ul", items: [
        "Relaxation matters — a tense body works against itself in labour.",
        "Birth stories, told positively, can replace fear with confidence.",
        "Your support and surroundings shape your experience more than most expect.",
      ] },
      { type: "h2", text: "Our calm note" },
      { type: "p", text: "Whatever birth you plan or experience, the spirit of the book travels well: prepare, breathe, trust your body, and surround yourself with calm. There's no single 'right' way to bring a baby into the world." },
      { type: "callout", text: DISCLAIMER },
    ],
  },

  /* ---------- Recipes ---------- */
  {
    slug: "moong-dal-khichdi-pregnancy-recipe",
    category: "recipe",
    title: "Moong dal khichdi for pregnancy — gentle, iron-rich comfort",
    description:
      "An easy moong dal khichdi recipe for pregnancy — warm, light, easy to digest and quietly nourishing. Ready in about 30 minutes.",
    excerpt:
      "Comfort in a single bowl: soft, warming and easy on a tired tummy. A trimester-three favourite.",
    date: "2026-05-08",
    readingTime: "3 min read",
    author: "Team ParentVeda",
    tags: ["recipe", "third trimester", "comfort food"],
    recipe: {
      prepTime: "10 min",
      cookTime: "20 min",
      totalTime: "30 min",
      servings: "Serves 2",
      ingredients: [
        "1/2 cup rice, rinsed",
        "1/2 cup yellow moong dal, rinsed",
        "1 tbsp ghee",
        "1/2 tsp cumin (jeera) seeds",
        "A pinch of hing (asafoetida)",
        "1/2 tsp turmeric (haldi)",
        "1-inch ginger, finely chopped",
        "3 cups water (more for a softer khichdi)",
        "Salt to taste",
      ],
      steps: [
        "Soak the rice and moong dal together for 10 minutes while you prep.",
        "Heat ghee in a pressure cooker. Add cumin and hing; let them sizzle.",
        "Add ginger and turmeric, then the drained rice and dal. Stir for a minute.",
        "Add water and salt. Pressure cook for 3–4 whistles until very soft.",
        "Let the pressure release naturally. Stir, adjust water to a soft consistency, and serve warm with a little extra ghee and curd.",
      ],
    },
    body: [
      { type: "p", text: "Khichdi is the gentlest of foods — soft, warm and easy to digest, which makes it perfect when your appetite is small or your tummy is tender. Moong dal adds protein and a little iron without feeling heavy." },
      { type: "callout", text: "Tip: a spoon of ghee and a side of curd make it more nourishing and even easier to digest. " + DISCLAIMER },
    ],
  },
  {
    slug: "lemon-ginger-water-pregnancy-nausea-recipe",
    category: "recipe",
    title: "Lemon-ginger morning water for pregnancy nausea",
    description:
      "A simple lemon-ginger water to ease early-pregnancy nausea (ji-michli). A gentle 5-minute morning settler — sip slowly.",
    excerpt:
      "A calming morning settler for queasy early-trimester days. Five minutes, three ingredients.",
    date: "2026-05-15",
    readingTime: "2 min read",
    author: "Team ParentVeda",
    tags: ["nushkhe", "first trimester", "nausea"],
    recipe: {
      prepTime: "5 min",
      cookTime: "0 min",
      totalTime: "5 min",
      servings: "1 glass",
      ingredients: [
        "1 cup warm water",
        "1/2-inch fresh ginger, lightly crushed",
        "1 tsp lemon juice",
        "1/2 tsp honey (optional)",
      ],
      steps: [
        "Steep the crushed ginger in warm water for 3–4 minutes.",
        "Strain, then stir in the lemon juice (and honey if using).",
        "Sip slowly — small sips settle a queasy stomach better than gulping.",
      ],
    },
    body: [
      { type: "p", text: "Morning ji-michli (nausea) is one of the most common early-pregnancy companions. Ginger has a long, well-loved reputation for soothing it, and a little lemon makes it easier to sip." },
      { type: "callout", text: "Keep it gentle — a small glass, sipped slowly. If nausea is severe or you can't keep fluids down, speak to your doctor. " + DISCLAIMER },
    ],
  },

  /* ---------- Parenting FAQ ---------- */
  {
    slug: "can-i-eat-papaya-during-pregnancy",
    category: "parenting-faq",
    title: "Can I eat papaya during pregnancy?",
    description:
      "Is papaya safe in pregnancy? The short answer: ripe papaya in small amounts is usually fine; raw or unripe papaya is best avoided. Here's why.",
    excerpt:
      "The short answer, and the reasoning behind the popular worry — ripe vs. raw papaya in pregnancy.",
    date: "2026-05-25",
    readingTime: "3 min read",
    author: "Team ParentVeda",
    tags: ["food safety", "nutrition", "first trimester"],
    body: [
      { type: "p", text: "The short answer: ripe papaya in small amounts is usually considered fine, while raw or unripe papaya is the one traditionally advised against." },
      { type: "h2", text: "Why the difference?" },
      { type: "p", text: "Unripe (green) papaya contains more of a substance called latex, which is the source of the long-standing caution. Fully ripe papaya has very little of it, and also offers vitamins and fibre." },
      { type: "ul", items: [
        "Ripe papaya, in moderation: generally considered okay for most pregnancies.",
        "Raw / unripe papaya: best avoided, especially as a large or regular portion.",
      ] },
      { type: "callout", text: "Every pregnancy is different — if you have a specific condition or any doubt, check with your doctor. " + DISCLAIMER },
    ],
  },
  {
    slug: "is-it-safe-to-sleep-on-your-back-during-pregnancy",
    category: "parenting-faq",
    title: "Is it safe to sleep on your back during pregnancy?",
    description:
      "Back-sleeping in later pregnancy can feel uncomfortable for a reason. Why side-sleeping (especially the left) is usually recommended from the second half.",
    excerpt:
      "Why side-sleeping is usually recommended later in pregnancy — and how to make it comfortable.",
    date: "2026-06-01",
    readingTime: "3 min read",
    author: "Team ParentVeda",
    tags: ["sleep", "second trimester", "third trimester"],
    body: [
      { type: "p", text: "In early pregnancy, sleep in whatever position feels comfortable. From around the middle of pregnancy onward, many doctors suggest favouring your side rather than your back." },
      { type: "h2", text: "Why side-sleeping?" },
      { type: "p", text: "As your bump grows, lying flat on your back can press on a major blood vessel and feel uncomfortable or light-headed. Sleeping on your side — the left is often suggested — keeps blood flowing comfortably to you and your baby." },
      { type: "h2", text: "Making it comfortable" },
      { type: "ul", items: [
        "Tuck a pillow between your knees and under your bump.",
        "If you wake on your back, simply roll back to your side — no need to worry.",
      ] },
      { type: "callout", text: DISCLAIMER },
    ],
  },
];

/* ---------------- Trimesters ----------------
   Pregnancy content has an organizing axis nothing else has: the stage the
   reader is in. Posts opt in via their existing tags ("first trimester" …). */

export type TrimesterKey = "first" | "second" | "third";

export type Trimester = {
  key: TrimesterKey;
  name: string;
  weeks: string;
  blurb: string;
  tint: Tint;
};

export const TRIMESTERS: Trimester[] = [
  {
    key: "first",
    name: "First trimester",
    weeks: "Weeks 1–13",
    blurb: "The tender early days — nausea, folic acid, and settling in gently.",
    tint: "brand",
  },
  {
    key: "second",
    name: "Second trimester",
    weeks: "Weeks 14–27",
    blurb: "The golden middle — energy returns, and the first little kicks arrive.",
    tint: "coral",
  },
  {
    key: "third",
    name: "Third trimester",
    weeks: "Weeks 28–40",
    blurb: "The home stretch — rest, warm food and getting ready to say hello.",
    tint: "earth",
  },
];

export function getPostsByTrimester(key: TrimesterKey, limit = 4): GuidePost[] {
  const tag = `${key} trimester`;
  return POSTS.filter((p) => p.tags.includes(tag)).slice(0, limit);
}

/* ---------------- Helpers ---------------- */

export function getCategory(slug: string): GuideCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getPostsByCategory(slug: string): GuidePost[] {
  return POSTS.filter((p) => p.category === slug);
}

export function getPost(category: string, slug: string): GuidePost | undefined {
  return POSTS.find((p) => p.category === category && p.slug === slug);
}

export function getAllPosts(): GuidePost[] {
  return POSTS;
}

/** A few recent posts for the hub landing. */
export function getFeaturedPosts(limit = 6): GuidePost[] {
  return [...POSTS]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}

/** The single lead story for the hub's editorial opener (newest post). */
export function getHeroPost(): GuidePost {
  return getFeaturedPosts(1)[0];
}

/** Cross-category related reads, ranked by tag overlap (same category breaks ties). */
export function getRelatedPosts(post: GuidePost, limit = 3): GuidePost[] {
  return POSTS.filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        p.tags.filter((t) => post.tags.includes(t)).length * 2 +
        (p.category === post.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((s) => s.p);
}

export function categoryPath(category: string): string {
  return `${GUIDES_BASE}/${category}`;
}

export function postPath(category: string, slug: string): string {
  return `${GUIDES_BASE}/${category}/${slug}`;
}

export function countByCategory(slug: string): number {
  return getPostsByCategory(slug).length;
}
