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

        <motion.p
          className="font-body text-xl md:text-2xl text-white max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          style={{ textShadow: "0 3px 14px rgba(0,0,0,0.85)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          For house parties, office lunches, and special events
          <br />
          Serving 15–100+ guests
          <br />
          Delivered across Delhi NCR
        </motion.p>

        {/* Premium Wide Buttons */}
        <motion.div
          className="mt-10 grid grid-cols-2 gap-5 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >

          <Button
            onClick={() => scrollTo("menu")}
            className="h-12 rounded-full bg-primary text-white text-sm shadow-md hover:scale-[1.02] transition"
          >
            Browse Menu
          </Button>

          <Button
            onClick={() => scrollTo("packages")}
            className="h-12 rounded-full border border-primary text-primary bg-white text-sm shadow-sm hover:bg-primary hover:text-white transition"
          >
            View Packages
          </Button>

          <Button
            onClick={() => scrollTo("packages")}
            className="h-12 rounded-full border border-primary text-primary bg-white text-sm shadow-sm hover:bg-primary hover:text-white transition"
          >
            Plan My Event
          </Button>

          <Button
            onClick={() => scrollTo("how-it-works")}
            className="h-12 rounded-full border border-primary text-primary bg-white text-sm shadow-sm hover:bg-primary hover:text-white transition"
          >
            How It Works
          </Button>

        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
