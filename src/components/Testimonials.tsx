import ScrollReveal from "@/components/ScrollReveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Nidhi Kujur",
    text: "Bite Affair catered our house party and the food was outstanding. The paneer tikka and dal makhani were absolute hits with our guests.",
  },
  {
    name: "Shalini Prince Bhagat",
    text: "We ordered for a birthday celebration. Generous portions, fresh ingredients, and the delivery was right on time. Highly recommend!",
  },
  {
    name: "Manmohan Arora",
    text: "Excellent corporate event catering. Professional service and the menu variety impressed everyone at the office.",
  },
  {
    name: "Rama Singh",
    text: "The non-veg starters were incredible. Our guests couldn't stop raving about the chicken tikka and seekh kababs.",
  },
  {
    name: "Riya Kapoor",
    text: "Perfect for our baby shower! The team was responsive, the food was delicious, and the servers were very professional.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              What Our Clients Say
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={0.08 * i}>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm h-full">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <p className="font-heading font-semibold text-navy text-sm">
                  {t.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
