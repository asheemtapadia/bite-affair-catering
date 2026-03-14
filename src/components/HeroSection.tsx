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

        {/* Short Buttons in White Background */}
        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white/95 rounded-2xl px-3 py-3 grid grid-cols-2 gap-2 max-w-xs w-full shadow-md">

            <Button
              onClick={() => scrollTo("menu")}
              className="text-sm h-9 rounded-full"
            >
              Browse Menu
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("packages")}
              className="text-sm h-9 rounded-full"
            >
              View Packages
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("packages")}
              className="text-sm h-9 rounded-full"
            >
              Plan My Event
            </Button>

            <Button
              variant="outline"
              onClick={() => scrollTo("how-it-works")}
              className="text-sm h-9 rounded-full"
            >
              How It Works
            </Button>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
