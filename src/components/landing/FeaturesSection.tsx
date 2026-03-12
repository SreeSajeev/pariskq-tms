import { motion } from "framer-motion";
import { Package, Map, Camera, Receipt, ShieldCheck, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface FeatureBlockProps {
  reverse?: boolean;
  icon: React.ElementType;
  badge?: string;
  headline: string;
  body: string;
  bullets: string[];
  mockup: React.ReactNode;
}

function FeatureBlock({ reverse, icon: Icon, badge, headline, body, bullets, mockup }: FeatureBlockProps) {
  return (
    <motion.div
      className={`flex flex-col items-center gap-10 md:gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
    >
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: "hsl(285,45%,30%,0.1)" }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {badge && (
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{
              backgroundColor: "hsl(285,45%,30%,0.1)",
              color: "#5C2D6D",
              border: "1px solid #5C2D6D",
            }}
          >
            {badge}
          </span>
        )}
        <h3 className="mb-3 text-xl font-bold text-primary md:text-2xl">
          {headline}
        </h3>
        <p className="mb-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
        <ul className="space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual */}
      <div className="flex-1 min-w-0">{mockup}</div>
    </motion.div>
  );
}

/* ── Mockup components ── */

function ShipmentTableMockup() {
  const rows = [
    { ref: "TMS-2025-00142", customer: "ABC Manufacturing", status: "IN_TRANSIT" as const },
    { ref: "TMS-2025-00141", customer: "ShreeJi Exports", status: "DELIVERED" as const },
    { ref: "TMS-2025-00140", customer: "Kumar Industries", status: "PENDING" as const },
    { ref: "TMS-2025-00139", customer: "Bharat Chemicals", status: "ASSIGNED" as const },
  ];
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
      <div className="border-b border-border bg-muted px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Active Shipments
        </span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-muted text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-2.5">Reference</th>
            <th className="px-4 py-2.5 hidden sm:table-cell">Customer</th>
            <th className="px-4 py-2.5">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.ref} className="border-b border-muted last:border-0">
              <td className="px-4 py-3 font-mono text-xs text-primary font-medium">
                {row.ref}
              </td>
              <td className="px-4 py-3 text-foreground hidden sm:table-cell">
                {row.customer}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MapMockup() {
  return (
    <div className="rounded-lg border border-border bg-primary shadow-lg overflow-hidden p-4">
      <div className="relative h-48 rounded-md overflow-hidden" style={{ backgroundColor: "hsl(285,45%,22%)" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(hsl(285,30%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(285,30%,50%) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {[30, 55, 70].map((x, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${x}%`, top: `${25 + i * 18}%` }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "hsl(145,65%,35%)", boxShadow: "0 0 8px hsla(145,65%,35%,0.5)" }} />
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs" style={{ color: "hsl(285,30%,70%)" }}>
        Real-time fleet position · Updated every 30s
      </p>
    </div>
  );
}

function PODMockup() {
  return (
    <div className="mx-auto w-52 rounded-2xl border-4 border-border bg-card p-3 shadow-lg">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-success" />
        <span className="text-[10px] font-semibold text-muted-foreground">Delivery Complete</span>
      </div>
      <div className="mb-2 flex h-28 items-center justify-center rounded-md bg-muted">
        <Camera className="h-8 w-8 text-border" />
      </div>
      <div className="mb-2 h-12 rounded-md border border-border bg-muted flex items-end justify-center pb-1">
        <svg viewBox="0 0 120 30" className="h-6 w-24 text-muted-foreground">
          <path d="M5 25 Q 20 5 35 20 Q 50 30 65 15 Q 80 5 95 18 Q 105 22 115 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="text-center text-[10px] text-muted-foreground">Recipient: Rajesh Kumar</div>
    </div>
  );
}

function InvoiceMockup() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Invoice #INV-2025-00089</span>
        <StatusBadge status="SENT" />
      </div>
      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex justify-between border-b border-muted pb-2">
          <span>TMS-2025-00142 — Pune → Navi Mumbai</span>
          <span className="font-mono tabular-nums">₹26,730</span>
        </div>
        <div className="flex justify-between border-b border-muted pb-2">
          <span>Loading charges</span>
          <span className="font-mono tabular-nums">₹2,500</span>
        </div>
        <div className="flex justify-between pt-1 text-sm font-semibold text-foreground">
          <span>Total</span>
          <span className="font-mono tabular-nums">₹29,230</span>
        </div>
      </div>
    </div>
  );
}

function ComplianceMockup() {
  const docs = [
    { name: "Insurance", status: "OK" as const, expiry: "12 Dec 2025" },
    { name: "PUC Certificate", status: "WARNING" as const, expiry: "28 Jun 2025" },
    { name: "Fitness Certificate", status: "EXPIRED" as const, expiry: "01 Jun 2025" },
  ];
  return (
    <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
      <div className="border-b border-border bg-muted px-4 py-2.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          MH-12-AB-1234 — Documents
        </span>
      </div>
      <div className="divide-y divide-muted">
        {docs.map((d) => (
          <div key={d.name} className="flex items-center justify-between px-4 py-3">
            <div>
              <span className="text-sm font-medium text-foreground">{d.name}</span>
              <p className="text-xs text-muted-foreground">Expires {d.expiry}</p>
            </div>
            <StatusBadge status={d.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="bg-muted py-20 md:py-28" id="features">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
            Everything your fleet needs.{" "}
            <span className="text-primary">Nothing it doesn't.</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Built specifically for Indian transport operators — not adapted from
            a generic Western logistics platform.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          <FeatureBlock
            icon={Package}
            headline="Book and dispatch shipments in 2 minutes"
            body="Create shipment records, assign vehicles and drivers, set pickup windows, attach waybills — all from one form. Auto-generate reference numbers. Never lose a booking."
            bullets={[
              "Auto-generated reference numbers (TMS-2025-00142)",
              "Google Maps address autocomplete",
              "Goods type, weight, and volume tracking",
              "Customer-specific billing rates",
            ]}
            mockup={<ShipmentTableMockup />}
          />

          <FeatureBlock
            reverse
            icon={Map}
            badge="Growth plan and above"
            headline="Know where every vehicle is, right now"
            body="Live GPS tracking shows all active vehicles on a map. Click any vehicle to see the driver, destination, and ETA. Share a tracking link with your customer — no login needed."
            bullets={[
              "Real-time GPS position updates",
              "Shareable customer tracking links",
              "Geofence alerts and ETA notifications",
            ]}
            mockup={<MapMockup />}
          />

          <FeatureBlock
            icon={Camera}
            headline="Paperless delivery. Instant confirmation."
            body="Drivers capture photos and customer signatures on their phone. POD is uploaded instantly. Customer gets an email with the delivery confirmation and a download link."
            bullets={[
              "Photo + signature capture on mobile",
              "Instant customer email notification",
              "Downloadable POD PDF",
            ]}
            mockup={<PODMockup />}
          />

          <FeatureBlock
            reverse
            icon={Receipt}
            headline="Invoices that calculate themselves"
            body="Set your rates once — per km, per tonne, or flat rate. When a trip is delivered, the invoice is ready. Send it to your customer in one click. Track payments. Chase overdue."
            bullets={[
              "Per km, per tonne, or flat rate billing",
              "One-click invoice generation",
              "Payment tracking and overdue alerts",
            ]}
            mockup={<InvoiceMockup />}
          />

          <FeatureBlock
            icon={ShieldCheck}
            headline="Never dispatch with expired documents again"
            body="Track RC, insurance, permits, and PUC for every vehicle. Get alerts 30 days before anything expires. Driver licence and medical certificates tracked the same way."
            bullets={[
              "Automatic expiry alerts at 30, 15, 7 days",
              "Document upload and storage",
              "Compliance dashboard overview",
            ]}
            mockup={<ComplianceMockup />}
          />
        </div>
      </div>
    </section>
  );
}
