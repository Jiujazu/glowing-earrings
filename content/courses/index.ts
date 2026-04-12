import type { Course } from "@/lib/types";
import { karpathyLlmWiki } from "./karpathy-llm-wiki";
import { agenticOsContextLevels } from "./agentic-os-context-levels";

export const courses: Course[] = [
  karpathyLlmWiki,
  agenticOsContextLevels,
];
