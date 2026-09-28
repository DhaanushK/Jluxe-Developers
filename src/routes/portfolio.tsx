import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PendingNotice } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () => pageMeta("Our Work", "Projects and work delivered by JLuxe across real estate, business solutions and interiors and design."),
  component: Portfolio,
});

function Portfolio() {
  return (
    <>
      <PageHeader eyebrow="Our Work" title="Real projects, shown as they are." intro="We only publish work JLuxe has actually delivered, with authentic photography." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <PendingNotice title="Portfolio being prepared" body="Completed projects will appear here as they are documented and approved for publication." />
      </section>
    </>
  );
}
