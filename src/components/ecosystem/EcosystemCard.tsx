import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { VisualPlaceholder } from "@/components/site/Layout";
import type { Ecosystem } from "@/lib/site";
import { cn } from "@/lib/utils";

export function EcosystemCard({ ecosystem }: { ecosystem: Ecosystem }) {
  return (
    <li className="bg-background">
      <Link
        to="/ecosystems/$slug"
        params={{ slug: ecosystem.slug }}
        className={cn(
          "group flex h-full flex-col border transition-colors hover:border-foreground/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <VisualPlaceholder
          index={ecosystem.index}
          label={ecosystem.short}
          className="aspect-[4/3]"
        />

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl leading-tight">
              {ecosystem.name}
            </h2>

            {ecosystem.status === "coming-soon" && (
              <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Coming soon
              </span>
            )}
          </div>

          <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
            {ecosystem.summary}
          </p>

          <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
            {ecosystem.status === "coming-soon" ? "Get notified" : ecosystem.cta}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </li>
  );
}
