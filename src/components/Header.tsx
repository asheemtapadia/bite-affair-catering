import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ShoppingCart } from "lucide-react";
import logo from "@/assets/bite-affair-logo.png";

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

      {/* HEADER BAR */}
      <div className="container mx-auto flex items-center py-4 px-4">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* BURGER */}
          <button
            className="lg:hidden text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Bite Affair"
              className="h-14 w-auto object-contain"
            />
          </Link>

        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-3 ml-auto">

          <a
            href="tel:+919211570030"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white shadow-md"
          >
            <Phone size={18}/>
          </a>

          <a
            href="https://wa.me/919211570030"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white shadow-md"
          >
            <MessageCircle size={18}/>
          </a>

          <Link
            to="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-md"
          >
            <ShoppingCart size={18}/>

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
        <div className="lg:hidden bg-white border-t px-4 pb-6 pt-2">

          <button
            onClick={() => handleNavClick("/#menu")}
            className="block w-full text-left py-3 border-b"
          >
            Menu
          </button>

          <button
            onClick={() => handleNavClick("/#packages")}
            className="block w-full text-left py-3 border-b"
          >
            Packages
          </button>

          <button
            onClick={() => handleNavClick("/#how-it-works")}
            className="block w-full text-left py-3 border-b"
          >
            How it Works
          </button>

          <button
            onClick={() => handleNavClick("/#contact")}
            className="block w-full text-left py-3"
          >
            Contact
          </button>

        </div>
      )}

    </header>
  );
};

export default Header;
