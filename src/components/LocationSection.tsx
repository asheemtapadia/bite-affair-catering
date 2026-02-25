import ScrollReveal from "@/components/ScrollReveal";
import { MapPin } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <ScrollReveal>
          <MapPin className="mx-auto mb-4 text-primary" size={36} strokeWidth={1.5} />
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-6">
            Our Location
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-body text-foreground/80 leading-relaxed mb-4">
            Basement-1, F-28, Saraswati Kunj II, Ardee City, Sector 52, Gurugram, Haryana 122003
          </p>
          <p className="font-body text-sm font-medium text-primary">
            Serving Gurugram & Delhi NCR
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationSection;
