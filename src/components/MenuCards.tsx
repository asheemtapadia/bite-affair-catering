import { useState } from "react";
import { Link } from "react-router-dom";
import { menuPackages } from "@/data/menuData";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Drumstick, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const MenuCards = () => {

  /* ✅ DEFAULT VEG SELECTED */
  const [typeFilter, setTypeFilter] = useState<"veg" | "nonveg">("veg");
  const [priceFilter, setPriceFilter] = useState("all");

  /* ✅ POPUP STATE */
  const [showPopup, setShowPopup] = useState(false);

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

        {/* ✅ POPUP */}
        {showPopup && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-black text-white px-5 py-3 rounded-full shadow text-sm">
              Please select items from menu ↓
            </div>
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mb-12">

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Our Menu Packages
            </h2>

            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Designed for gatherings of 15–50 guests. Structured bulk menus with generous portions and consistent quality across Delhi NCR.
            </p>

            {/* 🔥 FILTER UI */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">

              <button
                onClick={() => setTypeFilter("veg")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  typeFilter === "veg"
                    ? "bg-green-600 text-white shadow-lg scale-105"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                🥦 Veg
              </button>

              <button
                onClick={() => setTypeFilter("nonveg")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  typeFilter === "nonveg"
                    ? "bg-red-500 text-white shadow-lg scale-105"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                🍗 Non-Veg
              </button>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-5 py-2 rounded-full border text-sm shadow-sm"
              >
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500to900">₹500 – ₹900</option>
              </select>

            </div>

          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {cardsToRender.map((pkg, i) => (
            <ScrollReveal key={pkg.slug} delay={0.08 * i}>

              <Link
                to={`/menu/${pkg.slug}`}
                className="group block bg-white rounded-xl border border-border shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden h-full"
              >

                {/* PREMIUM BADGE */}
                {pkg.tier === "premium" && (
                  <span className="absolute left-4 top-4 bg-amber-500 text-white text-xs px-4 py-1 rounded-full shadow z-20">
                    Premium
                  </span>
                )}

                {/* IMAGE */}
                <div className="relative overflow-hidden rounded-t-xl">

                  <img
                    src={`/images/packages/${pkg.slug}.jpg`}
                    alt={pkg.name}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                </div>

                {/* ✅ CART BUTTON (FIXED) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setShowPopup(true);
                    setTimeout(() => setShowPopup(false), 2000);
                  }}
                  className="absolute right-4 top-4 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition"
                >
                  <ShoppingCart size={18}/>
                </button>

                {/* CONTENT */}
                <div className="p-6">

                  <div className="flex items-center gap-2 mb-3">

                    {pkg.isVeg ? (
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-green-600 text-green-700">
                        <Leaf size={12} /> Veg
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-red-600 text-red-700">
                        <Drumstick size={12} /> Non Veg
                      </span>
                    )}

                    <span className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                      {pkg.tier}
                    </span>

                  </div>

                  <h3 className="font-heading text-xl font-semibold text-navy mb-1">
                    {pkg.name}
                  </h3>

                  <p className="font-heading text-3xl font-bold text-primary mb-4">
                    ₹{pkg.price}
                    <span className="text-sm font-body font-normal text-muted-foreground">
                      /- per person
                    </span>
                  </p>

                  <ul className="space-y-1.5 mb-6">
                    {pkg.previewItems.slice(0,2).map((item) => (
                      <li
                        key={item}
                        className="text-sm font-body text-foreground/80 flex items-start gap-2"
                      >
                        <span className="text-primary mt-1 text-xs">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* ✅ HIGHLIGHTED */}
                  <span className="inline-block font-body text-sm font-medium text-primary relative">
                    See Full Menu →
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-400 animate-pulse"></span>
                  </span>

                </div>

              </Link>

            </ScrollReveal>
          ))}

        </div>

        {cardsToRender.length === 0 && (
          <p className="text-center text-muted-foreground mt-10 text-lg">
            No packages available in this price range.
          </p>
        )}

      </div>
    </section>
  );
};

export default MenuCards;
