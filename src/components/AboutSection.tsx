import ScrollReveal from "@/components/ScrollReveal";
import ParallaxSection from "@/components/ParallaxSection";

const AboutSection = () => {
  return (

    <ParallaxSection bgImage="/about-bg.jpg">

      <section
        id="about"
        className="relative min-h-[80vh] flex items-center py-24 lg:py-32 text-white"
      >

        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-[1px]"></div>

        {/* Premium grain texture */}
        <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        {/* Floating light particles */}
        <div className="absolute inset-0 pointer-events-none">
          <span className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse top-10 left-10"></span>
          <span className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse top-1/3 left-1/4"></span>
          <span className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse bottom-10 right-10"></span>
          <span className="absolute w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse bottom-1/3 left-1/2"></span>
          <span className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse top-1/2 right-1/4"></span>
        </div>

        <div className="relative container mx-auto px-4 max-w-3xl text-center">

          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About Bite Affair
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="font-body text-lg leading-relaxed text-white/90 mb-4">
              Food aggregators cap out at 4–5 people. Traditional caterers start at 100+. 
              For gatherings of 15–50 pax, neither works well — portions are inconsistent, 
              pricing is opaque, and quality is unpredictable.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="font-body text-lg leading-relaxed text-white/90">
              Bite Affair fills that gap. We deliver bulk party food across Gurugram 
              and Delhi NCR with curated menus, generous portions and consistent 
              quality — without the overhead of a full catering setup. Order directly. 
              No middleman. No app markup.
            </p>
          </ScrollReveal>

        </div>

      </section>

    </ParallaxSection>

  );
};

export default AboutSection;
