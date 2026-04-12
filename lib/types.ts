// ============================================
// Glowing Earrings — Course Data Types
// ============================================

export interface Course {
  meta: CourseMeta;
  intro: CourseIntro;
  modules: Module[];
  outro: CourseOutro;
}

export type CourseCategory = "ai-tech" | "ai-creativity" | "ai-society" | "ai-workflows";

export interface CourseMeta {
  slug: string;
  title: string;
  subtitle: string;
  sourceUrl: string;
  sourceAuthor: string;
  sourceType: "tweet" | "video" | "article" | "document" | "gist" | "other";
  category: CourseCategory;
  tags: string[];
  estimatedMinutes: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  publishedAt: string; // ISO date
  draft?: boolean;
  relatedCourses?: string[]; // slugs
  design: CourseDesign;
}

export interface CourseColors {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: string;
  textMuted: string;
}

export interface CourseDesign {
  theme: string; // e.g. "hacker-terminal", "retro-magazine", "knowledge-graph"
  colors: CourseColors;          // Dark mode (default)
  lightColors?: CourseColors;    // Light mode (optional)
  fonts?: {
    heading?: string;
    body?: string;
  };
}

export interface CourseIntro {
  hook: string;
  sourceContext: string;
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
  | EasterEggElement
  | ImageElement
  | VideoElement
  | CodeBlockElement
  | StepByStepElement;

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

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  fullWidth?: boolean;
}

export interface VideoElement extends BaseElement {
  type: "video";
  platform: "youtube" | "vimeo";
  videoId: string;
  title?: string;
  startAt?: number;
}

export interface CodeBlockElement extends BaseElement {
  type: "code-block";
  code: string;
  language?: string;
  filename?: string;
  highlightLines?: number[];
}

export interface StepByStepElement extends BaseElement {
  type: "step-by-step";
  title?: string;
  steps: StepItem[];
}

export interface StepItem {
  label: string;
  content: string;
  image?: string;
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
