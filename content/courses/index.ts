import type { Course } from "@/lib/types";

import karpathyLlmWiki from "./karpathy-llm-wiki/course.json";
import agenticOsContextLevels from "./agentic-os-context-levels/course.json";
import handySpeechToText from "./handy-speech-to-text/course.json";
import storytellingBildung from "./storytelling-bildung/course.json";
import llmWikiMemoryEngine from "./llm-wiki-memory-engine/course.json";

export const courses: Course[] = [
  karpathyLlmWiki as Course,
  agenticOsContextLevels as Course,
  handySpeechToText as Course,
  storytellingBildung as Course,
  llmWikiMemoryEngine as Course,
];
