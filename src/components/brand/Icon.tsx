import type { IconKey } from "@/lib/content";

type IconProps = {
  name: IconKey;
  className?: string;
  strokeWidth?: number;
};

/**
 * ParentVeda icon set — soft, rounded, hand-drawn-feeling line glyphs.
 * All inherit `currentColor` so they can be tinted by the parent.
 */
export default function Icon({ name, className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}

const GLYPHS: Record<IconKey, React.ReactNode> = {
  weeks: (
    <>
      <path d="M7.6 6.6V5.3A2.3 2.3 0 0 1 9.9 3h8A2.3 2.3 0 0 1 20.2 5.3v9.4a2.3 2.3 0 0 1-2.3 2.3h-1.3" opacity="0.55" />
      <rect x="3.4" y="6.6" width="13.4" height="14" rx="3.2" />
      <path d="M6.6 11.2h7M6.6 14.6h4.6" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="3.9" />
      <path d="M12 3.2v2.1M12 18.7v2.1M3.2 12h2.1M18.7 12h2.1M5.7 5.7l1.5 1.5M16.8 16.8l1.5 1.5M18.3 5.7l-1.5 1.5M7.2 16.8l-1.5 1.5" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 4.4c1.6 1.9 1.6 4.9 0 6.8-1.6-1.9-1.6-4.9 0-6.8Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 11.2C9.6 9.9 6.7 10 4.9 11.8c1.6 1.7 4.5 2 7.1-.6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M12 11.2c2.4-1.3 5.3-1.2 7.1.6-1.6 1.7-4.5 2-7.1-.6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M3.4 12.7c2.2 3 5.3 4.6 8.6 4.6s6.4-1.6 8.6-4.6" />
    </>
  ),
  map: (
    <>
      <path d="M12 21c4.5-4.1 6.7-7.4 6.7-10.4A6.7 6.7 0 0 0 5.3 10.6C5.3 13.6 7.5 16.9 12 21Z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </>
  ),
  tools: (
    <>
      <path d="M5 7.2h8.5M5 12h4.5M5 16.8h7" />
      <circle cx="17.4" cy="7.2" r="1.9" />
      <circle cx="13.4" cy="12" r="1.9" />
      <circle cx="15.4" cy="16.8" r="1.9" />
    </>
  ),
  father: (
    <>
      <circle cx="9" cy="7.8" r="3" />
      <path d="M3.8 19.2c0-3 2.3-5.2 5.2-5.2s5.2 2.2 5.2 5.2" />
      <circle cx="16.6" cy="9.6" r="2.2" />
      <path d="M14.6 19.2c0-2.3 1.4-4.2 3.2-4.7" />
    </>
  ),
  community: (
    <>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3.4 18.4c0-2.7 2.1-4.6 4.6-4.6 1.2 0 2.3.4 3.1 1.1" />
      <path d="M12.9 14.9c.8-.7 1.9-1.1 3.1-1.1 2.5 0 4.6 1.9 4.6 4.6" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.6" y="5.2" width="16.8" height="15.2" rx="3.2" />
      <path d="M3.6 9.6h16.8M8 3v3.6M16 3v3.6" />
      <circle cx="8.7" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  footsteps: (
    <>
      <ellipse cx="8.4" cy="10.4" rx="2.3" ry="3.3" fill="currentColor" fillOpacity="0.14" />
      <circle cx="8.4" cy="5.8" r="1" fill="currentColor" stroke="none" />
      <ellipse cx="15.6" cy="14.2" rx="2.3" ry="3.3" fill="currentColor" fillOpacity="0.14" />
      <circle cx="15.6" cy="9.6" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  seed: (
    <>
      <path d="M12 21v-7.2" />
      <path d="M12 13.8c0-3 2.1-5 5.1-5 0 3-2.1 5-5.1 5Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M12 15.6c0-2.6-1.8-4.5-4.4-4.5 0 2.6 1.8 4.5 4.4 4.5Z" fill="currentColor" fillOpacity="0.14" />
    </>
  ),
  heart: (
    <path d="M12 20.4c-.5-.4-7.6-5.7-7.6-11.1A4.8 4.8 0 0 1 12 7.1 4.8 4.8 0 0 1 19.6 9.3c0 5.4-7.1 10.7-7.6 11.1Z" />
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M8.4 12.2l2.5 2.4 4.7-5.1" />
    </>
  ),
  star: (
    <path d="M12 4.4l2.3 4.7 5.2.8-3.8 3.6.9 5.1L12 16.4l-4.6 2.2.9-5.1-3.8-3.6 5.2-.8Z" fill="currentColor" fillOpacity="0.14" />
  ),
  leaf: (
    <>
      <path d="M5 19C5 11 10 5.8 19 5c0 9-5.2 14-13 14Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M5 19C8.2 16 12 11.8 16.5 7.4" />
    </>
  ),
  bag: (
    <>
      <path d="M5.4 8.8h13.2l-1 10.6a1.6 1.6 0 0 1-1.6 1.4H8a1.6 1.6 0 0 1-1.6-1.4Z" />
      <path d="M8.6 8.8V7A3.4 3.4 0 0 1 12 3.6 3.4 3.4 0 0 1 15.4 7v1.8" />
      <path d="M12 12.6v3.4M10.3 14.3h3.4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11.4 3.8c.6 3.6 1.6 4.6 5.2 5.2-3.6.6-4.6 1.6-5.2 5.2-.6-3.6-1.6-4.6-5.2-5.2 3.6-.6 4.6-1.6 5.2-5.2Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M17.8 14c.3 1.6.8 2.1 2.4 2.4-1.6.3-2.1.8-2.4 2.4-.3-1.6-.8-2.1-2.4-2.4 1.6-.3 2.1-.8 2.4-2.4Z" fill="currentColor" fillOpacity="0.14" />
    </>
  ),
  music: (
    <>
      <path d="M9 17.4V6.6l9-2v10.2" />
      <circle cx="6.7" cy="17.4" r="2.3" />
      <circle cx="15.7" cy="14.8" r="2.3" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.6 11.2h16.8a8.4 8.4 0 0 1-16.8 0Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M9.3 7.4c0-1.4 1-1.9 1-3.1M13 7.4c0-1.4 1-1.9 1-3.1" />
    </>
  ),
  speak: (
    <>
      <path d="M4.6 7.4A2.2 2.2 0 0 1 6.8 5.2h10.4a2.2 2.2 0 0 1 2.2 2.2v6a2.2 2.2 0 0 1-2.2 2.2H10l-4 3.3v-3.3H6.8a2.2 2.2 0 0 1-2.2-2.2Z" />
      <path d="M8.4 9.6h7.2M8.4 12.4h4.6" />
    </>
  ),
  moon: (
    <>
      <path d="M20.2 14a8 8 0 1 1-9.7-9.6A6.5 6.5 0 0 0 20.2 14Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M16.8 4.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5Z" fill="currentColor" stroke="none" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.6C10.4 5.1 8 4.6 4.6 5.1v12.8C8 17.4 10.4 17.9 12 19.4" />
      <path d="M12 6.6c1.6-1.5 4-2 7.4-1.5v12.8c-3.4-.5-5.8 0-7.4 1.5" />
      <path d="M12 6.6v12.8" />
    </>
  ),
  chat: (
    <path d="M4.4 7.2A2.4 2.4 0 0 1 6.8 4.8h10.4a2.4 2.4 0 0 1 2.4 2.4v5.6a2.4 2.4 0 0 1-2.4 2.4H10l-3.6 3v-3H6.8a2.4 2.4 0 0 1-2.4-2.4Z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.3" />
      <path d="M3.7 12h16.6" />
      <path d="M12 3.7c2.4 2.3 3.7 5.2 3.7 8.3S14.4 18.3 12 20.3C9.6 18.3 8.3 15.1 8.3 12S9.6 6 12 3.7Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 2.5v4.8c0 4.4-3 7.7-7 9.4-4-1.7-7-5-7-9.4V6Z" />
      <path d="M9 12l2 2 4-4.4" />
    </>
  ),
  heartPulse: (
    <>
      <path d="M12 20.2c-.5-.4-7.4-5.5-7.4-10.8A4.6 4.6 0 0 1 12 7.2a4.6 4.6 0 0 1 7.4 2.2c0 1-.3 2-.8 3" />
      <path d="M4.8 13.2h3l1.4-2.8 2.4 5 1.5-2.2h6" />
    </>
  ),
  scale: (
    <>
      <rect x="4.2" y="4.4" width="15.6" height="15.6" rx="4.2" />
      <path d="M12 8.2a3.8 3.8 0 0 1 3.6 2.6" />
      <path d="M12 12l1.9-2.1" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  kegel: (
    <path d="M7.6 9.4c-2.3 0-2.3 5.2 0 5.2 2.1 0 2.6-5.2 4.4-5.2s2.3 5.2 4.4 5.2c2.3 0 2.3-5.2 0-5.2-2.1 0-2.6 5.2-4.4 5.2s-2.3-5.2-4.4-5.2Z" />
  ),
  contraction: (
    <>
      <path d="M3.6 15.2c2.3 0 1.8-7.4 4.4-7.4s2.1 7.4 4.4 7.4 1.8-7.4 4.4-7.4 2 4 3.2 4" />
      <path d="M3.6 18.2h16.8" opacity="0.5" />
    </>
  ),
};
