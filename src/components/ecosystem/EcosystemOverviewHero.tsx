import { ButtonLink, PageHeader } from "@/components/site/Layout";

export function EcosystemOverviewHero() {
  return (
    <>
      <PageHeader
        eyebrow="Ecosystems"
        title="Five capabilities. One connected platform."
        intro="Explore the areas of JLUXE and find the ecosystem that matches your requirement."
      />

      <div className="mx-auto max-w-7xl px-6 pb-4">
        <ButtonLink to="/contact">Talk to JLUXE</ButtonLink>
      </div>
    </>
  );
}
