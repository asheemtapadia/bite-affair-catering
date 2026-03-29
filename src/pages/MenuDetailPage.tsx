import { useParams, Link, useNavigate } from "react-router-dom";
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

/* ✅ STATE */
const [selectedItems, setSelectedItems] = useState<any>({});
const [showError, setShowError] = useState(false);

/* ✅ SCROLL FIX */
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

const pkg = menuPackages.find((p) => p.slug === slug);

/* ✅ FIXED LIMIT (FORCED LOGIC AS YOU WANT) */
const getLimit = (category: string) => {
  const name = category.toLowerCase();

  if (name.includes("starter")) return 2;
  if (name.includes("main")) return 2;
  if (name.includes("bread")) return 2;
  if (name.includes("rice")) return 1;
  if (name.includes("dessert")) return 1;

  return 2;
};

/* ✅ CLEAN CATEGORY NAME */
const cleanCategoryName = (name: string) => {
  return name.replace(/\(.*?\)/g, "").trim();
};

/* ✅ TOGGLE */
const toggleItem = (category: string, item: string) => {
  const LIMIT = getLimit(category);

  setSelectedItems((prev:any) => {
    const current = prev[category] || [];

    if (current.includes(item)) {
      return {
        ...prev,
        [category]: current.filter((i:string) => i !== item),
      };
    }

    if (current.length >= LIMIT) return prev;

    return {
      ...prev,
      [category]: [...current, item],
    };
  });
};

/* ✅ CHECK ALL SELECTED */
const allSelected = pkg?.categories.every((cat) => {
  const limit = getLimit(cat.name);
  return (selectedItems[cat.name]?.length || 0) === limit;
});

/* ✅ ADD TO CART */
const handleAddToCart = () => {
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
  };

  const updatedCart = [...existingCart, newItem];

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  try {
    navigate("/cart");
  } catch {
    alert("Added to cart");
  }
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

{/* ERROR */}
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

{/* ✅ FIXED TEXT */}
<p className="text-white/70 mt-3">
2 Starters, 2 Main Course, 1 Rice, 2 Breads, 1 Dessert
</p>

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
      Select {limit}
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
disabled={disabled}
className={`px-4 py-2 rounded-full text-sm border flex items-center gap-2 transition-all duration-200
${selected
? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.05]"
: disabled
? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
: "bg-white hover:border-orange-400 hover:bg-orange-50"
}`}
>
{selected && <span className="w-2 h-2 bg-white rounded-full"></span>}
{item}
</button>
);

})}

</div>

</div>
</ScrollReveal>
);

})}

</div>

{/* INFO */}
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
className={`w-full h-14 rounded-xl text-lg font-medium transition-all
${allSelected
? "bg-orange-500 text-white"
: "bg-gray-200 text-gray-500"
}`}
>
{allSelected ? "Save & Add to Cart" : "Select dishes to continue"}
</button>
</div>

<Footer />
<FloatingWhatsApp />

</div>
);
};

export default MenuDetailPage;
