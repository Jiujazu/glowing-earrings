import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug, getAllCourseSlugs, getAllCoursesIncludingDrafts } from "@/lib/course-utils";
import CoursePlayer from "@/components/course/CoursePlayer";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  // Generate pages for all courses including drafts (drafts are accessible by URL)
  return getAllCoursesIncludingDrafts().map((c) => ({ slug: c.meta.slug }));
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return {
    title: course.meta.title,
    description: course.meta.subtitle,
    openGraph: {
      title: `${course.meta.title} | Glowing Earrings`,
      description: course.meta.subtitle,
      type: "article",
      tags: course.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: course.meta.title,
      description: course.meta.subtitle,
    },
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.meta.title,
            description: course.meta.subtitle,
            provider: {
              "@type": "Organization",
              name: "Glowing Earrings — The Creative AI Academy",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://glowing-earrings.vercel.app",
            },
            educationalLevel: course.meta.difficulty,
            timeRequired: `PT${course.meta.estimatedMinutes}M`,
            inLanguage: "de",
            isAccessibleForFree: true,
            author: {
              "@type": "Person",
              name: course.meta.sourceAuthor,
            },
          }),
        }}
      />
      <CoursePlayer course={course} />
    </>
  );
}
