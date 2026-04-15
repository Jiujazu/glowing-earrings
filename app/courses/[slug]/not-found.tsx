import Link from "next/link";
import Container from "@/components/ui/Container";

export default function CourseNotFound() {
  return (
    <section className="py-24">
      <Container size="narrow">
        <div className="text-center border-4 border-[var(--neo-border)] bg-[var(--surface)] p-12"
          style={{ boxShadow: '8px 8px 0px 0px var(--neo-shadow-color)' }}
        >
          <p className="text-6xl mb-6">🔍</p>
          <h1 className="font-heading text-3xl font-black text-[var(--text-primary)] mb-3 uppercase">
            Diesen Kurs gibt&apos;s (noch) nicht.
          </h1>
          <p className="text-lg font-medium text-[var(--text-primary)] mb-8">
            Aber vielleicht findest du einen anderen, der dich interessiert.
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 text-base font-black uppercase tracking-wide text-white bg-[var(--accent)] border-4 border-[var(--neo-border)] transition-all duration-100 press-feedback"
            style={{ boxShadow: '4px 4px 0px 0px var(--neo-shadow-color)' }}
          >
            Alle Kurse ansehen
          </Link>
        </div>
      </Container>
    </section>
  );
}
