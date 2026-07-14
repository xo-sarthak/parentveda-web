import Icon from "@/components/brand/Icon";
import type { GuideCategory } from "@/lib/guides";
import type { Tint } from "@/lib/ui";

/**
 * A crafted, editorial thumbnail for guide cards — layered tint wash,
 * a dotted trail-arc motif (echoing the Journey Map) and the category
 * icon held in a soft organic blob. Purely decorative.
 */

const WASH: Record<Tint, string> = {
  brand: "from-brand-100 via-mist to-coral-50/70",
  coral: "from-coral-100 via-coral-50 to-mist/80",
  earth: "from-earth-100 via-earth-50 to-mist/70",
};

const ARC: Record<Tint, string> = {
  brand: "text-brand-400/45",
  coral: "text-coral-400/45",
  earth: "text-earth-300/70",
};

const GLYPH: Record<Tint, string> = {
  brand: "text-brand-500",
  coral: "text-coral-500",
  earth: "text-earth-500",
};

export default function Thumb({
  category,
  className = "",
}: {
  category: GuideCategory;
  className?: string;
}) {
  const tint = category.tint;

  return (
    <div
      aria-hidden
      className={`relative grid place-items-center overflow-hidden bg-gradient-to-br ${WASH[tint]} ${className}`}
    >
      {/* dotted trail arcs, tucked into the corner like a little journey */}
      <svg
        viewBox="0 0 200 120"
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full ${ARC[tint]}`}
      >
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.4 6.5">
          <circle cx="196" cy="122" r="34" />
          <circle cx="196" cy="122" r="58" />
          <circle cx="196" cy="122" r="82" />
        </g>
        <g fill="currentColor" opacity="0.8">
          <circle cx="22" cy="22" r="2.4" />
          <circle cx="38" cy="12" r="1.7" />
          <circle cx="14" cy="40" r="1.7" />
        </g>
      </svg>

      {/* the category glyph in a soft organic blob */}
      <span
        className={`relative grid h-16 w-16 place-items-center bg-white/75 shadow-soft backdrop-blur ${GLYPH[tint]}`}
        style={{ borderRadius: "44% 56% 52% 48% / 52% 44% 56% 48%" }}
      >
        <Icon name={category.icon} className="h-7 w-7" />
      </span>
    </div>
  );
}
