import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();
const navigate = useNavigate();

/* ✅ FILTER STATE (NEW) */
const [filter, setFilter] = useState<"veg" | "nonveg">("veg");

useEffect(() => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
}, []);

/* ✅ AUTO FILTER FIX (ADDED) */
useEffect(() => {
  if (vegGuests > 0 && nonVegGuests === 0) {
    setFilter("veg");
  } else if (nonVegGuests > 0 && vegGuests === 0) {
    setFilter("nonveg");
  }
}, [vegGuests, nonVegGuests]);

const vegGuests = Number(searchParams.get("veg") || 10);
const nonVegGuests = Number(searchParams.get("nonveg") || 0);

/* DELIVERY FIELDS */
const name = searchParams.get("name");
const phone = searchParams.get("phone");
const address = searchParams.get("address");
const apartment = searchParams.get("apartment");
const city = searchParams.get("city");
const state = searchParams.get("state");
const pin = searchParams.get("pin");

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


/* WHATSAPP MESSAGE */

const handleSubmit = () => {

const message = encodeURIComponent(
`New Catering Inquiry

👤 Name: ${name || "-"}
📞 Phone: ${phone || "-"}

📍 Address:
${address || "-"}
${apartment || ""}
${city || ""}, ${state || ""} - ${pin || ""}

👥 Veg Guests: ${vegGuests}
🍗 Non Veg Guests: ${nonVegGuests}

📅 Date: ${date || "-"}
⏰ Time: ${time || "-"}

Selected Packages
Veg: ${selectedVegPackage ? selectedVegPackage.name : "Not selected"}
Non Veg: ${selectedNonVegPackage ? selectedNonVegPackage.name : "Not selected"}

Estimated Cost
Veg Total: ₹${vegTotal}
Non Veg Total: ₹${nonVegTotal}
Grand Total: ₹${grandTotal}

Source: Website`
);

window.open(
`https://wa.me/919211570030?text=${message}`,
"_blank"
);

};


/* NAVIGATION */

const goToEventSection = () => {
navigate("/");
setTimeout(() => {
const section = document.getElementById("packages");
if(section){
section.scrollIntoView({ behavior: "smooth", block: "start" });
}
},300);
};

const handleBack = () => {
goToEventSection();
};

const handleEditEvent = () => {
goToEventSection();
};


return (

<div className="min-h-screen py-20 px-6 pb-28 bg-gradient-to-b from-white to-gray-50">

{/* EVENT BAR */}
<div className="max-w-6xl mx-auto mb-12 px-4">

  <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm p-5">

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

      {city && (
        <span className="bg-gray-100 px-3 py-1 rounded-full">
          📍 {city}
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


<h1 className="text-3xl font-bold text-center mb-6 tracking-tight">
Available Packages
</h1>

<p className="text-center text-xs text-gray-500 mb-3">
  Showing {filter === "veg" ? "Veg" : "Non-Veg"} Packages
</p>

<div className="flex items-center justify-center gap-3 mb-12">

  <button
    onClick={() => setFilter("veg")}
    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      filter === "veg"
        ? "bg-green-600 text-white shadow-lg scale-105"
        : "bg-white text-gray-600 border border-gray-200"
    }`}
  >
    🥦 Veg
  </button>

  <button
    onClick={() => setFilter("nonveg")}
    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      filter === "nonveg"
        ? "bg-red-500 text-white shadow-lg scale-105"
        : "bg-white text-gray-600 border border-gray-200"
    }`}
  >
    🍗 Non Veg
  </button>

</div>


{/* VEG */}
{filter === "veg" && vegGuests > 0 && (
<>
<h2 className="text-2xl font-semibold mb-6">
Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

{vegPackages.map((pkg) => (

<div key={pkg.slug} className={`relative rounded-2xl border p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
selectedVegPackage?.slug === pkg.slug
? "ring-2 ring-primary border-primary bg-primary/5"
: ""
}`}>

<span className="absolute top-3 left-3 text-xs bg-primary text-white px-2 py-1 rounded">
Veg
</span>

<img src={`/images/packages/${pkg.slug}.jpg`} className="h-48 w-full object-cover rounded-xl mb-4" />

<h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>

<p className="text-xl font-semibold text-primary mb-3">
₹{pkg.price} <span className="text-sm text-gray-500">/ person</span>
</p>

{/* ✅ FULL DISHES FIX */}
<div className="text-sm text-muted-foreground mb-4">
  {pkg.previewItems?.map((item, i) => (
    <span key={i}>
      {item}{i !== pkg.previewItems.length - 1 ? " • " : ""}
    </span>
  ))}
</div>

<Button
className={`w-full ${
selectedVegPackage?.slug === pkg.slug
? "bg-green-600 hover:bg-green-700"
: ""
}`}
onClick={() =>
selectedVegPackage?.slug === pkg.slug
? setSelectedVegPackage(null)
: setSelectedVegPackage(pkg)
}
>
{selectedVegPackage?.slug === pkg.slug ? "✓ Selected" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}


/* NON VEG */
{filter === "nonveg" && nonVegGuests > 0 && (
<>
<h2 className="text-2xl font-semibold mb-6">
Non Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">

{nonVegPackages.map((pkg) => (

<div key={pkg.slug} className={`relative rounded-2xl border p-5 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${
selectedNonVegPackage?.slug === pkg.slug
? "ring-2 ring-primary border-primary bg-primary/5"
: ""
}`}>

<span className="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded">
Non Veg
</span>

<img src={`/images/packages/${pkg.slug}.jpg`} className="h-48 w-full object-cover rounded-xl mb-4" />

<h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>

<p className="text-xl font-semibold text-primary mb-3">
₹{pkg.price} <span className="text-sm text-gray-500">/ person</span>
</p>

{/* ✅ FULL DISHES FIX */}
<div className="text-sm text-muted-foreground mb-4">
  {pkg.previewItems?.map((item, i) => (
    <span key={i}>
      {item}{i !== pkg.previewItems.length - 1 ? " • " : ""}
    </span>
  ))}
</div>

<Button
className={`w-full ${
selectedNonVegPackage?.slug === pkg.slug
? "bg-green-600 hover:bg-green-700"
: ""
}`}
onClick={() =>
selectedNonVegPackage?.slug === pkg.slug
? setSelectedNonVegPackage(null)
: setSelectedNonVegPackage(pkg)
}
>
{selectedNonVegPackage?.slug === pkg.slug ? "✓ Selected" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}


/* CTA */
<div className={`fixed bottom-0 left-0 right-0 px-4 pb-5 ${
selectedVegPackage || selectedNonVegPackage
? "opacity-100 translate-y-0"
: "opacity-0 translate-y-10 pointer-events-none"
} transition-all duration-300`}>

  <div className="max-w-md mx-auto">
    <Button
      onClick={handleSubmit}
      className="w-full h-14 text-lg rounded-2xl shadow-xl bg-primary hover:scale-[1.02] transition-all duration-200"
    >
      Get Quote on WhatsApp
    </Button>
  </div>

</div>

</div>
);
};

export default Packages;
