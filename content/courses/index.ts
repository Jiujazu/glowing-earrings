import type { Course } from "@/lib/types";

import karpathyLlmWiki from "./karpathy-llm-wiki.json";
import agenticOsContextLevels from "./agentic-os-context-levels.json";
import handySpeechToText from "./handy-speech-to-text.json";
import storytellingBildung from "./storytelling-bildung.json";

export const courses: Course[] = [
  karpathyLlmWiki as Course,
  agenticOsContextLevels as Course,
  handySpeechToText as Course,
  storytellingBildung as Course,
];
