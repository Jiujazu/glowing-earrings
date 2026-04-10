import Link from "next/link";
import NewsletterCTA from "./NewsletterCTA";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Newsletter */}
          <div>
            <NewsletterCTA variant="inline" source="footer" />
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            <div>
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mb-3">
                Entdecken
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/courses"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Kurse
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/newsletter"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Newsletter
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mb-3">
                Rechtliches
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/impressum"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Impressum
                </Link>
                <Link
                  href="/datenschutz"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Datenschutz
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            Made with neurons &amp; espresso in Berlin.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Julian van Dieken
          </p>
        </div>
      </div>
    </footer>
  );
}
