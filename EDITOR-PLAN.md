# Custom Inline Editor für Kurse

## Context
Sveltia CMS und TinaCMS sind beide zu sperrig oder zu teuer. Julian will direkt auf der Kursseite klicken und Texte editieren, Bilder hochladen, Videos einbetten — ohne extra Admin-Panel, ohne Drittanbieter, kostenlos.

## Ansatz: Custom Inline Editor in Phasen

### Phase 1: Text-Editing (MVP)
**Ziel:** Julian klickt auf einen Text im Kurs → Text wird editierbar → Speichern → Live

**Neue Dateien:**
- `components/editor/EditModeProvider.tsx` — Context für Edit-Mode State (eingeloggt? Edit aktiv?)
- `components/editor/EditableText.tsx` — Wrapper um Text-Elemente mit contentEditable
- `components/editor/EditToolbar.tsx` — Floating Toolbar (Bold, Italic, Heading, Liste) basierend auf TipTap
- `components/editor/SaveButton.tsx` — Speichern-Button der via API committed
- `app/api/editor/save/route.ts` — API Route: nimmt geänderten Kurs-JSON, committed via GitHub API (Octokit)
- `app/api/editor/auth/route.ts` — Prüft ob User eingeloggt ist (GitHub OAuth, bereits vorhanden)

**Geänderte Dateien:**
- `components/course/elements/ContentBlock.tsx` — Wrappen mit EditableText im Edit-Mode
- `components/course/elements/Callout.tsx` — Text editierbar machen
- `components/course/elements/QuizCard.tsx` — Frage/Feedback editierbar
- `components/course/elements/FlashcardDeck.tsx` — Front/Back editierbar
- `components/course/CoursePlayer.tsx` — EditModeProvider einbinden
- `components/course/CourseIntro.tsx` — Hook/SourceContext editierbar

**Ablauf:**
1. Julian besucht `/courses/handy-speech-to-text`
2. Oben rechts: "Bearbeiten"-Button (nur sichtbar wenn eingeloggt)
3. Klick → Edit-Mode aktiviert: Texte bekommen blauen Rahmen bei Hover
4. Klick auf Text → TipTap Editor öffnet inline (Bold, Italic, Listen, Headings)
5. Änderungen werden im lokalen State gehalten
6. "Speichern"-Button → API Route → GitHub API committed geändertes JSON → Vercel redeploys

**Technologie:**
- TipTap Editor (Open Source, MIT, Notion-artig) für Rich-Text
- Octokit (GitHub API Client) für Commits
- Vercel Blob (Free Tier, 500MB) für Bild-Uploads in Phase 2
- Bestehender GitHub OAuth für Auth

### Phase 2: Bild-Upload
**Ziel:** Julian klickt auf ein Bild → tauscht es aus oder fügt neues ein

- Drag & Drop Zone auf Image-Elementen
- Upload zu Vercel Blob → URL zurück → JSON updaten
- Neues Image-Element einfügen per "+" Button zwischen Elementen

### Phase 3: Video-Embed
**Ziel:** Julian fügt YouTube/Vimeo-URLs ein

- URL-Eingabefeld → automatisch Video-Element erstellen
- Vorschau des Videos inline

### Phase 4: Element-Management
**Ziel:** Elemente neu anordnen, löschen, neue hinzufügen

- Drag & Drop Reihenfolge
- "+" Button zwischen Elementen zum Hinzufügen
- Typ-Auswahl (Text, Quiz, Flashcard, Bild, Video, etc.)

## Abhängigkeiten
- `@tiptap/react` + `@tiptap/starter-kit` — Rich-Text Editor
- `octokit` — GitHub API für Commits
- `@vercel/blob` — Bild-Upload (Phase 2)

## Was bleibt unverändert
- JSON-Dateien in content/courses/ — Format bleibt identisch
- Claude-Workflow — Claude schreibt weiterhin direkt JSON
- Alle bestehenden Komponenten — nur Wrapper um EditableText
- SSG Build — Edit-Mode ist client-side only, keine Build-Änderungen

## Risiken & Edge Cases
- **Markdown ↔ HTML Konvertierung:** TipTap arbeitet mit HTML, unsere JSON-Dateien mit Markdown. Braucht Konverter (turndown für HTML→MD, marked für MD→HTML)
- **Parallele Edits:** Wenn Claude und Julian gleichzeitig editieren → Merge-Konflikte. Lösung: Optimistic Locking (prüfe SHA vor Commit)
- **Undo/Redo:** TipTap hat eingebautes Undo/Redo für Text. Für strukturelle Änderungen (Phase 4) braucht es eigenen History-Stack.

## Verifizierung
1. Edit-Mode aktivieren → Texte sind klickbar
2. Text ändern → Bold/Italic/Listen funktionieren
3. Speichern → GitHub zeigt neuen Commit
4. Vercel redeploys → Änderung live auf der Seite
