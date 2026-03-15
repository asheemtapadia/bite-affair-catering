import { Home, UtensilsCrossed, Phone } from "lucide-react";

const MobileBottomNav = () => {

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">

      <div className="flex items-center justify-around h-16">

        {/* Home */}
        <button
          onClick={() => scrollTo("home")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <Home size={20} />
          Home
        </button>

        {/* Menu */}
        <button
          onClick={() => scrollTo("menu")}
          className="flex flex-col items-center text-xs text-gray-700"
        >
          <UtensilsCrossed size={20} />
          Menu
        </button>

        {/* PLAN EVENT (CENTER BUTTON) */}
        <button
          onClick={() => scrollTo("packages")}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg -mt-6"
        >
          ●
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
