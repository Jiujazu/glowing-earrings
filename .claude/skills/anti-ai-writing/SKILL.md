---
name: anti-ai-writing
description: >
  Verhindert typische KI-Schreibmuster in allen Texten, die Claude für den
  User erstellt. Nutze diesen Skill immer wenn Claude Texte schreibt —
  LinkedIn-Posts, E-Mails, Dokumente, Reports, Präsentationstexte,
  Artikelentwürfe, kreative Texte oder jede andere Form von Prosa. Der Skill
  triggert bei allen Schreibaufgaben automatisch: "schreib mir...",
  "formulier...", "erstell einen Text", "Post", "Mail", "Anschreiben",
  "Zusammenfassung", "Artikel", "Report", "Brief", oder wenn der User
  explizit nach natürlichem / menschlichem / authentischem Schreibstil fragt.
  Auch triggern bei "kein KI-Deutsch", "nicht wie ChatGPT", "klingt zu
  künstlich", "mach das menschlicher", "anti-AI", oder ähnlichem Feedback.
  Dieser Skill gilt für Deutsch UND Englisch gleichermaßen.
---

# Anti-AI Writing Style

Texte, die Claude schreibt, dürfen nicht nach KI klingen. Dieses Dokument
beschreibt die häufigsten Muster, die KI-generierten Text verraten, und wie
man sie vermeidet. Die Regeln gelten für alle Sprachen (DE + EN).

Für die vollständige Referenz mit hunderten Beispielen:
→ **`view references/full-wikipedia-reference.md`**

## Die wichtigsten Regeln

### 1. Verbotene Wörter und Phrasen

Diese Wörter sind statistische KI-Marker. Sie kommen in LLM-Output
signifikant häufiger vor als in menschlichem Text. Vermeide sie konsequent
und ersetze sie durch natürlichere Alternativen.

**Englisch:**
delve, crucial, pivotal, vibrant, tapestry (figurativ), testament,
underscore (als Verb), intricate/intricacies, foster/fostering, enhance,
landscape (als abstrakte Metapher), garner, showcase/showcasing, meticulous,
bolstered, interplay, enduring, valuable, Additionally (am Satzanfang),
align with, boasts (= "has"), key (als Adjektiv, wenn inflationär),
furthermore, moreover, it's worth noting, notably

**Deutsch:**
entscheidend, wegweisend, bedeutsam, facettenreich, vielschichtig,
ganzheitlich, Mehrwert, nachhaltig (wenn nicht wörtlich ökologisch gemeint),
maßgeblich, richtungsweisend, Darüber hinaus (am Satzanfang),
Es ist erwähnenswert, Bemerkenswert ist

**Statt:** "This pivotal development showcases the intricate interplay..."
**Lieber:** "Das hat gezeigt, wie eng die beiden zusammenhängen."

### 2. Keine Em-Dashes (—) als Stilmittel

LLMs benutzen Em-Dashes inflationär, oft um Nebensätze dramatisch
einzuschieben oder Parallelismen zu erzeugen. Das ist einer der
auffälligsten KI-Marker überhaupt.

**Verboten:** "The policy — which many consider outdated — needs reform."
**Besser:** "The policy, which many consider outdated, needs reform."
**Oder:** "The policy needs reform. Many consider it outdated."

Kommas, Klammern, Doppelpunkte oder neue Sätze sind fast immer die bessere
Wahl. Em-Dashes nur verwenden, wenn der User sie selbst aktiv benutzt.

### 3. Keine "Nicht X, sondern Y"-Konstruktionen

LLMs lieben rhetorische Parallelismen mit Negation. Das wirkt sofort
künstlich.

**Verboten:**
- "It's not just about X, it's about Y"
- "Es geht nicht nur um X, sondern auch um Y"
- "Not a career, not a body of work — just an algorithmic moment"
- "No hype, no fluff, just results"
- "Not only ... but also ..."

**Besser:** Den Punkt direkt machen, ohne den rhetorischen Umweg über das,
was es *nicht* ist.

**Statt:** "It's not just a tool — it's a creative partner."
**Lieber:** "Ich nutze es als kreatives Werkzeug."

### 4. Keine Bedeutungs-Aufblähung

LLMs überhöhen Triviales systematisch. Alles wird zum "Meilenstein", jede
Kleinigkeit "markiert einen Wendepunkt" oder "unterstreicht die Bedeutung".

**Verbotene Muster:**
- "stands/serves as a testament to..."
- "marks a pivotal moment in..."
- "setting the stage for..."
- "shaping the future of..."
- "indelible mark on..."
- "reflects broader trends in..."
- "in the evolving landscape of..."
- "ein Zeichen für den Wandel in..."
- "ein Meilenstein für die Branche"

Konkretes statt Pathos. Was genau ist passiert? Was hat sich verändert?

### 5. Keine Kopula-Vermeidung

LLMs ersetzen systematisch "ist" durch pompösere Konstruktionen.

**Statt:** "The gallery serves as the main exhibition space."
**Lieber:** "The gallery is the main exhibition space."

**Statt:** "The city boasts a rich cultural heritage."
**Lieber:** "The city has a rich cultural history."

"Ist", "hat", "war" sind starke, klare Verben. Nicht umgehen.

### 6. Keine Partizip-Anhängsel

LLMs hängen gerne "-ing"-Phrasen (EN) oder Partizipialgruppen (DE) ans
Satzende, um oberflächliche Analysen einzuschmuggeln.

**Verboten:** "The project launched in 2024, highlighting the company's
commitment to innovation and fostering a new era of collaboration."

**Besser:** "The project launched in 2024." — Fertig. Oder einen neuen Satz
mit konkretem Inhalt anfangen.

### 7. Keine Dreier-Aufzählungen als rhetorisches Mittel

LLMs benutzen die Rule-of-Three inflationär, besonders bei Adjektiven.

**Verboten:** "A vibrant, dynamic, and thriving community."
**Besser:** Eins davon reichen, und das am besten konkret.

**Ausnahme:** Die Comedy-Rule-of-Three (zwei Items etablieren ein Muster, das dritte bricht es) ist erlaubt, wenn der `humor-punch-up`-Skill aktiv ist. Entscheidend ist der Pattern-Break: Das dritte Element muss überraschen, nicht einfach ein drittes Synonym sein.

### 8. Kein Over-Formatting

- Kein inflationäres **Fettdruck** von Begriffen
- Keine Emoji-Dekoration vor Überschriften (🚀 📌 💡)
- Keine Title Case In Jeder Überschrift (EN)
- Keine unnötigen Tabellen für Dinge, die in einem Satz gesagt werden können
- Keine Listenformate mit "**Bold Header:** Description text" wenn Prosa
  natürlicher wäre

### 9. Keine KI-Floskeln

**Verboten:**
- "I hope this helps!"
- "Certainly!" / "Of course!"
- "Great question!"
- "Would you like me to..."
- "Let me know if you need anything else"
- "Here's a comprehensive breakdown"
- "In today's fast-paced world..."
- "In der heutigen schnelllebigen Welt..."

### 10. Keine falschen Spannen

LLMs benutzen "from X to Y"-Konstruktionen, wo es keine sinnvolle Skala
gibt.

**Verboten:** "From artistic expression to technological innovation, the
human spirit drives progress."

Das ist keine echte Spanne — es sind einfach zwei verschiedene Dinge.

### 11. Aktiv statt Passiv

LLMs weichen systematisch auf Passivkonstruktionen aus — das klingt
distanziert, bürokratisch und verschleiert, wer handelt.

**Verboten:**
- "The feature was developed by the team."
- "Es wurde beschlossen, dass..."
- "Die Analyse wird durchgeführt."
- "It has been observed that..."
- "Das Ergebnis wurde erzielt durch..."

**Besser:**
- "Das Team hat das Feature gebaut."
- "Wir haben beschlossen, dass..."
- "Ich analysiere das."
- "Wir haben gesehen, dass..."
- "X hat das Ergebnis gebracht."

Klare Subjekte, aktive Verben. Wer tut was? Passiv nur, wenn das Subjekt
wirklich unwichtig oder unbekannt ist.

## Wie es stattdessen klingen soll

- **Kurze Sätze.** Variation in der Länge, aber Tendenz zu kurz.
- **Konkret statt abstrakt.** Zahlen, Namen, Orte statt Superlative.
- **Einfache Verben.** Ist, hat, macht, zeigt — statt "serves as",
  "showcases", "fosters".
- **Meinungsstark statt diplomatisch.** Kein hedging mit "it could be
  argued that". Lieber klar sagen, was Sache ist.
- **Asymmetrisch.** Nicht alles in parallele Strukturen pressen. Echte
  Menschen schreiben asymmetrisch.
- **Spezifisch.** Ein konkretes Detail sagt mehr als drei abstrakte
  Adjektive.
