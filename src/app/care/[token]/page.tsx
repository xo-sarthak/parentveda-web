import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { Blob, Twinkles } from "@/components/brand/Decor";
import { BASE_PATH, asset } from "@/lib/site";
import { APP_LIVE } from "@/lib/invite";
import {
  carePlayStoreUrl,
  getCarePartner,
  isValidToken,
  normaliseToken,
  partnerInitials,
  sanitiseCampaign,
  sanitiseChannel,
  type CarePartner,
} from "@/lib/care";
import CareRedirect from "./CareRedirect";

/* ============================================================
   /care/<TOKEN> — Care Partner landing page.

   The bridge between a QR poster on a clinic wall and the app. A phone camera
   cannot open an app that is not installed, so every scan lands here first.

   Two rules run through the whole file:

   1. This page NEVER errors. Unknown, expired, revoked or malformed token —
      she still gets a normal ParentVeda page and still reaches the store. A
      poster that has been on a wall for two years must not dead-end a real
      person. A broken poster costs the doctor their credit, never costs the
      parent the app. So: no notFound(), no error states, always 200.

   2. The redirect is client-side only. A server-side 3xx would be swallowed by
      WhatsApp's and Slack's link crawlers, and the shared card would show the
      Play Store instead of the doctor's name.
   ============================================================ */

export const dynamic = "force-dynamic";

const BLURB =
  "ParentVeda is a calm, bilingual companion for pregnancy and the early days after — timeless Indian wisdom, gently modern guidance.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const token = normaliseToken((await params).token);
  const partner = await getCarePartner(token);

  const title = partner
    ? `${partner.trustLabel} ${partner.name} — ParentVeda`
    : "You've been invited to ParentVeda";

  return {
    title,
    description: BLURB,
    // One unique URL per token, thin near-duplicate content — never index it.
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "ParentVeda",
      title,
      description: BLURB,
      images: [
        {
          url: "/parentveda-logo.jpg",
          width: 1024,
          height: 1024,
          alt: "ParentVeda — Nurturing Wisdom",
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description: BLURB },
  };
}

export default async function CarePage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const token = normaliseToken((await params).token);
  const sp = await searchParams;

  const valid = isValidToken(token);
  const channel = sanitiseChannel(typeof sp.ch === "string" ? sp.ch : undefined);
  const campaign = sanitiseCampaign(typeof sp.cm === "string" ? sp.cm : undefined);

  /* A malformed token gets the generic page and NO referrer — junk must not be
     passed through to the store, where it would be attributed to nobody and
     pollute the campaign data. */
  const playUrl = valid ? carePlayStoreUrl(token, { channel, campaign }) : null;

  const partner = valid ? await getCarePartner(token) : null;

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-mist px-5 py-14">
      <Blob className="-left-24 top-0 h-80 w-80 bg-brand-200/40" animate />
      <Blob className="-right-20 bottom-0 h-80 w-80 bg-coral-100/50" animate />
      <Twinkles />

      {APP_LIVE && playUrl ? <CareRedirect url={playUrl} token={token} /> : null}

      <div className="relative w-full max-w-lg rounded-xl2 bg-surface px-6 py-10 shadow-card ring-1 ring-brand-500/10 sm:px-10 sm:py-12">
        <div className="flex justify-center">
          <Logo size={42} wordmarkClassName="text-[1.3rem]" />
        </div>

        {partner ? <PartnerIntro partner={partner} /> : <GenericIntro />}

        <p className="mx-auto mt-6 max-w-sm text-pretty text-center text-[1.02rem] leading-relaxed text-ink-600">
          {BLURB}
        </p>

        {/* The token, shown plainly.

            On iOS this is the whole mechanism — Apple has no install-referrer
            equivalent, so nothing can carry the token through an App Store
            install and she has to type it. Manual entry is a permanent part of
            the product there, not a stopgap. */}
        {valid ? (
          <div className="mt-8 rounded-card bg-mist/70 px-5 py-5 text-center ring-1 ring-brand-500/10">
            <span className="block font-heading text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-700">
              Your code
            </span>
            <span className="mt-2.5 block font-mono text-[1.7rem] font-bold tracking-[0.16em] text-ink-900">
              {token}
            </span>
            <span className="mt-2 block text-[0.8rem] leading-relaxed text-ink-500">
              Enter this in the app when it asks.
            </span>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-3">
          {APP_LIVE && playUrl ? (
            <>
              <Button href={playUrl} size="lg" className="w-full">
                Get the app
              </Button>
              <p className="text-center text-sm leading-relaxed text-ink-500">
                Your code is applied on its own when you open the app.
              </p>
            </>
          ) : (
            <>
              <Button href={`${BASE_PATH}/#waitlist`} size="lg" className="w-full">
                Join the Waitlist
              </Button>
              <p className="text-center text-sm leading-relaxed text-ink-500">
                ParentVeda is launching soon on Android and iOS.
                {valid ? " Keep this code — it’s yours when the app arrives." : ""}
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

        <p className="mt-8 border-t border-brand-500/10 pt-6 text-center text-xs leading-relaxed text-ink-400">
          ParentVeda offers gentle, evidence-informed guidance — not medical advice. Always
          consult your doctor.{" "}
          <Link href="/legal/medical-disclaimer" className="text-brand-600 underline-offset-4 hover:underline">
            Read more
          </Link>
        </p>
      </div>
    </main>
  );
}

/* ---------------- The partner ---------------- */

function PartnerIntro({ partner }: { partner: CarePartner }) {
  const rounded = partner.kind === "organisation" ? "rounded-2xl" : "rounded-full";

  return (
    <div className="mt-8 text-center">
      <div className="flex justify-center">
        {partner.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.imageUrl}
            alt={partner.name}
            width={96}
            height={96}
            style={{ width: 96, height: 96 }}
            className={`shrink-0 object-cover ring-1 ring-brand-500/15 ${rounded}`}
            draggable={false}
          />
        ) : (
          <span
            aria-hidden="true"
            style={{ width: 96, height: 96 }}
            className={`grid shrink-0 place-items-center bg-brand-500 font-heading text-[2rem] font-bold tracking-[0.04em] text-white ring-1 ring-brand-500/15 ${rounded}`}
          >
            {partnerInitials(partner.name)}
          </span>
        )}
      </div>

      {/* Label comes from an allowlist — see safeTrustLabel(). A doctor
          recommending something to a patient is not an advertisement, and no
          database value can make this page say otherwise. */}
      <p className="mt-5 font-heading text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-500">
        {partner.trustLabel}
      </p>

      <h1 className="mt-2 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[2.35rem]">
        {partner.name}
      </h1>

      {partner.subtitle ? (
        <p className="mt-2 text-[0.95rem] font-semibold text-ink-600">{partner.subtitle}</p>
      ) : null}
    </div>
  );
}

function GenericIntro() {
  return (
    <div className="mt-8 text-center">
      <div className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/parentveda-mark.png")}
          alt=""
          width={84}
          height={96}
          style={{ width: 84, height: 96 }}
          className="shrink-0"
          draggable={false}
        />
      </div>

      <h1 className="mt-5 text-balance font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink-900 sm:text-[2.35rem]">
        You&rsquo;ve been invited to{" "}
        <span className="text-brand-600">ParentVeda</span>
      </h1>
    </div>
  );
}
