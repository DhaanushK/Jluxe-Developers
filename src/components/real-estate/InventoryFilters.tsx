export type FilterOption = { value: string; label: string };

export function InventoryFilters({
  label,
  options,
  value,
  onChange,
  onClear,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 border-y py-5 sm:flex-row sm:items-end">
      <label className="flex min-w-52 flex-col gap-2 text-sm font-semibold">
        {label}
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 border bg-background px-3 font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">All</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="h-11 px-0 text-left text-sm font-semibold underline underline-offset-4"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
