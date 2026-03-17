import { Phone, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/about-bg.jpg')" // change if needed
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* TEXTURE (LIKE DAWAT) */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* CONTENT */}
      <div className="relative container mx-auto px-6 py-20 text-center">

        {/* BRAND */}
        <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-wide mb-6">
          Bite Affair
        </h2>

        {/* TAGLINE */}
        <p className="text-white/70 max-w-xl mx-auto leading-relaxed mb-8">
          Premium catering for 15–50 guests. Curated menus, consistent quality,
          and seamless ordering experience.
        </p>

        {/* CONTACT */}
        <div className="space-y-3 mb-10">

          <a
            href="tel:+919211570030"
            className="block text-orange-400 text-lg font-medium hover:text-orange-300 transition"
          >
            +91 9211570030
          </a>

          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>

        </div>

        {/* DIVIDER */}
        <div className="w-16 h-[2px] bg-orange-500 mx-auto mb-8"></div>

        {/* LINKS */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60 mb-8">
          <a href="/#home" className="hover:text-white transition">Home</a>
          <a href="/#menu" className="hover:text-white transition">Menu</a>
          <a href="/#packages" className="hover:text-white transition">Packages</a>
          <a href="/#contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* COPYRIGHT */}
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} Bite Affair. All rights reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;
