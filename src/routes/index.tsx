import { createFileRoute } from "@tanstack/react-router";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { WhyJLuxe } from "@/components/home/WhyJLuxe";
import { ImpactMetrics } from "@/components/home/ImpactMetrics";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FeaturedOpportunities } from "@/components/home/FeaturedOpportunities";
import { IntegratedSolutions } from "@/components/home/IntegratedSolutions";
import { Testimonials } from "@/components/home/Testimonials";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Real Estate, Business Growth, Talent and Interiors",
      "JLUXE connects people, properties, businesses and talent through four ecosystems: Real Estate, Business Solutions, Talent & Training and Interiors & Design.",
    ),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <HeroCarousel />

      {/* Ecosystem discovery */}
      <EcosystemSection />

      {/* Why JLUXE */}
      <WhyJLuxe />

      {/* Impact metrics */}
      <ImpactMetrics />

      {/* How it works */}
      <ProcessSection steps={[]} />

      {/* Featured opportunities */}
      <FeaturedOpportunities opportunities={[]} />

      {/* Integrated business solutions */}
      <IntegratedSolutions />

      {/* Testimonials */}
      <Testimonials testimonials={[]} />

      {/* Insights & updates */}
      <InsightsPreview insights={[]} />

      {/* Final CTA */}
      <FinalCTA />
    </>
  );
}