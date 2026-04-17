# Gap-Analyse: Die Karpathy Methode

- **Quelle:** https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- **Abgleich-Datum:** 2026-04-17
- **Kurs-Slug:** karpathy-llm-wiki

## Mapping-Tabelle

| Quellen-Abschnitt | Kurs-Modul | Element-Typ | Status | Notiz |
|---|---|---|---|---|
| Intro ("A pattern for building…", "idea file") | Intro | sourceContext | ✅ abgedeckt | — |
| Core idea: RAG als Ausgangslage | Modul 1 | key-concept `rag-problem` | ✅ abgedeckt | — |
| Core idea: Wiki als persistent/compounding | Modul 1 + 2 | content | ✅ abgedeckt | — |
| Core idea: Obsidian-IDE-Analogie | Modul 4 | callout `workflow-callout` | ✅ abgedeckt | Zitat wortgleich |
| Core idea: 5 Anwendungsbeispiele (Personal, Research, Reading a book, Business, Competitive/hobby) | — | — | ❌ **Lücke** | Keines der 5 Beispiele kommt im Kurs vor. Besonders der Tolkien-Gateway-Vergleich für Reading-a-book ist anschaulich. |
| Architecture: Raw sources | Modul 2 | content `arch-layer-1` | ✅ abgedeckt | — |
| Architecture: The wiki | Modul 2 | content `arch-layer-2` | ✅ abgedeckt | — |
| Architecture: The schema (CLAUDE.md / AGENTS.md) | Modul 2 | content `arch-layer-3` | ⚠️ teilweise | Kurs nennt nur `CLAUDE.md`, nicht `AGENTS.md` für Codex. Minor. |
| Operations: Ingest (10–15 Seiten, one-at-a-time vs. batch) | Modul 3 | content `ops-ingest` | ⚠️ teilweise | Die Workflow-Variante "ingest one-at-a-time vs. batch" fehlt. Karpathys persönliche Präferenz ("stay involved") ist interessant. |
| Operations: Query mit Output-Formaten (Marp, matplotlib, canvas, Tabellen) | Modul 3 | content `ops-query` | ❌ **Lücke** | Kurs erwähnt nur "Antwort mit Zitaten". Die verschiedenen Output-Formate fehlen. |
| Operations: "good answers can be filed back" | Modul 3 | content `ops-query` | ⚠️ **Quelltreue-Problem** | Kurs schreibt: *"Karpathy nennt das **Output Compounding**"*. Karpathy nennt es im Gist **NICHT** so. Er sagt nur "your explorations compound". Der Begriff ist eine Zuschreibung des Kurses. |
| Operations: Lint (data gaps via web search, LLM suggests new questions) | Modul 3 | content `ops-lint` | ⚠️ teilweise | Die proaktive Seite ("LLM is good at suggesting new questions to investigate and new sources to look for") fehlt. |
| Indexing: index.md | Modul 4 | content `nav-intro` | ✅ abgedeckt | — |
| Indexing: log.md + Log-Format | Modul 4 | content `nav-intro` | ✅ abgedeckt | Format `## [YYYY-MM-DD]` wortgleich. |
| Indexing: `grep "^## \[" log.md \| tail -5` (Unix-Tool-Hinweis) | — | — | ❌ Lücke | Minor, aber charmantes Detail. |
| Optional CLI: qmd | Modul 4 | content `nav-scaling` | ✅ abgedeckt | BM25/Vektor + Re-Ranking korrekt. |
| Tips & Tricks: Obsidian Web Clipper | — | — | ❌ Lücke | |
| Tips & Tricks: Image Download + Hotkey `Ctrl+Shift+D` | — | — | ❌ Lücke | |
| Tips & Tricks: Graph view | — | — | ❌ Lücke | Wird im workflow-Zitat angetippt, aber nicht thematisiert. |
| Tips & Tricks: Marp | — | — | ❌ Lücke | |
| Tips & Tricks: Dataview | — | — | ❌ Lücke | |
| Tips & Tricks: "wiki is just a git repo" | Modul 2 | content `arch-intro` | ✅ abgedeckt | Erwähnt Git-Versionierung. |
| Why this works: Bookkeeping-Kernsatz | Modul 5 | callout `bookkeeping-quote` | ✅ abgedeckt | Wortgleich. |
| Why this works: LLM "touch 15 files in one pass" | Modul 5 | content `role-division` | ✅ abgedeckt | — |
| Why this works: Memex + "part he couldn't solve" | Modul 5 | context-box `memex` | ✅ abgedeckt | Wortgleich. |
| Note: "intentionally abstract / modular / pick what's useful" | — | — | ❌ Lücke | Fehlt als Framing-Hinweis. Könnte im Outro-Next-Step unterstützen. |

## Identifizierte Lücken (zusammengefasst)

### Substantielle Lücken (sollten eingearbeitet werden)
1. **5 Anwendungsbeispiele** (Personal, Research, Reading a book, Business, Competitive/Hobby) — kommen im Kurs nicht vor. Der Kurs bleibt dadurch abstrakt, obwohl die Quelle konkrete Szenarien liefert.
2. **Query-Output-Formate** (Marp, matplotlib, canvas, Tabellen) — zeigen die Breite dessen, was "Query" kann.
3. **Quelltreue-Problem "Output Compounding":** Der Kurs schreibt Karpathy einen Begriff zu, den er im Gist nicht verwendet. Anti-Pattern §12.8 sinngemäß.

### Kleinere Lücken (optional)
4. **Schema-Dokument:** `AGENTS.md` für Codex ergänzen.
5. **Ingest-Workflow:** "one-at-a-time vs. batch" + Karpathys Präferenz erwähnen.
6. **Lint proaktiv:** LLM schlägt neue Fragen/Quellen vor.
7. **Tips & Tricks:** Die ganze Sektion (Obsidian Web Clipper, Graph view, Marp, Dataview). Entweder bewusst weglassen (stark Obsidian-spezifisch) oder als "Werkzeug-Kiste"-Callout ergänzen.
8. **"Intentionally abstract"-Framing** aus der Note.

### Verifikation: Zitate, Zahlen, Tools
- ✅ Alle 4 direkten Zitate wortgleich mit dem Gist
- ✅ Zahlen (10–15, 100, 1945) korrekt
- ✅ Tool-Namen (qmd, BM25/Vektor, Obsidian, CLAUDE.md) korrekt
- ✅ Log-Format wortgleich
- ⚠️ "Output Compounding" (siehe oben)

## Einarbeitung (2026-04-17)

Julians Entscheidungen:

- **Output Compounding:** Zuschreibung entfernt. Neu in `ops-query`: *"Der Clou liegt laut Karpathy im Rückfluss … So **compounden** deine Recherchen genauso wie die eingelesenen Quellen."* Flashcard `flashcard-ops-2` und Outro-Synthese nachgezogen.
- **Use Cases:** Neuer `content`-Block `use-cases` in Modul 1 (nach `rag-quote`) mit allen 5 Kontexten inkl. Tolkien-Gateway-Link.
- **Output-Formate (Marp/matplotlib/Canvas):** Bewusst weggelassen.
- **Tips & Tricks:** Als neues Modul `tools` ("Praktische Werkzeuge", 3 Min) angelegt mit Web Clipper + Bild-Hotkey + Graph view + Marp + Dataview + Tip-Callout "alle optional".
- **Plus (nicht aus Gist, von Julian eingebracht):** Jeel Patels LinkedIn-Erfahrungsbericht als narrativer Bridge-Block `patel-bridge` in Modul 1 (nach `problem-intro`). Sekundäre Quelle, klar attribuiert, ersetzt nicht Karpathys Inhalte — liefert den konkreten Benefit aus der Praxis.

Folge-Anpassungen:

- `estimatedMinutes` meta: 18 → 23
- Modul 1 `estimatedMinutes`: 3 → 5
- Tag `Wissensmanagement` → `Wiki`
- Modul 5 Titel: "Warum KI der perfekte Wiki-Pfleger ist" → "Warum KI das Wiki pflegt"
- `problem-intro` mit `###`-Heading und 4er-Liste aufgewertet (§2.2)

Nicht eingearbeitet (dokumentierter Verzicht):

- `AGENTS.md` für Codex — minor, Kurs erwähnt nur `CLAUDE.md`
- Ingest-Workflow "one-at-a-time vs. batch"
- Lint proaktiv (LLM schlägt neue Fragen/Quellen vor)
- `grep "^## \[" log.md` Unix-Hinweis
- "Intentionally abstract"-Framing aus der Gist-Note
