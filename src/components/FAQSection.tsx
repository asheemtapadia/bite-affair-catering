import ScrollReveal from "@/components/ScrollReveal";

const faqs = [
  {
    q: "What is the minimum catering order?",
    a: "Bite Affair currently accepts catering orders for 15–50 guests."
  },
  {
    q: "Which areas do you serve?",
    a: "We currently serve Gurugram and major parts of Delhi NCR."
  },
  {
    q: "How far in advance should I place an order?",
    a: "We recommend placing your catering order at least 24–48 hours in advance to ensure availability."
  },
  {
    q: "Do you offer vegetarian and non-vegetarian packages?",
    a: "Yes. Bite Affair offers both veg and non-veg catering packages designed for gatherings and house parties."
  },
  {
    q: "How can I place a catering order?",
    a: "Orders can be placed directly through WhatsApp or by calling us from the website."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4 max-w-3xl">

        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center mb-12">
            Frequently Asked Questions
          </h2>
        </ScrollReveal>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <ScrollReveal key={faq.q} delay={i * 0.05}>
              <div className="border border-border rounded-lg p-6 bg-background">
                <h3 className="font-heading text-lg font-semibold text-navy mb-2">
                  {faq.q}
                </h3>
                <p className="font-body text-foreground/80">
                  {faq.a}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
