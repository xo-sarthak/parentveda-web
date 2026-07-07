"use client";

import { useState } from "react";

/**
 * Footer newsletter mini-form — newsletter-only entry point.
 * Same intent as the Waitlist module, lighter touch. Posts client-side for now;
 * wire to `/api/subscribe` with { email, waitlist: false, newsletter: true,
 * source: "footer" } when the email provider is connected.
 */
export default function NewsletterMini() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-400">
        The gentle letter
      </p>
      {sent ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          <span className="text-coral-500">🌸</span>
          You&apos;re in — check your inbox.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (valid) setSent(true);
          }}
          className="mt-4 flex gap-2"
        >
          <label htmlFor="footer-newsletter" className="sr-only">
            Your email
          </label>
          <input
            id="footer-newsletter"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="h-11 min-w-0 flex-1 rounded-input bg-white px-3.5 text-sm text-ink-900 shadow-soft ring-1 ring-brand-500/15 outline-none transition-shadow placeholder:text-ink-400 focus:ring-2 focus:ring-brand-500/40"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-btn bg-brand-500 px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-brand-600"
          >
            Subscribe
          </button>
        </form>
      )}
      <p className="mt-2 text-xs text-ink-400">One soft email a week. Leave any time.</p>
    </div>
  );
}
