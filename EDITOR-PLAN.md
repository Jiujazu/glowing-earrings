# Custom Inline Editor — Dokumentation

## Status: Alle Phasen implementiert

Julian kann direkt auf der Kursseite klicken und Inhalte editieren — ohne extra Admin-Panel, ohne Drittanbieter, kostenlos.

## Zugang

URL mit geheimem Token aufrufen:
```
https://glowing-earrings.vercel.app/courses/{slug}?edit=EDITOR_SECRET
```

## Was funktioniert

### Text-Editing
- Alle Textblöcke (ContentBlock, Callout, KeyConcept, ContextBox, ReflectionPrompt, CourseIntro)
- Quiz-Fragen + Erklärungen
- Flashcard Vorder-/Rückseite
- CodeBlock Code-Inhalt
- StepByStep Titel
- TipTap WYSIWYG-Editor (Bold, Italic, Listen, Headings)

### Medien
- **Bilder**: Hover → "Bild ersetzen" oder Drag & Drop. Upload via GitHub API.
- **Videos**: Hover → "Video ändern" → YouTube/Vimeo URL einfügen

### Block-Management
- **Drag & Drop**: Elemente innerhalb eines Moduls umordnen
- **Hinzufügen**: "+" zwischen Elementen → Typ wählen (Text, Callout, Konzept, Kontext, Reflexion, Bild, Video)
- **Löschen**: Papierkorb-Button bei Hover

### Sicherheit
- `EDITOR_SECRET` Token-Validierung auf allen API-Endpoints
- DOMPurify HTML-Sanitization (XSS-Schutz)
- JSON-Validierung für strukturelle Änderungen
- SHA-basierte Konflikt-Erkennung bei parallelen Edits

## Architektur

```
components/editor/
  EditModeProvider.tsx    — React Context (Edit-State, Token, Pending Changes)
  EditModeWrapper.tsx     — Suspense Boundary
  EditableText.tsx        — TipTap Wrapper (Markdown ↔ HTML Roundtrip)
  EditableImage.tsx       — Bild-Upload mit Drag & Drop
  EditableVideo.tsx       — Video-URL-Input mit Auto-Erkennung
  SaveButton.tsx          — Floating Save mit Cmd+S
  SortableElement.tsx     — Drag Handle + Delete Button
  AddElementButton.tsx    — "+" mit Typ-Picker

app/api/editor/
  save/route.ts           — JSON-Änderungen via Octokit committen
  upload/route.ts         — Bilder via Octokit committen

lib/
  editor-auth.ts          — Token-Validierung
  prose-classes.ts        — Shared Prose CSS-Klassen
```

## Abhängigkeiten
- `@tiptap/react` + `@tiptap/starter-kit` + `@tiptap/pm` — Rich-Text Editor
- `octokit` — GitHub API Commits
- `marked` — Markdown → HTML
- `turndown` — HTML → Markdown
- `dompurify` — HTML Sanitization
- `@dnd-kit/core` + `@dnd-kit/sortable` — Drag & Drop

## Environment Variables
- `GITHUB_TOKEN` — GitHub PAT (contents:write)
- `EDITOR_SECRET` — Geheimer Edit-Token

## Was unverändert bleibt
- JSON-Format in content/courses/ — identisch
- Claude-Workflow — Claude schreibt weiterhin JSON
- SSG Build — Edit-Modus ist client-side only
- Normale Besucher — sehen keinen Editor, kein Extra-Code geladen
