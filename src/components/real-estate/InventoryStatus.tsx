import type { InventoryStatus, ProjectStatus } from "@/lib/real-estate";

type Status = InventoryStatus | ProjectStatus;

const labels: Record<Status, string> = {
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  SOLD: "Sold",
  UPCOMING: "Upcoming",
  ACTIVE: "Active",
  LIMITED: "Limited availability",
  SOLD_OUT: "Sold out",
  COMPLETED: "Completed",
};

export function InventoryStatus({ status }: { status: Status }) {
  return (
    <span className="inline-flex border border-brass/50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
      {labels[status]}
    </span>
  );
}
