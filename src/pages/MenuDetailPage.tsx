import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuPackages, othersInfo } from "@/data/menuData";
import { ArrowLeft, Leaf, Drumstick } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MenuDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mode = searchParams.get("source") === "plan" ? "plan" : "order";

  const [selectedItems, setSelectedItems] = useState<any>({});
  const [showError, setShowError] = useState(false);

  // ✅ NEW (GUEST STATE)
  const [guests, setGuests] = useState("");
  const totalGuests = Number(guests);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pkg = menuPackages.find((p) => p.slug === slug);

  const getLimit = (category: string) => {
    const match = category.match(/Choose\s*(\d+)/i);
    return match ? parseInt(match[1]) : 1;
  };

  const cleanCategoryName = (name: string) => {
    return name.split("(")[0].trim();
  };

  // ✅ FIX (NO QTY UNTIL GUEST SELECTED)
  const getDynamicQty = (item: string) => {
  const name = item.split("–")[0].trim();

  if (!totalGuests) return name;

  const match = item.match(/(\d+)\s*(pc|kg|ltr)/i);
  if (!match) return name;

  const baseQty = Number(match[1]);
  const unit = match[2].toLowerCase();

  let newQty;

  if (unit === "pc") {
    newQty = Math.round((baseQty * totalGuests) / 20);
  } else {
    newQty = ((baseQty * totalGuests) / 20).toFixed(1);
  }

  return `${name} – ${newQty} ${unit}`;
};

  // ✅ FIX (STORE CLEAN NAME)
  const toggleItem = (category: string, item: string) => {
    const LIMIT = getLimit(category);
    const cleanItem = item.split("–")[0].trim();

    setSelectedItems((prev: any) => {
      const current = prev[category] || [];

      if (current.includes(cleanItem)) {
        return {
          ...prev,
          [category]: current.filter((i: string) => i !== cleanItem),
        };
      }

      if (mode === "order" && current.length >= LIMIT) return prev;

      return {
        ...prev,
        [category]: [...current, cleanItem],
      };
    });
  };

  const allSelected = pkg?.categories.every((cat) => {
    const limit = getLimit(cat.name);
    return (selectedItems[cat.name]?.length || 0) === limit;
  });

  const handleAddToCart = () => {
    if (!totalGuests) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    if (!allSelected) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const newItem = {
      id: Date.now(),
      name: pkg?.name,
      price: pkg?.price,
      selectedItems,
      guests
    };

    const updatedCart = [...existingCart, newItem];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    navigate("/cart");
  };

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center section-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Menu Not Found</h1>
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <Header />

      {showError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black text-white px-5 py-3 rounded-full shadow text-sm">
            Complete selection + guests
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="relative pt-28 pb-16">
        <img
          src={`/images/packages/${pkg.slug}.jpg`}
          alt={pkg.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative container mx-auto px-4 max-w-5xl">

          <button
            onClick={() => navigate(-1)}
            className="text-white/70 mb-6 flex items-center gap-1"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="flex gap-3 mb-3">
            {pkg.isVeg ? (
              <span className="text-green-300 text-xs border px-2 py-1 rounded flex items-center gap-1">
                <Leaf size={12} /> Veg
              </span>
            ) : (
              <span className="text-red-300 text-xs border px-2 py-1 rounded flex items-center gap-1">
                <Drumstick size={12} /> Non Veg
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white">{pkg.name}</h1>

          <p className="text-3xl text-orange-400 mt-3">
            ₹{pkg.price} <span className="text-sm text-white/70">per person</span>
          </p>

          {/* ✅ HEADER FIX (BACK SAME FEEL) */}
          <p className="text-white/70 mt-3">
            {pkg.previewItems.join(", ")}
          </p>

        </div>
      </div>

      {/* ✅ GUEST SECTION */}
      <div className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white p-6 rounded-xl border-2 border-orange-300 shadow-sm">

            <label className="text-sm mb-2 block text-gray-700 font-medium">
              Total Guests
            </label>

            <select
              className="h-12 w-full rounded-lg border border-orange-400 px-3"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="">Select Guests</option>
              {Array.from({ length: 36 }, (_, i) => {
                const num = i + 15;
                return <option key={num} value={num}>{num}</option>;
              })}
            </select>

          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="py-20">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8">

          {pkg.categories.map((cat) => {

            const limit = getLimit(cat.name);
            const count = selectedItems[cat.name]?.length || 0;

            return (
              <ScrollReveal key={cat.name}>
                <div className="bg-white p-6 rounded-xl border shadow-sm">

                  <h3 className="flex justify-between mb-4 font-semibold">
                    <span>
                      {cleanCategoryName(cat.name)}
                      <span className="text-sm text-gray-400 ml-2">
                        ({`Choose ${limit}`})
                      </span>
                    </span>

                    <span className="text-orange-500 text-sm">
                      {count}/{limit}
                    </span>
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {cat.items.map((item) => {

                      const cleanItem = item.split("–")[0].trim();
                      const selected = selectedItems[cat.name]?.includes(cleanItem);
                      const disabled = !selected && count >= limit;

                      return (
                        <button
                          key={item}
                          onClick={() => toggleItem(cat.name, item)}
                          disabled={mode === "order" ? disabled : false}
                          className={`px-4 py-2 rounded-full text-sm border flex items-center gap-2 transition-all duration-200
                          ${selected
                              ? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.05]"
                              : disabled
                                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                : "bg-white hover:border-orange-400 hover:bg-orange-50"
                            }`}
                        >
                          {getDynamicQty(item)}
                        </button>
                      );

                    })}

                  </div>

                </div>
              </ScrollReveal>
            );

          })}

        </div>

        <div className="mt-16 bg-beige p-6 rounded-xl max-w-5xl mx-auto">
          <h3 className="font-semibold mb-3">Additional Information</h3>

          <ul className="text-sm text-gray-600 space-y-1">
            {othersInfo.map((info) => (
              <li key={info}>● {info}</li>
            ))}
          </ul>
        </div>

      </div>

      {/* CTA */}
      <div className="fixed bottom-20 left-0 right-0 px-4 z-50">

        {mode === "plan" ? (
          <button
            onClick={() => {
              const text = encodeURIComponent(`Selected Menu: ${pkg.name}`);
              window.open(`https://wa.me/919211570030?text=${text}`, "_blank");
            }}
            className="w-full h-14 rounded-xl text-lg font-medium bg-black text-white"
          >
            Get Quote on WhatsApp
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`w-full h-14 rounded-xl text-lg font-medium
            ${totalGuests && allSelected
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-500"
              }`}
          >
            {totalGuests && allSelected
              ? "Save & Add to Cart"
              : "Select guests + dishes"}
          </button>
        )}

      </div>

      <Footer />
      <FloatingWhatsApp />

    </div>
  );
};

export default MenuDetailPage;
