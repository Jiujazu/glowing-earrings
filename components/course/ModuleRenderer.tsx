"use client";

import { useEffect, useRef } from "react";
import type { Module, FlashcardElement } from "@/lib/types";
import ChapterBanner from "./ChapterBanner";
import ContentBlock from "./elements/ContentBlock";
import KeyConcept from "./elements/KeyConcept";
import Callout from "./elements/Callout";
import ContextBox from "./elements/ContextBox";
import QuizCard from "./elements/QuizCard";
import FlashcardDeck from "./elements/FlashcardDeck";
import ReflectionPrompt from "./elements/ReflectionPrompt";
import EasterEgg from "./elements/EasterEgg";
import ImageBlock from "./elements/ImageBlock";
import VideoEmbed from "./elements/VideoEmbed";
import CodeBlock from "./elements/CodeBlock";
import StepByStep from "./elements/StepByStep";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useProgressTracker } from "./CourseProgressTracker";

export default function ModuleRenderer({ module, index, allModules }: { module: Module; index: number; allModules: Module[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const tracker = useProgressTracker();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !tracker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tracker.onModuleVisible(module.id);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [module.id, tracker]);
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
          <KeyConcept key={element.id} element={element} />
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
      case "image":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <ImageBlock element={element} />
          </ScrollReveal>
        );
        break;
      case "video":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <VideoEmbed element={element} />
          </ScrollReveal>
        );
        break;
      case "code-block":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <CodeBlock element={element} />
          </ScrollReveal>
        );
        break;
      case "step-by-step":
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            <StepByStep element={element} />
          </ScrollReveal>
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
    <section ref={sectionRef} id={`module-${module.id}`} className="scroll-mt-20">
      {/* Sticky Chapter Banner with dropdown navigation */}
      <ChapterBanner modules={allModules} currentIndex={index} />

      {/* Module Content */}
      <div className="py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Elements */}
        <div className="space-y-10 sm:space-y-12">{renderedElements}</div>

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
      </div>
    </section>
  );
}
