"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/portal-auth";
import { PORTAL_AUTH_INITIAL } from "@/lib/portal";

/**
 * The sign-in form. A client component only so it can show a pending state and
 * render the error in place — the credentials themselves never touch client
 * JavaScript, because the action runs on the server and sets an httpOnly
 * cookie.
 */
export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, PORTAL_AUTH_INITIAL);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label
          htmlFor="portal-email"
          className="block font-jakarta text-xs font-bold uppercase tracking-wide text-ink-500"
        >
          Email
        </label>
        <input
          id="portal-email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1.5 w-full rounded-xl bg-mist/60 px-3.5 py-2.5 text-sm text-ink-900 ring-1 ring-ink-100 outline-none focus:ring-2 focus:ring-brand-400"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="portal-password"
          className="block font-jakarta text-xs font-bold uppercase tracking-wide text-ink-500"
        >
          Password
        </label>
        <input
          id="portal-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1.5 w-full rounded-xl bg-mist/60 px-3.5 py-2.5 text-sm text-ink-900 ring-1 ring-ink-100 outline-none focus:ring-2 focus:ring-brand-400"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl bg-coral-50 px-3.5 py-2.5 text-sm text-coral-700 ring-1 ring-coral-200"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-brand-500 px-4 py-3 font-jakarta text-sm font-bold text-white transition hover:bg-brand-600 disabled:bg-ink-300"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
