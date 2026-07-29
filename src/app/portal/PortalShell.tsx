import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { signOut } from "@/app/actions/portal-auth";

/**
 * The frame every portal page sits in.
 *
 * Deliberately plain compared with the marketing site — no decor, no blobs, no
 * reveal animations. This is a work surface someone opens on a Tuesday
 * afternoon to answer a question from their CFO, and the site's warmth would
 * read as noise here. It is still unmistakably ParentVeda: same palette, same
 * fonts, same corner radii.
 */
export default function PortalShell({
  children,
  sponsorName,
}: {
  children: React.ReactNode;
  sponsorName?: string;
}) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-ink-100 bg-surface">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-5 py-4">
          <Link href="/portal" className="shrink-0">
            <Logo />
          </Link>
          <span className="hidden text-xs font-jakarta font-bold uppercase tracking-wide text-ink-400 sm:inline">
            Programme
          </span>
          <div className="ml-auto flex items-center gap-4">
            {sponsorName && (
              <span className="hidden text-sm text-ink-600 sm:inline">
                {sponsorName}
              </span>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="font-jakarta text-sm font-semibold text-ink-500 transition hover:text-ink-900"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-14">{children}</main>

      <footer className="mx-auto max-w-4xl px-5 pb-14">
        <p className="text-xs leading-relaxed text-ink-400">
          Figures update live. Behavioural totals are withheld while a group is
          small enough that they would identify someone.{" "}
          <a href="/legal/privacy" className="underline">
            Privacy policy
          </a>
        </p>
      </footer>
    </div>
  );
}
