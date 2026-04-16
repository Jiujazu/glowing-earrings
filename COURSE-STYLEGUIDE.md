# Glowing Earrings — Kurs-Design-Guide

> Zentrale Referenz für alle Kurs-Regeln und Qualitätsstandards. Wird bei Bedarf aktualisiert, wenn Learnings aus `COURSE-LEARNINGS.md` in Regeln überführt werden. Vor jeder Kurs-Erstellung komplett lesen.

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

Der Weg von einer Quelle zum fertigen Kurs — in dieser Reihenfolge:

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
- Inhalte stammen **primär** aus dem Ausgangsmaterial. Externe Ergänzungen sind nur unter den Kriterien in §3.4 erlaubt.
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
4. **Max 1 pro Kurs.** Bei mehr wird der Kurs zur Sekundärliteratur und verliert den Bezug zur Hauptquelle.
5. **Im Zweifel weglassen.** Wenn das Original auch ohne das Framework auskommt, braucht es das Framework nicht. Der Test: *Macht die Ergänzung das Kursthema konkret besser verständlich — oder wirkt sie nur schlau?*

Nicht-Einhaltung = Anti-Pattern §12.8.

### 3.5 Easter Eggs
- **Mindestens 1 pro Kurs**, idealerweise 2-3
- Thematisch zum Kursinhalt passend
- Elaboriert: interaktive Mini-Elemente, versteckte Fakten, unerwartete Gags — nicht nur Tooltips
- Jedes Mal neu und individuell — keine Templates, keine Wiederholungen
- Dürfen auch einfach nur charmant sein, ohne Lerneffekt

---

## §4 Kursstruktur

### 4.1 Intro (Pflicht)

Beantwortet zwei Kernfragen:

| Frage | Umsetzung | Feld |
|---|---|---|
| Wer spricht hier? | Kurze Einordnung der Quelle/Person | `sourceContext` |
| Warum sollte mich das interessieren? | Hook: Problem, Versprechen, Überraschung | `hook` |

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
| `image` | Bild mit Lightbox-Zoom | Wenn vorhanden |
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
- **Sequel-Kurse:** Direkte Anknüpfung an Vorgänger über Hook und Recap. "Teil 2" im Subheading macht die Zugehörigkeit sofort klar. `relatedCourses` gegenseitig setzen.
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
- [ ] SVG-Visualisierungen wo sinnvoll (Übersichten, Vergleiche, Architekturen) — nicht erzwingen (siehe §6.5)
- [ ] SVG-Pfeile korrekt: Tip-x > Base-x für rechts-zeigend

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

**Seen in:** präventiv
**Last seen:** —
**Status:** hot

**Was passiert:** Tags wie "Productivity", "AI" oder "KI-Technologie & Tools".
**Warum schlecht:** User wissen nicht, was sie erwartet — das Filtern verliert seinen Zweck.
**Stattdessen:** Ein Wort pro Tag, spezifisch. "Skills", "RAG", "Obsidian", "Claude". Siehe §8.2.

### 12.6 Drei Boxen hintereinander

**Seen in:** präventiv
**Last seen:** —
**Status:** hot

**Was passiert:** Modul besteht hauptsächlich aus Callouts, Key-Concepts, Context-Boxen.
**Warum schlecht:** Fließtext fehlt, der Rhythmus ist kaputt, Mobile wirkt wie ein Karussell.
**Stattdessen:** Fließtext ist die Basis. Boxen nur für echte Zitate, Warnungen, überraschende Fakten. Siehe §2.3.

### 12.7 Emoji-Inflation

**Seen in:** präventiv
**Last seen:** —
**Status:** hot

**Was passiert:** Modul-Titel, Key-Concept-Icons, Fließtext-Dekoration mit Emojis.
**Warum schlecht:** Wirkt unprofessionell, lenkt ab, gegen den Stil der Plattform.
**Stattdessen:** Emojis nur in Takeaway-Checklisten und Easter Eggs. Im Zweifel weglassen. Siehe §3.1.

### 12.8 Erfundene Framework-Ergänzungen

**Seen in:** präventiv
**Last seen:** —
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
