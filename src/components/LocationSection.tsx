import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, Instagram, Navigation } from "lucide-react";

const LocationSection = () => {
  return (
    <section className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4 text-center max-w-2xl">

        {/* Heading */}
        <ScrollReveal>
          <MapPin className="mx-auto mb-4 text-primary" size={36} />
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Our Location
          </h2>
        </ScrollReveal>

        {/* Address */}
        <ScrollReveal delay={0.1}>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Basement-1, F-28, Saraswati Kunj II, Ardee City, Sector 52, Gurugram, Haryana 122003
          </p>

          <p className="text-sm font-medium text-primary mb-8">
            Serving Gurugram & Delhi NCR
          </p>
        </ScrollReveal>

        {/* 🔥 MAP SECTION (SCREENSHOT METHOD — FINAL) */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-10">

          {/* Map Image */}
          <a
            href="https://www.google.com/maps?q=28.4371197,77.077991"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/map.png"
              alt="Bite Affairs Location"
              className="w-full h-[240px] md:h-[320px] object-cover"
            />
          </a>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {/* Floating Button */}
          <a
            href="https://www.google.com/maps?q=28.4371197,77.077991"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 
                       bg-white/95 backdrop-blur-md px-5 py-2.5 
                       rounded-full shadow-lg text-sm font-medium 
                       flex items-center gap-2 hover:scale-105 transition"
          >
            <Navigation size={16} />
            Open in Maps
          </a>

        </div>

        {/* Instagram */}
        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-navy mb-3">
              See Real Catering Moments
            </h3>

            <p className="text-sm text-foreground/70 mb-5">
              Follow us on Instagram for real party setups and food spreads.
            </p>

            <a
              href="https://www.instagram.com/bite_affair"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
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
