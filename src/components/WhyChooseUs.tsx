import ScrollReveal from "@/components/ScrollReveal";
import { ShieldCheck, Settings, Leaf, Clock, Users, ChefHat } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, label: "Premium quality ingredients" },
  { icon: Settings, label: "Flexible package options" },
  { icon: Leaf, label: "Veg & Non Veg selections" },
  { icon: Clock, label: "On-time delivery" },
  { icon: Users, label: "Server support available" },
  { icon: ChefHat, label: "Customizable menus" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Why Choose Us
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.label} delay={0.08 * i}>
              <div className="flex items-start gap-3">
                <r.icon className="text-primary flex-shrink-0 mt-0.5" size={24} strokeWidth={1.5} />
                <p className="font-body font-medium text-foreground text-sm">{r.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
