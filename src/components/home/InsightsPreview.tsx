import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export type InsightPreview = {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  publishedAt?: string;
  href: string;
  imageUrl?: string;
};

type InsightsPreviewProps = {
  insights: InsightPreview[];
};

export function InsightsPreview({ insights }: InsightsPreviewProps) {
  return (
    <section
      aria-labelledby="insights-heading"
      className="border-t bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Insights & Updates</p>

            <h2
              id="insights-heading"
              className="mt-4 max-w-2xl text-4xl leading-[1.05] md:text-5xl"
            >
              Ideas, updates and perspectives from JLUXE.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Explore stories, ideas and updates across the JLUXE ecosystem.
            </p>
          </div>

          <Link
            to="/insights"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
          >
            View all insights
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {insights.length === 0 ? (
          <div className="mt-12 border border-border bg-card p-8 sm:p-10 md:mt-14">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                Coming soon
              </p>

              <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                JLUXE insights are on the way.
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Published stories, updates and perspectives will appear here
                as they become available.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <article
                key={insight.id}
                className="group flex h-full flex-col overflow-hidden border bg-card transition-colors duration-300 hover:bg-secondary/30"
              >
                {insight.imageUrl ? (
                  <div className="aspect-[16/10] overflow-hidden bg-secondary">
                    <img
                      src={insight.imageUrl}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div
                    className="blueprint aspect-[16/10] bg-secondary"
                    aria-hidden
                  />
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {insight.category && <span>{insight.category}</span>}

                    {insight.category && insight.publishedAt && (
                      <span aria-hidden>•</span>
                    )}

                    {insight.publishedAt && (
                      <time dateTime={insight.publishedAt}>
                        {insight.publishedAt}
                      </time>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-2xl leading-tight">
                    {insight.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {insight.excerpt}
                  </p>

                  <Link
                    to={insight.href}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    Read insight
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}