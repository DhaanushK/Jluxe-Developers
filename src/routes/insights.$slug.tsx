import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/site/Layout";
import { InsightCard, formatDate } from "@/components/editorial/InsightCard";
import { loadPublishedInsight, loadRelatedInsights } from "@/server/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/insights/$slug")({
  loader: async ({ params }) => {
    const insight = await loadPublishedInsight({ data: params.slug });
    if (!insight) throw notFound();
    const related = await loadRelatedInsights({
      data: insight.category
        ? { id: insight.id, category: insight.category, tags: insight.tags }
        : { id: insight.id, tags: insight.tags },
    });
    return { insight, related };
  },
  head: ({ loaderData }) => loaderData
    ? pageMeta(loaderData.insight.seoTitle ?? loaderData.insight.title, loaderData.insight.seoDescription ?? loaderData.insight.excerpt ?? "Insights from JLUXE.", `/insights/${loaderData.insight.slug}`)
    : { meta: [{ title: "Insight not found" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: InsightNotFound,
  component: InsightDetail,
});

function InsightNotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-4xl">Insight not found.</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">The article may no longer be available or the link may be incorrect.</p>
      <Link to="/insights" className="mt-6 inline-flex items-center gap-2 underline underline-offset-4"><ArrowLeft className="size-4" aria-hidden />Back to insights</Link>
    </div>
  );
}

function InsightDetail() {
  const { insight, related } = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow={insight.category ?? "Insight"} title={insight.title} intro={insight.excerpt ?? ""} />
      <article className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
          {insight.author && <span>By {insight.author}</span>}
          {insight.publishedAt && <time dateTime={insight.publishedAt}>{formatDate(insight.publishedAt)}</time>}
        </div>
        <div className="mt-10 whitespace-pre-wrap text-lg leading-[1.85]">{insight.content}</div>
      </article>
      {related.length > 0 && (
        <section className="border-t bg-secondary/30">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
            <p className="eyebrow">Related insights</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((item) => <InsightCard key={item.id} insight={item} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
