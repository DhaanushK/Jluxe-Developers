type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

type ProcessSectionProps = {
  steps: ProcessStep[];
};

export function ProcessSection({ steps }: ProcessSectionProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <section className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">How It Works</p>

          <h2 className="mt-4 text-4xl md:text-5xl">
            A clear path from need to opportunity.
          </h2>

          <p className="mt-6 leading-relaxed text-muted-foreground">
            A structured process keeps each engagement connected to the right
            JLUXE ecosystem and team.
          </p>
        </div>

        <ol className="mt-14 grid border-l border-t md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="border-b border-r p-6 md:min-h-64 md:p-8"
            >
              <span className="text-xs font-semibold tracking-[0.18em] text-brass">
                {step.number}
              </span>

              <h3 className="mt-8 text-2xl md:text-3xl">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}