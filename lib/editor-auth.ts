import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "editor_session";
export const SESSION_UI_COOKIE = "editor_ui";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24h

function base64url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function hmac(payload: string, secret: string): string {
  return base64url(createHmac("sha256", secret).update(payload).digest());
}

/**
 * Signs a session token of the form `${expTimestamp}.${hmac}`.
 * Returns null if EDITOR_SECRET is not configured.
 */
export function signSessionToken(expSeconds: number): string | null {
  const secret = process.env.EDITOR_SECRET;
  if (!secret) return null;
  const payload = String(expSeconds);
  return `${payload}.${hmac(payload, secret)}`;
}

/**
 * Verifies a session token. Returns true only if the HMAC is valid and the
 * expiry has not passed.
 */
export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const secret = process.env.EDITOR_SECRET;
  if (!secret) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = hmac(payload, secret);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const exp = Number(payload);
  if (!Number.isFinite(exp)) return false;
  return Math.floor(Date.now() / 1000) < exp;
}

function checkOrigin(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== "production") return null;
  const origin = request.headers.get("origin");
  // Expected hostname: prefer NEXT_PUBLIC_SITE_URL, fall back to the request's
  // own host (set by the platform, not by the attacker — safe for CSRF compare).
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  let siteHost = "";
  if (siteUrl) {
    try {
      siteHost = new URL(siteUrl).hostname;
    } catch {
      // ignored — fall back to request host
    }
  }
  if (!siteHost) {
    siteHost = request.nextUrl.hostname;
  }
  if (!origin || origin === "null") {
    return NextResponse.json(
      { success: false, message: "Origin-Header erforderlich." },
      { status: 403 }
    );
  }
  try {
    const originHost = new URL(origin).hostname;
    if (originHost !== siteHost && !originHost.endsWith(`.${siteHost}`)) {
      return NextResponse.json(
        { success: false, message: "Ungültiger Origin." },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: "Ungültiger Origin." },
      { status: 403 }
    );
  }
  return null;
}

/**
 * Validates editor access via either a signed session cookie (preferred) or
 * the EDITOR_SECRET Bearer token (legacy ?edit=TOKEN flow). Returns null if
 * valid, or an error NextResponse if invalid.
 */
export async function validateEditorAuth(request: NextRequest): Promise<NextResponse | null> {
  if (process.env.EDITOR_ENABLED !== "true") {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const originError = checkOrigin(request);
  if (originError) return originError;

  // 1. Cookie-based session (password flow)
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (sessionCookie && verifySessionToken(sessionCookie)) {
    return null;
  }

  // 2. Bearer token (legacy URL-param flow)
  const editorSecret = process.env.EDITOR_SECRET;
  if (editorSecret) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (token) {
      try {
        const a = Buffer.from(token);
        const b = Buffer.from(editorSecret);
        if (a.length === b.length && timingSafeEqual(a, b)) {
          return null;
        }
      } catch {
        // length mismatch or encoding error — fall through to 401
      }
    }
  }

  // No EDITOR_SECRET configured — allow in dev mode only
  if (!process.env.EDITOR_SECRET) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { success: false, message: "Editor ist nicht konfiguriert." },
        { status: 403 }
      );
    }
    return null;
  }

  return NextResponse.json(
    { success: false, message: "Nicht autorisiert." },
    { status: 401 }
  );
}
