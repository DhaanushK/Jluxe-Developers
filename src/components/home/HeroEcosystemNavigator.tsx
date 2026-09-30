import { ArrowRight } from "lucide-react";
import { ecosystems } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeroEcosystemNavigatorProps = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function HeroEcosystemNavigator({
  activeIndex,
  onSelect,
}: HeroEcosystemNavigatorProps) {
  return (
    <nav
      aria-label="Choose JLUXE ecosystem"
      className="border-t border-white/20 pt-5"
    >
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-4 md:gap-0">
        {ecosystems.map((ecosystem, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={ecosystem.slug}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Show ${ecosystem.name}`}
              aria-pressed={isActive}
              className={cn(
                "hero-navigator-button group relative border-b border-white/15 py-3 text-left transition-colors",
                "hover:border-white/50",
                "focus-visible:border-white focus-visible:outline-none",
                "md:border-b-0 md:border-r md:px-5",
                "md:first:pl-0 md:last:border-r-0",
                isActive && "border-white/70",
              )}
            >
              <span
                className={cn(
                  "block text-xs tracking-[0.18em] transition-colors",
                  isActive ? "text-white/60" : "text-white/45",
                )}
              >
                {ecosystem.index}
              </span>

              <span
                className={cn(
                  "mt-2 flex items-center gap-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "text-white"
                    : "text-white/60 group-hover:text-white",
                )}
              >
                {ecosystem.short}

                <ArrowRight
                  className={cn(
                    "size-3.5 transition-transform",
                    isActive && "translate-x-1",
                    "group-hover:translate-x-1",
                  )}
                  aria-hidden
                />
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}