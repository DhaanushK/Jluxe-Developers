import type { Ecosystem } from "@/lib/site";
import { EcosystemCard } from "./EcosystemCard";

export function EcosystemGrid({ ecosystems }: { ecosystems: Ecosystem[] }) {
  return (
    <section
      aria-labelledby="ecosystem-grid-heading"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-24"
    >
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="eyebrow">Explore JLUXE</p>
          <h2 id="ecosystem-grid-heading" className="mt-4 text-4xl md:text-5xl">
            Find the right ecosystem.
          </h2>
        </div>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ecosystems.map((ecosystem) => (
          <EcosystemCard key={ecosystem.slug} ecosystem={ecosystem} />
        ))}
      </ul>
    </section>
  );
}
