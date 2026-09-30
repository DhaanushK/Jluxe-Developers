import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ButtonLink, PageHeader } from "@/components/site/Layout";
import type { Ecosystem, Service } from "@/lib/site";

export function ServiceDetailPage({
  service,
  ecosystem,
}: {
  service: Service;
  ecosystem?: Ecosystem;
}) {
  const contactHref = ecosystem
    ? `/contact?source=SERVICE&ecosystem=${ecosystem.slug}&service=${encodeURIComponent(service.id)}`
    : "/contact?source=SERVICE";

  return (
    <>
      <PageHeader
        eyebrow={`Service / ${ecosystem?.short ?? "JLUXE"}`}
        title={service.name}
        intro={service.shortDescription}
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-7">
          <p className="eyebrow">What it is</p>
          {service.shortDescription ? (
            <p className="mt-6 max-w-2xl text-xl leading-relaxed">
              {service.shortDescription}
            </p>
          ) : (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Service details will be shared directly by JLUXE.
            </p>
          )}
        </div>

        {service.audience && service.audience.length > 0 && (
          <div className="md:col-span-5">
            <p className="eyebrow">Who it is for</p>
            <ul className="mt-6 divide-y border-y">
              {service.audience.map((audience) => (
                <li key={audience} className="py-4 font-display text-2xl">
                  {audience}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {service.offerings && service.offerings.length > 0 && (
        <section className="border-y bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
            <p className="eyebrow">What JLUXE provides</p>
            <ul className="mt-8 grid gap-px border bg-border sm:grid-cols-2">
              {service.offerings.map((offering, index) => (
                <li key={offering} className="bg-background p-6 md:p-8">
                  <span className="text-xs tracking-[0.18em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-5 text-lg leading-relaxed">{offering}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="mt-4 max-w-xl text-3xl md:text-4xl">
            Talk to JLUXE about {service.name}.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink to={contactHref}>Talk to JLUXE</ButtonLink>
          {ecosystem && (
            <Link
              to="/ecosystems/$slug"
              params={{ slug: ecosystem.slug }}
              className="inline-flex items-center gap-2 px-0 py-3 text-sm font-semibold underline-offset-4 hover:underline"
            >
              {ecosystem.short}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
