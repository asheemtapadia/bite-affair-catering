import { useEffect, useState, ReactNode } from "react";

interface ParallaxSectionProps {
  bgImage: string;
  children: ReactNode;
  speed?: number;
}

const ParallaxSection = ({ bgImage, children, speed = 0.3 }: ParallaxSectionProps) => {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <section className="relative overflow-hidden">

      {/* PARALLAX BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: `translateY(${offset}px)`
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </section>
  );
};

export default ParallaxSection;
