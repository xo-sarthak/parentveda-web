import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import { LEGAL_BASE, ORG } from "@/lib/legal";

/**
 * Shared shell and prose primitives for the policy pages.
 *
 * Policies are read under stress — someone looking for how to delete their
 * data, or whether an article counts as medical advice. So: a real contents
 * list, short sections with plain headings, and no wall of capitals. The
 * measure is capped like the articles are.
 */

export function LegalPage({
  title,
  summary,
  sections,
  children,
}: {
  title: string;
  summary: string;
  /** Anchors for the contents list — must match the <S id> values below. */
  sections: { id: string; title: string }[];
  children: React.ReactNode;
}) {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Legal", href: LEGAL_BASE },
            { name: title, href: "#" },
          ]}
        />

        <header className="mt-6">
          <h1 className="text-balance font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[2.9rem]">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-[1.12rem] leading-relaxed text-ink-500">{summary}</p>
          <p className="mt-4 text-sm text-ink-400">
            Effective {ORG.effective} · Last updated {ORG.updated}
          </p>
        </header>

        {sections.length > 1 ? (
          <nav
            aria-label="Contents"
            className="mt-9 rounded-card bg-mist/60 px-5 py-5 ring-1 ring-brand-500/10"
          >
            <p className="font-heading text-[0.7rem] font-bold uppercase tracking-[0.16em] text-brand-700">
              Contents
            </p>
            <ol className="mt-3 flex flex-col gap-2">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3 text-[0.95rem] leading-snug">
                  <span className="w-4 shrink-0 text-right font-heading text-[0.8rem] font-bold text-brand-300">
                    {i + 1}
                  </span>
                  <a
                    href={`#${s.id}`}
                    className="text-ink-700 underline-offset-4 transition-colors hover:text-brand-600 hover:underline"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mt-10">{children}</div>

        <p className="mt-14 border-t border-brand-500/10 pt-6 text-sm leading-relaxed text-ink-400">
          Questions about this page? Write to{" "}
          <A href={`mailto:${ORG.contactEmail}`}>{ORG.contactEmail}</A>. You can also read our{" "}
          <Link href={LEGAL_BASE} className="text-brand-600 underline-offset-4 hover:underline">
            other policies
          </Link>
          .
        </p>
      </div>
    </Container>
  );
}

/** A numbered top-level section. `id` must match the contents entry. */
export function S({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-ink-100 pt-8 [&:first-of-type]:border-t-0 [&:first-of-type]:pt-0"
    >
      <h2 className="font-display text-[1.75rem] font-bold leading-[1.18] tracking-[-0.025em] text-ink-900">
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-4 pb-8">{children}</div>
    </section>
  );
}

/** A sub-heading inside a section. */
export function H({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-2 font-heading text-[1.1rem] font-bold tracking-[-0.01em] text-ink-900">
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[1.05rem] leading-[1.75] text-ink-800">{children}</p>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-2.5">{children}</ul>;
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[1.02rem] leading-[1.7] text-ink-800">
      <span
        aria-hidden
        className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-coral-400"
      />
      <span className="min-w-0 flex-1">{children}</span>
    </li>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="font-medium text-brand-600 underline decoration-brand-200 underline-offset-4 transition-colors hover:text-brand-700"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Something the reader must not miss — used sparingly. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="rounded-r-2xl border-l-4 border-coral-500 bg-coral-50/70 px-5 py-4 text-[1rem] leading-[1.7] text-ink-800">
      {children}
    </aside>
  );
}
