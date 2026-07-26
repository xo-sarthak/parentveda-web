"use client";

import { useActionState } from "react";
import { subscribe } from "@/app/actions/subscribe";
import { SIGNUP_INITIAL } from "@/lib/signup";

/**
 * Footer newsletter mini-form — newsletter-only entry point.
 *
 * Same intent as the Waitlist module, lighter touch, posting to the same
 * server action with its own `source` tag so we can tell later which surface
 * actually converts.
 *
 * Note it sends wants_waitlist=false. That does NOT cancel a launch signup
 * made elsewhere — the action merges the flags rather than overwriting them.
 */
export default function NewsletterMini() {
  const [state, formAction, pending] = useActionState(subscribe, SIGNUP_INITIAL);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-400">
        The gentle letter
      </p>

      {state.status === "ok" ? (
        <p className="mt-4 inline-flex items-start gap-2 text-sm font-semibold text-brand-700">
          <span className="text-coral-500">🌸</span>
          You&apos;re on the list — the first letter arrives when we launch.
        </p>
      ) : (
        <form action={formAction} className="mt-4 flex gap-2">
          {/* honeypot — off-screen, not tabbable, invisible to real users */}
          <div
            aria-hidden
            className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
          >
            <label htmlFor="footer-company">Company</label>
            <input
              id="footer-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <input type="hidden" name="wants_newsletter" value="true" />
          <input type="hidden" name="wants_waitlist" value="false" />
          <input type="hidden" name="source" value="footer" />

          <label htmlFor="footer-newsletter" className="sr-only">
            Your email
          </label>
          <input
            id="footer-newsletter"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            disabled={pending}
            className="h-11 min-w-0 flex-1 rounded-input bg-white px-3.5 text-sm text-ink-900 shadow-soft ring-1 ring-brand-500/15 outline-none transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500/40 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-11 shrink-0 rounded-btn bg-brand-500 px-4 font-heading text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600 disabled:opacity-60"
          >
            {pending ? "…" : "Subscribe"}
          </button>
        </form>
      )}

      {state.status === "error" ? (
        <p role="alert" className="mt-2 text-xs font-semibold text-coral-700">
          {state.message}
        </p>
      ) : null}

      <p className="mt-2 text-xs text-ink-400">One soft email a week. Leave any time.</p>
    </div>
  );
}
