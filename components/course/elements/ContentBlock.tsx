import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ContentElement } from "@/lib/types";

export default function ContentBlock({ element }: { element: ContentElement }) {
  return (
    <div className="prose prose-base sm:prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--course-text)] prose-h3:text-lg prose-h3:sm:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-[var(--course-primary)] prose-p:text-[var(--course-text)] prose-p:leading-[1.8] prose-p:mb-5 prose-a:text-[var(--course-primary)] prose-a:underline-offset-2 prose-strong:text-[var(--course-text)] prose-code:text-[var(--course-primary)] prose-code:bg-[var(--course-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:text-[var(--course-text)] prose-ul:my-4 prose-ol:my-4 prose-li:mb-2">
      <Markdown remarkPlugins={[remarkGfm]}>{element.text}</Markdown>
    </div>
  );
}
