import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  Ruler,
} from "lucide-react";
import { ecosystems } from "@/lib/site";

const ecosystemIcons = {
  "real-estate": Building2,
  "business-solutions": Briefcase,
  "talent-training": GraduationCap,
  "interiors-design": Ruler,
} as const;

export function EcosystemSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="explore"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Explore JLuxe</p>

          <h2 className="mt-4 max-w-2xl text-4xl leading-[1.05] md:text-5xl">
            Four ecosystems, one platform.
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-muted-foreground">
          Each ecosystem has its own specialists. Together they cover the
          full path from property to people, and from branding to business
          growth.
        </p>
      </div>

      <ol className="jluxe-ecosystem-panels mt-12 lg:mt-14">
        {ecosystems.map((ecosystem) => {
          const Icon = ecosystemIcons[ecosystem.slug];
          const index = ecosystems.indexOf(ecosystem);
          const isOpen = openIndex === index;

          return (
            <li
              key={ecosystem.slug}
              className={`jluxe-ecosystem-panel${isOpen ? " is-open" : ""}`}
            >
              <button
                type="button"
                className="jluxe-ecosystem-panel__toggle"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <Icon className="jluxe-ecosystem-panel__icon" aria-hidden="true" />
                <span className="jluxe-ecosystem-panel__collapsed-title">{ecosystem.short}</span>
              </button>

              <div className="jluxe-ecosystem-panel__content">
                <h3 className="jluxe-ecosystem-panel__title">{ecosystem.name}</h3>
                <p className="jluxe-ecosystem-panel__description">{ecosystem.summary}</p>
                <Link
                  to="/ecosystems/$slug"
                  params={{ slug: ecosystem.slug }}
                  className="jluxe-ecosystem-panel__link"
                >
                  {ecosystem.status === "coming-soon" ? "Get notified" : "Explore"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}