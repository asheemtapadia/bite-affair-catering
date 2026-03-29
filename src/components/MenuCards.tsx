import { useState } from "react";
import { Link } from "react-router-dom";
import { menuPackages } from "@/data/menuData";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Drumstick, ShoppingCart } from "lucide-react";

const MenuCards = () => {

  const [typeFilter, setTypeFilter] = useState<"veg" | "nonveg">("veg");
  const [priceFilter, setPriceFilter] = useState("all");

  const [showPopup, setShowPopup] = useState(false);
  const [highlightMenu, setHighlightMenu] = useState<string | null>(null);

  const filteredPackages = menuPackages.filter((pkg) => {

    if (typeFilter === "veg" && !pkg.isVeg) return false;
    if (typeFilter === "nonveg" && pkg.isVeg) return false;

    if (priceFilter === "under500" && pkg.price >= 500) return false;
    if (priceFilter === "500to900" && (pkg.price <= 500 || pkg.price > 900)) return false;

    return true;
  });

  const cardsToRender = filteredPackages;

  return (
    <section id="menu" className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4">

        {showPopup && (
          <div className="fixed top-32 left-1/2 -translate-x-1/2 z-50">
            <div className="backdrop-blur-xl bg-black/80 text-white px-6 py-3 rounded-xl text-sm flex items-center gap-2">
              <span>👇</span>
              <span>Select dishes from menu</span>
            </div>
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mb-12">

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Menu Packages
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <button
                onClick={() => setTypeFilter("veg")}
                className={`px-6 py-2 rounded-full text-sm ${
                  typeFilter === "veg"
                    ? "bg-green-600 text-white"
                    : "bg-white border text-gray-600"
                }`}
              >
                🥦 Veg
              </button>

              <button
                onClick={() => setTypeFilter("nonveg")}
                className={`px-6 py-2 rounded-full text-sm ${
                  typeFilter === "nonveg"
                    ? "bg-red-500 text-white"
                    : "bg-white border text-gray-600"
                }`}
              >
                🍗 Non-Veg
              </button>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-5 py-2 rounded-full border text-sm"
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500to900">₹500 – ₹900</option>
              </select>

            </div>

          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {cardsToRender.map((pkg, i) => {

            // ✅ ONLY SHOW FIRST 2 IMPORTANT ITEMS
            const importantItems = pkg.previewItems.slice(0, 2);

            return (
              <ScrollReveal key={pkg.slug} delay={0.08 * i}>

                <Link
                  to={`/menu/${pkg.slug}`}
                  className="group block bg-white rounded-xl border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >

                  {pkg.tier === "premium" && (
                    <span className="absolute left-3 top-3 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                      Premium
                    </span>
                  )}

                  <div className="relative">

                    <img
                      src={`/images/packages/${pkg.slug}.jpg`}
                      alt={pkg.name}
                      className="w-full h-40 object-cover"
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowPopup(true);
                        setHighlightMenu(pkg.slug);

                        setTimeout(() => {
                          setShowPopup(false);
                          setHighlightMenu(null);
                        }, 2000);
                      }}
                      className="absolute right-3 top-3 bg-primary text-white p-2 rounded-full"
                    >
                      <ShoppingCart size={16}/>
                    </button>

                  </div>

                  <div className="p-5">

                    <div className="flex items-center gap-2 mb-2">

                      {pkg.isVeg ? (
                        <span className="text-xs px-2 py-0.5 border rounded text-green-700 border-green-600 flex items-center gap-1">
                          <Leaf size={12}/> Veg
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 border rounded text-red-700 border-red-600 flex items-center gap-1">
                          <Drumstick size={12}/> Non Veg
                        </span>
                      )}

                      <span className="text-xs text-gray-400 uppercase">
                        {pkg.tier}
                      </span>

                    </div>

                    <h3 className="text-lg font-semibold text-navy mb-1">
                      {pkg.name}
                    </h3>

                    <p className="text-2xl font-bold text-primary mb-3">
                      ₹{pkg.price}
                      <span className="text-xs text-gray-400"> /person</span>
                    </p>

                    {/* ✅ CLEAN COMPACT TEXT */}
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      {importantItems.map((item, index) => (
                        <div key={index}>• {item}</div>
                      ))}
                    </div>

                    <span className={`text-sm font-medium ${
                      highlightMenu === pkg.slug ? "text-orange-600" : "text-primary"
                    }`}>
                      Customize →
                    </span>

                  </div>

                </Link>

              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default MenuCards;
