import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative py-28 lg:py-36 text-white overflow-hidden"
    >

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/about-bg.jpg')"
        }}
      />

      {/* DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />

      {/* RADIAL LIGHT (CENTER GLOW) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.25),transparent_60%)]" />

      {/* TOP LIGHT STREAK */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-orange-400/20 blur-3xl opacity-40" />

      {/* SIDE LIGHT BLOBS */}
      <div className="absolute left-[-100px] top-1/3 w-[300px] h-[300px] bg-orange-500/20 blur-3xl opacity-30" />
      <div className="absolute right-[-100px] bottom-1/4 w-[300px] h-[300px] bg-yellow-400/20 blur-3xl opacity-20" />

      {/* ULTRA LIGHT TEXTURE */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-6 max-w-3xl text-center">

        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 tracking-tight">
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

        {/* PREMIUM CTA LINE */}
        <ScrollReveal delay={0.45}>
          <p className="mt-10 text-sm tracking-widest text-orange-300 uppercase">
            No Middlemen • No Markups • Just Premium Food
          </p>
        </ScrollReveal>

      </div>

    </section>
  );
};

export default AboutSection;
