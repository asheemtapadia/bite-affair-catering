import { useEffect, useState } from "react";

interface Props {
  bgImage: string;
  children: React.ReactNode;
  speed?: number;
}

const ParallaxSection = ({ bgImage, children, speed = 0.1 }: Props) => {

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

      {/* STRONG GRADIENT OVERLAY (FIXED VISIBILITY) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

      {/* CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </section>
  );
};

export default ParallaxSection;
