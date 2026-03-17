import ScrollReveal from "@/components/ScrollReveal";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-white py-24 lg:py-32"
    >

      <div className="container mx-auto px-6 max-w-6xl">

        {/* TOP HEADING */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About Bite Affair
            </h2>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Designed for gatherings where quality matters, but traditional catering doesn’t fit.
            </p>
          </div>
        </ScrollReveal>

        {/* STORY GRID */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT TEXT */}
          <div className="space-y-8">

            <ScrollReveal>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  The Problem
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Food apps work for small orders. Traditional caterers require large events.
                  But for 15–50 people, neither delivers consistency, clarity, or quality.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  The Gap
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Customers are left juggling unreliable portions, unclear pricing,
                  and unpredictable food experiences.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Our Solution
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Bite Affair delivers curated bulk food packages designed specifically
                  for medium-sized gatherings — with transparent pricing, generous portions,
                  and consistent quality.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* RIGHT VISUAL */}
          <ScrollReveal delay={0.2}>
            <div className="relative">

              <img
                src="/about-bg.jpg"
                alt="Catering"
                className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
              />

              {/* FLOATING CARD */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-lg max-w-[220px]">
                <p className="text-sm text-gray-600">
                  Perfect for
                </p>
                <p className="font-semibold text-gray-900 text-lg">
                  15–50 Guests
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>

        {/* BOTTOM STATEMENT */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-20 max-w-3xl mx-auto">
            <p className="text-xl text-gray-800 leading-relaxed">
              No middlemen. No hidden markups. Just premium food, delivered right.
            </p>
          </div>
        </ScrollReveal>

      </div>

    </section>
  );
};

export default AboutSection;
