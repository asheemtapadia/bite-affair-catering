import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-catering.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with slow zoom */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bulk food delivery spread by Bite Affair"
          className="w-full h-full object-cover animate-hero-zoom"
        />
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Bulk Food Delivery — Reimagined.
        </motion.h1>

        <motion.p
          className="font-body text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-4 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Built for gatherings of 15–50 guests across Delhi NCR. 
          Restaurant-level variety. Catering-scale portions.
        </motion.p>

        <motion.p
          className="font-body text-sm text-primary-foreground/70 max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Powered by a dedicated production kitchen and trained teams. 
          Order directly via WhatsApp or Call — no aggregators, no middlemen.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button
            size="lg"
            onClick={() => scrollTo("menu")}
            className="text-base px-8 py-6 transition-transform duration-200 hover:scale-[1.02]"
          >
            Explore Menu
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("packages")}
            className="text-base px-8 py-6 border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 hover:text-primary-foreground transition-transform duration-200 hover:scale-[1.02]"
          >
            View Packages
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
