import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: false, follow: false },
};

export default function DatenschutzPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container size="narrow">
        <h1 className="font-heading text-4xl font-black text-[var(--text-primary)] mb-8 uppercase tracking-tight">
          Datenschutzerklärung
        </h1>
        <div className="prose prose-lg max-w-none text-[var(--text-primary)] prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-headings:text-[var(--text-primary)] prose-p:text-[var(--text-primary)] prose-strong:text-[var(--text-primary)] prose-li:text-[var(--text-primary)]">
          <h2>1. Verantwortlicher</h2>
          <p>
            Julian van Dieken
            <br />
            Creative Media &amp; Education van Dieken
            <br />
            [Straße + Hausnummer]
            <br />
            [PLZ] Berlin
            <br />
            E-Mail: [E-Mail-Adresse einfügen]
          </p>

          <h2>2. Übersicht der Datenverarbeitungen</h2>
          <p>
            Diese Website erhebt und verarbeitet personenbezogene Daten nur im
            technisch notwendigen Umfang und wenn Sie aktiv einwilligen
            (Newsletter-Anmeldung).
          </p>

          <h2>3. Hosting</h2>
          <p>
            Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Baxter St,
            Coppell, TX 75019, USA) gehostet. Beim Besuch der Website werden
            automatisch technische Informationen (IP-Adresse, Zeitpunkt des
            Zugriffs, Browser-Typ) in Server-Logfiles gespeichert. Diese Daten
            sind nicht bestimmten Personen zuordenbar und werden nicht mit
            anderen Datenquellen zusammengeführt.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
            an der sicheren und effizienten Bereitstellung der Website).
          </p>

          <h2>4. Newsletter</h2>
          <p>
            Wenn Sie sich für unseren Newsletter &ldquo;Ein gutes Ding&rdquo; anmelden,
            erheben wir:
          </p>
          <ul>
            <li>Ihre E-Mail-Adresse (Pflichtfeld)</li>
            <li>Zeitpunkt der Anmeldung</li>
            <li>Quelle der Anmeldung (z.B. welche Kursseite)</li>
          </ul>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
            Der Versand erfolgt erst nach ausdrücklicher Bestätigung.
          </p>
          <p>
            Sie können Ihre Einwilligung jederzeit widerrufen und den Newsletter
            über den Abmeldelink in jeder Ausgabe abbestellen.
          </p>

          <h2>5. Lokale Speicherung (localStorage)</h2>
          <p>
            Diese Website speichert Ihren Lernfortschritt (besuchte Module,
            abgeschlossene Quizzes, Scroll-Position) sowie Ihre Theme-Einstellung
            (hell/dunkel) ausschließlich lokal in Ihrem Browser (localStorage).
            Diese Daten werden <strong>nicht an unsere Server übertragen</strong> und
            können jederzeit über die Browser-Einstellungen gelöscht werden.
          </p>

          <h2>6. Cookies &amp; Tracking</h2>
          <p>
            Diese Website verwendet <strong>keine Cookies</strong> und
            kein Tracking. Es werden keine Analytics-Tools eingesetzt.
          </p>

          <h2>7. Ihre Rechte</h2>
          <p>Sie haben das Recht auf:</p>
          <ul>
            <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte
            E-Mail-Adresse.
          </p>

          <h2>8. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
            Die zuständige Aufsichtsbehörde ist die Berliner Beauftragte für
            Datenschutz und Informationsfreiheit.
          </p>

          <p className="text-sm font-bold uppercase tracking-wide mt-8">
            Stand: April 2026
          </p>
        </div>
      </Container>
    </section>
  );
}
