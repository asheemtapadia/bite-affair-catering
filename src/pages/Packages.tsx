import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();
const navigate = useNavigate();

const vegGuests = Number(searchParams.get("veg") || 10);
const nonVegGuests = Number(searchParams.get("nonveg") || 0);
const area = searchParams.get("area");
const date = searchParams.get("date");
const time = searchParams.get("time");

const [selectedVegPackage, setSelectedVegPackage] = useState<any>(null);
const [selectedNonVegPackage, setSelectedNonVegPackage] = useState<any>(null);

const vegPackages = menuPackages.filter(pkg => pkg.isVeg);
const nonVegPackages = menuPackages.filter(pkg => !pkg.isVeg);

const vegTotal =
selectedVegPackage ? vegGuests * selectedVegPackage.price : 0;

const nonVegTotal =
selectedNonVegPackage ? nonVegGuests * selectedNonVegPackage.price : 0;

const grandTotal = vegTotal + nonVegTotal;


/* WHATSAPP SUBMIT */

const handleSubmit = () => {

const message = encodeURIComponent(
`New Catering Inquiry

Veg Guests: ${vegGuests}
Non Veg Guests: ${nonVegGuests}

Selected Packages
Veg: ${selectedVegPackage ? selectedVegPackage.name : "Not selected"}
Non Veg: ${selectedNonVegPackage ? selectedNonVegPackage.name : "Not selected"}

Estimated Cost
Veg Total: ₹${vegTotal}
Non Veg Total: ₹${nonVegTotal}
Grand Total: ₹${grandTotal}

Area: ${area || "Not provided"}
Date: ${date || "Not selected"}
Delivery Time: ${time || "Not selected"}

Source: Website`
);

window.open(
`https://wa.me/919211570030?text=${message}`,
"_blank"
);

};


/* FUNCTION TO GO TO PLAN MY EVENT */

const goToEventSection = () => {

navigate("/");

setTimeout(() => {

const section = document.getElementById("packages");

if(section){
section.scrollIntoView({ behavior: "smooth", block: "start" });
}

},300);

};


/* BACK NAVIGATION */

const handleBack = () => {
goToEventSection();
};


/* EDIT EVENT DETAILS */

const handleEditEvent = () => {
goToEventSection();
};


return (

<div className="min-h-screen py-20 px-6 pb-32">

{/* IMPROVED EVENT BAR */}
<div className="max-w-6xl mx-auto mb-10 px-4">

  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

    {/* TOP INFO */}
    <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">

      {vegGuests > 0 && (
        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
          🥦 {vegGuests} Veg
        </span>
      )}

      {nonVegGuests > 0 && (
        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full">
          🍗 {nonVegGuests} Non-Veg
        </span>
      )}

      {area && (
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          📍 {area}
        </span>
      )}

      {date && (
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          📅 {date}
        </span>
      )}

      {time && (
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          ⏰ {time}
        </span>
      )}

    </div>

    {/* ACTION BUTTONS */}
    <div className="flex gap-3">

      <button
        onClick={handleBack}
        className="bg-primary text-white px-4 py-2 rounded-xl text-sm shadow hover:opacity-90"
      >
        ← Back
      </button>

      <button
        onClick={handleEditEvent}
        className="border px-4 py-2 rounded-xl text-sm"
      >
        Edit Details
      </button>

    </div>

  </div>

</div>


<h1 className="text-3xl font-bold text-center mb-12">
Available Packages
</h1>


{/* VEG PACKAGES */}

{vegGuests > 0 && (
<>

<h2 className="text-2xl font-semibold mb-6">
Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

{vegPackages.map((pkg) => (

<div
key={pkg.slug}
className={`relative border rounded-xl p-6 shadow-sm flex flex-col transition hover:shadow-xl hover:-translate-y-1 ${
selectedVegPackage?.slug === pkg.slug
? "border-primary ring-2 ring-primary bg-primary/5"
: ""
}`}
>

{/* BADGE */}

<span className="absolute top-3 left-3 text-xs bg-primary text-white px-2 py-1 rounded">
Veg
</span>

{pkg.tier === "premium" && (
<span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-1 rounded">
Premium
</span>
)}

<img
src={`/images/packages/${pkg.slug}.jpg`}
alt={pkg.name}
className="h-48 w-full object-cover rounded-lg mb-4"
/>

<h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3>

<p className="text-xl font-semibold text-primary mb-3">
₹{pkg.price} / person
</p>

<p className="text-sm text-muted-foreground mb-4">
{pkg.previewItems.slice(0,3).join(" • ")}
</p>

<Link
to={`/menu/${pkg.slug}?from=packages&${searchParams.toString()}`}
className="text-sm text-primary underline mb-3"
>
View Full Menu
</Link>

<Button
onClick={() =>
selectedVegPackage?.slug === pkg.slug
? setSelectedVegPackage(null)
: setSelectedVegPackage(pkg)
}
variant={selectedVegPackage?.slug === pkg.slug ? "default" : "outline"}
className="hover:scale-[1.02] transition"
>
{selectedVegPackage?.slug === pkg.slug ? "Selected ✓ (Tap to remove)" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}



{/* NON VEG PACKAGES */}

{nonVegGuests > 0 && (
<>

<h2 className="text-2xl font-semibold mb-6">
Non Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

{nonVegPackages.map((pkg) => (

<div
key={pkg.slug}
className={`relative border rounded-xl p-6 shadow-sm flex flex-col transition hover:shadow-xl hover:-translate-y-1 ${
selectedNonVegPackage?.slug === pkg.slug
? "border-primary ring-2 ring-primary bg-primary/5"
: ""
}`}
>

<span className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded">
Non Veg
</span>

{pkg.tier === "premium" && (
<span className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-1 rounded">
Premium
</span>
)}

<img
src={`/images/packages/${pkg.slug}.jpg`}
alt={pkg.name}
className="h-48 w-full object-cover rounded-lg mb-4"
/>

<h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3>

<p className="text-xl font-semibold text-primary mb-3">
₹{pkg.price} / person
</p>

<p className="text-sm text-muted-foreground mb-4">
{pkg.previewItems.slice(0,3).join(" • ")}
</p>

<Link
to={`/menu/${pkg.slug}?from=packages&${searchParams.toString()}`}
className="text-sm text-primary underline mb-3"
>
View Full Menu
</Link>

<Button
onClick={() =>
selectedNonVegPackage?.slug === pkg.slug
? setSelectedNonVegPackage(null)
: setSelectedNonVegPackage(pkg)
}
variant={selectedNonVegPackage?.slug === pkg.slug ? "default" : "outline"}
className="hover:scale-[1.02] transition"
>
{selectedNonVegPackage?.slug === pkg.slug ? "Selected ✓ (Tap to remove)" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}



{/* FLOATING SUBMIT BAR */}

<div
className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 shadow-[0_-6px_20px_rgba(0,0,0,0.06)] z-40 transition-all duration-300 ${
selectedVegPackage || selectedNonVegPackage
? "translate-y-0"
: "translate-y-3"
}`}
>

<div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

<div className="text-sm font-medium">

<p>
Selected:
{selectedVegPackage && ` Veg - ${selectedVegPackage.name}`}
{selectedNonVegPackage && ` | Non Veg - ${selectedNonVegPackage.name}`}
{!selectedVegPackage && !selectedNonVegPackage && " None"}
</p>

{grandTotal > 0 && (
<p className="text-primary font-semibold mt-1">
Estimated Total: ₹{grandTotal}
</p>
)}

</div>

<Button
size="lg"
onClick={handleSubmit}
disabled={!selectedVegPackage && !selectedNonVegPackage}
className={`w-full transition-all duration-300 ${
selectedVegPackage || selectedNonVegPackage
? "opacity-100 hover:scale-[1.02]"
: "opacity-40 cursor-not-allowed"
}`}
>
Get Quote on WhatsApp
</Button>

</div>

</div>

</div>

);

};

export default Packages;
