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
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">

      <Header />

      <HeroSection />

      {/* ✅ LiteBox just below hero */}
      <div className="bg-[#faf7f2] py-10 px-4">
        <LiteMealBanner />
      </div>

      <MenuCards />

      <AboutSection />

      <RealPartyMoments />

      <ServicesSection />

      <PackagesSection />

      <HowItWorks />

      <WhyChooseUs />

      <Testimonials />

      <HowOrderingWorks />

      <CTASection />

      <LocationSection />

      <FAQSection />

      <Footer />

      <FloatingWhatsApp />

    </div>
  );
};

export default Index;
