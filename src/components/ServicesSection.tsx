import ScrollReveal from "@/components/ScrollReveal";
import { UtensilsCrossed, Home, Building2, PartyPopper, ClipboardList, Users } from "lucide-react";

const services = [
  { icon: UtensilsCrossed, label: "Bulk Party Catering" },
  { icon: Home, label: "House Party Catering" },
  { icon: Building2, label: "Corporate Catering" },
  { icon: PartyPopper, label: "Festive Catering" },
  { icon: ClipboardList, label: "Custom Menu Planning" },
  { icon: Users, label: "On-Site Servers Available" },
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
