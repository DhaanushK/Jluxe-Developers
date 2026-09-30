import { useState } from "react";
import { siteVisitInputSchema, type SiteVisitInput } from "@/server/validation/enquiries";
import { submitSiteVisit } from "@/server/actions/leads";

const field = "mt-2 w-full rounded-md border border-input bg-card px-3 py-3 focus-visible:outline-2";
type FormErrors = Partial<Record<keyof SiteVisitInput, string>>;

type SiteVisitFormProps = {
  projectId?: string;
  propertyId?: string;
  plotId?: string;
};

export function SiteVisitForm({ projectId, propertyId, plotId }: SiteVisitFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = siteVisitInputSchema.safeParse({ ...values, projectId, propertyId, plotId });
    if (!parsed.success) {
      const next: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (key) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("submitting");
    try {
      const result = await submitSiteVisit({ data: parsed.data });
      setMessage(result.message);
      setStatus(result.success ? "success" : "error");
      if (result.success) event.currentTarget.reset();
    } catch {
      setMessage("We couldn't submit your request right now. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-l-2 border-brass bg-card p-8">
        <h2 className="text-2xl">Thank you.</h2>
        <p className="mt-3 text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6" aria-busy={status === "submitting"}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-px w-px opacity-0" aria-hidden="true" />
      <FormField name="name" label="Full name" type="text" autoComplete="name" error={errors.name} />
      <FormField name="phone" label="Phone" type="tel" autoComplete="tel" error={errors.phone} />
      <FormField name="email" label="Email (optional)" type="email" autoComplete="email" error={errors.email} />
      <div>
        <label htmlFor="preferredDate" className="text-sm font-semibold">Preferred date</label>
        <input id="preferredDate" name="preferredDate" type="date" className={field} aria-invalid={!!errors.preferredDate} />
        {errors.preferredDate && <FieldError name="preferredDate" message={errors.preferredDate} />}
      </div>
      <div>
        <label htmlFor="preferredTime" className="text-sm font-semibold">Preferred time</label>
        <input id="preferredTime" name="preferredTime" type="text" placeholder="Morning or afternoon" className={field} aria-invalid={!!errors.preferredTime} />
        {errors.preferredTime && <FieldError name="preferredTime" message={errors.preferredTime} />}
      </div>
      <div>
        <label htmlFor="siteVisitMessage" className="text-sm font-semibold">Message (optional)</label>
        <textarea id="siteVisitMessage" name="message" rows={4} maxLength={2000} className={field} />
      </div>
      {status === "error" && <p role="alert" className="text-sm text-destructive">{message}</p>}
      <button type="submit" disabled={status === "submitting"} className="w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
        {status === "submitting" ? "Submitting..." : "Request a site visit"}
      </button>
    </form>
  );
}

function FormField({ name, label, type, autoComplete, error }: { name: string; label: string; type: string; autoComplete: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} className={field} aria-invalid={!!error} />
      {error && <FieldError name={name} message={error} />}
    </div>
  );
}

function FieldError({ name, message }: { name: string; message: string }) {
  return <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{message}</p>;
}
