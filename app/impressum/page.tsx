import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import { HEADING, PROSE_HEADINGS } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

const ImpressumAddress = dynamic(
  () =>
    import("@/components/impressum/ImpressumSensitiveData").then(
      (m) => m.ImpressumAddress
    ),
  { ssr: false, loading: () => <span>…</span> }
);

const ImpressumEmail = dynamic(
  () =>
    import("@/components/impressum/ImpressumSensitiveData").then(
      (m) => m.ImpressumEmail
    ),
  { ssr: false, loading: () => <span>…</span> }
);

export default function ImpressumPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className={`${HEADING} text-4xl text-[var(--text-primary)] mb-8`}>
          Impressum
        </h1>
        <div
          className={`prose prose-lg max-w-none text-[var(--text-primary)] ${PROSE_HEADINGS} prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)]`}
        >
          <h2>Angaben gemäß § 5 DDG</h2>
          <ImpressumAddress />

          <h2>Kontakt</h2>
          <p>
            E-Mail: <ImpressumEmail />
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <ImpressumAddress />

          <h2>Streitbeilegung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
            .
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <h2>Haftungsausschluss</h2>

          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Als
            Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG
            sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
            oder gespeicherte fremde Informationen zu überwachen oder nach
            Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung
            von Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
            der Seiten verantwortlich. Die verlinkten Seiten wurden zum
            Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
            Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht
            erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht
            kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Die Kursinhalte basieren auf öffentlich zugänglichen Quellen Dritter
            und werden mit Quellenangabe als transformierte Lernmaterialien
            dargestellt. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
            erstellt wurden, werden die Urheberrechte Dritter beachtet.
            Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
            Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
            werden, bitten wir um einen entsprechenden Hinweis. Bei
            Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
            umgehend entfernen.
          </p>
        </div>
      </Container>
    </section>
  );
}
