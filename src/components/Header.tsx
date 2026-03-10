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

        {/* Left Section: Logo + Call + WhatsApp */}
        <div className="flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
            <img
              src={logo}
              alt="Bite Affair"
              className="h-20 lg:h-24 xl:h-28 w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
            />
          </Link>

          {/* Call Button */}
          <a
            href="tel:+919999999999"
            className="hidden sm:flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            <Phone size={16} />
            Call
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
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

        {/* Mobile Right */}
        <div className="flex items-center gap-3 lg:hidden">

          {/* Call */}
          <a href="tel:+919999999999" className="text-foreground">
            <Phone size={20} />
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/919999999999" target="_blank" className="text-green-500">
            <MessageCircle size={20} />
          </a>

          {/* Burger */}
          <button
            className={`${scrolled || !isHome ? "text-navy" : "text-primary-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Nav */}
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
