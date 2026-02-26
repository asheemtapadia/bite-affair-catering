import ScrollReveal from "@/components/ScrollReveal";
import { UtensilsCrossed, Home, ClipboardList, Users, MessageCircle, ChefHat } from "lucide-react";

const services = [
  { icon: Users, label: "Dedicated Teams per Order" },
  { icon: Home, label: "In-House Kitchen Operations" },
  { icon: ChefHat, label: "Trained Professional Chefs" },
  { icon: MessageCircle, label: "Direct Ordering — WhatsApp & Call" },
  { icon: UtensilsCrossed, label: "Optional On-Site Servers" },
  { icon: ClipboardList, label: "Premium Eco-Friendly Packaging" },
];

const ServicesSection = () => {
  return (
    <section className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Our Services
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <ScrollReveal key={service.label} delay={0.08 * i}>
              <div className="group bg-card rounded-lg border border-border p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <service.icon className="mx-auto mb-4 text-primary" size={32} strokeWidth={1.5} />
                <p className="font-body font-medium text-foreground text-sm">
                  {service.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
