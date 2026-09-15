import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Investment Atmosphere",
  description: "A transparent gauge of AI adoption, demand, investment, imports and hyperscaler capital deployment.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "AI Investment Atmosphere",
    description: "Track the momentum behind AI adoption, infrastructure demand and hyperscaler capital deployment.",
    images: [{ url: "/og-atmosphere.png", width: 1728, height: 910 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
