/* Shared tint tokens. Full literal class strings (so Tailwind detects them). */
export type Tint = "brand" | "coral" | "earth";

export const TINT: Record<
  Tint,
  { soft: string; chip: string; text: string; ring: string; icon: string; dot: string }
> = {
  brand: {
    soft: "bg-brand-50",
    chip: "bg-brand-100/70",
    text: "text-brand-600",
    ring: "ring-brand-500/15",
    icon: "text-brand-500 bg-brand-50",
    dot: "bg-brand-400",
  },
  coral: {
    soft: "bg-coral-50",
    chip: "bg-coral-100/70",
    text: "text-coral-700",
    ring: "ring-coral-500/15",
    icon: "text-coral-500 bg-coral-50",
    dot: "bg-coral-300",
  },
  earth: {
    soft: "bg-earth-50",
    chip: "bg-earth-100/70",
    text: "text-earth-500",
    ring: "ring-earth-500/20",
    icon: "text-earth-500 bg-earth-50",
    dot: "bg-earth-300",
  },
};
