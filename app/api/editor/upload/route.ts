import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { validateEditorAuth } from "@/lib/editor-auth";

export async function POST(request: NextRequest) {
  try {
    const authError = await validateEditorAuth(request);
    if (authError) return authError;

    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { success: false, message: "Server-Konfiguration fehlt (GITHUB_TOKEN)." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const slug = formData.get("slug") as string | null;
    const filename = formData.get("filename") as string | null;

    if (!file || !slug) {
      return NextResponse.json(
        { success: false, message: "Datei und Kurs-Slug sind erforderlich." },
        { status: 400 }
      );
    }

    // Validate slug (kebab-case, no path traversal)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { success: false, message: "Ungültiger Kurs-Slug." },
        { status: 400 }
      );
    }

    // Validate file type (SVG is excluded — can contain <script> and executes
    // in same-origin when loaded directly, enabling XSS escalation from any
    // editor session).
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Nur Bilder erlaubt (JPEG, PNG, WebP, GIF)." },
        { status: 400 }
      );
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Datei zu groß (max. 5 MB)." },
        { status: 400 }
      );
    }

    // Generate safe filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const safeName = filename
      ? filename.replace(/[^a-z0-9-]/gi, "-").toLowerCase() + "." + ext
      : file.name.replace(/[^a-z0-9.-]/gi, "-").toLowerCase();

    const filePath = `public/courses/${slug}/${safeName}`;

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Content = Buffer.from(arrayBuffer).toString("base64");

    const owner = process.env.GITHUB_REPO_OWNER;
    const repo = process.env.GITHUB_REPO_NAME;
    if (!owner || !repo) {
      return NextResponse.json(
        { success: false, message: "Server-Konfiguration fehlt (GITHUB_REPO_OWNER/NAME)." },
        { status: 500 }
      );
    }

    const octokit = new Octokit({ auth: githubToken });

    // Check if file already exists (to get SHA for update)
    let existingSha: string | undefined;
    try {
      const existing = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: "main",
      });
      if (!Array.isArray(existing.data) && existing.data.type === "file") {
        existingSha = existing.data.sha;
      }
    } catch {
      // File doesn't exist yet — that's fine
    }

    // Commit image to GitHub
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `upload: add image ${safeName} for ${slug}`,
      content: base64Content,
      sha: existingSha,
      branch: "main",
    });

    // Return the public URL path (relative to public/)
    const publicPath = `/courses/${slug}/${safeName}`;

    return NextResponse.json({
      success: true,
      message: "Bild hochgeladen.",
      src: publicPath,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    return NextResponse.json(
      { success: false, message: "Upload fehlgeschlagen. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
