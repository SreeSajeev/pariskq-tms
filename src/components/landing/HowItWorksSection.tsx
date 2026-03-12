import { motion } from "framer-motion";
import { ClipboardList, Truck, MapPin, CreditCard } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Book the Shipment",
    body: "Operations creates a shipment, enters pickup and delivery details, selects the customer, and uploads any documents.",
  },
  {
    icon: Truck,
    title: "Dispatch the Driver",
    body: "Assign a vehicle and driver in one click. Driver gets notified by SMS with pickup details and a map link.",
  },
  {
    icon: MapPin,
    title: "Track in Real Time",
    body: "Watch your fleet on a live map. Get alerts if a delivery is running late. Share a tracking link with the customer.",
  },
  {
    icon: CreditCard,
    title: "Invoice Automatically",
    body: "When the driver submits proof of delivery, the invoice is calculated and ready to send. Payments tracked. Disputes handled.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h2
          className="mb-14 text-center text-3xl font-bold text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
        >
          From booking to billing in <span className="text-primary">4 steps</span>
        </motion.h2>

        <div className="relative grid gap-8 md:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-border md:block" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative text-center"
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
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-card shadow-sm">
                <span
                  className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#5C2D6D" }}
                >
                  {i + 1}
                </span>
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
