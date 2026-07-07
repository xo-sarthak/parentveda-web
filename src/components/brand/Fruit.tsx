/**
 * Soft, cartoonish "baby size" fruit illustrations for the
 * Week-on-Week preview. Colours are gently muted to stay calm.
 */
type FruitProps = { name: string; className?: string };

const LEAF = "#7FB97C";
const LEAF_DK = "#5E9E5C";

export default function Fruit({ name, className }: FruitProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      {SHAPES[name] ?? SHAPES.lime}
    </svg>
  );
}

const SHAPES: Record<string, React.ReactNode> = {
  poppySeed: (
    <g>
      <circle cx="32" cy="34" r="20" fill="#F3ECDF" />
      <circle cx="28" cy="30" r="2.1" fill="#6B4A1F" />
      <circle cx="35" cy="28" r="2.1" fill="#6B4A1F" />
      <circle cx="38" cy="35" r="2.1" fill="#6B4A1F" />
      <circle cx="30" cy="38" r="2.1" fill="#6B4A1F" />
      <circle cx="33" cy="33" r="2.1" fill="#6B4A1F" />
      <circle cx="25" cy="35" r="1.8" fill="#6B4A1F" />
    </g>
  ),
  raspberry: (
    <g>
      <path d="M32 12c2.6 0 5 1.3 5 4l-3 3h-4l-3-3c0-2.7 2.4-4 5-4Z" fill={LEAF} />
      <path d="M32 14.5l2.5 4.5h-5Z" fill={LEAF_DK} opacity="0.5" />
      <g fill="#E2607F">
        <circle cx="27" cy="26" r="5" />
        <circle cx="37" cy="26" r="5" />
        <circle cx="32" cy="28" r="5" />
        <circle cx="24" cy="34" r="5" />
        <circle cx="40" cy="34" r="5" />
        <circle cx="29" cy="37" r="5" />
        <circle cx="35" cy="37" r="5" />
        <circle cx="32" cy="44" r="5" />
      </g>
      <g fill="#F08AA1" opacity="0.7">
        <circle cx="25.5" cy="24.5" r="1.6" />
        <circle cx="35.5" cy="24.5" r="1.6" />
        <circle cx="30.5" cy="26.5" r="1.6" />
      </g>
    </g>
  ),
  lime: (
    <g>
      <path d="M40 14c4 0 8 1 11 4-3 2-6 2.5-9 2" fill={LEAF} />
      <circle cx="30" cy="36" r="18" fill="#9FC85F" />
      <circle cx="30" cy="36" r="18" fill="#86B84A" opacity="0.25" />
      <ellipse cx="24" cy="29" rx="5" ry="3.5" fill="#C6E08C" opacity="0.8" />
    </g>
  ),
  avocado: (
    <g>
      <path d="M32 8c4 0 6 3 6 7s-2 6-2 10c0 9-1 27-4 27s-4-18-4-27c0-4-2-6-2-10s2-7 6-7Z" fill="#6FA86A" opacity="0" />
      <path d="M32 14c8 0 13 9 13 19s-6 22-13 22-13-12-13-22 5-19 13-19Z" fill="#5E8E58" />
      <path d="M32 20c5.5 0 9 6.5 9 14s-4 16-9 16-9-8.5-9-16 3.5-14 9-14Z" fill="#E9F0C9" />
      <circle cx="32" cy="40" r="6.5" fill="#9A6A35" />
      <circle cx="30" cy="38" r="2.2" fill="#B98A55" opacity="0.7" />
      <path d="M32 9c3.5 0 4.5 3 4.5 5l-4.5 2-4.5-2c0-2 1-5 4.5-5Z" fill={LEAF} />
    </g>
  ),
  banana: (
    <g>
      <path d="M14 24c1 12 10 24 26 26 5 .7 9-.4 11-3-3 .3-7-.2-12-2-12-4-19-13-21-22-.5-2.3-3.4-1.9-4 1Z" fill="#EFC24E" />
      <path d="M14 24c1 12 10 24 26 26 2.4.3 4.6.2 6.4-.4-2.2.1-4.8-.3-7.4-1.1C26 44.4 18 34 16 24.4c-.4-2-1.7-2.1-2-0.4Z" fill="#F6D77A" />
      <path d="M48 47c2 .2 3.6-.2 4.6-1.4-1.3.3-2.9.3-4.6.1Z" fill="#8A5A2B" />
      <path d="M14.4 22.6c-.7-.6-1.6-.4-2 .9.5-.2 1.2-.2 2-.9Z" fill="#8A5A2B" />
    </g>
  ),
  corn: (
    <g>
      <path d="M20 16c-4 0-7 4-6 10 8-1 12 1 12 1s-2-11-6-11Z" fill={LEAF} />
      <path d="M44 16c4 0 7 4 6 10-8-1-12 1-12 1s2-11 6-11Z" fill={LEAF_DK} />
      <path d="M32 14c7 0 11 8 11 18s-4 18-11 18-11-8-11-18 4-18 11-18Z" fill="#F2C94C" />
      <g fill="#E0A93B" opacity="0.55">
        <path d="M27 22v26M32 20v30M37 22v26" />
      </g>
      <g fill="#F7DD7E">
        <circle cx="27" cy="26" r="1.6" /><circle cx="32" cy="24" r="1.6" /><circle cx="37" cy="26" r="1.6" />
        <circle cx="27" cy="34" r="1.6" /><circle cx="32" cy="32" r="1.6" /><circle cx="37" cy="34" r="1.6" />
        <circle cx="27" cy="42" r="1.6" /><circle cx="32" cy="40" r="1.6" /><circle cx="37" cy="42" r="1.6" />
      </g>
    </g>
  ),
  eggplant: (
    <g>
      <path d="M30 12c1 4 5 5 8 5 1 4-1 8-5 8" fill="none" stroke={LEAF_DK} strokeWidth="0" />
      <path d="M34 18c10 2 16 11 14 22-2 10-11 14-20 10S15 36 21 27c2.8-4.2 7-6 13-9Z" fill="#7A3FA8" />
      <path d="M34 18c10 2 16 11 14 22-1.2 6-5 10-9.6 11.6 2.6-2.4 4.6-6 5.6-10.6 2-9-1-17-10-21Z" fill="#5E2E86" opacity="0.6" />
      <ellipse cx="28" cy="30" rx="4" ry="6" fill="#9B6BC4" opacity="0.55" transform="rotate(-25 28 30)" />
      <path d="M30 12c.8 3.4 3.6 5 7.4 5.2-1 2.6-3.4 4-7 3.8-2.6-.2-4.2-2-4.4-4.6C26 13.6 28 11.4 30 12Z" fill={LEAF} />
      <path d="M31 9c.4 2.5.6 4 .2 6" stroke={LEAF_DK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </g>
  ),
  coconut: (
    <g>
      <path d="M32 8c3 4 9 5 14 4-2 3-7 5-11 4M32 8c-3 4-9 5-14 4 2 3 7 5 11 4" fill={LEAF} />
      <circle cx="32" cy="36" r="19" fill="#8A5A2B" />
      <circle cx="32" cy="36" r="19" fill="#6E4521" opacity="0.3" />
      <ellipse cx="26" cy="29" rx="5" ry="3.5" fill="#A9763F" opacity="0.7" />
      <g fill="#3F2913">
        <circle cx="30" cy="32" r="2.2" /><circle cx="37" cy="33" r="2.2" /><circle cx="33" cy="39" r="2.2" />
      </g>
    </g>
  ),
  watermelon: (
    <g>
      <path d="M12 22c4-4 36-4 40 0 4 12 4 24 0 30-4 4-36 4-40 0-4-6-4-18 0-30Z" fill="#5E8E58" />
      <path d="M16 25c3-3 29-3 32 0 3 10 3 18 0 23-3 3-29 3-32 0-3-5-3-13 0-23Z" fill="#CFE3B0" />
      <path d="M19 27c3-2.5 23-2.5 26 0 2.5 8 2.5 14 0 18-3 2.5-23 2.5-26 0-2.5-4-2.5-10 0-18Z" fill="#F97D97" />
      <g fill="#3F2913">
        <ellipse cx="26" cy="34" rx="1.4" ry="2.2" /><ellipse cx="33" cy="32" rx="1.4" ry="2.2" />
        <ellipse cx="39" cy="35" rx="1.4" ry="2.2" /><ellipse cx="29" cy="40" rx="1.4" ry="2.2" />
        <ellipse cx="36" cy="40" rx="1.4" ry="2.2" />
      </g>
    </g>
  ),
};
