import type { Course } from "@/lib/types";

export const karpathyLlmWiki: Course = {
  meta: {
    slug: "karpathy-llm-wiki",
    title: "Das LLM Wiki",
    subtitle:
      "Wie du mit KI eine persönliche Knowledge Base baust, die wächst und nie veraltet — nach Andrej Karpathys Konzept.",
    sourceUrl:
      "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    sourceAuthor: "Andrej Karpathy",
    sourceType: "gist",
    tags: ["Knowledge Management", "LLM", "Productivity", "RAG"],
    estimatedMinutes: 18,
    difficulty: "intermediate",
    publishedAt: "2026-04-10",
    design: {
      theme: "knowledge-graph",
      colors: {
        background: "#0F1117",
        surface: "#1A1D27",
        primary: "#6C63FF",
        accent: "#00D4AA",
        text: "#E8E6F0",
        textMuted: "#8B89A0",
      },
      fonts: {
        heading: '"Syne", system-ui, sans-serif',
        body: '"DM Sans", system-ui, sans-serif',
      },
    },
  },

  intro: {
    hook: "Du hast Hunderte Artikel gelesen, Dutzende Podcasts gehört, Notizen in fünf verschiedenen Apps verteilt — und findest trotzdem nichts wieder, wenn du es brauchst. Was wäre, wenn ein LLM das für dich organisiert?",
    sourceContext:
      'Andrej Karpathy — Ex-Director of AI bei Tesla, Mitgründer von OpenAI, eine der einflussreichsten Stimmen in der KI-Welt — hat ein Konzept veröffentlicht, das er "LLM Wiki" nennt: eine persönliche Knowledge Base, die von einem LLM gebaut, gepflegt und durchsuchbar gehalten wird.',
    overview: [
      "Warum klassisches RAG nicht reicht",
      "Die 3-Schichten-Architektur des LLM Wiki",
      "Die drei Kern-Operationen: Ingest, Query, Lint",
      "Hands-on: Wie du dein eigenes Wiki startest",
      "Karpathys Vision und die Verbindung zu Vannevar Bushs Memex",
    ],
  },

  modules: [
    {
      id: "problem",
      title: "Das Problem mit deinem Wissen",
      icon: "🧠",
      estimatedMinutes: 3,
      elements: [
        {
          id: "problem-intro",
          type: "content",
          text: "Stell dir vor, du hast letzte Woche einen brillanten Artikel über die Zukunft von AI Agents gelesen. Jetzt fragt dich jemand danach. Du weißt, dass du ihn gelesen hast. Du weißt ungefähr, worum es ging. Aber du findest ihn nicht mehr — und selbst wenn, müsstest du ihn nochmal lesen, um die wichtigen Punkte zusammenzufassen.\n\nDas ist der Normalzustand für die meisten von uns. Wissen geht rein, aber es **akkumuliert** nicht. Es bleibt fragmentiert in Browser-Tabs, Notion-Seiten, Lesezeichen-Ordnern.",
        },
        {
          id: "rag-problem",
          type: "key-concept",
          title: "Das RAG-Problem",
          description:
            "Die meisten KI-Tools (NotebookLM, ChatGPT mit Datei-Upload) nutzen RAG: Sie suchen bei jeder Frage relevante Textschnipsel und generieren eine Antwort. Aber das bedeutet, dass die KI jedes Mal von vorne anfängt — es gibt keine Akkumulation, keine Querverweise, keine Synthese über Dokumente hinweg.",
          icon: "🔄",
        },
        {
          id: "rag-quote",
          type: "callout",
          variant: "quote",
          title: "Karpathy über Standard-RAG",
          text: '"The LLM is rediscovering knowledge from scratch on every question. There\'s no accumulation."',
        },
        {
          id: "quiz-rag",
          type: "quiz",
          question:
            "Was ist das Hauptproblem bei herkömmlichem RAG (Retrieval-Augmented Generation)?",
          options: [
            {
              text: "Die Antworten sind zu langsam",
              correct: false,
              feedback:
                "Geschwindigkeit ist nicht das Kernproblem — sondern dass die KI jedes Mal von vorne anfängt.",
            },
            {
              text: "Das Wissen akkumuliert nicht — jede Frage wird von Grund auf bearbeitet",
              correct: true,
              feedback:
                "Genau. Bei RAG werden Textschnipsel bei jeder Frage neu gesucht und zusammengesetzt. Querverweise und Synthesen werden nie dauerhaft gespeichert.",
            },
            {
              text: "RAG kann keine langen Texte verarbeiten",
              correct: false,
              feedback:
                "Kontextlänge ist eine technische Einschränkung, aber nicht das konzeptuelle Problem, das Karpathy adressiert.",
            },
            {
              text: "Die Quelldokumente werden verändert",
              correct: false,
              feedback:
                "Im Gegenteil — bei RAG bleiben die Dokumente unverändert. Das Problem ist, dass daraus nie eine strukturierte Wissensbasis entsteht.",
            },
          ],
          explanation:
            "RAG behandelt jede Frage als isoliertes Problem. Es gibt keinen Ort, an dem Erkenntnisse dauerhaft verknüpft und gespeichert werden. Das LLM Wiki löst das, indem es eine persistente, wachsende Wissensstruktur aufbaut.",
        },
      ],
      transitionToNext:
        "Okay — das Problem ist klar. Aber was ist die Lösung? Karpathy schlägt eine überraschend einfache Architektur vor.",
    },

    {
      id: "architecture",
      title: "Die 3-Schichten-Architektur",
      icon: "🏗️",
      estimatedMinutes: 4,
      elements: [
        {
          id: "arch-intro",
          type: "content",
          text: "Das LLM Wiki besteht aus drei klar getrennten Schichten. Das Geniale daran: Es ist kein komplexes System mit Datenbanken und APIs — es sind einfach **Markdown-Dateien in einem Ordner**.",
        },
        {
          id: "layer-1",
          type: "key-concept",
          title: "Schicht 1: Raw Sources",
          description:
            "Deine Originaldokumente — Artikel, Papers, Notizen, Podcast-Transkripte. Sie werden nie verändert. Sie sind die Single Source of Truth. Das LLM liest sie, modifiziert sie aber nie.",
          icon: "📄",
        },
        {
          id: "layer-2",
          type: "key-concept",
          title: "Schicht 2: Das Wiki",
          description:
            "Von der KI generierte Markdown-Dateien: Zusammenfassungen, Entity-Seiten, Konzept-Seiten, Vergleiche, Synthesen. Die KI besitzt und pflegt diese Schicht komplett — erstellt, aktualisiert und verknüpft alle Inhalte.",
          icon: "🗂️",
        },
        {
          id: "layer-3",
          type: "key-concept",
          title: "Schicht 3: Das Schema",
          description:
            "Ein Konfigurationsdokument (z.B. CLAUDE.md), das dem LLM sagt, wie das Wiki strukturiert ist: Namenskonventionen, Workflows für Ingestion und Queries, wie mit Widersprüchen umgegangen wird. Dieses Dokument entwickelt sich mit der Zeit weiter.",
          icon: "📐",
        },
        {
          id: "arch-callout",
          type: "callout",
          variant: "tip",
          title: "Das Elegante daran",
          text: "Es sind nur Markdown-Dateien in einem Git-Repo. Kein Vendor Lock-in, kein Server, keine Datenbank. Du kannst die Dateien mit jedem Editor öffnen, durchsuchen und versionieren.",
        },
        {
          id: "page-types",
          type: "context-box",
          term: "Seitentypen im Wiki",
          explanation:
            "Entity-Seiten (Personen, Organisationen), Konzept-Seiten (abstrakte Ideen mit Querverweisen), Source-Summaries (strukturierte Zusammenfassungen einzelner Quellen), Synthese-Seiten (Erkenntnisse aus mehreren Quellen), Vergleichs-Seiten, Index-Seiten.",
        },
        {
          id: "quiz-architecture",
          type: "quiz",
          question: "Welche Schicht des LLM Wiki wird von der KI eigenständig erstellt und gepflegt?",
          options: [
            {
              text: "Schicht 1 — die Originaldokumente",
              correct: false,
              feedback:
                "Die Originaldokumente sind immutable — sie werden nie verändert.",
            },
            {
              text: "Schicht 2 — das Wiki mit Markdown-Seiten",
              correct: true,
              feedback:
                "Richtig! Das Wiki ist die Schicht, die das LLM eigenständig erstellt, aktualisiert und pflegt. Hier entstehen Zusammenfassungen, Querverweise und Synthesen.",
            },
            {
              text: "Schicht 3 — das Schema-Dokument",
              correct: false,
              feedback:
                "Das Schema wird gemeinsam von Mensch und LLM entwickelt — es ist die Ko-Evolution der Struktur.",
            },
          ],
          explanation:
            "Schicht 2 ist die Kernidee: Ein Satz Markdown-Dateien, die das LLM selbstständig erstellt und pflegt. Jede neue Quelle stärkt die gesamte Struktur, weil das LLM Querverweise aktualisiert und neue Verbindungen knüpft.",
        },
      ],
      transitionToNext:
        "Die Architektur steht. Aber was macht das LLM eigentlich konkret mit deinen Quellen? Drei Operationen sind der Kern.",
    },

    {
      id: "operations",
      title: "Die drei Kern-Operationen",
      icon: "⚙️",
      estimatedMinutes: 5,
      elements: [
        {
          id: "ops-intro",
          type: "content",
          text: "Das LLM Wiki kennt drei fundamentale Operationen. Jede hat einen klar definierten Workflow.",
        },
        {
          id: "ingest",
          type: "key-concept",
          title: "Ingest — Neue Quellen aufnehmen",
          description:
            "Das LLM liest ein neues Dokument, bespricht die Kernpunkte mit dir, schreibt eine Zusammenfassung, aktualisiert den Index, modifiziert relevante Entity- und Konzeptseiten (typischerweise 10-15 Seiten pro Quelle) und loggt die Operation.",
          icon: "📥",
        },
        {
          id: "ingest-detail",
          type: "callout",
          variant: "example",
          title: "Beispiel: Einen Artikel ingestieren",
          text: 'Du fütterst dem LLM einen Artikel über "AI Agents in 2026". Es erstellt eine Summary-Seite, aktualisiert die Seiten zu "AI Agents", "Autonomie", "Tool Use", ergänzt Querverweise auf verwandte Konzepte und trägt alles im Log ein — in einer einzigen Operation.',
        },
        {
          id: "query",
          type: "key-concept",
          title: "Query — Fragen stellen",
          description:
            'Das LLM durchsucht relevante Wiki-Seiten, liest sie, synthetisiert eine Antwort mit Zitaten. Der Clou: Wertvolle Antworten können als neue Wiki-Seiten gespeichert werden — so wird jede Recherche zu permanentem Wissen statt zu verschwindendem Chat-Verlauf.',
          icon: "🔍",
        },
        {
          id: "query-callout",
          type: "callout",
          variant: "tip",
          title: "Output, der zählt",
          text: 'Karpathy nennt das "Output Compounding": Statt dass deine Recherche im Chat-Verlauf verschwindet, wird das Ergebnis Teil des Wikis. Jede gute Frage macht das Wiki besser.',
        },
        {
          id: "lint",
          type: "key-concept",
          title: "Lint — Qualität sichern",
          description:
            "Regelmäßige Gesundheitschecks: Widersprüche zwischen Seiten aufdecken, veraltete Aussagen finden, verwaiste Seiten identifizieren, fehlende Querverweise ergänzen, Datenlücken erkennen.",
          icon: "🔧",
        },
        {
          id: "lint-detail",
          type: "context-box",
          term: "Was Lint konkret prüft",
          explanation:
            "Widersprüche zwischen Seiten, veraltete Behauptungen (durch neuere Quellen überholt), verwaiste Seiten ohne eingehende Links, erwähnte Konzepte ohne eigene Seite, fehlende Querverweise, Datenlücken die durch Web-Suchen gefüllt werden könnten.",
        },
        {
          id: "flashcard-ops-1",
          type: "flashcard",
          front: "Was passiert bei einer Ingest-Operation?",
          back: "Das LLM liest die Quelle, erstellt eine Summary-Seite, aktualisiert 10-15 verwandte Wiki-Seiten, ergänzt Querverweise und loggt die Operation.",
        },
        {
          id: "flashcard-ops-2",
          type: "flashcard",
          front: "Was ist Output Compounding?",
          back: "Wertvolle Query-Ergebnisse werden als neue Wiki-Seiten gespeichert — so wird jede Recherche zu permanentem Wissen statt zu verschwindendem Chat-Verlauf.",
        },
        {
          id: "flashcard-ops-3",
          type: "flashcard",
          front: "Was macht die Lint-Operation?",
          back: "Periodische Gesundheitschecks: Widersprüche aufdecken, veraltete Inhalte finden, verwaiste Seiten identifizieren, fehlende Querverweise ergänzen.",
        },
      ],
      transitionToNext:
        "Jetzt wird's praktisch — wie würdest du dein eigenes LLM Wiki tatsächlich starten?",
    },

    {
      id: "navigation",
      title: "Navigation & Workflow",
      icon: "🗺️",
      estimatedMinutes: 3,
      elements: [
        {
          id: "nav-intro",
          type: "content",
          text: "Zwei Dateien halten das gesamte Wiki navigierbar: `index.md` und `log.md`. Klingt simpel — ist es auch. Und genau deshalb funktioniert es.",
        },
        {
          id: "index-md",
          type: "key-concept",
          title: "index.md — Das Inhaltsverzeichnis",
          description:
            "Ein nach Kategorien geordneter Katalog aller Wiki-Seiten mit direkten Links, Einzeiler-Zusammenfassungen und optionalen Metadaten. Wird bei jeder Ingestion aktualisiert. Das LLM liest diese Datei zuerst, wenn es eine Frage beantwortet.",
          icon: "📖",
        },
        {
          id: "log-md",
          type: "key-concept",
          title: "log.md — Das Logbuch",
          description:
            'Chronologische Aufzeichnung aller Operationen: Ingestionen, Queries, Lint-Durchläufe. Jeder Eintrag folgt einem einheitlichen Präfix (z.B. `## [2026-04-02] ingest | Artikeltitel`), was Filterung mit Standard-Tools ermöglicht.',
          icon: "📋",
        },
        {
          id: "workflow-callout",
          type: "callout",
          variant: "quote",
          title: "Karpathys Workflow",
          text: '"In practice, I have the LLM agent open on one side and Obsidian open on the other. The LLM makes edits based on our conversation, and I browse the results in real time — following links, checking the graph view, reading the updated pages. Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."',
        },
        {
          id: "scale-note",
          type: "context-box",
          term: "Skalierung",
          explanation:
            "Für ~100 Quellen und Hunderte Seiten reicht der einfache Index. Darüber hinaus empfiehlt Karpathy Suchinfrastruktur wie qmd — eine lokale Suchmaschine mit Hybrid BM25/Vektor-Suche und LLM Re-Ranking.",
        },
        {
          id: "reflection-workflow",
          type: "reflection",
          prompt:
            "Stell dir vor, du hättest ein LLM Wiki mit allem, was du in den letzten 6 Monaten gelesen hast. Welche Frage würdest du als erstes stellen?",
          placeholder:
            'Z.B. "Was sind die wiederkehrenden Muster in allem, was ich über AI Agents gelesen habe?"',
        },
      ],
      transitionToNext:
        "Du hast die Mechanik verstanden. Jetzt schauen wir uns an, warum Karpathy glaubt, dass die KI genau der richtige Partner für diese Aufgabe ist.",
    },

    {
      id: "philosophy",
      title: "Warum KI der perfekte Wiki-Pfleger ist",
      icon: "💡",
      estimatedMinutes: 3,
      elements: [
        {
          id: "philosophy-intro",
          type: "content",
          text: "Die Geschichte der persönlichen Wissensmanagement-Tools ist eine Geschichte des Scheiterns. Jeder hat mal angefangen, ein Wiki oder ein Zettelkasten-System aufzubauen. Fast niemand pflegt es langfristig. Warum?",
        },
        {
          id: "bookkeeping-quote",
          type: "callout",
          variant: "quote",
          title: "Die Kernerkennntnis",
          text: '"The tedious part of maintaining a knowledge base is not the reading or the thinking — it\'s the bookkeeping."',
        },
        {
          id: "role-division",
          type: "content",
          text: "Karpathy teilt die Arbeit klar auf:\n\n**Du** wählst die Quellen, stellst die richtigen Fragen, steuerst die Analyse, denkst über Bedeutung nach.\n\n**Das LLM** fasst zusammen, pflegt Querverweise, updated 15 Seiten gleichzeitig, prüft auf Widersprüche, vergisst nie einen Link zu aktualisieren.\n\nDer Mensch macht die kreative und strategische Arbeit. Die KI macht die Fleißarbeit, an der alle scheitern.",
        },
        {
          id: "memex",
          type: "context-box",
          term: "Vannevar Bushs Memex (1945)",
          explanation:
            'Schon 1945 beschrieb der Ingenieur Vannevar Bush die Vision eines "Memex" — eines persönlichen, kuratierten Wissensspeichers mit "assoziativen Pfaden zwischen Dokumenten". Karpathy sieht das LLM Wiki als die Verwirklichung dieser Vision: "The part he couldn\'t solve was who does the maintenance. The LLM handles that."',
        },
        {
          id: "quiz-philosophy",
          type: "quiz",
          question:
            "Warum scheitern die meisten persönlichen Wissensmanagement-Systeme laut Karpathy?",
          options: [
            {
              text: "Weil die Tools zu kompliziert sind",
              correct: false,
              feedback:
                "Es gibt genug einfache Tools. Das Problem ist nicht die Komplexität der Software.",
            },
            {
              text: "Weil Menschen die Pflege-Arbeit (Bookkeeping) aufgeben",
              correct: true,
              feedback:
                'Genau! Lesen und Denken macht Spaß. Querverweise pflegen, Seiten aktualisieren, Struktur aufrechterhalten — das ist die Arbeit, die niemand langfristig macht. Und genau das ist die Stärke des LLM.',
            },
            {
              text: "Weil es keine guten Suchfunktionen gibt",
              correct: false,
              feedback:
                "Suche ist ein gelöstes Problem. Die Herausforderung ist, dass es überhaupt strukturiertes Wissen gibt, das durchsucht werden kann.",
            },
          ],
          explanation:
            "Die kreative Arbeit — Quellen finden, Fragen stellen, Erkenntnisse gewinnen — machen Menschen gerne. Die administrative Pflege eines Wikis ist mühsam und repetitiv. LLMs sind genau dafür gemacht.",
        },
        {
          id: "easter-egg-memex",
          type: "easter-egg",
          trigger: "click",
          content:
            '🕰️ Fun Fact: Vannevar Bush hat den Memex 1945 im Artikel "As We May Think" beschrieben — 44 Jahre bevor Tim Berners-Lee das World Wide Web erfand.',
        },
      ],
    },
  ],

  outro: {
    synthesis: [
      "Das LLM Wiki ersetzt fragmentiertes RAG durch eine persistente, wachsende Wissensstruktur aus einfachen Markdown-Dateien.",
      "Drei Schichten (Raw Sources → Wiki → Schema) und drei Operationen (Ingest → Query → Lint) bilden das gesamte System.",
      "Die KI übernimmt die Pflege-Arbeit — Querverweise, Aktualisierungen, Konsistenzprüfungen — an der Menschen scheitern.",
      "Output Compounding: Jede gute Frage und jede Recherche wird zu permanentem Wissen statt zu verschwindendem Chat-Verlauf.",
      "Das Konzept verwirklicht Vannevar Bushs 80 Jahre alte Vision eines persönlichen Wissensspeichers mit assoziativen Verknüpfungen.",
    ],
    nextStep:
      'Erstelle einen leeren Ordner, schreib eine CLAUDE.md mit der Anweisung "Du pflegst ein Wiki in diesem Ordner. Bei jeder neuen Quelle: Zusammenfassung erstellen, Index aktualisieren, verwandte Seiten verlinken." — und füttere die erste Quelle rein.',
    takeaway: [
      { emoji: "📄", text: "Raw Sources bleiben immer unverändert" },
      { emoji: "🗂️", text: "Das Wiki ist die Schicht, die das LLM pflegt" },
      { emoji: "📐", text: "Das Schema steuert, wie das LLM arbeitet" },
      { emoji: "📥", text: "Ingest: Neue Quellen aufnehmen und verknüpfen" },
      { emoji: "🔍", text: "Query: Fragen stellen und Ergebnisse zurückspeichern" },
      { emoji: "🔧", text: "Lint: Regelmäßig Qualität und Konsistenz prüfen" },
    ],
    sourceUrl:
      "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
    newsletterCTA:
      "Jede Woche ein Tool oder Konzept wie dieses — direkt in deiner Inbox.",
  },
};
