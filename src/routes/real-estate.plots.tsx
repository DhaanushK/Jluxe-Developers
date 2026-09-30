import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { PlotCard } from "@/components/real-estate/PlotCard";
import { RealEstateCTA } from "@/components/real-estate/RealEstateCTA";
import { pageMeta } from "@/lib/seo";
import { loadPublishedPlots } from "@/server/content";

export const Route = createFileRoute("/real-estate/plots")({
  loader: () => loadPublishedPlots(),
  head: () => pageMeta("Real Estate Plots", "Explore JLUXE real estate plots.", "/real-estate/plots"),
  component: Plots,
});

function Plots() {
  const plots = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Real Estate / Plots" title="Project-linked plots, when available." intro="Published JLUXE plot inventory will appear here when official project details are available." />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {plots.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plots.map((plot) => <PlotCard key={plot.id} plot={plot} />)}
          </ul>
        ) : (
          <InventoryEmptyState title="No plots currently available." body="There are no published JLUXE plots to display at this time. Talk to the team about your requirement." />
        )}
      </section>
      <RealEstateCTA title="Planning to buy or sell a plot?" body="Talk to JLUXE about plot buying, selling and project promotion support." />
    </>
  );
}
