import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  PhoneCall,
} from "lucide-react";
import { ecosystems, services, siteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/about", label: "About" },
  { to: "/ecosystems", label: "Ecosystems", dropdown: "ecosystems" },
  { to: "/services", label: "Services", dropdown: "services" },
  { to: "/portfolio", label: "Our Work" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
] as const;

type DropdownKey = "ecosystems" | "services";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn("flex items-baseline", className)}
      aria-label="JLuxe home"
    >
      <span className="font-display text-2xl">JLUXE</span>
    </Link>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "solid",
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  className?: string;
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-3",
    outline:
      "border border-foreground/80 hover:bg-foreground hover:text-background px-5 py-3",
    text: "underline-offset-4 hover:underline px-0 py-1",
  }[variant];

  return (
    <a
      href={to}
      className={cn(
        "inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-wide transition-colors",
        styles,
        className,
      )}
    >
      {children}
      {variant !== "outline" && (
        <ArrowRight className="size-4" aria-hidden />
      )}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<DropdownKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isHome = pathname === "/";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenDropdown(null);
        setOpenMobileSection(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!openDropdown) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [openDropdown]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
    setOpenMobileSection(null);
  }, [pathname]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "inset-x-0 top-0 z-50",
        isHome
          ? "fixed border-b border-white/10 bg-[rgba(23,56,47,0.68)] text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md"
          : "relative border-b border-border bg-background text-foreground",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 py-4">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.to} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      className={cn(
                        "jluxe-nav-trigger inline-flex items-center gap-1.5 transition-colors",
                        isHome
                          ? "text-white/80 hover:text-white"
                          : "text-foreground/70 hover:text-foreground",
                      )}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.dropdown}
                      aria-controls={`desktop-${item.dropdown}-menu`}
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.dropdown ? null : item.dropdown,
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          openDropdown === item.dropdown && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {openDropdown === item.dropdown && (
                      <DesktopDropdown
                        id={`desktop-${item.dropdown}-menu`}
                        kind={item.dropdown}
                      />
                    )}
                  </>
                ) : (
                  <Link
                    to={item.to}
                    className={cn(
                      "transition-colors",
                      isHome
                        ? "text-white/80 hover:text-white"
                        : "text-foreground/70 hover:text-foreground",
                    )}
                    activeProps={{
                      className: "font-semibold",
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="jluxe-talk-button hidden sm:inline-flex"
          >
            <PhoneCall className="jluxe-talk-icon size-4" aria-hidden="true" />
            <span>Let's Talk</span>
          </Link>

          <button
            type="button"
            className={cn(
              "flex size-11 items-center justify-center rounded-md transition-colors lg:hidden",
              isHome
                ? "text-white hover:bg-white/10 focus-visible:bg-white/10"
                : "text-foreground hover:bg-muted focus-visible:bg-muted",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={cn(
            "border-t lg:hidden",
            isHome
              ? "border-white/15 bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground",
          )}
        >
          <ul className="mx-auto max-w-7xl px-6 py-4">
            {[...nav, { to: "/contact", label: "Let's Talk" } as const].map(
              (item) => (
                <li key={item.to}>
                  {item.dropdown ? (
                    <>
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between border-b py-4 text-left font-display text-xl transition-colors",
                          isHome
                            ? "border-white/15 hover:text-white/70"
                            : "border-border hover:text-primary",
                        )}
                        aria-expanded={openMobileSection === item.dropdown}
                        onClick={() =>
                          setOpenMobileSection((current) =>
                            current === item.dropdown ? null : item.dropdown,
                          )
                        }
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "size-5 transition-transform duration-200",
                            openMobileSection === item.dropdown && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>
                      {openMobileSection === item.dropdown && (
                        <MobileDropdown kind={item.dropdown} onNavigate={() => setOpen(false)} />
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b py-4 font-display text-xl transition-colors",
                        isHome
                          ? "border-white/15 hover:text-white/70"
                          : "border-border hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ),
            )}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">JLuxe</p>

          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-75">
            {siteSettings.tagline}
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.18em] opacity-60">
            {siteSettings.philosophy.join(" | ")}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">
            Ecosystems
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            {ecosystems.map((ecosystem) => (
              <li key={ecosystem.slug}>
                <Link
                  to="/ecosystems/$slug"
                  params={{ slug: ecosystem.slug }}
                  className="opacity-85 hover:opacity-100 hover:underline"
                >
                  {ecosystem.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">
            Real Estate
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/real-estate" className="opacity-85 hover:opacity-100 hover:underline">
                Overview
              </Link>
            </li>
            <li>
              <Link to="/real-estate/projects" className="opacity-85 hover:opacity-100 hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/real-estate/properties" className="opacity-85 hover:opacity-100 hover:underline">
                Properties
              </Link>
            </li>
            <li>
              <Link to="/real-estate/plots" className="opacity-85 hover:opacity-100 hover:underline">
                Plots
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.18em] opacity-60">
            Company
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            {[...nav, { to: "/contact", label: "Contact" } as const].map(
              (item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="opacity-85 hover:opacity-100 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs opacity-60">
          © {new Date().getFullYear()} JLuxe Developers Pvt Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

        <h1
          className={`${eyebrow ? "mt-5" : ""} max-w-4xl text-4xl leading-[1.08] md:text-6xl`}
        >
          {title}
        </h1>

        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}

/** Editorial panel used where authentic JLUXE photography has not yet been supplied. */
export function VisualPlaceholder({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "blueprint relative flex flex-col justify-between overflow-hidden bg-secondary p-6",
        className,
      )}
      aria-hidden
    >
      <span className="font-display text-7xl text-brass/70">{index}</span>

      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function PendingNotice({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-l-2 border-brass bg-card p-8">
      <h2 className="text-2xl">{title}</h2>

      <p className="mt-3 max-w-xl text-muted-foreground">{body}</p>

      <div className="mt-6">
        <ButtonLink to="/contact">Let's Talk</ButtonLink>
      </div>
    </div>
  );
}

function DesktopDropdown({ id, kind }: { id: string; kind: DropdownKey }) {
  if (kind === "ecosystems") {
    return (
      <div id={id} className="jluxe-nav-dropdown jluxe-nav-dropdown--ecosystems">
        {ecosystems.map((ecosystem) => (
          <Link
            key={ecosystem.slug}
            to="/ecosystems/$slug"
            params={{ slug: ecosystem.slug }}
            className="jluxe-nav-dropdown__item"
          >
            <span className="jluxe-nav-dropdown__label">{ecosystem.short}</span>
            <span className="jluxe-nav-dropdown__index">{ecosystem.index}</span>
            <ArrowRight className="jluxe-nav-dropdown__arrow size-4" aria-hidden="true" />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div id={id} className="jluxe-nav-dropdown jluxe-nav-dropdown--services">
      {ecosystems.map((ecosystem) => {
        const ecosystemServices = services.filter((service) =>
          service.ecosystemSlugs.includes(ecosystem.slug),
        );

        return (
          <div key={ecosystem.slug} className="jluxe-nav-dropdown__group">
            <span className="jluxe-nav-dropdown__group-title">{ecosystem.short}</span>
            {ecosystemServices.map((service) => (
              <Link
                key={service.id}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="jluxe-nav-dropdown__service-item"
              >
                {service.name}
                <ArrowRight className="jluxe-nav-dropdown__arrow size-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function MobileDropdown({ kind, onNavigate }: { kind: DropdownKey; onNavigate: () => void }) {
  if (kind === "ecosystems") {
    return (
      <div className="jluxe-mobile-dropdown">
        {ecosystems.map((ecosystem) => (
          <Link
            key={ecosystem.slug}
            to="/ecosystems/$slug"
            params={{ slug: ecosystem.slug }}
            onClick={onNavigate}
            className="jluxe-mobile-dropdown__item"
          >
            <span>{ecosystem.short}</span>
            <span className="jluxe-nav-dropdown__index">{ecosystem.index}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="jluxe-mobile-dropdown jluxe-mobile-dropdown--services">
      {ecosystems.map((ecosystem) => {
        const ecosystemServices = services.filter((service) =>
          service.ecosystemSlugs.includes(ecosystem.slug),
        );

        return (
          <div key={ecosystem.slug} className="jluxe-mobile-dropdown__group">
            <span className="jluxe-nav-dropdown__group-title">{ecosystem.short}</span>
            {ecosystemServices.map((service) => (
              <Link
                key={service.id}
                to="/services/$slug"
                params={{ slug: service.slug }}
                onClick={onNavigate}
                className="jluxe-mobile-dropdown__item"
              >
                {service.name}
              </Link>
            ))}
          </div>
        );
      })}
    </div>
  );
}