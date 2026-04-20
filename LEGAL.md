# LEGAL.md — Rechtliche Leitplanken für Kursinhalte

> Orientierung für die Erstellung von Kursen aus fremden Quellen (Tweets, YouTube-Videos, GitHub-Repos, Reddit-Posts, Artikeln). **Keine Rechtsberatung.** Bei konkreten Zweifeln → Fachanwalt Urheberrecht konsultieren.
>
> Stand: April 2026. Deutsches Urheberrecht (UrhG) auf Grundlage der EU-Urheberrechtsreform (DSM-Richtlinie, umgesetzt 2021).

---

## 1. Das Grundprinzip

- Urheberrecht entsteht **automatisch**, sobald ein Werk "Schöpfungshöhe" erreicht — keine Registrierung, kein ©-Zeichen nötig.
- **Ideen und Fakten sind frei** — geschützt ist nur die konkrete Formulierung/Darstellung.
- **"Kostenlos" ≠ "erlaubt"** — das Urheberrecht schützt unabhängig vom kommerziellen Zweck. Ein kostenloser Kurs ist genauso rechtlich relevant wie ein bezahlter.

## 2. Die zwei Haupthebel für Glowing Earrings

### § 51 UrhG — Zitatrecht

Der wichtigste Hebel für Kurse aus kuratierten Quellen. Bedingungen:

- **Eigene inhaltliche Auseinandersetzung** mit dem Werk (Beleg/Grundlage der eigenen Argumentation — kein Selbstzweck)
- **Quelle + Autor** klar genannt
- **Umfang** vom Zitatzweck gedeckt (nicht mehr zitieren als nötig)
- **Zitat als Zitat erkennbar** (Anführungszeichen, Callout `variant="quote"`, Einrückung)
- **Eigener Anteil muss überwiegen** — deutlich mehr Eigenleistung als zitiertes Material

### § 23 UrhG — freie Bearbeitung (seit Reform 2021)

Wenn das neue Werk "hinreichenden Abstand" zum Original hat, ist es **keine zustimmungspflichtige Bearbeitung**. Kurse auf dieser Plattform erfüllen das typischerweise durch:

- neue Struktur (Modul-Schnitt, Didaktik)
- eigene Beispiele, Analogien, Übungen
- eigene Formulierungen statt wörtlicher Übernahme
- Transformation in interaktive Elemente (Quiz, Flashcards, Reflection)

**Die Gap-Analyse (CREATOR §11) unterstützt das direkt** — sie zwingt zur Identifikation eigener Ergänzungen gegenüber der Quelle.

### Was **nicht** für diese Plattform gilt

**§ 60a UrhG (Bildungsschranke)** gilt **nicht** für Glowing Earrings. Die Bildungsschranke ist nur für **formale Bildungseinrichtungen** (Schulen, Universitäten) mit **geschlossenem Teilnehmerkreis** gedacht. Eine öffentlich zugängliche Lernplattform fällt nicht darunter.

## 3. Regeln nach Quellentyp

### Tweets / X-Posts (`sourceType: "tweet"`)

- **Meist keine Schöpfungshöhe** wegen Kürze ("kleine Münze" reicht bei 280 Zeichen selten)
- **Ausnahme:** besonders kreative, literarische oder individuelle Formulierungen
- **Bilder, Videos, Grafiken im Tweet:** immer separat urheberrechtlich geschützt, unabhängig vom Text
- **Einbetten via offizieller X-Funktion:** okay (konkludente Einwilligung durch Posten auf der Plattform)
- **Screenshots:** riskanter, besonders wenn Medien enthalten sind

**Empfehlung:** Kernidee aufgreifen, selbst formulieren, Autor + Link nennen. Screenshots vermeiden — lieber Link + eigener Text.

### YouTube-Videos (`sourceType: "video"`)

- **Immer geschützt** (Filmwerk/Laufbilder — auch ohne Schöpfungshöhe-Prüfung)
- **Offizielles iframe-Embed:** grundsätzlich okay — EuGH hat bestätigt, dass Embedding keine neue öffentliche Zugänglichmachung ist, solange das Video **nicht offensichtlich illegal** hochgeladen wurde
- **Download / Re-Upload / Selbst-Hosting von Ausschnitten:** **nicht erlaubt**
- **Transkript verwenden:** Transkript ist urheberrechtlich wie der gesprochene Text — Zitatrecht anwendbar, aber nicht das gesamte Video abschreiben
- **Thumbnails:** separat geschützt (Bildwerk), nicht einfach übernehmen

**Empfehlung:** `VideoEmbed`-Komponente mit offiziellem Embed nutzen (bereits Standard). Keine Downloads. Bei Transkript-Zitaten kurze Ausschnitte mit Quellenangabe.

### GitHub-Repos (`sourceType: "gist"` / Code-Quellen)

- **Code ist geschützt** (oft mit sehr geringer Schöpfungshöhe)
- **Aber: Lizenz entscheidet.** Immer die `LICENSE`-Datei prüfen:

| Lizenz | Nutzung | Pflicht |
|---|---|---|
| MIT / Apache-2.0 / BSD | frei inkl. kommerziell | Attribution + Lizenztext mitführen |
| GPL / AGPL | Copyleft (kaum relevant, da Code nur erklärt, nicht distribuiert wird) | Attribution |
| CC-BY / CC-BY-SA | häufig für Text/Doku | Attribution, ggf. ShareAlike |
| Keine Lizenz | "Alle Rechte vorbehalten" | Erlaubnis einholen |

- **READMEs/Docs:** oft implizit unter Repo-Lizenz, manchmal separat geregelt
- **Gists ohne Lizenz:** GitHub-ToS geben Drittnutzern nur sehr begrenzte Rechte → wie "keine Lizenz" behandeln

**Empfehlung:** Lizenz in `source.md` dokumentieren. Bei Code-Snippets Attribution + Repo-Link. Kurze Snippets zur Erklärung meist unkritisch.

### Reddit-Posts

- Wie Tweets, aber häufig länger → **eher Schöpfungshöhe erreicht**
- Reddits Nutzungsbedingungen geben **Reddit** Rechte, nicht Dritten — Drittnutzung braucht weiter Autor-Erlaubnis oder Zitatrecht
- Längere Posts/Kommentare: wie Blogpost behandeln

### Artikel / Blogposts / Paper (`sourceType: "article"` / `"document"`)

- **Immer geschützt**, auch ohne Urhebervermerk
- Nutzung nur über Zitatrecht oder substantielle eigenständige Transformation
- **Paper:** oft CC-lizenziert (arXiv, Open-Access-Journale) — Lizenz lesen, meist CC-BY mit Namensnennungspflicht

## 4. Eigene Inhalte vs. fremde Inhalte

**Eigene Inhalte:** Unkritisch, **außer** Rechte wurden übertragen (Arbeitgeber, Verlag, Plattform mit exklusiver Lizenz). Eigene Tweets, LinkedIn-Posts, Podcasts, Blogartikel sind frei wiederverwendbar.

**Fremde Inhalte:** Die Regeln aus Abschnitt 3 gelten. **Einfachster Schutz: Autor fragen.** Eine kurze, freundliche Mail ("Ich baue einen kostenlosen Lernkurs zu deinem Tweet / Video / Artikel, darf ich das als Grundlage nutzen?") wird sehr häufig mit Ja beantwortet und erzeugt zusätzliche Reichweite und Goodwill. Schriftliche Zustimmung = Ende der Unsicherheit.

## 5. Risikoskala

| Vorgehen | Risiko |
|---|---|
| Idee/These aufgreifen + selbst erklären + Quelle nennen | sehr niedrig |
| YouTube offiziell embedden | niedrig |
| Kurzzitat mit Anführungszeichen + Quelle | niedrig |
| GitHub-Code-Snippet mit Lizenz-Check | niedrig |
| Screenshot eines Tweets mit Bild darin | mittel |
| Längere wörtliche Passagen aus Artikel/Paper | mittel-hoch |
| Thumbnails, Grafiken aus Videos ohne Erlaubnis | hoch |
| Video-Ausschnitt selbst hosten | hoch |
| Ohne Transformation einfach umformatieren | hoch |

## 6. Praktische Leitplanken für jeden Kurs

1. **Transformation explizit machen** — deutlich mehr eigener Text als zitiertes Material.
2. **Zitat-Kennzeichnung standardisieren** — wörtliche Übernahmen in `callout variant="quote"` mit Autor + Link.
3. **Quellenangabe vollständig** — `sourceUrl`, `sourceAuthor`, `sourceType` in `CourseMeta` plus Wiederholung im Outro (Standard ist bereits konform).
4. **Bilder/Thumbnails** — selbst erstellen, CC0-Quellen nutzen oder eigene Illustrationen. Hot-Linking fremder Bilder vermeiden.
5. **YouTube** — nur offizielles Embed, keine heruntergeladenen Clips.
6. **GitHub** — Lizenz-Check als Teil der Gap-Analyse bei Code-Quellen, Lizenz in `source.md` dokumentieren.
7. **Opt-in statt Opt-out bei prominenten Quellen** — kurze Mail an den Autor, oft mit Promotion-Effekt.
8. **Dokumentation** — in der `source.md` jedes Kurses Lizenz-Status + ggf. Einwilligungs-Mail ablegen.
9. **Niederschwellige Takedown-Option** im Impressum/Datenschutz — Kontaktadresse für Beanstandungen, schnelle Reaktion bei Anfragen.

## 7. Stand April 2026 — aktuelle Rahmenbedingungen

- **UrhG-Reform 2021** (Umsetzung DSM-Richtlinie): größere Änderungen, die noch wirken. § 24 gestrichen, § 23 umstrukturiert, § 44b neu (Text- und Data-Mining), § 60a–h (Bildung/Wissenschaft) präzisiert.
- **§ 44b UrhG TDM-Klausel:** Relevant, wenn KI zur Analyse von Quellen genutzt wird. Kommerzielles Text- und Data-Mining ist erlaubt, aber Rechteinhaber können **maschinenlesbar** widersprechen (robots.txt, TDM-Reservation-Protocol, ai.txt). Bei automatisierter Verarbeitung prüfen.
- **EU AI Act** (gestaffelt seit 2024 in Kraft): betrifft primär Training und Anbieter von Foundation Models, weniger die Produktion einzelner Kurse.
- **Keine einschlägigen UrhG-Änderungen 2025/2026**, die das Modell von Glowing Earrings direkt betreffen.

## 8. Zusammenfassung

Das Modell "kuratierte Quelle → Transformation in didaktisches Format → klare Attribution" ist rechtlich **tragfähig**, solange:

1. die Transformation real stattfindet (eigene Struktur, eigene Beispiele, eigene Formulierungen),
2. Quellen sauber genannt werden (ist via `CourseMeta` und Outro bereits Standard),
3. wörtliche Zitate als solche gekennzeichnet sind,
4. fremde Medien (Bilder, Video-Ausschnitte) nicht ohne Erlaubnis selbst gehostet werden,
5. Lizenzen bei Code-Quellen respektiert werden.

Der bestehende CREATOR-Workflow mit Gap-Analyse, klarer Quellenangabe und Transformations-Fokus deckt die rechtlichen Anforderungen inhaltlich bereits gut ab.

---

## Plattform-Strategie: Multi-Source als Haltung

Glowing Earrings positioniert sich als **kuratierte Aufbereitung aus mehreren Quellen**, nicht als Nacherzählung von Einzelquellen. Das ist zugleich die rechtlich stärkste Haltung:

- **Weniger Ableitungsabhängigkeit:** Ein Kurs, der aus 2–3+ Quellen + eigenen Ergänzungen besteht, ist als eigenständiges Werk leichter zu begründen (§ 23 UrhG freie Bearbeitung) als eine Single-Source-Aufbereitung.
- **Attribution in den Daten, nicht im Marketing:** Quellenangaben erfüllen § 51 UrhG / § 63 UrhG, ohne dass die Plattform sie als Verkaufsargument inszeniert.
- **Arbeitsmaterial bleibt lokal:** Volltranskripte und Rohnotizen gehören nicht ins öffentliche Repo — siehe `COURSE-CREATOR.md §3.7`.

Diese Strategie ist in `COURSE-CREATOR.md §3.7 Quellen-Strategie & Attribution` operationalisiert.

---

## Quellen

- [§ 51 UrhG — Zitate (dejure.org)](https://dejure.org/gesetze/UrhG/51.html)
- [§ 51 UrhG — Gesetze im Internet](https://www.gesetze-im-internet.de/urhg/__51.html)
- [§ 23 UrhG — Bearbeitungen und Umgestaltungen (dejure.org)](https://dejure.org/gesetze/UrhG/23.html)
- [§ 44b UrhG — Text und Data Mining](https://www.gesetze-im-internet.de/urhg/__44b.html)
- [Urheberrechtsreform 2021 Überblick (Spirit Legal)](https://www.spiritlegal.com/de/aktuelles/details/urheberrechtsreform-2021-anpassungen-an-die-erfordernisse-des-digitalen-binnenmarktes-im-ueberblick.html)
- [Zitatrecht § 51 UrhG (ORCA NRW, PDF)](https://www.orca.nrw/wp-content/uploads/2024/08/RiDHnrw_26-11-20_Das-Zitatrecht-nach-P-51-UrhG_cc.pdf)
- [Kleine Münze im Urheberrecht (ratgeberrecht.eu)](https://www.ratgeberrecht.eu/aktuell/die-kleine-muenze-im-urheberrecht/)
- [Urheberrechtlicher Schutz eines Tweets (Stämmler)](https://www.staemmler.pro/urheberrechtlicher-schutz-eines-tweets/)
- [Tweets können urheberrechtlich geschützt sein (contentmanager.de)](https://www.contentmanager.de/redaktion-recht/tweets-koennen-urheberrechtlich-geschuetzt-sein/)
- [Twitter und die urheberrechtlichen Grenzen (IT-Recht-Kanzlei)](https://www.it-recht-kanzlei.de/posten-liken-teilen-urheberrecht-grenzen.html)
- [YouTube im Unterricht (Lehrerfreund)](https://www.lehrerfreund.de/schule/1s/youtube-unterricht-recht/4671)
- [Urheberrecht im digitalen Unterricht (Stadt Nürnberg)](https://www.nuernberg.de/internet/digitale_schule/urheberrecht.html)
- [Reddit Copyright Overview](https://support.reddithelp.com/hc/en-us/articles/360043076292-Copyright-overview)
- [Urheberrecht im Internet 2026 (bussgeldkatalog.org)](https://www.bussgeldkatalog.org/urheberrecht-internet/)
- [GitHub Licensing a repository](https://docs.github.com/articles/licensing-a-repository)
- [Text und Data Mining nach dem neuen Urheberrecht (CMS Blog)](https://www.cmshs-bloggt.de/gewerblicher-rechtsschutz/urheberrecht/text-und-data-mining-nach-dem-neuen-urheberrecht/)
