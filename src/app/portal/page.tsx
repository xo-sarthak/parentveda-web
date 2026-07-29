import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  portalClient,
  denominator,
  type SponsorDashboard,
  type NotAnAdmin,
} from "@/lib/supabase-portal";
import { shortDate } from "@/lib/portal";
import PortalShell from "./PortalShell";

/**
 * /portal — what an organisation sees about the benefit it pays for.
 *
 * A THIN RENDERER, ON PURPOSE. Every number here arrives already aggregated
 * from sponsor_dashboard() (migrations 0060/0061). Nothing is computed in this
 * file, and the rows behind the numbers never leave the database.
 *
 * That is not tidiness, it is the privacy promise being structural rather than
 * remembered: to compute "how many consultations" in JavaScript, this page
 * would first have to RECEIVE the consultations. It never does. The same
 * design is why this page exists at all after the app screen was built — both
 * call the same two functions, so a second surface was a front-end job rather
 * than a rebuild.
 *
 * The company is resolved from the session inside the database. There is no
 * sponsor id in this file, in the URL, or in any request — so a guessed URL
 * returns nothing, and there is nothing for a modified client to change.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programme",
  robots: { index: false, follow: false },
};

export default async function PortalHome() {
  const supabase = await portalClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data, error } = await supabase.rpc("sponsor_dashboard");
  const d = (data ?? null) as SponsorDashboard | NotAnAdmin | null;

  if (error || !d) {
    return (
      <PortalShell>
        <Empty
          title="We could not load your programme."
          body="Something went wrong on our side. Try again in a moment, and tell us if it keeps happening."
        />
      </PortalShell>
    );
  }

  if (d.ok !== true) {
    /* Signing in worked; this account simply does not administer a programme.
       Almost every ParentVeda user is in this position, so it is not an error
       and must not read like one. */
    return (
      <PortalShell>
        <Empty
          title="This account does not administer a programme."
          body="If you handle the ParentVeda benefit for your organisation, ask us to give your account access. You will need to have activated the benefit with your own work email first."
        />
      </PortalShell>
    );
  }

  const den = denominator(d);
  const pct = d.activation_rate;
  const notYet = den.value === null ? null : Math.max(den.value - d.activated, 0);

  return (
    <PortalShell sponsorName={d.sponsor_name}>
      <header className="mb-8">
        <h1 className="font-jakarta text-3xl font-extrabold text-ink-900">
          {d.sponsor_name}
        </h1>
        <p className="mt-1 text-sm text-ink-600">
          {d.renewal_at
            ? `Renews ${shortDate(d.renewal_at)}`
            : "No renewal date on file"}
        </p>
      </header>

      {/* THE HEADLINE — one sentence HR can repeat to their board.
          Everything else on the page is the detail underneath it. A grid of
          equally-weighted numbers makes the reader do the summarising, and
          they will summarise it wrong. */}
      <section className="rounded-2xl bg-surface ring-1 ring-ink-100 p-6 sm:p-8">
        <p className="font-jakarta text-2xl sm:text-3xl font-extrabold text-ink-900 leading-snug">
          {den.value === null ? (
            <>
              <span className="text-brand-600">{d.activated}</span> people are
              using ParentVeda
            </>
          ) : (
            <>
              <span className="text-brand-600">{d.activated}</span> of{" "}
              {den.value} people are using ParentVeda
            </>
          )}
        </p>

        {pct !== null && (
          <div className="mt-5">
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-mist-2">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${Math.min(Math.max(pct, 0), 100)}%` }}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-600">
              <span>
                <strong className="text-ink-900">{pct}%</strong> take-up
                {d.eligible_listed > 0
                  ? " of the people you listed"
                  : " of the seats you bought"}
              </span>
              {notYet !== null && notYet > 0 && (
                <span>{notYet} have not activated yet</span>
              )}
              {d.activated_last_30d > 0 && (
                <span>+{d.activated_last_30d} in the last 30 days</span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Consultations, or an honest account of why they are missing. */}
      <section className="mt-5 rounded-2xl bg-surface ring-1 ring-ink-100 p-6 sm:p-8">
        <h2 className="font-jakarta text-sm font-bold uppercase tracking-wide text-ink-500">
          Consultations
        </h2>

        {d.suppressed ? (
          /* SUPPRESSION, SHOWN RATHER THAN HIDDEN. The server returns null, not
             zero, and rendering null as "0" would turn a policy into a false
             claim — a sponsor reading "0 consultations" concludes the benefit
             is failing, which is the opposite of what the data says. */
          <div className="mt-4 rounded-xl bg-mist/60 p-4">
            <p className="font-jakarta text-sm font-bold text-ink-900">
              Held back until {d.min_cohort} people have activated
            </p>
            <p className="mt-1.5 text-sm text-ink-600 leading-relaxed">
              In a small group, &ldquo;two consultations this month&rdquo; is
              close enough to a name. We would rather show you nothing than show
              you someone.
            </p>
          </div>
        ) : (
          <dl className="mt-4 grid grid-cols-3 gap-4">
            <Stat label="Booked" value={d.consultations_booked ?? 0} />
            <Stat label="Attended" value={d.consultations_completed ?? 0} />
            <Stat label="Upcoming" value={d.consultations_upcoming ?? 0} />
          </dl>
        )}
      </section>

      {/* What this page cannot show, said out loud. It is the reason employees
          are willing to activate at all, so it belongs on the page the
          employer looks at rather than only in a contract. */}
      <section className="mt-5 rounded-2xl bg-mist/50 ring-1 ring-ink-100 p-6 sm:p-8">
        <h2 className="font-jakarta text-sm font-bold text-ink-900">
          What this dashboard cannot show
        </h2>
        <p className="mt-2 text-sm text-ink-600 leading-relaxed">
          Nothing about an individual. Not who booked, not what they read, not
          what they asked, and not how long they spent in the app — we do not
          measure that last one at all, for anyone. Take-up and totals are the
          whole picture, and that is exactly what makes people willing to
          activate.
        </p>
      </section>

      <div className="mt-8">
        <Link
          href="/portal/people"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-brand-600"
        >
          See your people
          <span aria-hidden>→</span>
        </Link>
      </div>
    </PortalShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dd className="font-jakarta text-2xl font-extrabold text-brand-600">
        {value}
      </dd>
      <dt className="mt-0.5 text-xs text-ink-600">{label}</dt>
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-surface ring-1 ring-ink-100 p-8">
      <h1 className="font-jakarta text-xl font-extrabold text-ink-900">
        {title}
      </h1>
      <p className="mt-2 text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  );
}
