// ============================================
// Glowing Earrings — Course Data Types
// ============================================

export interface Course {
  meta: CourseMeta;
  intro: CourseIntro;
  modules: Module[];
  outro: CourseOutro;
}

export interface CourseMeta {
  slug: string;
  title: string;
  subtitle: string;
  sourceUrl: string;
  sourceAuthor: string;
  sourceType: "tweet" | "video" | "article" | "document" | "gist" | "other";
  tags: string[];
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  publishedAt: string; // ISO date
  design: CourseDesign;
}

export interface CourseDesign {
  theme: string; // e.g. "hacker-terminal", "retro-magazine", "knowledge-graph"
  colors: {
    background: string;
    surface: string;
    primary: string;
    accent: string;
    text: string;
    textMuted: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
}

export interface CourseIntro {
  hook: string;
  sourceContext: string;
  overview: string[];
}

export interface Module {
  id: string;
  title: string;
  icon?: string;
  estimatedMinutes: number;
  elements: ModuleElement[];
  transitionToNext?: string;
}

export type ModuleElement =
  | ContentElement
  | KeyConceptElement
  | CalloutElement
  | ContextBoxElement
  | QuizElement
  | FlashcardElement
  | ReflectionElement
  | InteractiveElement
  | EasterEggElement;

interface BaseElement {
  id: string;
}

export interface ContentElement extends BaseElement {
  type: "content";
  text: string;
}

export interface KeyConceptElement extends BaseElement {
  type: "key-concept";
  title: string;
  description: string;
  icon?: string;
}

export interface CalloutElement extends BaseElement {
  type: "callout";
  variant: "quote" | "stat" | "example" | "warning" | "tip" | "fun-fact";
  title?: string;
  text: string;
}

export interface ContextBoxElement extends BaseElement {
  type: "context-box";
  term: string;
  explanation: string;
}

export interface QuizElement extends BaseElement {
  type: "quiz";
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
  feedback: string;
}

export interface FlashcardElement extends BaseElement {
  type: "flashcard";
  front: string;
  back: string;
}

export interface ReflectionElement extends BaseElement {
  type: "reflection";
  prompt: string;
  placeholder?: string;
}

export interface InteractiveElement extends BaseElement {
  type: "interactive";
  component: string;
  props: Record<string, unknown>;
}

export interface EasterEggElement extends BaseElement {
  type: "easter-egg";
  trigger: "click" | "hover" | "scroll" | "konami" | "idle";
  content: string;
  component?: string;
}

export interface CourseOutro {
  synthesis: string[];
  nextStep: string;
  takeaway?: TakeawayItem[];
  sourceUrl: string;
  newsletterCTA: string;
}

export interface TakeawayItem {
  emoji: string;
  text: string;
}
