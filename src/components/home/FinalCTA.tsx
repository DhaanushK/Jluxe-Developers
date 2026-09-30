import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="border-t bg-ink text-ink-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Let's create what's next
            </p>

            <h2
              id="final-cta-heading"
              className="mt-5 max-w-3xl font-display text-4xl leading-[1.02] text-white sm:text-5xl md:text-6xl"
            >
              Have a question or a plan in mind?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Connect with JLUXE and find the ecosystem that fits your
              requirement.
            </p>
          </div>

          <Link
            to="/contact"
            className="jluxe-explore-button shrink-0"
          >
            Get in touch
            <span className="jluxe-explore-button-icon" aria-hidden="true">
              <ArrowRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}