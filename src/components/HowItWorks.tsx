import ScrollReveal from "@/components/ScrollReveal";
import { Package, Users, MessageCircle, Truck } from "lucide-react";

const steps = [
  { icon: Package, number: "01", title: "Choose Your Package", description: "Browse our veg and non-veg options starting at ₹499 per person." },
  { icon: Users, number: "02", title: "Confirm Guest Count", description: "Let us know your final headcount so we can scale portions perfectly." },
  { icon: MessageCircle, number: "03", title: "Direct WhatsApp / Call Confirmation", description: "Reach us directly — no app, no cart, no checkout." },
  { icon: Truck, number: "04", title: "Dedicated Team Prepares & Delivers", description: "Our trained team handles preparation, packaging and on-time delivery." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              How It Works
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              Four simple steps from selection to delivery.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={0.08 * i}>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <span className="font-heading text-4xl font-bold text-primary/20 block mb-3">
                  {step.number}
                </span>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-base font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
