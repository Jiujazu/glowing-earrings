import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { validateEditorAuth } from "@/lib/editor-auth";

interface EditorChange {
  elementId: string;
  fieldPath: string;
  newValue: string;
}

interface SaveRequest {
  slug: string;
  changes: EditorChange[];
}

function applyChanges(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  course: any,
  changes: EditorChange[]
): { applied: number; notFound: string[] } {
  let applied = 0;
  const notFound: string[] = [];

  for (const change of changes) {
    let found = false;

    // Structural change: replace entire module elements array
    // Convention: elementId = "module:{moduleId}", fieldPath = "elements"
    if (change.elementId.startsWith("module:") && change.fieldPath === "elements") {
      const moduleId = change.elementId.replace("module:", "");
      for (const mod of course.modules) {
        if (mod.id === moduleId) {
          try {
            const parsed = JSON.parse(change.newValue);
            // Validate: must be an array where each item has id and type
            if (
              !Array.isArray(parsed) ||
              !parsed.every(
                (el: unknown) =>
                  typeof el === "object" &&
                  el !== null &&
                  "id" in el &&
                  "type" in el &&
                  typeof (el as { id: unknown }).id === "string" &&
                  typeof (el as { type: unknown }).type === "string"
              )
            ) {
              break;
            }
            mod.elements = parsed;
            applied++;
            found = true;
          } catch {
            // Invalid JSON — skip
          }
          break;
        }
      }
      if (!found) notFound.push(change.elementId);
      continue;
    }

    // Search through all modules and elements
    for (const mod of course.modules) {
      for (const element of mod.elements) {
        if (element.id === change.elementId) {
          if (change.fieldPath in element) {
            // For array/object fields (e.g., options), parse JSON
            let value: unknown = change.newValue;
            try {
              const parsed = JSON.parse(change.newValue);
              if (Array.isArray(parsed) || (typeof parsed === "object" && parsed !== null)) {
                value = parsed;
              }
            } catch {
              // Not JSON — use raw string value
            }
            element[change.fieldPath] = value;
            applied++;
            found = true;
          }
          break;
        }
      }
      if (found) break;
    }

    // Check intro fields
    if (!found && change.elementId === "intro-hook") {
      course.intro.hook = change.newValue;
      applied++;
      found = true;
    }
    if (!found && change.elementId === "intro-source") {
      course.intro.sourceContext = change.newValue;
      applied++;
      found = true;
    }

    // Check meta fields
    if (!found && change.elementId.startsWith("meta:")) {
      const metaField = change.elementId.replace("meta:", "");
      const allowedMetaFields = ["title", "subheading", "subtitle"];
      if (allowedMetaFields.includes(metaField) && metaField in course.meta) {
        course.meta[metaField] = change.newValue;
        applied++;
        found = true;
      }
    }

    // Check outro fields
    if (!found && change.elementId === "outro") {
      const allowedOutroFields = ["nextStep", "newsletterCTA", "synthesis"];
      if (allowedOutroFields.includes(change.fieldPath) && change.fieldPath in course.outro) {
        // synthesis is an array — parse JSON
        if (change.fieldPath === "synthesis") {
          try {
            course.outro[change.fieldPath] = JSON.parse(change.newValue);
          } catch {
            // skip invalid JSON
          }
        } else {
          course.outro[change.fieldPath] = change.newValue;
        }
        applied++;
        found = true;
      }
    }

    if (!found) {
      notFound.push(change.elementId);
    }
  }

  return { applied, notFound };
}

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

    const body = (await request.json()) as SaveRequest;
    const { slug, changes } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, message: "Kurs-Slug fehlt." },
        { status: 400 }
      );
    }

    if (!changes || !Array.isArray(changes) || changes.length === 0) {
      return NextResponse.json(
        { success: false, message: "Keine Änderungen übermittelt." },
        { status: 400 }
      );
    }

    // Validate slug format (kebab-case, no path traversal)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { success: false, message: "Ungültiger Kurs-Slug." },
        { status: 400 }
      );
    }

    const octokit = new Octokit({ auth: githubToken });
    const owner = process.env.GITHUB_REPO_OWNER || "Jiujazu";
    const repo = process.env.GITHUB_REPO_NAME || "glowing-earrings";
    const filePath = `content/courses/${slug}.json`;

    // Fetch current file from GitHub
    let fileData;
    try {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: "main",
      });
      fileData = response.data;
    } catch {
      return NextResponse.json(
        { success: false, message: `Kurs-Datei "${slug}.json" nicht gefunden.` },
        { status: 404 }
      );
    }

    if (Array.isArray(fileData) || fileData.type !== "file" || !fileData.content) {
      return NextResponse.json(
        { success: false, message: "Unerwartetes Dateiformat von GitHub." },
        { status: 500 }
      );
    }

    // Decode and parse JSON
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
    let courseJson;
    try {
      courseJson = JSON.parse(currentContent);
    } catch {
      return NextResponse.json(
        { success: false, message: "Kurs-JSON konnte nicht geparst werden." },
        { status: 500 }
      );
    }

    // Apply changes
    const { applied, notFound } = applyChanges(courseJson, changes);

    if (applied === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Keine Elemente gefunden: ${notFound.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Serialize with 2-space indentation + trailing newline
    const updatedContent = JSON.stringify(courseJson, null, 2) + "\n";

    // Commit to GitHub
    const commitMessage =
      changes.length === 1
        ? `edit: update ${changes[0].fieldPath} in ${slug}`
        : `edit: update ${changes.length} elements in ${slug}`;

    try {
      const commitResponse = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: commitMessage,
        content: Buffer.from(updatedContent).toString("base64"),
        sha: fileData.sha,
        branch: "main",
      });

      return NextResponse.json({
        success: true,
        message: `${applied} Änderung${applied > 1 ? "en" : ""} gespeichert.`,
        commitUrl: commitResponse.data.commit.html_url,
      });
    } catch (err: unknown) {
      // SHA conflict — file was modified since we read it
      if (err && typeof err === "object" && "status" in err && err.status === 409) {
        return NextResponse.json(
          {
            success: false,
            message: "Konflikt: Die Datei wurde zwischenzeitlich geändert. Bitte Seite neu laden und erneut versuchen.",
          },
          { status: 409 }
        );
      }
      throw err;
    }
  } catch (err) {
    console.error("Editor save error:", err);
    return NextResponse.json(
      { success: false, message: "Speichern fehlgeschlagen. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
