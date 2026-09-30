import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import { SiteVisitForm } from "@/components/leads/SiteVisitForm";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { pageMeta } from "@/lib/seo";
import { loadPublishedProject } from "@/server/content";

export const Route = createFileRoute("/real-estate/projects/$slug")({
  loader: async ({ params }) => {
    const project = await loadPublishedProject({ data: params.slug });
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => loaderData
    ? pageMeta(`${loaderData.project.name} | Real Estate`, loaderData.project.shortDescription, `/real-estate/projects/${loaderData.project.slug}`)
    : { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetail,
});

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">Project not found.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The project may no longer be available or the link may be incorrect.</p>
      <Link to="/real-estate/projects" className="mt-6 inline-block underline underline-offset-4">Back to projects</Link>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Real Estate / Project" title={project.name} intro={project.shortDescription} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <InventoryEmptyState title="Project details are being prepared." body="Additional project information will be published here when approved details are available." />
        <div className="mt-8">
          <ButtonLink to={`/contact?source=PROJECT&project=${encodeURIComponent(project.id)}`}>
            Enquire About This Project
          </ButtonLink>
        </div>
        <div className="mt-16 max-w-2xl">
          <p className="eyebrow">Site visit request</p>
          <h2 className="mt-4 text-3xl">Prefer to see the project in person?</h2>
          <p className="mt-3 text-muted-foreground">Share a preferred date and time. The JLUXE team will confirm availability separately.</p>
          <div className="mt-8">
            <SiteVisitForm projectId={project.id} />
          </div>
        </div>
      </section>
    </>
  );
}
