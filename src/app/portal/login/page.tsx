import type { Metadata } from "next";
import Logo from "@/components/brand/Logo";
import LoginForm from "./LoginForm";

/**
 * /portal/login — the way in for someone who administers a sponsored
 * programme.
 *
 * THE SAME ACCOUNT AS THE APP. This is not a separate HR system with its own
 * users table and its own password. It signs in against the same auth.users
 * the ParentVeda app uses, and what unlocks this section is the `sponsor_admin`
 * capability on that account (migration 0060).
 *
 * That is the entitlement architecture doing its job. HR at a customer is very
 * often a parent too — trying to conceive, pregnant, or a partner — and there
 * is no reason to make them keep two identities. They use the app like anyone
 * else, and the same login shows them their programme here.
 *
 * Never prerendered and never indexed: a login page is per-request by
 * definition, and a portal has no business in search results.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programme sign in",
  robots: { index: false, follow: false },
};

export default function PortalLoginPage() {
  return (
    <main className="min-h-screen bg-canvas flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <h1 className="font-jakarta text-2xl font-extrabold text-ink-900 text-center">
          Your ParentVeda programme
        </h1>
        <p className="mt-2 text-center text-sm text-ink-600 leading-relaxed">
          Sign in with your ParentVeda account to see how your team is using the
          benefit.
        </p>

        <div className="mt-7 rounded-2xl bg-surface ring-1 ring-ink-100 p-6">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-ink-500 leading-relaxed">
          This page shows take-up across your organisation. It never shows what
          any individual reads, asks or books — see{" "}
          <a href="/legal/privacy" className="text-brand-600 underline">
            our privacy policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
