import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ecosystems } from "@/lib/site";
import { PageHeader, VisualPlaceholder } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/ecosystems/")({
  head: () =>
    pageMeta("Ecosystems", "The five JLuxe ecosystems: Real Estate, Business Solutions, Talent & Training, Boutique, and Interiors & Design."),
  component: EcosystemsPage,
});

function EcosystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ecosystems"
        title="Five ecosystems under one parent brand."
        intro="Choose the area that matches your requirement. Each ecosystem has its own services and its own team."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {ecosystems.map((e) => (
          <Link key={e.slug} to="/ecosystems/$slug" params={{ slug: e.slug }} className="group flex flex-col border bg-card transition-colors hover:border-foreground/40">
            <VisualPlaceholder index={e.index} label={e.short} className="aspect-[4/3]" />
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl">{e.name}</h2>
              <p className="mt-3 flex-1 text-muted-foreground">{e.summary}</p>
              <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                {e.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
