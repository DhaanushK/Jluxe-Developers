import type { Service } from "@/lib/site";
import { ServiceCard } from "./ServiceCard";

export function ServiceGrid({ services }: { services: Service[] }) {
  const publishedServices = services.filter((service) => service.isPublished);

  return (
    <section
      aria-labelledby="service-grid-heading"
      className="mx-auto max-w-7xl px-6 py-20 sm:py-24"
    >
      <p className="eyebrow">Explore services</p>
      <h2 id="service-grid-heading" className="mt-4 text-4xl md:text-5xl">
        Services across the JLUXE ecosystems.
      </h2>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {publishedServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ul>
    </section>
  );
}
