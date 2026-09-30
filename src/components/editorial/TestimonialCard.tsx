import type { Testimonial } from "@/lib/editorial";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="bg-background p-8 md:p-10">
      <blockquote>
        <p className="font-display text-2xl leading-relaxed md:text-3xl">“{testimonial.quote}”</p>
      </blockquote>
      <footer className="mt-8 border-t pt-5">
        <p className="text-sm font-semibold">{testimonial.name}</p>
        {(testimonial.role || testimonial.organization) && (
          <p className="mt-1 text-sm text-muted-foreground">{[testimonial.role, testimonial.organization].filter(Boolean).join(" · ")}</p>
        )}
      </footer>
    </article>
  );
}
