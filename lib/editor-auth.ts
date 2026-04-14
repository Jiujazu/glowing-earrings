import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Validates editor access via either:
 * 1. NextAuth session (GitHub OAuth) — preferred
 * 2. EDITOR_SECRET Bearer token — fallback
 *
 * Returns null if valid, or a 401 NextResponse if invalid.
 */
export async function validateEditorAuth(request: NextRequest): Promise<NextResponse | null> {
  // Method 1: Check NextAuth session
  const session = await auth();
  if (session?.user) {
    return null; // Authenticated via OAuth
  }

  // Method 2: Check EDITOR_SECRET token
  const editorSecret = process.env.EDITOR_SECRET;
  if (editorSecret) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (token && token === editorSecret) {
      return null; // Authenticated via token
    }
  }

  // No EDITOR_SECRET configured and no session — allow in dev mode
  if (!process.env.EDITOR_SECRET && !process.env.AUTH_GITHUB_ID) {
    return null;
  }

  return NextResponse.json(
    { success: false, message: "Nicht autorisiert." },
    { status: 401 }
  );
}
