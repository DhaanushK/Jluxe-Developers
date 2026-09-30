type ImpactMetricsProps = {
  metrics?: Array<{
    value: string;
    label: string;
  }>;
};

export function ImpactMetrics({ metrics = [] }: ImpactMetricsProps) {
  if (metrics.length === 0) {
    return null;
  }

  return (
    <section className="border-y bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={`${metric.value}-${metric.label}`}
              className="bg-background p-8"
            >
              <p className="font-display text-4xl md:text-5xl">
                {metric.value}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}