import type { Block } from "@/lib/guides";

/** Renders a post's structured content blocks with calm, readable prose. */
export default function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="mt-3 font-display text-[1.6rem] font-medium leading-snug tracking-[-0.01em] text-ink-900">
                {b.text}
              </h2>
            );
          case "p":
            // The opening paragraph reads as an editorial lead — a touch
            // larger, with a serif drop cap.
            if (i === 0) {
              return (
                <p
                  key={i}
                  className="text-pretty text-[1.12rem] leading-relaxed text-ink-700 first-letter:float-left first-letter:mr-2.5 first-letter:font-display first-letter:text-[3.2rem] first-letter:font-medium first-letter:leading-[0.85] first-letter:text-brand-600"
                >
                  {b.text}
                </p>
              );
            }
            return (
              <p key={i} className="text-pretty text-[1.05rem] leading-relaxed text-ink-700">
                {b.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-3">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[1.02rem] leading-relaxed text-ink-700">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                      {j + 1}
                    </span>
                    {it}
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-brand-200 pl-5 font-display text-xl italic leading-relaxed text-ink-700">
                {b.text}
              </blockquote>
            );
          case "callout":
            return (
              <p key={i} className="rounded-2xl bg-mist/70 px-5 py-4 text-[0.92rem] leading-relaxed text-ink-600 ring-1 ring-brand-500/10">
                {b.text}
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
