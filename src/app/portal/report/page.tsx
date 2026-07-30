import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  portalClient,
  denominator,
  type SponsorDashboard,
  type NotAnAdmin,
  type SponsorTrendPoint,
} from "@/lib/supabase-portal";
import { shortDate, monthLabel } from "@/lib/portal";
import PrintButton from "./PrintButton";

/**
 * /portal/report — the thing HR actually forwards.
 *
 * WHY THIS IS A PAGE AND NOT A CSV EXPORT. HR sends numbers upward far more
 * often than they browse them. A CSV makes the formatting their problem, so
 * what leaves the building is a spreadsheet they hastily pasted into an email —
 * and whatever conclusion the reader draws from raw columns is the conclusion
 * we shipped. A consistent report is the same shape every month, says what the
 * numbers mean, and states its own limits.
 *
 * WHY PRINT-TO-PDF RATHER THAN A GENERATED PDF. A server-side PDF means a
 * rendering library, a font pipeline, a layout that only exists in that
 * library, and a second thing to keep in step with this page. The browser
 * already has all of it. `window.print()` on a print-styled page gets a real
 * PDF on every platform, and there is exactly one layout to maintain.
 *
 * The limits section is not modesty. A report that lists only what it can prove
 * invites the reader to assume everything else is being watched — saying
 * plainly that we do not measure individuals is the part that makes the rest
 * believable, and it is the sentence HR needs when someone in the room asks.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programme report",
  robots: { index: false, follow: false },
};

export default async function PortalReport() {
  const supabase = await portalClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data } = await supabase.rpc("sponsor_dashboard");
  const d = (data ?? null) as SponsorDashboard | NotAnAdmin | null;
  if (!d || d.ok !== true) redirect("/portal");

  const { data: trendData } = await supabase.rpc("sponsor_trend", {
    p_months: 12,
  });
  const trend = ((trendData ?? []) as SponsorTrendPoint[]) ?? [];

  const den = denominator(d);
  const notYet =
    den.value === null ? null : Math.max(den.value - d.activated, 0);

  /* Against the same figure three months ago. Null rather than 0 when there is
     not enough history: "no change" and "we have only been running a month"
     are different facts and only one belongs on a slide. */
  const change3m =
    trend.length >= 4
      ? trend[trend.length - 1].activated_cumulative -
        trend[trend.length - 4].activated_cumulative
      : null;

  const generated = new Date();

  return (
    <div className="min-h-screen bg-canvas print:bg-white">
      {/* Screen-only chrome. Everything in here is hidden in the printed
          version, so the page a reader receives has no navigation in it. */}
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-5 py-5 print:hidden">
        <Link
          href="/portal"
          className="font-jakarta text-sm font-semibold text-brand-600"
        >
          ← Programme
        </Link>
        <div className="ml-auto">
          <PrintButton />
        </div>
      </div>

      <main className="mx-auto max-w-3xl bg-surface px-8 py-10 ring-1 ring-ink-100 print:max-w-none print:px-0 print:py-0 print:ring-0">
        <header className="border-b border-ink-100 pb-6">
          <p className="font-jakarta text-xs font-bold uppercase tracking-widest text-brand-600">
            ParentVeda · Programme report
          </p>
          <h1 className="mt-2 font-jakarta text-3xl font-extrabold text-ink-900">
            {d.sponsor_name}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Generated {shortDate(generated.toISOString())}
            {d.renewal_at ? ` · renews ${shortDate(d.renewal_at)}` : ""}
          </p>
        </header>

        {/* The headline first, in a sentence rather than a grid. A reader
            skimming this in an email thread reads one line and stops. */}
        <section className="mt-8">
          <p className="font-jakarta text-2xl font-extrabold leading-snug text-ink-900">
            {den.value === null ? (
              <>{d.activated} people are using ParentVeda.</>
            ) : (
              <>
                {d.activated} of {den.value} people are using ParentVeda
                {d.activation_rate !== null ? ` — ${d.activation_rate}%` : ""}.
              </>
            )}
          </p>
          {change3m !== null && (
            <p className="mt-2 text-sm text-ink-600">
              {change3m > 0
                ? `Up ${change3m} since three months ago.`
                : change3m === 0
                  ? "Level with three months ago."
                  : `Down ${-change3m} since three months ago.`}
            </p>
          )}
        </section>

        <section className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          <Figure label="Activated" value={`${d.activated}`} />
          <Figure
            label={d.eligible_listed > 0 ? "On your list" : "Seats purchased"}
            value={
              d.eligible_listed > 0
                ? `${d.eligible_listed}`
                : (d.seats_purchased?.toString() ?? "Unlimited")
            }
          />
          <Figure
            label="Joined last 30 days"
            value={`${d.activated_last_30d}`}
          />
          <Figure
            label="Not started yet"
            value={notYet === null ? "—" : `${notYet}`}
          />
        </section>

        <section className="mt-9">
          <h2 className="font-jakarta text-sm font-bold uppercase tracking-wide text-ink-500">
            Consultations
          </h2>
          {d.suppressed ? (
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Withheld. Behavioural figures are only reported once{" "}
              {d.min_cohort} people have activated — below that, a total is
              close enough to naming an individual. This is a deliberate limit,
              not missing data.
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-3 gap-x-8">
              <Figure
                label="Booked"
                value={`${d.consultations_booked ?? 0}`}
              />
              <Figure
                label="Attended"
                value={`${d.consultations_completed ?? 0}`}
              />
              <Figure
                label="Upcoming"
                value={`${d.consultations_upcoming ?? 0}`}
              />
            </div>
          )}
        </section>

        {/* A table rather than the sparkline from the screen version. Printed
            on paper or read in a PDF, a reader wants to check a figure, not
            glance at a shape. */}
        {trend.length > 0 && (
          <section className="mt-9">
            <h2 className="font-jakarta text-sm font-bold uppercase tracking-wide text-ink-500">
              Month by month
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-500">
                    <th className="py-2 pr-4 font-jakarta font-bold">Month</th>
                    <th className="py-2 pr-4 font-jakarta font-bold">Joined</th>
                    <th className="py-2 pr-4 font-jakarta font-bold">
                      Total using
                    </th>
                    <th className="py-2 font-jakarta font-bold">
                      Consultations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trend.map((p) => (
                    <tr key={p.month} className="border-b border-ink-50">
                      <td className="py-1.5 pr-4 text-ink-700">
                        {monthLabel(p.month)}
                      </td>
                      <td className="py-1.5 pr-4 text-ink-700">
                        {p.activated_in_month}
                      </td>
                      <td className="py-1.5 pr-4 font-semibold text-ink-900">
                        {p.activated_cumulative}
                      </td>
                      {/* An em dash, never a zero. Null means withheld, and
                          "0 consultations" would be a claim we have not made. */}
                      <td className="py-1.5 text-ink-700">
                        {p.consultations_booked ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-9 border-t border-ink-100 pt-6">
          <h2 className="font-jakarta text-sm font-bold text-ink-900">
            What this report does not contain
          </h2>
          <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-600">
            <li>
              Nothing about any individual — not who booked a consultation, what
              they read, what they asked, or when they last opened the app.
            </li>
            <li>
              No breakdown by section. Which parts of ParentVeda your team uses
              most is not reported, because in a small group it narrows down who
              is concerned about what.
            </li>
            <li>
              Totals are withheld entirely below {d.min_cohort} people, for the
              same reason.
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-ink-400">
            Your team activated this benefit on the understanding that their
            pregnancy, their child and their questions stay private. That
            promise is enforced in our database, not by policy — the figures
            above are the only shape in which this data can be returned.
          </p>
        </section>
      </main>
    </div>
  );
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-jakarta text-2xl font-extrabold text-ink-900">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-ink-500">{label}</p>
    </div>
  );
}
