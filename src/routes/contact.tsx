import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { ecosystems, siteSettings, whatsappLink } from "@/lib/site";
import { PageHeader } from "@/components/site/Layout";
import { pageMeta } from "@/lib/seo";

const searchSchema = z.object({
  ecosystem: z.string().optional(),
  intent: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => pageMeta("Contact", "Talk to JLuxe about property, business growth, hiring, training or an interiors project."),
  component: Contact,
});

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{7,20}$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email").max(255)]),
  ecosystem: z.string().min(1, "Please choose an area"),
  message: z.string().trim().max(1000),
});

type Errors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

const field = "mt-2 w-full rounded-md border border-input bg-card px-3 py-3 focus-visible:outline-2";

function Contact() {
  const search = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((i) => (next[i.path[0] as keyof Errors] = i.message));
      setErrors(next);
      return;
    }
    setErrors({});
    setDone(true);
  }

  const wa = whatsappLink("Hi, I would like to know more about JLuxe.");

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's Talk" intro="Tell us what you need and we will connect you with the right JLuxe team." />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-7">
          {done ? (
            <div role="status" className="border-l-2 border-brass bg-card p-8">
              <h2 className="text-2xl">Thank you. Online enquiries are almost ready.</h2>
              <p className="mt-3 text-muted-foreground">Your form is valid, but enquiries are not yet being saved. Please use the contact details alongside in the meantime.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid gap-6">
              <input type="hidden" name="intent" value={search.intent ?? ""} />
              {([
                ["name", "Full name", "text", "name"],
                ["phone", "Phone", "tel", "tel"],
                ["email", "Email (optional)", "email", "email"],
              ] as const).map(([n, label, type, ac]) => (
                <div key={n}>
                  <label htmlFor={n} className="text-sm font-semibold">{label}</label>
                  <input id={n} name={n} type={type} autoComplete={ac} className={field} aria-invalid={!!errors[n]} aria-describedby={errors[n] ? `${n}-err` : undefined} />
                  {errors[n] && <p id={`${n}-err`} className="mt-1 text-sm text-destructive">{errors[n]}</p>}
                </div>
              ))}
              <div>
                <label htmlFor="ecosystem" className="text-sm font-semibold">What is this about?</label>
                <select id="ecosystem" name="ecosystem" defaultValue={search.ecosystem ?? ""} className={field} aria-invalid={!!errors.ecosystem}>
                  <option value="">Choose an area</option>
                  {ecosystems.map((e) => <option key={e.slug} value={e.slug}>{e.short}</option>)}
                  <option value="other">Something else</option>
                </select>
                {errors.ecosystem && <p className="mt-1 text-sm text-destructive">{errors.ecosystem}</p>}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-semibold">Your requirement</label>
                <textarea id="message" name="message" rows={5} maxLength={1000} className={field} />
              </div>
              <div>
                <button type="submit" className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  Send enquiry
                </button>
              </div>
            </form>
          )}
        </div>
        <aside className="md:col-span-5">
          <p className="eyebrow">Reach us directly</p>
          <dl className="mt-6 divide-y border-y">
            {([
              ["Phone", siteSettings.phone],
              ["Email", siteSettings.email],
              ["Address", siteSettings.address],
            ] as const).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4">
                <dt className="text-sm text-muted-foreground">{k}</dt>
                <dd className="text-right">{v ?? "Information coming soon"}</dd>
              </div>
            ))}
          </dl>
          {wa && <a href={wa} className="mt-6 inline-block text-sm font-semibold underline">Message us on WhatsApp</a>}
        </aside>
      </section>
    </>
  );
}
