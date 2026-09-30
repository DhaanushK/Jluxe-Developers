import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const solutions = [
  {
    step: "Build",
    area: "Brand",
    description:
      "Build a strong brand foundation with clear positioning, visual identity, and creative direction that gives your business a distinctive presence.",
    services: ["Brand Strategy", "Visual Identity", "Creative Direction"],
  },
  {
    step: "Reach",
    area: "Marketing",
    description:
      "Connect your business with the right audience through focused marketing strategies, digital campaigns, social media, and market outreach.",
    services: ["Digital Marketing", "Social Media", "Campaigns", "Market Outreach"],
  },
  {
    step: "Generate",
    area: "Leads",
    description:
      "Turn visibility into meaningful opportunities through targeted lead generation, customer outreach, and enquiry-focused campaigns.",
    services: ["Lead Generation", "Customer Outreach", "Enquiry Campaigns"],
  },
  {
    step: "Convert",
    area: "Sales",
    description:
      "Move opportunities forward with structured sales support, customer engagement, follow-ups, and conversion-focused strategies.",
    services: ["Sales Support", "Customer Engagement", "Follow-up", "Conversion"],
  },
  {
    step: "Grow",
    area: "Business Development",
    description:
      "Strengthen long-term growth through strategic partnerships, business development, channel networks, and new opportunities.",
    services: ["Business Development", "Partnerships", "Channel Network", "Growth Opportunities"],
  },
] as const;

export function IntegratedSolutions() {
  return (
    <section
      aria-labelledby="integrated-solutions-heading"
      className="bg-ink text-ink-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
          Integrated Business Solutions
        </p>

        <h2
          id="integrated-solutions-heading"
          className="mt-4 max-w-3xl text-4xl leading-[1.05] md:text-5xl"
        >
          From first impression to long-term growth.
        </h2>

        <p className="mt-6 max-w-2xl leading-relaxed opacity-75">
          For businesses, JLUXE connects each stage of growth so that
          branding, marketing, lead generation, sales and business
          development work as one system.
        </p>

        <ol className="mt-12 grid border border-ink-foreground/15 sm:grid-cols-2 md:mt-14 md:grid-cols-5">
          {solutions.map((solution, index) => (
            <li
              key={solution.step}
              tabIndex={0}
              className={cn(
                "jluxe-solution-card group relative bg-ink p-6",
                "border-b border-ink-foreground/15 sm:last:border-b-0",
                "md:border-b-0 md:border-r md:last:border-r-0",
              )}
            >
              <span className="text-xs tracking-[0.18em] opacity-45">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="mt-8 font-display text-3xl leading-tight">
                {solution.step}
              </p>

              <p className="mt-2 text-sm leading-relaxed opacity-70">
                {solution.area}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-ink-foreground/75">
                {solution.description}
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-brass/80">
                {solution.services.join(" • ")}
              </p>

              <span
                className="absolute bottom-6 right-6 size-1.5 rounded-full bg-brass opacity-50 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            to="/ecosystems/$slug"
            params={{ slug: "business-solutions" }}
            className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
          >
            See Business Solutions
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}