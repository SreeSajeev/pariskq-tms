import { motion } from "framer-motion";
import { Truck, MapPin } from "lucide-react";

const trucks = [
  { id: 1, x: 25, y: 35, label: "MH-12-AB-1234" },
  { id: 2, x: 60, y: 55, label: "MH-14-CD-5678" },
  { id: 3, x: 75, y: 25, label: "GJ-05-EF-9012" },
  { id: 4, x: 40, y: 70, label: "RJ-14-GH-3456" },
];

const stats = [
  { label: "Active Trips", value: "14" },
  { label: "Delivered Today", value: "3" },
  { label: "Overdue", value: "0" },
];

export function HeroDashboardCard() {
  return (
    <div className="relative rounded-xl border border-primary-500/30 bg-primary-900 p-1 shadow-[0_0_40px_-8px_hsl(var(--primary-500)/0.3)]">
      {/* Live badge */}
      <div className="absolute -top-3 right-4 z-10 flex items-center gap-1.5 rounded-full bg-success-500 px-3 py-1 text-[11px] font-semibold text-primary-foreground uppercase tracking-wider">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-foreground opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-foreground" />
        </span>
        Live
      </div>

      {/* Map area */}
      <div className="relative h-52 rounded-lg bg-primary-800/60 overflow-hidden">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary-400)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-400)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated truck markers */}
        {trucks.map((truck, i) => (
          <motion.div
            key={truck.id}
            className="absolute flex flex-col items-center"
            initial={{ x: `${truck.x}%`, y: `${truck.y}%` }}
            animate={{
              x: [`${truck.x}%`, `${truck.x + 5}%`, `${truck.x + 3}%`, `${truck.x}%`],
              y: [`${truck.y}%`, `${truck.y - 3}%`, `${truck.y + 4}%`, `${truck.y}%`],
            }}
            transition={{
              duration: 12 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <div className="absolute -inset-2 animate-pulse-glow rounded-full bg-primary-500/30" />
              <div className="relative rounded-full bg-success-500 p-1.5">
                <Truck className="h-3 w-3 text-primary-foreground" />
              </div>
            </div>
            <span className="mt-1 font-mono text-[9px] text-primary-400/80">
              {truck.label}
            </span>
          </motion.div>
        ))}

        {/* Depot marker */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-primary-500" />
          <span className="text-[10px] text-primary-400/60">HQ Depot</span>
        </div>
      </div>

      {/* Stat pills */}
      <div className="mt-2 flex gap-2 p-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 rounded-md bg-primary-800/80 px-3 py-2 text-center"
          >
            <div className="font-heading text-lg font-bold text-primary-foreground tabular-nums">
              {stat.value}
            </div>
            <div className="text-[10px] text-primary-400/80">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
