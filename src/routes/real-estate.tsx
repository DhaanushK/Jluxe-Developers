import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import { RealEstateCTA } from "@/components/real-estate/RealEstateCTA";
import {
  loadPublishedPlots,
  loadPublishedProjects,
  loadPublishedProperties,
} from "@/server/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/real-estate")({
  loader: async () => ({
    projects: await loadPublishedProjects(),
    properties: await loadPublishedProperties(),
    plots: await loadPublishedPlots(),
  }),
  head: () =>
    pageMeta(
      "Real Estate",
      "Explore JLUXE real estate projects, properties and plots.",
      "/real-estate",
    ),
  component: RealEstate,
});

function RealEstate() {
  const { projects, properties, plots } = Route.useLoaderData();
  const destinations = [
    {
      title: "Projects",
      body: "Explore JLUXE project opportunities when approved inventory is available.",
      to: "/real-estate/projects",
      count: projects.length,
    },
    {
      title: "Properties",
      body: "Discover available property inventory across supported project types.",
      to: "/real-estate/properties",
      count: properties.length,
    },
    {
      title: "Plots",
      body: "Browse project-linked plots and their current availability.",
      to: "/real-estate/plots",
      count: plots.length,
    },
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow="JLUXE Real Estate"
        title="Property opportunities, guided by the right team."
        intro="Explore projects, properties and plots through the JLUXE real estate ecosystem."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-px border bg-border md:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.title}
              to={destination.to}
              className="group flex min-h-64 flex-col bg-background p-6 transition-colors hover:bg-card focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
            >
              <span className="text-xs font-semibold tracking-[0.18em] text-brass">
                {String(destination.count).padStart(2, "0")}
              </span>
              <h2 className="mt-10 font-display text-3xl">{destination.title}</h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {destination.body}
              </p>
              <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold">
                Explore {destination.title.toLowerCase()}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:gap-20">
          <div>
            <p className="eyebrow">Real estate support</p>
            <h2 className="mt-4 text-4xl md:text-5xl">From first enquiry to the next step.</h2>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>JLUXE supports property discovery, buying, selling, project promotion, channel partnerships and site visits.</p>
            <p>Inventory will appear here only when official project and property information is available.</p>
            <ButtonLink to="/contact">Discuss your requirement</ButtonLink>
          </div>
        </div>
      </section>

      <RealEstateCTA />
    </>
  );
}
