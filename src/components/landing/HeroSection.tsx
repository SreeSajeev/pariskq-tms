import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroDashboardCard } from "./HeroDashboardCard";

const spring = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.8 };

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary-900 pt-32 pb-20 md:pt-40 md:pb-28">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary-400)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-400)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.4fr_1fr] lg:gap-20">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[2px] text-primary-400">
            Transport Management, Reinvented
          </p>
          <h1 className="font-display text-hero text-primary-foreground mb-6">
            Run Your Entire Fleet{" "}
            <br className="hidden sm:block" />
            From{" "}
            <span className="relative inline-block italic">
              One Screen
              <span className="absolute bottom-1 left-0 right-0 h-[3px] rounded-full bg-primary-500" />
            </span>
            .
          </h1>
          <p className="mb-8 max-w-[520px] text-lg leading-relaxed text-primary-foreground/70">
            Pariskq TMS gives transport operators complete control —
            shipment booking, driver dispatch, live tracking, digital POD,
            and automated billing in a single platform built for India's
            logistics industry.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="/signup">
                Start Free Trial — 14 days free
              </a>
            </Button>
            <Button variant="hero-ghost" size="lg" asChild>
              <a href="#features">
                Watch how it works →
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/50">
            No credit card required · Setup in under 10 minutes
          </p>
        </motion.div>

        {/* Right — Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ ...spring, delay: 0.3 }}
          className="hidden md:block"
        >
          <HeroDashboardCard />
        </motion.div>
      </div>
    </section>
  );
}
