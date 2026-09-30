import { ButtonLink } from "@/components/site/Layout";

export function InventoryEmptyState({
  title,
  body,
  resetLabel,
  onReset,
}: {
  title: string;
  body: string;
  resetLabel?: string;
  onReset?: () => void;
}) {
  return (
    <div className="border-l-2 border-brass bg-card p-8">
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {body}
      </p>
      {onReset && resetLabel ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold underline underline-offset-4"
        >
          {resetLabel}
        </button>
      ) : (
        <div className="mt-6">
          <ButtonLink to="/contact">Talk to JLUXE</ButtonLink>
        </div>
      )}
    </div>
  );
}
