import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LiteMealBanner from "@/components/LiteMealBanner";
import MenuCards from "@/components/MenuCards";
import AboutSection from "@/components/AboutSection";
import RealPartyMoments from "@/components/RealPartyMoments";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import HowOrderingWorks from "@/components/HowOrderingWorks";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">

      <Header />

      <HeroSection />

      <MenuCards />

      <div className="bg-[#faf7f2] py-10 px-4">
        <LiteMealBanner />
      </div>

      <AboutSection />

      <RealPartyMoments />

      <ServicesSection />

      <PackagesSection />

      <HowItWorks />

      <WhyChooseUs />

      <Testimonials />

      <HowOrderingWorks />

      <CTASection />

      {/* 🔥 PREMIUM MAP SECTION (ONLY ONE) */}
      <div className="mt-16">
        <div className="relative w-full h-[320px] overflow-hidden">

          <img
            src="/images/home/map-bg.jpg"
            alt="location"
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />

          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 max-w-6xl mx-auto px-5 h-full flex flex-col justify-center">

            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Our Location
            </h2>

            <p className="text-sm text-white/70 mb-6 max-w-md">
              BASEMENT-1, F-28, Sarswati Kunj II, Ardee City, Sector 52, Gurugram, Haryana 122003
            </p>

            <div className="w-full max-w-xl h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src="https://maps.google.com/maps?q=BASEMENT-1,%20F-28,%20Sarswati%20Kunj%20II,%20Ardee%20City,%20Sector%2052,%20Gurugram,%20Haryana%20122003&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
            </div>

            <a
              href="https://www.google.com/maps?q=BASEMENT-1,+F-28,+Sarswati+Kunj+II,+Ardee+City,+Sector+52,+Gurugram,+Haryana+122003"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-sm text-orange-400"
            >
              Open in Google Maps →
            </a>

          </div>
        </div>
      </div>

      <FAQSection />

      <Footer />

      <FloatingWhatsApp />

      <AIChatbot />

    </div>
  );
};

export default Index;
