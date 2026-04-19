---
description: Auditiert einen fertigen Kurs gegen COURSE-CREATOR.md §14 und hängt Findings append-only an audit-log.md an
argument-hint: [slug]
---

# /kurs-audit $ARGUMENTS

Führe ein Audit für den Kurs `$ARGUMENTS` durch. Folge dem Protokoll aus **`COURSE-CREATOR.md §14`** — dort lebt die Single Source of Truth, diese Command-Datei ist nur der ausführende Prozess.

## Voraussetzungen

- Aktuelle Working Copy auf `main` (oder Feature-Branch mit aktuellem COURSE-CREATOR.md)
- Kurs-Ordner `/content/courses/$ARGUMENTS/` existiert

## Ablauf

### 1. Vorbereitung

- **Creator-Version ermitteln:** `git log -1 --format=%h COURSE-CREATOR.md` → als SHA in die neue Sektion
- **Audit-Datum:** heutiges Datum im Format `YYYY-MM-DD`
- **Kurs-Dateien lesen:**
  - `/content/courses/$ARGUMENTS/course.json` — Pflicht
  - `/content/courses/$ARGUMENTS/source.md` — falls vorhanden
  - `/content/courses/$ARGUMENTS/gap-analysis.md` — falls vorhanden
  - `/content/courses/$ARGUMENTS/audit-log.md` — falls vorhanden (= Re-Audit, vorige Sektionen als Vergleichsbasis lesen)

### 2. Prüfliste aus CREATOR §14.2 abarbeiten

Pro Check Status vergeben:
- ✅ erfüllt
- ⚠️ Warnung (kosmetisch, nicht blockend)
- ❌ kritisch (Regel-Verletzung, Nachbesserung nötig)
- `n/a` nicht anwendbar

**Zu prüfende Kategorien** (siehe COURSE-CREATOR.md §14.2 für die vollständige Liste):
- Struktur, Inhalt, Elemente, Meta, Mobile & Design, **Technik (§10)**, Artefakte, Anti-Patterns (nur `hot` aus §12)

Bei jedem Finding: **Stelle im Kurs nennen** (z.B. „Modul 3 Content-Block", „meta.tags").

### 3. Anlass bestimmen

- Erst-Audit → `regulär nach Creator-Update` / `ad hoc` / `Refactor-Trigger` (aus Kontext ableiten; im Zweifel Julian fragen)
- Audit-log existiert bereits → `Re-Audit nach Nachbesserung` oder `Re-Audit nach Creator-Update`

### 4. Vergleich zum letzten Audit

Falls `audit-log.md` bereits existiert:
- Vorige Findings mit aktuellen abgleichen
- Zeile im Template: z.B. „2 kritische gefixt, 1 neue Warnung" / „1 Warnung weiterhin offen, bewusst nicht gefixt"

Falls Erst-Audit: „entfällt beim Erst-Audit".

### 5. audit-log.md schreiben — **APPEND-ONLY**

Datei: `/content/courses/$ARGUMENTS/audit-log.md`

- **Wenn Datei nicht existiert:** Datei-Kopf + erste Sektion anlegen (siehe Template §14.5)
- **Wenn Datei existiert:** **nur neue Sektion unten anhängen**. Vorige Sektionen bleiben unverändert — keine Umformulierungen, keine „Updates" in alten Sektionen.

Die neue Sektion beginnt mit `---` als Trenner und folgt dem Template aus `COURSE-CREATOR.md §14.5`:

```markdown
---

## Audit YYYY-MM-DD

- **Creator-Version:** <git SHA>
- **Auditor:** Claude
- **Anlass:** <regulär | ad hoc | Refactor-Trigger | Re-Audit nach Nachbesserung | Re-Audit nach Creator-Update>

### Zusammenfassung

- **Findings:** X total (Y kritisch ❌, Z Warnungen ⚠️)
- **Status:** bestanden / Nachbesserung nötig
- **Vergleich zu letztem Audit:** ...

### Regel-Check

| Kategorie | Regel (Creator §) | Status | Stelle im Kurs | Notiz |
|---|---|---|---|---|
| ... | ... | ... | ... | ... |

### Empfohlene Nachbesserungen

1. **[Kritisch]** ... (§...)
2. **[Warnung]** ... (§...)

### Systemische Findings (an LEARNINGS gemeldet?)

- **§... ...** → Julian: ja/nein — <Begründung / LEARNINGS-Eintrag-Name>

### Nicht gefixt / bewusst offen gelassen

- ...
```

### 6. Chat-Summary (§14.4)

Nach Abschluss im Chat **nur die Kurzfassung** ausgeben, keine Detail-Tabelle:

> **Audit für `$ARGUMENTS` abgeschlossen.**
> - Findings: **X total** (Y kritisch ❌, Z Warnungen ⚠️)
> - Status: bestanden / Nachbesserung nötig
> - Kritisch: [Stichwort 1], [Stichwort 2]
> - Systemisch (→ LEARNINGS): [Stichwort, falls vorhanden; sonst „keine"]
> - Details: `/content/courses/$ARGUMENTS/audit-log.md` (neue Sektion von heute)

### 7. Nachbesserung-Übergang (§14.3 Schritt 5, Pflicht)

Wenn Findings mit ❌ oder ⚠️ existieren: Julian via `AskUserQuestion` fragen, ob die Nachbesserungen **jetzt direkt** umgesetzt werden oder als **separater Task** laufen.

Formulierung in einfacher Sprache (LEARNINGS `Workflow-Audit: Audit-Fragen-Stil`), Optionen mit Konsequenz-Erklärung:

> „Die Findings sind im audit-log dokumentiert. Wie weiter?"
> - Jetzt direkt fixen → ich mache die Änderungen am Kurs, committe sie separat vom Audit-Log
> - Als separater Task → ich stoppe hier; die offenen Punkte bleiben im audit-log für später

Bei **„jetzt"** → Schritt 8.
Bei **„separater Task"** → Schritt 9 entfällt in dieser Session. Die LEARNINGS-Rückfrage wird im Fix-Task nachgezogen.

### 8. Fixes + Re-Audit-Sektion (nur bei „jetzt")

- Fixes pro Finding am Kurs ausführen (`course.json`, ggf. `source.md`, `gap-analysis.md`, Geschwister-Kurse bei Reziprozität).
- **Pflicht-Minima per Grep verifizieren** (§9): `rg -c '"type": "key-concept|quiz|flashcard|reflection|easter-egg"'` — Soll-Werte 1/2/3/1/1.
- **Re-Audit-Sektion** als neue Sektion unten in `audit-log.md` anhängen (append-only). Inhalt: Anlass = „Direkt-Fix nach Erst-Audit", Fix-Protokoll-Tabelle (Finding → Regel → Fix → Verifikation), Grep-Output der Pflicht-Minima, bewusst belassene Ausnahmen.
- Commits: Audit-Befund und Kurs-Fixes in **getrennten Commits**.

### 9. Feedback-Loop zu LEARNINGS (§14.3 Schritt 6, **nach Fix**)

Wichtig: Dieser Check passiert **nach** dem Fix, weil erst dann klar ist, ob die Regel trivial greift oder ein tieferes Problem offenbart wurde (Beispiel: Der Grep-Check-Vorschlag entstand aus dem Fix-Erlebnis, nicht aus dem Befund).

Für **jedes** Finding mit Status ❌ oder ⚠️ prüfen: **systemisch oder Einzelfall?**

Systemisch = alle drei:
- Ähnliche Verletzung in anderen Kursen denkbar (nicht nur in diesem Kurs problematisch)
- Regel ist prüfbar
- Noch nicht als Anti-Pattern in §12 geführt

Pro systemisches Finding: Julian via `AskUserQuestion` **einzeln** fragen, in jargon-freier Sprache mit Konsequenz-Optionen (siehe LEARNINGS `Workflow-Audit: Audit-Fragen-Stil`):

> „Finding X ist systemisch. Soll daraus eine Regel für alle Kurse werden?"
> - Ja, als neuen Eintrag mit `source: audit $ARGUMENTS YYYY-MM-DD` in LEARNINGS anlegen
> - Nein, Einzelfall, nur im audit-log belassen

Bei „ja":
- Neuen Eintrag in `COURSE-LEARNINGS.md` unten anhängen (nach Template dort, Feld `Quelle` = `audit $ARGUMENTS YYYY-MM-DD`)
- **Sofort-Promotion-Check** auf diesen Eintrag anwenden (siehe `CLAUDE.md` Post-Flight Schritt 3, drei Fragen: Wiederholungsrisiko, Universalität, Prüfbarkeit). Ergebnis in die Felder `Sofort-Promotion-Kandidat?` und `Status` eintragen.

In der Audit-Sektion (§14.5 Template) unter „Systemische Findings" jedes systemische Finding mit Julians Entscheidung dokumentieren.

## Wichtig

- **Append-only:** `audit-log.md` wird nie überschrieben. Jeder Lauf (inkl. Re-Audit nach Fix) hängt unten an.
- **SSoT:** Alle Regeln in `COURSE-CREATOR.md §1–§14`. Bei Unklarheit dort nachschlagen, nicht hier.
- **Commits getrennt:** Audit-Befund (`audit-log.md`) und Kurs-Fixes (`course.json` etc.) immer in separaten Commits. Der Befund ist Protokoll, der Fix ist Arbeit, beide haben eigene Commit-Historien.
- **Creator-Version im Header:** Die git-SHA von `COURSE-CREATOR.md` zum Audit-Zeitpunkt gehört in jede neue Sektion, damit spätere Re-Audits nachvollziehen können, gegen welche Regel-Version geprüft wurde.
- **LEARNINGS erst nach Fix:** Schritt 9 folgt Schritt 8. Wird der Fix auf einen separaten Task verschoben, rutscht auch der LEARNINGS-Check dorthin — kein Learning ohne Praxistest.
