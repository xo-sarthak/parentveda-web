/**
 * A soft, on-brand phone frame. Pass any screen as children.
 * Deliberately light + lavender rather than a hard black device —
 * it should feel like the calm app, not a gadget.
 */
export default function PhoneMock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[286px] sm:w-[306px] ${className}`}
      aria-hidden="true"
    >
      <div className="relative rounded-[46px] bg-gradient-to-b from-white via-white to-mist p-3 shadow-float ring-1 ring-brand-500/10">
        {/* side buttons */}
        <span className="absolute -left-[3px] top-28 h-11 w-[3px] rounded-full bg-brand-200/70" />
        <span className="absolute -left-[3px] top-[170px] h-11 w-[3px] rounded-full bg-brand-200/70" />
        <span className="absolute -right-[3px] top-36 h-16 w-[3px] rounded-full bg-brand-200/70" />

        <div className="relative overflow-hidden rounded-[36px] bg-canvas ring-1 ring-black/[0.05]">
          {/* dynamic island */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-20 h-[26px] w-24 -translate-x-1/2 rounded-full bg-ink-900/85" />
          <div className="h-[604px] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}
