import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { Blob, Twinkles } from "@/components/brand/Decor";
import { BASE_PATH } from "@/lib/site";
import {
  APP_LIVE,
  isValidCode,
  normaliseCode,
  playStoreUrl,
} from "@/lib/invite";
import InviteRedirect from "./InviteRedirect";

/**
 * /invite/[code] — the landing page for a referral link shared from the app.
 *
 * On Android it exists for a few hundred milliseconds: <InviteRedirect /> sends
 * the phone to Play with the code attached as an install referrer, and the app
 * picks the code up itself on first launch. Nobody types anything.
 *
 * Everywhere else — iPhone, desktop, and the whole pre-launch period while
 * APP_LIVE is false — it's a real page: it shows the invite, shows the code so
 * it can be entered by hand, and gives the visitor somewhere to go.
 */

/* Invite codes are unbounded and one-per-user — never prerender them, and never
   let them into the index (thin, near-duplicate pages on unique URLs). The
   sitemap lists its routes explicitly, so this stays out of it by default. */
export const dynamic = "force-dynamic";

const DESCRIPTION =
  "A friend has invited you to ParentVeda — a calm, bilingual companion for pregnancy and early parenthood, made for Indian parents.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const code = normaliseCode((await params).code);
  if (!isValidCode(code)) return { robots: { index: false, follow: false } };

  const title = "You've been invited to ParentVeda";

  return {
    title,
    description: DESCRIPTION,
    robots: { index: false, follow: false },
    /* This block is the whole reason the page renders HTML instead of issuing a
       redirect — it's what WhatsApp turns into the preview card in the chat. */
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "ParentVeda",
      title,
      description: DESCRIPTION,
      images: [
        {
          url: "/parentveda-logo.jpg",
          width: 1024,
          height: 1024,
          alt: "ParentVeda — Nurturing Wisdom",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DESCRIPTION,
      images: ["/parentveda-logo.jpg"],
    },
  };
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = normaliseCode((await params).code);

  /* Junk in the path (probes, truncated links, someone's typo) gets the normal
     404 rather than a broken-looking invite for a code that can't exist. */
  if (!isValidCode(code)) notFound();

  const playUrl = playStoreUrl(code);

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-mist via-brand-50 to-coral-50/60 px-5 py-14">
      <Blob className="-left-24 top-0 h-80 w-80 bg-brand-200/40" animate />
      <Blob className="-right-20 bottom-0 h-80 w-80 bg-coral-100/50" animate />
      <Twinkles />

      {APP_LIVE ? <InviteRedirect url={playUrl} code={code} /> : null}

      <div className="relative w-full max-w-lg rounded-xl2 bg-surface/85 px-6 py-10 shadow-card ring-1 ring-brand-500/10 backdrop-blur-sm sm:px-10 sm:py-12">
        <div className="flex justify-center">
          <Logo size={44} wordmarkClassName="text-[1.35rem]" />
        </div>

        <div className="mt-8 text-center">
          <Eyebrow>An invitation</Eyebrow>

          <h1 className="mt-5 text-balance font-display text-[2.1rem] font-medium leading-[1.06] tracking-[-0.03em] text-ink-900 sm:text-[2.6rem]">
            A friend saved you a{" "}
            <span className="text-gradient italic">place.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-sm text-pretty text-[1.02rem] leading-relaxed text-ink-600">
            ParentVeda is a calm, bilingual companion for pregnancy and the early
            days after — timeless Indian wisdom, gently modern guidance.
          </p>
        </div>

        {/* The code, shown plainly. Install Referrer carries it automatically in
            the happy path, but it doesn't survive a sideload or some OEM stores
            — and it does nothing at all on iPhone. Printing it keeps the manual
            path open for everyone the automatic one misses. */}
        <div className="mt-8 rounded-card bg-mist/70 px-5 py-5 text-center ring-1 ring-brand-500/10">
          <span className="block text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-700">
            Your invite code
          </span>
          <span className="mt-2.5 block font-heading text-[1.7rem] font-extrabold tracking-[0.14em] text-ink-900">
            {code}
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          {APP_LIVE ? (
            <>
              <Button href={playUrl} size="lg" className="w-full">
                Get ParentVeda on Google Play
              </Button>
              <p className="text-center text-sm leading-relaxed text-ink-500">
                Your code is applied on its own when you open the app — nothing
                to type.
              </p>
            </>
          ) : (
            <>
              <Button href={`${BASE_PATH}/#waitlist`} size="lg" className="w-full">
                Join the Waitlist
              </Button>
              <p className="text-center text-sm leading-relaxed text-ink-500">
                ParentVeda is launching soon on Android and iOS. Keep this code —
                it&rsquo;s yours when the app arrives.
              </p>
            </>
          )}

          <Button
            href={`${BASE_PATH}/`}
            variant="secondary"
            size="md"
            className="mt-1 w-full"
          >
            Explore ParentVeda
          </Button>
        </div>

        <p className="mt-8 border-t border-brand-500/10 pt-6 text-center text-sm text-ink-500">
          Already have the app? Open ParentVeda and enter{" "}
          <span className="font-semibold text-ink-700">{code}</span> when it asks
          for an invite code.
        </p>
      </div>
    </main>
  );
}
