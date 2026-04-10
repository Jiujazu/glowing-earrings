"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Variant = "inline" | "featured" | "standalone";

interface NewsletterCTAProps {
  variant?: Variant;
  source?: string;
  customHeadline?: string;
  customDescription?: string;
}

export default function NewsletterCTA({
  variant = "inline",
  source = "unknown",
  customHeadline,
  customDescription,
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const headlines: Record<Variant, string> = {
    inline: "Ein gutes Ding",
    featured:
      "Jede Woche ein Tool, das deinen Workflow verändert.",
    standalone:
      "Ein gutes Ding — Der Newsletter",
  };

  const descriptions: Record<Variant, string> = {
    inline: "Wöchentlich ein hilfreiches KI-Tool. Kein Spam.",
    featured:
      "Julian stellt jede Woche ein spannendes KI-Tool, Projekt oder eine Person vor. Kurz, knackig, und direkt anwendbar.",
    standalone:
      "Jede Woche stellt Julian ein hilfreiches, spannendes oder inspirierendes KI-Tool, Projekt oder eine Person vor. Kurz, knackig, mit Herz. Kein Spam. Nur gute Sachen. Versprochen.",
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Da ist was schiefgelaufen. Versuch's nochmal?");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`
          text-center p-6 rounded-2xl animate-fade-in
          ${variant === "featured" ? "bg-[var(--brand)]/5 border border-[var(--brand)]/20" : ""}
        `}
      >
        <p className="text-2xl mb-2">🎉</p>
        <p className="font-heading font-bold text-lg text-[var(--text-primary)]">
          Willkommen an Bord!
        </p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {message}
        </p>
      </div>
    );
  }

  const isFeatured = variant === "featured" || variant === "standalone";

  return (
    <div
      className={`
        ${isFeatured ? "p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]" : ""}
      `}
    >
      <h3
        className={`
          font-heading font-bold text-[var(--text-primary)]
          ${isFeatured ? "text-xl sm:text-2xl mb-2" : "text-lg mb-1"}
        `}
      >
        {customHeadline || headlines[variant]}
      </h3>
      <p
        className={`
          text-[var(--text-secondary)]
          ${isFeatured ? "text-base mb-6" : "text-sm mb-4"}
        `}
      >
        {customDescription || descriptions[variant]}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className={isFeatured ? "flex flex-col sm:flex-row gap-3" : "flex gap-2"}>
          <Input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="E-Mail-Adresse"
          />
          <Button
            type="submit"
            variant="accent"
            size={isFeatured ? "md" : "sm"}
            loading={status === "loading"}
            disabled={!consent || !email}
            className="whitespace-nowrap"
          >
            Dabei sein
          </Button>
        </div>

        {/* DSGVO Consent */}
        <label className="flex items-start gap-2 text-xs text-[var(--text-muted)] cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 rounded border-[var(--border)] accent-[var(--accent)]"
          />
          <span>
            Ich stimme der{" "}
            <a
              href="/datenschutz"
              className="underline hover:text-[var(--text-secondary)]"
              target="_blank"
            >
              Datenschutzerklärung
            </a>{" "}
            zu und möchte den Newsletter erhalten.
          </span>
        </label>

        {status === "error" && (
          <p className="text-sm text-red-500 animate-fade-in">{message}</p>
        )}
      </form>
    </div>
  );
}
