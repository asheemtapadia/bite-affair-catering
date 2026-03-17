import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 text-white overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/about-bg.jpg')"
        }}
      />

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

      {/* LIGHT TEXTURE (VERY LIGHT → NO LAG) */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* GLOW EFFECT */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-3xl opacity-30"></div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-6 max-w-3xl text-center">

        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            About Bite Affair
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6">
            Food apps work for small orders. Traditional caterers require large events.
            But for gatherings of 15–50 people, neither delivers consistency,
            clarity, or quality.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="text-lg text-white/80 leading-relaxed">
            Bite Affair bridges that gap — delivering curated bulk food
            with transparent pricing, generous portions, and consistent quality.
          </p>
        </ScrollReveal>

      </div>

    </section>
  );
};

export default AboutSection;
