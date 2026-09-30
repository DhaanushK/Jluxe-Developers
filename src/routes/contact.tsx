import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ecosystems, siteSettings, whatsappLink } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { EnquiryForm } from "@/components/leads/EnquiryForm";
import { pageMeta } from "@/lib/seo";

const searchSchema = z.object({
  ecosystem: z.string().optional(),
  source: z.enum(["CONTACT", "ECOSYSTEM", "SERVICE", "PROJECT", "PROPERTY", "PLOT", "OTHER"]).optional(),
  service: z.string().optional(),
  project: z.string().optional(),
  property: z.string().optional(),
  plot: z.string().optional(),
  intent: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => pageMeta("Contact", "Talk to JLuxe about property, business growth, hiring, training or an interiors project."),
  component: Contact,
});

function Contact() {
  const search = Route.useSearch();
  const wa = whatsappLink("Hi, I would like to know more about JLuxe.");

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's Talk" intro="Tell us what you need and we will connect you with the right JLuxe team." />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          <EnquiryForm
            source={search.source ?? "CONTACT"}
            initialEcosystemSlug={search.ecosystem}
            serviceId={search.service}
            projectId={search.project}
            propertyId={search.property}
            plotId={search.plot}
            ecosystemOptions={ecosystems.map((ecosystem) => ({ slug: ecosystem.slug, label: ecosystem.short }))}
          />
        </div>
        <aside className="md:col-span-5">
          <p className="eyebrow">Reach us directly</p>
          <dl className="mt-6 divide-y border-y">
            {([
              ["Phone", siteSettings.phone],
              ["Email", siteSettings.email],
              ["Address", siteSettings.address],
            ] as const).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-right">{v ?? "Information coming soon"}</dd>
              </div>
            ))}
          </dl>
          {wa && <a href={wa} className="mt-6 inline-block text-sm font-semibold underline">Message us on WhatsApp</a>}
        </aside>
      </section>
    </>
  );
}
