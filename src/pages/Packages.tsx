import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();
const navigate = useNavigate();

const vegGuests = Number(searchParams.get("veg") || 0);
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


const handleEditEvent = () => {
navigate("/#packages");
};


return (

<div className="min-h-screen py-20 px-6 pb-32">

{/* Floating Edit Button */}

<div className="fixed top-24 right-6 z-50">
<Button
variant="outline"
onClick={handleEditEvent}
>
Edit Event Details
</Button>
</div>


<h1 className="text-3xl font-bold text-center mb-12">
Available Packages
</h1>


{/* Veg Packages */}

{vegGuests > 0 && (
<>

<h2 className="text-2xl font-semibold mb-6">
Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

{vegPackages.map((pkg) => (

<div
key={pkg.slug}
className={`border rounded-lg p-5 shadow-sm flex flex-col transition ${
selectedVegPackage?.slug === pkg.slug
? "border-primary ring-2 ring-primary"
: ""
}`}
>

<div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
Package Image
</div>

<h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3>

<p className="text-primary font-semibold mb-4">
₹{pkg.price} / person
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
>
{selectedVegPackage?.slug === pkg.slug ? "Selected ✓ (Tap to remove)" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}


{/* Non Veg Packages */}

{nonVegGuests > 0 && (
<>

<h2 className="text-2xl font-semibold mb-6">
Non Veg Packages
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

{nonVegPackages.map((pkg) => (

<div
key={pkg.slug}
className={`border rounded-lg p-5 shadow-sm flex flex-col transition ${
selectedNonVegPackage?.slug === pkg.slug
? "border-primary ring-2 ring-primary"
: ""
}`}
>

<div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
Package Image
</div>

<h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3>

<p className="text-primary font-semibold mb-4">
₹{pkg.price} / person
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
>
{selectedNonVegPackage?.slug === pkg.slug ? "Selected ✓ (Tap to remove)" : "Select Package"}
</Button>

</div>

))}

</div>
</>
)}


{/* Floating Submit Bar */}

<div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-xl p-4 z-50">

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
>
Proceed to WhatsApp
</Button>

</div>

</div>

</div>

);

};

export default Packages;
