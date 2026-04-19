# Audit-Log: Handy App

> Append-only Audit-Trail für Kurs `handy-speech-to-text`. Jeder Audit-Lauf wird als neue Sektion unten angehängt. Alte Sektionen bleiben unverändert — der Verlauf ist Teil des Lern-Systems.

---

## Audit 2026-04-19

- **Creator-Version:** eeeede8
- **Auditor:** Claude
- **Anlass:** ad hoc (Erst-Audit)

### Zusammenfassung

- **Findings:** 6 total (3 kritisch ❌, 3 Warnungen ⚠️)
- **Status:** Nachbesserung nötig
- **Vergleich zu letztem Audit:** entfällt beim Erst-Audit

### Regel-Check

| Kategorie | Regel (Creator §) | Status | Stelle im Kurs | Notiz |
|---|---|---|---|---|
| Struktur | §4.1 Intro | ✅ | intro | hook + sourceContext + sourceUrl vorhanden |
| Struktur | §4.2 Modul-Anzahl/-Länge | ✅ | 4 Module à 2–3 Min | Summe 11 Min (meta sagt 12, realistisch) |
| Struktur | §4.7 Outro | ✅ | outro | synthesis (4), nextStep, takeaway (5), newsletterCTA |
| Struktur | §5.4 relatedCourses gegenseitig | ❌ | meta.relatedCourses | `agentic-os-context-levels` ist gesetzt, aber der andere Kurs listet `handy-speech-to-text` nicht zurück |
| Inhalt | §3.1 Tonfall snack-sized | ✅ | — | Du-Ansprache, kurz, warmherzig |
| Inhalt | §3.2 Quelltreue | ✅ | — | Zahlen (17.000 Stars, 5x Echtzeit, 600 MB) korrekt übernommen |
| Inhalt | §3.3 Scaffolding | ✅ | m1, m2 | Whisper/Parakeet knapp erklärt, Push-to-Talk/Toggle erläutert |
| Inhalt | §3.4 Externes Framework | n/a | — | kein Framework verwendet |
| Elemente | §4.3 Min 2 Quizzes | ✅ | m1-quiz (3 Optionen), m3-quiz (4 Optionen) | plausible Distraktoren, individuelles Feedback, explanation je Reveal |
| Elemente | §4.4 Min 3 Flashcards | ✅ | m2-flashcard-1, m3-flashcard-1, m4-flashcard | Warum-Format durchgängig |
| Elemente | §4.5 Min 1 Reflexion | ✅ | m3-reflection | Praxisbezug mit Placeholder |
| Elemente | §3.5 Min 1 Easter Egg | ✅ | m4-easter-egg | hover-trigger, thematisch passend |
| Elemente | §1.5 Min 1 Key-Concept | ❌ | — | Kein einziges `key-concept`-Element im Kurs. Pflicht-Minimum verletzt |
| Elemente | §4.2 Element-Reihenfolge variiert | ⚠️ | — | M1 und M2 strukturell ähnlich (content → content → quiz/flashcard am Ende). M3 und M4 brechen es auf. Grenzwertig |
| Elemente | §6.4/6.5 SVGs | n/a | — | Cover-SVG vorhanden; in-course sind bewusst Screenshots, nicht Abstraktionen |
| Meta | §8.1 Schwierigkeit | ✅ | meta.difficulty=beginner | passt zum Tool-Thema |
| Meta | §8.2 Tags spezifisch | ⚠️ | meta.tags | `Diktat` und `Privacy` ok, `Tools` generisch (§12.5 hot) |
| Meta | §8.3 Zeitschätzung | ✅ | meta.estimatedMinutes=12 | Modulsumme 11, Puffer realistisch |
| Meta | §8.4 Drei-Ebenen-Titel | ✅ | meta.title/subheading/subtitle | alle drei vorhanden |
| Mobile & Design | §2.1 Absatzlänge | ✅ | — | Stichprobe: max 3 Sätze pro Absatz |
| Mobile & Design | §2.2 Optische Gewichtungen | ✅ | — | `###`-Headings, Bold, Listen systematisch eingesetzt |
| Mobile & Design | §2.3 Keine 3 Boxen hintereinander | ✅ | — | Fließtext dominiert, Callout nur 1x (m2) |
| Mobile & Design | §6.1 Theme-Charakter | ✅ | meta.design.theme=handy-minimal | grün/gelb Tool-Theme, passend für Open-Source-Tool |
| Mobile & Design | §6.3 Kontrast | ✅ | — | Dark: `#F5F5F4` auf `#111110`, gut lesbar |
| Mobile & Design | §6.8 Reale Screenshots | ✅ | m1-image-hero, m2-image-general, m2-image-models, m4-image-advanced, m4-image-postprocess | 5 echte UI-Screenshots + Hero, keine Stock-Grafik |
| Schreibstil | §9 Em-Dashes | ❌ | kursweit | 31 Em-Dashes im JSON — als Stilmittel durchgängig. Anti-AI-Writing verletzt |
| Schreibstil | §9 „Nicht X, sondern Y" | ✅ | — | nur 1x als „nicht nur, sondern auch"-Variante (akzeptabel) |
| Schreibstil | §9 KI-Marker-Wörter | ✅ | — | keine `entscheidend`/`wegweisend`/`maßgeblich` etc. gefunden |
| Schreibstil | §9 Bedeutungs-Aufblähung | ✅ | — | nüchtern, keine „Meilensteine" |
| Schreibstil | §9 Partizip-Anhängsel | ✅ | — | nicht verwendet |
| Schreibstil | §9 Aktiv/Passiv | ✅ | — | klare Subjekte |
| Technik | §10 sourceType-Wert | ✅ | meta.sourceType=tool | `tool` ist in `lib/types.ts` als Enum-Wert zulässig |
| Technik | §10 sourceType-Badge nicht im UI | ✅ | — | nur interne Metadaten |
| Technik | §10 weitere Punkte | n/a | — | opengraph, ReactMarkdown, Z-Index etc. sind Plattform-Code, nicht Kurs-Artefakt |
| Artefakte | §11.3 Gap-Analyse | ⚠️ | — | `gap-analysis.md` fehlt. Borderline: handy.computer ist Tool-Website, nicht langer Artikel — §11.2-Ausnahme grenzwertig anwendbar |
| Artefakte | §6.6 source.md | ⚠️ | source.md | Header vorhanden, Inhalt leer (`<!-- Website-Inhalt oder Dokumentation hier einfügen -->`). Transkript-Verifizierung (§6.7) damit nachträglich nicht reproduzierbar |
| Anti-Pattern | §12.1 JSON in Teilen | n/a | — | nachträglich nicht prüfbar |
| Anti-Pattern | §12.2 SVG-Pfeile | n/a | — | keine In-Kurs-SVGs mit Pfeilen |
| Anti-Pattern | §12.3 Bildunterschrift-Check | ✅ | — | Captions plausibel zu dem, was die Screenshot-Alt-Texte beschreiben |
| Anti-Pattern | §12.4 Gap-Analyse | ⚠️ | — | siehe §11.3 oben |
| Anti-Pattern | §12.5 Generische Tags | ⚠️ | meta.tags[1]=`Tools` | generisch, sollte ersetzt werden (z.B. `Whisper`, `Speech-to-Text`, `Offline`) |
| Anti-Pattern | §12.6 Drei Boxen hintereinander | ✅ | — | nicht verletzt |
| Anti-Pattern | §12.7 Emoji-Inflation | ✅ | outro.takeaway | Emojis ausschließlich im Takeaway (5 Stück), regelkonform |
| Anti-Pattern | §12.8 Erfundene Frameworks | ✅ | — | keine externen Frameworks eingeflochten |

### Empfohlene Nachbesserungen

1. **[Kritisch]** Mindestens ein `key-concept`-Element ergänzen — z.B. in Modul 1 als zentrale Card „Lokale Sprache-zu-Text" oder in Modul 2 „Push-to-Talk vs. Toggle" (§1.5, §4.2).
2. **[Kritisch]** Em-Dashes (—) kursweit durch Komma, Punkt oder Doppelpunkt ersetzen. 31 Vorkommen im JSON. Betroffen sind Intro-Hook, Modul-Texte, Flashcard-Rückseiten, Outro-Synthese, Takeaway (§9, Anti-AI-Writing).
3. **[Kritisch]** In `agentic-os-context-levels/course.json` den Slug `handy-speech-to-text` zu `meta.relatedCourses` hinzufügen, damit die Verlinkung gegenseitig greift (§5.4).
4. **[Warnung]** `meta.tags` — den Tag `Tools` durch etwas Spezifischeres ersetzen. Kandidaten: `Whisper`, `Speech-to-Text`, `Offline`, `Parakeet` (§8.2, §12.5).
5. **[Warnung]** `gap-analysis.md` im Kurs-Ordner anlegen, falls die handy.computer-Website als kuratierte Quelle behandelt wird. Alternativ bewusste Entscheidung („§11.2-Ausnahme: Tool-Website < 500 Wörter") im `source.md` dokumentieren (§11.3).
6. **[Warnung]** `source.md` mit dem tatsächlichen Website-Inhalt oder einem Link-Set zu den relevanten Abschnitten befüllen. Ohne Inhalt ist §6.7 Transkript-Verifizierung nicht reproduzierbar (§6.6).

### Systemische Findings (an LEARNINGS gemeldet?)

- **§1.5 Pflicht-Minimum Key-Concept nicht erfüllt** → Julian: ja, LEARNINGS-Eintrag angelegt (`audit handy-speech-to-text 2026-04-19`). Sofort-Promotion: alle 3 Fragen ja → Julian wählt automatischen Grep-Check. **Promoviert nach CREATOR §9** (neue Checkliste: Pflicht-Minima per `rg -c`-Befehlen verifizieren, vor Commit auszuführen). §14.2 synchron erweitert.
- **§9 Em-Dash-Inflation (31 Em-Dashes)** → Julian: nein, Einzelfall (Anti-AI-Regel existiert bereits in §9 + Skill).
- **§5.4 relatedCourses-Reziprozität nicht automatisch geprüft** → Julian: nein, Einzelfall (§5.4 existiert bereits).
- **§6.6 source.md als leerer Stub veröffentlicht** → Julian: nein, Einzelfall (§6.6 + §9-Quelldateien-Check existieren bereits).
- **Meta-Workflow: Audit-Fragen-Stil zu jargonlastig** → Julian: ja, separater LEARNINGS-Eintrag `Workflow-Audit: Audit-Fragen-Stil 2026-04-19`. Status `raw`, Promotion-Kandidat für CLAUDE.md Post-Flight + CREATOR §14.3. Wartet auf späteres Verdichtungs-Ritual.

### Nicht gefixt / bewusst offen gelassen

- Keine Nachbesserungen im `course.json` — das Audit schreibt per Protokoll nur `audit-log.md`. Julian entscheidet, ob und wann die Fixes in einem separaten Task umgesetzt werden.
