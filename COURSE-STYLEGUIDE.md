# Glowing Earrings — Kurs-Design-Guide

> Dieses Dokument definiert die didaktischen Prinzipien, Struktur-Standards und Qualitätskriterien für alle Kurse auf der Plattform. Es stellt sicher, dass Kurs 1 und Kurs 20 sich anfühlen, als kämen sie vom selben Ort — ohne dass jeder Kurs gleich aussieht.

---

## 1. Didaktische Prinzipien

### 1.1 Snack-sized & Fun
- **Du-Ansprache** durchgehend, kein Siezen
- **Nie mehr als 2-3 Absätze** ohne interaktives Element (Quiz, Flashcard, Reflexion, Callout)
- **Quiz-Feedback ist lehrreich:** Nicht nur "Richtig/Falsch", sondern Kontext und Erklärung. Jede Antwort — richtig oder falsch — ist ein Lernmoment. Ton: warmherzig, nie herablassend. "Nicht ganz — aber gut zu wissen:" statt "Falsch."
- **Emojis nur wo sie Struktur bieten.** Erlaubt: Takeaway-Checklisten (Emoji + Text-Paare), Callout-Icons (werden von der Komponente gesetzt), Easter Eggs. Verboten: Modul-Titel, Key-Concept-Icons, Fließtext-Dekoration. Im Zweifel weglassen.
- **Humor: subtil & clever.** Schmunzeln, nicht lachen. Clevere Formulierungen, überraschende Perspektiven, Wortspiel-Niveau — keine Witze, keine Gags, keine Memes. Der Ton ist der eines klugen Gesprächspartners, nicht eines Comedians.

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

Kurse können hell oder dunkel sein. Die Entscheidung richtet sich nach dem Thema:
- **Dunkel:** Technische Themen, Hacking, Deep Dives, "Nachts am Rechner"-Vibe
- **Hell:** Kreative Themen, Einsteiger-Kurse, "Sonntagmorgen mit Kaffee"-Vibe
- **Kein Default** — jeder Kurs wird individuell entschieden

### 4.3 Farbwahl-Regeln

- `primary` und `accent` dürfen mutig und kräftig sein
- `text` auf `background` muss gut lesbar sein (Kontrast prüfen)
- `surface` muss sich vom `background` abheben, aber subtil
- Pop-Farben (Pink, Türkis) als Akzente erlaubt und erwünscht

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
Frei wählbar, aber konsistente Schreibweise:
- Englisch, Title Case: "Knowledge Management", "Prompt Engineering", "Creative Tools"
- Maximal 4-5 Tags pro Kurs
- Bestehende Tags bevorzugen, neue nur wenn nötig

### 6.3 Zeitschätzung
- Pro Modul: geschätzt in Minuten (inkl. Quizzes und Flashcards)
- Gesamtdauer: Summe der Module
- Faustregel: 1 Minute pro 150 Wörter Fließtext + 30 Sekunden pro Quiz/Flashcard

### 6.4 Kursname
- Griffig, neugierig machend, deutsch (es sei denn, der englische Name ist besser)
- Kein trockener Deskriptor ("Karpathys LLM-Workflow"), sondern ein Versprechen ("Das LLM Wiki")
- Subtitle: 1-2 Sätze, die konkret sagen, was der Lernende lernt

---

## 7. Qualitäts-Checkliste

Jeder Kurs muss diese Punkte erfüllen, bevor er gepusht wird:

### Inhalt
- [ ] Kurs hat einen griffigen Namen + Subtitle
- [ ] Intro beantwortet Wer/Warum/Was und enthält Quellenlink
- [ ] ALLE Inhalte aus dem Ausgangsmaterial sind abgebildet (nichts weggelassen)
- [ ] Konkrete Zahlen, Tool-Namen und spezifische Beispiele sind erhalten
- [ ] Keine Inhalte erfunden (keine Halluzinationen)
- [ ] Fachbegriffe sind in Context-Boxen erklärt

### Didaktik
- [ ] Mindestens 2 Quizzes mit plausiblen Distraktoren und lehrreichem Feedback
- [ ] Quiz-Feedback erklärt das *Warum* — nicht nur richtig/falsch
- [ ] Mindestens 3 Flashcards, die Zusammenhänge testen (nicht nur Definitionen)
- [ ] Mindestens 1 Reflexionsfrage mit konkretem Praxisbezug
- [ ] Mindestens 1 Easter Egg
- [ ] Element-Reihenfolge variiert zwischen Modulen
- [ ] Modul-Titel kurz und prägnant (max 4-5 Wörter, Emojis nur im Modul-Header)
- [ ] Modul-Übergänge vorhanden (bevorzugt Kurs-Querverweise)
- [ ] Humor ist subtil & clever, nie platt
- [ ] Outro mit Synthese, konkretem nächsten Schritt und Takeaway

### Design
- [ ] Kurs-Theme hat Charakter (kein generisches Template)
- [ ] Textkontrast ist lesbar (WCAG AA)
- [ ] Design passt zum Thema
- [ ] Schwierigkeitsgrad korrekt eingestuft
- [ ] Tags sind konsistent mit bestehenden Kursen

---

## 8. Referenz

- **Referenz-Kurs:** `/content/courses/karpathy-llm-wiki.ts`
- **TypeScript-Typen:** `/lib/types.ts`
- **Datenstruktur-Doku:** `CLAUDE.md`
- **CI-Farben:** Brand Lila `#5B2F9F`, Teal `#025671`, Dark Purple `#261C53`, Hot Pink `#E91E8C`, Electric Türkis `#00C9A7`
