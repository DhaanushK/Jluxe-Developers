import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PendingNotice } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  head: () => pageMeta("Insights", "Articles and guidance from JLuxe on property, business growth, careers and interiors."),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHeader eyebrow="Insights" title="Practical guidance from the JLuxe teams." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <PendingNotice title="First articles coming soon" body="Have a question you would like us to write about? Send it to us." />
      </section>
    </>
  );
}
