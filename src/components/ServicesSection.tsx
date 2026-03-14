import ScrollReveal from "@/components/ScrollReveal";
import {
  UtensilsCrossed,
  Home,
  ClipboardList,
  Users,
  MessageCircle,
  ChefHat,
} from "lucide-react";

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
    <section className="py-16 lg:py-24 section-beige">
      <div className="container mx-auto px-4 relative">

        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Our Services
            </h2>
          </div>
        </ScrollReveal>

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-[#f5efe6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-[#f5efe6] to-transparent z-10" />

        {/* Scroll Strip */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 snap-x snap-mandatory pb-4">

            {services.map((service, i) => (
              <ScrollReveal key={service.label} delay={0.08 * i}>
                <div className="snap-start min-w-[190px] md:min-w-[220px] group bg-card rounded-xl border border-border p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <service.icon
                    className="mx-auto mb-4 text-primary"
                    size={36}
                    strokeWidth={1.5}
                  />

                  <p className="font-body font-medium text-foreground text-sm leading-snug">
                    {service.label}
                  </p>

                </div>
              </ScrollReveal>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
