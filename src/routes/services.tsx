import { createFileRoute, Link } from "@tanstack/react-router";
import { ecosystems } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => pageMeta("Services", "Every JLuxe service, grouped by ecosystem: real estate, marketing and sales, recruitment and training, architecture and interiors."),
  component: Services,
});

function Services() {
  const active = ecosystems.filter((e) => e.services.length);
  return (
    <>
      <PageHeader eyebrow="Services" title="All services, grouped by ecosystem." />
      <section className="mx-auto max-w-7xl divide-y px-6 py-12">
        {active.map((e) => (
          <div key={e.slug} className="grid gap-6 py-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <span className="font-display text-2xl text-brass">{e.index}</span>
              <h2 className="mt-2 text-3xl">{e.short}</h2>
              <Link to="/ecosystems/$slug" params={{ slug: e.slug }} className="mt-4 inline-block text-sm font-semibold underline-offset-4 hover:underline">
                {e.cta}
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:col-span-8">
              {e.services.map((s) => (
                <li key={s.name} className="border-b pb-3 text-lg">{s.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
}
