import GuidesHeader from "@/components/guides/GuidesHeader";
import Footer from "@/components/sections/Footer";

/**
 * Shared chrome for the Guides hub. Uses GuidesHeader (real-route links) and
 * the site Footer. Each page sets its own metadata; the root template
 * "%s · ParentVeda" still applies.
 */
export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GuidesHeader />
      <main className="min-h-[60vh] bg-canvas">{children}</main>
      <Footer />
    </>
  );
}
