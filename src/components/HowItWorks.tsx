import ScrollReveal from "@/components/ScrollReveal";
import { Package, Users, MessageCircle, Truck } from "lucide-react";

const steps = [
  {
    icon: Package,
    number: "01",
    title: "Browse Menu or Packages",
    description: "Explore veg and non-veg catering packages designed for house parties and office gatherings."
  },
  {
    icon: Users,
    number: "02",
    title: "Add to Cart or Select Package",
    description: "Choose your preferred menu or package and customise it based on your guest count."
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Confirm on WhatsApp",
    description: "Share event details and confirm availability directly with our team."
  },
  {
    icon: Truck,
    number: "04",
    title: "Prepared & Delivered",
    description: "Our chefs prepare fresh food and our team delivers it to your event location on time."
  },
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
              Order catering in four simple steps.
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
