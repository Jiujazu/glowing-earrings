"use client";

import type { Module } from "@/lib/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LABEL } from "@/lib/typography";
import IconBox from "@/components/ui/IconBox";
import { getIconForEmoji } from "@/lib/icon-map";

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
            className="p-5 sm:p-6 border-4 border-[var(--course-border)]"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--course-primary) 10%, var(--course-surface))",
              boxShadow: "var(--course-shadow)",
            }}
          >
            <p className={`text-xs ${LABEL} text-[var(--course-text-muted)] mb-4`}>
              Inhalt
            </p>
            <ol className="space-y-1">
              {modules.map((mod, i) => (
                <li key={mod.id}>
                  <button
                    onClick={() => scrollTo(mod.id)}
                    className="flex items-center gap-3 w-full text-left py-3 px-2 -mx-2 transition-colors hover:bg-[var(--course-primary)]/8 group"
                  >
                    {mod.icon ? (
                      <IconBox icon={getIconForEmoji(mod.icon)} color="var(--course-primary)" size="sm" />
                    ) : (
                      <span
                        className="flex items-center justify-center w-7 h-7 text-[11px] font-black font-heading flex-shrink-0 border-2 border-[var(--course-border-muted)] text-[var(--course-text-muted)] group-hover:border-[var(--course-primary)] group-hover:text-[var(--course-primary)] group-hover:bg-[var(--course-primary)]/10 transition-colors"
                      >
                        {i + 1}
                      </span>
                    )}
                    <span className="text-sm font-heading font-bold text-[var(--course-text)] group-hover:text-[var(--course-primary)] transition-colors">
                      {mod.title}
                    </span>
                    {mod.estimatedMinutes && (
                      <span className="ml-auto text-xs font-bold text-[var(--course-text-muted)] flex-shrink-0 uppercase">
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
