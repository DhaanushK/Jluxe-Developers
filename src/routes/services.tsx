import { createFileRoute } from "@tanstack/react-router";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { pageMeta } from "@/lib/seo";
import { loadPublishedServices } from "@/server/content";

export const Route = createFileRoute("/services")({
  loader: () => loadPublishedServices(),
  head: () =>
    pageMeta(
      "Services",
      "JLUXE services across real estate, business solutions, talent and training, and interiors and design.",
      "/services",
    ),
  component: Services,
});

function Services() {
  const services = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Services built around the JLUXE ecosystems."
        intro="Explore the approved services available across JLUXE's active ecosystems."
      />

      <ServiceGrid services={services} />

      <section className="border-t bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
              Have a requirement?
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
              Talk to the right JLUXE team.
            </h2>
          </div>
          <ButtonLink to="/contact" variant="outline" className="text-white">
            Talk to JLUXE
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
