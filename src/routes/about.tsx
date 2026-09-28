import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PendingNotice } from "@/components/site/Layout";
import { siteSettings } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageMeta("About", "Who JLuxe is, what it believes in, and how its five ecosystems connect people, properties, businesses and talent."),
  component: About,
});

const connects = ["People", "Properties", "Businesses", "Brands", "Talent", "Opportunities", "Growth"];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About JLuxe"
        title="From property to people. From branding to business growth."
        intro="JLuxe is a multi-vertical organization working across real estate, business solutions, talent and training, and interiors and design."
      />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="eyebrow">What we connect</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {connects.map((c) => (
              <li key={c} className="border px-4 py-2 font-display text-xl">{c}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Philosophy</p>
          <ul className="mt-6 divide-y border-y">
            {siteSettings.philosophy.map((p) => (
              <li key={p} className="py-4 font-display text-2xl">{p}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <PendingNotice
          title="Our full story is on its way"
          body="The founder profile, team and company history will be published here once confirmed by JLuxe."
        />
      </section>
    </>
  );
}
