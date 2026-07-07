import Container from "./Container";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  /** When true, render children full-bleed (caller manages its own Container). */
  full?: boolean;
};

export default function Section({
  id,
  children,
  className = "",
  innerClassName = "",
  full = false,
}: SectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      {full ? children : <Container className={innerClassName}>{children}</Container>}
    </section>
  );
}
