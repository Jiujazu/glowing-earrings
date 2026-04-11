# Glowing Earrings — Learnings

> Dieses Dokument wächst mit jedem Kurs. Nach jedem fertigen Kurs kommen 3-5 Erkenntnisse dazu. Jede neue Claude-Session liest das mit — so werden die gleichen Fehler nicht zweimal gemacht.

---

## Kurs 1: Das LLM Wiki (2026-04-10)

**Quelle:** Andrej Karpathy, GitHub Gist — Intermediate
**Theme:** Dark, Knowledge-Graph-Aesthetic (Lila + Teal)

### Was funktioniert hat
- Flashcards mit "Warum"-Fragen ("Warum reicht RAG allein nicht?") statt Definitionen ("Was ist RAG?") — regt zum Nachdenken an statt zum Auswendiglernen
- Dark Theme + Teal-Accent: starker Kontrast, passt zum technischen Thema
- Easter Egg mit Vannevar Bush (historische Referenz) — charmant und thematisch passend, ohne den Lernfluss zu stören
- Quelltreue: Karpathys 3-Schichten-Metapher und Begriffe (Ingest/Query/Lint) 1:1 übernommen — gibt dem Kurs Authentizität

### Was besser geht
- Quiz-Feedback war teilweise zu lang — max 2 Sätze pro Feedback-Option, Explanation darf länger sein
- Alle Callout-Varianten sahen identisch aus — jetzt behoben (eigene Farbe pro Variante)
- Modul-Übergänge waren generische Cliff-Hanger — bei zukünftigen Kursen bevorzugt Querverweise auf andere Kurse
- Keine Emojis in der Modul-Navigation — nur im Modul-Header selbst. Die Nav braucht Klarheit, keine Dekoration
- Mobile-Nav (Header) hatte Z-Index-Konflikte mit Kurs-Content — Header braucht z-[70], MobileNav z-[100]

### Patterns zum Wiederverwenden
- **Scaffolding via Context-Box:** Fachbegriffe (z.B. "RAG") in Context-Boxen erklären, nicht im Fließtext — hält den Lesefluss für Fortgeschrittene und hilft Einsteigern
- **Outro-Struktur:** Synthese → konkreter nächster Schritt → Takeaway-Checkliste → Quellenlink → Newsletter-CTA — diese Reihenfolge funktioniert
- **Element-Rhythmus:** Nie mehr als 2 Content-Blöcke hintereinander ohne interaktives Element
- **Dark als Standard, Light als Option:** Kurse starten dunkel. `lightColors` im CourseDesign definiert die helle Alternative. Toggle im Kurs-Header, Präferenz in localStorage
- **Kein overview im Intro:** Die Kapitel-Navigation (CourseNav) übernimmt diese Funktion. Redundante nummerierte Listen im Intro vermeiden
- **Custom Cursor ist Noise:** Ausprobiert und wieder entfernt. Nervt mehr als es nützt — kein Award-Feature auf Kosten der UX
