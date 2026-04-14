"use client";

import { Suspense } from "react";
import EditModeProvider from "./EditModeProvider";
import SaveButton from "./SaveButton";

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
        {children}
        <SaveButton />
      </EditModeProvider>
    </Suspense>
  );
}
