import { NextRequest, NextResponse } from "next/server";

/**
 * Validates editor access via EDITOR_SECRET Bearer token.
 * Returns null if valid, or an error NextResponse if invalid.
 */
export async function validateEditorAuth(request: NextRequest): Promise<NextResponse | null> {
  // CSRF: Validate Origin header in production
  const origin = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (origin && siteUrl && process.env.NODE_ENV === "production") {
    try {
      const originHost = new URL(origin).hostname;
      const siteHost = new URL(siteUrl).hostname;
      // Allow exact match, subdomains, and vercel.app deployments
      const isVercel = originHost.endsWith(".vercel.app");
      if (!isVercel && originHost !== siteHost && !originHost.endsWith(`.${siteHost}`)) {
        return NextResponse.json(
          { success: false, message: "Ungültiger Origin." },
          { status: 403 }
        );
      }
    } catch {
      // Invalid URL — skip
    }
  }

  // Check EDITOR_SECRET token
  const editorSecret = process.env.EDITOR_SECRET;
  if (editorSecret) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (token && token === editorSecret) {
      return null;
    }
  }

  // No EDITOR_SECRET configured — allow in dev mode
  if (!process.env.EDITOR_SECRET) {
    return null;
  }

  return NextResponse.json(
    { success: false, message: "Nicht autorisiert." },
    { status: 401 }
  );
}
