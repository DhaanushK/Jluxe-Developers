import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function HeroIntroSlide({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <article
      className={`hero-slide max-w-4xl ${reducedMotion ? "" : "motion-safe"}`}
      aria-live="polite"
      aria-label="JLUXE introduction"
    >
      <p className="eyebrow text-white/70">JLUXE</p>

      <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
        Building Relationships.
        <br />
        Creating Opportunities.
        <br />
        Delivering Results.
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-7 md:text-lg">
        Connecting people, properties, businesses and talent through real estate,
        business solutions, training and design.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-9">
        <Link to="/ecosystems" className="jluxe-explore-button">
          Explore JLUXE
          <span className="jluxe-explore-button-icon" aria-hidden="true">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </article>
  );
}
