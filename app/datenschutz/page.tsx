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
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-8">
          Datenschutzerklärung
        </h1>
        <div className="prose prose-lg max-w-none text-text-primary prose-headings:font-heading prose-headings:text-text-primary prose-p:text-text-secondary">
          <h2>1. Verantwortlicher</h2>
          <p>
            Julian van Dieken
            <br />
            Creative Media &amp; Education van Dieken
            <br />
            Berlin, Deutschland
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
            Wenn Sie sich für unseren Newsletter &ldquo;Das&apos;n gutes Ding&rdquo; anmelden,
            erheben wir:
          </p>
          <ul>
            <li>Ihre E-Mail-Adresse (Pflichtfeld)</li>
            <li>Zeitpunkt der Anmeldung</li>
            <li>Quelle der Anmeldung (z.B. welche Kursseite)</li>
          </ul>
          <p>
            Die Anmeldung erfolgt über ein <strong>Double-Opt-In-Verfahren</strong>:
            Nach der Eingabe Ihrer E-Mail erhalten Sie eine Bestätigungsmail.
            Erst nach Klick auf den Bestätigungslink wird Ihre Adresse in den
            Verteiler aufgenommen.
          </p>
          <p>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
          <p>
            Sie können Ihre Einwilligung jederzeit widerrufen und den Newsletter
            über den Abmeldelink in jeder Ausgabe abbestellen.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Diese Website verwendet in Phase 1 <strong>keine Cookies</strong> und
            kein Tracking. Es werden keine Analytics-Tools eingesetzt.
          </p>

          <h2>6. Ihre Rechte</h2>
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

          <h2>7. Beschwerderecht</h2>
          <p>
            Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
            Die zuständige Aufsichtsbehörde ist die Berliner Beauftragte für
            Datenschutz und Informationsfreiheit.
          </p>

          <p className="text-sm text-text-muted mt-8">
            Stand: April 2026
          </p>
        </div>
      </Container>
    </section>
  );
}
