# Gap-Analyse: Handy App

> Nachträgliche Gap-Analyse im Rahmen des Audits am 2026-04-19. Ursprünglich nicht erstellt, weil `handy.computer` als Tool-Website (< 500 Wörter Landing-Page) eingestuft wurde — §11.2-Ausnahme grenzwertig. Das Audit hat den Befund markiert, diese Datei schließt die Lücke.
>
> Die eigentliche kuratierte Langform ist der GitHub-README des Projekts (siehe `source.md`). Das Mapping bildet beide ab: die vier Säulen der Website (Free/Open Source/Private/Simple) und die technisch-praktische README-Struktur.

## Quelle → Kurs-Mapping

| Quelle-Abschnitt | Kurs-Stelle | Warum / Didaktisches Ziel |
|---|---|---|
| Website-Tagline „press a shortcut, speak, and have your words appear in any text field" | `intro.hook` | Klares Versprechen, 1-Satz-Hook — gleiche Mechanik wie Quelle |
| Website-Säule **Free** + **Open Source** (17.000+ Stars, MIT) | `m1-content-1` + `outro.synthesis[2]` | Einordnung als Community-Tool, nicht SaaS — wichtig für Vertrauensbildung |
| Website-Säule **Private** (kein Cloud-Transfer) | `m1-key-concept` „Lokale Speech-to-Text" + `m1-content-2` + `m1-quiz` | Pflicht-Begriff als Card, weil es das differenzierende Merkmal gegenüber SaaS-Konkurrenz ist |
| Website-Säule **Simple** („one tool, one job") | `m1-content-1` + `outro.takeaway` | Begründet, warum Handy keine Transkriptions-Suite sein will |
| README „How It Works" Schritte 1–4 | `m3-content-1` bis `m3-content-1c` (Push-to-Talk vs. Toggle) | Workflow-Erklärung, Stelle für Modus-Scaffolding |
| README „Transcription Models" Whisper vs. Parakeet | `m2-content-3` + `m2-image-models` + `m2-flashcard-1` + `m3-quiz` | Modellwahl ist die zentrale Setup-Entscheidung — verdient eigenes Flashcard + Quiz |
| README „Architecture" (Tauri, whisper-rs, VAD) | `m4-flashcard` (VAD-Begriff) | Tech-Stack nicht für Endnutzer relevant, außer VAD als Warum-es-funktioniert-Erklärung |
| README „Installation" (Homebrew, winget, Linux-Notes) | `m2-content-1`, `m2-content-2`, `m2-callout-warning` | Linux-Fall bekommt Callout, weil Wayland-Limitierung Stolperfalle ist |
| README „CLI Parameters" (`--toggle-transcription`, Signals) | `m4-code-block` | Profi-Trick ans Ende, nicht für Einsteiger |
| README „Post-Processing" / Raycast-Integration | `m4-content-postprocess` + `m4-image-postprocess` | Erweiterte Workflows nach dem Basis-Setup |
| Parakeet V3 Leistungsangabe „~5x real-time" | `m2-content-3`, `m3-quiz` | Konkrete Zahl statt vager „schnell"-Aussage (Quelltreue §3.2) |
| Whisper-Modellgrößen (487 MB – 1600 MB) | `m2-content-3` | Nutzer muss wissen, dass Download nicht trivial ist |
| README „Known Limitations" (Whisper-Crashes, Wayland) | `m2-callout-warning` | Nur Linux-Warnung übernommen. Crash-Info auf bestimmten Windows/Linux-Configs bewusst weggelassen (zu nischig für 12-Min-Kurs) |
| README „How to Contribute" | — | Bewusst weggelassen. Kurs richtet sich an Anwender, nicht Contributor |
| README „Sponsors" / „Related Projects" | — | Bewusst weggelassen. Nicht lernrelevant |
| README „Verify Release Signatures" (minisign) | — | Bewusst weggelassen. Spezialthema, nicht für Einsteiger |

## Bewusst weggelassen

- **Manuelle Modell-Installation** (Proxy/Firewall-Szenario) — zu Edge-Case, würde Kurs-Fokus auf „Einsteiger bekommt Diktat zum Laufen" verwässern.
- **Custom Whisper Models** aus Hugging Face — Advanced-Workflow, gehört eher in Folge-Kurs.
- **Unix-Signals für Wayland** — hochspezifisch, Linux-Power-User-Thema. Der Callout verweist implizit darauf.
- **Debug-Mode-Shortcuts** — Entwickler-Thema.
- **Roadmap / Sponsors / Acknowledgments** — Projekt-Metadaten, nicht Lerninhalt.

## Lücken, die der Kurs bewusst ergänzt (nicht in der Quelle)

- **Kontext „Datensensibilität"** (Interview-Transkript, medizinische Notizen) — der Kurs argumentiert die Datenschutz-Vorteile praxisnäher als die Quelle.
- **Vergleich SaaS vs. lokal** — steht im Kurs implizit, in der Quelle gar nicht (Handy positioniert sich nicht defensiv gegen Wettbewerb).
- **Push-to-Talk-vs-Toggle-Entscheidungshilfe** — Quelle erwähnt beide Modi, der Kurs macht die Wahl zwischen ihnen zum Lerninhalt.
