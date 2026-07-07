export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-mist px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-brand-700 ring-1 ring-brand-500/10 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-coral-500" aria-hidden="true" />
      {children}
    </span>
  );
}
