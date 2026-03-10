import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/bite-affair-logo.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Packages", href: "/#packages" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (isHome) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-warm-white/95 backdrop-blur-sm shadow-sm"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4 lg:px-8">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <img
              src={logo}
              alt="Bite Affair"
              className={`h-20 w-auto object-contain transition-all duration-300 ${
                scrolled || !isHome
                  ? "lg:h-[160px] drop-shadow-[0_6px_15px_rgba(0,0,0,0.25)]"
                  : "lg:h-[184px] drop-shadow-[0_0_25px_rgba(255,255,255,0.7)] drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
              }`}
            />
          </Link>

          {/* Desktop Call */}
          <a
            href="tel:+919211570030"
            className="hidden lg:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg border border-border hover:bg-muted transition"
          >
            <Phone size={16} />
            Call
          </a>

          {/* Desktop WhatsApp */}
          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="hidden lg:flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-body font-medium tracking-wide transition-colors duration-200 hover:text-primary ${
                scrolled || !isHome ? "text-foreground" : "text-primary-foreground/90"
              }`}
            >
              {link.label}
            </button>
          ))}

          <Button
            size="sm"
            onClick={() => handleNavClick("/#contact")}
            className="transition-transform duration-200 hover:scale-[1.02]"
          >
            Plan Your Event
          </Button>
        </nav>

        {/* MOBILE RIGHT */}
        <div className="flex items-center gap-3 lg:hidden">

          <a
            href="tel:+919211570030"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white shadow-md"
          >
            <Phone size={18} />
          </a>

          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow-md"
          >
            <MessageCircle size={18} />
          </a>

          <button
            className={`${scrolled || !isHome ? "text-navy" : "text-primary-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 pb-6 pt-2">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="block w-full text-left py-3 text-foreground font-body font-medium border-b border-border/50 last:border-0"
            >
              {link.label}
            </button>
          ))}

          <Button
            className="mt-4 w-full transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => handleNavClick("/#contact")}
          >
            Plan Your Event
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
