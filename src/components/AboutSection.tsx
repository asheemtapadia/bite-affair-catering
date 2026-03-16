import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        backgroundImage: "url('/images/about-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >

      {/* BRAND OVERLAY */}
      <div className="absolute inset-0 bg-navy/80"></div>

      {/* TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/images/grain.png')]"></div>

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center text-white">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About Bite Affair
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="font-body text-lg leading-relaxed text-white/90 mb-4">
            Food aggregators cap out at 4–5 people. Traditional caterers start at 100+. For gatherings of 15–50 pax, neither works well — portions are inconsistent, pricing is opaque, and quality is unpredictable.
          </p>

          <p className="font-body text-lg leading-relaxed text-white/90">
            Bite Affair fills that gap. We deliver bulk party food across Gurugram and Delhi NCR with curated menus, generous portions and consistent quality — without the overhead of a full catering setup. Order directly. No middleman. No app markup.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AboutSection;
