import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="font-heading text-4xl font-black text-[var(--text-primary)] mb-8 uppercase tracking-tight">
          Impressum
        </h1>
        <div className="prose prose-lg max-w-none text-[var(--text-primary)] prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)]">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Julian van Dieken
            <br />
            Creative Media &amp; Education van Dieken
            <br />
            [Straße + Hausnummer]
            <br />
            [PLZ] Berlin
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: [E-Mail-Adresse einfügen]
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Julian van Dieken
            <br />
            [Straße + Hausnummer]
            <br />
            [PLZ] Berlin
          </p>

          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt.
            Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
            können wir jedoch keine Gewähr übernehmen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf
            deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
            diese fremden Inhalte auch keine Gewähr übernehmen. Für die
            Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
            oder Betreiber der Seiten verantwortlich.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Kursinhalte basieren auf
            öffentlich zugänglichen Quellen und werden mit Quellenangabe
            transformiert dargestellt. Die Vervielfältigung, Bearbeitung
            und Verbreitung außerhalb der Grenzen des Urheberrechts
            bedürfen der schriftlichen Zustimmung des Betreibers.
          </p>
        </div>
      </Container>
    </section>
  );
}
