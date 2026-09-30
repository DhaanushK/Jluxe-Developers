import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getEcosystem, type Service } from "@/lib/site";

export function ServiceCard({ service }: { service: Service }) {
  const ecosystem = getEcosystem(service.ecosystemSlugs[0]);

  return (
    <li className="bg-background">
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group flex h-full flex-col border p-6 transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start justify-between gap-4">
          <span className="text-xs font-semibold tracking-[0.18em] text-brass">
            {String(service.order).padStart(2, "0")}
          </span>

          {ecosystem && (
            <span className="text-right text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {ecosystem.short}
            </span>
          )}
        </div>

        <h2 className="mt-10 font-display text-2xl leading-tight">
          {service.name}
        </h2>

        {service.shortDescription && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {service.shortDescription}
          </p>
        )}

        <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
          Explore service
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </Link>
    </li>
  );
}
