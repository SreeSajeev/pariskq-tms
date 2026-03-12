import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="bg-primary-900 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl text-primary-foreground md:text-4xl">
          Ready to bring your fleet into the 21st century?
        </h2>
        <p className="mt-4 text-base text-primary-foreground/70">
          Join transport companies across India who've ditched WhatsApp dispatch
          and paper PODs.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button variant="hero" size="xl" asChild>
            <a href="/signup">Start Free Trial</a>
          </Button>
          <Button variant="hero-outline" size="xl" asChild>
            <a href="#contact">Book a Demo</a>
          </Button>
        </div>
        <p className="mt-4 text-xs text-primary-foreground/50">
          14-day free trial · No credit card required
        </p>
      </div>
    </section>
  );
}
