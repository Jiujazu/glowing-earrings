"use client";

import { Suspense } from "react";
import EditModeProvider from "./EditModeProvider";
import SaveButton from "./SaveButton";
import ToastProvider from "./EditorToast";
import ShortcutHelp from "./ShortcutHelp";

export default function EditModeWrapper({
  courseSlug,
  children,
}: {
  courseSlug: string;
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<>{children}</>}>
      <EditModeProvider courseSlug={courseSlug}>
        <ToastProvider>
          {children}
          <SaveButton />
          <ShortcutHelp />
        </ToastProvider>
      </EditModeProvider>
    </Suspense>
  );
}
