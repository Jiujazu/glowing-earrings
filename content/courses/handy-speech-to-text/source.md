# Quelle: Handy App

- **Typ:** Website / Open-Source-Tool
- **Website:** https://handy.computer/
- **Repo:** https://github.com/cjpais/Handy
- **Autor:** cjpais (Open Source)
- **Abruf-Datum:** 2026-04-19

> Hinweis: `handy.computer` ist bewusst kurz gehalten (Landing-Page mit Tagline, Demo-Video, Download-Buttons). Die inhaltliche Substanz liegt im GitHub-README. Deshalb ist hier der Repo-README abgebildet — er ist die kuratierte Langform der Website.

## Handy

**A free, open source, and extensible speech-to-text application that works completely offline.**

Handy is a cross-platform desktop application that provides simple, privacy-focused speech transcription. Press a shortcut, speak, and have your words appear in any text field. This happens on your own computer without sending any information to the cloud.

## Why Handy?

Handy was created to fill the gap for a truly open source, extensible speech-to-text tool. As stated on handy.computer:

- **Free**: Accessibility tooling belongs in everyone's hands, not behind a paywall
- **Open Source**: Together we can build further. Extend Handy for yourself and contribute to something bigger
- **Private**: Your voice stays on your computer. Get transcriptions without sending audio to the cloud
- **Simple**: One tool, one job. Transcribe what you say and put it into a text box

Handy isn't trying to be the best speech-to-text app—it's trying to be the most forkable one.

## How It Works

1. **Press** a configurable keyboard shortcut to start/stop recording (or use push-to-talk mode)
2. **Speak** your words while the shortcut is active
3. **Release** and Handy processes your speech using Whisper
4. **Get** your transcribed text pasted directly into whatever app you're using

The process is entirely local:

- Silence is filtered using VAD (Voice Activity Detection) with Silero
- Transcription uses your choice of models:
  - **Whisper models** (Small/Medium/Turbo/Large) with GPU acceleration when available
  - **Parakeet V3** - CPU-optimized model with excellent performance and automatic language detection
- Works on Windows, macOS, and Linux

## Quick Start

### Installation

1. Download the latest release from the [releases page](https://github.com/cjpais/Handy/releases) or the [website](https://handy.computer)
   - **macOS**: Also available via Homebrew cask: `brew install --cask handy`
   - **Windows**: Also available via winget: `winget install cjpais.Handy`
2. Install the application
3. Launch Handy and grant necessary system permissions (microphone, accessibility)
4. Configure your preferred keyboard shortcuts in Settings
5. Start transcribing!

## Architecture

Handy is built as a Tauri application combining:

- **Frontend**: React + TypeScript with Tailwind CSS for the settings UI
- **Backend**: Rust for system integration, audio processing, and ML inference
- **Core Libraries**:
  - `whisper-rs`: Local speech recognition with Whisper models
  - `transcribe-rs`: CPU-optimized speech recognition with Parakeet models
  - `cpal`: Cross-platform audio I/O
  - `vad-rs`: Voice Activity Detection
  - `rdev`: Global keyboard shortcuts and system events
  - `rubato`: Audio resampling

## Transcription Models

### Whisper

- Variants: Small (487 MB), Medium (492 MB), Turbo (1600 MB), Large (1100 MB)
- GPU-beschleunigt, wenn verfügbar

### Parakeet V3 (478 MB)

- CPU-optimiert
- Automatische Spracherkennung (keine manuelle Sprachwahl nötig)
- Performance: ~5x Echtzeit auf Mid-Range-Hardware (getestet auf i5)
- Minimum: Intel Skylake (6th gen) oder vergleichbare AMD-CPUs

## Platform Support

- **macOS** (Intel + Apple Silicon)
- **x64 Windows**
- **x64 Linux** (Ubuntu 22.04, 24.04 — Wayland nur eingeschränkt)

## Known Limitations (aus dem README übernommen)

- **Whisper Model Crashes:** Auf manchen Windows/Linux-Konfigurationen crasht das Whisper-Modell. Nicht alle Systeme betroffen.
- **Wayland:** Eingeschränkte Unterstützung. Benötigt `wtype` oder `dotool` für zuverlässige Text-Eingabe.

## Integrationen

- **Raycast-Extension** von @mattiacolombomc — Aufnahme steuern, Transcript-History, Wörterbuch, Modell-/Sprach-Umschaltung.
- **CLI-Flags** für `--toggle-transcription`, `--toggle-post-process`, `--cancel`, `--start-hidden`, `--no-tray`, `--debug`.
- **Unix-Signale** `SIGUSR1` / `SIGUSR2` als Alternative zu globalen Shortcuts unter Wayland.

## Related Projects

- **Handy CLI** — die originale Python-Command-Line-Version
- **handy.computer** — Projekt-Website mit Demo-Video

## License

MIT
