import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Insight } from "@/lib/editorial";

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="group flex h-full flex-col border bg-card transition-colors duration-300 hover:bg-secondary/30">
      <div className="blueprint aspect-[16/10] bg-secondary" aria-hidden />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {insight.category && <span>{insight.category}</span>}
          {insight.publishedAt && (
            <>
              {insight.category && <span aria-hidden>•</span>}
              <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>
            </>
          )}
        </div>
        <h2 className="mt-4 font-display text-2xl leading-tight">{insight.title}</h2>
        {insight.excerpt && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{insight.excerpt}</p>}
        <Link to="/insights/$slug" params={{ slug: insight.slug }} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold underline-offset-4 hover:underline">
          Read insight
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(value));
}
