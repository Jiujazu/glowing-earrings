# CLAUDE.md — Glowing Earrings Projektreferenz

> Dieses Dokument ist die zentrale Referenz für alle Claude-Sessions, die an der Plattform arbeiten.

## Was ist Glowing Earrings?

Eine kostenlose, interaktive Lernplattform für generative KI. Kuratiert von Julian van Dieken (Creative Media & Education, Berlin). Jeder Kurs basiert auf einer konkreten Originalquelle und wird in ein spielbares Lernerlebnis transformiert.

**Live:** https://glowing-earrings.vercel.app
**Repo:** https://github.com/Jiujazu/glowing-earrings
**Stack:** Next.js 15 (App Router, SSG) + TypeScript + Tailwind CSS v4 + Vercel

---

## Kurs-Erstellungs-Workflow

### 1. Quelle identifizieren
Julian liefert einen Link oder Inhalt: Tweet, Artikel, Video, Gist, Paper.

### 2. Kurs generieren
Eine TypeScript-Datei erstellen, die dem `Course`-Interface entspricht (siehe Datenstruktur unten). Dabei:

- **Kursname und Subtitle** — griffig, neugierig machend, deutsch
- **Modulstruktur** — 3-6 Module, logisch aufbauend, je 2-5 Minuten
- **Design-Theme** — eigene Farben und Stimmung pro Kurs (dunkel/hell, Farbpalette passend zum Thema)
- **Interaktive Elemente** — mindestens 2 Quizzes, 3 Flashcards, 1 Reflexionsfrage pro Kurs
- **Easter Egg** — mindestens 1 verstecktes Element
- **Kurs-Outro** — 3-5 Kernerkenntnisse, konkreter nächster Schritt, Newsletter-CTA

### 3. Datei speichern
Als `/content/courses/[slug].ts` — der Slug ist URL-safe, englisch, kebab-case.

### 4. Kurs registrieren
In `/content/courses/index.ts` importieren und zum `courses`-Array hinzufügen.

### 5. Commit & Push
`git add`, `git commit`, `git push origin main` — Vercel deployed automatisch.

### 6. Prüfen
Auf der Live-URL den Kurs durchspielen, Feedback einarbeiten.

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

content/courses/              → Kurs-Daten als TypeScript-Dateien
  index.ts                    → Kurs-Registry
  karpathy-llm-wiki.ts       → Erster Kurs (Referenz-Template)

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

## Referenz-Kurs

`/content/courses/karpathy-llm-wiki.ts` ist der erste und bisher einzige Kurs. Er dient als Template für die Struktur, das Format und den Tonfall aller weiteren Kurse.

## Lern-System

- **`LEARNINGS.md`** — Wächst mit jedem Kurs. Lies diese Datei vor jeder Kurs-Erstellung. Sie enthält Erkenntnisse, Patterns und Anti-Patterns aus bisherigen Kursen.
- **`COURSE-STYLEGUIDE.md`** — Didaktische Prinzipien, Struktur-Standards und Qualitäts-Checkliste. Definiert die Regeln, die LEARNINGS.md mit Praxiserfahrung ergänzt.
