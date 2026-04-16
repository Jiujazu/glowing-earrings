# Glowing Earrings — Kurs-Design-Guide

> Zentrale Referenz für alle Kurs-Regeln, Qualitätsstandards und Learnings. Wächst mit jedem Kurs. Vor jeder Kurs-Erstellung komplett lesen.

---

## !! WARNUNG: Kurse IMMER in Teilen erstellen !!

> **Kurs-JSON-Dateien NIEMALS in einem einzigen Schritt schreiben.** Bei Nichteinhaltung kommt es zu Timeout-Fehlern und der gesamte Fortschritt geht verloren.

**Vorgehen (Pflicht für JEDEN Kurs, egal wie klein):**

1. **Teil 1 — Write:** Meta + Intro + Module 1-2 → neue Datei erstellen
2. **Teil 2-n — Edit:** Je 2 weitere Module ans bestehende JSON anhängen
3. **Letzter Teil — Edit:** Letzte Module + Outro anhängen + `]` und `}` schließen

Zwischen jedem Teil kurz prüfen, dass das JSON valide ist. Wer das ignoriert, verliert seine Arbeit durch Timeouts.

---

## 1. Mobile-First Content-Design

> Die wichtigste Regel. Alle Inhalte werden primär auf Smartphones gelesen. Jeder Kurs muss perfekt auf einem 6-Zoll-Display funktionieren.

**Grundprinzip: Der Inhalt gibt das Styling vor — nicht umgekehrt.** Formatierung ist kein nachträgliches Drüberstülpen. Wenn ein Gedanke zu einem 5-Satz-Absatz wird, muss der Gedanke anders formuliert werden — kürzer, in Teilschritte zerlegt, als Liste. Der Text muss von Anfang an so geschrieben sein, dass er auf Mobile leicht zu erfassen ist.

### Absätze & Textlänge
- **Max 2-3 Sätze pro Absatz.** Auf Mobile ist ein 5-Satz-Absatz eine Textwüste. Lieber ein Absatz zu viel als einer zu wenig.
- **Echte Absätze mit sichtbarem Abstand.** Absätze müssen auf Mobile klar voneinander getrennt sein — nicht nur ein minimaler Zeilenumbruch, sondern eine deutlich sichtbare Leerzeile. Das wird über die ContentBlock-Komponente gesteuert (`prose-p:mb-6`).
- **Kein Content-Element ohne visuellen Bruch nach 3 Sätzen.** Wenn ein Textblock auf Mobile mehr als 1.5 Bildschirme füllt, muss er geteilt werden.
- **Lieber zwei kürzere Content-Elemente als ein Riesenblock.** Jedes Content-Element sollte ein klares Thema haben.

### Optische Gewichtungen (Pflicht)
Jeder Content-Block braucht mindestens 2 verschiedene optische Gewichtungen. Ein Textblock darf **nie** uniform grau aussehen. Verfügbare Mittel:
- **`###`-Zwischenüberschriften** — in Kursfarbe, schaffen optischen Halt und Orientierung
- **Bold** (`**text**`) — für Kernaussagen, zentrale Begriffe, wichtige Zahlen
- **Listen** (`- item`) — für Aufzählungen, Schritte, Optionen. Immer bevorzugen wenn 3+ parallele Punkte vorkommen
- **Kursiv** (`*text*`) — für Beispiel-Prompts, Zitate im Fließtext
- **Code** (`` `text` ``) — für Tool-Namen, Befehle, Dateinamen

### Fließtext vs. Boxen
- **Fließtext ist die Basis.** Inhalte gehören primär in normalen Lauftext mit Markdown-Formatierung.
- **Boxen (Callout, Key-Concept, Context-Box) nur für:** echte Zitate, Warnungen, überraschende Fakten, Fachbegriff-Erklärungen.
- **Drei Boxen hintereinander = zu viele.** Wenn ein Modul hauptsächlich aus farbigen Boxen besteht, stimmt die Balance nicht.

### Strukturierung von Inhalten
- **Mehrere Themen in einem Block → aufteilen.** Drei Workflows? Drei Content-Elemente mit je eigenem `###`-Heading. Nicht alles in einen Block packen.
- **Parallele Informationen → Listen statt Prosa.** "Zwei Berechtigungen: Mikrofon und Accessibility" wird zu einer 2-Punkt-Liste.
- **Tastenkürzel und technische Infos → Listen oder Code-Formatting.** Nicht in Fließtext verstecken.

---

## 2. Didaktische Prinzipien

### 2.1 Snack-sized & Fun
- **Du-Ansprache** durchgehend, kein Siezen
- **Nie mehr als 2 Content-Blöcke hintereinander** ohne interaktives Element (Quiz, Flashcard, Reflexion)
- **Quiz-Feedback max 2 Sätze**, Explanation nach dem Reveal darf 2-3 Sätze lang sein. Ton: warmherzig, nie herablassend. "Nicht ganz — aber gut zu wissen:" statt "Falsch."
- **Emojis nur in Takeaway-Checklisten und Easter Eggs.** Verboten: Modul-Titel, Modul-Icons (`icon`-Feld), Key-Concept-Icons, Fließtext-Dekoration. Im Zweifel weglassen.
- **Humor: subtil & clever.** Der Ton ist der eines klugen Gesprächspartners, nicht eines Comedians.

### 1.2 Quelltreue
- Inhalte stammen **ausschließlich** aus dem Ausgangsmaterial
- Konkrete Zahlen, Tool-Namen, Statistiken, Beispiele **müssen** erhalten bleiben
- Kurzes Material = kurzer Kurs. Ein Tweet wird kein 6-Modul-Kurs
- Anekdoten und Metaphern aus dem Original beibehalten — sie sind der emotionale Anker
- **Ton des Originals spiegeln:** Ein lockerer Vortrag wird ein lockerer Kurs, ein fachlicher Artikel bleibt fachlich

### 1.3 Didaktisches Scaffolding
- Begriffe und Konzepte erklären, die das Original voraussetzt aber nicht erklärt
- Diese Erklärungen sind **kein erfundener Inhalt** — sie sind der Job des Instructional Designers
- Visuell klar als Hintergrundwissen markieren: `context-box`-Elemente, nie als regulären Content tarnen

### 1.4 Easter Eggs
- **Mindestens 1 pro Kurs**, idealerweise 2-3
- Thematisch zum Kursinhalt passend
- Elaboriert: interaktive Mini-Elemente, versteckte Fakten, unerwartete Gags — nicht nur Tooltips
- Jedes Mal neu und individuell — keine Templates, keine Wiederholungen
- Dürfen auch einfach nur charmant sein, ohne Lerneffekt

---

## 2. Kursstruktur

### 2.1 Intro (Pflicht)

Beantwortet zwei Kernfragen:

| Frage | Umsetzung | Feld |
|---|---|---|
| Wer spricht hier? | Kurze Einordnung der Quelle/Person | `sourceContext` |
| Warum sollte mich das interessieren? | Hook: Problem, Versprechen, Überraschung | `hook` |

Plus: Link zum Originalmaterial. Die Modul-Übersicht wird automatisch durch die Kapitel-Navigation angezeigt.

### 2.2 Module

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
| `image` | Bild mit Lightbox-Zoom | Wenn vorhanden |
| `video` | YouTube/Vimeo lazy-loaded | Wenn vorhanden |
| `code-block` | Code/Config mit Copy-Button — für Dateistrukturen und Configs | Wenn vorhanden |
| `step-by-step` | Akkordeon-Schritte mit Markdown — für mehrstufige Tutorials | Wenn vorhanden |

**Regeln:**
- **Element-Reihenfolge variieren.** Nicht jedes Modul: Absatz → Callout → Quiz → weiter. Ein Modul kann mit einem Quiz starten, ein anderes mit einer Reflexionsfrage.
- **Modul-Navigation:** Jeder Kurs hat eine sticky Navigation mit allen Modul-Titeln. Die Navigation wird automatisch vom `CoursePlayer` generiert — dafür braucht jedes Modul eine aussagekräftige `title`. Modul-Titel sollen kurz und prägnant sein (max 4-5 Wörter). Keine Emojis in der Navigation — die werden nur im Modul-Header selbst angezeigt.
- **Modul-Übergänge:** Bevorzugt: Querverweis auf einen thematisch verwandten Kurs auf der Plattform ("Du willst tiefer einsteigen? Im Kurs X geht's genau darum."). Falls kein passender Kurs existiert: Summary + Ausblick ("Du weißt jetzt X. Als nächstes schauen wir uns an..."). Innerhalb eines Kurses kann auch ein Cliff-Hanger funktionieren ("Du weißt jetzt, wie die Daten reinkommen — aber wo landen sie eigentlich?").
- **Kein Element erzwingen.** Ein kurzes Modul mit 2 Absätzen und 1 Quiz ist besser als ein aufgeblähtes Modul mit erzwungenen Flashcards.

### 2.3 Quiz-Design

- **Distraktoren müssen plausibel sein.** Falsche Antworten bilden typische Missverständnisse ab — keine offensichtlichen Wegwerf-Optionen.
- **Feedback ist lehrreich, nicht nur bestätigend.** Jede Option hat individuelles Feedback, das erklärt *warum* sie richtig oder falsch ist. Das Feedback selbst ist ein Lernmoment — nicht nur eine Bewertung.
- **Explanation nach dem Reveal.** Eine didaktische Erklärung, die das Konzept zusammenfasst und in den Gesamtkontext einordnet. Darf 2-3 Sätze lang sein.
- **Feedback-Ton:** Warmherzig, ermutigend, subtil clever. Auch bei falscher Antwort: "Nicht ganz — aber gut zu wissen:" statt "Leider falsch."

### 2.4 Flashcard-Design

- **Flashcards testen Zusammenhänge, nicht Definitionen.** Statt "Was ist RAG?" lieber "Warum funktioniert RAG allein nicht für ein persönliches Wiki?" oder "Was passiert, wenn du nur Ingestion ohne Linting machst?"
- **Front:** Eine Frage, die zum Nachdenken anregt — kein reines Abfragen
- **Back:** Erklärung des Zusammenhangs, nicht nur eine Definition
- **Reihenfolge:** Flashcards sollten im Kontext des Moduls erscheinen, in dem das Konzept eingeführt wird

### 2.5 Reflexionsfragen

- **Fokus: Praxisbezug.** "Wie würdest du das anwenden?" — konkret, nicht abstrakt.
- **Gute Reflexionsfragen:** "Welches Thema in deinem Alltag wäre der ideale erste Eintrag für dein Wiki?" / "Welchen Workflow würdest du als Erstes automatisieren?"
- **Schlechte Reflexionsfragen:** "Was denkst du darüber?" (zu vage) / "Findest du das gut?" (ja/nein)
- **Placeholder-Text:** Optional, aber hilfreich als Denkanstoß ("z.B. Meine Notizen zu...")

### 2.6 Callout-Varianten

Alle Callout-Typen sollen ein **konsistentes Grunddesign** haben (gleiche Grundstruktur, gleiche Abstände), aber sich **visuell voneinander unterscheiden** (Farbe, Icon, Borderstil):

| Variante | Zweck | Wann einsetzen |
|---|---|---|
| `quote` | Direkte Zitate aus der Quelle | Starke O-Töne des Autors hervorheben |
| `stat` | Zahlen und Statistiken | Konkrete Daten aus dem Material |
| `example` | Praxisbeispiele | "In der Praxis sieht das so aus..." |
| `warning` | Häufige Fehler, Achtung-Momente | Missverständnisse oder Fallen |
| `tip` | Praktische Tipps | Direkt anwendbare Handlungsempfehlungen |
| `fun-fact` | Überraschende Fakten, Trivia | Auflockern, Neugier wecken |

### 2.7 Outro (Pflicht)

| Funktion | Umsetzung | Feld |
|---|---|---|
| Synthese | 3-5 Kernerkenntnisse in eigenen Worten | `synthesis` |
| Nächster Schritt | Spezifisch und sofort umsetzbar, nicht vage | `nextStep` |
| Takeaway | Checkliste oder Übersicht zum Screenshotten | `takeaway` |
| Quellenlink | Nochmaliger Link zum Original | `sourceUrl` |
| Newsletter-CTA | Kontextuell zum Kursthema | `newsletterCTA` |

---

## 3. Content-Strategie

### 3.1 Themenbereiche

Die Plattform deckt vier Säulen ab:

| Säule | Beispielthemen |
|---|---|
| **KI-Technologie & Tools** | LLMs, Prompting, AI Agents, RAG, Fine-Tuning |
| **KI + Kreativität** | KI + Kunst, Fotografie, Video, Musik, Storytelling |
| **KI + Gesellschaft** | Ethik, Arbeitswelt, Bildung, Regulierung |
| **KI-Workflows & Productivity** | Automatisierung, Tool-Chains, Arbeitsabläufe |

### 3.2 Schwierigkeitsgrad

Der Schwierigkeitsgrad ergibt sich aus der **Quelle**, nicht aus einer Ziel-Verteilung. Karpathys Gist ist Intermediate, ein Erklär-Tweet ist Beginner, ein Research Paper ist Advanced.

### 3.3 Quellentypen

Quellen können sein:
- **Externe Inhalte:** Tweets, Artikel, Videos, Gists, Papers von Dritten
- **Eigene Inhalte (Julian):** Vorwiegend YouTube-Videos, in denen Julian einzelne Themen oder Abläufe vorstellt. Diese werden als Kurs in Textform aufbereitet, ergänzt durch Zusatzmaterialien (z.B. PDFs, Checklisten).

Bei Julian-Kursen: `sourceAuthor: "Julian van Dieken"`, `sourceType: "video"`, Link zum YouTube-Video als `sourceUrl`.

### 3.4 Kurs-Vernetzung

Kurse stehen nicht isoliert. Wo immer möglich:
- **Outro:** Verweis auf thematisch verwandte Kurse auf der Plattform
- **Modul-Übergänge:** Bei letztem Modul bevorzugt Querverweis statt interner Cliff-Hanger
- **Ziel:** Ein natürliches Netz aus Lernpfaden, das organisch wächst

---

## 4. Design-Standards

### 4.1 Kurs-Themes

Jeder Kurs hat ein eigenes visuelles Theme (`CourseDesign`). Das Theme muss:
- **Charakter haben** — Indie-Game, Retro-Magazin, Hacker-Terminal, Kinderbuch für Erwachsene. Kein generisches Template.
- **Zum Thema passen** — ein Kurs über Hacking darf dunkel und monospace sein, ein Kurs über Kreativität darf bunt und verspielt sein.
- **Lesbar sein** — Textkontrast muss WCAG AA erfüllen (mindestens 4.5:1 für normalen Text).

### 4.2 Light vs. Dark

**Dark als Standard**, Light als Option. Kurse starten dunkel. `lightColors` im CourseDesign definiert die helle Alternative. Toggle im Kurs-Header, Präferenz in localStorage.

Farbsprache nach Kategorie:
- **Warme Farben (Amber/Orange):** Productivity- und Workflow-Kurse
- **Kühle Farben (Lila/Teal):** Technische Kurse
- **Grün/Gelb:** Tool-fokussierte Kurse

### 4.3 Farbwahl-Regeln

- `primary` und `accent` dürfen mutig und kräftig sein
- `text` auf `background` muss gut lesbar sein (Kontrast prüfen)
- `surface` muss sich vom `background` abheben, aber subtil
- Pop-Farben (Pink, Türkis) als Akzente erlaubt und erwünscht

### 4.4 SVG-Grafiken: Neo-brutaler Editorial-Stil

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

**Wann eine SVG-Visualisierung sinnvoll ist:**
- **Ja:** Übersichten (Stufenmodelle, Hierarchien), Vergleiche (Vorher/Nachher, Pro/Contra), Architekturen (Systemdiagramme, Beziehungen)
- **Nein:** Reine Text-Wiederholung, Dekoration ohne Informationswert, Konzepte die im Fließtext klarer sind

### 4.5 Quelldateien (source.md)

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

### 4.6 Transkript-Verifizierung

Vor dem Finalisieren eines Kurses: **Kursinhalte gegen das Original-Transkript prüfen.** Insbesondere:
- Bildunterschriften stimmen mit dem, was das Bild tatsächlich zeigt
- Zitate und Zahlen sind korrekt übernommen
- Keine Verwechslung von Szenen oder Beispielen
- Reihenfolge der Themen entspricht dem Original (sofern nicht bewusst umstrukturiert)

---

## 5. Tonfall

### 5.1 Grundton
- **Denglisch:** Tech-Begriffe englisch, Rest deutsch (es sei denn, der Kurs ist komplett englisch)
- **Direkt und klar, aber mit Charme.** Kein Marketing-Sprech, kein "innovativ" oder "revolutionär"
- **Menschlich:** Julian ist eine Personenmarke. Die Kurse klingen wie ein kluger Freund, der dir etwas erklärt — nicht wie ein Lehrbuch.

### 5.2 Tonfall-Kalibrierung nach Thema
- Der Grad von "Fun" passt sich dem Thema an
- Ein Kurs über KI-Ethik braucht weniger "Genau! Das sitzt." als ein Kurs über Prompt-Tricks
- Ein Kurs über eine akademische Quelle ist sachlicher als einer über einen Tweet
- **Faustregel:** Der Kurs-Ton spiegelt den Ton des Originals, aber immer zugänglich und nie trocken

---

## 6. Metadaten-Standards

### 6.1 Schwierigkeitsgrad

| Stufe | Kriterien |
|---|---|
| `beginner` | Keine Vorkenntnisse nötig. Grundbegriffe werden erklärt. |
| `intermediate` | Grundverständnis von KI/Tech vorausgesetzt. Fachbegriffe werden genutzt, aber erklärt. |
| `advanced` | Erfahrung mit dem Thema vorausgesetzt. Wenig Scaffolding, mehr Tiefe. |

### 6.2 Tags
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

### 6.3 Zeitschätzung
- Pro Modul: geschätzt in Minuten (inkl. Quizzes und Flashcards)
- Gesamtdauer: Summe der Module
- Faustregel: 1 Minute pro 150 Wörter Fließtext + 30 Sekunden pro Quiz/Flashcard

### 6.4 Kursname (Drei-Ebenen-Titel)
- **`title`** — kurz, griffig, allein verständlich. "Die Karpathy Methode", nicht "Karpathys LLM-Workflow"
- **`subheading`** — erklärender Untertitel. "Persönliche Knowledge Base mit KI"
- **`subtitle`** — Infotext, 1-2 Sätze was der Lernende lernt
- Bei Tool-Kursen muss das Subheading klarmachen, was das Tool ist

---

## 7. Qualitäts-Checkliste

Jeder Kurs muss diese Punkte erfüllen, bevor er gepusht wird:

### Inhalt
- [ ] Kurs hat Drei-Ebenen-Titel (title + subheading + subtitle)
- [ ] Intro beantwortet Wer/Warum/Was und enthält Quellenlink
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

### Didaktik
- [ ] Mindestens 2 Quizzes mit plausiblen Distraktoren und lehrreichem Feedback
- [ ] Quiz-Feedback erklärt das *Warum* — nicht nur richtig/falsch
- [ ] Mindestens 3 Flashcards, die Zusammenhänge testen (nicht nur Definitionen)
- [ ] Mindestens 1 Reflexionsfrage mit konkretem Praxisbezug
- [ ] Mindestens 1 Easter Egg
- [ ] Element-Reihenfolge variiert zwischen Modulen
- [ ] Modul-Titel kurz und prägnant (max 4-5 Wörter, keine Emojis)
- [ ] Modul-Übergänge vorhanden (bevorzugt Kurs-Querverweise)
- [ ] Outro mit Synthese, konkretem nächsten Schritt und Takeaway
- [ ] `relatedCourses` gegenseitig gesetzt

### Design
- [ ] Kurs-Theme hat Charakter (kein generisches Template)
- [ ] Textkontrast ist lesbar (WCAG AA)
- [ ] Design passt zum Thema
- [ ] Schwierigkeitsgrad korrekt eingestuft
- [ ] Tags sind konsistent mit bestehenden Kursen
- [ ] Cover-SVG im neo-brutalen Editorial-Stil vorhanden (`public/courses/[slug]/cover.svg`)
- [ ] SVG-Visualisierungen wo sinnvoll (Übersichten, Vergleiche, Architekturen) — nicht erzwingen

### Quelldateien
- [ ] `source.md` mit Metadata-Header (Typ, URL, Autor) vorhanden
- [ ] Transkript/Originaltext in `source.md` oder als referenzierte `.txt`-Datei hinterlegt
- [ ] Kursinhalte gegen Original-Transkript verifiziert (Captions, Zitate, Zahlen)

---

## 8. Technische Regeln

- **Alle Text-rendernden Komponenten brauchen ReactMarkdown.** Callout, Flashcard, jede Komponente die User-Text anzeigt — sonst rohe `**Sternchen**`.
- **`opengraph-image.tsx` braucht Default Export**, kein GET-Handler. Kein Edge Runtime mit Kurs-Imports.
- **Kein `onClick` in Server Components** — Event-Handler erzwingen Client Components.
- **Kurse IMMER in Teilen erstellen (Pflicht).** Die JSON-Dateien sind zu groß für einen einzelnen Write-Aufruf — es kommt sonst zu Timeout-Fehlern. Vorgehen:
  1. **Teil 1:** Meta + Intro + Module 1-2 → `Write` (neue Datei)
  2. **Teil 2-n:** Je 2 Module → `Edit` (an bestehendes JSON anhängen)
  3. **Letzter Teil:** Letzte Module + Outro → `Edit`
  - Zwischen den Teilen immer kurz validieren, dass das JSON noch gültig ist.
  - **Gilt für ALLE Kurse**, nicht nur große. Auch ein 3-Modul-Kurs wird in mindestens 2 Teilen geschrieben.
- **sourceType-Badge nicht im UI zeigen** — nur interne Metadaten.
- **Quell-Anonymisierung:** Wenn ein Autor nicht genannt werden soll, alle Bezüge ersetzen, `sourceAuthor` neutral halten, Promotion entfernen. Quell-URL bleibt.

---

## 9. Referenz

- **Referenz-Kurse:** `/content/courses/karpathy-llm-wiki/course.json` (ai-tech), `/content/courses/agentic-os-context-levels/course.json` (ai-workflows)
- **TypeScript-Typen:** `/lib/types.ts`
- **Datenstruktur-Doku:** `CLAUDE.md`
- **CI-Farben:** Brand Lila `#5B2F9F`, Teal `#025671`, Dark Purple `#261C53`, Hot Pink `#E91E8C`, Electric Türkis `#00C9A7`

---

## 10. Kurs-Historie

> Wächst mit jedem Kurs. Nach jeder Kurs-Erstellung 3-5 Erkenntnisse hinzufügen.

### Kurs 1: Die Karpathy Methode (2026-04-10)

**Quelle:** Andrej Karpathy, GitHub Gist — Intermediate
**Theme:** Dark, Knowledge-Graph (Lila + Teal)

- Flashcards mit "Warum"-Fragen statt Definitionen — regt zum Nachdenken an
- Quelltreue: Karpathys Begriffe (Ingest/Query/Lint) 1:1 übernommen
- Easter Egg mit Vannevar Bush — charmant und thematisch passend
- Callout-Varianten brauchten eigene Farben (jetzt behoben)
- Mobile-Nav Z-Index-Konflikte: Header z-[70], MobileNav z-[100]

### Kurs 2: Die 7 Stufen von Claude (2026-04-12)

**Quelle:** Community-Tutorial (YouTube) — Intermediate
**Theme:** Dark, Agentic-OS (Amber + Blau)

- `code-block` und `step-by-step` bewährt als Lehr-Elemente
- 7-Level-Struktur als aufsteigende Dramaturgie funktioniert
- Quell-Attribution ohne Autor: besser inhaltliche Beschreibung statt "Community-Tutorial"
- Stream-Timeouts bei großen Dateien → 2-Modul-Blöcke als Lösung

### Kurs 3: Handy App (2026-04-12)

**Quelle:** handy.computer (Tool-Website) — Beginner
**Theme:** Dark, Minimal (Grün + Gelb)

- Kurze Kurse (3-4 Module) funktionieren für fokussierte Tool-Vorstellungen
- Prose-first bewährt — Workflows als Fließtext statt als Callout-Kette
- Tool-Titel brauchen erklärendes Subheading ("Die beste Lösung zum Diktieren...")

### Kurs 4: Storytelling in der Bildung (2026-04-14)

**Quelle:** Julian van Dieken, YouTube Video — Beginner
**Theme:** Dark, Storytelling (Amber + Warm)

- **Neo-brutaler Editorial SVG-Stil etabliert:** Alle In-Course-Grafiken auf den neuen Stil umgestellt (helle BG, Grid-Pattern, dicke Outlines, Sticker-Labels). Vorher waren es generische dunkle Diagramme — jetzt visuell konsistent mit den Cover-SVGs.
- **SVG-Pfeil-Richtung:** Polygon-Punkte für rechts-zeigende Pfeile: Tip-x > Base-x. Häufiger Fehler beim Erstellen.
- **Ergänzung externer Frameworks:** Die "Aber-Deshalb-Regel" (South Park / Trey Parker & Matt Stone) als thematisch passende Ergänzung eingefügt — Bereicherung durch externe Quellen, die zum Kursthema passen, ist erlaubt und sinnvoll.
- **Bildunterschriften gegen Transkript prüfen:** Caption zeigte falschen Kontext (Plastikkiste statt Gruppenszene). Transkript-Verifizierung als Pflicht-Schritt etabliert.
- **Namenskonvention:** `svg_[beschreibung].svg` für In-Course-Grafiken bewährt.

### Kurs 2 Update: Visualisierungen (2026-04-16)

**Änderung:** 3 SVG-Visualisierungen zum Agentic OS Kurs hinzugefügt

- **Übersichts-SVGs** (aufsteigende Balken, Stufenmodelle) helfen Lesern, die Kursstruktur früh zu erfassen — am besten direkt nach der Einleitung platzieren
- **Vergleichs-SVGs** (Pro/Contra, Vorher/Nachher) machen Differenzierungen zwischen Konzepten greifbar — direkt nach der textuellen Einführung des Vergleichs platzieren
- **Architektur-SVGs** (zentrale Knoten, Verbindungen) machen abstrakte Systemkonzepte konkret — nach der Konzepteinführung, vor den Details

### Kurs 5: Das lebende Wiki (2026-04-16)

**Quelle:** rohitg00, GitHub Gist (agentmemory) — Advanced
**Theme:** Dark, Living-Knowledge (Purple/Teal, leicht variiert zum Vorgänger)

- **Sequel-Kurs funktioniert:** Direkte Anknüpfung an Kurs 1 (Karpathy Methode) über Hook und Recap. "Teil 2" im Subheading macht die Zugehörigkeit sofort klar. relatedCourses gegenseitig gesetzt.
- **Gap-Analyse als Pflicht bei kuratierten Quellen:** Systematisches Mapping jedes Gist-Abschnitts auf Kurs-Elemente VOR dem Schreiben. 12 Lücken identifiziert und eingearbeitet. Besonders bei bereits komprimierten Quellen unverzichtbar.
- **code-block mit highlightLines bewährt:** YAML-Beispiel (wiki-hooks.yml) mit hervorgehobenen Schlüsselzeilen macht abstrakte Konzepte (Event-Hooks) sofort greifbar.
- **step-by-step für Stufenmodelle:** Implementation Spectrum (6 Stufen) als Akkordeon funktioniert besser als Fließtext — Leser können direkt zur relevanten Stufe springen.
- **Timeout-Warnung bewährt sich:** Kurs in 3 Teilen geschrieben (Meta+Intro+M1-2, M3-4, M5+Outro). Kein einziger Timeout. Regel als prominente Warnung in CLAUDE.md und COURSE-STYLEGUIDE.md verankert.
