import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { InsightCard } from "@/components/editorial/InsightCard";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { loadPublishedInsights } from "@/server/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  loader: () => loadPublishedInsights(12),
  head: () => pageMeta("Insights", "Articles and guidance from JLuxe on property, business growth, careers and interiors."),
  component: Insights,
});

function Insights() {
  const insights = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Insights" title="Practical guidance from the JLuxe teams." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        {insights.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{insights.map((insight) => <InsightCard key={insight.id} insight={insight} />)}</div>
        ) : (
          <InventoryEmptyState title="Insights are currently being updated." body="Published stories, updates and perspectives will appear here as they become available." />
        )}
      </section>
    </>
  );
}
