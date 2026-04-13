"use client";

import type { Module } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface CourseTOCProps {
  modules: Module[];
}

export default function CourseTOC({ modules }: CourseTOCProps) {
  function scrollTo(id: string) {
    const el = document.getElementById(`module-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <section className="px-4 pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal delay={300}>
          <div
            className="rounded-xl p-5 sm:p-6"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--course-primary) 6%, var(--course-surface))",
            }}
          >
            <p className="text-xs font-medium text-[var(--course-text-muted)] uppercase tracking-wide mb-4">
              Inhalt
            </p>
            <ol className="space-y-1">
              {modules.map((mod, i) => (
                <li key={mod.id}>
                  <button
                    onClick={() => scrollTo(mod.id)}
                    className="flex items-center gap-3 w-full text-left py-2 px-2 -mx-2 rounded-lg transition-colors hover:bg-[var(--course-primary)]/8 group"
                  >
                    <span
                      className="flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold font-heading flex-shrink-0 border border-[var(--course-text)]/15 text-[var(--course-text-muted)] group-hover:border-[var(--course-primary)]/40 group-hover:text-[var(--course-primary)] transition-colors"
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-heading font-medium text-[var(--course-text)] group-hover:text-[var(--course-primary)] transition-colors">
                      {mod.icon && (
                        <span className="mr-1.5">{mod.icon}</span>
                      )}
                      {mod.title}
                    </span>
                    {mod.estimatedMinutes && (
                      <span className="ml-auto text-xs text-[var(--course-text-muted)] flex-shrink-0">
                        ~{mod.estimatedMinutes} Min
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
