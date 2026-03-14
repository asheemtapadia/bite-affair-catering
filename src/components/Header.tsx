import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/bite-affair-logo.png";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "Packages", href: "/#packages" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "About", href: "/#about" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {

    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">

      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">

          {/* BURGER LEFT */}
          <button
            className="lg:hidden text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* LOGO BIGGER */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Bite Affair"
              className="h-24 lg:h-[160px] w-auto object-contain"
            />
          </Link>

        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-10">

          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-body font-medium tracking-wide transition-colors duration-200 hover:text-primary text-foreground"
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

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">

          <a
            href="tel:+919211570030"
            className="hidden lg:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border border-border hover:bg-muted transition"
          >
            <Phone size={16} />
            Call
          </a>

          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="hidden lg:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md"
          >
            <ShoppingCart size={18} />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

      </div>

      {/* MOBILE MENU */}
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
