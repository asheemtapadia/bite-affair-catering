// SAME IMPORTS

import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuPackages } from "@/data/menuData";
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
  const [popup, setPopup] = useState("");

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

  // ✅ QTY LOGIC
  const getDynamicQty = (item: string) => {
    if (!totalGuests) return item.split("–")[0]; // ❌ no default qty

    const name = item.split("–")[0].trim();

    const match = item.match(/(\d+)\s*(pc|kg|ltr)/i);
    if (!match) return name;

    const baseQty = Number(match[1]);
    const unit = match[2];

    const newQty = Math.round((baseQty * totalGuests) / 20);

    return `${name} – ${newQty} ${unit}`;
  };

  // ✅ CLEAN SAVE
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
      <div className="min-h-screen flex items-center justify-center">
        <h1>Menu Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <Header />

      {/* POPUP */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white px-6 py-5 rounded-2xl text-center">
            <p>{popup}</p>
            <button onClick={() => setPopup("")} className="mt-4 px-6 py-2 bg-black text-white rounded">
              OK
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="relative pt-28 pb-16">
        <img src={`/images/packages/${pkg.slug}.jpg`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative container mx-auto px-4 max-w-5xl">
          <button onClick={() => navigate(-1)} className="text-white mb-4 flex items-center gap-1">
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="text-4xl text-white">{pkg.name}</h1>
          <p className="text-3xl text-orange-400 mt-2">
            ₹{pkg.price} <span className="text-sm text-white/70">per person</span>
          </p>

          {/* ✅ HEADER COUNT */}
          <div className="mt-4 text-white/80 text-sm">
            {pkg.categories.map((cat) => {
              const count = selectedItems[cat.name]?.length || 0;
              return count > 0 ? (
                <span key={cat.name} className="mr-3">
                  {count} {cleanCategoryName(cat.name)}
                </span>
              ) : null;
            })}
          </div>

        </div>
      </div>

      {/* GUEST */}
      <div className="py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Guests</option>
            {Array.from({ length: 36 }, (_, i) => {
              const num = i + 15;
              return <option key={num} value={num}>{num}</option>;
            })}
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
                <div className="bg-white p-6 rounded-xl border">

                  <h3 className="flex justify-between mb-3 font-semibold">
                    <span>{cleanCategoryName(cat.name)}</span>
                    <span>{count}/{limit}</span>
                  </h3>

                  {count === limit && (
                    <p className="text-xs text-green-600 mb-2">
                      ✓ Selection complete
                    </p>
                  )}

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
                          className={`px-4 py-2 rounded-full text-sm border transition
                          ${selected
                              ? "bg-orange-500 text-white scale-105"
                              : disabled
                                ? "bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed"
                                : "bg-white hover:border-orange-400 hover:scale-105"
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
      </div>

      {/* CTA */}
      <div className="fixed bottom-[80px] left-0 right-0 px-4 z-[999]">
        <button
          onClick={handleAddToCart}
          className={`w-full h-14 rounded-xl text-lg
          ${totalGuests && allSelected
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-500"
            }`}
        >
          Save & Add to Cart
        </button>
      </div>

      {/* SPACE FOR BUTTON */}
      <div className="h-32"></div>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MenuDetailPage;
