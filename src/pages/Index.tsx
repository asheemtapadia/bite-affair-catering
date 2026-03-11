import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RealPartyMoments from "@/components/RealPartyMoments";
import MenuCards from "@/components/MenuCards";
import FoodGallery from "@/components/FoodGallery";
import AboutSection from "@/components/AboutSection";
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
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <RealPartyMoments />
      <MenuCards />
      <FoodGallery />
      <AboutSection />
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
      <AIChatbot />
    </div>
  );
};

export default Index;
