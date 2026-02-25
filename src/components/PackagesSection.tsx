import ScrollReveal from "@/components/ScrollReveal";

const highlights = [
  { label: "Starting at", value: "₹499/person" },
  { label: "Base quantity", value: "20 pax" },
  { label: "Packages", value: "8 options" },
  { label: "Cuisine", value: "Veg & Non Veg" },
];

const PackagesSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages" className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Flexible Packages
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              From standard to premium, veg to non-veg. Choose the package that fits your occasion and guest count.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
          {highlights.map((h, i) => (
            <ScrollReveal key={h.label} delay={0.08 * i}>
              <div className="text-center">
                <p className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">
                  {h.value}
                </p>
                <p className="font-body text-sm text-muted-foreground">{h.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="bg-card border border-border rounded-lg p-6 md:p-8 max-w-2xl mx-auto shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-navy mb-4">What's Included</h3>
            <ul className="space-y-2 font-body text-sm text-foreground/80">
              <li>● Complimentary snacks plates, dips, mint chutney, mouth freshener, tooth picks & napkins</li>
              <li>● Quantities based on 20 pax – adjustable per final confirmation</li>
              <li>● Server support available at ₹1,500 per server</li>
              <li>● Server + dishes at ₹1,500 + ₹750 extra</li>
              <li>● Transport cost applicable separately</li>
            </ul>
            <button
              onClick={() => scrollTo("menu")}
              className="mt-6 font-body text-sm font-medium text-primary hover:underline"
            >
              Browse All Packages →
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PackagesSection;
