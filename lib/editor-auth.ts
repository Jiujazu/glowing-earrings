import { NextRequest, NextResponse } from "next/server";

/**
 * Validates the editor token from the Authorization header against EDITOR_SECRET.
 * Returns null if valid, or a 401 NextResponse if invalid.
 */
export function validateEditorAuth(request: NextRequest): NextResponse | null {
  const editorSecret = process.env.EDITOR_SECRET;

  // If no EDITOR_SECRET is configured, skip auth (dev mode)
  if (!editorSecret) return null;

  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token || token !== editorSecret) {
    return NextResponse.json(
      { success: false, message: "Nicht autorisiert." },
      { status: 401 }
    );
  }

  return null;
}
