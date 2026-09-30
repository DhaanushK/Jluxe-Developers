import { createFileRoute } from "@tanstack/react-router";
import { EcosystemGrid } from "@/components/ecosystem/EcosystemGrid";
import { EcosystemOverviewHero } from "@/components/ecosystem/EcosystemOverviewHero";
import { pageMeta } from "@/lib/seo";
import { loadPublishedEcosystems } from "@/server/content";

export const Route = createFileRoute("/ecosystems/")({
  loader: () => loadPublishedEcosystems(),
  head: () =>
    pageMeta(
      "Ecosystems",
      "The four JLUXE ecosystems: Real Estate, Business Solutions, Talent & Training, and Interiors & Design.",
      "/ecosystems",
    ),
  component: EcosystemsPage,
});

function EcosystemsPage() {
  const ecosystems = Route.useLoaderData();

  return (
    <>
      <EcosystemOverviewHero />
      <EcosystemGrid ecosystems={ecosystems} />
      <section className="border-y bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
              One connected platform
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-5xl">
              Find the JLUXE team that fits your requirement.
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
