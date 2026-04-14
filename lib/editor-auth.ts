import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Validates editor access via either:
 * 1. NextAuth session (GitHub OAuth) — preferred
 * 2. EDITOR_SECRET Bearer token — fallback
 *
 * Also validates Origin header for CSRF protection.
 * Returns null if valid, or an error NextResponse if invalid.
 */
export async function validateEditorAuth(request: NextRequest): Promise<NextResponse | null> {
  // CSRF: Validate Origin header if present
  const origin = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (origin && siteUrl && !origin.includes(new URL(siteUrl).hostname)) {
    // In production, reject cross-origin requests
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, message: "Ungültiger Origin." },
        { status: 403 }
      );
    }
  }

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
