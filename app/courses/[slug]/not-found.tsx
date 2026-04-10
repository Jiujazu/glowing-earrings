import Link from "next/link";
import Container from "@/components/ui/Container";

export default function CourseNotFound() {
  return (
    <section className="py-24">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-6xl mb-6">🔍</p>
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-3">
            Diesen Kurs gibt&apos;s (noch) nicht.
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Aber vielleicht findest du einen anderen, der dich interessiert.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-accent hover:bg-accent-hover rounded-xl transition-colors"
          >
            Alle Kurse ansehen
          </Link>
        </div>
      </Container>
    </section>
  );
}
