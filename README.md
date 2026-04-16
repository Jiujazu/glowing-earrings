# Glowing Earrings — The Creative AI Academy

Kostenlose, interaktive Kurse zu KI, Tech und Kreativität. Kuratiert von Julian van Dieken.

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSG)
- **Sprache:** TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Vercel
- **Kurs-Content:** TypeScript-Dateien in `/content/courses/`

## Entwicklung

```bash
npm install
npm run dev
```

## Neuen Kurs hinzufügen

1. Erstelle eine TypeScript-Datei in `/content/courses/mein-kurs.ts` (siehe `karpathy-llm-wiki.ts` als Vorlage)
2. Importiere und registriere den Kurs in `/content/courses/index.ts`
3. `git push` — Vercel deployed automatisch

## Projektstruktur

```
app/              -> Seiten (Next.js App Router)
components/       -> React-Komponenten
  layout/         -> Header, Footer, Newsletter
  course/         -> CoursePlayer, Kurs-Elemente
  ui/             -> Shared UI-Primitives
content/courses/  -> Kurs-Daten als TypeScript
lib/              -> Types, Utilities, Newsletter-Client
public/           -> Statische Assets
```
