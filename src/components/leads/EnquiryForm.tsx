import { useState } from "react";
import { enquiryInputSchema, type EnquiryInput } from "@/server/validation/enquiries";
import { submitEnquiry } from "@/server/actions/leads";

const field = "mt-2 w-full rounded-md border border-input bg-card px-3 py-3 focus-visible:outline-2";
type FormErrors = Partial<Record<keyof EnquiryInput, string>>;

type EnquiryFormProps = {
  source: EnquiryInput["source"];
  ecosystemSlug?: string;
  serviceId?: string;
  projectId?: string;
  propertyId?: string;
  plotId?: string;
  ecosystemOptions?: { slug: string; label: string }[];
  initialEcosystemSlug?: string;
};

export function EnquiryForm({
  source,
  ecosystemSlug,
  serviceId,
  projectId,
  propertyId,
  plotId,
  ecosystemOptions = [],
  initialEcosystemSlug = "",
}: EnquiryFormProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const selectedEcosystem = String(values.ecosystemSlug ?? "");
    const input = {
      ...values,
      source,
      ecosystemSlug: ecosystemSlug || (selectedEcosystem && selectedEcosystem !== "other" ? selectedEcosystem : undefined),
      serviceId,
      projectId,
      propertyId,
      plotId,
      pageUrl: window.location.pathname,
    };
    const parsed = enquiryInputSchema.safeParse(input);
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
      const result = await submitEnquiry({ data: parsed.data });
      setMessage(result.message);
      setStatus(result.success ? "success" : "error");
      if (result.success) event.currentTarget.reset();
    } catch {
      setMessage("We couldn't submit your enquiry right now. Please try again.");
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
      <FormField name="company" label="Company (optional)" type="text" autoComplete="organization" error={errors.company} />

      {ecosystemOptions.length > 0 && !ecosystemSlug && (
        <div>
          <label htmlFor="ecosystemSlug" className="text-sm font-semibold">What is this about?</label>
          <select id="ecosystemSlug" name="ecosystemSlug" defaultValue={initialEcosystemSlug} className={field} aria-invalid={!!errors.ecosystemSlug}>
            <option value="">Choose an area</option>
            {ecosystemOptions.map((option) => <option key={option.slug} value={option.slug}>{option.label}</option>)}
            <option value="other">Something else</option>
          </select>
          {errors.ecosystemSlug && <FieldError name="ecosystemSlug" message={errors.ecosystemSlug} />}
        </div>
      )}

      <div>
        <label htmlFor="message" className="text-sm font-semibold">Your requirement</label>
        <textarea id="message" name="message" rows={5} maxLength={2000} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <FieldError name="message" message={errors.message} />}
      </div>

      {status === "error" && <p role="alert" className="text-sm text-destructive">{message}</p>}
      <button type="submit" disabled={status === "submitting"} className="w-fit rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60">
        {status === "submitting" ? "Submitting..." : "Send enquiry"}
      </button>
    </form>
  );
}

function FormField({ name, label, type, autoComplete, error }: { name: string; label: string; type: string; autoComplete: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} className={field} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined} />
      {error && <FieldError name={name} message={error} />}
    </div>
  );
}

function FieldError({ name, message }: { name: string; message: string }) {
  return <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{message}</p>;
}
