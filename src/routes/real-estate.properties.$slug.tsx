import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { pageMeta } from "@/lib/seo";
import { loadPublishedProperty } from "@/server/content";

export const Route = createFileRoute("/real-estate/properties/$slug")({
  loader: async ({ params }) => {
    const property = await loadPublishedProperty({ data: params.slug });
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => loaderData
    ? pageMeta(`${loaderData.property.name} | Real Estate`, loaderData.property.description ?? "JLUXE real estate property details.", `/real-estate/properties/${loaderData.property.slug}`)
    : { meta: [{ title: "Property not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: PropertyNotFound,
  component: PropertyDetail,
});

function PropertyNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">Property not found.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The property may no longer be available or the link may be incorrect.</p>
      <Link to="/real-estate/properties" className="mt-6 inline-block underline underline-offset-4">Back to properties</Link>
    </div>
  );
}

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Real Estate / Property" title={property.name} intro={property.description} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <InventoryEmptyState title="Property details are being prepared." body="Additional property information will be published here when approved details are available." />
        <div className="mt-8">
          <ButtonLink to={`/contact?source=PROPERTY&property=${encodeURIComponent(property.id)}${property.projectId ? `&project=${encodeURIComponent(property.projectId)}` : ""}`}>
            Enquire About This Property
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
