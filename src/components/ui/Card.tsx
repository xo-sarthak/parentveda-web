export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card bg-surface shadow-card ring-1 ring-brand-500/[0.06] ${className}`}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  icon,
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs font-semibold text-ink-600 ring-1 ring-brand-500/10 ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
