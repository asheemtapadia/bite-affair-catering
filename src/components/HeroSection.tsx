import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-catering.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 md:pt-32 lg:pt-36"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImage}
          alt="Bulk food delivery spread by Bite Affair"
          className="w-full h-full object-cover animate-hero-zoom"
          loading="eager"
          decoding="async"
        />

        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/55 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">

        <motion.h1
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bulk Food Delivery — Reimagined.
        </motion.h1>

        {/* Improved Visibility Text */}
        <motion.p
          className="font-body text-xl md:text-2xl text-white max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          style={{ textShadow: "0 3px 14px rgba(0,0,0,0.85)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          For house parties, office lunches, and special events
          <br />
          Serving 15–100+ guests, Delivered across Delhi NCR
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={() => scrollTo("menu")}
            className="text-base px-8 py-6 transition-transform duration-200 hover:scale-[1.02]"
          >
            Browse Menu
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("packages")}
            className="text-base px-8 py-6 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white transition-transform duration-200 hover:scale-[1.02]"
          >
            Plan My Event
          </Button>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
