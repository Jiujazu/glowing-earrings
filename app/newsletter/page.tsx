import type { Metadata } from "next";
import NewsletterCTA from "@/components/layout/NewsletterCTA";
import Container from "@/components/ui/Container";
import { HEADING } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Newsletter — Ein gutes Ding",
  description:
    "Jede Woche ein hilfreiches, spannendes oder inspirierendes KI-Tool. Kurz, knackig, mit Herz.",
};

export default function NewsletterPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container size="narrow">
        <div className="text-center mb-12">
          <p className="text-4xl mb-4">💌</p>
          <h1 className={`${HEADING} text-4xl sm:text-5xl text-[var(--text-primary)] mb-4`}>
            Ein gutes Ding
          </h1>
          <p className="text-lg font-medium text-[var(--text-primary)]">
            Der Newsletter von Julian van Dieken.
          </p>
        </div>

        <NewsletterCTA variant="standalone" source="newsletter-page" />
      </Container>
    </section>
  );
}
