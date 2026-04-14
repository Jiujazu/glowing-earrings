import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { validateEditorAuth } from "@/lib/editor-auth";

export async function GET(request: NextRequest) {
  try {
    const authError = await validateEditorAuth(request);
    if (authError) return authError;

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { success: false, message: "Server-Konfiguration fehlt." },
        { status: 500 }
      );
    }

    const slug = request.nextUrl.searchParams.get("slug");
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { success: false, message: "Ungültiger Slug." },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: githubToken });
    const owner = process.env.GITHUB_REPO_OWNER || "Jiujazu";
    const repo = process.env.GITHUB_REPO_NAME || "glowing-earrings";
    const filePath = `content/courses/${slug}.json`;

    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      path: filePath,
      per_page: 10,
    });

    if (!Array.isArray(commits) || commits.length === 0) {
      return NextResponse.json({ success: true, history: [] });
    }

    const history = commits.map((commit) => ({
      sha: commit.sha.slice(0, 7),
      message: commit.commit.message.split("\n")[0],
      date: commit.commit.committer?.date || commit.commit.author?.date || "",
      author: commit.commit.author?.name || "Unknown",
      url: commit.html_url,
    }));

    return NextResponse.json({ success: true, history });
  } catch (err) {
    console.error("History error:", err);
    return NextResponse.json(
      { success: false, message: "History konnte nicht geladen werden." },
      { status: 500 }
    );
  }
}
