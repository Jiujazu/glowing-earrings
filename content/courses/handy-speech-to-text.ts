import type { Course } from "@/lib/types";

export const handySpeechToText: Course = {
  meta: {
    slug: "handy-speech-to-text",
    title: "Handy App — Die beste Lösung zum Diktieren ohne Cloud auf dem Desktop",
    subtitle:
      "Wie du mit einem kostenlosen Open-Source-Tool per Tastenkürzel in jedes Textfeld diktierst — komplett offline, auf jedem Betriebssystem.",
    sourceUrl: "https://handy.computer/",
    sourceAuthor: "cjpais (Open Source)",
    sourceType: "other",
    category: "ai-workflows",
    tags: ["Speech-to-Text", "Open Source", "Productivity", "Privacy"],
    estimatedMinutes: 10,
    difficulty: "beginner",
    publishedAt: "2026-04-12",
    relatedCourses: ["agentic-os-context-levels"],
    design: {
      theme: "handy-minimal",
      colors: {
        background: "#111110",
        surface: "#1C1C1A",
        primary: "#22C55E",
        accent: "#FACC15",
        text: "#F5F5F4",
        textMuted: "#A8A29E",
      },
      lightColors: {
        background: "#FAFAF9",
        surface: "#FFFFFF",
        primary: "#16A34A",
        accent: "#CA8A04",
        text: "#1C1917",
        textMuted: "#78716C",
      },
    },
  },

  intro: {
    hook: "Du tippst gerade. Du könntest auch sprechen — dreimal so schnell, ohne die Hände von dem zu nehmen, was du eigentlich tust. Handy ist ein kleines, kostenloses Tool, das genau das macht: Tastenkürzel drücken, sprechen, loslassen — dein Text erscheint. Komplett offline.",
    sourceContext:
      "Handy ist ein Open-Source-Projekt von cjpais mit über 17.000 GitHub-Stars. Es läuft auf macOS, Windows und Linux, nutzt OpenAIs Whisper- und NVIDIAs Parakeet-Modelle lokal und sendet kein einziges Audiobyte in die Cloud.",
  },

  modules: [
    // ===================== MODULE 1 =====================
    {
      id: "what-and-why",
      title: "Was Handy kann",
      icon: "🎙️",
      estimatedMinutes: 2,
      elements: [
        {
          id: "m1-content-1",
          type: "content",
          text: "Handy macht genau eine Sache: **Sprache in Text umwandeln und in das aktive Textfeld einfügen.** Kein Account, keine Cloud, keine Subscription. Du drückst ein Tastenkürzel, sprichst, lässt los — und der transkribierte Text erscheint dort, wo dein Cursor steht.\n\nDas funktioniert in jeder App: E-Mail, Slack, Code-Editor, Browser, Terminal. Überall, wo du tippen kannst, kannst du stattdessen sprechen.",
        },
        {
          id: "m1-key-concept",
          type: "key-concept",
          title: "Ein Tool, ein Job",
          description:
            "Handy ist bewusst minimalistisch: keine Übersetzung, keine Zusammenfassungen, keine KI-Features. Nur Speech-to-Text, lokal, schnell, zuverlässig. Die Philosophie: Ein Werkzeug, das eine Sache perfekt macht.",
        },
        {
          id: "m1-callout-stat",
          type: "callout",
          variant: "stat",
          text: "**17.000+ GitHub-Stars**, MIT-Lizenz, läuft auf macOS (Intel + Apple Silicon), Windows und Linux. Gebaut mit Tauri (Rust + React) — schnell, ressourcenschonend und nativ auf allen Plattformen.",
        },
        {
          id: "m1-quiz",
          type: "quiz",
          question: "Was passiert mit deiner Stimme, wenn du Handy benutzt?",
          options: [
            {
              text: "Sie wird an OpenAIs Server gesendet und dort transkribiert",
              correct: false,
              feedback:
                "Nein — Handy nutzt zwar OpenAIs Whisper-Modell, aber es läuft komplett lokal auf deinem Rechner. Kein Audio verlässt dein Gerät.",
            },
            {
              text: "Sie wird lokal auf deinem Rechner verarbeitet — nichts geht ins Internet",
              correct: true,
              feedback:
                "Genau — das ist der Kern von Handy. Die Spracherkennung läuft vollständig auf deiner Hardware. Null Cloud, null Datenübertragung.",
            },
            {
              text: "Sie wird verschlüsselt in die Cloud gesendet und nach der Transkription gelöscht",
              correct: false,
              feedback:
                "Auch verschlüsselt wäre das ein Cloud-Dienst. Handy hat keine Cloud-Komponente — alles passiert lokal.",
            },
          ],
          explanation:
            "Privacy by Design: Handy verarbeitet Audio ausschließlich lokal. Das Whisper- oder Parakeet-Modell läuft auf deiner CPU oder GPU — keine Internet-Verbindung nötig, kein Datentransfer.",
        },
        {
          id: "m1-callout-tip",
          type: "callout",
          variant: "tip",
          title: "Wofür ist das nützlich?",
          text: "- **Schnell lange Texte schreiben** — E-Mails, Notizen, Nachrichten. Sprechen ist ~3x schneller als Tippen\n- **Brain Dumps** — Gedanken aussprechen und direkt als Text festhalten\n- **Accessibility** — Für Menschen mit eingeschränkter Mobilität in den Händen\n- **Multitasking** — Diktieren während du etwas anderes auf dem Bildschirm machst\n- **Prompts für KI-Tools** — Lange, detaillierte Prompts sprechen statt tippen",
        },
      ],
      transitionToNext:
        "Du weißt jetzt, was Handy kann. Lass es uns installieren und einrichten — dauert 2 Minuten.",
    },

    // ===================== MODULE 2 =====================
    {
      id: "setup",
      title: "Installation & Setup",
      icon: "⚙️",
      estimatedMinutes: 3,
      elements: [
        {
          id: "m2-step-by-step",
          type: "step-by-step",
          title: "Handy installieren",
          steps: [
            {
              label: "Herunterladen oder per Package Manager installieren",
              content:
                "**macOS:** `brew install --cask handy`\n\n**Windows:** `winget install cjpais.Handy`\n\n**Oder:** Direkt von [handy.computer](https://handy.computer/) herunterladen — es gibt Builds für macOS (Intel + Apple Silicon), Windows (x64) und Linux (x64).",
            },
            {
              label: "Berechtigungen erteilen",
              content:
                "Handy braucht zwei Berechtigungen:\n\n1. **Mikrofon-Zugriff** — damit es dich hören kann\n2. **Accessibility-Zugriff** — damit es Text in das aktive Textfeld einfügen kann\n\nDein Betriebssystem fragt beim ersten Start automatisch danach.",
            },
            {
              label: "Tastenkürzel konfigurieren",
              content:
                "Öffne die Handy-Einstellungen und wähle dein bevorzugtes Tastenkürzel. Standard ist Push-to-Talk: **Drücken und halten** zum Aufnehmen, **loslassen** zum Transkribieren.\n\nAlternativ: Toggle-Modus — einmal drücken startet die Aufnahme, nochmal drücken stoppt sie.",
            },
            {
              label: "Modell wählen",
              content:
                "Handy bietet zwei Modell-Familien:\n\n- **Parakeet V3** (empfohlen zum Start) — läuft auf der CPU, kein GPU nötig, automatische Spracherkennung, ~600 MB\n- **Whisper** — braucht GPU für gute Performance, verschiedene Größen (Small 487 MB bis Large 1.1 GB)\n\nDas Modell wird beim ersten Mal automatisch heruntergeladen.",
            },
          ],
        },
        {
          id: "m2-context-box",
          type: "context-box",
          term: "Whisper vs. Parakeet",
          explanation:
            "Whisper ist OpenAIs Spracherkennungsmodell — sehr genau, braucht aber eine GPU für flüssige Performance. Parakeet ist NVIDIAs Alternative, die auch auf der CPU gut läuft und automatisch die Sprache erkennt. Für die meisten Nutzer ist Parakeet V3 die bessere Wahl zum Einstieg.",
        },
        {
          id: "m2-flashcard-1",
          type: "flashcard",
          front: "Warum ist Parakeet V3 für die meisten Nutzer die bessere Wahl als Whisper?",
          back: "Parakeet V3 läuft effizient auf der CPU (kein GPU nötig), erkennt die Sprache automatisch und liefert auf mittlerer Hardware ca. 5x Echtzeit-Geschwindigkeit. Whisper braucht eine GPU für ähnliche Performance — wer keine dedizierte GPU hat, ist mit Parakeet besser bedient.",
        },
        {
          id: "m2-callout-warning",
          type: "callout",
          variant: "warning",
          title: "Linux-Nutzer: Text-Input-Tool nötig",
          text: "Unter Linux braucht Handy ein zusätzliches Tool, um Text in Fenster einzufügen:\n\n- **X11:** `xdotool` installieren\n- **Wayland:** `wtype` (bevorzugt) oder `dotool`\n\nOhne dieses Tool kann Handy transkribieren, aber den Text nicht automatisch einfügen.",
        },
      ],
      transitionToNext:
        "Handy läuft. Jetzt zeige ich dir, wie du es im Alltag einsetzt — mit konkreten Workflows, die sofort Zeit sparen.",
    },
    // ===================== MODULE 3 =====================
    {
      id: "workflows",
      title: "Praxis-Workflows",
      icon: "🚀",
      estimatedMinutes: 3,
      elements: [
        {
          id: "m3-content-1",
          type: "content",
          text: "Handy ist am mächtigsten, wenn du es in deinen bestehenden Workflow einbaust. Hier sind konkrete Szenarien, in denen Diktieren Tippen schlägt:",
        },
        {
          id: "m3-callout-example-1",
          type: "callout",
          variant: "example",
          title: "Workflow 1: E-Mails und Nachrichten",
          text: "Öffne dein E-Mail-Programm, klicke in das Textfeld, drücke dein Handy-Tastenkürzel und sprich deine Antwort. Besonders bei längeren E-Mails sparst du enorm Zeit. Tipp: Sprich in ganzen Sätzen — die Transkription wird genauer als bei Stichpunkten.",
        },
        {
          id: "m3-callout-example-2",
          type: "callout",
          variant: "example",
          title: "Workflow 2: KI-Prompts diktieren",
          text: "Lange, detaillierte Prompts für Claude, ChatGPT oder andere Tools sind per Sprache viel schneller erstellt. Statt 2 Minuten zu tippen, sprichst du 30 Sekunden. Besonders für Kontext-reiche Prompts (\"Ich arbeite an X, mein Ziel ist Y, bitte beachte Z...\") ein Gamechanger.",
        },
        {
          id: "m3-callout-example-3",
          type: "callout",
          variant: "example",
          title: "Workflow 3: Brain Dump → Strukturierte Notiz",
          text: "Öffne eine leere Notiz, diktiere alles was dir im Kopf herumschwirrt — unstrukturiert, stream-of-consciousness. Dann kopiere den Text in Claude und lass ihn strukturieren. Zwei Minuten Brain Dump → saubere Notiz mit Actionpoints.",
        },
        {
          id: "m3-flashcard-1",
          type: "flashcard",
          front: "Warum ist Diktieren besonders für KI-Prompts so effektiv?",
          back: "Weil gute Prompts oft lang und kontextreich sind ('Ich arbeite an X, mein Ziel ist Y, beachte Z...'). Das per Hand zu tippen dauert Minuten — per Sprache sind es Sekunden. Außerdem formuliert man beim Sprechen natürlicher, was oft zu besseren Prompts führt.",
        },
        {
          id: "m3-quiz",
          type: "quiz",
          question: "Was funktioniert bei Handy NICHT?",
          options: [
            {
              text: "Text in ein Google-Docs-Dokument im Browser diktieren",
              correct: false,
              feedback: "Doch — Handy fügt Text in jedes aktive Textfeld ein, auch im Browser.",
            },
            {
              text: "Einen Slack-Chat per Sprache beantworten",
              correct: false,
              feedback: "Auch das geht — solange der Cursor im Slack-Textfeld steht, funktioniert Handy.",
            },
            {
              text: "Gesprochene Sprache in Echtzeit in eine andere Sprache übersetzen",
              correct: true,
              feedback: "Richtig — Handy macht nur Transkription, keine Übersetzung. Für Übersetzung brauchst du ein zusätzliches Tool.",
            },
            {
              text: "Code-Kommentare im VS Code diktieren",
              correct: false,
              feedback: "Klar geht das — Cursor in den Code-Editor setzen, Tastenkürzel drücken, Kommentar sprechen.",
            },
          ],
          explanation: "Handy ist bewusst auf eine Aufgabe fokussiert: Speech-to-Text. Keine Übersetzung, keine Zusammenfassungen, keine Analyse. Für alles darüber hinaus kombinierst du Handy mit anderen Tools.",
        },
        {
          id: "m3-reflection",
          type: "reflection",
          prompt: "In welcher alltäglichen Situation würde Diktieren dir am meisten Zeit sparen? Denk an Aufgaben, bei denen du regelmäßig längere Texte tippst.",
          placeholder: "z.B. Ich schreibe jeden Tag 10+ Slack-Nachrichten die jeweils 3-4 Sätze lang sind...",
        },
      ],
      transitionToNext: "Du hast die wichtigsten Workflows. Zum Schluss noch ein paar Profi-Tipps, die den Unterschied machen.",
    },

    // ===================== MODULE 4 =====================
    {
      id: "pro-tips",
      title: "Profi-Tipps",
      icon: "💡",
      estimatedMinutes: 2,
      elements: [
        {
          id: "m4-callout-tip-1",
          type: "callout",
          variant: "tip",
          title: "Custom Dictionary",
          text: "Handy unterstützt ein benutzerdefiniertes Wörterbuch. Wenn es bestimmte Fachbegriffe, Namen oder Abkürzungen nicht erkennt, kannst du sie in den Einstellungen hinzufügen. Besonders nützlich für Firmen- und Produktnamen.",
        },
        {
          id: "m4-callout-tip-2",
          type: "callout",
          variant: "tip",
          title: "Debug-Modus",
          text: "Wenn die Transkription nicht wie erwartet funktioniert: **Cmd+Shift+D** (macOS) oder **Ctrl+Shift+D** (Windows/Linux) aktiviert den Debug-Modus. Dort siehst du genau, was Handy hört, wie es verarbeitet wird und wo Probleme liegen.",
        },
        {
          id: "m4-code-block",
          type: "code-block",
          language: "bash",
          filename: "CLI-Steuerung",
          code: "# Transkription per CLI starten/stoppen\nhandy --toggle-transcription\n\n# Mit Post-Processing (z.B. Interpunktion)\nhandy --toggle-post-process\n\n# Aktuelle Aufnahme abbrechen\nhandy --cancel\n\n# Handy im Hintergrund starten (ohne Fenster)\nhandy --start-hidden --no-tray",
          highlightLines: [2, 5],
        },
        {
          id: "m4-content-1",
          type: "content",
          text: "Die CLI-Flags sind besonders mächtig, wenn du Handy in Automationen einbaust — z.B. per Shortcut-App (Raycast, Alfred) oder in Shell-Skripten. Es gibt sogar eine Raycast-Extension für Handy, mit der du Modelle wechseln und die Transkriptions-History durchsuchen kannst.",
        },
        {
          id: "m4-flashcard",
          type: "flashcard",
          front: "Warum hat Handy CLI-Flags, obwohl es eine Desktop-App ist?",
          back: "CLI-Flags erlauben Automation: Du kannst Handy per Skript, Shortcut-App (Raycast, Alfred) oder Hotkey-Manager fernsteuern. z.B. --toggle-transcription in einem Shell-Skript, das gleichzeitig andere Tools startet. Die Desktop-App ist das Frontend, die CLI die Programmierschnittstelle.",
        },
        {
          id: "m4-easter-egg",
          type: "easter-egg",
          trigger: "hover",
          content: "Fun Fact: Dieser gesamte Kurs hätte in ca. 3 Minuten per Handy diktiert werden können statt in 10 Minuten getippt. Probier's aus — diktiere deinen nächsten Kurs-Vorschlag für diese Plattform.",
        },
        {
          id: "m4-callout-fun-fact",
          type: "callout",
          variant: "fun-fact",
          title: "Open Source = Anpassbar",
          text: "Handy ist MIT-lizenziert und auf GitHub. Das heißt: Du kannst es forken, anpassen und erweitern. Der Tech-Stack (Rust + React/Tauri) macht es für Entwickler leicht, eigene Features hinzuzufügen — z.B. automatische Interpunktion, Textformatierung oder Integration mit anderen Tools.",
        },
      ],
    },
  ],

  outro: {
    synthesis: [
      "Handy macht genau eine Sache: Sprache zu Text, lokal, in jedem Textfeld. Kein Account, keine Cloud, keine Kosten.",
      "Parakeet V3 ist für die meisten Nutzer die beste Wahl — läuft auf der CPU, erkennt Sprachen automatisch.",
      "Push-to-Talk ist der schnellste Workflow: Taste halten, sprechen, loslassen — Text erscheint.",
      "Besonders wertvoll für lange Texte, Brain Dumps, KI-Prompts und als Accessibility-Tool.",
    ],
    nextStep:
      "Installiere Handy jetzt (2 Minuten), wähle Parakeet V3 als Modell, und diktiere deine nächste E-Mail statt sie zu tippen. Du wirst überrascht sein, wie natürlich es sich anfühlt.",
    takeaway: [
      { emoji: "🎙️", text: "Tastenkürzel drücken → Sprechen → Loslassen → Text erscheint" },
      { emoji: "🔒", text: "100% lokal — kein Audio verlässt deinen Rechner" },
      { emoji: "💻", text: "macOS, Windows, Linux — überall gleich" },
      { emoji: "🧠", text: "Parakeet V3 für CPU, Whisper für GPU-Nutzer" },
      { emoji: "⚡", text: "Sprechen ist ~3x schneller als Tippen" },
    ],
    sourceUrl: "https://handy.computer/",
    newsletterCTA:
      "Du magst Tools, die einfach funktionieren? In 'Ein gutes Ding' findest du regelmäßig handverlesene KI-Tools und Workflows.",
  },
};
