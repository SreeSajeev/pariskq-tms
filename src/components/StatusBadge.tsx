import { cn } from "@/lib/utils";

interface BadgeStyle {
  bg: string;
  text: string;
  border: string;
  label: string;
}

const STATUS_BADGE_CONFIG: Record<string, BadgeStyle> = {
  PENDING:         { bg: "hsl(280,20%,95%)",  text: "hsl(270,25%,15%)",  border: "hsl(270,10%,88%)",  label: "Pending" },
  ASSIGNED:        { bg: "hsl(205,85%,93%)",  text: "hsl(205,85%,30%)",  border: "hsl(205,85%,50%)",  label: "Assigned" },
  IN_TRANSIT:      { bg: "hsl(38,95%,93%)",   text: "hsl(38,95%,30%)",   border: "hsl(38,95%,50%)",   label: "In Transit" },
  REACHED:         { bg: "hsl(38,95%,88%)",   text: "hsl(38,70%,25%)",   border: "hsl(38,95%,44%)",   label: "Reached" },
  DELIVERED:       { bg: "hsl(145,65%,92%)",  text: "hsl(145,65%,25%)",  border: "hsl(145,65%,35%)",  label: "Delivered" },
  CANCELLED:       { bg: "hsl(0,72%,93%)",    text: "hsl(0,72%,35%)",    border: "hsl(0,72%,51%)",    label: "Cancelled" },
  DISPUTED:        { bg: "hsl(32,95%,93%)",   text: "hsl(32,70%,25%)",   border: "#F5A623",           label: "Disputed" },
  DRAFT:           { bg: "hsl(280,20%,95%)",  text: "hsl(270,10%,45%)",  border: "hsl(270,10%,88%)",  label: "Draft" },
  SENT:            { bg: "hsl(205,85%,93%)",  text: "hsl(205,85%,30%)",  border: "hsl(205,85%,50%)",  label: "Sent" },
  PAID:            { bg: "hsl(145,65%,92%)",  text: "hsl(145,65%,25%)",  border: "hsl(145,65%,35%)",  label: "Paid" },
  OVERDUE:         { bg: "hsl(0,72%,93%)",    text: "hsl(0,72%,35%)",    border: "hsl(0,72%,51%)",    label: "Overdue" },
  PARTIALLY_PAID:  { bg: "hsl(38,95%,93%)",   text: "hsl(38,95%,30%)",   border: "hsl(38,95%,50%)",   label: "Partial" },
  AVAILABLE:       { bg: "hsl(145,65%,92%)",  text: "hsl(145,65%,25%)",  border: "hsl(145,65%,35%)",  label: "Available" },
  IN_USE:          { bg: "hsl(38,95%,93%)",   text: "hsl(38,95%,30%)",   border: "hsl(38,95%,50%)",   label: "In Use" },
  IN_MAINTENANCE:  { bg: "hsl(32,95%,93%)",   text: "hsl(32,70%,25%)",   border: "#F5A623",           label: "Maintenance" },
  RETIRED:         { bg: "hsl(280,20%,95%)",  text: "hsl(270,10%,45%)",  border: "hsl(270,10%,88%)",  label: "Retired" },
  ON_TRIP:         { bg: "hsl(38,95%,93%)",   text: "hsl(38,95%,30%)",   border: "hsl(38,95%,50%)",   label: "On Trip" },
  ON_LEAVE:        { bg: "hsl(280,20%,95%)",  text: "hsl(270,25%,15%)",  border: "hsl(270,10%,88%)",  label: "On Leave" },
  INACTIVE:        { bg: "hsl(280,20%,95%)",  text: "hsl(270,10%,45%)",  border: "hsl(270,10%,88%)",  label: "Inactive" },
  ACTIVE:          { bg: "hsl(145,65%,92%)",  text: "hsl(145,65%,25%)",  border: "hsl(145,65%,35%)",  label: "Active" },
  OK:              { bg: "hsl(145,65%,92%)",  text: "hsl(145,65%,25%)",  border: "hsl(145,65%,35%)",  label: "Valid" },
  WARNING:         { bg: "hsl(38,95%,93%)",   text: "hsl(38,95%,30%)",   border: "hsl(38,95%,50%)",   label: "Expiring Soon" },
  EXPIRED:         { bg: "hsl(0,72%,93%)",    text: "hsl(0,72%,35%)",    border: "hsl(0,72%,51%)",    label: "Expired" },
};

type StatusKey = keyof typeof STATUS_BADGE_CONFIG;

interface StatusBadgeProps {
  status: string;
  className?: string;
  showDot?: boolean;
}

export function StatusBadge({ status, className, showDot = false }: StatusBadgeProps) {
  const config = STATUS_BADGE_CONFIG[status];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.5px] whitespace-nowrap",
        className,
      )}
      style={{
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {showDot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: config.text }}
        />
      )}
      {config.label}
    </span>
  );
}
