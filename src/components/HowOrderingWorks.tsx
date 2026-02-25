import ScrollReveal from "@/components/ScrollReveal";

const steps = [
  { number: "1", text: "Choose your package." },
  { number: "2", text: "Select guest count." },
  { number: "3", text: "Contact us via WhatsApp or Call." },
  { number: "4", text: "We confirm details and handle the rest." },
];

const HowOrderingWorks = () => {
  return (
    <section className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              How Ordering Works
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={0.08 * i}>
              <div className="flex items-start gap-4 bg-card border border-border rounded-lg p-5 shadow-sm">
                <span className="font-heading text-2xl font-bold text-primary leading-none">
                  {step.number}
                </span>
                <p className="font-body text-foreground text-sm">{step.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.35}>
          <p className="text-center font-body text-sm text-muted-foreground mt-10">
            Available only in Delhi NCR. Server available on request. Starting ₹499 per person.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HowOrderingWorks;
