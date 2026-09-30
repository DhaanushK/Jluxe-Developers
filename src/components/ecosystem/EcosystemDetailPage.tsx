import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ButtonLink,
  PageHeader,
  PendingNotice,
} from "@/components/site/Layout";
import type { Ecosystem } from "@/lib/site";

export function EcosystemDetailPage({ ecosystem }: { ecosystem: Ecosystem }) {
  const contactHref = `/contact?source=ECOSYSTEM&ecosystem=${ecosystem.slug}`;

  return (
    <>
      <PageHeader
        eyebrow={`${ecosystem.index} / ${ecosystem.short}`}
        title={ecosystem.name}
        intro={ecosystem.summary}
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-12 md:gap-20">
        <div className="md:col-span-7">
          <p className="eyebrow">About this ecosystem</p>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed">
            {ecosystem.summary}
          </p>
        </div>

        <div className="md:col-span-5">
          <p className="eyebrow">Who it is for</p>
          {ecosystem.audience.length > 0 ? (
            <ul className="mt-6 divide-y border-y">
              {ecosystem.audience.map((audience) => (
                <li key={audience} className="py-4 font-display text-2xl">
                  {audience}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 text-muted-foreground">
              Audience details will be shared when this ecosystem launches.
            </p>
          )}
        </div>
      </section>

      {ecosystem.services.length > 0 ? (
        <section className="border-y bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
            <p className="eyebrow">Services</p>
            <ul className="mt-8 grid gap-px border bg-border sm:grid-cols-2">
              {ecosystem.services.map((service, index) => (
                <li key={service.name} className="bg-background p-6 md:p-8">
                  <span className="text-xs tracking-[0.18em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-5 font-display text-2xl">
                    {service.name}
                  </h2>
                  {service.note && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.note}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <PendingNotice
            title="Get notified when this launches"
            body="Leave your details with us and JLUXE will share more when this ecosystem is ready."
          />
        </section>
      )}

      <section className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">Next step</p>
          <h2 className="mt-4 max-w-xl text-3xl md:text-4xl">
            Talk to JLUXE about {ecosystem.short}.
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <ButtonLink to={contactHref}>{ecosystem.cta}</ButtonLink>
          <Link
            to="/ecosystems"
            className="inline-flex items-center gap-2 px-0 py-3 text-sm font-semibold underline-offset-4 hover:underline"
          >
            All ecosystems
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
