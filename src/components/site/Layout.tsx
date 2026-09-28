import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { ecosystems, siteSettings } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/about", label: "About" },
  { to: "/ecosystems", label: "Ecosystems" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Our Work" },
  { to: "/insights", label: "Insights" },
  { to: "/careers", label: "Careers" },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-baseline", className)} aria-label="JLuxe home">
      <span className="font-display text-2xl">JLuxe</span>
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
    outline: "border border-foreground/80 hover:bg-foreground hover:text-background px-5 py-3",
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
      {variant !== "outline" && <ArrowRight className="size-4" aria-hidden />}
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-4">
        <Wordmark />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="text-foreground/75 transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground font-semibold" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex"
          >
            Let's Talk
          </Link>
          <button
            className="p-2 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t lg:hidden">
          <ul className="mx-auto max-w-7xl px-6 py-4">
            {[...nav, { to: "/contact", label: "Let's Talk" } as const].map((n) => (
              <li key={n.to}>
                <Link to={n.to} onClick={() => setOpen(false)} className="block border-b py-3 font-display text-xl">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">JLuxe</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-75">{siteSettings.tagline}</p>
          <p className="mt-6 text-xs tracking-[0.18em] uppercase opacity-60">
            {siteSettings.philosophy.join("  |  ")}
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase opacity-60">Ecosystems</p>
          <ul className="mt-4 space-y-2 text-sm">
            {ecosystems.map((e) => (
              <li key={e.slug}>
                <Link to="/ecosystems/$slug" params={{ slug: e.slug }} className="opacity-85 hover:opacity-100 hover:underline">
                  {e.short}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] uppercase opacity-60">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[...nav, { to: "/contact", label: "Contact" } as const].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="opacity-85 hover:opacity-100 hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/15">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs opacity-60">
          © {new Date().getFullYear()} JLuxe Developers Pvt Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:p-3">
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

export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: string }) {
  return (
    <section className="border-b">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-5" : ""} max-w-4xl text-4xl leading-[1.08] md:text-6xl`}>{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}

/** Editorial panel used where authentic JLUXE photography has not yet been supplied. */
export function VisualPlaceholder({ index, label, className }: { index: string; label: string; className?: string }) {
  return (
    <div className={cn("blueprint relative flex flex-col justify-between overflow-hidden bg-secondary p-6", className)} aria-hidden>
      <span className="font-display text-7xl text-brass/70">{index}</span>
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function PendingNotice({ title, body }: { title: string; body: string }) {
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
