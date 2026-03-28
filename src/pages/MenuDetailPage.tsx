import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { menuPackages, othersInfo } from "@/data/menuData";
import { ArrowLeft, Leaf, Drumstick, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const MenuDetailPage = () => {
const { slug } = useParams<{ slug: string }>();
const location = useLocation();
const navigate = useNavigate();

/* ✅ SCROLL FIX */
useEffect(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}, []);

const pkg = menuPackages.find((p) => p.slug === slug);

const cameFromPackages = location.search.includes("from=packages");

const whatsappMessage = encodeURIComponent(
`Hi Bite Affair,

I'm interested in the ${pkg?.name} package.

Event Date:
Number of Guests:
Location:

Please share availability and details.`
);

const whatsappLink = `https://wa.me/919211570030?text=${whatsappMessage}`;

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
<div className="min-h-screen">
<Header />

{/* HERO SECTION */}

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
<span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-green-400 text-green-300">
<Leaf size={12} /> Veg
</span>
) : (
<span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-red-400 text-red-300">
<Drumstick size={12} /> Non Veg
</span>
)}

<span className="text-xs font-body uppercase tracking-wider text-white/60">
{pkg.tier} tier
</span>

</div>

<h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
{pkg.name}
</h1>

<p className="font-heading text-3xl font-bold text-primary mt-3">
₹{pkg.price}
<span className="text-base font-body font-normal text-white/70">
/- per person
</span>
</p>

{/* preview items */}

<p className="mt-4 text-sm text-white/70 max-w-xl">
{pkg.previewItems.join(" • ")}
</p>

</div>
</div>

{/* MENU SECTION */}

<div className="py-20 section-white">
<div className="container mx-auto px-4 max-w-5xl">

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

{pkg.categories.map((cat) => (
<ScrollReveal key={cat.name} delay={0}>
<div className="bg-white rounded-xl border border-border p-6 shadow-sm">

<h3 className="font-heading text-xl font-semibold text-navy mb-4 pb-2 border-b border-border">
{cat.name}
</h3>

<ul className="space-y-2">

{cat.items.map((item) => (
<li
key={item}
className="font-body text-sm text-foreground/80 py-1.5 border-b border-border/40 last:border-0 hover:text-primary transition-colors"
>
{item}
</li>
))}

</ul>

</div>
</ScrollReveal>
))}

</div>

{/* ADDITIONAL INFO */}

<ScrollReveal delay={0.1}>
<div className="mt-16 bg-beige rounded-xl p-6 md:p-8 shadow-sm">

<h3 className="font-heading text-lg font-semibold text-navy mb-4">
Additional Information
</h3>

<ul className="space-y-2">

{othersInfo.map((info) => (
<li key={info} className="font-body text-sm text-foreground/70">
● {info}
</li>
))}

</ul>

</div>
</ScrollReveal>

<ScrollReveal delay={0.15}>
<p className="mt-12 text-center font-body text-sm text-muted-foreground">
To order, select your package and contact us directly via WhatsApp or Call.
</p>
</ScrollReveal>

{/* CTA BUTTONS */}

<div className="mt-6 text-center flex flex-col sm:flex-row gap-4 justify-center">

<Button size="lg" asChild className="transition-transform duration-200 hover:scale-[1.02]">
<a href={whatsappLink} target="_blank" rel="noopener noreferrer">
<MessageCircle size={18} className="mr-2" />
Order on WhatsApp
</a>
</Button>

<Button size="lg" variant="outline" asChild className="transition-transform duration-200 hover:scale-[1.02]">
<a href="tel:+919211570030">
<Phone size={18} className="mr-2" />
Call to Order
</a>
</Button>

</div>

</div>
</div>

<Footer />
<FloatingWhatsApp />

</div>
);
};

export default MenuDetailPage;
