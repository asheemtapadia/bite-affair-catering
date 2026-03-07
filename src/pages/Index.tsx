import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
import EventInquiry from "@/components/EventInquiry";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
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
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
