import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { PropertyCard } from "@/components/real-estate/PropertyCard";
import { RealEstateCTA } from "@/components/real-estate/RealEstateCTA";
import { pageMeta } from "@/lib/seo";
import { loadPublishedProperties } from "@/server/content";

export const Route = createFileRoute("/real-estate/properties")({
  loader: () => loadPublishedProperties(),
  head: () => pageMeta("Real Estate Properties", "Explore JLUXE real estate properties.", "/real-estate/properties"),
  component: Properties,
});

function Properties() {
  const properties = Route.useLoaderData();

  return (
    <>
      <PageHeader eyebrow="Real Estate / Properties" title="Find a property that fits your requirement." intro="Published JLUXE property inventory will appear here when official details are available." />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {properties.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => <PropertyCard key={property.id} property={property} />)}
          </ul>
        ) : (
          <InventoryEmptyState title="No properties currently available." body="There are no published JLUXE properties to display at this time. Talk to the team about your requirement." />
        )}
      </section>
      <RealEstateCTA title="Looking for a property?" body="Share what you are looking for and JLUXE will guide you through the available path." />
    </>
  );
}
