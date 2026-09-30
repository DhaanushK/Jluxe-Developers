import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ecosystems } from "@/lib/site";
import { HeroIntroSlide } from "./HeroIntroSlide";
import { HeroSlide } from "./HeroSlide";
import { HeroEcosystemNavigator } from "./HeroEcosystemNavigator";

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeEcosystem = activeIndex > 0 ? ecosystems[activeIndex - 1] : undefined;
  const slideCount = ecosystems.length + 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isPaused, isVisible, reducedMotion, activeIndex, slideCount]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slideCount - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slideCount - 1 ? 0 : current + 1,
    );
  };

  const goToSlide = (index: number) => {
    if (index < 0 || index >= slideCount) return;
    setActiveIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToNext();
    }

    if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      goToSlide(slideCount - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX =
      event.changedTouches[0]?.clientX ?? touchStartX.current;

    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
  };

  return (
    <section
      className="hero-panel relative min-h-[720px] overflow-hidden bg-ink text-ink-foreground md:min-h-[800px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="JLUXE ecosystems"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="hero-background absolute inset-0" aria-hidden />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,43,35,0.9)_0%,rgba(20,43,35,0.64)_48%,rgba(20,43,35,0.3)_100%)]" aria-hidden />

      {/* Controlled visual overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,43,35,0.96)_0%,rgba(20,43,35,0.78)_45%,rgba(20,43,35,0.36)_100%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col justify-end px-6 pb-8 pt-28 sm:pb-10 md:min-h-[800px] md:pt-32">
        {/* Active slide */}
        {activeEcosystem ? (
          <HeroSlide key={activeEcosystem.slug} ecosystem={activeEcosystem} reducedMotion={reducedMotion} />
        ) : (
          <HeroIntroSlide reducedMotion={reducedMotion} />
        )}

        {/* Ecosystem navigator */}
        <div className="mt-12 sm:mt-16">
          <HeroEcosystemNavigator
            activeIndex={activeIndex - 1}
            onSelect={(index) => goToSlide(index + 1)}
          />
        </div>

        {/* Carousel controls */}
        <div className="mt-5 flex items-center justify-end gap-2 sm:mt-6">
          <button
            type="button"
            onClick={goToPrevious}
            className="rounded-md border border-white/20 p-2.5 text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:bg-white/10"
            aria-label="Previous hero slide"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>

          <span
            className="min-w-20 text-center text-xs tracking-[0.18em] text-white/50"
            aria-label={
              activeIndex === 0
                ? "JLUXE introduction"
                : `Ecosystem ${activeIndex} of ${ecosystems.length}`
            }
          >
            {activeIndex === 0
              ? "JLUXE"
              : `${String(activeIndex).padStart(2, "0")} / ${String(ecosystems.length).padStart(2, "0")}`}
          </span>

          <button
            type="button"
            onClick={goToNext}
            className="rounded-md border border-white/20 p-2.5 text-white/70 transition-colors hover:border-white/50 hover:text-white focus-visible:bg-white/10"
            aria-label="Next hero slide"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}