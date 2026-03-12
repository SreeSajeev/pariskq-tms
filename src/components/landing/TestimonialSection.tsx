import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "We went from WhatsApp chaos to complete visibility in one week. Our dispatcher now handles 40% more shipments.",
    name: "Ravi Kumar",
    title: "MD, Kumar Logistics, Mumbai",
    initials: "RK",
  },
  {
    quote:
      "The automated invoicing alone saves us 3 hours every billing cycle. No more Excel mistakes.",
    name: "Priya Shah",
    title: "Finance Head, ShreeJi Transport, Surat",
    initials: "PS",
  },
  {
    quote:
      "Our clients love the tracking link. We went from 20 'where's my shipment' calls a day to almost zero.",
    name: "Amit Patel",
    title: "Operations Manager, FastFreight India",
    initials: "AP",
  },
];

export function TestimonialSection() {
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
          Built for how Indian transport <span className="text-primary">actually works</span>
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              className="rounded-lg bg-muted p-6"
              style={{ borderLeft: "4px solid #5C2D6D" }}
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
              <p className="mb-4 text-sm leading-relaxed text-foreground italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: "#5C2D6D" }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.title}</div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
