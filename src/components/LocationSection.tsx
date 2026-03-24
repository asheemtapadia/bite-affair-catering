import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Instagram } from "lucide-react";

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

          <p className="font-body text-sm font-medium text-primary mb-6">
            Serving Gurugram & Delhi NCR
          </p>

          {/* ✅ CLEAN MAP */}
          <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-black/10 shadow-md mb-8">
            <iframe
              src="https://maps.google.com/maps?q=28.4395,77.0830&z=15&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>

          {/* Instagram */}
          <div className="text-center">
            <h3 className="font-heading text-xl font-semibold text-navy mb-3">
              See Real Catering Moments
            </h3>

            <p className="font-body text-sm text-foreground/70 mb-5">
              Follow us on Instagram for real party setups and food spreads.
            </p>

            <a
              href="https://www.instagram.com/bite_affair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-body font-medium hover:opacity-90 transition"
            >
              <Instagram size={18} />
              Follow @bite_affair
            </a>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
};

export default LocationSection;
