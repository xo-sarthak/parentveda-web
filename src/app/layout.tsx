import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, Manrope } from "next/font/google";
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

/* Manrope — body copy, labels, buttons, chips */
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
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
      className={`${fraunces.variable} ${jakarta.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-dvh bg-canvas text-ink-900">{children}</body>
    </html>
  );
}
