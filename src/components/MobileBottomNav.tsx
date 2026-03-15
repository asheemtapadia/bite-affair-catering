import { Home, UtensilsCrossed, ClipboardList, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";

const MobileBottomNav = () => {

  const location = useLocation();

  if (location.pathname === "/packages") return null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">

      <div className="flex items-center justify-around h-16">

        <button
          onClick={() => scrollTo("home")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <Home size={20} />
          Home
        </button>

        <button
          onClick={() => scrollTo("menu")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <UtensilsCrossed size={20} />
          Menu
        </button>

        <button
          onClick={() => scrollTo("packages")}
          className="flex flex-col items-center text-xs text-primary"
        >
          <ClipboardList size={22} />
          Plan
        </button>

        <a
          href="tel:+919211570030"
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <Phone size={20} />
          Call
        </a>

      </div>

    </div>
  );
};

export default MobileBottomNav;
