# Glowing Earrings — Course Creator

> Regelwerk für die Kurs-Erstellung. Single Source of Truth für Didaktik, Struktur, Design, Qualitäts-Checkliste, Gap-Analyse, Anti-Patterns und Audit-Protokoll. Wird aktualisiert, wenn Learnings aus `COURSE-LEARNINGS.md` in Regeln überführt werden. Vor jeder Kurs-Erstellung komplett lesen.
>
> **Zwei Rollen, eine Datei:** Dieses Dokument wird sowohl beim **Bauen** eines Kurses (Pre-Flight + Produktion) als auch beim **Prüfen** (Audit, siehe §14) genutzt. Das garantiert, dass Creator-Regeln und Audit-Kriterien nicht auseinanderdriften können.

---

## !! WARNUNG: Kurse IMMER in Teilen erstellen !!

> **Kurs-JSON-Dateien NIEMALS in einem einzigen Schritt schreiben.** Bei Nichteinhaltung kommt es zu Timeout-Fehlern und der gesamte Fortschritt geht verloren.

**Vorgehen (Pflicht für JEDEN Kurs, egal wie klein):**

1. **Teil 1 — Write:** Meta + Intro + Module 1-2 → neue Datei erstellen
2. **Teil 2-n — Edit:** Je 2 weitere Module ans bestehende JSON anhängen
3. **Letzter Teil — Edit:** Letzte Module + Outro anhängen + `]` und `}` schließen

Zwischen jedem Teil kurz prüfen, dass das JSON valide ist. Wer das ignoriert, verliert seine Arbeit durch Timeouts.

---

## §1 Autoren-Prozess

Der Weg von Quellen zum fertigen Kurs — in dieser Reihenfolge:

### 1.1 Quelle lesen & Typ bestimmen
- **Original komplett lesen/ansehen** (Tweet, Artikel, Video, Gist, Paper)
- Quellentyp erfassen (`tweet` / `article` / `video` / `gist` / `document` / `other`)
- Tonfall des Originals identifizieren (locker / fachlich / akademisch)
- Schwierigkeitsgrad aus der Quelle ableiten (nicht aus Ziel-Verteilung)

### 1.2 Gap-Analyse (Pflicht bei kuratierten Quellen)
Siehe §11. Jeden Quellen-Abschnitt systematisch auf Kurs-Elemente mappen **bevor** geschrieben wird. Lücken explizit auflisten und einarbeiten. Ohne diesen Schritt werden Inhalte übersehen.

### 1.3 Lernziele pro Modul definieren
- Was soll die Lernende **nach** diesem Modul verstehen oder können?
- Formulierung: "Nach diesem Modul kannst du X erklären / weißt du warum Y / hast du ein Beispiel für Z."
- Pro Modul maximal 2 Lernziele. Mehr → Modul splitten.

### 1.4 Modul-Schnitt
- 3–6 Module, je 2–5 Minuten Lernzeit
- Logisch aufbauend, ungefähr vergleichbare Länge
- Modul-Titel: kurz, prägnant, max 4–5 Wörter, keine Emojis
- Übergänge bevorzugt als Querverweis zu verwandten Kursen

### 1.5 Element-Wahl pro Modul
- Pflicht-Minima über den Kurs hinweg: 2 Quiz, 3 Flashcards, 1 Reflexion, 1 Easter Egg, 1 Key-Concept
- Nicht jedes Modul braucht jedes Element — Reihenfolge variieren
- Boxen (Callout, Key-Concept, Context-Box) sparsam. Fließtext ist die Basis.

### 1.6 Schreiben in Teilen (Pflicht, siehe Warnung oben)
- Teil 1 (`Write`): Meta + Intro + Module 1–2
- Teil 2-n (`Edit`): Je 2 Module anhängen
- Letzter Teil (`Edit`): Letzte Module + Outro + JSON schließen

### 1.7 Transkript-Verifizierung
Vor dem Finalisieren: Kursinhalte gegen Original-Transkript prüfen. Bildunterschriften, Zitate, Zahlen, Reihenfolge. Siehe §6.7.

### 1.8 Post-Flight
- Neuen Eintrag in `COURSE-LEARNINGS.md` (siehe dort für Template)
- Bei Kursnummer ≥4 und `(N-1) % 3 == 0`: Verdichtungs-Ritual durchführen (letzte 3 Einträge prüfen, Promotion-Kandidaten vorschlagen)

---

## §2 Mobile-First Content-Design

> Die wichtigste Regel. Alle Inhalte werden primär auf Smartphones gelesen. Jeder Kurs muss perfekt auf einem 6-Zoll-Display funktionieren.

**Grundprinzip: Der Inhalt gibt das Styling vor — nicht umgekehrt.** Formatierung ist kein nachträgliches Drüberstülpen. Wenn ein Gedanke zu einem 5-Satz-Absatz wird, muss der Gedanke anders formuliert werden — kürzer, in Teilschritte zerlegt, als Liste. Der Text muss von Anfang an so geschrieben sein, dass er auf Mobile leicht zu erfassen ist.

### 2.1 Absätze & Textlänge
- **Max 2-3 Sätze pro Absatz.** Auf Mobile ist ein 5-Satz-Absatz eine Textwüste. Lieber ein Absatz zu viel als einer zu wenig.
- **Echte Absätze mit sichtbarem Abstand.** Absätze müssen auf Mobile klar voneinander getrennt sein — nicht nur ein minimaler Zeilenumbruch, sondern eine deutlich sichtbare Leerzeile. Das wird über die ContentBlock-Komponente gesteuert (`prose-p:mb-6`).
- **Kein Content-Element ohne visuellen Bruch nach 3 Sätzen.** Wenn ein Textblock auf Mobile mehr als 1.5 Bildschirme füllt, muss er geteilt werden.
- **Lieber zwei kürzere Content-Elemente als ein Riesenblock.** Jedes Content-Element sollte ein klares Thema haben.

### 2.2 Optische Gewichtungen (Pflicht)
Jeder Content-Block braucht mindestens 2 verschiedene optische Gewichtungen. Ein Textblock darf **nie** uniform grau aussehen. Verfügbare Mittel:
- **`###`-Zwischenüberschriften** — in Kursfarbe, schaffen optischen Halt und Orientierung
- **Bold** (`**text**`) — für Kernaussagen, zentrale Begriffe, wichtige Zahlen
- **Listen** (`- item`) — für Aufzählungen, Schritte, Optionen. Immer bevorzugen wenn 3+ parallele Punkte vorkommen
- **Kursiv** (`*text*`) — für Beispiel-Prompts, Zitate im Fließtext
- **Code** (`` `text` ``) — für Tool-Namen, Befehle, Dateinamen

### 2.3 Fließtext vs. Boxen
- **Fließtext ist die Basis.** Inhalte gehören primär in normalen Lauftext mit Markdown-Formatierung.
- **Boxen (Callout, Key-Concept, Context-Box) nur für:** echte Zitate, Warnungen, überraschende Fakten, Fachbegriff-Erklärungen.
- **Drei Boxen hintereinander = zu viele.** Wenn ein Modul hauptsächlich aus farbigen Boxen besteht, stimmt die Balance nicht.

### 2.4 Strukturierung von Inhalten
- **Mehrere Themen in einem Block → aufteilen.** Drei Workflows? Drei Content-Elemente mit je eigenem `###`-Heading. Nicht alles in einen Block packen.
- **Parallele Informationen → Listen statt Prosa.** "Zwei Berechtigungen: Mikrofon und Accessibility" wird zu einer 2-Punkt-Liste.
- **Tastenkürzel und technische Infos → Listen oder Code-Formatting.** Nicht in Fließtext verstecken.

---

## §3 Didaktische Prinzipien

### 3.1 Snack-sized & Fun
- **Du-Ansprache** durchgehend, kein Siezen
- **Nie mehr als 2 Content-Blöcke hintereinander** ohne interaktives Element (Quiz, Flashcard, Reflexion)
- **Quiz-Feedback max 2 Sätze**, Explanation nach dem Reveal darf 2-3 Sätze lang sein. Ton: warmherzig, nie herablassend. "Nicht ganz — aber gut zu wissen:" statt "Falsch."
- **Emojis nur in Takeaway-Checklisten und Easter Eggs.** Verboten: Modul-Titel, Modul-Icons (`icon`-Feld), Key-Concept-Icons, Fließtext-Dekoration. Im Zweifel weglassen.
- **Humor: subtil & clever.** Der Ton ist der eines klugen Gesprächspartners, nicht eines Comedians.

### 3.2 Quelltreue
- Inhalte stammen **überwiegend** aus den gewählten Quellen. Mehrere Quellen sind normal und gewünscht (siehe §3.7). Externe Framework-Ergänzungen nur unter den Kriterien in §3.4.
- Konkrete Zahlen, Tool-Namen, Statistiken, Beispiele **müssen** erhalten bleiben
- Kurzes Material = kurzer Kurs. Ein Tweet wird kein 6-Modul-Kurs
- Anekdoten und Metaphern aus dem Original beibehalten — sie sind der emotionale Anker
- **Ton des Originals spiegeln:** Ein lockerer Vortrag wird ein lockerer Kurs, ein fachlicher Artikel bleibt fachlich

### 3.3 Didaktisches Scaffolding
- Begriffe und Konzepte erklären, die das Original voraussetzt aber nicht erklärt
- Diese Erklärungen sind **kein erfundener Inhalt** — sie sind der Job des Instructional Designers
- Visuell klar als Hintergrundwissen markieren: `context-box`-Elemente, nie als regulären Content tarnen

### 3.4 Externe Framework-Ergänzungen

Zusätzliche Konzepte aus fremden Quellen (z.B. "Aber-Deshalb-Regel" von Trey Parker) sind erlaubt, aber nur unter **allen fünf** folgenden Kriterien:

1. **Implizit-explizit oder etabliertes Framework:** Das externe Konzept muss entweder eine implizite Annahme des Originals explizit machen, oder ein voll entwickeltes, öffentlich bekanntes Framework sein. **Keine eigenen Mini-Theorien, keine erfundenen "Regeln".**
2. **Visuelle Trennung:** Ergänzungen müssen als `context-box` dargestellt werden — nie als regulärer Content. Die Lesende muss sofort erkennen: *Das ist nicht aus dem Original.*
3. **Transparente Attribution:** Autor **und** Herkunft (Medium, Institution) werden explizit genannt. Kein "bekanntes Prinzip" ohne Quelle.
4. **Maßhalten.** Mehrere sind möglich, wenn jede einzelne alle Kriterien erfüllt. Wenn der Kurs zur bloßen Zusammenstellung fremder Konzepte wird, fehlt Julians Kuration — siehe §3.6 Autor-Stimme.
5. **Im Zweifel weglassen.** Wenn das Original auch ohne das Framework auskommt, braucht es das Framework nicht. Der Test: *Macht die Ergänzung das Kursthema konkret besser verständlich — oder wirkt sie nur schlau?*

Nicht-Einhaltung = Anti-Pattern §12.8.

### 3.5 Easter Eggs
- **Mindestens 1 pro Kurs**, idealerweise 2-3
- Thematisch zum Kursinhalt passend
- Elaboriert: interaktive Mini-Elemente, versteckte Fakten, unerwartete Gags — nicht nur Tooltips
- Jedes Mal neu und individuell — keine Templates, keine Wiederholungen
- Dürfen auch einfach nur charmant sein, ohne Lerneffekt

### 3.6 Autor-Stimme ist Pflicht

Die Plattform ist Julian van Diekens kuratierte Empfehlung, kein neutrales Handbuch. Deshalb:

- **Pro Kurs mindestens 1–2 Sätze mit Julians Autor-Stimme** — persönliche Erfahrung, Meinung, Szene-Wissen, Humor, kleine Anekdote. Bevorzugt im `intro.tldr` oder an einem `transitionToNext`.
- **Erkennungsmerkmal:** Der Lerner muss mindestens eine Stelle eindeutig als Julian-Position lesen können — „ich benutze…", „mein Tipp…", „aus meiner Sicht…", persönliche Beobachtung.
- **Belegmittel für subjektive Claims:** Subjektive Behauptungen in Meta oder Body (Superlativ, Empfehlung, Bewertung — z.B. „die beste Lösung") sind **nur zulässig, wenn sie durch sichtbare Autor-Stimme oder durch Vergleichsinhalt im Kurs getragen werden.** Ein Superlativ ohne Deckung wird zu einem leeren Versprechen.
- **Warum die Regel existiert:** Ohne Autor-Position wird der Kurs austauschbar mit der Original-Quelle (Produktseite, GitHub-README, Paper). Der Lerner fragt zu Recht: „Warum nicht direkt auf die Website?" Die Antwort liegt in Julians Standpunkt, seinem Szene-Wissen, seinem Urteil.

Prüfpunkt in §9 Didaktik-Checkliste. Herkunft: LEARNINGS „Workflow-Audit: Autor-Stimme ist Pflicht", audit handy-speech-to-text 2026-04-19.

### 3.7 Quellen-Strategie & Attribution

Ein Kurs ist eine kuratierte Aufbereitung — keine Nacherzählung einer Einzelquelle.

- **Multi-Source ist Default.** Ein Kurs speist sich typischerweise aus mehreren Quellen (z.B. ein Hauptvideo + ergänzender Artikel + eigene Beispiele) plus Julians Kuration. Eine Einzelquelle ist möglich, aber kein Gütesiegel.
- **Attribution gehört in die Daten, nicht ins Schaufenster.** Jede genutzte Quelle wird im `course.json` erfasst. In der UI erscheinen Quellen am Kursende als dezenter „Quellen & Weiterführendes"-Block. Startseite, Kurs-Karten und Kurs-Intros bewerben nicht eine Quelle als Aufhänger.
- **Transformation steht im Vordergrund.** Der Kurs ist Julians Werk — nicht die deutsche Übersetzung des Originals.
- **Arbeitsmaterial bleibt lokal.** Volltranskripte, Rohnotizen, Originaltexte (`source.md`) gehören nicht ins öffentliche Repo. Sie liegen lokal, werden per `.gitignore` ausgeschlossen.
- **Rechtliche Verankerung:** Siehe `LEGAL.md` für die rechtliche Begründung.

Herkunft: Workflow-Entscheidung April 2026 — Weg vom Single-Source-Konzept hin zu kuratierter Mehrquellen-Aufbereitung.

---

## §4 Kursstruktur

### 4.1 Intro (Pflicht)

Beantwortet zwei Kernfragen — jedes Feld hat eine klar abgegrenzte Rolle:

| Frage | Umsetzung | Feld |
|---|---|---|
| Wer spricht hier? | Credentials der Quelle/Person + Quellenformat (kein Kursinhalt) | `sourceContext` |
| Warum sollte mich das interessieren? | TLDR: Hook → Lösung → "Dieser Kurs…" | `tldr` |

**TLDR-Struktur:** 4–6 Sätze. Die ersten 1–2 Sätze benennen das konkrete Problem des Lerners (das ist der Hook). Dann die Lösung. Letzter Satz beginnt immer mit "Dieser Kurs…" und beschreibt, was der Kurs liefert. Anti-AI-Stil gilt hier besonders strikt (keine Em-Dashes, keine KI-Marker, kein Pathos).

**Rollen-Trennung:** Subtitle (auf Kurskartenansicht sichtbar), TLDR und sourceContext dürfen dieselbe Information nicht wiederholen. Subtitle = Nutzenversprechen in einem Satz. TLDR = vollständige Story. sourceContext = Credentials + Quellenformat, kein Kursinhalt.

Plus: Link zum Originalmaterial. Die Modul-Übersicht wird automatisch durch die Kapitel-Navigation angezeigt.

### 4.2 Module

**Anzahl:** Richtet sich nach dem Umfang des Materials, nicht nach einer Zielzahl. Typisch: 3-6 Module.

**Länge:** Module sollten in Lernzeit ungefähr vergleichbar sein (~2-5 Minuten). Lieber ein großes Modul splitten als extreme Unterschiede.

**Verfügbare Elemente:**

| Element | Wann einsetzen | Pflicht? |
|---|---|---|
| `content` | Fließtext in kurzen Absätzen | Ja |
| `key-concept` | Zentrale Idee kompakt als Card | Ja (min. 1 pro Kurs) |
| `context-box` | Hintergrundwissen, das das Original voraussetzt | Wenn nötig |
| `callout` | Zitate, Statistiken, Praxisbeispiele, Warnungen, Fun Facts | Wenn vorhanden |
| `quiz` | Wissens-Check mit Feedback | Ja (min. 2 pro Kurs) |
| `flashcard` | Zusammenhänge und "Warum"-Fragen trainieren | Ja (min. 3 pro Kurs) |
| `reflection` | Praxisbezug: "Wie würdest du das anwenden?" | Ja (min. 1 pro Kurs) |
| `easter-egg` | Verstecktes Element mit Charme | Ja (min. 1 pro Kurs) |
| `image` | Bild mit Lightbox-Zoom — Pflicht bei Software-/Prozess-Themen (siehe §6.8) | Wenn Tool/Prozess Thema |
| `video` | YouTube/Vimeo lazy-loaded | Wenn vorhanden |
| `code-block` | Code/Config mit Copy-Button — für Dateistrukturen und Configs | Wenn vorhanden |
| `step-by-step` | Akkordeon-Schritte mit Markdown — für mehrstufige Tutorials | Wenn vorhanden |

**Regeln:**
- **Element-Reihenfolge variieren.** Nicht jedes Modul: Absatz → Callout → Quiz → weiter. Ein Modul kann mit einem Quiz starten, ein anderes mit einer Reflexionsfrage.
- **Modul-Navigation:** Jeder Kurs hat eine sticky Navigation mit allen Modul-Titeln. Die Navigation wird automatisch vom `CoursePlayer` generiert — dafür braucht jedes Modul eine aussagekräftige `title`. Modul-Titel sollen kurz und prägnant sein (max 4-5 Wörter). Keine Emojis in der Navigation — die werden nur im Modul-Header selbst angezeigt.
- **Modul-Übergänge:** Bevorzugt: Querverweis auf einen thematisch verwandten Kurs auf der Plattform ("Du willst tiefer einsteigen? Im Kurs X geht's genau darum."). Falls kein passender Kurs existiert: Summary + Ausblick ("Du weißt jetzt X. Als nächstes schauen wir uns an..."). Innerhalb eines Kurses kann auch ein Cliff-Hanger funktionieren ("Du weißt jetzt, wie die Daten reinkommen — aber wo landen sie eigentlich?").
- **Kein Element erzwingen.** Ein kurzes Modul mit 2 Absätzen und 1 Quiz ist besser als ein aufgeblähtes Modul mit erzwungenen Flashcards.

### 4.3 Quiz-Design

- **Distraktoren müssen plausibel sein.** Falsche Antworten bilden typische Missverständnisse ab — keine offensichtlichen Wegwerf-Optionen.
- **Feedback ist lehrreich, nicht nur bestätigend.** Jede Option hat individuelles Feedback, das erklärt *warum* sie richtig oder falsch ist. Das Feedback selbst ist ein Lernmoment — nicht nur eine Bewertung.
- **Explanation nach dem Reveal.** Eine didaktische Erklärung, die das Konzept zusammenfasst und in den Gesamtkontext einordnet. Darf 2-3 Sätze lang sein.
- **Feedback-Ton:** Warmherzig, ermutigend, subtil clever. Auch bei falscher Antwort: "Nicht ganz — aber gut zu wissen:" statt "Leider falsch."

### 4.4 Flashcard-Design

- **Flashcards testen Zusammenhänge, nicht Definitionen.** Statt "Was ist RAG?" lieber "Warum funktioniert RAG allein nicht für ein persönliches Wiki?" oder "Was passiert, wenn du nur Ingestion ohne Linting machst?"
- **Front:** Eine Frage, die zum Nachdenken anregt — kein reines Abfragen
- **Back:** Erklärung des Zusammenhangs, nicht nur eine Definition
- **Reihenfolge:** Flashcards sollten im Kontext des Moduls erscheinen, in dem das Konzept eingeführt wird

### 4.5 Reflexionsfragen

- **Fokus: Praxisbezug.** "Wie würdest du das anwenden?" — konkret, nicht abstrakt.
- **Gute Reflexionsfragen:** "Welches Thema in deinem Alltag wäre der ideale erste Eintrag für dein Wiki?" / "Welchen Workflow würdest du als Erstes automatisieren?"
- **Schlechte Reflexionsfragen:** "Was denkst du darüber?" (zu vage) / "Findest du das gut?" (ja/nein)
- **Placeholder-Text:** Optional, aber hilfreich als Denkanstoß ("z.B. Meine Notizen zu...")

### 4.6 Callout-Varianten

Alle Callout-Typen sollen ein **konsistentes Grunddesign** haben (gleiche Grundstruktur, gleiche Abstände), aber sich **visuell voneinander unterscheiden** (Farbe, Icon, Borderstil):

| Variante | Zweck | Wann einsetzen |
|---|---|---|
| `quote` | Direkte Zitate aus der Quelle | Starke O-Töne des Autors hervorheben |
| `stat` | Zahlen und Statistiken | Konkrete Daten aus dem Material |
| `example` | Praxisbeispiele | "In der Praxis sieht das so aus..." |
| `warning` | Häufige Fehler, Achtung-Momente | Missverständnisse oder Fallen |
| `tip` | Praktische Tipps | Direkt anwendbare Handlungsempfehlungen |
| `fun-fact` | Überraschende Fakten, Trivia | Auflockern, Neugier wecken |

### 4.7 Outro (Pflicht)

| Funktion | Umsetzung | Feld |
|---|---|---|
| Synthese | 3-5 Kernerkenntnisse in eigenen Worten | `synthesis` |
| Nächster Schritt | Spezifisch und sofort umsetzbar, nicht vage | `nextStep` |
| Takeaway | Checkliste oder Übersicht zum Screenshotten | `takeaway` |
| Quellenlink | Nochmaliger Link zum Original | `sourceUrl` |
| Newsletter-CTA | Kontextuell zum Kursthema | `newsletterCTA` |

---

## §5 Content-Strategie

### 5.1 Themenbereiche

Die Plattform deckt vier Säulen ab:

| Säule | Beispielthemen |
|---|---|
| **KI-Technologie & Tools** | LLMs, Prompting, AI Agents, RAG, Fine-Tuning |
| **KI + Kreativität** | KI + Kunst, Fotografie, Video, Musik, Storytelling |
| **KI + Gesellschaft** | Ethik, Arbeitswelt, Bildung, Regulierung |
| **KI-Workflows & Productivity** | Automatisierung, Tool-Chains, Arbeitsabläufe |

### 5.2 Schwierigkeitsgrad

Der Schwierigkeitsgrad ergibt sich aus der **Quelle**, nicht aus einer Ziel-Verteilung. Karpathys Gist ist Intermediate, ein Erklär-Tweet ist Beginner, ein Research Paper ist Advanced.

### 5.3 Quellentypen

Quellen können sein:
- **Externe Inhalte:** Tweets, Artikel, Videos, Gists, Papers von Dritten
- **Eigene Inhalte (Julian):** Vorwiegend YouTube-Videos, in denen Julian einzelne Themen oder Abläufe vorstellt. Diese werden als Kurs in Textform aufbereitet, ergänzt durch Zusatzmaterialien (z.B. PDFs, Checklisten).

Bei Julian-Kursen: `sourceAuthor: "Julian van Dieken"`, `sourceType: "video"`, Link zum YouTube-Video als `sourceUrl`.

### 5.4 Kurs-Vernetzung

Kurse stehen nicht isoliert. Wo immer möglich:
- **Outro:** Verweis auf thematisch verwandte Kurse auf der Plattform
- **Modul-Übergänge:** Bei letztem Modul bevorzugt Querverweis statt interner Cliff-Hanger
- **Sequel-Kurse:** Direkte Anknüpfung an Vorgänger über TLDR und Recap. "Teil 2" im Subheading macht die Zugehörigkeit sofort klar. `relatedCourses` gegenseitig setzen.
- **Ziel:** Ein natürliches Netz aus Lernpfaden, das organisch wächst

---

## §6 Design-Standards

### 6.1 Kurs-Themes

Jeder Kurs hat ein eigenes visuelles Theme (`CourseDesign`). Das Theme muss:
- **Charakter haben** — Indie-Game, Retro-Magazin, Hacker-Terminal, Kinderbuch für Erwachsene. Kein generisches Template.
- **Zum Thema passen** — ein Kurs über Hacking darf dunkel und monospace sein, ein Kurs über Kreativität darf bunt und verspielt sein.
- **Lesbar sein** — Textkontrast muss WCAG AA erfüllen (mindestens 4.5:1 für normalen Text).

### 6.2 Light vs. Dark

**Dark als Standard**, Light als Option. Kurse starten dunkel. `lightColors` im CourseDesign definiert die helle Alternative. Toggle im Kurs-Header, Präferenz in localStorage.

Farbsprache nach Kategorie:
- **Warme Farben (Amber/Orange):** Productivity- und Workflow-Kurse
- **Kühle Farben (Lila/Teal):** Technische Kurse
- **Grün/Gelb:** Tool-fokussierte Kurse

### 6.3 Farbwahl-Regeln

- `primary` und `accent` dürfen mutig und kräftig sein
- `text` auf `background` muss gut lesbar sein (Kontrast prüfen)
- `surface` muss sich vom `background` abheben, aber subtil
- Pop-Farben (Pink, Türkis) als Akzente erlaubt und erwünscht

### 6.4 SVG-Grafiken: Neo-brutaler Editorial-Stil

Alle Kurs-Grafiken (Cover + In-Course-Visualisierungen) folgen einem einheitlichen visuellen Stil:

**Grundaufbau:**
- **Hintergrund:** `#FAFAFA` (heller Seitenhintergrund)
- **Subtiles Grid-Pattern:** Dünne Linien (`stroke-width: 0.5`, `opacity: 0.05-0.06`), 40px Raster
- **Dicke schwarze Outlines:** `stroke="#000"`, `stroke-width: 3-4` auf allen Hauptformen
- **Scharfe geometrische Formen:** Kein `border-radius`, keine Rundungen

**Sticker-Labels:**
- Leicht rotiert (`transform="rotate(-2 ...)"` bis `rotate(2 ...)"`)
- `font-weight: 900`, `letter-spacing: 2-4`
- Gefüllt mit Kurs-Primary-Farbe oder Akzentfarbe
- Weißer Text auf farbigem Hintergrund

**Dekorative Elemente (Pflicht, 2-3 pro SVG):**
- Rotierte Pink-Quadrate (`#E91E8C`, `stroke="#000"`, `stroke-width: 3`)
- Kleine schwarze Sterne (5-Punkt-Polygone)
- Kleine rotierte farbige Quadrate (Kurs-Primary oder Accent)

**Kursfarben als Fills:** Hauptformen nutzen die `primary`- und `accent`-Farbe des Kurses, nie generische Farben.

**Pfeile:** Tip-Punkt hat den höheren x-Wert für rechts-zeigende Pfeile: `points="245,150 218,135 218,165"` (Tip x=245 > Base x=218).

**Dateikonvention:**
- Cover: `public/courses/[slug]/cover.svg`
- In-Course-Grafiken: `public/courses/[slug]/svg_[beschreibung].svg`
- `[beschreibung]` ist kebab-case, beschreibt den Inhalt (z.B. `svg_problem-visualisierung.svg`, `svg_aber-deshalb-regel.svg`)

### 6.5 SVG-Triage: Brauche ich hier eine SVG?

**Entscheidungs-Tabelle:**

| Situation | SVG? | Typ | Platzierung |
|---|---|---|---|
| Übersicht: Stufenmodell, Hierarchie, Aufzählung mit Reihenfolge | **Ja** | Übersicht (aufsteigende Balken, nummerierte Blöcke) | Direkt nach der Einleitung des Moduls |
| Vergleich: Vorher/Nachher, Pro/Contra, zwei Zustände | **Ja** | Vergleich (zwei Spalten, Gegenüberstellung) | Direkt nach textueller Einführung des Vergleichs |
| Architektur: Zentrale Knoten, Systembeziehungen, Datenfluss | **Ja** | Architektur (Boxen + Pfeile) | Nach Konzepteinführung, vor Details |
| Reine Text-Wiederholung (Bullet-Liste visualisieren) | **Nein** | — | Stattdessen: bessere Formatierung im Fließtext |
| Dekoration ohne Informationswert | **Nein** | — | Weglassen |
| Konzept ist im Fließtext klarer | **Nein** | — | Weglassen |

**Faustregel:** Wenn du die SVG textlich vollständig beschreiben könntest und nichts verloren ginge, brauchst du sie nicht.

### 6.6 Quelldateien (source.md)

Jeder Kurs hat eine `source.md` im Ordner `content/courses/[slug]/`. Template:

```markdown
# Quelle: [Titel]

- **Typ:** [YouTube Video / Artikel / GitHub Gist / Website / ...]
- **URL:** [Link zum Original]
- **Autor:** [Name]

## [Transkript / Originaltext / Inhalt]

[Volltext oder Verweis auf separate Datei im selben Ordner]
```

Bei umfangreichen Transkripten kann der Inhalt auch als separate `.txt`-Datei im selben Ordner liegen, referenziert aus der `source.md`.

### 6.7 Transkript-Verifizierung

Vor dem Finalisieren eines Kurses: **Kursinhalte gegen das Original-Transkript prüfen.** Insbesondere:
- Bildunterschriften stimmen mit dem, was das Bild tatsächlich zeigt
- Zitate und Zahlen sind korrekt übernommen
- Keine Verwechslung von Szenen oder Beispielen
- Reihenfolge der Themen entspricht dem Original (sofern nicht bewusst umstrukturiert)

### 6.8 Reale Screenshots & Fotos

> Wo immer Programme, Tools, Prozesse oder konkrete Abläufe Kursthema sind, gehören echte Screenshots oder Fotos hinein — keine Textbeschreibung als Ersatz, keine Stock-Grafik, keine reine SVG-Abstraktion.

**Warum:** Ein UI-Screenshot zeigt in zwei Sekunden, was ein Absatz Fließtext umständlich beschreibt. Lernende sehen sofort, was sie auf dem eigenen Bildschirm wiederfinden — das senkt die Hürde zum Nachmachen massiv.

**Wann verpflichtend:**
- **Tool-/Software-Vorstellung** → Screenshot der Oberfläche, der relevanten Buttons, der Settings
- **Prozess-/Workflow-Erklärung** → Foto oder Screenshot jedes wichtigen Schritts
- **Terminal-/Code-Ausgabe** → echter Output statt nachgebauter Text-Block (für Code-Beispiele bleibt `code-block` korrekt — gemeint ist der Programm-Output)
- **Konkretes Beispiel-Ergebnis** → echter Screenshot (Chat-Verlauf, generiertes Bild, exportierte Datei)

**Wann nicht nötig:**
- Rein konzeptionelle Module ohne Software-/Prozess-Bezug
- Wenn kein passender Screenshot existiert und die Quelle keinen liefert (dann lieber weglassen als nachstellen — keine Fake-Screenshots)

**Längen-Toleranz:** Screenshots und Fotos dürfen den Kurs länger machen. Lieber ein Modul mehr und drei zusätzliche Bilder als ein dichter Textblock, der die Konkretheit verschluckt. Konkretheit geht vor Kürze.

**Quelle der Bilder:** Bevorzugt aus dem Originalmaterial (Video-Frames, Artikel-Screenshots). Falls die Quelle keine liefert, eigene Screenshots am Live-Tool aufnehmen — und in der Caption transparent kennzeichnen.

**Speicher-Ort:** Alle Bild-Assets unter `/public/courses/[slug]/`. Dateinamen kebab-case und beschreibend (`screenshot_settings-mikrofon.png`, `foto_workflow-step-2.jpg`).

---

## §7 Tonfall

### 7.1 Grundton
- **Denglisch:** Tech-Begriffe englisch, Rest deutsch (es sei denn, der Kurs ist komplett englisch)
- **Direkt und klar, aber mit Charme.** Kein Marketing-Sprech, kein "innovativ" oder "revolutionär"
- **Menschlich:** Julian ist eine Personenmarke. Die Kurse klingen wie ein kluger Freund, der dir etwas erklärt — nicht wie ein Lehrbuch.

### 7.2 Tonfall-Kalibrierung nach Thema
- Der Grad von "Fun" passt sich dem Thema an
- Ein Kurs über KI-Ethik braucht weniger "Genau! Das sitzt." als ein Kurs über Prompt-Tricks
- Ein Kurs über eine akademische Quelle ist sachlicher als einer über einen Tweet
- **Faustregel:** Der Kurs-Ton spiegelt den Ton des Originals, aber immer zugänglich und nie trocken

---

## §8 Metadaten-Standards

### 8.1 Schwierigkeitsgrad

| Stufe | Kriterien |
|---|---|
| `beginner` | Keine Vorkenntnisse nötig. Grundbegriffe werden erklärt. |
| `intermediate` | Grundverständnis von KI/Tech vorausgesetzt. Fachbegriffe werden genutzt, aber erklärt. |
| `advanced` | Erfahrung mit dem Thema vorausgesetzt. Wenig Scaffolding, mehr Tiefe. |

### 8.2 Tags
Tags sind das primäre Filtersystem für User. Sie müssen spezifisch und nützlich sein.

**Regeln:**
- **Ein Wort pro Tag.** Keine Phrasen wie "KI-Technologie & Tools". Stattdessen: "Claude", "RAG", "Obsidian".
- **Spezifisch, nicht generisch.** "Productivity" ist zu vage — ein User weiß nicht, was ihn erwartet. "Skills" oder "Agents" sagt sofort, worum es geht.
- **Max 3 Tags pro Kurs.** Weniger ist mehr. Jeder Tag muss sein Gewicht tragen.
- **Bestehende Tags bevorzugen,** neue nur wenn kein existierender passt.
- **Perspektive des Users:** Stell dir vor, du kommst auf die Seite und willst einen Kurs finden. Welches Wort würdest du suchen?

**Drei Filter-Bereiche im UI:**
1. **Thema** — die Tags (ein Wort, spezifisch)
2. **Schwierigkeit** — Einsteiger / Fortgeschritten / Experte
3. **Länge** — Kurz (<10 Min) / Mittel (10-20 Min) / Lang (>20 Min)

Kategorien (`category` in CourseMeta) werden im UI **nicht** angezeigt — sie sind reine Backend-Metadaten.

### 8.3 Zeitschätzung
- Pro Modul: geschätzt in Minuten (inkl. Quizzes und Flashcards)
- Gesamtdauer: Summe der Module
- Faustregel: 1 Minute pro 150 Wörter Fließtext + 30 Sekunden pro Quiz/Flashcard

### 8.4 Kursname (Drei-Ebenen-Titel)
- **`title`** — kurz, griffig, allein verständlich. "Die Karpathy Methode", nicht "Karpathys LLM-Workflow"
- **`subheading`** — erklärender Untertitel. "Persönliche Knowledge Base mit KI"
- **`subtitle`** — Infotext, 1-2 Sätze was der Lernende lernt
- Bei Tool-Kursen muss das Subheading klarmachen, was das Tool ist

---

## §9 Qualitäts-Checkliste

Jeder Kurs muss diese Punkte erfüllen, bevor er gepusht wird:

### Inhalt
- [ ] Kurs hat Drei-Ebenen-Titel (title + subheading + subtitle)
- [ ] Intro beantwortet Wer/Warum/Was und enthält Quellenlink
- [ ] Bei kuratierten Quellen: `gap-analysis.md` in `content/courses/[slug]/` angelegt (siehe §11.3)
- [ ] ALLE Inhalte aus dem Ausgangsmaterial sind abgebildet (nichts weggelassen)
- [ ] Konkrete Zahlen, Tool-Namen und spezifische Beispiele sind erhalten
- [ ] Keine Inhalte erfunden (keine Halluzinationen)
- [ ] Fachbegriffe sind in Context-Boxen erklärt

### Mobile-First & Textqualität
- [ ] Kein Absatz länger als 3 Sätze
- [ ] Kein Content-Element füllt mehr als 1.5 Mobile-Bildschirme
- [ ] Jeder Content-Block hat min. 2 verschiedene optische Gewichtungen (Heading + Bold, oder Bold + Liste, etc.)
- [ ] Parallele Infos (Schritte, Optionen) als Listen formatiert, nicht als Fließtext
- [ ] Mehrere Themen pro Block? → Aufgeteilt in separate Content-Elemente mit `###`-Headings
- [ ] Fließtext hat `###`-Zwischenüberschriften, Bold, Listen — keine graue Wand
- [ ] Boxen (Callout, Key-Concept) nur für echte Zitate, Warnungen, überraschende Fakten
- [ ] Keine drei Boxen hintereinander
- [ ] Keine Emojis außer in Takeaway-Checklisten und Easter Eggs

### Anti-AI-Schreibstil (`.claude/skills/anti-ai-writing/SKILL.md`)
Pflicht für alle Prosa-Teile: Intro, Modul-Texte, Callouts, Übergänge, Outro, Quiz-Feedback. Regelwerk komplett lesen, bevor Modul-Text geschrieben wird. Schnell-Check der häufigsten Stolpersteine:
- [ ] Keine Em-Dashes (—) als Stilmittel — stattdessen Komma, Punkt oder Doppelpunkt
- [ ] Keine "Nicht X, sondern Y"-Konstruktionen
- [ ] Keine KI-Marker-Wörter: *entscheidend, wegweisend, facettenreich, vielschichtig, ganzheitlich, Mehrwert, maßgeblich, Darüber hinaus, Es ist erwähnenswert* (DE) bzw. *delve, crucial, pivotal, vibrant, tapestry, testament, foster, enhance, landscape, showcase, intricate, interplay, furthermore, moreover* (EN)
- [ ] Keine Bedeutungs-Aufblähung ("Meilenstein", "Wendepunkt", "setting the stage for…")
- [ ] Keine Kopula-Vermeidung ("ist"/"hat" statt "serves as"/"boasts")
- [ ] Keine Partizip-Anhängsel am Satzende ("…, highlighting…", "…, was zeigt, dass…")
- [ ] Keine rhetorischen Dreier-Aufzählungen (außer Pattern-Break)
- [ ] Aktiv statt Passiv — klare Subjekte
- [ ] Keine KI-Floskeln ("In der heutigen schnelllebigen Welt…", "Es ist wichtig zu verstehen…")

### Didaktik
- [ ] Mindestens 1 Key-Concept (zentraler Begriff als Card)
- [ ] Mindestens 2 Quizzes mit plausiblen Distraktoren und lehrreichem Feedback
- [ ] Quiz-Feedback erklärt das *Warum* — nicht nur richtig/falsch
- [ ] Mindestens 3 Flashcards, die Zusammenhänge testen (nicht nur Definitionen)
- [ ] Mindestens 1 Reflexionsfrage mit konkretem Praxisbezug
- [ ] Mindestens 1 Easter Egg
- [ ] Element-Reihenfolge variiert zwischen Modulen
- [ ] Modul-Titel kurz und prägnant (max 4-5 Wörter, keine Emojis)
- [ ] Modul-Übergänge vorhanden (bevorzugt Kurs-Querverweise)
- [ ] Outro mit Synthese, konkretem nächsten Schritt und Takeaway
- [ ] §3.6 — Autor-Stimme vorhanden: mind. 1–2 Sätze persönliche Note (Erfahrung/Meinung/Szene-Wissen) im Intro oder an einem Modul-Übergang. Subjektive Claims (Superlativ, Empfehlung) durch Autor-Stimme oder Vergleichsinhalt gedeckt.
- [ ] §4.1 — Rollen-Trennung: Subtitle, TLDR und sourceContext wiederholen nicht dieselbe Information. TLDR beginnt mit Problem (Hook), endet mit "Dieser Kurs…". sourceContext enthält nur Credentials + Quellenformat, keinen Kursinhalt.
- [ ] `relatedCourses` gegenseitig gesetzt
- [ ] **Pflicht-Minima per Grep verifiziert** (vor Commit ausführen, Werte müssen ≥ angegebener Zahl sein):
  - `rg -c '"type": "key-concept"' content/courses/[slug]/course.json` → ≥ 1
  - `rg -c '"type": "quiz"' content/courses/[slug]/course.json` → ≥ 2
  - `rg -c '"type": "flashcard"' content/courses/[slug]/course.json` → ≥ 3
  - `rg -c '"type": "reflection"' content/courses/[slug]/course.json` → ≥ 1
  - `rg -c '"type": "easter-egg"' content/courses/[slug]/course.json` → ≥ 1

### Design
- [ ] Kurs-Theme hat Charakter (kein generisches Template)
- [ ] Textkontrast ist lesbar (WCAG AA)
- [ ] Design passt zum Thema
- [ ] Schwierigkeitsgrad korrekt eingestuft
- [ ] Tags sind konsistent mit bestehenden Kursen
- [ ] Cover-SVG im neo-brutalen Editorial-Stil vorhanden (`public/courses/[slug]/cover.svg`)
- [ ] SVG-Visualisierungen wo sinnvoll (Übersichten, Vergleiche, Architekturen) — nicht erzwingen (siehe §6.5)
- [ ] SVG-Pfeile korrekt: Tip-x > Base-x für rechts-zeigend
- [ ] §6.8 — Bei Software-/Tool-/Prozess-Bezug: reale Screenshots oder Fotos eingebunden, nicht nur Textbeschreibungen. Mehr Länge ist okay.

### Quelldateien
- [ ] `source.md` mit Metadata-Header (Typ, URL, Autor) vorhanden
- [ ] Transkript/Originaltext in `source.md` oder als referenzierte `.txt`-Datei hinterlegt
- [ ] Kursinhalte gegen Original-Transkript verifiziert (Captions, Zitate, Zahlen)

### Anti-Pattern-Check (nur `hot`-Status aus §12)
- [ ] §12.1 — Kurs in Teilen geschrieben (Write + Edit), nicht in einem Rutsch
- [ ] §12.2 — Alle SVG-Pfeile: Tip-x > Base-x für rechts-zeigend
- [ ] §12.3 — Jede Bildunterschrift gegen Transkript/Originalbild geprüft
- [ ] §12.4 — Bei kuratierten Quellen: Gap-Analyse durchgeführt und abgelegt
- [ ] §12.5 — Tags sind spezifisch (ein Wort, keine generischen Phrasen)
- [ ] §12.6 — Keine drei Boxen hintereinander in einem Modul
- [ ] §12.7 — Keine Emojis außer in Takeaway-Checklisten und Easter Eggs
- [ ] §12.8 — Externe Frameworks (falls vorhanden) erfüllen alle 5 Kriterien aus §3.4

### Post-Flight
- [ ] Neuer Eintrag in `COURSE-LEARNINGS.md` angelegt (Template beachten)
- [ ] Bei Kursnummer 4/7/10/…: Verdichtungs-Ritual durchgeführt (inkl. Anti-Pattern-Status-Review)

---

## §10 Technische Regeln

- **Alle Text-rendernden Komponenten brauchen ReactMarkdown.** Callout, Flashcard, jede Komponente die User-Text anzeigt — sonst rohe `**Sternchen**`.
- **`opengraph-image.tsx` braucht Default Export**, kein GET-Handler. Kein Edge Runtime mit Kurs-Imports.
- **Kein `onClick` in Server Components** — Event-Handler erzwingen Client Components.
- **Kurse IMMER in Teilen erstellen (Pflicht).** Siehe Warnung ganz oben und §1.6.
- **sourceType-Badge nicht im UI zeigen** — nur interne Metadaten.
- **Quell-Anonymisierung:** Wenn ein Autor nicht genannt werden soll, alle Bezüge ersetzen, `sourceAuthor` neutral halten, Promotion entfernen. Quell-URL bleibt.
- **Mobile-Nav Z-Index:** Header `z-[70]`, MobileNav `z-[100]` — sonst Konflikte.

---

## §11 Gap-Analyse

> Pflicht bei kuratierten Quellen (Artikel, Gists, Transkripte). Ohne Gap-Analyse werden Inhalte übersehen — besonders bei bereits komprimierten Quellen.

### 11.1 Vorgehen
1. **Quelle in Abschnitte gliedern** — jede Überschrift, jeder thematische Block
2. **Pro Abschnitt Mapping erstellen:**
   - Welcher Modul-Platz im Kurs?
   - Welches Element (Content / Callout / Quiz / Flashcard / Key-Concept)?
   - Schon abgedeckt oder Lücke?
3. **Lücken-Liste dokumentieren** — bevor das Schreiben beginnt
4. **Arbeit abgeschlossen, wenn jeder Quellen-Abschnitt gemappt ist**

### 11.2 Wann NICHT nötig
- **Kurze Quellen** (Tweet, kurzer Artikel < 500 Wörter) — dort ist das Risiko des Übersehens gering
- **Lockere Quellen** (Vortrag/Video) — dort steuert die Struktur des Originals meist den Kurs

### 11.3 Speicher-Ort: `gap-analysis.md`

Die Gap-Analyse wird als `gap-analysis.md` im Kurs-Ordner abgelegt:

```
/content/courses/[slug]/
  course.json
  source.md
  gap-analysis.md      ← hier
```

Die Datei bleibt als Audit-Trail erhalten und ist auf der Plattform nicht sichtbar. Sie dokumentiert, dass jeder Quellen-Abschnitt geprüft wurde — und macht spätere Kurs-Überarbeitungen leichter.

### 11.4 Template für `gap-analysis.md`

```markdown
# Gap-Analyse: [Kurstitel]

- **Quelle:** [URL]
- **Abgleich-Datum:** YYYY-MM-DD
- **Kurs-Slug:** [slug]

## Mapping-Tabelle

| Quellen-Abschnitt | Kurs-Modul | Element-Typ | Status | Notiz |
|---|---|---|---|---|
| "Ingest-Phase" | Modul 2 | Key-Concept + Quiz | ✅ abgedeckt | — |
| "Linting-Edge-Cases" | — | — | ❌ Lücke | → Modul 3 Flashcard |
| "Metadaten-Struktur" | Modul 4 | Callout (Tip) | ✅ abgedeckt | — |

## Identifizierte Lücken (vor Einarbeitung)

- Lücke 1: ...
- Lücke 2: ...

## Einarbeitung

- Lücke 1 → Modul X, Element Y
- Lücke 2 → ...
```

---

## §12 Anti-Patterns

> Konkrete Fehler aus vergangenen Kursen. Jeder Eintrag hat einen **Lifecycle-Status** — nur `hot`-Patterns müssen aktiv geprüft werden (siehe Qualitäts-Checkliste §9).

### Lifecycle-Regeln

| Status | Bedeutung | Auswirkung |
|---|---|---|
| `hot` | Tritt in den letzten 3 Kursen auf oder präventiv aus aktueller Regel | Pflicht-Check in §9 Qualitäts-Checkliste |
| `dormant` | 3+ Kurse nicht aufgetreten | Bleibt sichtbar, nicht mehr in Checkliste |
| `archived` | 5+ Kurse nicht aufgetreten | Wandert in §12 Archiv — nur noch historische Referenz |

**Statuswechsel** passiert manuell im Verdichtungs-Ritual (alle 3 Kurse). Ein erneutes Auftreten setzt Status sofort zurück auf `hot`.

### 12.1 JSON in einem Schritt schreiben

**Seen in:** Kurs 2
**Last seen:** Kurs 2 (2026-04-12)
**Status:** hot

**Was passiert:** Kurs-JSON wird in einem einzigen `Write`-Aufruf erstellt.
**Warum schlecht:** Timeout-Fehler, gesamter Fortschritt geht verloren.
**Stattdessen:** Immer in 2-Modul-Blöcken via Write + Edit. Siehe Warnung oben und §1.6.

### 12.2 SVG-Pfeile falsch herum

**Seen in:** Kurs 4
**Last seen:** Kurs 4 (2026-04-14)
**Status:** hot

**Was passiert:** Polygon-Punkte werden in der Reihenfolge Tip → Base eingetragen.
**Warum schlecht:** Pfeil zeigt in die falsche Richtung.
**Stattdessen:** Für rechts-zeigende Pfeile muss der Tip-Punkt den höheren x-Wert haben. Beispiel: `points="245,150 218,135 218,165"` (Tip x=245 > Base x=218).

### 12.3 Bildunterschrift ohne Transkript-Check

**Seen in:** Kurs 4
**Last seen:** Kurs 4 (2026-04-14)
**Status:** hot

**Was passiert:** Caption wird aus dem Gedächtnis geschrieben, stimmt nicht mit dem tatsächlichen Bild-Inhalt überein.
**Warum schlecht:** Lernende werden verwirrt, Glaubwürdigkeit des Kurses leidet (Kurs 4: Plastikkiste statt Gruppenszene).
**Stattdessen:** Vor Finalisierung jede Bildunterschrift gegen Transkript/Originalbild prüfen. Siehe §6.7.

### 12.4 Fehlende Gap-Analyse bei kuratierten Quellen

**Seen in:** Kurs 5
**Last seen:** Kurs 5 (2026-04-16)
**Status:** hot

**Was passiert:** Kurs wird direkt nach erstem Lesen der Quelle geschrieben.
**Warum schlecht:** Inhalte werden übersehen, besonders bei komprimierten Quellen (Kurs 5: 12 Lücken).
**Stattdessen:** Vor dem Schreiben jeden Quellen-Abschnitt auf Kurs-Elemente mappen. Siehe §11.

### 12.5 Generische Tag-Phrasen

**Seen in:** Kurs 1 (Refactor)
**Last seen:** Kurs 1 Refactor (2026-04-17)
**Status:** hot

**Was passiert:** Tags wie "Productivity", "AI" oder "KI-Technologie & Tools".
**Warum schlecht:** User wissen nicht, was sie erwartet — das Filtern verliert seinen Zweck.
**Stattdessen:** Ein Wort pro Tag, spezifisch. "Skills", "RAG", "Obsidian", "Claude". Siehe §8.2.

### 12.6 Drei Boxen hintereinander

**Seen in:** Kurs 1 (Refactor)
**Last seen:** Kurs 1 Refactor (2026-04-17)
**Status:** hot

**Was passiert:** Modul besteht hauptsächlich aus Callouts, Key-Concepts, Context-Boxen.
**Warum schlecht:** Fließtext fehlt, der Rhythmus ist kaputt, Mobile wirkt wie ein Karussell.
**Stattdessen:** Fließtext ist die Basis. Boxen nur für echte Zitate, Warnungen, überraschende Fakten. Siehe §2.3.

### 12.7 Emoji-Inflation

**Seen in:** Kurs 1 (Refactor)
**Last seen:** Kurs 1 Refactor (2026-04-17)
**Status:** hot

**Was passiert:** Modul-Titel, Key-Concept-Icons, Fließtext-Dekoration mit Emojis.
**Warum schlecht:** Wirkt unprofessionell, lenkt ab, gegen den Stil der Plattform.
**Stattdessen:** Emojis nur in Takeaway-Checklisten und Easter Eggs. Im Zweifel weglassen. Siehe §3.1.

### 12.8 Erfundene Framework-Ergänzungen

**Seen in:** Kurs 4 (Storytelling), Kurs 1 (Refactor: "Output Compounding")
**Last seen:** Kurs 1 Refactor (2026-04-17)
**Status:** hot

**Was passiert:** Claude verkauft eigene Mini-Theorien oder konstruierte Prinzipien als "bekanntes Framework" — oder ergänzt Frameworks ohne klare Kriterien-Prüfung.
**Warum schlecht:** Der Kurs verliert Quelltreue. Lernende glauben, sie lernen etablierte Konzepte, dabei sind es Erfindungen der Kurs-Erstellung.
**Stattdessen:** §3.4 strikt prüfen — alle 5 Kriterien müssen erfüllt sein. Im Zweifel weglassen. Quelle muss ein echtes, öffentlich auffindbares Framework sein (mit Autor + Institution).

---

### §12 Archiv

*Leer.* Anti-Patterns, die 5+ Kurse lang nicht aufgetreten sind, wandern hierher als historische Referenz.

---

## §13 Referenz

- **Referenz-Kurse:** `/content/courses/karpathy-llm-wiki/course.json` (ai-tech), `/content/courses/agentic-os-context-levels/course.json` (ai-workflows), `/content/courses/storytelling-bildung/course.json` (ai-creativity)
- **Lern-Historie:** `COURSE-LEARNINGS.md` — wachsender Raw Log mit allen Kurs-Einträgen
- **TypeScript-Typen:** `/lib/types.ts`
- **Datenstruktur-Doku:** `CLAUDE.md`
- **CI-Farben:** Brand Lila `#5B2F9F`, Teal `#025671`, Dark Purple `#261C53`, Hot Pink `#E91E8C`, Electric Türkis `#00C9A7`

---

## §14 Audit-Protokoll

> **Rolle:** Das Audit ist die **nachträgliche Qualitätsprüfung** eines fertigen Kurses gegen die Regeln dieses Dokuments. Im Unterschied zu:
> - **Gap-Analyse (§11)** — *vor* der Kurs-Erstellung: prüft, ob die Quelle vollständig gemappt wurde.
> - **Qualitäts-Checkliste (§9)** — *während* der Kurs-Erstellung: Selbstprüfung durch den Autor.
> - **Verdichtungs-Ritual (§12 / COURSE-LEARNINGS)** — *zwischen* Kursen: Learnings werden zu Regeln.
>
> Das Audit kommt **Tage oder Wochen nach Kurs-Veröffentlichung** und ist der unabhängige Regel-Check. Es wird manuell per Slash-Command `/kurs-audit [slug]` ausgelöst.

> ⚠️ **Drift-Warnung für Creator-Pflege:** Die Prüfliste in §14.2 referenziert §-Nummern aus §1–§13. Bei **jeder** strukturellen Änderung an diesen Sektionen (Umnummerierung, Regel-Entfernung, neuer Prüfbarer Check) muss §14.2 synchron aktualisiert werden. Sonst prüft der Audit gegen veraltete Regeln. Faustregel: Wer §1–§13 anfasst, scrollt danach zu §14.2 und gleicht ab.

### 14.1 Wann auditen?

- **Regulär:** Nach signifikanten Creator-Updates (z.B. neue §-Regel) auf Bestandskurse anwenden.
- **Ad hoc:** Bei Zweifeln an einem Kurs ("Fühlt sich irgendwas nicht richtig an?").
- **Refactor-Trigger:** Vor geplantem Retrofit — das Audit liefert die Liste der Nachbesserungen.

Nicht-Ziel: Routine-Audit nach jedem Kurs. Dafür ist die Qualitäts-Checkliste (§9) da.

### 14.2 Prüfliste

Der Audit geht diese Kategorien durch. Jeder Check zitiert die Creator-Regel-Nummer (Rückverweis — SSoT bleibt eindeutig).

**Struktur**
- §4.1 Intro vorhanden mit Wer/Warum/Was + Quellenlink? TLDR beginnt mit Problem-Hook, endet mit "Dieser Kurs…"? Subtitle, TLDR, sourceContext haben klar getrennte Rollen ohne Wiederholungen?
- §4.2 Modul-Anzahl und -Länge im Rahmen?
- §4.7 Outro mit Synthese + konkretem nächsten Schritt + Takeaway?
- §5.4 `relatedCourses` gegenseitig gesetzt?

**Inhalt**
- §3.1 Tonfall snack-sized, keine graue Wand?
- §3.2 Inhalte primär aus der Quelle, keine Halluzinationen?
- §3.3 Scaffolding: Fachbegriffe in Context-Boxen erklärt?
- §3.4 Externe Frameworks (nur wenn verwendet) — alle 5 Kriterien erfüllt? (etabliertes Framework, visuell getrennt, Attribution, maßhalten, im Zweifel weggelassen)

**Elemente**
- §1.5/§4.2 Mindestens 1 Key-Concept im Kurs?
- §4.3 Mindestens 2 Quizzes mit plausiblen Distraktoren + erklärendem Feedback?
- §4.4 Mindestens 3 Flashcards mit "Warum"-Fragen?
- §4.5 Mindestens 1 Reflexionsfrage mit Praxisbezug?
- §3.5 Mindestens 1 Easter Egg?
- §4.2 Element-Reihenfolge variiert zwischen Modulen?
- §6.4 SVGs im neo-brutalen Editorial-Stil?
- §6.5 SVG-Triage: SVGs sinnvoll platziert, nicht erzwungen?
- §9 Pflicht-Minima per Grep verifizierbar (`rg -c '"type": "key-concept"' …` ≥ 1, etc.)?

**Meta**
- §8.1 Schwierigkeitsgrad korrekt?
- §8.2 Tags spezifisch, ein Wort, keine Phrasen?
- §8.3 Zeitschätzung realistisch?
- §8.4 Drei-Ebenen-Titel (title + subheading + subtitle)?

**Mobile & Design**
- §2.1 Kein Absatz länger als 3 Sätze?
- §2.2 Min. 2 optische Gewichtungen pro Block?
- §2.3 Keine drei Boxen hintereinander?
- §6.1 Kurs-Theme hat Charakter, nicht generisch?
- §6.3 WCAG-AA-Kontrast eingehalten?
- §6.8 Bei Software-/Tool-/Prozess-Themen: reale Screenshots oder Fotos vorhanden statt Textbeschreibung? (Längere Module sind okay, wenn sie konkreter werden.)

**Schreibstil (`.claude/skills/anti-ai-writing/SKILL.md`, referenziert in §9)**
- §9 Keine Em-Dashes (—) als Stilmittel?
- §9 Keine "Nicht X, sondern Y"-Konstruktionen?
- §9 Keine KI-Marker-Wörter? (DE: *entscheidend, wegweisend, facettenreich, vielschichtig, ganzheitlich, Mehrwert, maßgeblich, Darüber hinaus, Es ist erwähnenswert* / EN: *delve, crucial, pivotal, vibrant, tapestry, testament, foster, enhance, landscape, showcase, intricate, interplay, furthermore, moreover*)
- §9 Keine Bedeutungs-Aufblähung (*Meilenstein, Wendepunkt, setting the stage for, serves as a testament*)?
- §9 Kopula nicht vermieden (*ist/hat* statt *serves as/boasts*)?
- §9 Keine Partizip-Anhängsel am Satzende (*…, highlighting…*, *…, was zeigt, dass…*)?
- §9 Keine rhetorischen Dreier-Aufzählungen (außer Pattern-Break)?
- §9 Aktiv statt Passiv (klare Subjekte)?
- §9 Keine KI-Floskeln (*In der heutigen schnelllebigen Welt…*, *I hope this helps!*)?

**Technik (§10)**
- §10 ReactMarkdown für alle Text-rendernden Komponenten (kein rohes `**Sternchen**`)?
- §10 `opengraph-image.tsx` mit Default Export, kein Edge Runtime mit Kurs-Imports?
- §10 Keine `onClick`-Handler in Server Components?
- §10 `sourceType`-Badge nicht im UI sichtbar?
- §10 Quell-Anonymisierung sauber (falls Autor nicht genannt)?
- §10 Mobile-Nav Z-Index: Header `z-[70]`, MobileNav `z-[100]`?

**Artefakte**
- §11.3 Bei kuratierten Quellen: `gap-analysis.md` vorhanden im Kurs-Ordner?
- §6.6 `source.md` mit Metadata-Header + Transkript vorhanden?

**Anti-Patterns (nur `hot`-Status aus §12)**
- Alle aktuell auf `hot` stehenden Einträge einzeln prüfen — Stelle im Kurs nennen, falls verletzt.

**Lerner-Perspektive (qualitativ anderer Check, Pflicht)**

Claude wechselt bewusst den Mindset: nicht Regel-Check, sondern Rollenspiel als Anfänger, der zufällig auf die Landing-Page geklickt hat und das Thema vorher nicht kannte. Antworten sind keine ✅/❌-Haken, sondern kurze narrative Urteile mit Bezug auf konkrete Kurs-Stellen (Modul-ID, Element-ID).

Prüffragen:
1. **Prämisse eingelöst?** Was versprach das Intro, und wurde jede Teilbehauptung im Kurs erfüllt?
2. **Habe ich das gelernt, was versprochen wurde?** Deckt der Inhalt die Meta-Versprechen von `title`, `subheading`, `subtitle`?
3. **Hat mich der Kurs weitergebracht?** Gibt es einen erkennbaren Vorher-Nachher-Zustand?
4. **Sind die Infos vollständig oder hätte mir etwas gefehlt?** Welche naheliegenden Folgefragen bleiben offen?
5. **Kann ich das Wissen jetzt anwenden?** Gibt es konkrete Schritte, Beispiele, Transfer-Anker?
6. **Sind Anleitungen konkret genug zum Nachmachen?** Bei Tool-/Workflow-Kursen: reichen Screenshots + Erklärungen, um es selbst zu machen?
7. **Hat es Spaß gemacht, war es unterhaltsam?** Gibt es Stellen, die Energie reingeben (Easter-Eggs, überraschende Formulierungen, Callouts mit Witz)? Oder ist es eher Pflichtlektüre?
8. **Ist der Kurs vollständig für seine Prämisse?** Oder fühlt er sich abgebrochen/unfertig an?

**Wichtig — Disclaimer:** Claude kann Lerner-Erlebnis nur **simulieren**, nicht echt haben. Kein echtes Spaß-Empfinden, keine echte Frustration. Der Wert liegt im bewussten Perspektivwechsel, nicht in empirischer Wahrheit. Ein echter Test wäre nur durch Julian oder reale Tester möglich. Das Audit-Protokoll macht diesen Vorbehalt explizit („simulierte Lerner-Perspektive, kein Ersatz für echte Nutzertests").

Lerner-Findings können in die gleiche „Empfohlene Nachbesserungen"-Liste einfließen wie Regel-Findings, mit Präfix `[Lerner]` statt `[Kritisch]`/`[Warnung]` — weil es kein Regel-Schweregrad ist, sondern eine Erlebnis-Lücke.

### 14.3 Audit-Prozess (für Slash-Command `/kurs-audit [slug]`)

1. Slug einlesen, `content/courses/[slug]/course.json` + begleitende `source.md`/`gap-analysis.md` öffnen.
2. **Regel-Check:** Prüfliste aus §14.2 abarbeiten (außer Block „Lerner-Perspektive"). Pro Punkt Status vergeben:
   - ✅ erfüllt
   - ⚠️ Warnung (kosmetisch, nicht blockend)
   - ❌ kritisch (Regel-Verletzung, sollte nachgebessert werden)
   - `n/a` nicht anwendbar
3. **Lerner-Perspektive (Pflicht, Mindset-Wechsel).** Vor diesem Block: course.json mental zuklappen. Den Kurs im Lesefluss durchgehen (Modul für Modul, wie ein Anfänger es täte). Die 8 Fragen aus §14.2 Block „Lerner-Perspektive" **narrativ** beantworten — Ja/Teilweise/Nein + Begründung + konkrete Kurs-Stelle. Der Disclaimer („simulierte Perspektive") gehört in den Audit-Log-Block.
4. Findings aus Schritt 2 **und** 3 als neue Sektion an `/content/courses/[slug]/audit-log.md` anhängen (append-only, Template §14.5). Lerner-Findings werden unter `[Lerner]` statt `[Kritisch]`/`[Warnung]` einsortiert.
5. Im Chat Kurz-Summary ausgeben, siehe §14.4.
6. **Nachbesserung-Übergang (Pflicht).** Wenn Findings mit ❌, ⚠️ oder `[Lerner]` existieren: Julian per `AskUserQuestion` fragen, ob die Nachbesserungen **jetzt direkt** umgesetzt werden sollen oder als **separater Task** laufen. Befund (audit-log) und Fix (course.json) bleiben in getrennten Commits, aber der Übergang ist zwingend, ein Audit ohne expliziten Nachbesserung-Schritt wäre ein halber Workflow.
   - Bei „jetzt": Claude führt die Fixes am Kurs durch, commit-separat vom Audit-Log. Danach Re-Audit-Sektion in `audit-log.md` anhängen (Fix-Protokoll, Grep-Verifikation der Pflicht-Minima, bewusst belassene Ausnahmen).
   - Bei „separater Task": Claude stoppt; die Nachbesserungen bleiben als Punkt im `audit-log.md` offen. Schritt 7 (LEARNINGS-Check) wird im Fix-Task nachgezogen, nicht hier.
7. **Feedback-Loop zu LEARNINGS (nach Fix, nicht vorher).** Für jedes Finding mit Status ❌, ⚠️ oder `[Lerner]` prüfen, ob es **systemisch** wirkt (nicht nur Einzelfall dieses Kurses: ähnliche Verletzung wäre auch in anderen Kursen denkbar, Regel ist prüfbar, aber bisher nicht in §12 als Anti-Pattern geführt). **Wichtig:** Der Check passiert erst nach dem Fix, weil erst dann klar ist, ob der Fix trivial war oder ein tieferes Problem offenbart hat, und welche Regel-Form (z.B. Grep-Check, Checklisten-Punkt) wirklich greift. Claude fragt Julian per `AskUserQuestion` **pro systemischem Finding einzeln**, ob es als neuer Eintrag in `COURSE-LEARNINGS.md` festgehalten werden soll (mit `source: audit [slug] YYYY-MM-DD`). Anschließend greift der normale Sofort-Promotion-Check (siehe CLAUDE.md Post-Flight Schritt 3). Einzelfälle bleiben nur im `audit-log.md`.

### 14.4 Chat-Summary-Format

Nach einem Audit gibt Claude im Chat nur eine Kurzfassung:

> **Audit für `[slug]` abgeschlossen.**
> - Regel-Findings: **X total** (Y kritisch ❌, Z Warnungen ⚠️)
> - Lerner-Perspektive: **Kurz-Urteil** (z.B. „Prämisse eingelöst, aber Transfer-Schritte fehlen" / „rund und spielbar")
> - Status: bestanden / Nachbesserung nötig
> - Kritisch: [Stichwort 1], [Stichwort 2]
> - Lerner-Lücken: [Stichwort, falls vorhanden]
> - Systemisch (→ LEARNINGS-Rückfrage): [Stichwort, falls vorhanden]
> - Details: `/content/courses/[slug]/audit-log.md` (neue Sektion von heute)

Keine Detail-Tabellen im Chat — die liegen in der Datei. Das hält den Chat lesbar und den Audit-Trail dauerhaft verfügbar.

### 14.5 Template für `audit-log.md` (append-only)

Pro Kurs existiert **eine** Datei `/content/courses/[slug]/audit-log.md`. Bei jedem Audit wird eine neue Sektion **unten angehängt** — nie überschrieben. Die neueste Sektion steht ganz unten; ältere bleiben als Trail erhalten.

**Datei-Kopf (nur beim ersten Audit anlegen):**

```markdown
# Audit-Log: [Kurstitel]

> Append-only Audit-Trail für Kurs `[slug]`. Jeder Audit-Lauf wird als neue Sektion unten angehängt. Alte Sektionen bleiben unverändert — der Verlauf ist Teil des Lern-Systems.
```

**Pro Audit-Lauf angehängte Sektion:**

```markdown
---

## Audit YYYY-MM-DD

- **Creator-Version:** git SHA von COURSE-CREATOR.md zum Audit-Zeitpunkt
- **Auditor:** Claude
- **Anlass:** [regulär nach Creator-Update | ad hoc | Refactor-Trigger | Re-Audit nach Nachbesserung]

### Zusammenfassung

- **Findings:** X total (Y kritisch ❌, Z Warnungen ⚠️)
- **Status:** bestanden / Nachbesserung nötig
- **Vergleich zu letztem Audit:** [entfällt beim Erst-Audit | "2 kritische gefixt, 1 neue Warnung"]

### Regel-Check

| Kategorie | Regel (Creator §) | Status | Stelle im Kurs | Notiz |
|---|---|---|---|---|
| Struktur | §4.1 Intro | ✅ | — | — |
| Inhalt | §3.2 Quelltreue | ✅ | — | — |
| Inhalt | §3.4 Externes Framework | n/a | — | kein Framework verwendet |
| Meta | §8.2 Tags | ⚠️ | meta.tags | "Productivity" zu generisch |
| Artefakte | §11.3 Gap-Analyse | ❌ | — | gap-analysis.md fehlt |
| Anti-Patterns | §12.7 Emoji-Inflation | ⚠️ | Modul 3 Content-Block | 2 Emojis im Fließtext |

### Lerner-Perspektive

> Simulierter Durchlauf als Anfänger, der das Thema vorher nicht kannte. Kein Ersatz für echte Nutzertests.

1. **Prämisse eingelöst?** Ja/Teilweise/Nein — [Begründung, konkrete Stelle]
2. **Was versprochen wurde auch gelernt?** …
3. **Weitergebracht?** …
4. **Vollständig, oder fehlt etwas?** …
5. **Anwendbar?** …
6. **Anleitungen konkret genug zum Nachmachen?** …
7. **Spaß / Unterhaltsam?** …
8. **Vollständig für die Prämisse?** …

**Gesamt-Urteil:** [1–2 Sätze, was das Lernerlebnis gebracht hat und woran es hakt]

### Empfohlene Nachbesserungen

1. **[Kritisch]** gap-analysis.md rückwirkend anlegen (§11.3).
2. **[Warnung]** `meta.tags` "Productivity" ersetzen durch spezifischere Tags (§8.2).
3. **[Warnung]** Modul 3 Content-Block: Emojis aus Fließtext entfernen (§12.7).
4. **[Lerner]** Modul 4: Transfer-Beispiel fehlt — der Kurs erklärt „was", aber nicht „wie im eigenen Alltag anwenden".

### Systemische Findings (an LEARNINGS gemeldet?)

- **§11.3 Gap-Analyse fehlt** → Julian: ja, LEARNINGS-Eintrag angelegt (`audit karpathy-llm-wiki 2026-04-17`).
- **§12.7 Emoji-Inflation** → Julian: nein, Einzelfall (bereits als Anti-Pattern in §12 geführt).

### Nicht gefixt / bewusst offen gelassen

- …
```

### 14.6 Re-Audit

Bei einem Re-Audit (nach Nachbesserung oder nach Creator-Update) wird **keine** Datei überschrieben. Stattdessen kommt eine neue `## Audit YYYY-MM-DD`-Sektion **unten** in `audit-log.md` dazu. Der Anlass-Vermerk („Re-Audit nach Nachbesserung") und die Zeile „Vergleich zu letztem Audit" machen den Fortschritt explizit. Git zeigt den Diff — aber die lesbare Zeitlinie steht in der Datei selbst.
