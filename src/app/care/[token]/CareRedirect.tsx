"use client";

import { useEffect } from "react";

/**
 * Android-only bounce to the Play Store, carrying the install referrer.
 *
 * Runs in the browser, never on the server, and that is the whole point: a
 * server-side 3xx would be consumed by WhatsApp's and Slack's link crawlers,
 * which would then show a Play Store card instead of the doctor's name. The
 * page is served normally to everyone; only a real Android browser leaves.
 *
 * Nothing here tries to detect whether the app is installed — that is not
 * reliably possible in JavaScript, and it is not needed. Once
 * /.well-known/assetlinks.json is live, Android intercepts the URL before the
 * browser ever sees it, so an installed app never reaches this code.
 */
export default function CareRedirect({ url, token }: { url: string; token: string }) {
  useEffect(() => {
    if (!/android/i.test(navigator.userAgent)) return;

    // /care/TOKEN?stay=1 renders the page without bouncing, so the poster
    // artwork can be checked on a real Android phone.
    if (new URLSearchParams(window.location.search).has("stay")) return;

    // Bounce once per tab. Without this, coming back from the Play Store via
    // the back gesture fires the redirect again and traps her in a loop.
    const key = `pv:care-bounced:${token}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode or storage disabled — bouncing once is still better than
      // not bouncing at all.
    }

    window.location.replace(url);
  }, [url, token]);

  return null;
}
