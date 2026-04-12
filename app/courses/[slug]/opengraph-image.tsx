import { ImageResponse } from "next/og";
import { getCourseBySlug, getDifficultyLabel } from "@/lib/course-utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return new ImageResponse(
      (<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0C0C0E", color: "#F4F4F5", fontSize: "32px" }}>Kurs nicht gefunden</div>),
      size
    );
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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
            }}
          >
            GLOWING EARRINGS
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: colors.text,
              lineHeight: 1.1,
            }}
          >
            {meta.title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: colors.textMuted,
              lineHeight: 1.4,
              maxWidth: "80%",
            }}
          >
            {meta.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: colors.primary,
              fontSize: "16px",
              fontWeight: 700,
              color: "#FFFFFF",
            }}
          >
            {getDifficultyLabel(meta.difficulty)}
          </div>
          <div style={{ fontSize: "18px", color: colors.textMuted }}>
            ~{meta.estimatedMinutes} Min.
          </div>
          <div style={{ fontSize: "18px", color: colors.textMuted }}>
            {meta.sourceAuthor}
          </div>
        </div>
      </div>
    ),
    size
  );
}
