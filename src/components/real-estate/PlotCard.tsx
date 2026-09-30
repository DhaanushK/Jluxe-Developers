import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { VisualPlaceholder } from "@/components/site/Layout";
import type { RealEstatePlot } from "@/lib/real-estate";
import { InventoryStatus } from "./InventoryStatus";

export function PlotCard({ plot }: { plot: RealEstatePlot }) {
  return (
    <li className="bg-background">
      <Link
        to="/real-estate/plots/$slug"
        params={{ slug: plot.slug }}
        className="group flex h-full flex-col border transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <VisualPlaceholder index="01" label="Plot" className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col p-6">
          <InventoryStatus status={plot.status} />
          <h2 className="mt-5 font-display text-2xl leading-tight">Plot {plot.plotNumber}</h2>
          {(plot.priceLabel || plot.area) && (
            <p className="mt-3 text-sm font-semibold">
              {[plot.priceLabel, plot.area && `${plot.area} ${plot.areaUnit ?? ""}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
            View plot
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  );
}
