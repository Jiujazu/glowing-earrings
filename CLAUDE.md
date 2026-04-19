# CLAUDE.md — Glowing Earrings Projektreferenz

> Dieses Dokument ist die zentrale Referenz für alle Claude-Sessions, die an der Plattform arbeiten.

## Was ist Glowing Earrings?

Eine kostenlose, interaktive Lernplattform für generative KI. Kuratiert von Julian van Dieken (Creative Media & Education, Berlin). Jeder Kurs basiert auf einer konkreten Originalquelle und wird in ein spielbares Lernerlebnis transformiert.

**Live:** https://glowing-earrings.vercel.app
**Repo:** https://github.com/Jiujazu/glowing-earrings
**Stack:** Next.js 15 (App Router, SSG) + TypeScript + Tailwind CSS v4 + Vercel

---

## Kurs-Erstellungs-Workflow

> **Alle Details zu Regeln, Element-Einsatz und Schreibprozess stehen in `COURSE-CREATOR.md`. Diese Datei ist der Router.**

### Pre-Flight (vor jeder Kurs-Erstellung)
1. **Lies `COURSE-CREATOR.md` komplett** — insbesondere die Timeout-Warnung ganz oben, §1 Autoren-Prozess und §9 Qualitäts-Checkliste
2. **Lies `.claude/skills/anti-ai-writing/SKILL.md`** — gilt für alle Prosa-Teile (Intro, Modul-Text, Callouts, Outro, Quiz-Feedback)
3. **Lies den letzten fertigen Kurs** als Referenz für Struktur, Tonfall, Element-Einsatz
4. **Verdichtungs-Check:** Wenn Kursnummer N ≥ 4 und `(N-1) % 3 == 0` (also Kurs 4, 7, 10, 13…), die letzten 3 Einträge in `COURSE-LEARNINGS.md` lesen und Julian Promotion-Kandidaten vorschlagen (siehe Lern-System unten). **Ansonsten ist `COURSE-LEARNINGS.md` kein Pre-Flight-Pflichtdokument.**

### Phasen (Kurzübersicht — Details in CREATOR §1)
1. Quelle identifizieren (Tweet / Artikel / Video / Gist / Paper)
2. **Gap-Analyse** bei kuratierten Quellen (Pflicht, siehe CREATOR §11) — als `gap-analysis.md` im Kurs-Ordner ablegen
3. Lernziele pro Modul definieren
4. Modul-Schnitt & Element-Wahl
5. **Kurs IN TEILEN schreiben** (Pflicht): Write für Meta+Intro+M1-2, Edit für je 2 weitere Module, Edit für Outro. Niemals in einem Schritt — führt zu Timeout.
6. Datei speichern unter `/content/courses/[slug]/course.json`, Assets unter `/public/courses/[slug]/`, in `/content/courses/index.ts` registrieren
7. Commit & Push — Vercel deployed automatisch

### Manuelle Anpassungen
Julian kann Kurse direkt auf der Live-Seite editieren via Custom Inline Editor (`?edit=TOKEN`). Änderungen werden via GitHub API committed. Siehe `EDITOR-PLAN.md` für Details.

### Post-Flight (nach jeder Kurs-Erstellung)
1. **Auf der Live-URL** den Kurs durchspielen, Feedback einarbeiten
2. **Neuen Eintrag in `COURSE-LEARNINGS.md`** nach Template (siehe dort). Zuerst alle Felder bis auf `Sofort-Promotion-Kandidat?` und `Status` ausfüllen — diese zwei kommen in Schritt 3.
3. **Sofort-Promotion-Check.** Claude liest den frischen Eintrag und prüft jeden Punkt aus "Was war ein Fehler" oder "Was hat funktioniert" mit drei Fragen:
   - **Wiederholungsrisiko:** Würde dieser Fehler ohne Regel wieder passieren?
   - **Universalität:** Gilt das für alle zukünftigen Kurse, nicht nur für diese Quelle?
   - **Prüfbarkeit:** Kann man die Regel später auditieren (§14)?

   Ablauf:
   - **Alle drei mit ja** → Claude legt Julian den/die Kandidaten per `AskUserQuestion` vor.
     - Bei **Julian-Ok:** Regel direkt in `COURSE-CREATOR.md` ergänzen → `Sofort-Promotion-Kandidat?` auf `ja (→ CREATOR §X.Y)` → `Status: promoted → CREATOR §X.Y`
     - Bei **Julian-Nein:** `Sofort-Promotion-Kandidat?` auf `nein (Julian: Einzelfall)` → `Status: raw`
   - **Mindestens eine Frage unklar/nein** → Kein Claude-Vorschlag nötig → `Sofort-Promotion-Kandidat?` auf `nein` → `Status: raw` — das 3-Kurs-Ritual entscheidet später.

   Regel: `Sofort-Promotion-Kandidat?` und `Status` werden **immer** gefüllt, nie leer. So ist im Log sichtbar, ob der Check ausgeführt wurde.

### Audit (nachträgliche Qualitätsprüfung)
Manueller Befehl von Julian: `/kurs-audit [slug]` — implementiert als Claude-Code-Slash-Command in `.claude/commands/kurs-audit.md`, Regelwerk in `CREATOR §14`. Der Audit prüft einen fertigen Kurs in **zwei Perspektiven**: (1) Regel-Check gegen Creator-Regeln, (2) simulierte Lerner-Perspektive (Claude liest den Kurs als Anfänger, prüft Prämisse-Einlösung, Anwendbarkeit, Spaß). Findings werden als neue Sektion an `/content/courses/[slug]/audit-log.md` angehängt (append-only, nie überschrieben). Anschließend fragt Claude per `AskUserQuestion`, ob Nachbesserungen jetzt direkt gemacht werden oder separat. Bei systemischen Findings (nach Fix, nicht vorher) fragt Claude pro Finding einzeln nach, ob ein LEARNINGS-Eintrag entstehen soll. Nicht routinemäßig — nur nach Creator-Updates, vor Refactors oder bei Zweifeln.

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

Das Lern-System sorgt dafür, dass jeder neue Kurs besser wird als der vorherige. Grundlage ist eine **klare Rollenverteilung zwischen vier Dokumenten**, ein schneller Rückfluss-Pfad (Sofort-Promotion) und ein Langsam-Filter (3-Kurs-Ritual) für das, was nicht sofort klar ist.

### Dokument-Rollen (SSoT & Abgrenzung)

| Dokument | Rolle | Wann gelesen | Wann geschrieben |
|---|---|---|---|
| `CLAUDE.md` | **Router** — Workflow-Übersicht, Pre/Post-Flight, Audit-Verweis | Bei Session-Start (automatisch) | Bei strukturellen Änderungen am Workflow |
| `COURSE-CREATOR.md` | **Regelwerk (Single Source of Truth)** — Didaktik, Struktur, Design, Qualitäts-Checkliste §9, Gap-Analyse §11, Anti-Patterns §12, Audit-Protokoll §14 | Pre-Flight jeder Kurs-Erstellung **und** beim Audit | Beim Promovieren (sofort im Post-Flight oder im 3-Kurs-Ritual) |
| `COURSE-LEARNINGS.md` | **Raw Log** der Erfahrungen pro Kurs | Nur beim 3-Kurs-Ritual **oder** direkt nach Post-Flight für Sofort-Promotion-Check | Post-Flight jeder Kurs-Erstellung |
| `/content/courses/[slug]/gap-analysis.md` | **Vorbereitung** eines einzelnen Kurses (Quellen-Mapping) | Pre-Flight (Referenz, falls vorhanden) | Vor Kurs-Erstellung (Pflicht bei kuratierten Quellen) |
| `/content/courses/[slug]/audit-log.md` | **Append-only Audit-Trail** eines einzelnen Kurses (Regel-Check pro Lauf) | Bei Re-Audit als Referenz für vorigen Stand | Bei jedem `/kurs-audit [slug]`-Lauf wird eine neue Sektion unten angehängt |

**Wichtig:** Die Audit-Kriterien leben als `CREATOR §14` — **nicht** in einer separaten Datei. Dadurch ist garantiert, dass Creator-Regeln und Audit-Checks nicht auseinanderdriften.

### Drei Promotions-Wege (schnell, langsam, präventiv)

**Weg 1 — Sofort-Promotion (Post-Flight, nach jedem Kurs):**
Wenn ein Eintrag offensichtlich systemisch ist (Wiederholungsrisiko + Universalität + Prüfbarkeit — siehe Post-Flight Schritt 3 oben), schlägt Claude sofort eine Regel vor. Julian entscheidet. Rückfluss-Latenz: 0 Kurse.

**Weg 2 — Verdichtungs-Ritual (Pre-Flight, vor Kurs 4, 7, 10, 13…):**
Wenn `(N-1) % 3 == 0` und `N ≥ 4`: Claude liest nur Einträge mit Status `raw` oder `proven` (promovierte werden übersprungen — Rauschen raus) und stellt drei Fragen:
- Welches Pattern taucht in ≥2 Kursen auf? → Promotion-Kandidat
- Welcher Fehler wurde wiederholt? → Anti-Pattern-Kandidat
- Was war Einzelfall? → bleibt `raw`

Julian entscheidet per `AskUserQuestion`, was promoviert wird.

**Weg 3 — Promotion (Schreib-Akt):**
Bestätigte Patterns werden als Regel in der passenden `CREATOR`-Sektion ergänzt. Wiederholte Fehler wandern in `CREATOR §12 Anti-Patterns` (mit Lifecycle-Status `hot`/`dormant`/`archived`). Der LEARNINGS-Eintrag wird mit `→ promoted → CREATOR §X.Y` markiert (nicht gelöscht — Genese bleibt nachvollziehbar).
