import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { pageMeta } from "@/lib/seo";
import { loadPublishedPlot } from "@/server/content";

export const Route = createFileRoute("/real-estate/plots/$slug")({
  loader: async ({ params }) => {
    const plot = await loadPublishedPlot({ data: params.slug });
    if (!plot) throw notFound();
    return { plot };
  },
  head: ({ loaderData }) => loaderData
    ? pageMeta(`Plot ${loaderData.plot.plotNumber} | Real Estate`, "JLUXE real estate plot details.", `/real-estate/plots/${loaderData.plot.slug}`)
    : { meta: [{ title: "Plot not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: PlotNotFound,
  component: PlotDetail,
});

function PlotNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">Plot not found.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The plot may no longer be available or the link may be incorrect.</p>
      <Link to="/real-estate/plots" className="mt-6 inline-block underline underline-offset-4">Back to plots</Link>
    </div>
  );
}

function PlotDetail() {
  const { plot } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Real Estate / Plot" title={`Plot ${plot.plotNumber}`} intro="Approved plot details will be published here when available." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <InventoryEmptyState title="Plot details are being prepared." body="Additional plot information will be published here when approved details are available." />
        <div className="mt-8">
          <ButtonLink to={`/contact?source=PLOT&plot=${encodeURIComponent(plot.id)}&project=${encodeURIComponent(plot.projectId)}`}>
            Enquire About This Plot
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
