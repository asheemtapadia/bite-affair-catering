import { useState } from "react";
import { Link } from "react-router-dom";
import { menuPackages } from "@/data/menuData";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Drumstick, ShoppingCart } from "lucide-react";

const MenuCards = () => {

  const [typeFilter, setTypeFilter] = useState<"veg" | "nonveg">("veg");
  const [priceFilter, setPriceFilter] = useState("all");

  /* ✅ POPUP + HIGHLIGHT STATE */
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

        {/* ✅ PREMIUM POPUP */}
        {showPopup && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.3s_ease]">
            <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-2xl text-sm flex items-center gap-2">
              <span className="text-lg">👇</span>
              Select dishes from menu
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

                {pkg.tier === "premium" && (
                  <span className="absolute left-4 top-4 bg-amber-500 text-white text-xs px-4 py-1 rounded-full shadow z-20">
                    Premium
                  </span>
                )}

                <div className="relative overflow-hidden rounded-t-xl">

                  <img
                    src={`/images/packages/${pkg.slug}.jpg`}
                    alt={pkg.name}
                    className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                </div>

                {/* ✅ CART BUTTON (TRIGGER BOTH) */}
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
                  className="absolute right-4 top-4 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition"
                >
                  <ShoppingCart size={18}/>
                </button>

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

                  {/* ✅ PREMIUM ANIMATED CTA */}
                  <span
                    className={`inline-block font-body text-sm font-semibold transition-all duration-300
                    ${highlightMenu === pkg.slug
                      ? "text-orange-600 scale-110"
                      : "text-primary"
                    }`}
                  >
                    Select dishes from menu →
                    <span
                      className={`block h-[2px] mt-1 transition-all duration-300
                      ${highlightMenu === pkg.slug
                        ? "w-full bg-orange-500 animate-pulse"
                        : "w-0 bg-transparent"
                      }`}
                    ></span>
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
