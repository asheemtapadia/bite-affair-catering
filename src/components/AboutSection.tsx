import ScrollReveal from "@/components/ScrollReveal";
import ParallaxSection from "@/components/ParallaxSection";

const AboutSection = () => {
  return (

    <ParallaxSection bgImage="/about-bg.jpg">

      <section
        id="about"
        className="relative min-h-[80vh] flex items-center py-24 lg:py-32 text-white"
      >

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
              quality — without the overhead of a full catering setup.
            </p>
          </ScrollReveal>

        </div>

      </section>

    </ParallaxSection>

  );
};

export default AboutSection;
