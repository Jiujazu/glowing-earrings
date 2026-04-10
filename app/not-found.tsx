import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-7xl mb-6">🌀</p>
          <h1 className="font-heading text-4xl font-bold text-text-primary mb-3">
            404 — Hier ist nichts.
          </h1>
          <p className="text-lg text-text-secondary mb-2">
            Aber hey, du hast eine Seite gefunden, die es nicht gibt. Das ist auch
            eine Art Entdeckung.
          </p>
          <p className="text-sm text-text-muted mb-8">
            (Vielleicht hat eine KI diesen Link halluziniert.)
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
            >
              Zur Startseite
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-text-primary bg-surface border border-border hover:bg-sand rounded-xl transition-colors"
            >
              Kurse entdecken
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
