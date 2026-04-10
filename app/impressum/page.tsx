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
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-8">
          Impressum
        </h1>
        <div className="prose prose-lg max-w-none text-text-primary prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            Julian van Dieken
            <br />
            Creative Media &amp; Education van Dieken
            <br />
            Berlin, Deutschland
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: [E-Mail-Adresse einfügen]
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            Julian van Dieken
            <br />
            Berlin, Deutschland
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
            diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die Inhalte und Werke auf diesen Seiten unterliegen dem
            deutschen Urheberrecht. Die Kursinhalte basieren auf
            öffentlich zugänglichen Quellen und werden mit Quellenangabe
            transformiert dargestellt.
          </p>
        </div>
      </Container>
    </section>
  );
}
