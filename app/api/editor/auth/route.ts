import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  SESSION_COOKIE,
  SESSION_UI_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  signSessionToken,
} from "@/lib/editor-auth";

type RateLimitEntry = { count: number; resetAt: number };
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const attempts = new Map<string, RateLimitEntry>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): { blocked: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    return { blocked: false, retryAfterSec: 0 };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { blocked: true, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { blocked: false, retryAfterSec: 0 };
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function clearAttempts(ip: string) {
  attempts.delete(ip);
}

function checkOrigin(request: NextRequest): NextResponse | null {
  if (process.env.NODE_ENV !== "production") return null;
  const origin = request.headers.get("origin");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!siteUrl) {
    return NextResponse.json(
      { success: false, message: "Server-Konfiguration fehlt (NEXT_PUBLIC_SITE_URL)." },
      { status: 500 }
    );
  }
  if (!origin || origin === "null") {
    return NextResponse.json(
      { success: false, message: "Origin-Header erforderlich." },
      { status: 403 }
    );
  }
  try {
    const originHost = new URL(origin).hostname;
    const siteHost = new URL(siteUrl).hostname;
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

export async function POST(request: NextRequest) {
  const originError = checkOrigin(request);
  if (originError) return originError;

  const secret = process.env.EDITOR_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, message: "Editor ist nicht konfiguriert." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  const rateState = checkRateLimit(ip);
  if (rateState.blocked) {
    return NextResponse.json(
      {
        success: false,
        message: `Zu viele Versuche. Bitte in ${Math.ceil(rateState.retryAfterSec / 60)} Minuten erneut versuchen.`,
      },
      { status: 429, headers: { "Retry-After": String(rateState.retryAfterSec) } }
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    // fall through to 400
  }
  if (!password) {
    return NextResponse.json(
      { success: false, message: "Passwort fehlt." },
      { status: 400 }
    );
  }

  let ok = false;
  try {
    const a = Buffer.from(password);
    const b = Buffer.from(secret);
    ok = a.length === b.length && timingSafeEqual(a, b);
  } catch {
    ok = false;
  }

  if (!ok) {
    recordFailure(ip);
    return NextResponse.json(
      { success: false, message: "Falsches Passwort." },
      { status: 401 }
    );
  }

  clearAttempts(ip);

  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const token = signSessionToken(exp);
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Session konnte nicht signiert werden." },
      { status: 500 }
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  response.cookies.set(SESSION_UI_COOKIE, "1", {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  const originError = checkOrigin(request);
  if (originError) return originError;

  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  response.cookies.delete(SESSION_UI_COOKIE);
  return response;
}
