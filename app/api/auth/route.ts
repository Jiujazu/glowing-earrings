import { NextResponse } from "next/server";

const CLIENT_ID = "Ov23liL3dexsLyJXZxhT";

export async function GET() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    scope: "repo,user",
    response_type: "code",
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params}`
  );
}
