import Link from "next/link";
import Logo from "@/components/brand/Logo";
import Footer from "@/components/sections/Footer";
import { LEGAL_BASE } from "@/lib/legal";

/**
 * Chrome for the policy pages.
 *
 * Deliberately not the landing Navbar (hash anchors that go nowhere from
 * here) nor GuidesHeader (a category nav that has nothing to do with legal
 * documents). Just the mark, a way home, and the site footer.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-500/10 glass">
        <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-7 lg:px-8">
          <Link href="/" aria-label="ParentVeda — home" className="rounded-xl">
            <Logo size={34} wordmarkClassName="text-[1.15rem]" />
          </Link>

          <Link
            href={LEGAL_BASE}
            className="font-heading text-sm font-semibold text-ink-600 transition-colors hover:text-brand-600"
          >
            Policies
          </Link>
        </div>
      </header>

      <main className="min-h-[60vh] bg-canvas">{children}</main>

      <Footer />
    </>
  );
}
