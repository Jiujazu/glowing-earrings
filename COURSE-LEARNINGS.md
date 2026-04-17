# Glowing Earrings — Kurs-Learnings

> Raw Log. Nach jedem Kurs ein Eintrag. Patterns wandern als Regel in `COURSE-CREATOR.md`, wiederholte Fehler in `CREATOR §12 Anti-Patterns`. Historische Einträge bleiben erhalten — sie dokumentieren die Genese der Regeln.
>
> **Kein Pre-Flight-Pflichtdokument:** Bei einer regulären Kurs-Erstellung muss dieses File nicht gelesen werden. Konsultiert wird es nur beim 3-Kurs-Ritual oder direkt nach dem Post-Flight zur Sofort-Promotion.

---

## Das Lern-System

Das Lern-System hat **zwei Rückfluss-Pfade** vom Raw Log in die Regeln (`COURSE-CREATOR.md`): einen schnellen und einen langsamen. Details zum Workflow und zu den Rollen aller Dokumente siehe `CLAUDE.md` → Lern-System.

### Pfad 1 — Sofort-Promotion (Post-Flight, nach jedem Kurs)

Claude prüft den frischen Eintrag mit drei Fragen (siehe `CLAUDE.md` Post-Flight Schritt 3):
- **Wiederholungsrisiko:** Würde der Fehler ohne Regel wieder passieren?
- **Universalität:** Gilt das für alle zukünftigen Kurse, nicht nur für diese Quelle?
- **Prüfbarkeit:** Kann man die Regel im Audit (§14) später auditieren?

Wenn alle drei mit ja → Kandidat per `AskUserQuestion` an Julian, sofortige Promotion möglich. Rückfluss-Latenz: 0 Kurse. Promovierte Einträge bekommen Status `promoted → CREATOR §X.Y`.

### Pfad 2 — Verdichtungs-Ritual (Pre-Flight, vor Kurs 4, 7, 10, 13 …)

Immer wenn `(Kursnummer - 1) % 3 == 0` und Kursnummer ≥ 4: Claude liest nur Einträge mit Status `raw` oder `proven` (promovierte werden übersprungen — Rauschen raus) und stellt drei Fragen:
- Welches Pattern taucht in ≥2 Kursen auf? → Promotion-Kandidat (Status `proven`)
- Welcher Fehler wurde wiederholt? → Anti-Pattern-Kandidat
- Was war Einzelfall? → bleibt `raw`, keine Promotion

Julian entscheidet per `AskUserQuestion`. Das Ritual ist der **Zweitfilter** für alles, was im Post-Flight nicht klar genug für Sofort-Promotion war.

### Promotion (Schreib-Akt)

Bestätigte Patterns werden als Regel in der passenden `CREATOR`-Sektion ergänzt. Wiederholte Fehler kommen in `CREATOR §12 Anti-Patterns` (mit Lifecycle-Status `hot`/`dormant`/`archived`). Der LEARNINGS-Eintrag wird mit `→ promoted → CREATOR §X.Y` markiert. In der CREATOR-Regel optional Backlink `(Quelle: LEARNINGS Kurs N)`.

---

## Eintrags-Template

```markdown
### Kurs N: Titel (YYYY-MM-DD)

**Quelle:** [Autor, Typ] — [Schwierigkeit]
**Theme:** [Kurze Theme-Beschreibung]

- **Was war neu:** Was wurde zum ersten Mal ausprobiert?
- **Was hat funktioniert:** Patterns, Entscheidungen, Elemente die gut liefen
- **Was war ein Fehler:** Konkrete Probleme, Bugs, didaktische Missgriffe
- **Hypothese für nächste Kurse:** Was könnte als Regel taugen?
- **Sofort-Promotion-Kandidat?** ja (→ Kandidat X für CREATOR §Y) | nein
- **Status:** raw | proven | promoted → CREATOR §X.Y
```

---

## Kurs-Einträge

### Kurs 1: Die Karpathy Methode (2026-04-10)

**Quelle:** Andrej Karpathy, GitHub Gist — Intermediate
**Theme:** Dark, Knowledge-Graph (Lila + Teal)

- **Was war neu:** Erster Kurs der Plattform. Grund-Konventionen wurden etabliert.
- **Was hat funktioniert:**
  - Flashcards mit "Warum"-Fragen statt Definitionen — regt zum Nachdenken an
  - Quelltreue: Karpathys Begriffe (Ingest/Query/Lint) 1:1 übernommen
  - Easter Egg mit Vannevar Bush — charmant und thematisch passend
- **Was war ein Fehler:**
  - Callout-Varianten brauchten eigene Farben (behoben)
  - Mobile-Nav Z-Index-Konflikte: Header z-[70], MobileNav z-[100]
- **Hypothese für nächste Kurse:** Flashcard-Design als "Warum"-Fragen sollte Regel werden.
- **Status:** promoted → CREATOR §4.4 (Flashcard-Design)

### Kurs 2: Die 7 Stufen von Claude (2026-04-12)

**Quelle:** Community-Tutorial (YouTube) — Intermediate
**Theme:** Dark, Agentic-OS (Amber + Blau)

- **Was war neu:** Erste Nutzung von `code-block` und `step-by-step` als Lehr-Elemente.
- **Was hat funktioniert:**
  - `code-block` und `step-by-step` bewährt
  - 7-Level-Struktur als aufsteigende Dramaturgie
- **Was war ein Fehler:**
  - Quell-Attribution ohne Autor: "Community-Tutorial" zu generisch — besser inhaltliche Beschreibung
  - Stream-Timeouts bei großen Dateien
- **Hypothese für nächste Kurse:** 2-Modul-Blöcke als Pflicht für alle Kurse. Timeout-Regel muss prominent sein.
- **Status:** promoted → CREATOR Timeout-Warnung + §10 (Technische Regeln)

### Kurs 3: Handy App (2026-04-12)

**Quelle:** handy.computer (Tool-Website) — Beginner
**Theme:** Dark, Minimal (Grün + Gelb)

- **Was war neu:** Erster fokussierter Tool-Kurs, kurz gehalten (3–4 Module).
- **Was hat funktioniert:**
  - Kurze Kurse für fokussierte Tool-Vorstellungen
  - Prose-first bewährt — Workflows als Fließtext statt als Callout-Kette
  - Tool-Titel mit erklärendem Subheading ("Die beste Lösung zum Diktieren...")
- **Was war ein Fehler:** —
- **Hypothese für nächste Kurse:** Tool-Kurse brauchen explizites Subheading, das sagt was das Tool ist.
- **Status:** promoted → CREATOR §8.4 (Drei-Ebenen-Titel)

### Kurs 4: Storytelling in der Bildung (2026-04-14)

**Quelle:** Julian van Dieken, YouTube Video — Beginner
**Theme:** Dark, Storytelling (Amber + Warm)

- **Was war neu:** Erster Kurs mit konsequent neo-brutalen In-Course-SVGs. Erste Ergänzung durch externes Framework.
- **Was hat funktioniert:**
  - Neo-brutaler Editorial SVG-Stil für alle In-Course-Grafiken (helle BG, Grid-Pattern, dicke Outlines, Sticker-Labels)
  - Ergänzung durch externes Framework (Trey Parker "Aber-Deshalb-Regel")
  - Namenskonvention `svg_[beschreibung].svg` für In-Course-Grafiken
- **Was war ein Fehler:**
  - SVG-Pfeil-Richtung: Polygon-Punkte für rechts-zeigende Pfeile müssen Tip-x > Base-x haben
  - Bildunterschrift zeigte falschen Kontext (Plastikkiste statt Gruppenszene) — Transkript-Verifizierung fehlte
- **Hypothese für nächste Kurse:** Transkript-Verifizierung als Pflicht-Schritt. Neo-brutaler SVG-Stil als Standard.
- **Status:** promoted → CREATOR §6.4 (SVG-Stil) + §6.7 (Transkript-Verifizierung) + §9 (Qualitäts-Checkliste)

### Kurs 2 Update: Visualisierungen (2026-04-16)

**Änderung:** 3 SVG-Visualisierungen zum Agentic OS Kurs hinzugefügt

- **Was war neu:** Systematische Typisierung von SVG-Visualisierungen (Übersicht/Vergleich/Architektur).
- **Was hat funktioniert:**
  - Übersichts-SVGs (aufsteigende Balken, Stufenmodelle) direkt nach der Einleitung
  - Vergleichs-SVGs (Pro/Contra, Vorher/Nachher) direkt nach textueller Einführung
  - Architektur-SVGs (zentrale Knoten, Verbindungen) nach Konzepteinführung, vor Details
- **Was war ein Fehler:** —
- **Hypothese für nächste Kurse:** SVG-Typen und ihre Platzierung als Regel kodifizieren.
- **Status:** promoted → CREATOR §6.5 (SVG-Triage)

### Kurs 5: Das lebende Wiki (2026-04-16)

**Quelle:** rohitg00, GitHub Gist (agentmemory) — Advanced
**Theme:** Dark, Living-Knowledge (Purple/Teal, leicht variiert zum Vorgänger)

- **Was war neu:** Erster Sequel-Kurs (Anknüpfung an Kurs 1). Erste systematische Gap-Analyse.
- **Was hat funktioniert:**
  - Sequel-Kurs mit direkter Anknüpfung an Vorgänger: "Teil 2" im Subheading, `relatedCourses` gegenseitig
  - Gap-Analyse: Systematisches Mapping jedes Gist-Abschnitts auf Kurs-Elemente VOR dem Schreiben. 12 Lücken identifiziert und eingearbeitet
  - `code-block` mit `highlightLines` (YAML-Beispiel mit hervorgehobenen Schlüsselzeilen)
  - `step-by-step` für Stufenmodelle (Implementation Spectrum, 6 Stufen) — besser als Fließtext
  - Kurs in 3 Teilen geschrieben: kein Timeout
- **Was war ein Fehler:** —
- **Hypothese für nächste Kurse:** Gap-Analyse bei kuratierten Quellen als Pflicht-Schritt. Sequel-Muster (Hook + Recap + `relatedCourses`) wiederverwendbar.
- **Status:** promoted → CREATOR §11 (Gap-Analyse)

### Kurs 1 Update: Karpathy-Review (2026-04-17)

**Änderung:** Nachträglicher §9-Review des ersten Kurses (entstand vor Gap-Analyse- und Quelltreue-Regeln). Retrofit auf aktuellen Standard.

- **Was war neu:** Erste nachträgliche Gap-Analyse für einen bereits live gestellten Kurs. Erste Einbindung einer sekundären Quelle (LinkedIn-Erfahrungsbericht) als narrativer Bridge-Block.
- **Was hat funktioniert:**
  - Gap-Analyse auf fertigen Kurs angewendet: 3 substantielle Lücken (5 Use Cases, Tips & Tricks, Query-Output-Formate) und 1 Quelltreue-Problem (erfundener Begriff "Output Compounding" Karpathy zugeschrieben) identifiziert
  - Patel-LinkedIn-Post als Bridge-Block in Modul 1: macht den abstrakten Benefit sofort konkret und menschlich, ohne Karpathys Autorität zu verwässern
  - Use Cases als Liste mit externem Markdown-Link (Tolkien Gateway) — funktioniert über ReactMarkdown
  - Tool-Tipps als eigenes kurzes Modul statt verteilt: bleibt optional, ohne andere Module aufzublähen
- **Was war ein Fehler:**
  - Quelltreue-Problem "Output Compounding": Ein Begriff wurde Karpathy zugeschrieben, den er im Gist nie verwendet. Trotz ähnlicher Idee ("explorations compound") eine klare §12.8-Verletzung. Bei nachträglichem Review zum ersten Mal aufgefallen — nicht bei Erst-Erstellung.
  - Leere `source.md` (nur Platzhalter-Kommentar) als Altlast: ohne Transkript keine Verifizierung möglich. Sollte bei jedem Kurs am Ende der Erstellung geprüft werden.
- **Hypothese für nächste Kurse:**
  - Bei nachträglichen Reviews die gleiche Gap-Analyse-Disziplin anwenden wie bei Erst-Erstellung.
  - Sekundäre Quellen (Erfahrungsberichte) können sinnvoll sein, solange sie klar attribuiert werden und die Primärquelle nicht verdrängen — eine neue Kategorie zwischen "Primärquelle" und "externem Framework".
  - `source.md`-Füllung als explizite Gate im Post-Flight: ohne Transkript kein Merge.
- **Nicht gefixt (pre-existing §3.1-Verletzungen):**
  - Modul 2: 4 Content-Blöcke hintereinander (arch-intro → layer 1–3) ohne interaktiven Break
  - Modul 3: 3 Content-Blöcke hintereinander (ops-ingest → query → lint) ohne Break
  - Bewusste Entscheidung: Umbau würde die klare thematische Dreiteilung zerstören. Markierung als Diskussion für künftiges Verdichtungs-Ritual.
- **Sofort-Promotion-Kandidat?** nein — "Output Compounding" bereits von §12.8 abgedeckt, `source.md`-Gate bereits in §9 Qualitäts-Checkliste. Grenzfall "Sekundäre Quellen als eigene Kategorie" Julian vorgelegt: Einzelfall, Ritual entscheidet später.
- **Status:** raw
