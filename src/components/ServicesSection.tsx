import { useEffect, useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrame: number;
    let speed = 0.35;

    const scroll = () => {
      el.scrollLeft += speed;

      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const duplicated = [...services, ...services];

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

        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#f5efe6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#f5efe6] to-transparent z-10" />

        {/* scroll strip */}
        <div
          ref={scrollRef}
          className="overflow-x-scroll scrollbar-hide flex gap-6 py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {duplicated.map((service, i) => (
            <ScrollReveal key={i} delay={0.05 * i}>
              <div className="min-w-[190px] md:min-w-[210px] group bg-card rounded-xl border border-border p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <service.icon
                  className="mx-auto mb-4 text-primary"
                  size={38}
                  strokeWidth={1.6}
                />

                <p className="font-body font-medium text-foreground text-sm leading-snug">
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
