"use client";

import { useEffect } from "react";

/**
 * Android-only bounce to the Play Store.
 *
 * Why this runs in JavaScript instead of being a server redirect: WhatsApp,
 * Instagram and the rest fetch a shared link to build the preview card, and
 * their crawlers don't execute JS. A 3xx would send them onward to Play and
 * the chat bubble would show a generic Play Store card. Rendering real HTML
 * and bouncing client-side means the crawler reads our OpenGraph tags while
 * a real phone still lands on Play more or less instantly.
 *
 * Renders nothing — the invite page paints underneath and stays put on iOS,
 * desktop, and whenever the bounce is suppressed below.
 */
export default function InviteRedirect({
  url,
  code,
}: {
  url: string;
  code: string;
}) {
  useEffect(() => {
    // Only Android has an app to install. iPhone/desktop read the page.
    if (!/android/i.test(navigator.userAgent)) return;

    // Escape hatch: /invite/ABCD234?stay=1 renders the page without bouncing,
    // so the page itself is testable on an Android phone.
    if (new URLSearchParams(window.location.search).has("stay")) return;

    // Bounce once per tab. Without this, returning to the tab from the Play
    // Store (back gesture, app switcher) fires the redirect again and traps
    // the user in a loop they can't read their way out of.
    const key = `pv:invite-bounced:${code}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode / storage disabled — bouncing once is still better than
      // not bouncing at all, so fall through rather than bail.
    }

    // replace(), not assign(): leaves no history entry, so Back from Play
    // returns to wherever they came from instead of re-triggering this.
    window.location.replace(url);
  }, [url, code]);

  return null;
}
