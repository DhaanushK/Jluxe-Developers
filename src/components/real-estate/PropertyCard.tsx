import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { VisualPlaceholder } from "@/components/site/Layout";
import type { RealEstateProperty } from "@/lib/real-estate";
import { InventoryStatus } from "./InventoryStatus";

export function PropertyCard({ property }: { property: RealEstateProperty }) {
  const location = [property.location?.area, property.location?.city]
    .filter(Boolean)
    .join(", ");

  return (
    <li className="bg-background">
      <Link
        to="/real-estate/properties/$slug"
        params={{ slug: property.slug }}
        className="group flex h-full flex-col border transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <VisualPlaceholder index="01" label="Property" className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col p-6">
          <InventoryStatus status={property.status} />
          <h2 className="mt-5 font-display text-2xl leading-tight">{property.name}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{property.type}</p>
          {location && <p className="mt-1 text-sm text-muted-foreground">{location}</p>}
          {(property.priceLabel || property.area) && (
            <p className="mt-5 text-sm font-semibold">
              {[property.priceLabel, property.area && `${property.area} ${property.areaUnit ?? ""}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
          <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
            View property
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  );
}
