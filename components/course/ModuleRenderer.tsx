import type { Module, FlashcardElement } from "@/lib/types";
import ContentBlock from "./elements/ContentBlock";
import KeyConcept from "./elements/KeyConcept";
import Callout from "./elements/Callout";
import ContextBox from "./elements/ContextBox";
import QuizCard from "./elements/QuizCard";
import FlashcardDeck from "./elements/FlashcardDeck";
import ReflectionPrompt from "./elements/ReflectionPrompt";
import EasterEgg from "./elements/EasterEgg";

export default function ModuleRenderer({ module }: { module: Module }) {
  // Collect consecutive flashcards into a single deck
  const renderedElements: React.ReactNode[] = [];
  let flashcardBuffer: FlashcardElement[] = [];

  function flushFlashcards() {
    if (flashcardBuffer.length > 0) {
      renderedElements.push(
        <FlashcardDeck
          key={`flashdeck-${flashcardBuffer[0].id}`}
          elements={flashcardBuffer}
        />
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

    switch (element.type) {
      case "content":
        renderedElements.push(
          <ContentBlock key={element.id} element={element} />
        );
        break;
      case "key-concept":
        renderedElements.push(
          <KeyConcept key={element.id} element={element} />
        );
        break;
      case "callout":
        renderedElements.push(
          <Callout key={element.id} element={element} />
        );
        break;
      case "context-box":
        renderedElements.push(
          <ContextBox key={element.id} element={element} />
        );
        break;
      case "quiz":
        renderedElements.push(
          <QuizCard key={element.id} element={element} />
        );
        break;
      case "reflection":
        renderedElements.push(
          <ReflectionPrompt key={element.id} element={element} />
        );
        break;
      case "easter-egg":
        renderedElements.push(
          <EasterEgg key={element.id} element={element} />
        );
        break;
      case "interactive":
        // Placeholder for future interactive components
        renderedElements.push(
          <div
            key={element.id}
            className="bg-[var(--course-surface)] rounded-xl p-5 text-center text-[var(--course-text-muted)]"
          >
            [Interaktives Element: {element.component}]
          </div>
        );
        break;
    }
  }

  flushFlashcards();

  return (
    <section className="py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Module Header */}
        <div className="flex items-center gap-3 mb-6">
          {module.icon && <span className="text-2xl">{module.icon}</span>}
          <h2
            className="font-heading text-xl sm:text-2xl font-bold text-[var(--course-text)]"
            style={{ fontFamily: "var(--course-heading-font, var(--font-heading))" }}
          >
            {module.title}
          </h2>
        </div>

        {/* Elements */}
        <div className="space-y-6">{renderedElements}</div>

        {/* Transition to next module */}
        {module.transitionToNext && (
          <div className="mt-8 pt-6 border-t border-[var(--course-text)]/10">
            <p className="text-sm text-[var(--course-text-muted)] italic">
              {module.transitionToNext}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
