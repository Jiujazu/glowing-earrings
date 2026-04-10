import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Glowing Earrings — The Creative AI Academy",
    template: "%s | Glowing Earrings",
  },
  description:
    "Kostenlose, interaktive Kurse zu KI, Tech und Kreativität. Kuratiert von Julian van Dieken.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://glowing-earrings.com"
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
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
