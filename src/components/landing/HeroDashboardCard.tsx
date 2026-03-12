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
    <div
      className="relative rounded-xl p-1"
      style={{
        backgroundColor: "#5C2D6D",
        border: "1px solid hsl(285,45%,40%)",
        boxShadow: "0 0 60px hsla(285,45%,30%,0.4)",
      }}
    >
      {/* Live badge */}
      <div
        className="absolute -top-3 right-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-white uppercase tracking-wider"
        style={{ backgroundColor: "#F5A623" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Live
      </div>

      {/* Map area */}
      <div className="relative h-52 rounded-lg overflow-hidden" style={{ backgroundColor: "hsl(285,45%,22%)" }}>
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(hsl(285,30%,50%) 1px, transparent 1px), linear-gradient(90deg, hsl(285,30%,50%) 1px, transparent 1px)",
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
              <div className="absolute -inset-2 animate-pulse-glow rounded-full" style={{ backgroundColor: "hsla(145,65%,35%,0.3)" }} />
              <div className="relative rounded-full p-1.5" style={{ backgroundColor: "hsl(145,65%,35%)" }}>
                <Truck className="h-3 w-3 text-white" />
              </div>
            </div>
            <span className="mt-1 font-mono text-[9px]" style={{ color: "hsl(285,30%,70%)" }}>
              {truck.label}
            </span>
          </motion.div>
        ))}

        {/* Depot marker */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          <span className="text-[10px]" style={{ color: "hsl(285,30%,60%)" }}>HQ Depot</span>
        </div>
      </div>

      {/* Stat pills */}
      <div className="mt-2 flex gap-2 p-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex-1 rounded-md px-3 py-2 text-center"
            style={{
              backgroundColor: "hsl(285,45%,22%)",
              border: "1px solid hsl(285,45%,40%)",
            }}
          >
            <div className="text-lg font-bold text-white tabular-nums">
              {stat.value}
            </div>
            <div className="text-[10px]" style={{ color: "hsl(285,30%,70%)" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
