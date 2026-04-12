import type { Course } from "@/lib/types";

export const handySpeechToText: Course = {
  meta: {
    slug: "handy-speech-to-text",
    title: "Handy App",
    subheading: "Die beste Lösung zum Diktieren ohne Cloud auf dem Desktop",
    subtitle:
      "Wie du mit einem kostenlosen Open-Source-Tool per Tastenkürzel in jedes Textfeld diktierst — komplett offline, auf jedem Betriebssystem.",
    sourceUrl: "https://handy.computer/",
    sourceAuthor: "cjpais (Open Source)",
    sourceType: "tool",
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
          text: "Handy macht genau eine Sache: **Sprache in Text umwandeln und in das aktive Textfeld einfügen.** Kein Account, keine Cloud, keine Subscription. Du drückst ein Tastenkürzel, sprichst, lässt los — und der transkribierte Text erscheint dort, wo dein Cursor steht.\n\nDas funktioniert in jeder App: E-Mail, Slack, Code-Editor, Browser, Terminal. Überall, wo du tippen kannst, kannst du stattdessen sprechen.\n\nHandy ist bewusst minimalistisch. Keine Übersetzung, keine Zusammenfassungen, keine KI-Features. Nur Speech-to-Text — lokal, schnell und zuverlässig. Ein Werkzeug, das eine Sache perfekt macht.",
        },
        {
          id: "m1-content-2",
          type: "content",
          text: "### Warum offline?\n\nHandy verarbeitet dein Audio vollständig auf deinem Rechner. Es nutzt dafür OpenAIs Whisper-Modell oder NVIDIAs Parakeet — aber beides läuft lokal auf deiner CPU oder GPU. Kein einziges Audiobyte verlässt dein Gerät. Das ist nicht nur gut für die Privacy, sondern macht Handy auch ohne Internet nutzbar — im Flugzeug, im Café ohne WLAN, überall.",
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
                "Nein — Handy nutzt zwar OpenAIs Whisper-Modell, aber es läuft komplett lokal. Kein Audio verlässt dein Gerät.",
            },
            {
              text: "Sie wird lokal auf deinem Rechner verarbeitet — nichts geht ins Internet",
              correct: true,
              feedback:
                "Genau — die Spracherkennung läuft vollständig auf deiner Hardware. Null Cloud, null Datenübertragung.",
            },
            {
              text: "Sie wird verschlüsselt in die Cloud gesendet und nach der Transkription gelöscht",
              correct: false,
              feedback:
                "Auch verschlüsselt wäre das ein Cloud-Dienst. Handy hat keine Cloud-Komponente.",
            },
          ],
          explanation:
            "Privacy by Design: Das Whisper- oder Parakeet-Modell läuft auf deiner CPU oder GPU — keine Internet-Verbindung nötig, kein Datentransfer.",
        },
        {
          id: "m1-content-3",
          type: "content",
          text: "### Wofür ist das nützlich?\n\nSprechen ist etwa dreimal so schnell wie Tippen. Das macht Handy besonders wertvoll für:\n\n- **Längere E-Mails und Nachrichten** — statt 2 Minuten tippen, 30 Sekunden sprechen\n- **Brain Dumps** — Gedanken unstrukturiert aussprechen und als Text festhalten\n- **KI-Prompts** — lange, kontextreiche Prompts sprechen statt mühsam tippen\n- **Accessibility** — für Menschen mit eingeschränkter Mobilität in den Händen\n\nHandy ist Open Source (MIT-Lizenz), hat über 17.000 GitHub-Stars und läuft nativ auf macOS, Windows und Linux.",
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
          id: "m2-content-1",
          type: "content",
          text: "Die Installation ist unkompliziert. Auf macOS und Windows geht es am schnellsten über den Package Manager:\n\n- **macOS:** `brew install --cask handy`\n- **Windows:** `winget install cjpais.Handy`\n\nAlternativ kannst du den Installer direkt von [handy.computer](https://handy.computer/) herunterladen — es gibt Builds für macOS (Intel + Apple Silicon), Windows (x64) und Linux (x64).",
        },
        {
          id: "m2-content-2",
          type: "content",
          text: "### Erste Einrichtung\n\nBeim ersten Start fragt dein Betriebssystem nach zwei Berechtigungen: **Mikrofon-Zugriff** (damit Handy dich hören kann) und **Accessibility-Zugriff** (damit es Text in das aktive Textfeld einfügen kann). Beides bestätigen — ohne diese Berechtigungen funktioniert Handy nicht.\n\nDanach öffnest du die Einstellungen und konfigurierst dein Tastenkürzel. Standard ist **Push-to-Talk**: Taste drücken und halten zum Aufnehmen, loslassen zum Transkribieren. Alternativ gibt es einen Toggle-Modus — einmal drücken startet die Aufnahme, nochmal drücken stoppt sie.",
        },
        {
          id: "m2-content-3",
          type: "content",
          text: "### Das richtige Modell wählen\n\nHandy bietet zwei Modell-Familien. Das Modell wird beim ersten Auswählen automatisch heruntergeladen.\n\n**Parakeet V3** ist für die meisten Nutzer die beste Wahl: Es läuft effizient auf der CPU (kein GPU nötig), erkennt die Sprache automatisch und schafft auf mittlerer Hardware etwa 5x Echtzeit-Geschwindigkeit. Größe: ca. 600 MB.\n\n**Whisper** (von OpenAI) bietet verschiedene Größen von Small (487 MB) bis Large (1.1 GB), braucht aber eine GPU für flüssige Performance. Wer eine dedizierte NVIDIA- oder AMD-GPU hat, bekommt damit exzellente Ergebnisse.",
        },
        {
          id: "m2-flashcard-1",
          type: "flashcard",
          front: "Warum ist Parakeet V3 für die meisten Nutzer die bessere Wahl als Whisper?",
          back: "Parakeet V3 läuft effizient auf der CPU (kein GPU nötig), erkennt die Sprache automatisch und liefert auf mittlerer Hardware ca. 5x Echtzeit-Geschwindigkeit. Whisper braucht eine GPU für ähnliche Performance.",
        },
        {
          id: "m2-callout-warning",
          type: "callout",
          variant: "warning",
          title: "Linux-Nutzer: ein Extra-Schritt",
          text: "Unter Linux braucht Handy ein zusätzliches Tool zum Einfügen von Text: `xdotool` (X11) oder `wtype` (Wayland). Ohne dieses Tool kann Handy transkribieren, aber den Text nicht automatisch einfügen.",
        },
      ],
      transitionToNext:
        "Handy läuft. Jetzt zeige ich dir konkrete Workflows, die sofort Zeit sparen.",
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
          text: "Handy entfaltet seine Stärke, wenn du es in deinen Alltag einbaust. Drei Szenarien, in denen Diktieren Tippen klar schlägt:\n\n**E-Mails und Nachrichten.** Cursor ins Textfeld, Tastenkürzel drücken, Antwort sprechen. Besonders bei längeren E-Mails sparst du enorm Zeit. Sprich dabei in ganzen Sätzen — die Transkription wird deutlich genauer als bei einzelnen Stichworten.\n\n**KI-Prompts diktieren.** Gute Prompts für Claude oder ChatGPT sind oft lang und kontextreich: \"Ich arbeite an X, mein Ziel ist Y, bitte beachte Z...\" Das zu tippen dauert Minuten — gesprochen sind es 30 Sekunden. Bonus: Beim Sprechen formulierst du natürlicher, was oft zu besseren Prompts führt.\n\n**Brain Dump → Strukturierte Notiz.** Öffne eine leere Notiz, diktiere alles was dir im Kopf herumschwirrt — unstrukturiert, stream-of-consciousness. Dann kopiere den Text in Claude und lass ihn strukturieren. Zwei Minuten Brain Dump → saubere Notiz mit Action-Points.",
        },
        {
          id: "m3-flashcard-1",
          type: "flashcard",
          front: "Warum ist Diktieren besonders für KI-Prompts so effektiv?",
          back: "Weil gute Prompts oft lang und kontextreich sind. Das per Hand zu tippen dauert Minuten — per Sprache sind es Sekunden. Außerdem formuliert man beim Sprechen natürlicher, was oft zu besseren Prompts führt.",
        },
        {
          id: "m3-content-2",
          type: "content",
          text: "Handy funktioniert in jedem Textfeld — Google Docs im Browser, Slack, VS Code, Terminal. Die einzige Grenze: Handy macht **nur Transkription**. Keine Übersetzung, keine Zusammenfassung, keine Textanalyse. Für alles darüber hinaus kombinierst du es mit anderen Tools.",
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
              feedback: "Auch das geht — solange der Cursor im Slack-Textfeld steht.",
            },
            {
              text: "Gesprochene Sprache in Echtzeit in eine andere Sprache übersetzen",
              correct: true,
              feedback: "Richtig — Handy transkribiert nur, es übersetzt nicht.",
            },
            {
              text: "Code-Kommentare im VS Code diktieren",
              correct: false,
              feedback: "Klar — Cursor in den Editor, Tastenkürzel, Kommentar sprechen.",
            },
          ],
          explanation: "Handy ist bewusst auf eine Aufgabe fokussiert: Speech-to-Text. Keine Übersetzung, keine Zusammenfassungen. Für alles darüber hinaus kombinierst du Handy mit anderen Tools.",
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
          id: "m4-content-1",
          type: "content",
          text: "Drei Dinge, die Handy noch nützlicher machen:\n\n**Custom Dictionary.** Wenn Handy bestimmte Fachbegriffe, Namen oder Abkürzungen nicht erkennt, kannst du sie in den Einstellungen als benutzerdefiniertes Wörterbuch hinzufügen. Besonders nützlich für Firmen- und Produktnamen, die nicht im Standard-Vokabular vorkommen.\n\n**Debug-Modus.** Falls die Transkription mal nicht wie erwartet funktioniert: **Cmd+Shift+D** (macOS) oder **Ctrl+Shift+D** (Windows/Linux) öffnet den Debug-Modus. Dort siehst du genau, was Handy hört und wo Probleme liegen.\n\n**Transkriptions-History.** Handy speichert alle bisherigen Transkriptionen. Praktisch, wenn du einen diktierten Text nachträglich noch brauchst.",
        },
        {
          id: "m4-content-2",
          type: "content",
          text: "### Automation per CLI\n\nHandy lässt sich auch über die Kommandozeile steuern. Das ist mächtig, wenn du es in Automationen einbaust — z.B. per Shortcut-App (Raycast, Alfred) oder in Shell-Skripten:",
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
          id: "m4-flashcard",
          type: "flashcard",
          front: "Warum hat Handy CLI-Flags, obwohl es eine Desktop-App ist?",
          back: "CLI-Flags erlauben Automation: Du kannst Handy per Skript, Shortcut-App oder Hotkey-Manager fernsteuern. Die Desktop-App ist das Frontend, die CLI die Programmierschnittstelle — beides zusammen macht Handy sowohl einfach als auch automatisierbar.",
        },
        {
          id: "m4-content-3",
          type: "content",
          text: "Handy ist MIT-lizenziert und komplett auf GitHub verfügbar. Der Tech-Stack (Rust + React/Tauri) macht es für Entwickler leicht, eigene Features hinzuzufügen. Es gibt auch eine Raycast-Extension, mit der du Modelle wechseln und die History durchsuchen kannst.",
        },
        {
          id: "m4-easter-egg",
          type: "easter-egg",
          trigger: "hover",
          content: "Fun Fact: Dieser gesamte Kurs hätte in ca. 3 Minuten per Handy diktiert werden können statt in 10 Minuten getippt. Probier's aus — diktiere deinen nächsten Kurs-Vorschlag für diese Plattform.",
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
