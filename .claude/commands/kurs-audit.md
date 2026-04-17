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

### 6. Feedback-Loop zu LEARNINGS (§14.3 Schritt 4)

Für **jedes** Finding mit Status ❌ oder ⚠️ prüfen: **systemisch oder Einzelfall?**

Systemisch = alle drei:
- Ähnliche Verletzung in anderen Kursen denkbar (nicht nur in diesem Kurs problematisch)
- Regel ist prüfbar
- Noch nicht als Anti-Pattern in §12 geführt

Pro systemisches Finding: Julian via `AskUserQuestion` **einzeln** fragen:

> „Finding X ist systemisch. Soll ein LEARNINGS-Eintrag entstehen?"
> - Ja, als neuen Eintrag mit `source: audit $ARGUMENTS YYYY-MM-DD` anlegen
> - Nein, Einzelfall

Bei „ja":
- Neuen Eintrag in `COURSE-LEARNINGS.md` unten anhängen (nach Template dort, Feld `Quelle` = `audit $ARGUMENTS YYYY-MM-DD`)
- **Sofort-Promotion-Check** auf diesen Eintrag anwenden (siehe `CLAUDE.md` Post-Flight Schritt 3 — drei Fragen: Wiederholungsrisiko, Universalität, Prüfbarkeit). Ergebnis in die Felder `Sofort-Promotion-Kandidat?` und `Status` eintragen.

In der Audit-Sektion (§14.5 Template) unter „Systemische Findings" jedes systemische Finding mit Julians Entscheidung dokumentieren.

### 7. Chat-Summary (§14.4)

Nach Abschluss im Chat **nur die Kurzfassung** ausgeben — keine Detail-Tabelle:

> **Audit für `$ARGUMENTS` abgeschlossen.**
> - Findings: **X total** (Y kritisch ❌, Z Warnungen ⚠️)
> - Status: bestanden / Nachbesserung nötig
> - Kritisch: [Stichwort 1], [Stichwort 2]
> - Systemisch (→ LEARNINGS): [Stichwort, falls vorhanden; sonst „keine"]
> - Details: `/content/courses/$ARGUMENTS/audit-log.md` (neue Sektion von heute)

## Wichtig

- **Append-only:** `audit-log.md` wird nie überschrieben. Jeder Lauf hängt unten an.
- **SSoT:** Alle Regeln in `COURSE-CREATOR.md §1–§14`. Bei Unklarheit dort nachschlagen, nicht hier.
- **Kein Kurs-Inhalt ändern:** Das Audit schreibt nur `audit-log.md` und ggf. einen neuen `COURSE-LEARNINGS.md`-Eintrag. `course.json` bleibt unangetastet — Nachbesserungen sind ein separater Task.
- **Creator-Version im Header:** Die git-SHA von `COURSE-CREATOR.md` zum Audit-Zeitpunkt gehört in jede neue Sektion, damit spätere Re-Audits nachvollziehen können, gegen welche Regel-Version geprüft wurde.
- **Kein Commit am Ende:** Schreibe nur die Dateien. Julian entscheidet, ob/wann committed wird.
