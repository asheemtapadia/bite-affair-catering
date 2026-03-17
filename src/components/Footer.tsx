import { Phone, MessageCircle, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/about-bg.jpg')"
        }}
      />

      {/* ORANGE + DARK OVERLAY (MAIN MAGIC) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-[#1a0d05]/90 to-black/90" />

      {/* ORANGE GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,120,0,0.25),transparent_60%)]" />

      {/* SIDE ORANGE LIGHT */}
      <div className="absolute left-[-100px] bottom-0 w-[300px] h-[300px] bg-orange-500/20 blur-3xl opacity-30"></div>
      <div className="absolute right-[-100px] top-0 w-[300px] h-[300px] bg-orange-400/20 blur-3xl opacity-20"></div>

      {/* ORANGE TEXTURE */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-6 py-20 text-center">

        {/* BRAND */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Bite Affair
        </h2>

        {/* TAGLINE */}
        <p className="text-white/70 max-w-md mx-auto text-sm leading-relaxed mb-10">
          Premium catering for 15–50 guests. Curated menus, consistent quality,
          and seamless ordering experience.
        </p>

        {/* CONTACT */}
        <div className="flex flex-col items-center gap-4 mb-10">

          <a
            href="tel:+919211570030"
            className="flex items-center gap-2 text-orange-400 text-lg font-medium hover:text-orange-300 transition"
          >
            <Phone size={18} />
            +91 9211570030
          </a>

          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>

          <a
            href="https://instagram.com/yourhandle"
            target="_blank"
            className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition"
          >
            <Instagram size={18} />
            Follow on Instagram
          </a>

        </div>

        {/* DIVIDER */}
        <div className="w-16 h-[2px] bg-orange-500 mx-auto mb-6"></div>

        {/* COPYRIGHT */}
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Bite Affair. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;
