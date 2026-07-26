/* ============================================================
   ParentVeda — legal & policy pages.

   Every fact that appears across more than one document lives here once, so
   the five policies can never disagree with each other about who we are or
   how to reach us.

   ------------------------------------------------------------
   THESE NEED REAL VALUES BEFORE LAUNCH — see ORG below:

     legalEntity      the registered name, once there is one. Until a company
                      exists this is legally the operator's own name, not a
                      brand. India's SPDI Rules and the DPDP Act both require
                      an identifiable data fiduciary.
     contactEmail     the mailboxes below have to actually exist and be read.
     privacyEmail     a policy that names an address nobody monitors is worse
     grievanceEmail   than no policy — under the IT Rules a grievance must be
                      acknowledged within 24h and resolved within 15 days.
     grievanceOfficer a named person is required. "The Grievance Officer" is a
                      placeholder that satisfies nobody in a dispute.
     address          omitted from the pages entirely while it is null, rather
                      than printing something false. Google Play requires a
                      physical address on the developer account regardless.
     jurisdiction     the city whose courts govern disputes.

   NOT LEGAL ADVICE. These documents are written to be accurate about what
   this specific product does, and to cover what Indian law asks for — the
   DPDP Act 2023, the IT Act 2000 with the SPDI Rules 2011, and the IT
   Intermediary Guidelines. They still want a lawyer's eye before launch,
   especially because pregnancy data is "sensitive personal data" and the
   content is health related.
   ============================================================ */

export const LEGAL_BASE = "/legal";

export const ORG = {
  /** Trading name, used throughout the prose. */
  brand: "ParentVeda",

  /** TODO: registered entity name once incorporated. */
  legalEntity: "ParentVeda",

  site: "parentveda.in",

  contactEmail: "hello@parentveda.in",
  privacyEmail: "privacy@parentveda.in",
  grievanceEmail: "grievance@parentveda.in",

  /** TODO: a named individual, as the IT Rules require. */
  grievanceOfficer: "The Grievance Officer",

  /** TODO: postal address. Null keeps it off the page rather than faked. */
  address: null as string | null,

  /** TODO: seat of jurisdiction, e.g. "Delhi". */
  city: null as string | null,

  country: "India",

  /* Bump `updated` whenever a policy changes materially, and say what changed
     in the page's own "Changes" section. */
  effective: "26 July 2026",
  updated: "26 July 2026",
} as const;

export type LegalPageMeta = {
  slug: string;
  title: string;
  /** One line, used on the index and as the meta description. */
  summary: string;
};

export const LEGAL_PAGES: LegalPageMeta[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary:
      "What personal information ParentVeda collects, why, who it is shared with, and the rights you have over it.",
  },
  {
    slug: "terms",
    title: "Terms of Use",
    summary:
      "The agreement between you and ParentVeda when you use this website or the app.",
  },
  {
    slug: "medical-disclaimer",
    title: "Medical Disclaimer",
    summary:
      "ParentVeda offers education and support, not medical advice. What that means in practice, and when to call a doctor.",
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    summary:
      "The cookies and browser storage this site uses — currently essential ones only, with no advertising or analytics trackers.",
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    summary:
      "How ParentVeda researches, writes, reviews and corrects its guides, and who is accountable for them.",
  },
];

export const legalPath = (slug: string) => `${LEGAL_BASE}/${slug}`;

export const getLegalPage = (slug: string) => LEGAL_PAGES.find((p) => p.slug === slug);
