# Glowing Earrings — Kurs-Learnings

> Raw Log. Nach jedem Kurs ein Eintrag. Wird alle 3 Kurse verdichtet — bewährte Patterns wandern als Regel in `COURSE-STYLEGUIDE.md`, wiederholte Fehler in `§12 Anti-Patterns`. Historische Einträge bleiben erhalten — sie dokumentieren die Genese der Regeln.

---

## Das 3-Stage-Lern-System

### Stage 1 — Capture (Post-Flight, nach jedem Kurs)
Neuen Eintrag in diesem Dokument anlegen. Template unten. Status `raw`. Keine Bewertung, ob es eine Regel werden soll — nur Memo.

### Stage 2 — Verdichten (Pre-Flight, vor Kurs 4, 7, 10, 13 …)
Immer wenn `(Kursnummer - 1) % 3 == 0` und Kursnummer ≥ 4: Claude liest die letzten 3 Einträge mit Status `raw` oder `proven` und stellt drei Fragen:
- Welches Pattern taucht in ≥2 Kursen auf? → Promotion-Kandidat (Status `proven`)
- Welcher Fehler wurde wiederholt? → Anti-Pattern-Kandidat
- Was war Einzelfall? → bleibt `raw`, keine Promotion

Claude legt Julian die Kandidaten per `AskUserQuestion` vor. Julian entscheidet.

### Stage 3 — Promotion (in STYLEGUIDE)
Bestätigte Patterns werden als Regel in der passenden STYLEGUIDE-Sektion ergänzt. Wiederholte Fehler kommen in `§12 Anti-Patterns`. Der LEARNINGS-Eintrag wird mit `→ promoted to STYLEGUIDE §X.Y` markiert. In der STYLEGUIDE-Regel optional Backlink `(Quelle: LEARNINGS Kurs N)`.

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
- **Status:** raw | proven | promoted → STYLEGUIDE §X.Y
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
- **Status:** promoted → STYLEGUIDE §4.4 (Flashcard-Design)

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
- **Status:** promoted → STYLEGUIDE Timeout-Warnung + §10 (Technische Regeln)

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
- **Status:** promoted → STYLEGUIDE §8.4 (Drei-Ebenen-Titel)

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
- **Status:** promoted → STYLEGUIDE §6.4 (SVG-Stil) + §6.7 (Transkript-Verifizierung) + §9 (Qualitäts-Checkliste)

### Kurs 2 Update: Visualisierungen (2026-04-16)

**Änderung:** 3 SVG-Visualisierungen zum Agentic OS Kurs hinzugefügt

- **Was war neu:** Systematische Typisierung von SVG-Visualisierungen (Übersicht/Vergleich/Architektur).
- **Was hat funktioniert:**
  - Übersichts-SVGs (aufsteigende Balken, Stufenmodelle) direkt nach der Einleitung
  - Vergleichs-SVGs (Pro/Contra, Vorher/Nachher) direkt nach textueller Einführung
  - Architektur-SVGs (zentrale Knoten, Verbindungen) nach Konzepteinführung, vor Details
- **Was war ein Fehler:** —
- **Hypothese für nächste Kurse:** SVG-Typen und ihre Platzierung als Regel kodifizieren.
- **Status:** promoted → STYLEGUIDE §6.5 (SVG-Triage)

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
- **Status:** promoted → STYLEGUIDE §11 (Gap-Analyse)
