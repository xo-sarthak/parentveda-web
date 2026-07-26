import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/* Fraunces — soft optical serif for big emotional/marketing moments only */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

/* Plus Jakarta Sans — UI headings, nav, card titles */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/* Source Serif 4 — body copy.
   Replaces Manrope, which was clean but cool and neutral; long-form health
   writing reads warmer and more editorial set in a text serif, and it is what
   separates a publication from an app screen. UI chrome (buttons, nav, chips,
   labels) stays on Plus Jakarta — serif is for reading, sans is for
   interface. See --font-sans in globals.css. */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

const SITE_URL = "https://parentveda.in";
const DESCRIPTION =
  "ParentVeda is a calm, bilingual pregnancy & early-parenthood companion for modern Indian parents — blending timeless Indian wisdom with gentle, modern guidance. From week 4 to your baby's first cry.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ParentVeda — Nurturing Wisdom for every week of pregnancy",
    template: "%s · ParentVeda",
  },
  description: DESCRIPTION,
  applicationName: "ParentVeda",
  keywords: [
    "pregnancy app",
    "Garbh Sanskar",
    "Indian pregnancy",
    "bilingual pregnancy guide",
    "Hinglish pregnancy app",
    "week by week pregnancy",
    "parenting India",
    "calm pregnancy companion",
  ],
  authors: [{ name: "ParentVeda" }],
  creator: "ParentVeda",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ParentVeda",
    title: "ParentVeda — Your calm companion through every week of pregnancy",
    description: DESCRIPTION,
    images: [
      {
        url: "/parentveda-logo.jpg",
        width: 1024,
        height: 1024,
        alt: "ParentVeda — Nurturing Wisdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ParentVeda — Nurturing Wisdom",
    description: DESCRIPTION,
    images: ["/parentveda-logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/parentveda-mark.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" }, // PRESERVED fallback — original heart icon
    ],
    apple: "/parentveda-mark.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9FE",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${sourceSerif.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas text-ink-900">{children}</body>
    </html>
  );
}
