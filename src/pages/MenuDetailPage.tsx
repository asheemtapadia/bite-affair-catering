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

  // ✅ NEW STATE (popup)
  const [popup, setPopup] = useState("");

  // ✅ NEW STATE (guests)
  const [guests, setGuests] = useState("");

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

  // ✅ quantity converter
  const getScaledItem = (item: string) => {
    if (!guests) return item.split(" - ")[0];

    const parts = item.split(" - ");
    if (parts.length < 2) return item;

    const name = parts[0];
    const qtyPart = parts[1];

    const num = parseFloat(qtyPart);
    const unit = qtyPart.replace(/[0-9.]/g, "").trim();

    if (!num) return name;

    const factor = Number(guests) / 20;
    const newQty = Math.round(num * factor);

    return `${name} - ${newQty} ${unit}`;
  };

  const toggleItem = (category: string, item: string) => {
    const LIMIT = getLimit(category);

    setSelectedItems((prev: any) => {
      const current = prev[category] || [];

      if (current.includes(item)) {
        return {
          ...prev,
          [category]: current.filter((i: string) => i !== item),
        };
      }

      if (mode === "order" && current.length >= LIMIT) return prev;

      return {
        ...prev,
        [category]: [...current, item],
      };
    });
  };

  const allSelected = pkg?.categories.every((cat) => {
    const limit = getLimit(cat.name);
    return (selectedItems[cat.name]?.length || 0) === limit;
  });

  const handleAddToCart = () => {

    if (!guests) {
      setPopup("Please select number of guests");
      return;
    }

    if (!allSelected) {
      setPopup("Please select all required dishes");
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

      {/* ✅ PREMIUM POPUP */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white px-6 py-5 rounded-2xl shadow-xl text-center max-w-sm w-[90%]">
            <p className="text-gray-800 text-base font-medium">{popup}</p>

            <button
              onClick={() => setPopup("")}
              className="mt-4 px-6 py-2 rounded-lg bg-black text-white"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-black text-white px-5 py-3 rounded-full shadow text-sm">
            Please select required dishes first
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

          <p className="text-white/70 mt-3">
            {pkg.previewItems.join(", ")}
          </p>

        </div>
      </div>

      {/* ✅ GUEST SELECT (ANIMATED) */}
      <div className="px-4 mt-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm animate-[bounceGlow_2s_infinite]">
          <label className="text-sm text-gray-600 block mb-2">Total Guests</label>
          <select
            className="w-full h-12 rounded-lg border px-3"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="">Select Guests</option>
            {Array.from({ length: 36 }, (_, i) => i + 15).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
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

                      const selected = selectedItems[cat.name]?.includes(item);
                      const disabled = !selected && count >= limit;

                      return (
                        <button
                          key={item}
                          onClick={() => toggleItem(cat.name, item)}
                          disabled={mode === "order" ? disabled : false}
                          className={`px-4 py-2 rounded-full text-sm border
                          ${selected
                              ? "bg-orange-500 text-white"
                              : disabled
                                ? "bg-gray-100 text-gray-400"
                                : "bg-white hover:border-orange-400"
                            }`}
                        >
                          {getScaledItem(item)}
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

        <button
          onClick={handleAddToCart}
          className={`w-full h-14 rounded-xl text-lg font-medium
          ${allSelected && guests
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-500"
            }`}
        >
          {allSelected && guests ? "Save & Add to Cart" : "Select dishes to continue"}
        </button>

      </div>

      <Footer />
      <FloatingWhatsApp />

    </div>
  );
};

export default MenuDetailPage;
