import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { portalClient, type SponsorPerson } from "@/lib/supabase-portal";
import { shortDate, PERSON_STATUS } from "@/lib/portal";
import PortalShell from "../PortalShell";

/**
 * /portal/people — the follow-up list.
 *
 * THIS IS THE SCREEN WHERE THE PROMISE IS KEPT OR BROKEN, so it is worth being
 * exact about what is on it and why each part is allowed.
 *
 *   work_email, full_name  — HR SENT US THESE. The roster is their own
 *                            spreadsheet (sponsor_eligible_people, 0061);
 *                            showing it back is returning their data.
 *   status, activated_at   — one bit and a date: did this person start.
 *
 * And what is NOT on it, because sponsor_roster() does not return the columns:
 * no user id, no pregnancy, no child, no bookings, no reading, no last-seen,
 * no searches. A caller cannot select a column a function does not return, so
 * the line is held by a signature rather than by everyone remembering.
 *
 * The aggregate on /portal can be as rich as it is precisely because this page
 * stays thin.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your people",
  robots: { index: false, follow: false },
};

export default async function PortalPeople() {
  const supabase = await portalClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/portal/login");

  const { data, error } = await supabase.rpc("sponsor_roster");
  const rows = ((data ?? []) as SponsorPerson[]) ?? [];

  const using = rows.filter((r) => r.status === "active");
  const notYet = rows.filter((r) => r.status === "not_activated");
  const removed = rows.filter((r) => r.status === "removed");

  return (
    <PortalShell>
      <header className="mb-2">
        <Link
          href="/portal"
          className="font-jakarta text-sm font-semibold text-brand-600"
        >
          ← Programme
        </Link>
        <h1 className="mt-3 font-jakarta text-3xl font-extrabold text-ink-900">
          Your people
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          Who has started, and who has not. This is the only thing we record
          about a person here — never what they read, ask or book.
        </p>
      </header>

      {error && (
        <p className="mt-6 rounded-xl bg-coral-50 px-4 py-3 text-sm text-coral-700 ring-1 ring-coral-200">
          We could not load your list just now. Try again in a moment.
        </p>
      )}

      {!error && rows.length === 0 && (
        /* Never a blank space. The empty state is the next action: nobody has
           activated, and the thing that fixes that is one email. */
        <div className="mt-6 rounded-2xl bg-surface ring-1 ring-ink-100 p-8">
          <h2 className="font-jakarta text-lg font-extrabold text-ink-900">
            Nobody has activated yet.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">
            Your team activates inside the ParentVeda app with the email address
            you gave us. Sharing that one line is usually all it takes — and if
            we do not have your staff list yet, send it over and we will load
            it.
          </p>
        </div>
      )}

      {/* NOT YET COMES FIRST, and that is the whole design of this page.
          "Who is using it" is a number they already saw on the dashboard.
          "Who has not started" is the list they can act on this afternoon. */}
      {notYet.length > 0 && (
        <PeopleGroup
          title="Not started yet"
          count={notYet.length}
          note="These people are on your list but have not activated. A reminder usually works."
          rows={notYet}
        />
      )}

      {using.length > 0 && (
        <PeopleGroup title="Using ParentVeda" count={using.length} rows={using} />
      )}

      {removed.length > 0 && (
        <PeopleGroup
          title="Removed"
          count={removed.length}
          note="No longer covered by your programme."
          rows={removed}
        />
      )}
    </PortalShell>
  );
}

function PeopleGroup({
  title,
  count,
  note,
  rows,
}: {
  title: string;
  count: number;
  note?: string;
  rows: SponsorPerson[];
}) {
  return (
    <section className="mt-8">
      <h2 className="font-jakarta text-sm font-bold uppercase tracking-wide text-ink-500">
        {title} · {count}
      </h2>
      {note && <p className="mt-1 text-sm text-ink-600">{note}</p>}

      <ul className="mt-3 divide-y divide-ink-100 overflow-hidden rounded-2xl bg-surface ring-1 ring-ink-100">
        {rows.map((r) => {
          const s = PERSON_STATUS[r.status] ?? PERSON_STATUS.not_activated;
          return (
            <li
              key={`${r.work_email}-${r.status}`}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5"
            >
              <div className="min-w-0 flex-1">
                {r.full_name && (
                  <p className="truncate font-jakarta text-sm font-bold text-ink-900">
                    {r.full_name}
                  </p>
                )}
                <p
                  className={
                    r.full_name
                      ? "truncate text-xs text-ink-500"
                      : "truncate font-jakarta text-sm font-bold text-ink-900"
                  }
                >
                  {r.work_email}
                </p>
              </div>

              <span className="text-xs text-ink-500">
                {r.status === "active"
                  ? shortDate(r.activated_at)
                  : r.status === "removed"
                    ? shortDate(r.removed_at)
                    : ""}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 font-jakarta text-xs font-bold ${s.tone}`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
