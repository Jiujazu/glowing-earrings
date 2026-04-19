"use client";

import { useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/use-focus-trap";

interface PasswordPromptProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasswordPrompt({ open, onClose, onSuccess }: PasswordPromptProps) {
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useFocusTrap(open);

  useEffect(() => {
    if (open) {
      setPassword("");
      setState("idle");
      setErrorMessage("");
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "submitting" || !password) return;
    setState("submitting");
    setErrorMessage("");
    try {
      const response = await fetch("/api/editor/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => ({ success: false }));
      if (response.ok && data.success) {
        onSuccess();
        return;
      }
      setState("error");
      setErrorMessage(data.message || "Anmeldung fehlgeschlagen.");
    } catch {
      setState("error");
      setErrorMessage("Netzwerkfehler. Bitte erneut versuchen.");
    }
  }

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-password-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[min(420px,calc(100vw-2rem))] rounded-xl shadow-2xl"
        style={{
          backgroundColor: "var(--course-surface, #ffffff)",
          color: "var(--course-text, #111111)",
          border: "1px solid color-mix(in srgb, var(--course-text, #111) 15%, transparent)",
        }}
      >
        <header className="px-6 py-4 border-b" style={{ borderColor: "color-mix(in srgb, var(--course-text, #111) 15%, transparent)" }}>
          <h2 id="editor-password-title" className="text-lg font-bold">
            Editor entsperren
          </h2>
          <p
            className="text-xs mt-1"
            style={{ color: "var(--course-text-muted, #666)" }}
          >
            Passwort eingeben, um Inhalte zu bearbeiten.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="editor-password" className="sr-only">
              Editor-Passwort
            </label>
            <input
              ref={inputRef}
              id="editor-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={state === "submitting"}
              className="w-full px-3 py-2 rounded-lg text-base focus:outline-none focus:ring-2"
              style={{
                backgroundColor: "color-mix(in srgb, var(--course-text, #111) 5%, transparent)",
                color: "var(--course-text, #111)",
                border: "1px solid color-mix(in srgb, var(--course-text, #111) 20%, transparent)",
              }}
              placeholder="Passwort"
            />
          </div>

          {state === "error" && errorMessage && (
            <p
              role="alert"
              className="text-sm px-3 py-2 rounded-lg"
              style={{ backgroundColor: "#dc2626", color: "#fff" }}
            >
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={state === "submitting"}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[var(--course-text)]/10 disabled:opacity-50"
              style={{ color: "var(--course-text-muted, #666)" }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={state === "submitting" || !password}
              className="px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "var(--course-primary, #5B2F9F)",
                color: "#fff",
              }}
            >
              {state === "submitting" ? "Prüfe …" : "Entsperren"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
