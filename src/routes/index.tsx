import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Briefcase, GraduationCap, Ruler, ShoppingBag } from "lucide-react";
import { ecosystems } from "@/lib/site";
import { ButtonLink, VisualPlaceholder } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "Real Estate, Business Growth, Talent and Interiors",
      "JLuxe connects people, properties, businesses and talent through five ecosystems: Real Estate, Business Solutions, Talent & Training, Boutique and Interiors & Design.",
    ),
  component: Home,
});

const ecosystemIcons = {
  "real-estate": Building2,
  "business-solutions": Briefcase,
  "talent-training": GraduationCap,
  boutique: ShoppingBag,
  "interiors-design": Ruler,
} as const;

const story = [
  { step: "Build", area: "Brand" },
  { step: "Reach", area: "Marketing" },
  { step: "Generate", area: "Leads" },
  { step: "Convert", area: "Sales" },
  { step: "Grow", area: "Business Development" },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-7">
          <p className="eyebrow">JLuxe</p>
          <h1 className="mt-6 text-5xl leading-[1.04] md:text-7xl">
            Property, business growth, talent and interiors. One accountable team.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            JLuxe helps property buyers and sellers, developers, businesses, institutions and job seekers through
            five connected ecosystems, so you work with one partner instead of five.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink to="#explore">Explore JLuxe</ButtonLink>
            <ButtonLink to="/contact" variant="text">Let's Talk</ButtonLink>
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="grid h-full grid-cols-2 gap-3">
            {ecosystems.map((e, i) => (
              <VisualPlaceholder
                key={e.slug}
                index={e.index}
                label={e.short}
                className={i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem discovery */}
      <section id="explore" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Explore JLuxe</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Five ecosystems, one platform.</h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Each ecosystem has its own specialists. Together they cover the full path from property to people, and
            from branding to business growth.
          </p>
        </div>
        <ol className="mt-14 grid gap-px bg-border border sm:grid-cols-2 lg:grid-cols-5">
          {ecosystems.map((e) => {
            const Icon = ecosystemIcons[e.slug];
            return (
            <li key={e.slug} className="bg-background">
              <Link
                to="/ecosystems/$slug"
                params={{ slug: e.slug }}
                className="group flex h-full min-h-56 flex-col p-5 transition-colors hover:bg-card"
              >
                <Icon className="size-6 text-brass" aria-hidden />
                <span className="mt-5 font-display text-2xl">{e.name}</span>
                <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{e.summary}</span>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold">
                  {e.status === "coming-soon" ? "Get notified" : "Explore"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          )})}
        </ol>
      </section>

      {/* Integrated story */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-60">Integrated Business Solutions</p>
          <h2 className="mt-4 max-w-3xl text-4xl md:text-5xl">From first impression to long-term growth.</h2>
          <p className="mt-6 max-w-2xl opacity-75">
            For businesses, JLuxe connects each stage of growth so that branding, marketing, lead generation, sales
            and business development work as one system.
          </p>
          <ol className="mt-14 grid gap-px bg-ink-foreground/15 md:grid-cols-5">
            {story.map((s, i) => (
              <li key={s.step} className="bg-ink p-6">
                <span className="text-xs opacity-50">0{i + 1}</span>
                <p className="mt-6 font-display text-3xl">{s.step}</p>
                <p className="mt-2 text-sm opacity-70">{s.area}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Link to="/ecosystems/$slug" params={{ slug: "business-solutions" }} className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline">
              See Business Solutions <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-3xl md:text-4xl">Tell us what you need. We will route it to the right team.</h2>
          <ButtonLink to="/contact">Let's Talk</ButtonLink>
        </div>
      </section>
    </>
  );
}
