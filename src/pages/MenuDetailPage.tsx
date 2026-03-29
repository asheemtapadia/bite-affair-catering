import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { menuPackages, othersInfo } from "@/data/menuData";
import { ArrowLeft, Leaf, Drumstick } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MenuDetailPage = () => {
const { slug } = useParams<{ slug: string }>();
const location = useLocation();
const navigate = useNavigate();

/* ✅ STATE */
const [selectedItems, setSelectedItems] = useState<any>({});
const [showError, setShowError] = useState(false);

/* ✅ LIMIT */
const LIMIT = 2;

/* ✅ SCROLL FIX */
useEffect(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}, []);

const pkg = menuPackages.find((p) => p.slug === slug);

/* ✅ TOGGLE */
const toggleItem = (category: string, item: string) => {
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
const allSelected = pkg?.categories.every(
  (cat) => (selectedItems[cat.name]?.length || 0) === LIMIT
);

/* ✅ ADD TO CART */
const handleAddToCart = () => {
  if (!allSelected) {
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
    return;
  }

  const order = {
    packageName: pkg?.name,
    price: pkg?.price,
    selectedItems,
  };

  localStorage.setItem("cart", JSON.stringify(order));
  navigate("/cart");
};

if (!pkg) {
return (
<div className="min-h-screen flex items-center justify-center section-white">
<div className="text-center">
<h1 className="font-heading text-3xl font-bold text-navy mb-4">Menu Not Found</h1>
<Link to="/" className="font-body text-primary hover:underline">← Back to Home</Link>
</div>
</div>
);
}

return (
<div className="min-h-screen pb-32">
<Header />

{/* ERROR POPUP */}
{showError && (
  <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
    <div className="bg-black text-white px-5 py-3 rounded-full shadow text-sm">
      Please select dishes from all categories
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
<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

<div className="relative container mx-auto px-4 max-w-5xl">

<button
onClick={() => navigate(-1)}
className="inline-flex items-center gap-1 font-body text-sm text-white/70 hover:text-primary transition-colors mb-6"
>
<ArrowLeft size={16} />
Back to Packages
</button>

<div className="flex items-center gap-3 mb-3">

{pkg.isVeg ? (
<span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-green-400 text-green-300">
<Leaf size={12} /> Veg
</span>
) : (
<span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border border-red-400 text-red-300">
<Drumstick size={12} /> Non Veg
</span>
)}

<span className="text-xs uppercase tracking-wider text-white/60">
{pkg.tier} tier
</span>

</div>

<h1 className="text-4xl md:text-5xl font-bold text-white">
{pkg.name}
</h1>

<p className="text-3xl font-bold text-primary mt-3">
₹{pkg.price}
<span className="text-base text-white/70"> /- per person</span>
</p>

<p className="mt-4 text-sm text-white/70 max-w-xl">
{pkg.previewItems.join(" • ")}
</p>

</div>
</div>

{/* MENU */}
<div className="py-20 section-white">
<div className="container mx-auto px-4 max-w-5xl">

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

{pkg.categories.map((cat) => (
<ScrollReveal key={cat.name} delay={0}>
<div className="bg-white rounded-xl border p-6 shadow-sm">

<h3 className="flex justify-between text-lg font-semibold mb-4">
  <span>{cat.name} (Choose 2)</span>
  <span className="text-orange-500 text-sm">
    {(selectedItems[cat.name]?.length || 0)}/2
  </span>
</h3>

<div className="flex flex-wrap gap-2">

{cat.items.map((item) => {

const selected = selectedItems[cat.name]?.includes(item);
const disabled =
!selected && (selectedItems[cat.name]?.length || 0) >= LIMIT;

return (
<button
key={item}
onClick={() => toggleItem(cat.name, item)}
disabled={disabled}
className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
${selected
? "bg-orange-500 text-white border-orange-500 shadow-md scale-[1.05]"
: disabled
? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
: "bg-white hover:border-orange-300 hover:bg-orange-50"
}`}
>
{item}
</button>
);

})}

</div>

</div>
</ScrollReveal>
))}

</div>

{/* INFO */}
<div className="mt-16 bg-beige rounded-xl p-6 shadow-sm">
<h3 className="text-lg font-semibold mb-4">Additional Information</h3>

<ul className="space-y-2">
{othersInfo.map((info) => (
<li key={info} className="text-sm text-gray-600">● {info}</li>
))}
</ul>
</div>

</div>
</div>

{/* ✅ STICKY CTA */}
<div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">

<button
onClick={handleAddToCart}
className={`w-full h-14 rounded-xl text-lg font-medium transition-all
${allSelected
? "bg-orange-500 text-white"
: "bg-gray-200 text-gray-500"
}`}
>
{allSelected ? "Add to Cart" : "Select dishes to continue"}
</button>

</div>

<Footer />
<FloatingWhatsApp />

</div>
);
};

export default MenuDetailPage;
