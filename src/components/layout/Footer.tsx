import { Link } from "@tanstack/react-router";
import { ecosystems, siteSettings } from "@/lib/site";
import { Wordmark } from "./Layout";

const companyLinks = [
  { to: "/about", label: "About" },
  { to: "/ecosystems", label: "Ecosystems" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Our Work" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:gap-16 lg:gap-24">
          {/* Brand */}
          <div className="max-w-xl">
            <Wordmark className="text-white" />

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/65">
              {siteSettings.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              {siteSettings.philosophy.map((principle, index) => (
                <span key={principle} className="inline-flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden className="text-white/25">
                      |
                    </span>
                  )}
                  {principle}
                </span>
              ))}
            </div>
          </div>

          {/* Ecosystems */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Ecosystems
            </p>

            <nav aria-label="JLUXE ecosystems" className="mt-6">
              <ul className="space-y-3">
                {ecosystems.map((ecosystem) => (
                  <li key={ecosystem.slug}>
                    <Link
                      to="/ecosystems/$slug"
                      params={{ slug: ecosystem.slug }}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {ecosystem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Company
            </p>

            <nav aria-label="Company navigation" className="mt-6">
              <ul className="space-y-3">
                {companyLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteSettings.name}. All rights
              reserved.
            </p>

            <p>Building Relationships. Creating Opportunities. Delivering Results.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}