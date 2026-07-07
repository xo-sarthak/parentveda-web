/* ============================================================
   ParentVeda — all site copy & data in one calm place.
   Keeping content here keeps components clean and the voice
   consistent: warm, calm, bilingual, never clinical.
   ============================================================ */

export type IconKey =
  | "weeks" | "sun" | "lotus" | "map" | "tools" | "father" | "community"
  | "calendar" | "footsteps" | "seed" | "heart" | "check" | "star"
  | "leaf" | "bag" | "sparkle" | "music" | "bowl" | "speak" | "moon"
  | "book" | "chat" | "globe" | "shield" | "heartPulse" | "scale"
  | "kegel" | "contraction";

/* PRESERVED — pre-waitlist nav (revert by swapping back to this).
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Articles & Recipes", href: "#library" },
  { label: "Ask Veda", href: "#ask-veda" },
  { label: "FAQ", href: "#faq" },
] as const;
*/

/* Pre-launch nav — features are live on the page; "Guides" is the SEO content
   hub at its own route (/guides), no longer an on-page scroll section. */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Guides", href: "/guides" },
  { label: "Ask Veda", href: "#ask-veda" },
  { label: "FAQ", href: "#faq" },
] as const;

/* Small pre-launch line shown under the Hero CTAs. */
export const PRELAUNCH_NOTE = "Launching soon on iOS & Android — be first in line.";

export const TRUST_POINTS = [
  "Bilingual — English / Hinglish",
  "Rooted in Indian tradition",
  "Never alarmist, always gentle",
] as const;

/* The promise — what ParentVeda will never do */
export const PROMISES = [
  "No scores, no streaks",
  "Never alarmist",
  "Bilingual, always",
  "Rooted in tradition",
] as const;

/* — Feature grid: the real modules inside the app — */
export const FEATURES: {
  key: string;
  title: string;
  desc: string;
  icon: IconKey;
  tint: "brand" | "coral" | "earth";
  chips?: string[];
}[] = [
  {
    key: "weeks",
    title: "Week-on-Week Journey",
    desc: "A swipeable card for every week 4 → 40: baby's growth, your journey, nutrition, a gentle action plan and a bonding ritual.",
    icon: "weeks",
    tint: "brand",
    chips: ["Bilingual"],
  },
  {
    key: "daily",
    title: "Daily Moment",
    desc: "A short, calm ritual each day — Grow, Read & Talk to your baby, Garbh Sanskar, and a moment just for you.",
    icon: "sun",
    tint: "coral",
  },
  {
    key: "garbh",
    title: "Garbh Sanskar",
    desc: "A daily five-ritual companion — ragas, affirmations, a recipe and spoken lines — rooted in tradition.",
    icon: "lotus",
    tint: "brand",
  },
  {
    key: "map",
    title: "Pregnancy Journey Map",
    desc: "A Google-Maps-for-pregnancy trail from week 4 to Birth, with week checkpoints and little celebrations.",
    icon: "map",
    tint: "coral",
  },
  {
    key: "tools",
    title: "Calm Tools",
    desc: "Quiet, non-clinical helpers for the practical bits — never a source of worry.",
    icon: "tools",
    tint: "earth",
    chips: ["Movement", "Weight", "Kegel", "Contractions", "Hospital bag"],
  },
  {
    key: "father",
    title: "Father Mode",
    desc: "A parallel fatherhood-transformation experience, so partners grow and bond right alongside you.",
    icon: "father",
    tint: "brand",
  },
  {
    key: "community",
    title: "Community",
    desc: "A warm, personalized parenting circle — questions, stories and gentle company for the road.",
    icon: "community",
    tint: "coral",
  },
];

/* — How it works (3 calm steps) — */
export const STEPS: { n: string; title: string; desc: string; icon: IconKey }[] = [
  {
    n: "01",
    title: "Tell us your week",
    desc: "Share where you are — even a guess is perfectly fine. We'll meet you exactly there.",
    icon: "calendar",
  },
  {
    n: "02",
    title: "Get your gentle daily moment",
    desc: "A short, soothing ritual each day — never a to-do list, never a score to chase.",
    icon: "sun",
  },
  {
    n: "03",
    title: "Walk the journey to birth",
    desc: "Week by week, wisdom and warmth — all the way to your baby's first cry.",
    icon: "footsteps",
  },
];

/* — Curated weeks for the interactive Week-on-Week preview — */
export type WeekData = {
  week: number;
  trimester: 1 | 2 | 3;
  size: string;
  sizeHi: string;
  fruit: string; // key for <Fruit />
  dev: string;
  mom: string;
  nutrition: string;
  ritual: string; // a gentle Hinglish bonding line
};

export const WEEKS: WeekData[] = [
  {
    week: 4, trimester: 1, size: "a poppy seed", sizeHi: "khus-khus", fruit: "poppySeed",
    dev: "A tiny spark of life — the neural tube is just beginning to form.",
    mom: "You might feel a little tired. Rest is productive too.",
    nutrition: "Gentle folate-rich foods — palak, dals, citrus.",
    ritual: "Ek pal thehro — place a hand on your belly and breathe.",
  },
  {
    week: 8, trimester: 1, size: "a raspberry", sizeHi: "rasbhari", fruit: "raspberry",
    dev: "Little hands and feet are budding, and a heartbeat flutters away.",
    mom: "Morning ji-michli is common — sip slowly, don't gulp.",
    nutrition: "Ginger-lemon water can soothe the queasiness.",
    ritual: "Hum a soft lori — your baby is learning your calm.",
  },
  {
    week: 12, trimester: 1, size: "a lime", sizeHi: "nimbu", fruit: "lime",
    dev: "Reflexes begin and tiny fingers may curl. End of trimester one.",
    mom: "Energy often returns now — and the first scan brings a smile.",
    nutrition: "Iron with vitamin C — gud, beetroot, oranges.",
    ritual: "Aaj ke liye shukrana — name one thing you're grateful for.",
  },
  {
    week: 16, trimester: 2, size: "an avocado", sizeHi: "makhanphal", fruit: "avocado",
    dev: "Baby can hear muffled sounds now — your voice is the favourite.",
    mom: "A gentle glow sets in, and bonding deepens day by day.",
    nutrition: "Calcium care — doodh, dahi, til and ragi.",
    ritual: "Read a few lines aloud — koi bhi kahaani, gently.",
  },
  {
    week: 20, trimester: 2, size: "a banana", sizeHi: "kela", fruit: "banana",
    dev: "Halfway there. Tiny kicks and flutters are saying hello.",
    mom: "The anatomy scan arrives — a tender little milestone.",
    nutrition: "A colourful plate — saag, dal and seasonal phal.",
    ritual: "Garbh Sanskar: play a soft raga and simply be, together.",
  },
  {
    week: 24, trimester: 2, size: "an ear of corn", sizeHi: "bhutta", fruit: "corn",
    dev: "Taste buds and tiny lungs are quietly practising.",
    mom: "Your bump leads the way now — wear whatever feels soft.",
    nutrition: "Hydrate well; soaked almonds (bhige badaam) daily.",
    ritual: "Talk to your baby — share one small hope for today.",
  },
  {
    week: 28, trimester: 3, size: "a brinjal", sizeHi: "baingan", fruit: "eggplant",
    dev: "Eyes can open and dreams begin. Welcome to trimester three.",
    mom: "Rest on your side; soft cushions are your friends.",
    nutrition: "Fibre-forward — oats, fruit and plenty of paani.",
    ritual: "A moment for you — stretch, sigh, soften your shoulders.",
  },
  {
    week: 32, trimester: 3, size: "a coconut", sizeHi: "nariyal", fruit: "coconut",
    dev: "Putting on soft baby weight, with bones quietly strengthening.",
    mom: "Practise gentle breathing — it is never too early.",
    nutrition: "Small, frequent meals ease that full feeling.",
    ritual: "Kegel care, calmly — just a few slow, easy rounds.",
  },
  {
    week: 40, trimester: 3, size: "a watermelon", sizeHi: "tarbooj", fruit: "watermelon",
    dev: "Fully grown and ready to meet you. Any day now, mumma.",
    mom: "Trust your body. Your hospital bag is packed and waiting.",
    nutrition: "Light, warm, easy meals — khichdi is kind.",
    ritual: "Breathe. Aap taiyaar ho. You are ready. ❤",
  },
];

/* — The winding Journey Map milestones — */
export const MILESTONES: {
  week: string;
  title: string;
  sub: string;
  icon: IconKey;
  tint: "brand" | "coral" | "earth";
}[] = [
  { week: "Week 4", title: "A tiny seed", sub: "Your journey begins.", icon: "seed", tint: "brand" },
  { week: "Week 8", title: "First flutter", sub: "A heartbeat appears.", icon: "heart", tint: "coral" },
  { week: "Week 12", title: "Trimester one, complete", sub: "The first scan, a first smile.", icon: "check", tint: "brand" },
  { week: "Week 20", title: "Halfway there", sub: "The anatomy scan.", icon: "star", tint: "coral" },
  { week: "Week 28", title: "Into trimester three", sub: "The home stretch begins.", icon: "leaf", tint: "earth" },
  { week: "Week 36", title: "Almost ready", sub: "Bags packed, hearts full.", icon: "bag", tint: "brand" },
  { week: "Birth", title: "Baby's first cry", sub: "Welcome, little one. 🎉", icon: "sparkle", tint: "coral" },
];

/* — Garbh Sanskar: the daily five rituals — */
export const GARBH_RITUALS: { title: string; hindi: string; desc: string; icon: IconKey }[] = [
  { title: "Raga", hindi: "राग", desc: "A soft classical raga to calm you both.", icon: "music" },
  { title: "Affirmation", hindi: "भाव", desc: "A gentle line to soften the mind.", icon: "sparkle" },
  { title: "Today's recipe", hindi: "रसोई", desc: "A sattvic dish suited to your trimester.", icon: "bowl" },
  { title: "Spoken lines", hindi: "बोल", desc: "Warm words to read aloud to your baby.", icon: "speak" },
  { title: "Stillness", hindi: "ठहराव", desc: "A quiet moment, simply to be.", icon: "lotus" },
];

/* — Daily Moment ritual chips — */
export const DAILY_MOMENTS: { label: string; icon: IconKey }[] = [
  { label: "Grow", icon: "seed" },
  { label: "Read to your baby", icon: "book" },
  { label: "Talk to your baby", icon: "speak" },
  { label: "Garbh Sanskar", icon: "lotus" },
  { label: "A moment for you", icon: "moon" },
  { label: "Movement", icon: "heartPulse" },
];

/* — Calm Tools (detail chips) — */
export const TOOLS: { label: string; icon: IconKey }[] = [
  { label: "Baby Movement", icon: "heartPulse" },
  { label: "Weight Tracker", icon: "scale" },
  { label: "Kegel Care", icon: "kegel" },
  { label: "Contractions", icon: "contraction" },
  { label: "My Hospital Bag", icon: "bag" },
];

/* — Library: articles & recipes — */
export const ARTICLES: { title: string; category: string; read: string; excerpt: string; tint: "brand" | "coral" | "earth" }[] = [
  { title: "The fourth trimester: postpartum care", category: "Postpartum", read: "6 min read", excerpt: "Gentle, practical ways to care for yourself in the tender weeks after birth.", tint: "brand" },
  { title: "Eating for two, the calm way", category: "Nutrition", read: "5 min read", excerpt: "Why 'two plates' is a myth — and what real nourishment looks like.", tint: "coral" },
  { title: "Understanding baby movements", category: "Week 24+", read: "4 min read", excerpt: "What those flutters and kicks mean — and when to simply relax.", tint: "earth" },
  { title: "Sleeping soft in trimester three", category: "Trimester 3", read: "5 min read", excerpt: "Small, soothing changes for kinder, deeper rest as your bump grows.", tint: "brand" },
];

export const RECIPES: { title: string; category: string; read: string; excerpt: string; tag: "Recipe" | "Nushkhe"; tint: "brand" | "coral" | "earth" }[] = [
  { title: "Moong dal khichdi with curd", category: "Recipe · Trimester 3", read: "25 min", excerpt: "Warm, light and easy to digest — comfort in a single bowl.", tag: "Recipe", tint: "earth" },
  { title: "Lemon-ginger water + soaked almonds", category: "Nushkhe · Mornings", read: "5 min", excerpt: "A gentle morning settler for queasy, early-trimester days.", tag: "Nushkhe", tint: "coral" },
  { title: "Soothing nighttime remedies", category: "Nushkhe · Rest", read: "3 min", excerpt: "Dadi-maa's calming rituals for softer, deeper sleep.", tag: "Nushkhe", tint: "brand" },
  { title: "Ragi & date porridge", category: "Recipe · Trimester 2", read: "15 min", excerpt: "Iron and calcium, the slow-cooked, grandmother-approved way.", tag: "Recipe", tint: "earth" },
];

/* — FAQ — */
export const FAQS: { q: string; a: string }[] = [
  { q: "Is ParentVeda free?", a: "Yes — you can begin for free. Gentle premium extras may arrive later, but never any pressure." },
  { q: "Is the content bilingual?", a: "Absolutely. ParentVeda speaks both English and Hinglish, so it feels like home from day one." },
  { q: "Is this medical advice?", a: "No. ParentVeda offers gentle, evidence-informed guidance — a calm companion, not a doctor. Always consult your OB-GYN for any medical decisions." },
  { q: "What is Garbh Sanskar?", a: "An age-old Indian practice of nurturing your baby in the womb through music, affirmations, food and calm. We offer it as a soft, optional daily ritual." },
  { q: "Does it work for fathers too?", a: "Yes. Father Mode is a parallel journey, so partners can grow, learn and bond right alongside you." },
  { q: "Which weeks are covered?", a: "Every week from 4 to 40 — plus gentle guidance as you step into early parenthood." },
  { q: "Is my data private?", a: "Your journey is yours. We treat your data with care and never sell it — privacy is part of feeling calm." },
  { q: "Are there scores, streaks or scary alerts?", a: "Never. No scores, no streak-pressure, no diagnostic scare-language. A calm nursery, not a toy store." },
];

/* — Ask Veda sample chat — */
export const ASK_VEDA_CHAT: { from: "user" | "veda"; text: string }[] = [
  { from: "user", text: "Can I eat papaya during pregnancy?" },
  { from: "veda", text: "Ripe papaya in small amounts is usually fine — it's the raw, unripe one that's best avoided. When in doubt, check with your doctor. 🌸" },
  { from: "user", text: "Mujhe raat ko neend nahi aati 😔" },
  { from: "veda", text: "Aapka thaka mann samajh sakti hoon. Try warm haldi-doodh, dim the lights, and a slow 4-7-8 saans. Main yahin hoon. 🤍" },
];

export const ASK_VEDA_PROMPTS = [
  "Can I… eat this?",
  "Is this symptom normal?",
  "A raga for tonight?",
  "Which foods this week?",
] as const;

/* — Social proof (NEW). Placeholders — swap for real numbers/quotes when ready. — */
export const TRUST_STATS: { icon: IconKey; value: string; label: string }[] = [
  { icon: "heart", value: "Be #1", label: "Join the very first wave on the waitlist" },
  { icon: "globe", value: "2 languages", label: "English & Hinglish, side by side" },
  { icon: "lotus", value: "Rooted", label: "In Indian tradition & Garbh Sanskar" },
];

/* Honest placeholder testimonials — replace with real beta/early-user quotes. */
export const TESTIMONIALS: { quote: string; name: string; meta: string }[] = [
  {
    quote:
      "Finally an app that doesn't make me anxious. It feels like a calm friend, not a doctor's dashboard.",
    name: "Early reader",
    meta: "Second trimester",
  },
  {
    quote: "Garbh Sanskar mere routine ka hissa ban gaya. Bohot sukoon milta hai.",
    name: "Early reader",
    meta: "Hinglish",
  },
  {
    quote:
      "My husband uses Father Mode — we finally feel like we're on this journey together.",
    name: "Early reader",
    meta: "Third trimester",
  },
];

/* — Journal teaser: a few featured reads (full library lives in the Journal) — */
export const FEATURED_JOURNAL: {
  title: string;
  category: string;
  read: string;
  tag: "Article" | "Recipe" | "Can I…?";
  icon: IconKey;
  tint: "brand" | "coral" | "earth";
}[] = [
  { title: "The fourth trimester: postpartum care", category: "Postpartum", read: "6 min read", tag: "Article", icon: "heart", tint: "brand" },
  { title: "Eating for two, the calm way", category: "Nutrition", read: "5 min read", tag: "Article", icon: "bowl", tint: "coral" },
  { title: "Moong dal khichdi with curd", category: "Recipe · Trimester 3", read: "25 min", tag: "Recipe", icon: "bowl", tint: "earth" },
  { title: "Can I eat papaya during pregnancy?", category: "Can I…?", read: "3 min read", tag: "Can I…?", icon: "leaf", tint: "brand" },
];

/* — Waitlist + Newsletter copy (NEW — the primary conversion module) — */
export const WAITLIST = {
  eyebrow: "Be first in line",
  title: "Be first to meet ParentVeda.",
  body:
    "The app is on its way to iOS and Android. Join the waitlist and we'll gently let you know the day it's ready — and send you a soft weekly letter until then.",
  waitlistLabel: "Tell me when the app launches",
  newsletterLabel: "Send me the weekly gentle letter — recipes, ragas & calm reads",
  button: "Join the waitlist",
  micro: "No spam, ever · unsubscribe any time · your email stays private.",
  success: "Almost there — check your inbox for a gentle confirmation. 🌸",
} as const;

/* — Footer — */
/* PRESERVED — pre-waitlist footer links.
export const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Articles", href: "#library" },
  { label: "Recipes & Nushkhe", href: "#library" },
  { label: "Ask Veda", href: "#ask-veda" },
  { label: "FAQ", href: "#faq" },
  { label: "Download", href: "#download" },
] as const;
*/
/* Footer is shared across the landing page AND /guides pages, so anchors are
   root-relative (/#about) to resolve from any route. */
export const FOOTER_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Guides", href: "/guides" },
  { label: "Ask Veda", href: "/#ask-veda" },
  { label: "FAQ", href: "/#faq" },
  { label: "Join the Waitlist", href: "/#waitlist" },
] as const;

export const WHATSAPP_HREF = "https://wa.me/910000000000";
export const APP_STORE_HREF = "#download";
export const PLAY_STORE_HREF = "#download";
