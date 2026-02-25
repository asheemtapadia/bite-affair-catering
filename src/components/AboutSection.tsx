import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
            About Bite Affair
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-body text-lg leading-relaxed text-foreground/80">
            Bite Affair specializes in bulk party catering across Gurugram and Delhi NCR. From intimate home gatherings to large corporate celebrations, we deliver curated menus with quality ingredients, generous portions and seamless service.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
