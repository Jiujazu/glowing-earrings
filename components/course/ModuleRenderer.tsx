import type { Module, FlashcardElement } from "@/lib/types";
import ContentBlock from "./elements/ContentBlock";
import KeyConcept from "./elements/KeyConcept";
import Callout from "./elements/Callout";
import ContextBox from "./elements/ContextBox";
import QuizCard from "./elements/QuizCard";
import FlashcardDeck from "./elements/FlashcardDeck";
import ReflectionPrompt from "./elements/ReflectionPrompt";
import EasterEgg from "./elements/EasterEgg";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ModuleRenderer({ module }: { module: Module }) {
  const renderedElements: React.ReactNode[] = [];
  let flashcardBuffer: FlashcardElement[] = [];
  let elementIndex = 0;

  function flushFlashcards() {
    if (flashcardBuffer.length > 0) {
      const idx = elementIndex++;
      renderedElements.push(
        <ScrollReveal key={`flashdeck-${flashcardBuffer[0].id}`} delay={Math.min(idx * 60, 300)}>
          <FlashcardDeck elements={flashcardBuffer} />
        </ScrollReveal>
      );
      flashcardBuffer = [];
    }
  }

  for (const element of module.elements) {
    if (element.type === "flashcard") {
      flashcardBuffer.push(element);
      continue;
    }

    flushFlashcards();
    const idx = elementIndex++;
    const delay = Math.min(idx * 60, 300);

    switch (element.type) {
      case "content":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <ContentBlock element={element} />
          </ScrollReveal>
        );
        break;
      case "key-concept":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay} direction="left">
            <KeyConcept element={element} />
          </ScrollReveal>
        );
        break;
      case "callout":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <Callout element={element} />
          </ScrollReveal>
        );
        break;
      case "context-box":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay} direction="right">
            <ContextBox element={element} />
          </ScrollReveal>
        );
        break;
      case "quiz":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <QuizCard element={element} />
          </ScrollReveal>
        );
        break;
      case "reflection":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <ReflectionPrompt element={element} />
          </ScrollReveal>
        );
        break;
      case "easter-egg":
        renderedElements.push(
          <EasterEgg key={element.id} element={element} />
        );
        break;
      case "interactive":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <div className="bg-[var(--course-surface)] rounded-xl p-5 text-center text-[var(--course-text-muted)]">
              [Interaktives Element: {element.component}]
            </div>
          </ScrollReveal>
        );
        break;
    }
  }

  flushFlashcards();

  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Module Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            {module.icon && <span className="text-2xl">{module.icon}</span>}
            <h2
              className="font-heading text-xl sm:text-2xl font-bold text-[var(--course-text)]"
              style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
            >
              {module.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Elements */}
        <div className="space-y-6">{renderedElements}</div>

        {/* Transition to next module */}
        {module.transitionToNext && (
          <ScrollReveal delay={100}>
            <div className="mt-8 pt-6 border-t border-[var(--course-text)]/10">
              <p className="text-sm text-[var(--course-text-muted)] italic">
                {module.transitionToNext}
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
