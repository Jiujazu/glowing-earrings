# CLAUDE.md — Glowing Earrings Projektreferenz

> Dieses Dokument ist die zentrale Referenz für alle Claude-Sessions, die an der Plattform arbeiten.

## Was ist Glowing Earrings?

Eine kostenlose, interaktive Lernplattform für generative KI. Kuratiert von Julian van Dieken (Creative Media & Education, Berlin). Jeder Kurs basiert auf einer konkreten Originalquelle und wird in ein spielbares Lernerlebnis transformiert.

**Live:** https://glowing-earrings.vercel.app
**Repo:** https://github.com/Jiujazu/glowing-earrings
**Stack:** Next.js 15 (App Router, SSG) + TypeScript + Tailwind CSS v4 + Vercel

---

## Kurs-Erstellungs-Workflow

> **Alle Details zu Regeln, Element-Einsatz und Schreibprozess stehen in `COURSE-STYLEGUIDE.md`. Diese Datei ist der Router.**

### Pre-Flight (vor jeder Kurs-Erstellung)
1. **Lies `COURSE-STYLEGUIDE.md` komplett** — insbesondere die Timeout-Warnung ganz oben, §1 Autoren-Prozess und §9 Qualitäts-Checkliste
2. **Lies den letzten fertigen Kurs** als Referenz für Struktur, Tonfall, Element-Einsatz
3. **Verdichtungs-Check:** Wenn Kursnummer N ≥ 4 und `(N-1) % 3 == 0` (also Kurs 4, 7, 10, 13…), die letzten 3 Einträge in `COURSE-LEARNINGS.md` lesen und Julian Promotion-Kandidaten vorschlagen (siehe Lern-System unten)

### Phasen (Kurzübersicht — Details in STYLEGUIDE §1)
1. Quelle identifizieren (Tweet / Artikel / Video / Gist / Paper)
2. **Gap-Analyse** bei kuratierten Quellen (Pflicht, siehe STYLEGUIDE §11) — als `gap-analysis.md` im Kurs-Ordner ablegen
3. Lernziele pro Modul definieren
4. Modul-Schnitt & Element-Wahl
5. **Kurs IN TEILEN schreiben** (Pflicht): Write für Meta+Intro+M1-2, Edit für je 2 weitere Module, Edit für Outro. Niemals in einem Schritt — führt zu Timeout.
6. Datei speichern unter `/content/courses/[slug]/course.json`, Assets unter `/public/courses/[slug]/`, in `/content/courses/index.ts` registrieren
7. Commit & Push — Vercel deployed automatisch

### Manuelle Anpassungen
Julian kann Kurse direkt auf der Live-Seite editieren via Custom Inline Editor (`?edit=TOKEN`). Änderungen werden via GitHub API committed. Siehe `EDITOR-PLAN.md` für Details.

### Post-Flight (nach jeder Kurs-Erstellung)
1. **Auf der Live-URL** den Kurs durchspielen, Feedback einarbeiten
2. **Neuen Eintrag in `COURSE-LEARNINGS.md`** nach Template (siehe dort) — nur Memo, keine Regel-Prüfung nötig

---

## Kurs-Datenstruktur

Datei: `/home/user/glowing-earrings/lib/types.ts`

```typescript
interface Course {
  meta: CourseMeta;
  intro: CourseIntro;
  modules: Module[];
  outro: CourseOutro;
}
```

### CourseMeta
```typescript
interface CourseMeta {
  slug: string;              // URL-safe, englisch, kebab-case
  title: string;             // Griffiger deutscher Kursname
  subtitle: string;          // 1-2 Sätze Beschreibung
  sourceUrl: string;         // Link zum Originalmaterial
  sourceAuthor: string;      // Name des Autors
  sourceType: "tweet" | "video" | "article" | "document" | "gist" | "other";
  category: "ai-tech" | "ai-creativity" | "ai-society" | "ai-workflows";
  tags: string[];            // z.B. ["Knowledge Management", "LLM"]
  estimatedMinutes: number;  // Geschätzte Gesamtdauer
  difficulty: "beginner" | "intermediate" | "advanced";
  publishedAt: string;       // ISO-Datum, z.B. "2026-04-10"
  draft?: boolean;           // true = nur per Direkt-URL erreichbar
  relatedCourses?: string[]; // Slugs verwandter Kurse
  design: CourseDesign;
}
```

### CourseDesign
Jeder Kurs hat ein eigenes visuelles Theme. Standard ist **dunkel**, mit optionalem **Light Mode** über einen Toggle:
```typescript
interface CourseColors {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: string;
  textMuted: string;
}

interface CourseDesign {
  theme: string;              // z.B. "knowledge-graph", "hacker-terminal"
  colors: CourseColors;       // Dark Mode (Standard)
  lightColors?: CourseColors; // Light Mode (optional, Toggle im Kurs)
  fonts?: {
    heading?: string;         // Override für Heading-Font
    body?: string;            // Override für Body-Font
  };
}
```

### Module und Elemente
```typescript
interface Module {
  id: string;                    // Unique innerhalb des Kurses
  title: string;
  icon?: string;                 // Emoji
  estimatedMinutes: number;
  elements: ModuleElement[];
  transitionToNext?: string;     // Brücke zum nächsten Modul
}
```

**Element-Typen:**

| Typ | Zweck | Pflichtfelder |
|---|---|---|
| `content` | Markdown-Text | `text` |
| `key-concept` | Begriff + Definition | `title`, `description`, optional `icon` |
| `callout` | Hervorgehobene Box | `variant` (quote/stat/example/warning/tip/fun-fact), `text`, optional `title` |
| `context-box` | Hintergrund-Kontext | `term`, `explanation` |
| `quiz` | Multiple-Choice | `question`, `options[]` (je `text`, `correct`, `feedback`), `explanation` |
| `flashcard` | Lernkarte | `front`, `back` |
| `reflection` | Nachdenkfrage | `prompt`, optional `placeholder` |
| `easter-egg` | Verstecktes Element | `trigger` (click/hover/scroll/konami/idle), `content` |
| `image` | Bild mit Lightbox | `src`, `alt`, optional `caption`, `width`, `height`, `fullWidth` |
| `video` | YouTube/Vimeo-Embed | `platform` (youtube/vimeo), `videoId`, optional `title`, `startAt` |
| `code-block` | Code mit Copy-Button | `code`, optional `language`, `filename`, `highlightLines` |
| `step-by-step` | Schritt-für-Schritt | `steps[]` (je `label`, `content`, optional `image`), optional `title` |

Jedes Element braucht eine unique `id` und ein `type`-Feld.

### CourseOutro
```typescript
interface CourseOutro {
  synthesis: string[];      // 3-5 Kernerkenntnisse
  nextStep: string;         // Konkreter Handlungsimpuls
  takeaway?: TakeawayItem[]; // Checkliste mit Emoji + Text
  sourceUrl: string;        // Nochmaliger Link zum Original
  newsletterCTA: string;    // Kontextueller Newsletter-Hook
}
```

---

## Design-System

### Markenfarben (CME CI + Pop-Akzente)

| Farbe | Hex | Verwendung |
|---|---|---|
| Brand Lila | `#5B2F9F` | Primärfarbe, Links, CTAs |
| Teal | `#025671` | Sekundärfarbe |
| Dark Purple | `#261C53` | Gradient-Ende, dunkle Flächen |
| Hot Pink | `#E91E8C` | Pop-Akzent |
| Electric Türkis | `#00C9A7` | Pop-Akzent, Erfolgs-States |
| Hintergrund | `#FAFAFA` | Seitenhintergrund |
| Hinweis-Lila | `#F5F0FC` | Callout-Hintergründe |
| Text Dunkel | `#333333` | Primäre Textfarbe |
| Text Grau | `#7F7F7F` | Sekundäre Textfarbe |

### Gradient
Vertikal: Teal (`#025671`) oben → Dark Purple (`#261C53`) unten. Immer vertikal, nie horizontal.

### Typografie
- **Headings:** Space Grotesk (Google Font, via `next/font/google`)
- **Body:** DM Sans (Google Font)
- Fonts werden in `app/layout.tsx` geladen und als CSS-Variablen bereitgestellt

### Kurs-Themes
Jeder Kurs definiert eigene Farben in `CourseDesign.colors`. Diese werden als CSS Custom Properties auf den Kurs-Container gesetzt. Alle Kurs-Komponenten nutzen `var(--course-primary)`, `var(--course-surface)`, etc.

**Wichtig:** Kurs-Themes dürfen mutig und eigenständig sein. Jeder Kurs soll sich visuell anders anfühlen. Keine generischen Template-Farben.

**Light-Mode Kurs-Beispiel:**
```typescript
colors: {
  background: "#FAFAFA",
  surface: "#FFFFFF",
  primary: "#5B2F9F",
  accent: "#00C9A7",
  text: "#333333",
  textMuted: "#7F7F7F",
}
```

**Dark-Mode Kurs-Beispiel:**
```typescript
colors: {
  background: "#0E0B1A",
  surface: "#1A1530",
  primary: "#7B4FBF",
  accent: "#00C9A7",
  text: "#EDE4F8",
  textMuted: "#9B8EC0",
}
```

---

## Projektstruktur

```
app/                          → Seiten (Next.js App Router)
  page.tsx                    → Landing Page
  courses/page.tsx            → Kurs-Katalog
  courses/[slug]/page.tsx     → Einzelner Kurs (SSG)
  newsletter/page.tsx         → Newsletter-Seite
  about/page.tsx              → About-Seite
  impressum/page.tsx          → Impressum
  datenschutz/page.tsx        → Datenschutz
  api/newsletter/route.ts     → Newsletter API-Route

components/
  layout/                     → Header, Footer, NewsletterCTA, MobileNav
  course/                     → CoursePlayer, CourseIntro, CourseOutro, ModuleRenderer
  course/CourseFilters.tsx     → Tag/Schwierigkeits-Filter für Katalog
  course/CourseProgressTracker.tsx → localStorage Progress-Tracking
  course/CourseCardProgress.tsx → Fortschrittsbalken auf CourseCard
  course/elements/            → ContentBlock, QuizCard, FlashcardDeck, Callout, etc.
  course/elements/ImageBlock   → Bilder mit Lightbox-Zoom
  course/elements/VideoEmbed   → YouTube/Vimeo lazy-loaded
  course/elements/CodeBlock    → Code mit Zeilennummern + Copy
  course/elements/StepByStep   → Akkordeon-Schritte mit Markdown
  ui/                         → Button, Input, Badge, Container

content/courses/              → Kurs-Daten (ein Ordner pro Kurs)
  index.ts                    → Kurs-Registry
  [slug]/course.json          → Kursdaten
  [slug]/source.md            → Original-Transkript/Quelle

lib/
  types.ts                    → Alle TypeScript-Typen
  course-utils.ts             → Helper-Funktionen
  progress.ts                 → localStorage Fortschritts-Tracking
  newsletter.ts               → Newsletter-Provider-Abstraktion
```

---

## Wichtige Regeln

1. **Sprache UI:** Denglisch — Tech-Begriffe englisch, Rest deutsch
2. **Kurse:** Können individuell deutsch oder englisch sein
3. **Code:** Variablen, Komponentennamen, Kommentare auf Englisch
4. **Design:** "Corporate ist verboten" — Persönlichkeit, Wärme, Charakter
5. **Newsletter:** Heißt "Ein gutes Ding"
6. **Newsletter-Provider:** Noch nicht entschieden — die Integration ist abstrakt gebaut
7. **Kein Analytics:** DSGVO-konform von Tag 1
8. **Impressum/Datenschutz:** E-Mail-Adressen müssen noch eingetragen werden (Platzhalter)

---

## Referenz-Kurse

- `/content/courses/karpathy-llm-wiki/course.json` — Kurs 1, technisch (ai-tech), Dark Theme (Lila/Teal)
- `/content/courses/agentic-os-context-levels/course.json` — Kurs 2, Workflow (ai-workflows), Dark Theme (Amber/Blau)
- `/content/courses/handy-speech-to-text/course.json` — Kurs 3, Tool (ai-workflows), Dark Theme (Grün/Gelb)
- `/content/courses/storytelling-bildung/course.json` — Kurs 4, Kreativität (ai-creativity), Dark Theme (Amber/Warm)

Der jeweils letzte Kurs dient als primäre Referenz für Struktur, Tonfall und Element-Einsatz.

## Lern-System

Das Lern-System sorgt dafür, dass jeder neue Kurs besser wird als der vorherige — über eine **3-Stage-Pipeline**:

### Die drei Dokumente
1. **`CLAUDE.md`** (diese Datei) — **Router.** Wird automatisch geladen. Workflow-Übersicht, Pre-Flight, Post-Flight. Details stehen in STYLEGUIDE.
2. **`COURSE-STYLEGUIDE.md`** — **Regelwerk.** Didaktik, Mobile-First, Qualitäts-Checkliste, Gap-Analyse, Anti-Patterns. **Immer komplett lesen vor Kurs-Erstellung.**
3. **`COURSE-LEARNINGS.md`** — **Raw Log.** Wachsende Historie mit 5-Felder-Template pro Kurs. Nicht pflichtlesen — wird beim Verdichtungs-Ritual konsultiert.

### Die drei Stages

**Stage 1 — Capture (Post-Flight, nach jedem Kurs):**
Neuen Eintrag in `COURSE-LEARNINGS.md`. Template: *Was war neu / funktioniert / Fehler / Hypothese / Status*. Low-friction, keine Bewertung.

**Stage 2 — Verdichten (Pre-Flight, vor Kurs 4, 7, 10…):**
Claude liest die letzten 3 Einträge und stellt drei Fragen:
- Welches Pattern taucht in ≥2 Kursen auf? → Promotion-Kandidat
- Welcher Fehler wurde wiederholt? → Anti-Pattern-Kandidat
- Was war Einzelfall? → bleibt im Log

Julian entscheidet per `AskUserQuestion`, was promoviert wird.

**Stage 3 — Promotion (in STYLEGUIDE):**
Bestätigte Patterns werden als Regel in der passenden Sektion ergänzt. Wiederholte Fehler wandern in `STYLEGUIDE §12 Anti-Patterns`. Der LEARNINGS-Eintrag wird mit `→ promoted to STYLEGUIDE §X.Y` markiert (nicht gelöscht — Genese bleibt nachvollziehbar).
