import { cn } from "@/lib/utils";

const STATUS_BADGE_CONFIG = {
  PENDING:     { bg: "bg-primary-50", text: "text-primary-500", border: "border-primary-400", label: "Pending" },
  ASSIGNED:    { bg: "bg-primary-100", text: "text-primary-800", border: "border-primary-500", label: "Assigned" },
  IN_TRANSIT:  { bg: "bg-warning-100", text: "text-warning-700", border: "border-warning-400", label: "In Transit" },
  REACHED:     { bg: "bg-orange-100", text: "text-orange-500", border: "border-orange-500", label: "Reached" },
  DELIVERED:   { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", label: "Delivered" },
  CANCELLED:   { bg: "bg-danger-100", text: "text-danger-700", border: "border-danger-400", label: "Cancelled" },
  DISPUTED:    { bg: "bg-orange-100", text: "text-orange-500", border: "border-orange-500", label: "Disputed" },
  DRAFT:       { bg: "bg-neutral-100", text: "text-neutral-600", border: "border-neutral-300", label: "Draft" },
  SENT:        { bg: "bg-primary-100", text: "text-primary-800", border: "border-primary-500", label: "Sent" },
  PAID:        { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", label: "Paid" },
  OVERDUE:     { bg: "bg-danger-100", text: "text-danger-700", border: "border-danger-500", label: "Overdue" },
  PARTIALLY_PAID: { bg: "bg-warning-100", text: "text-warning-700", border: "border-warning-500", label: "Partial" },
  AVAILABLE:   { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", label: "Available" },
  IN_USE:      { bg: "bg-warning-100", text: "text-warning-700", border: "border-warning-500", label: "In Use" },
  IN_MAINTENANCE: { bg: "bg-orange-100", text: "text-orange-500", border: "border-orange-500", label: "Maintenance" },
  RETIRED:     { bg: "bg-neutral-100", text: "text-neutral-600", border: "border-neutral-300", label: "Retired" },
  ON_TRIP:     { bg: "bg-warning-100", text: "text-warning-700", border: "border-warning-400", label: "On Trip" },
  ON_LEAVE:    { bg: "bg-primary-50", text: "text-primary-500", border: "border-primary-400", label: "On Leave" },
  INACTIVE:    { bg: "bg-neutral-100", text: "text-neutral-600", border: "border-neutral-300", label: "Inactive" },
  ACTIVE:      { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", label: "Active" },
  OK:          { bg: "bg-success-100", text: "text-success-700", border: "border-success-500", label: "Valid" },
  WARNING:     { bg: "bg-warning-100", text: "text-warning-700", border: "border-warning-500", label: "Expiring Soon" },
  EXPIRED:     { bg: "bg-danger-100", text: "text-danger-700", border: "border-danger-500", label: "Expired" },
} as const;

type StatusKey = keyof typeof STATUS_BADGE_CONFIG;

interface StatusBadgeProps {
  status: StatusKey;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = false }: StatusBadgeProps) {
  const config = STATUS_BADGE_CONFIG[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap",
        config.bg,
        config.text,
        config.border,
        className,
      )}
    >
      {showDot && (
        <span className={cn("h-1.5 w-1.5 rounded-full", config.text.replace("text-", "bg-"))} />
      )}
      {config.label}
    </span>
  );
}
