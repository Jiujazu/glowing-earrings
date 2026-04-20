import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/editor-auth";

export async function GET(request: NextRequest) {
  if (process.env.EDITOR_ENABLED !== "true") {
    return NextResponse.json({ success: false, message: "Not found." }, { status: 404 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}
