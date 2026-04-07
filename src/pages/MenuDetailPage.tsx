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

  // ✅ FIXED ONLY HERE
  const getDynamicQty = (item: string) => {
    if (!totalGuests) return item.split("–")[0];

    const name = item.split("–")[0].trim();

    const match = item.match(/(\d+)\s*(pc|kg|ltr)/i);
    if (!match) return name;

    const baseQty = Number(match[1]);
    const unit = match[2];

    const newQty = Math.round((baseQty * totalGuests) / 20);

    return `${name} – ${newQty} ${unit}`;
  };

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
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Menu Not Found</h1>
          <Link to="/">← Back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40">
      <Header />

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
          <button onClick={() => navigate(-1)} className="text-white mb-6 flex items-center gap-1">
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="text-4xl text-white">{pkg.name}</h1>
          <p className="text-3xl text-orange-400 mt-3">
            ₹{pkg.price} <span className="text-sm text-white/70">per person</span>
          </p>
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

                  <h3 className="flex justify-between mb-4 font-semibold">
                    <span>{cleanCategoryName(cat.name)}</span>
                    <span>{count}/{limit}</span>
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {cat.items.map((item) => {

                      const cleanItem = item.split("–")[0].trim();
                      const selected = selectedItems[cat.name]?.includes(cleanItem);

                      return (
                        <button
                          key={item}
                          onClick={() => toggleItem(cat.name, item)}
                          className={`px-4 py-2 rounded-full border text-sm
                          ${selected ? "bg-orange-500 text-white" : ""}`}
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

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MenuDetailPage;
