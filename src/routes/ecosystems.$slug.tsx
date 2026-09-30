import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { EcosystemDetailPage } from "@/components/ecosystem/EcosystemDetailPage";
import { pageMeta } from "@/lib/seo";
import { loadPublishedEcosystem } from "@/server/content";

export const Route = createFileRoute("/ecosystems/$slug")({
  loader: async ({ params }) => {
    const eco = await loadPublishedEcosystem({ data: params.slug });
    if (!eco) throw notFound();
    return { eco };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(
          loaderData.eco.name,
          loaderData.eco.summary,
          `/ecosystems/${loaderData.eco.slug}`,
        )
      : { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: EcoNotFound,
  component: EcosystemPage,
});

function EcoNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">This ecosystem does not exist.</h1>
      <Link to="/ecosystems" className="mt-6 inline-block underline">View all ecosystems</Link>
    </div>
  );
}

function EcosystemPage() {
  const { eco } = Route.useLoaderData();
  return <EcosystemDetailPage ecosystem={eco} />;
}
