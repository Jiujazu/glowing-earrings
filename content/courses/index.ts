import type { Course } from "@/lib/types";
import { karpathyLlmWiki } from "./karpathy-llm-wiki";
import { agenticOsContextLevels } from "./agentic-os-context-levels";
import { handySpeechToText } from "./handy-speech-to-text";

export const courses: Course[] = [
  karpathyLlmWiki,
  agenticOsContextLevels,
  handySpeechToText,
];
