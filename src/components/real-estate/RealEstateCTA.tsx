import { ButtonLink } from "@/components/site/Layout";

export function RealEstateCTA({
  title = "Looking for a real estate opportunity?",
  body = "Share your requirement with JLUXE and the right team will guide you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-20 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Real Estate</p>
          <h2 className="mt-4 max-w-2xl text-4xl leading-[1.05] md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed opacity-75">{body}</p>
        </div>
        <ButtonLink to="/contact" variant="outline" className="text-white">Talk to JLUXE</ButtonLink>
      </div>
    </section>
  );
}
