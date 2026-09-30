import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type FeaturedOpportunity = {
  id: string;
  title: string;
  location: string;
  type: string;
  status?: string;
  href: string;
  imageUrl?: string;
};

type FeaturedOpportunitiesProps = {
  opportunities: FeaturedOpportunity[];
};

export function FeaturedOpportunities({
  opportunities,
}: FeaturedOpportunitiesProps) {
  if (opportunities.length === 0) {
    return null;
  }

  return (
    <section className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Featured Opportunities</p>

            <h2 className="mt-4 text-4xl md:text-5xl">
              Find the right opportunity.
            </h2>
          </div>

          <Link
            to="/ecosystems/$slug"
            params={{ slug: "real-estate" }}
            className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
          >
            Explore Real Estate
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <article
              key={opportunity.id}
              className="group overflow-hidden border bg-card"
            >
              {opportunity.imageUrl ? (
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={opportunity.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div
                  className="blueprint aspect-[4/3] bg-secondary"
                  aria-hidden
                />
              )}

              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">
                    {opportunity.type}
                  </span>

                  {opportunity.status && (
                    <span className="text-xs text-muted-foreground">
                      {opportunity.status}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-2xl">
                  {opportunity.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {opportunity.location}
                </p>

                <Link
                  to={opportunity.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                >
                  View opportunity
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}