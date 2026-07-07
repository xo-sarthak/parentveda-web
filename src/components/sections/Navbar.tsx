"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/content";

/* PRESERVED — pre-waitlist download icon.
function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" />
    </svg>
  );
}
*/

function WaitlistIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 20.4c-.5-.4-7.6-5.7-7.6-11.1A4.8 4.8 0 0 1 12 7.1 4.8 4.8 0 0 1 19.6 9.3c0 5.4-7.1 10.7-7.6 11.1Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 transition-all duration-300 sm:px-7 lg:px-8 ${
          scrolled
            ? "my-2 rounded-full py-2.5 glass shadow-soft ring-1 ring-brand-500/10 sm:my-3"
            : "py-4"
        }`}
      >
        <a
          href="#top"
          className="rounded-xl"
          aria-label="ParentVeda — home"
          onClick={() => setOpen(false)}
        >
          <Logo size={36} wordmarkClassName="text-[1.2rem]" />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-brand-600"
                      : "text-ink-600 hover:text-brand-600"
                  }`}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-coral-400"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="#waitlist" size="sm" className="hidden sm:inline-flex" icon={<WaitlistIcon />}>
            Join the Waitlist
          </Button>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full bg-surface text-brand-700 ring-1 ring-brand-500/15 transition-colors hover:bg-mist lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mx-3 mt-1 overflow-hidden rounded-3xl glass p-3 shadow-card ring-1 ring-brand-500/10 lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-[0.95rem] font-semibold text-ink-600 transition-colors hover:bg-mist hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-1.5 pt-2">
              <Button href="#waitlist" className="w-full" onClick={() => setOpen(false)} icon={<WaitlistIcon />}>
                Join the Waitlist
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
