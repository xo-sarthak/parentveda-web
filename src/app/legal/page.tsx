import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/guides/Breadcrumbs";
import { LEGAL_BASE, LEGAL_PAGES, ORG, legalPath } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Policies",
  description:
    "ParentVeda's privacy policy, terms of use, medical disclaimer, cookie policy and editorial standards.",
  alternates: { canonical: LEGAL_BASE },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${LEGAL_BASE}`,
    title: "ParentVeda — Policies",
  },
};

export default function LegalIndexPage() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Legal", href: LEGAL_BASE }]} />

        <header className="mt-6">
          <h1 className="text-balance font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[2.9rem]">
            Policies
          </h1>
          <p className="mt-4 text-pretty text-[1.12rem] leading-relaxed text-ink-500">
            How {ORG.brand} handles your information, what we promise, and the limits of what
            guidance from a website or an app can be.
          </p>
        </header>

        <ul className="mt-10 flex flex-col gap-4">
          {LEGAL_PAGES.map((p) => (
            <li key={p.slug}>
              <Link
                href={legalPath(p.slug)}
                className="group block rounded-card border-l-[3px] border-brand-500 bg-surface px-6 py-5 shadow-soft ring-1 ring-brand-500/10 transition-shadow hover:shadow-card"
              >
                <p className="font-heading text-[1.1rem] font-bold tracking-[-0.01em] text-ink-900 transition-colors group-hover:text-brand-700">
                  {p.title}
                </p>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-600">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-sm leading-relaxed text-ink-400">
          Last updated {ORG.updated}. If anything here is unclear, write to{" "}
          <a
            href={`mailto:${ORG.contactEmail}`}
            className="text-brand-600 underline-offset-4 hover:underline"
          >
            {ORG.contactEmail}
          </a>{" "}
          and we will explain it in plain words.
        </p>
      </div>
    </Container>
  );
}
