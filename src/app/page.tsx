import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import WeekJourney from "@/components/sections/WeekJourney";
import GarbhSanskar from "@/components/sections/GarbhSanskar";
import JourneyMap from "@/components/sections/JourneyMap";
import SocialProof from "@/components/sections/SocialProof";
import AskVeda from "@/components/sections/AskVeda";
import FAQ from "@/components/sections/FAQ";
import Waitlist from "@/components/sections/Waitlist";
import WhatsApp from "@/components/sections/WhatsApp";
import DownloadComingSoon from "@/components/sections/DownloadComingSoon";
import Footer from "@/components/sections/Footer";

/*
 * NOTE — preserved, no-longer-rendered sections.
 * Nothing is deleted; these stay intact so we can revert any time.
 *
 *   import Library from "@/components/sections/Library";   // full tabbed library
 *                                                          // → replaced by the lighter <Journal /> teaser.
 *   import Download from "@/components/sections/Download";  // live App Store / Play badges
 *                                                          // → replaced by <DownloadComingSoon /> until launch.
 *
 *   import Journal from "@/components/sections/Journal";    // the on-page "From the Journal" teaser
 *                                                          // → the content hub now lives on its own
 *                                                          //    SEO route at /guides (app/guides/**),
 *                                                          //    so it's intentionally NOT in the landing
 *                                                          //    scroll. The teaser file is preserved.
 *
 * To revert: swap <Journal /> back in, <Library /> for the teaser, and
 * <DownloadComingSoon /> back to <Download /> below, and restore the original
 * NAV_LINKS / FOOTER_LINKS (kept commented in src/lib/content.ts).
 */

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />

        {/* The app's features — now live (were hidden in an appendix before) */}
        <Features />
        <HowItWorks />
        <WeekJourney />
        <GarbhSanskar />
        <JourneyMap />

        <SocialProof />
        <AskVeda />

        {/* The Journal teaser moved off the landing page — the content hub is
            now its own SEO section at /guides (linked from the nav & footer). */}
        <FAQ />

        {/* Primary conversion module (pre-launch) */}
        <Waitlist />

        <WhatsApp />
        <DownloadComingSoon />
      </main>
      <Footer />
    </>
  );
}
