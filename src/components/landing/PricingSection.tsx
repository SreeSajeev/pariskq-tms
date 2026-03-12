import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    monthly: 4999,
    tagline: "For small operators",
    vehicles: "5",
    users: "3",
    features: [
      { text: "Shipment management", included: true },
      { text: "Fleet & driver management", included: true },
      { text: "Digital POD", included: true },
      { text: "Basic billing & invoicing", included: true },
      { text: "Live GPS tracking", included: false },
      { text: "Customer portal", included: false },
    ],
  },
  {
    name: "Growth",
    monthly: 14999,
    tagline: "For growing logistics companies",
    popular: true,
    vehicles: "25",
    users: "10",
    features: [
      { text: "Everything in Starter, plus:", included: true },
      { text: "Live GPS tracking", included: true },
      { text: "Customer self-service portal", included: true },
      { text: "Customer notifications (email + SMS)", included: true },
      { text: "Advanced trip analytics", included: true },
    ],
  },
  {
    name: "Business",
    monthly: 29999,
    tagline: "For regional operators",
    vehicles: "50",
    users: "25",
    features: [
      { text: "Everything in Growth, plus:", included: true },
      { text: "Advanced analytics & SLA reports", included: true },
      { text: "AI route recommendations", included: true },
      { text: "Multi-branch support", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="bg-neutral-50 py-20 md:py-28" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
        >
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-base text-neutral-600">
            Pay for what you need. Upgrade as you grow. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-neutral-200 p-1">
            <button
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                !annual ? "bg-card text-foreground shadow-sm" : "text-neutral-500"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                annual ? "bg-card text-foreground shadow-sm" : "text-neutral-500"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual <span className="text-success-500 text-xs font-semibold">Save 2 months</span>
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => {
            const price = annual ? Math.round(plan.monthly * 10) : plan.monthly;
            const period = annual ? "/year" : "/month";
            return (
              <motion.div
                key={plan.name}
                className={`relative flex flex-col rounded-xl border bg-card p-6 shadow-md transition-shadow hover:shadow-lg ${
                  plan.popular ? "border-primary-500 ring-2 ring-primary-500/20" : "border-border"
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 30,
                  delay: i * 0.08,
                }}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-500 px-4 py-1 text-xs font-semibold text-primary-foreground uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="font-heading text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-neutral-500">{plan.tagline}</p>
                </div>

                <div className="mb-4">
                  <span className="font-heading text-3xl font-bold text-foreground tabular-nums">
                    ₹{formatINR(price)}
                  </span>
                  <span className="text-sm text-neutral-500">{period}</span>
                </div>

                <p className="mb-4 text-xs text-neutral-500">
                  Up to {plan.vehicles} vehicles · {plan.users} users
                </p>

                <ul className="mb-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2 text-sm">
                      {f.included ? (
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success-500" />
                      ) : (
                        <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-neutral-300" />
                      )}
                      <span className={f.included ? "text-neutral-700" : "text-neutral-400"}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href="/signup">Start Free Trial</a>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Enterprise */}
        <motion.div
          className="mt-8 rounded-xl border border-border bg-card p-6 text-center shadow-sm md:p-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <h3 className="font-heading text-lg font-bold text-foreground">Enterprise</h3>
          <p className="mt-1 text-sm text-neutral-500">
            For large fleets and 3PLs — unlimited vehicles & users
          </p>
          <p className="mt-1 text-xs text-neutral-400">
            White-label · API access · Webhooks · Dedicated account manager · Custom integrations · 99.9% uptime SLA
          </p>
          <Button variant="outline" size="lg" className="mt-4" asChild>
            <a href="#contact">Contact Sales</a>
          </Button>
        </motion.div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          All plans include: 14-day free trial · No credit card required · Cancel anytime · Data export always available
        </p>
      </div>
    </section>
  );
}
