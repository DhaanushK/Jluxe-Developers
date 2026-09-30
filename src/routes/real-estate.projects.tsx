import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { ProjectCard } from "@/components/real-estate/ProjectCard";
import { RealEstateCTA } from "@/components/real-estate/RealEstateCTA";
import { pageMeta } from "@/lib/seo";
import { loadPublishedProjects } from "@/server/content";

export const Route = createFileRoute("/real-estate/projects")({
  loader: () => loadPublishedProjects(),
  head: () => pageMeta("Real Estate Projects", "Explore JLUXE real estate projects.", "/real-estate/projects"),
  component: Projects,
});

function Projects() {
  const projects = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Real Estate / Projects" title="Projects with room for the right opportunity." intro="Approved JLUXE project information will be published here as it becomes available." />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {projects.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
          </ul>
        ) : (
          <InventoryEmptyState title="No projects currently available." body="There are no published JLUXE projects to display at this time. Talk to the team about your requirement." />
        )}
      </section>
      <RealEstateCTA title="Have a project requirement?" body="Talk to JLUXE about project discovery, promotion or channel partnership support." />
    </>
  );
}
