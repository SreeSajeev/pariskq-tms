import { motion } from "framer-motion";
import { Smartphone, FileText, BarChart3 } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    title: "Dispatch via WhatsApp",
    body: "Drivers miss jobs. Updates get lost in group chats. No record of what was agreed.",
  },
  {
    icon: FileText,
    title: "Paper Waybills and PODs",
    body: "Lost documents mean billing disputes. Customers wait days for proof of delivery.",
  },
  {
    icon: BarChart3,
    title: "Excel Billing Reconciliation",
    body: "Manual invoicing takes hours. Errors cost you money. No visibility into what's outstanding.",
  },
];

const stagger = {
  whileInView: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { type: "spring" as const, stiffness: 400, damping: 30 },
};

export function ProblemSection() {
  return (
    <section className="bg-background py-20 md:py-28" id="about">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-14 max-w-2xl"
          {...fadeUp}
        >
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            Your operation is running on WhatsApp and Excel.
            <br />
            <span className="text-primary-500">There's a better way.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={stagger}
        >
          {problems.map((p) => (
            <motion.div
              key={p.title}
              variants={{
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="group relative overflow-hidden rounded-lg border border-danger-100 bg-danger-50/40 p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-danger-100">
                <p.icon className="h-5 w-5 text-danger-500" />
              </div>
              <h3 className="mb-2 font-heading text-base font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                {p.body}
              </p>
              {/* Strikethrough overlay suggestion */}
              <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-danger-100 flex items-center justify-center opacity-60">
                <span className="text-danger-500 text-lg font-bold">✕</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
