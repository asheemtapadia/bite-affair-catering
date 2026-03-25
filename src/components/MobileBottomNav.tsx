import { Home, UtensilsCrossed, ClipboardList, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const MobileBottomNav = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // Hide bottom nav on Packages page
  if (location.pathname.includes("packages")) return null;

  const goToSection = (section: string) => {

    // अगर already home page पे हैं → scroll
    if (location.pathname === "/") {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // पहले home जाओ फिर scroll
      navigate("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }

  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">

      <div className="flex items-center justify-around h-16">

        {/* Home */}
        <button
          onClick={() => goToSection("home")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <Home size={20} />
          Home
        </button>

        {/* Menu */}
        <button
          onClick={() => goToSection("menu")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <UtensilsCrossed size={20} />
          Menu
        </button>

        {/* Plan Event */}
<button
  onClick={() => navigate("/plan")}
  className="flex flex-col items-center text-xs text-primary"
>
  <ClipboardList size={22} />
  Plan
</button>
        {/* Call */}
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
