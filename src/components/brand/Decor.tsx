/**
 * Ambient, decorative bits — soft blurred blobs, botanical sprigs
 * and gentle twinkles. All purely presentational + aria-hidden.
 */

/* A soft, blurred colour blob for dreamy section backdrops. */
export function Blob({
  className = "",
  animate = false,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${
        animate ? "animate-blob" : ""
      } ${className}`}
    />
  );
}

/* A gentle botanical sprig — a calm, leafy accent. */
export function Sprig({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 90 110"
      className={className}
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M45 108C45 86 41 64 49 44 54 31 62 21 72 12" />
      </g>
      <g fill="currentColor" opacity="0.9">
        <ellipse cx="40" cy="74" rx="12" ry="6.5" transform="rotate(28 40 74)" />
        <ellipse cx="56" cy="58" rx="12" ry="6.5" transform="rotate(-22 56 58)" />
        <ellipse cx="48" cy="44" rx="11" ry="6" transform="rotate(32 48 44)" />
        <ellipse cx="64" cy="32" rx="11" ry="6" transform="rotate(-26 64 32)" />
        <ellipse cx="60" cy="18" rx="9" ry="5" transform="rotate(36 60 18)" />
      </g>
    </svg>
  );
}

/* Scattered, slowly twinkling dots. */
export function Twinkles({ className = "" }: { className?: string }) {
  const dots = [
    { left: "8%", top: "22%", s: 6, d: "0s" },
    { left: "82%", top: "14%", s: 8, d: "0.8s" },
    { left: "68%", top: "60%", s: 5, d: "1.6s" },
    { left: "20%", top: "70%", s: 7, d: "2.2s" },
    { left: "92%", top: "44%", s: 5, d: "1.1s" },
    { left: "40%", top: "10%", s: 6, d: "2.8s" },
  ];
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {dots.map((p, i) => (
        <span
          key={i}
          className="absolute animate-twinkle rounded-full bg-coral-300"
          style={{
            left: p.left,
            top: p.top,
            width: p.s,
            height: p.s,
            animationDelay: p.d,
          }}
        />
      ))}
    </div>
  );
}
