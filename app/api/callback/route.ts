import { NextRequest } from "next/server";

const CLIENT_ID = "Ov23liL3dexsLyJXZxhT";
const CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET || "";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      }),
    }
  );

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response(`OAuth error: ${data.error_description}`, {
      status: 400,
    });
  }

  // Decap CMS expects this specific postMessage format
  const html = `
    <html><body><script>
      (function() {
        function recieveMessage(e) {
          console.log("recieveMessage %o", e);
          window.opener.postMessage(
            'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: "github" })}',
            e.origin
          );
          window.removeEventListener("message", recieveMessage, false);
        }
        window.addEventListener("message", recieveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script></body></html>
  `;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
