import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import NewsletterCTA from "@/components/layout/NewsletterCTA";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Über Glowing Earrings, Julian van Dieken und warum diese Plattform existiert.",
};

export default function AboutPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-8">
          Warum Glowing Earrings?
        </h1>

        <div className="space-y-6 text-text-secondary text-lg leading-relaxed mb-12">
          <p>
            Der öffentliche Diskurs über generative KI ist gefangen zwischen drei
            Extremen: <strong>Hype-Erzeuger</strong>, die Produkte verkaufen wollen;{" "}
            <strong>Angst-Narrative</strong>, die Abwehr schüren; und{" "}
            <strong>bürokratisch-graue Bildungsformate</strong>, die kaum jemanden
            erreichen.
          </p>
          <p>
            Was fehlt, ist ein unabhängiger, ästhetisch ansprechender und
            kostenfreier Ort, der generative KI nahbar, ehrlich und mit Freude am
            Entdecken vermittelt — ohne Clickbait, ohne Paywall, ohne
            Algorithmus-Druck.
          </p>
          <p>
            <strong>Glowing Earrings</strong> füllt diese Lücke.
          </p>
        </div>

        {/* The Name */}
        <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border mb-12">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
            Der Name
          </h2>
          <p className="text-text-secondary leading-relaxed">
            &ldquo;Glowing Earrings&rdquo; verweist auf das KI-Kunstwerk
            &ldquo;A Girl with Glowing Earrings&rdquo;, das 2023 als erstes
            KI-generiertes Bild in einem traditionellen Museum (Mauritshuis,
            Den Haag) ausgestellt wurde — und damit eine weltweite Debatte über
            KI und Kreativität auslöste. Das Projekt führt den Gedanken fort: von
            der künstlerischen Provokation zur systematischen Vermittlung.
          </p>
        </div>

        {/* Julian */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
            Über Julian
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Julian van Dieken ist Freelancer für Creative Media &amp; Education in
            Berlin. Er baut Glowing Earrings als Solo-Projekt — kuratiert die
            Quellen, designt die Kurse und nutzt Claude Code als primäres
            Entwicklungswerkzeug.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Wie die Kurse entstehen
          </h2>
          <ol className="space-y-3 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
                1
              </span>
              <span>
                Julian findet eine Quelle — ein Tweet, ein Vortrag, ein Artikel —
                die es verdient, interaktiv vermittelt zu werden.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
                2
              </span>
              <span>
                Die Quelle wird in einen interaktiven Kurs transformiert: mit
                Quizzes, Flashcards, Reflexionsfragen und einem eigenen visuellen
                Design.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center mt-0.5">
                3
              </span>
              <span>
                Der Kurs geht live — kostenlos, ohne Registrierung, für alle.
              </span>
            </li>
          </ol>
        </div>

        <NewsletterCTA variant="featured" source="about" />
      </Container>
    </section>
  );
}
