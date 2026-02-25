import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MenuCards from "@/components/MenuCards";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <MenuCards />
      <AboutSection />
      <ServicesSection />
      <PackagesSection />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
      <LocationSection />
      <Footer />
    </div>
  );
};

export default Index;
