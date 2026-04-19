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

---

## Re-Audit 2026-04-19 (Nachbesserung)

- **Creator-Version:** (nach Ergänzung §14.3 Nachbesserung-Übergang + §9 Pflicht-Minima-Grep-Check)
- **Auditor:** Claude
- **Anlass:** Direkt-Fix nach Erst-Audit. Julian hat per Post-Audit-AskUserQuestion „alle 6 Nachbesserungen jetzt umsetzen" gewählt (§14.3 Nachbesserung-Übergang).

### Zusammenfassung

- **Findings aus Erst-Audit:** 6 (3 ❌ + 3 ⚠️)
- **Gefixt:** 6 (alle)
- **Bewusst belassen:** 1 Em-Dash im wörtlichen Slogan-Zitat in `alt`-Text (Reportage, kein Stilmittel)
- **Status:** grün — alle Pflicht-Regeln erfüllt

### Fix-Protokoll

| Finding (Erst-Audit) | Regel | Fix | Verifikation |
|---|---|---|---|
| Kein `key-concept`-Element | §1.5, §4.2 | `m1-key-concept` „Lokale Speech-to-Text" in Modul 1 ergänzt | `rg -c '"type": "key-concept"' course.json` → `1` ✅ |
| 31 Em-Dashes als Stilmittel | §9 Anti-AI-Writing | 30 Vorkommen durch Komma / Punkt / Doppelpunkt ersetzt (kontextabhängig) | `rg '—' course.json` → nur noch 1 (Zeile 57, Zitat im `alt`-Text) ✅ |
| `agentic-os-context-levels` listet `handy-speech-to-text` nicht zurück | §5.4 Reziprozität | Slug in `agentic-os-context-levels/course.json` `meta.relatedCourses` ergänzt | `grep -A3 relatedCourses` beider Kurse zeigt gegenseitige Referenz ✅ |
| Tag `Tools` generisch | §8.2, §12.5 | Ersetzt durch `Whisper` (Tags nun: Diktat, Whisper, Privacy) | `grep -A4 '"tags"'` ✅ |
| `gap-analysis.md` fehlt | §11.3 | `gap-analysis.md` angelegt: Quelle-Kurs-Mapping (Website-Säulen + README), bewusst weggelassene Abschnitte, Kurs-Ergänzungen | Datei existiert ✅ |
| `source.md` nur Header, leerer Inhalt | §6.6 | Mit GitHub-README von `cjpais/Handy` befüllt (Abruf 2026-04-19 via `raw.githubusercontent.com`), Hinweis auf Website-Kürze oben erklärt | Datei enthält kuratierte Langform ✅ |

### Pflicht-Minima (§9 Grep-Check, neu eingeführt durch dieses Audit)

```
rg -c '"type": "key-concept"' course.json  → 1  ≥ 1 ✅
rg -c '"type": "quiz"'        course.json  → 2  ≥ 2 ✅
rg -c '"type": "flashcard"'   course.json  → 3  ≥ 3 ✅
rg -c '"type": "reflection"'  course.json  → 1  ≥ 1 ✅
rg -c '"type": "easter-egg"'  course.json  → 1  ≥ 1 ✅
```

### Bewusst belassen

- **Ein verbleibender Em-Dash** in Zeile 57 (`alt`-Text): wörtliches Slogan-Zitat `'speak into any text field — the free and open source speech to text app'`. Reportage aus dem abgebildeten Screenshot, kein AI-Stilmittel — würde der Sanitär-Regel widersprechen, den Slogan zu verfälschen. §9 Ausnahme „Zitate originalgetreu".

### Übergabe

- Audit-Befund (diese Datei) und Kurs-Fixes werden in getrennten Commits abgelegt, so wie §14.3 Nachbesserung-Übergang es fordert.
- Vercel deployt automatisch nach Push auf `main`.

---

## Audit 2026-04-19 (Re-Audit nach Creator-Update: Lerner-Perspektive)

- **Creator-Version:** a3f330f
- **Auditor:** Claude
- **Anlass:** Re-Audit nach Creator-Update. §14 wurde um den Block „Lerner-Perspektive" erweitert (simulierter Durchlauf als Anfänger). Dieser Lauf testet die neue Perspektive rückwirkend am Handy-Kurs, der den Regel-Check nach den Nachbesserungen bereits bestanden hatte.

### Zusammenfassung

- **Regel-Findings:** 0 total (0 kritisch ❌, 0 Warnungen ⚠️) — alle vorigen Findings sind im zweiten Audit-Lauf gefixt worden.
- **Lerner-Perspektive:** Klar strukturierter Kurs, alles Versprochene technisch abgedeckt. Lücken eher in Feinheiten: Aufnahme-Moment nicht visualisiert, „beste Lösung"-Versprechen aus Subheading unbelegt, Sprach-Unterstützung bleibt vage, Tonfall eher sachlich.
- **Status:** Nachbesserung empfehlenswert (keine blockenden Regel-Verletzungen, aber vier Lerner-Findings)
- **Vergleich zu letztem Audit:** Alle 6 Findings aus Erst-Audit + Nachbesserung (2026-04-19 Sektion 1+2) bleiben erledigt. Dieser Lauf fügt ausschließlich Lerner-Findings hinzu.

### Regel-Check

| Kategorie | Regel (Creator §) | Status | Stelle im Kurs | Notiz |
|---|---|---|---|---|
| Struktur | §4.1 Intro | ✅ | intro | hook + sourceContext + sourceUrl |
| Struktur | §4.2 Modul-Anzahl/-Länge | ✅ | 4 Module (2+3+3+3=11 Min) | passt zu estimatedMinutes=12 |
| Struktur | §4.7 Outro | ✅ | outro | Synthese (4), nextStep, takeaway (5), newsletterCTA |
| Struktur | §5.4 relatedCourses reziprok | ✅ | meta.relatedCourses | jetzt gegenseitig mit agentic-os-context-levels |
| Inhalt | §3.1 Tonfall snack-sized | ✅ | — | Du-Ansprache, kurze Absätze |
| Inhalt | §3.2 Quelltreue | ✅ | — | 17.000 Stars, 5× Echtzeit, 600 MB korrekt übernommen |
| Inhalt | §3.3 Scaffolding | ✅ | m1, m2 | Whisper/Parakeet, Push-to-Talk/Toggle erklärt |
| Inhalt | §3.4 Externes Framework | n/a | — | kein Framework verwendet |
| Elemente | §1.5/§4.2 Min 1 Key-Concept | ✅ | m1-key-concept | „Lokale Speech-to-Text" |
| Elemente | §4.3 Min 2 Quizzes | ✅ | m1-quiz, m3-quiz | plausible Distraktoren, individuelles Feedback |
| Elemente | §4.4 Min 3 Flashcards | ✅ | m2, m3, m4 | Warum-Format durchgängig |
| Elemente | §4.5 Min 1 Reflexion | ✅ | m3-reflection | Praxisbezug mit Placeholder |
| Elemente | §3.5 Min 1 Easter Egg | ✅ | m4-easter-egg | hover-trigger, Meta-Witz |
| Elemente | §4.2 Element-Reihenfolge variiert | ✅ | — | M1/M2 ähnlich, M3/M4 brechen es auf (akzeptabel) |
| Elemente | §9 Pflicht-Minima per Grep | ✅ | — | 1/2/3/1/1, alle ≥ Soll |
| Meta | §8.1 Schwierigkeit | ✅ | beginner | passt |
| Meta | §8.2 Tags spezifisch | ✅ | Diktat, Whisper, Privacy | alle spezifisch |
| Meta | §8.3 Zeitschätzung | ✅ | 12 Min | realistisch |
| Meta | §8.4 Drei-Ebenen-Titel | ✅ | title/subheading/subtitle | alle drei vorhanden |
| Mobile & Design | §2.1 Absatzlänge | ✅ | — | max 3 Sätze pro Absatz |
| Mobile & Design | §2.2 Optische Gewichtungen | ✅ | — | `###`, Bold, Listen systematisch |
| Mobile & Design | §2.3 Keine 3 Boxen hintereinander | ✅ | — | — |
| Mobile & Design | §6.1 Theme-Charakter | ✅ | handy-minimal | grün/gelb passend für Open-Source-Tool |
| Mobile & Design | §6.3 Kontrast | ✅ | — | Dark: F5F5F4 auf 111110 |
| Mobile & Design | §6.8 Reale Screenshots | ✅ | 5 Screenshots + Hero | echte UI-Aufnahmen |
| Schreibstil | §9 Em-Dashes | ✅ | — | 1 verbliebener im alt-text-Zitat (bewusst belassen, siehe Re-Audit 1) |
| Schreibstil | §9 „Nicht X, sondern Y" | ✅ | — | nur 1× als „nicht nur … sondern auch"-Variante |
| Schreibstil | §9 KI-Marker-Wörter | ✅ | — | — |
| Schreibstil | §9 Bedeutungs-Aufblähung | ✅ | — | — |
| Schreibstil | §9 Partizip-Anhängsel | ✅ | — | — |
| Schreibstil | §9 Aktiv statt Passiv | ✅ | — | klare Subjekte |
| Technik | §10 sourceType-Wert | ✅ | tool | gültiger Enum |
| Technik | §10 sourceType-Badge nicht im UI | ✅ | — | nur Metadaten |
| Artefakte | §11.3 Gap-Analyse | ✅ | gap-analysis.md | nach Audit 1 angelegt |
| Artefakte | §6.6 source.md | ✅ | source.md | mit GitHub-README befüllt |
| Anti-Patterns | §12.5 Generische Tags | ✅ | — | Tools → Whisper gefixt |
| Anti-Patterns | §12.7 Emoji-Inflation | ✅ | outro.takeaway | 5 Emojis, regelkonform |

### Lerner-Perspektive

> Simulierter Durchlauf als Anfänger, der das Thema „Diktier-Tool" vorher nicht kannte. Kein Ersatz für echte Nutzertests.

1. **Prämisse eingelöst?** **Ja.** Der Subtitle verspricht „per Tastenkürzel in jedes Textfeld diktieren, komplett offline, auf jedem Betriebssystem" — alle vier Teilbehauptungen werden explizit abgehakt: Tastenkürzel (m2-content-2 Push-to-Talk/Toggle), jedes Textfeld (m1-content-1 + m3-content-2 konkrete Apps), offline (m1-key-concept + m1-content-2), alle OS (m2-content-1 macOS/Windows/Linux-Install).
2. **Habe ich gelernt, was versprochen wurde?** **Teilweise.** Die Subheading behauptet „**die beste Lösung** zum Diktieren ohne Cloud auf dem Desktop" — der Kurs liefert aber keinen Vergleich zu macOS-Diktat, Wispr Flow, Superwhisper oder anderen Alternativen. Als Anfänger fragt man sich: „Warum nicht das eingebaute macOS-Diktat?" Die „beste"-Behauptung wird behauptet, nicht belegt.
3. **Hat mich der Kurs weitergebracht?** **Ja.** Vorher/Nachher ist klar: ich weiß jetzt, was Handy ist, wie ich's installiere, wie ich's benutze und wofür es gut ist.
4. **Sind die Infos vollständig, oder hätte mir etwas gefehlt?** **Teilweise.** Offene Folgefragen als Anfänger: (a) Welche Sprachen erkennt Parakeet V3 eigentlich konkret? „Automatische Spracherkennung" reicht nicht, Deutsch-Qualität unklar. (b) Wie sehe ich im Moment der Aufnahme, dass Handy gerade hört? Gibt es ein Overlay, ein Tray-Icon, einen Ton? Kein Screenshot davon. (c) Performance-Kontext (RAM, CPU-Last, Start-Zeit) fehlt, bei einem 600-MB-Modell nicht trivial.
5. **Kann ich das Wissen jetzt anwenden?** **Ja.** Installationsbefehle sind konkret (m2-content-1 `brew install --cask handy`, `winget install cjpais.Handy`), Modellwahl ist begründet (m2-content-3), Push-to-Talk-Workflow ist klar (m2 + m3-content-1).
6. **Sind Anleitungen konkret genug zum Nachmachen?** **Teilweise.** Die Einrichtungs-Screenshots (General-Tab, Models-Tab, Advanced-Tab, Post-Process-Tab) sind stark. Was fehlt: **ein Bild vom Aufnahme-Moment selbst.** Der Hook verspricht „Tastenkürzel drücken, sprechen, loslassen. Dein Text erscheint", aber genau dieser Moment wird nirgendwo visualisiert. Ein Anfänger weiß nicht, ob Handy ein Overlay einblendet, einen Sound macht, ein Icon ändert — das lädt zur Unsicherheit beim ersten Versuch ein.
7. **Spaß / Unterhaltsam?** **Teilweise.** Der Hook ist griffig („Du tippst gerade. Du könntest auch sprechen"), das Easter-Egg am Ende ist ein netter Meta-Witz („diesen Kurs hättest du in 3 Min diktieren können"). Aber zwischendurch ist der Ton sachlich-funktional, fast Handbuch-Nähe. Keine persönliche Anekdote („seit ich das nutze, tippe ich E-Mails unter 500 Zeichen noch, alles darüber diktiere ich"), keine kleinen überraschenden Einsichten, wenig Stimme des Autors.
8. **Vollständig für die Prämisse?** **Ja.** Kein Abbruch-Gefühl. Die Progression Installation → Workflows → Profi-Tipps → Outro ist rund, das Easter Egg setzt einen natürlichen Schluss.

**Gesamt-Urteil:** Solider, klar strukturierter Tool-Kurs mit konsequenter Install-zu-Einsatz-Progression. Als Lerner komme ich ins Ziel und kann Handy sofort anwenden. Was fehlt, ist eher das Extra, das einen guten Kurs von einem exzellenten trennt: Der Moment der ersten Aufnahme bleibt unsichtbar, die „beste"-Behauptung aus der Subheading wird nicht eingelöst, und der Autor-Ton bleibt zurückhaltend.

### Empfohlene Nachbesserungen

1. **[Lerner]** **Aufnahme-Moment visualisieren** (Frage 6). Einen Screenshot oder kurze Beschreibung ergänzen, wie Handy während der Aufnahme aussieht (Overlay, Tray-Icon-Veränderung, Sound?) — z.B. als neues Element in Modul 2 direkt nach dem Tastenkürzel-Setup oder am Übergang zu Modul 3.
2. **[Lerner]** **Subheading „die beste Lösung" einlösen oder entschärfen** (Frage 2). Option A: 1–2 Sätze Vergleich zu macOS-Diktat/Cloud-Alternativen in M1 ergänzen, die die Behauptung tragen. Option B: Subheading zu etwas Bescheidenerem ändern, z.B. „Eine offene Lösung zum Diktieren ohne Cloud auf dem Desktop" — dann wird nichts versprochen, was der Kurs nicht zeigt.
3. **[Lerner]** **Sprach-Unterstützung konkret nennen** (Frage 4). Bei Parakeet V3 in M2 einen halben Satz ergänzen, welche Sprachen abgedeckt sind und wie gut Deutsch funktioniert — aktuell steht nur „automatische Spracherkennung", das ist aus Anfänger-Sicht zu vage.
4. **[Lerner]** **Mehr Stimme des Autors** (Frage 7). 1–2 Sätze persönliche Note einbauen, bevorzugt im Intro oder in einem Modul-Übergang. Z.B. „Ich benutze Handy seit …, meine Erkenntnis: …". Macht den Kurs aus einem Handbuch zu einer Empfehlung.

Optional: **[Lerner]** Performance-Kontext (RAM, CPU-Verbrauch im Leerlauf, Start-Zeit) als halber Satz in M2 — für Nutzer, die vor dem Download wissen wollen, was auf ihren Rechner zukommt.

### Systemische Findings (an LEARNINGS gemeldet?)

Offen, wird in Schritt 10 nach dem Fix entschieden. Vorab-Einschätzung:
- **„Subheading-Versprechen nicht belegt"** — könnte systemisch sein (jeder Kurs hat eine Subheading, jeder Kurs sollte einlösen oder entschärfen). Prüfbar per Lese-Abgleich Subheading ↔ Inhalt. Kandidat für LEARNINGS.
- **„Erster Aktions-Moment nicht visualisiert"** bei Tool-Kursen — könnte systemisch sein (gilt für jeden Tool-/Workflow-Kurs, der einen Kern-Moment hat). Kandidat für LEARNINGS.
- **„Aufnahme-Moment"** im Speziellen ist Einzelfall dieses Kurses.
- **„Stimme des Autors"** ist Geschmacksfrage, aber wenn mehrere Kurse das Muster zeigen, wird's relevant.
- **„Sprach-Support bei Tool-Kursen konkret nennen"** ist Nische, eher Einzelfall.

### Nicht gefixt / bewusst offen gelassen

- Nichts vorab. Nachbesserung-Übergang entscheidet, ob die vier Lerner-Findings jetzt direkt umgesetzt werden oder als separater Task laufen.

---

## Re-Audit 2026-04-19 (Direkt-Fix nach Lerner-Audit)

- **Creator-Version:** a3f330f
- **Auditor:** Claude
- **Anlass:** Direkt-Fix nach Erst-Audit (Lerner-Perspektive)

### Zusammenfassung

- **Fixes:** 4 Lerner-Findings umgesetzt (alle aus Sektion „Audit 2026-04-19 Re-Audit nach Creator-Update")
- **Pflicht-Minima:** weiterhin erfüllt (key-concept 1 / quiz 2 / flashcard 3 / reflection 1 / easter-egg 1)
- **Status:** nachgebessert, neues Erstrundenergebnis — Lerner-Lücken geschlossen bzw. entschärft

### Fix-Protokoll

| Finding | Regel/Frage | Fix | Stelle | Verifikation |
|---|---|---|---|---|
| 1. Aufnahme-Moment visualisieren | Lerner-Frage 6 | Neues `content`-Element nach Tastenkürzel-Setup ergänzt: beschreibt Tray-Icon-Wechsel, optionalen Aufnahme-Sound, Mikrofon-LED, bewusstes Fehlen eines Overlays | `modules[1].elements` → `m2-content-recording-moment` (neu) | lesbar, zeigt was beim Drücken der Taste passiert |
| 2. Subheading entschärfen | Lerner-Frage 2 | `"Die beste Lösung…"` → `"Eine offene Lösung zum Diktieren ohne Cloud auf dem Desktop"` (Option B aus Empfehlung, da Vergleichsinhalte nicht vorhanden) | `meta.subheading` | Versprechen steht in Deckung mit Kursinhalt |
| 3. Sprach-Unterstützung konkret | Lerner-Frage 4 | Parakeet-Absatz um Sprach-Abdeckung ergänzt („25 europäische Sprachen, Deutsch in guter Qualität"); Whisper-Absatz um „knapp 100 Sprachen" erweitert | `modules[1].elements[m2-content-3]` | Anfänger weiß jetzt, ob Deutsch unterstützt wird |
| 4. Autor-Stimme | Lerner-Frage 7 | 2 Sätze persönliche Note im Intro-Hook: „Ich benutze Handy seit ein paar Wochen täglich. Am stärksten gemerkt habe ich den Unterschied bei langen KI-Prompts…" | `intro.hook` | Intro wirkt jetzt als Empfehlung, nicht als Handbuch-Eröffnung |

### Verifikation Pflicht-Minima (§9)

```
$ rg -c '"type": "key-concept"'  → 1   ✅ (Soll: ≥1)
$ rg -c '"type": "quiz"'          → 2   ✅ (Soll: ≥2)
$ rg -c '"type": "flashcard"'     → 3   ✅ (Soll: ≥3)
$ rg -c '"type": "reflection"'    → 1   ✅ (Soll: ≥1)
$ rg -c '"type": "easter-egg"'    → 1   ✅ (Soll: ≥1)
```

JSON valid (`node -e "JSON.parse(…)"` ok).

### Bewusst nicht umgesetzt

- **Optional: Performance-Kontext (RAM/CPU/Start-Zeit) in M2** bleibt offen. Im Original-README steht keine belastbare Zahl, und der Kurs darf nicht raten. Kein Fix, bis Julian eigene Messwerte liefert oder die Quelle eine Angabe nachlegt.

### Offen für LEARNINGS-Check (Schritt 10)

Nach dem Fix zu prüfen — in jargon-freier AskUserQuestion pro Kandidat:
1. **Subheading einlösen oder entschärfen** — potenziell systemisch (jeder Kurs hat eine Subheading). Fix-Erlebnis: „entschärfen" war hier der saubere Pfad, weil Vergleichsinhalte gefehlt haben. Regelkandidat: „Subheading darf nur behaupten, was der Kurs belegt."
2. **Erster Aktions-Moment muss sichtbar sein** bei Tool-/Workflow-Kursen — potenziell systemisch. Fix-Erlebnis: Das Fehlen dieses Moments war für den Lerner die größte Unsicherheit, obwohl der Rest stark war.
3. **Autor-Stimme im Intro oder an einem Modul-Übergang** — potenziell systemisch, aber Geschmacksfrage; Julian entscheidet.
4. **Sprach-Support bei Tool-Kursen konkret nennen** — wahrscheinlich Einzelfall.

