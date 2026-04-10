import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ContentElement } from "@/lib/types";

export default function ContentBlock({ element }: { element: ContentElement }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--course-text)] prose-p:text-[var(--course-text)] prose-p:leading-relaxed prose-a:text-[var(--course-primary)] prose-a:underline-offset-2 prose-strong:text-[var(--course-text)] prose-code:text-[var(--course-primary)] prose-code:bg-[var(--course-surface)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:text-[var(--course-text)]">
      <Markdown remarkPlugins={[remarkGfm]}>{element.text}</Markdown>
    </div>
  );
}
