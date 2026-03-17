import { useEffect, useState } from "react";

interface Props {
  bgImage: string;
  children: React.ReactNode;
  speed?: number;
}

const ParallaxSection = ({ bgImage, children, speed = 0.15 }: Props) => {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.scrollY * speed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <section className="relative overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: `translate3d(0, ${offset}px, 0)`
        }}
      />

      {/* DARK OVERLAY (NO BLUR) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </section>
  );
};

export default ParallaxSection;
