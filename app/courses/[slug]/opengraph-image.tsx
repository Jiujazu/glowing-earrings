import { ImageResponse } from "next/og";
import { getCourseBySlug, getAllCourseSlugs, getDifficultyLabel } from "@/lib/course-utils";

export const runtime = "edge";

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return new Response("Not found", { status: 404 });
  }

  const { meta } = course;
  const colors = meta.design.colors;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: colors.background,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "32px",
              backgroundColor: colors.accent,
              borderRadius: "4px",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: colors.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            Glowing Earrings
          </span>
        </div>

        {/* Center: title + subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {meta.title}
          </h1>
          <p
            style={{
              fontSize: "24px",
              color: colors.textMuted,
              lineHeight: 1.4,
              margin: 0,
              maxWidth: "80%",
            }}
          >
            {meta.subtitle}
          </p>
        </div>

        {/* Bottom: metadata */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: colors.primary,
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>
              {getDifficultyLabel(meta.difficulty)}
            </span>
          </div>
          <span style={{ fontSize: "18px", color: colors.textMuted }}>
            ~{meta.estimatedMinutes} Min.
          </span>
          <span style={{ fontSize: "18px", color: colors.textMuted }}>
            ·
          </span>
          <span style={{ fontSize: "18px", color: colors.textMuted }}>
            {meta.sourceAuthor}
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
