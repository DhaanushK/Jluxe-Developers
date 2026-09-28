import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getEcosystem } from "@/lib/site";
import { ButtonLink, PageHeader, PendingNotice } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/ecosystems/$slug")({
  loader: ({ params }) => {
    const eco = getEcosystem(params.slug);
    if (!eco) throw notFound();
    return { eco };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(loaderData.eco.name, loaderData.eco.summary)
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

  if (eco.status === "coming-soon") {
    return (
      <>
        <PageHeader title={eco.name} intro={eco.summary} />
        <section className="mx-auto max-w-7xl px-6 py-20">
          <PendingNotice
            title="Get notified when this launches"
            body="Leave your details with us and we will let you know as soon as the Boutique opens."
          />
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title={eco.name} intro={eco.summary} />
      <section className="mx-auto max-w-7xl px-6 py-20">
          <p className="eyebrow">Services</p>
          <ul className="mt-5 grid gap-px bg-border sm:grid-cols-2">
            {eco.services.map((s, i) => {
              const isTrailingOddItem = eco.services.length % 2 === 1 && i === eco.services.length - 1;
              return (
              <li key={s.name} className={`bg-background p-6 ${isTrailingOddItem ? "sm:col-span-2" : ""}`}>
                <span className="text-xs text-brass">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-2xl">{s.name}</h2>
                {s.note && <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>}
              </li>
            )})}
          </ul>
      </section>

      {eco.slug === "talent-training" && (
        <section className="border-y bg-card">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
            <h2 className="text-3xl">Explore career opportunities with JLuxe.</h2>
            <ButtonLink to="/careers">Explore Opportunities</ButtonLink>
          </div>
        </section>
      )}

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-center">
        <h2 className="max-w-xl text-3xl">{ctaHeading(eco.slug)}</h2>
        <div className="flex flex-wrap gap-4">
          {eco.slug === "real-estate" && (
            <ButtonLink to="/contact?ecosystem=real-estate&intent=buy">Explore Properties</ButtonLink>
          )}
          <ButtonLink to={`/contact?ecosystem=${eco.slug}`} variant={eco.slug === "real-estate" ? "outline" : "solid"}>
            {ctaLabel(eco.slug)}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}

function ctaHeading(slug: string) {
  if (slug === "real-estate") return "Looking to buy or sell property?";
  if (slug === "business-solutions") return "Grow with JLuxe.";
  if (slug === "talent-training") return "Build careers and stronger teams with JLuxe.";
  return "Plan your interiors project with JLuxe.";
}

function ctaLabel(slug: string) {
  if (slug === "real-estate") return "Sell Your Property";
  if (slug === "business-solutions") return "Discuss Your Requirement";
  if (slug === "talent-training") return "Partner for Training";
  return "Discuss Your Project";
}
