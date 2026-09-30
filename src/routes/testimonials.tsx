import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Layout";
import { TestimonialCard } from "@/components/editorial/TestimonialCard";
import { InventoryEmptyState } from "@/components/real-estate/InventoryEmptyState";
import { loadPublishedTestimonials } from "@/server/content";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  loader: () => loadPublishedTestimonials(),
  head: () => pageMeta("Testimonials", "Verified experiences from JLUXE clients and partners.", "/testimonials"),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const testimonials = Route.useLoaderData();
  return (
    <>
      <PageHeader eyebrow="Testimonials" title="Verified experiences from the people we work with." intro="Approved client and partner experiences will be shared here as they become available." />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        {testimonials.length > 0 ? (
          <div className="grid gap-px border bg-border md:grid-cols-2">
            {testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)}
          </div>
        ) : (
          <InventoryEmptyState title="Testimonials are currently being updated." body="Please check back soon or speak with JLUXE directly." />
        )}
      </section>
    </>
  );
}
