import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/services/ServiceDetailPage";
import { pageMeta } from "@/lib/seo";
import { loadPublishedEcosystem, loadPublishedService } from "@/server/content";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const service = await loadPublishedService({ data: params.slug });
    if (!service || !service.isPublished) throw notFound();
    const ecosystem = await loadPublishedEcosystem({ data: service.ecosystemSlugs[0] });
    return { service, ecosystem };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(
          `${loaderData.service.name} Services`,
          loaderData.service.shortDescription ??
            `${loaderData.service.name} services from JLUXE.`,
          `/services/${loaderData.service.slug}`,
        )
      : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: ServiceNotFound,
  component: ServicePage,
});

function ServiceNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">This service does not exist.</h1>
      <Link to="/services" className="mt-6 inline-block underline">
        View all services
      </Link>
    </div>
  );
}

function ServicePage() {
  const { service, ecosystem } = Route.useLoaderData();
  return <ServiceDetailPage service={service} ecosystem={ecosystem} />;
}