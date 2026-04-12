import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ContentElement } from "@/lib/types";

export default function ContentBlock({ element }: { element: ContentElement }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--course-text)] prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-[var(--course-text)] prose-p:leading-relaxed prose-p:mb-4 prose-a:text-[var(--course-primary)] prose-a:underline-offset-2 prose-strong:text-[var(--course-text)] prose-code:text-[var(--course-primary)] prose-code:bg-[var(--course-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:text-[var(--course-text)] prose-ul:my-3 prose-ol:my-3 prose-li:mb-1.5">
      <Markdown remarkPlugins={[remarkGfm]}>{element.text}</Markdown>
    </div>
  );
}
