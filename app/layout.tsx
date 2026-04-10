import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Glowing Earrings — The Creative AI Academy",
    template: "%s | Glowing Earrings",
  },
  description:
    "Kostenlose, interaktive Kurse zu KI, Tech und Kreativität. Kuratiert von Julian van Dieken.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://glowing-earrings.vercel.app"
  ),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Glowing Earrings",
    title: "Glowing Earrings — The Creative AI Academy",
    description:
      "Kostenlose, interaktive Kurse zu KI, Tech und Kreativität. Kuratiert von Julian van Dieken.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glowing Earrings — The Creative AI Academy",
    description:
      "Kostenlose, interaktive Kurse zu KI, Tech und Kreativität.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
