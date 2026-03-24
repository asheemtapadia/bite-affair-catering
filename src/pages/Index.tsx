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

      <FAQSection />

      <Footer />

      <FloatingWhatsApp />

      <AIChatbot />

    </div>
  );
};

export default Index;
