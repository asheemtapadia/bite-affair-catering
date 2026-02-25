import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy-foreground mb-6">
            Plan Your Celebration With Us
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-body text-navy-foreground/70 text-lg mb-10">
            +91 92115 70030
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="text-base px-8 py-6 transition-transform duration-200 hover:scale-[1.02]"
            >
              <a href="tel:+919211570030">
                <Phone size={18} className="mr-2" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-base px-8 py-6 border-navy-foreground/30 text-navy-foreground bg-transparent hover:bg-navy-foreground/10 hover:text-navy-foreground transition-transform duration-200 hover:scale-[1.02]"
            >
              <a href="https://wa.me/919211570030" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} className="mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="font-body text-sm text-navy-foreground/50 mt-8">
            Tag us in your party reel and get instant cashback.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTASection;
