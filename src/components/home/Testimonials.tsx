import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  organization?: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t bg-secondary/30"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Testimonials</p>

            <h2
              id="testimonials-heading"
              className="mt-4 max-w-2xl text-4xl leading-[1.05] md:text-5xl"
            >
              What people say about working with JLUXE.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Real experiences from people and businesses who have worked with
              JLUXE.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
          >
            Start a conversation
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {testimonials.length === 0 ? (
          <div className="mt-12 border border-border bg-background p-8 sm:p-10 md:mt-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                Coming soon
              </p>

              <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                Client experiences will appear here.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                We’ll share verified testimonials from JLUXE clients and
                partners once they are approved for publication.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-px border bg-border md:mt-14 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                className="bg-background p-8 md:p-10"
              >
                <blockquote>
                  <p className="font-display text-2xl leading-relaxed md:text-3xl">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                <footer className="mt-8 border-t pt-5">
                  <p className="text-sm font-semibold">{testimonial.name}</p>

                  {(testimonial.role || testimonial.organization) && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[testimonial.role, testimonial.organization]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </footer>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}