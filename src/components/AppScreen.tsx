import Icon from "@/components/brand/Icon";
import Fruit from "@/components/brand/Fruit";
import type { IconKey } from "@/lib/content";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-bold text-ink-600">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="h-2.5 w-3 rounded-[2px] bg-ink-400/70" />
        <span className="h-2.5 w-4 rounded-[3px] bg-ink-400/70" />
        <span className="h-2.5 w-5 rounded-[3px] border border-ink-400/60 bg-brand-400/80" />
      </span>
    </div>
  );
}

function Tab({ icon, label, active = false }: { icon: IconKey; label: string; active?: boolean }) {
  return (
    <span className="flex flex-1 flex-col items-center gap-1">
      <Icon
        name={icon}
        strokeWidth={1.8}
        className={`h-[22px] w-[22px] ${active ? "text-brand-500" : "text-ink-300"}`}
      />
      <span
        className={`text-[9px] font-semibold ${active ? "text-brand-600" : "text-ink-300"}`}
      >
        {label}
      </span>
    </span>
  );
}

export default function WeekScreen({
  greeting = "Good morning,",
  name = "Aanya",
  week = 20,
  totalWeeks = 40,
  sizeName = "Banana",
  sizeHi = "kela",
  fruit = "banana",
  note = "Halfway there",
  ritual = "Play a soft raga and simply be, together.",
  nutrition = "A colourful plate — saag, dal & seasonal phal.",
}: {
  greeting?: string;
  name?: string;
  week?: number;
  totalWeeks?: number;
  sizeName?: string;
  sizeHi?: string;
  fruit?: string;
  note?: string;
  ritual?: string;
  nutrition?: string;
}) {
  const progress = Math.round((week / totalWeeks) * 100);

  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-mist/70 via-canvas to-canvas">
      <StatusBar />

      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-3">
        <div>
          <p className="text-[11px] font-semibold text-ink-500">{greeting}</p>
          <p className="font-heading text-lg font-extrabold leading-tight text-ink-900">
            {name} <span className="text-coral-500">🌷</span>
          </p>
        </div>
        <span className="rounded-full bg-brand-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-soft">
          Week {week}
        </span>
      </div>

      {/* Daily moment chips */}
      <div className="mt-3 flex gap-1.5 overflow-hidden px-5">
        {[
          { l: "Grow", i: "seed" as IconKey },
          { l: "Read", i: "book" as IconKey },
          { l: "Talk", i: "speak" as IconKey },
          { l: "For you", i: "moon" as IconKey },
        ].map((c) => (
          <span
            key={c.l}
            className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-ink-600 ring-1 ring-brand-500/10"
          >
            <Icon name={c.i} strokeWidth={1.8} className="h-3 w-3 text-brand-400" />
            {c.l}
          </span>
        ))}
      </div>

      {/* Hero week card */}
      <div className="mx-5 mt-3 rounded-[26px] bg-gradient-to-br from-white to-brand-50 p-4 shadow-soft ring-1 ring-brand-500/10">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-400">
          This week
        </p>
        <div className="mt-1.5 flex items-center gap-3">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-mist/80">
            <Fruit name={fruit} className="h-12 w-12" />
          </div>
          <div>
            <p className="text-[12px] leading-snug text-ink-600">
              Baby is about the size of a
            </p>
            <p className="font-heading text-xl font-extrabold leading-tight text-ink-900">
              {sizeName}
            </p>
            <p className="text-[11px] italic text-ink-400">{sizeHi}</p>
          </div>
        </div>
        {/* progress */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10px] font-semibold text-ink-500">
            <span>Week {week}</span>
            <span>{note}</span>
          </div>
          <div className="relative mt-1.5 h-2 rounded-full bg-mist-2">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-400 to-coral-400"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-soft ring-2 ring-coral-400"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Garbh Sanskar moment */}
      <div className="mx-5 mt-3 rounded-[22px] bg-white p-3.5 shadow-soft ring-1 ring-brand-500/10">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-500">
            <Icon name="lotus" className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-[12px] font-bold text-ink-900">Garbh Sanskar</p>
            <p className="text-[10px] text-ink-500">Today&apos;s 5-minute ritual</p>
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <p className="mt-2 rounded-xl bg-mist/60 px-3 py-2 text-[11px] italic leading-snug text-brand-700">
          “{ritual}”
        </p>
      </div>

      {/* Nutrition */}
      <div className="mx-5 mt-3 flex items-center gap-2.5 rounded-[22px] bg-white p-3.5 shadow-soft ring-1 ring-brand-500/10">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-coral-50 text-coral-500">
          <Icon name="leaf" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[12px] font-bold text-ink-900">Nourish today</p>
          <p className="text-[10.5px] leading-snug text-ink-500">{nutrition}</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 border-t border-brand-500/10 bg-white/90 px-3 pb-5 pt-2.5 backdrop-blur">
        <Tab icon="sun" label="Home" active />
        <Tab icon="map" label="Journey" />
        <Tab icon="lotus" label="Garbh" />
        <Tab icon="tools" label="Tools" />
        <Tab icon="heart" label="You" />
      </div>
    </div>
  );
}
