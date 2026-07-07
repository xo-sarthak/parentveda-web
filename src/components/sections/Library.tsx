"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/brand/Icon";
import { ARTICLES, RECIPES, type IconKey } from "@/lib/content";
import { type Tint } from "@/lib/ui";

type Tab = "articles" | "recipes";

const THUMB: Record<Tint, string> = {
  brand: "from-brand-100 to-mist",
  coral: "from-coral-100 to-coral-50",
  earth: "from-earth-100 to-earth-50",
};

const ARTICLE_ICONS: IconKey[] = ["heart", "bowl", "heartPulse", "moon"];

type CardItem = {
  title: string;
  category: string;
  read: string;
  excerpt: string;
  tint: Tint;
  icon: IconKey;
  tag?: "Recipe" | "Nushkhe";
};

const articleItems: CardItem[] = ARTICLES.map((a, i) => ({
  ...a,
  icon: ARTICLE_ICONS[i % ARTICLE_ICONS.length],
}));

const recipeItems: CardItem[] = RECIPES.map((r) => ({
  ...r,
  icon: r.tag === "Nushkhe" ? "leaf" : "bowl",
}));

export default function Library() {
  const [tab, setTab] = useState<Tab>("articles");
  const items = tab === "articles" ? articleItems : recipeItems;

  return (
    <Section id="library" className="py-20 sm:py-28">
      <SectionHeading
        eyebrow="Articles · Blogs · Recipes · Nushkhe"
        title="Trustworthy reading,"
        accent="the calm way."
        subtitle="Stage-aware articles and blogs, plus trimester recipes and gentle traditional nushkhe — all also inside the app."
      />

      {/* Tabs */}
      <Reveal delay={0.1}>
        <div className="mt-9 flex justify-center">
          <div
            role="tablist"
            aria-label="Library categories"
            className="inline-flex rounded-full bg-white p-1.5 shadow-soft ring-1 ring-brand-500/10"
          >
            <TabButton active={tab === "articles"} onClick={() => setTab("articles")} icon="book">
              Articles &amp; Guides
            </TabButton>
            <TabButton active={tab === "recipes"} onClick={() => setTab("recipes")} icon="bowl">
              Recipes &amp; Nushkhe
            </TabButton>
          </div>
        </div>
      </Reveal>

      {/* Cards */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((item) => (
              <LibraryCard key={item.title} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Reveal delay={0.1}>
        <p className="mt-9 text-center text-sm text-ink-500">
          New, gentle reads added often —{" "}
          <a href="#download" className="font-semibold text-brand-600 underline-offset-4 hover:underline">
            explore the full library in the app
          </a>
          .
        </p>
      </Reveal>
    </Section>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: IconKey;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-colors sm:px-5 ${
        active ? "text-white" : "text-ink-500 hover:text-brand-600"
      }`}
    >
      {active ? (
        <motion.span
          layoutId="lib-tab"
          className="absolute inset-0 rounded-full bg-brand-500 shadow-soft"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      ) : null}
      <span className="relative z-10 flex items-center gap-2">
        <Icon name={icon} className="h-4 w-4" strokeWidth={1.9} />
        {children}
      </span>
    </button>
  );
}

function LibraryCard({ item }: { item: CardItem }) {
  return (
    <article className="lift group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06]">
      {/* thumbnail */}
      <div className={`relative grid h-28 place-items-center bg-gradient-to-br ${THUMB[item.tint]}`}>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/70 text-brand-500 shadow-soft backdrop-blur">
          <Icon name={item.icon} className="h-7 w-7" />
        </span>
        {item.tag ? (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-brand-600 shadow-soft">
            {item.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-brand-400">
          <span>{item.category}</span>
          <span className="h-1 w-1 rounded-full bg-ink-200" />
          <span className="text-ink-400">{item.read}</span>
        </div>
        <h3 className="mt-2 font-heading text-[1.02rem] font-bold leading-snug tracking-tight text-ink-900">
          {item.title}
        </h3>
        <p className="mt-1.5 flex-1 text-[0.88rem] leading-relaxed text-ink-600">
          {item.excerpt}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">
          Read
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
          </svg>
        </span>
      </div>
    </article>
  );
}
