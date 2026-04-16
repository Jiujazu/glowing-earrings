"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Module, ModuleElement, FlashcardElement } from "@/lib/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
import { useEditMode } from "@/components/editor/EditModeProvider";
import SortableElement from "@/components/editor/SortableElement";
import AddElementButton from "@/components/editor/AddElementButton";

function renderElement(element: ModuleElement): React.ReactNode {
  switch (element.type) {
    case "content":
      return <ContentBlock element={element} />;
    case "key-concept":
      return <KeyConcept element={element} />;
    case "callout":
      return <Callout element={element} />;
    case "context-box":
      return <ContextBox element={element} />;
    case "quiz":
      return <QuizCard element={element} />;
    case "flashcard":
      return <FlashcardDeck elements={[element]} />;
    case "reflection":
      return <ReflectionPrompt element={element} />;
    case "easter-egg":
      return <EasterEgg element={element} />;
    case "image":
      return <ImageBlock element={element} />;
    case "video":
      return <VideoEmbed element={element} />;
    case "code-block":
      return <CodeBlock element={element} />;
    case "step-by-step":
      return <StepByStep element={element} />;
    case "interactive":
      return null;
    default:
      return null;
  }
}

function EditModeElements({
  module,
}: {
  module: Module;
}) {
  const editMode = useEditMode();
  const [elements, setElements] = useState<ModuleElement[]>(module.elements);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const registerStructuralChange = useCallback(
    (updatedElements: ModuleElement[]) => {
      if ("registerChange" in editMode) {
        editMode.registerChange({
          elementId: `module:${module.id}`,
          fieldPath: "elements",
          newValue: JSON.stringify(updatedElements),
        });
      }
    },
    [editMode, module.id]
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const updated = [...elements];
    const [moved] = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, moved);
    setElements(updated);
    registerStructuralChange(updated);
  }

  function handleDelete(elementId: string) {
    const updated = elements.filter((el) => el.id !== elementId);
    setElements(updated);
    registerStructuralChange(updated);
  }

  function handleAdd(afterIndex: number, newElement: ModuleElement) {
    const updated = [...elements];
    updated.splice(afterIndex + 1, 0, newElement);
    setElements(updated);
    registerStructuralChange(updated);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={elements.map((el) => el.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-6">
          {/* Add button at the top */}
          <AddElementButton onAdd={(el) => handleAdd(-1, el)} />

          {elements.map((element, idx) => (
            <div key={element.id}>
              <SortableElement
                id={element.id}
                elementType={element.type}
                onDelete={() => handleDelete(element.id)}
              >
                {renderElement(element)}
              </SortableElement>
              <AddElementButton onAdd={(el) => handleAdd(idx, el)} />
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

function ReadOnlyElements({ module }: { module: Module }) {
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
      case "key-concept":
        renderedElements.push(
          <KeyConcept key={element.id} element={element} />
        );
        break;
      case "easter-egg":
        renderedElements.push(
          <EasterEgg key={element.id} element={element} />
        );
        break;
      default:
        renderedElements.push(
          <ScrollReveal key={element.id} delay={delay}>
            {renderElement(element)}
          </ScrollReveal>
        );
    }
  }

  flushFlashcards();

  return <div className="space-y-10 sm:space-y-12">{renderedElements}</div>;
}

export default function ModuleRenderer({ module, index, allModules }: { module: Module; index: number; allModules: Module[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const tracker = useProgressTracker();
  const { isEditMode } = useEditMode();

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

  return (
    <section ref={sectionRef} id={`module-${module.id}`} className="scroll-mt-20">
      {/* Sticky Chapter Banner with dropdown navigation */}
      <ChapterBanner modules={allModules} currentIndex={index} />

      {/* Module Content */}
      <div className="py-12 sm:py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Elements */}
        {isEditMode ? (
          <EditModeElements module={module} />
        ) : (
          <ReadOnlyElements module={module} />
        )}

        {/* Transition to next module */}
        {module.transitionToNext && (
          <ScrollReveal delay={100}>
            <div className="mt-8 pt-6 border-t-4 border-[var(--course-border-muted)]">
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
