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

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("scroll", onScroll);
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
<header
className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled || !isHome
    ? "bg-warm-white/95 backdrop-blur-sm shadow-sm"
    : "bg-gradient-to-b from-black/40 to-transparent"
}`}
>

<div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">

<div className="flex items-center gap-4">

<Link to="/" className="flex items-center transition-transform duration-300 hover:scale-105">
<img
src={logo}
alt="Bite Affair"
className={`h-24 w-auto object-contain transition-all duration-300 ${
scrolled || !isHome
? "lg:h-[180px]"
: "lg:h-[200px]"
}`}
 />
</Link>

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
className="hidden lg:flex relative items-center justify-center w-9 h-9 rounded-full bg-primary text-white shadow-md hover:scale-105 transition"
>
<ShoppingCart size={16} />

{cartCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
{cartCount}
</span>
)}
</Link>

</div>

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

<div className="flex items-center gap-2 lg:hidden">

<a
href="tel:+919211570030"
className="flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white shadow-md"
>
<Phone size={16} />
</a>

<a
href="https://wa.me/919211570030"
target="_blank"
className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 text-white shadow-md"
>
<MessageCircle size={16} />
</a>

<Link
to="/cart"
className="relative flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white shadow-md"
>
<ShoppingCart size={16} />

{cartCount > 0 && (
<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
{cartCount}
</span>
)}
</Link>

<button
className={`${scrolled || !isHome ? "text-navy" : "text-primary-foreground"}`}
onClick={() => setMobileOpen(!mobileOpen)}
aria-label="Toggle menu"
>
{mobileOpen ? <X size={26} /> : <Menu size={26} />}
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
