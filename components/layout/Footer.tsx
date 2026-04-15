import Link from "next/link";
import NewsletterCTA from "./NewsletterCTA";

export default function Footer() {
  return (
    <footer className="border-t-4 border-[var(--neo-border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <NewsletterCTA variant="inline" source="footer" />
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="font-heading font-black text-sm text-[var(--text-primary)] mb-3 uppercase tracking-widest">
                Entdecken
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/courses"
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-100 uppercase tracking-wide"
                >
                  Kurse
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-100 uppercase tracking-wide"
                >
                  About
                </Link>
                <Link
                  href="/newsletter"
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-100 uppercase tracking-wide"
                >
                  Newsletter
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-heading font-black text-sm text-[var(--text-primary)] mb-3 uppercase tracking-widest">
                Rechtliches
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/impressum"
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-100 uppercase tracking-wide"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-100 uppercase tracking-wide"
                >
                  Datenschutz
                </Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t-4 border-[var(--neo-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            Made with neurons &amp; espresso in Berlin.
          </p>
          <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
            &copy; {new Date().getFullYear()} Julian van Dieken
          </p>
        </div>
      </div>
    </footer>
  );
}
