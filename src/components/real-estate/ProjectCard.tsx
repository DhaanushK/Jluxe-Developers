import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { VisualPlaceholder } from "@/components/site/Layout";
import type { RealEstateProject } from "@/lib/real-estate";
import { InventoryStatus } from "./InventoryStatus";

export function ProjectCard({ project }: { project: RealEstateProject }) {
  const location = [project.location.area, project.location.city]
    .filter(Boolean)
    .join(", ");

  return (
    <li className="bg-background">
      <Link
        to="/real-estate/projects/$slug"
        params={{ slug: project.slug }}
        className="group flex h-full flex-col border transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <VisualPlaceholder index="01" label="Project" className="aspect-[4/3]" />
        <div className="flex flex-1 flex-col p-6">
          <InventoryStatus status={project.status} />
          <h2 className="mt-5 font-display text-2xl leading-tight">{project.name}</h2>
          {location && <p className="mt-2 text-sm text-muted-foreground">{location}</p>}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>
          {(project.priceLabel || project.areaLabel) && (
            <p className="mt-5 text-sm font-semibold">
              {[project.priceLabel, project.areaLabel].filter(Boolean).join(" · ")}
            </p>
          )}
          <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
            View project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </Link>
    </li>
  );
}
