# Glowing Earrings — Platform Review

> Stand: 2026-04-12 | Basierend auf Code-Analyse + Input von Julian

---

## Zusammenfassung

Die Plattform hat ein **solides technisches Fundament**: Next.js 15 mit SSG, saubere TypeScript-Typen, ein durchdachtes Kurs-Datenmodell, und eine klare Dokumentation (CLAUDE.md, COURSE-STYLEGUIDE.md, LEARNINGS.md). Der erste Kurs (Karpathy LLM Wiki) zeigt, dass das Konzept funktioniert.

**Aber:** Für 10-30 Kurse in 12 Monaten fehlen mehrere Features, die ab Kurs 3-4 zum Engpass werden. Dieses Review identifiziert die Lücken und priorisiert konkrete nächste Schritte.

---

## 1. Was gut funktioniert

| Bereich | Bewertung |
|---|---|
| **Kurs-Datenmodell** | Sauber, typsicher, erweiterbar. Element-Union-Type macht neue Element-Typen einfach hinzufügbar. |
| **Design-System** | CSS Custom Properties pro Kurs sind elegant. Jeder Kurs fühlt sich anders an, ohne dass die Komponenten dupliziert werden. |
| **Didaktisches Framework** | COURSE-STYLEGUIDE.md ist exzellent — klare Prinzipien, konkrete Regeln, Qualitäts-Checkliste. |
| **Lern-System** | LEARNINGS.md als wachsendes Dokument ist ein starkes Pattern. Verhindert wiederholte Fehler. |
| **SSG** | Statische Generierung sorgt für schnelle Ladezeiten und einfaches Hosting. Perfekt für die Skalierung. |
| **SEO** | JSON-LD Structured Data, OpenGraph-Tags, Sitemap — gut abgedeckt. |
| **Accessibility** | `prefers-reduced-motion` wird respektiert, Focus-Styles sind da, WCAG AA als Regel im Styleguide. |

---

## 2. Was fehlt — priorisiert nach Impact

### P0 — Vor dem nächsten Kurs lösen

#### 2.1 Bilder in Kursen

**Problem:** Das Type-System hat keinen `image`-Element-Typ. Für Kurse basierend auf visuellen Quellen (Julian-Videos, Tutorials, Workflow-Demos) sind Bilder unverzichtbar.

**Vorschlag:** Neuen Element-Typ `image` hinzufügen:

```typescript
export interface ImageElement extends BaseElement {
  type: "image";
  src: string;           // Pfad relativ zu /public/courses/[slug]/
  alt: string;           // Pflicht — Accessibility
  caption?: string;      // Optionale Bildunterschrift
  width?: number;        // Aspect ratio hint
  height?: number;
  fullWidth?: boolean;   // Ragt über den Content-Container hinaus
}
```

**Bild-Workflow:** Julian will Drag & Drop im Browser. Zwei Optionen:
- **Kurzfristig:** Bilder in `/public/courses/[slug]/` ablegen, im Code referenzieren. Next.js `<Image>` für Optimierung.
- **Mittelfristig:** Upload-Tool (z.B. Vercel Blob oder Cloudinary) mit Drag & Drop UI für Julian.

**Aufwand:** ~2-3 Stunden für den Element-Typ + Renderer. Upload-Tool separat.

#### 2.2 Kurs-Katalog wird unbrauchbar ab 6+ Kursen

**Problem:** Der Katalog (`/courses`) ist ein flaches Grid ohne Filter, Suche oder Kategorisierung. Bei 10-30 Kursen findet man nichts mehr.

**Vorschlag:**
1. **Tag-Filter:** Clickbare Tag-Badges über dem Grid. Filtert Kurse nach Tags.
2. **Schwierigkeits-Filter:** Beginner / Fortgeschritten / Experte — als Tabs oder Toggle.
3. **Säulen-Navigation:** Die 4 Content-Säulen (KI-Technologie, KI+Kreativität, KI+Gesellschaft, KI-Workflows) als Haupt-Kategorien auf der Katalog-Seite.

**Kein Suchfeld nötig** bei 10-30 Kursen — Filter reichen.

**Aufwand:** ~4-6 Stunden für Tag- und Schwierigkeits-Filter.

---

### P1 — Innerhalb der nächsten 5 Kurse angehen

#### 2.3 Kurs-Kategorie im Datenmodell

**Problem:** `CourseMeta` hat `tags`, aber keine dedizierte `category`. Die 4 Säulen aus dem COURSE-STYLEGUIDE existieren nur als Dokumentation, nicht im Code.

**Vorschlag:** `category` als Pflichtfeld in `CourseMeta`:

```typescript
category: "ai-tech" | "ai-creativity" | "ai-society" | "ai-workflows";
```

Das ermöglicht Katalog-Gruppierung und Lernpfade.

#### 2.4 Fortschritts-Tracking (Client-Side)

**Problem:** Kein Lernfortschritt wird gespeichert. Wenn ein User einen Kurs verlässt und wiederkommt, startet er von vorn.

**Vorschlag:** Leichtgewichtiges localStorage-Tracking:
- Welche Module wurden gescrollt/besucht
- Welche Quizzes wurden beantwortet
- Letzter Scroll-Position
- Visuelles Feedback auf der Katalog-Seite (z.B. Fortschrittsbalken auf der CourseCard)

**Kein Account-System nötig.** localStorage reicht für anonyme User.

**Aufwand:** ~4-5 Stunden.

#### 2.5 Video-Embed Element

**Problem:** Julian-Kurse basieren auf YouTube-Videos. Es gibt keinen `video`-Element-Typ.

**Vorschlag:**

```typescript
export interface VideoElement extends BaseElement {
  type: "video";
  platform: "youtube" | "vimeo";
  videoId: string;
  title?: string;
  startAt?: number;     // Sekunden — springt zum relevanten Abschnitt
}
```

Lazy-loaded YouTube-Embed mit Thumbnail-Placeholder (Performance). Das vermeidet auch, dass YouTube-iframes sofort geladen werden.

**Aufwand:** ~2-3 Stunden.

#### 2.6 Code-Block Element

**Problem:** Für technische Kurse (Prompt Engineering, API-Nutzung, Workflow-Automation) fehlt ein dedizierter Code-Block mit Syntax-Highlighting.

**Vorschlag:**

```typescript
export interface CodeBlockElement extends BaseElement {
  type: "code-block";
  code: string;
  language?: string;     // z.B. "python", "typescript", "bash"
  filename?: string;     // Optionaler Dateiname
  highlightLines?: number[];  // Hervorgehobene Zeilen
}
```

Aktuell wird Code über Markdown in `content`-Elementen dargestellt. Ein dedizierter Block ermöglicht besseres Styling, Copy-Button und Syntax-Highlighting.

**Aufwand:** ~3-4 Stunden (mit z.B. Shiki oder Prism).

---

### P2 — Nice-to-have für die nächsten 6 Monate

#### 2.7 OG-Images pro Kurs

**Problem:** Kein individuelles Social-Sharing-Bild pro Kurs. `public/og/` existiert, ist aber leer.

**Vorschlag:** Automatische OG-Image-Generierung via Next.js `ImageResponse` (Edge-API). Template mit Kurs-Titel, Autor und Theme-Farben.

#### 2.8 Kurs-Vernetzung im UI

**Problem:** Der COURSE-STYLEGUIDE empfiehlt Kurs-Querverweise, aber es gibt keine Komponente dafür. `transitionToNext` ist ein String-Feld — es gibt keine automatische Verlinkung zu verwandten Kursen.

**Vorschlag:**
- `relatedCourses?: string[]` (Slugs) in `CourseMeta`
- Am Kursende eine "Weiter lernen"-Sektion mit verlinkten Kurs-Cards
- In `transitionToNext` könnten Slugs als `[[kurs-slug]]` Notation eingebettet und automatisch verlinkt werden

#### 2.9 Newsletter-Provider wählen

**Problem:** Die Newsletter-Integration (`lib/newsletter.ts`) ist abstrakt — kein Provider angebunden. Die API-Route gibt aktuell `501 Not Implemented` zurück.

**Empfehlung:** Buttondown (minimalistisch, DSGVO-freundlich, kostenlos bis 100 Subscriber) oder ConvertKit (wächst besser mit). Entscheidung sollte bald fallen — CTA existiert überall, funktioniert aber nicht.

#### 2.10 Kurs-Vorschau / Teaser-Modus

**Problem:** Kein Preview für unveröffentlichte Kurse. Julian kann neue Kurse nur lokal prüfen oder direkt deployen.

**Vorschlag:** `draft: boolean` in `CourseMeta`. Draft-Kurse werden im Katalog nicht angezeigt, sind aber unter `/courses/[slug]?preview=true` erreichbar.

---

## 3. Architektur-Bewertung für 10-30 Kurse

### Was skaliert gut

| Aspekt | Status |
|---|---|
| **Kurs als TypeScript-Datei** | Funktioniert bis ~50 Kurse problemlos. Kein CMS nötig. |
| **SSG** | Skaliert hervorragend — Build-Zeit wächst linear, aber bleibt schnell. |
| **CSS Custom Properties** | Jeder Kurs eigenes Theme — keine Konflikte bei 30 Kursen. |
| **Element-Union-Type** | Neue Element-Typen hinzufügen ist ein Add-Only-Change, keine Breaking Changes. |

### Was Aufmerksamkeit braucht

| Aspekt | Risiko | Lösung |
|---|---|---|
| **Kurs-Registry** | `index.ts` wird lang mit 30 Importen | Auto-Import via `fs.readdirSync` oder dynamischer Import |
| **Bundle Size** | Alle Kurse werden im Bundle inkludiert (SSG baut alle, aber JS-Bundle enthält nur den aktuellen Kurs) | Kein Problem dank SSG + Code-Splitting |
| **Bild-Assets** | Ohne Konvention (`/public/courses/[slug]/`) wird es chaotisch | Convention jetzt festlegen und dokumentieren |
| **Tag-Konsistenz** | Freie Tags ohne zentrale Liste → Typos, Duplikate | Enum oder zentrale Tag-Liste einführen |

---

## 4. Type-System-Empfehlungen

### Sofort umsetzbar

1. **`ImageElement` hinzufügen** (siehe P0 oben)
2. **`category` in `CourseMeta`** als Pflichtfeld
3. **`draft` in `CourseMeta`** als optionales Boolean
4. **`relatedCourses` in `CourseMeta`** als optionales String-Array (Slugs)

### Mittelfristig

5. **`VideoElement` hinzufügen** für Julian-Kurse
6. **`CodeBlockElement` hinzufügen** für technische Kurse
7. **`StepByStepElement`** für Tutorials und Anleitungen:

```typescript
export interface StepByStepElement extends BaseElement {
  type: "step-by-step";
  title?: string;
  steps: {
    label: string;
    content: string;      // Markdown
    image?: string;        // Optional: Screenshot pro Schritt
  }[];
}
```

Passt perfekt zu Julians Priorität: "Praxisrelevante Tipps, Tutorials und Anleitungen".

---

## 5. Content-Workflow-Bewertung

### Aktuell

```
Julian liefert Quelle → Claude erstellt TypeScript-Datei → Git Push → Vercel deployed
```

**Stärken:** Schnell, versioniert, typsicher, kein CMS-Overhead.
**Schwächen:** Julian kann Kurse nicht selbst editieren (ohne Code). Bilder müssen manuell in Repo gelegt werden.

### Empfehlung

Den TypeScript-Workflow beibehalten — er ist für 10-30 Kurse ideal. **Aber:**

1. **Bild-Convention festlegen:** `/public/courses/[slug]/` als Standard
2. **Kurs-Erstellung standardisieren:** Ein Claude-Prompt-Template, das aus einer Quelle direkt den fertigen Kurs generiert (inkl. Qualitäts-Checkliste)
3. **Preview-Modus** für Julian zum Prüfen vor dem Merge

---

## 6. Empfohlene Reihenfolge

| Prio | Was | Warum | Geschätzter Aufwand |
|---|---|---|---|
| 1 | `ImageElement` + Renderer | Bilder sind Pflicht für Julian-Kurse | 2-3h |
| 2 | `category` in CourseMeta | Fundament für Katalog-Navigation | 30min |
| 3 | Tag/Schwierigkeits-Filter im Katalog | UX wird ab Kurs 4 nötig | 4-6h |
| 4 | localStorage Progress-Tracking | User-Retention, wiederkehrende Besucher | 4-5h |
| 5 | `VideoElement` + Renderer | Julian-YouTube-Kurse | 2-3h |
| 6 | Newsletter-Provider anbinden | CTA existiert, funktioniert aber nicht | 2-3h |
| 7 | OG-Images pro Kurs | Social Sharing verbessern | 3-4h |
| 8 | `CodeBlockElement` mit Syntax-Highlight | Technische Kurse | 3-4h |
| 9 | `StepByStepElement` | Tutorials und Anleitungen | 3-4h |
| 10 | `draft`-Modus + Preview | Workflow-Verbesserung | 2h |
| 11 | Kurs-Vernetzung im UI | Lernpfade sichtbar machen | 3-4h |
| 12 | Auto-Import für Kurs-Registry | Convenience ab 10+ Kursen | 1h |

---

## 7. Was NICHT nötig ist

| Vorschlag | Warum nicht |
|---|---|
| **CMS (Contentful, Sanity, etc.)** | Overkill für 10-30 Kurse. TypeScript-Dateien + Claude ist schneller und typsicherer. |
| **User-Accounts / Auth** | Kein Mehrwert für kostenlose, offene Kurse. localStorage reicht für Fortschritt. |
| **Suchfeld** | Bei 10-30 Kursen reichen Filter. Suche lohnt sich ab 50+ Kursen. |
| **PWA / Offline** | Julian will online-only. Kein Aufwand nötig. |
| **i18n / Mehrsprachigkeit** | Kurse sind individuell deutsch oder englisch. Kein Framework nötig. |
| **Analytics** | DSGVO-konform = kein Tracking. Falls gewünscht: Plausible oder Umami. |
| **Testing-Framework** | Bei SSG-Kursen ohne Business-Logik: Visuelles Testen + Build reicht. |

---

## Fazit

Die Plattform ist **technisch solide und didaktisch durchdacht**. Das Fundament trägt 30 Kurse, wenn die Lücken aus P0/P1 geschlossen werden. Die wichtigsten nächsten Schritte:

1. **Bilder möglich machen** — ohne Bilder keine Julian-Kurse
2. **Katalog navigierbar machen** — Filter für Tags und Schwierigkeit
3. **Fortschritt speichern** — damit User zurückkommen

Der Rest sind Verfeinerungen, die organisch mit dem Content-Wachstum kommen können.
