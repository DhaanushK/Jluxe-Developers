const principles = [
  {
    number: "01",
    title: "One connected ecosystem",
    description:
      "JLUXE brings property, business solutions, talent and training, and interiors and design into one connected platform.",
  },
  {
    number: "02",
    title: "Specialists across disciplines",
    description:
      "Each JLUXE ecosystem is built around a distinct area of service while remaining connected to the wider business network.",
  },
  {
    number: "03",
    title: "From property to people",
    description:
      "The JLUXE model connects opportunities across real estate, business growth, people, and design.",
  },
  {
    number: "04",
    title: "Built around relationships",
    description:
      "JLUXE's stated philosophy is built around Trust, Transparency, Professionalism, and Results.",
  },
] as const;

export function WhyJLuxe() {
  return (
    <section
      aria-labelledby="why-jluxe-heading"
      className="border-t bg-background"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:pr-6">
            <p className="eyebrow">Why JLUXE</p>

            <h2
              id="why-jluxe-heading"
              className="mt-4 max-w-xl text-4xl leading-[1.05] md:text-5xl"
            >
              One platform. Multiple capabilities. Connected opportunities.
            </h2>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              JLUXE brings multiple business ecosystems together so that
              different needs can be connected through one broader platform.
            </p>
          </div>

          <ol className="border-l border-border">
            {principles.map((principle) => (
              <li
                key={principle.number}
                className="grid gap-4 border-b border-border p-6 last:border-b-0 sm:grid-cols-[64px_1fr] sm:gap-5 sm:p-8"
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-brass">
                  {principle.number}
                </span>

                <div>
                  <h3 className="text-2xl leading-tight md:text-3xl">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}