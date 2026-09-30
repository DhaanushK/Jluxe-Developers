import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Ecosystem } from "@/lib/site";

type HeroSlideProps = {
  ecosystem: Ecosystem;
  reducedMotion?: boolean;
};

export function HeroSlide({ ecosystem, reducedMotion = false }: HeroSlideProps) {
  return (
    <article
      key={ecosystem.slug}
      className={`hero-slide max-w-4xl ${reducedMotion ? "" : "motion-safe"}`}
      aria-live="polite"
      aria-label={`${ecosystem.name} ecosystem`}
    >
      <p className="eyebrow text-white/70">{ecosystem.short}</p>

      <h1 className="mt-5 max-w-4xl text-5xl leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
        {ecosystem.name}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:mt-7 md:text-lg">
        {ecosystem.summary}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:mt-9">
        <Link
          to="/ecosystems/$slug"
          params={{ slug: ecosystem.slug }}
          className="jluxe-explore-button"
        >
          {ecosystem.status === "coming-soon"
            ? "Get notified"
            : `Explore ${ecosystem.short}`}

          <span className="jluxe-explore-button-icon" aria-hidden="true">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}