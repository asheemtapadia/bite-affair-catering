import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();

const cuisine = searchParams.get("cuisine");

const filteredPackages = cuisine
? menuPackages.filter((pkg) =>
cuisine === "veg" ? pkg.isVeg : !pkg.isVeg
)
: menuPackages;

const handleSelectPackage = (pkg: any) => {

const veg = searchParams.get("veg");
const nonveg = searchParams.get("nonveg");
const area = searchParams.get("area");
const date = searchParams.get("date");
const time = searchParams.get("time");

const message = encodeURIComponent(
`New Catering Inquiry

Package: ${pkg.name}
Price: ₹${pkg.price} / person

Veg Guests: ${veg || 0}
Non Veg Guests: ${nonveg || 0}

Area: ${area || "Not provided"}
Date: ${date || "Not selected"}
Delivery Time: ${time || "Not selected"}

Source: Website`
);

window.open(
"https://wa.me/919211570030?text=${message}",
"_blank"
);

};

return (

<div className="min-h-screen py-20 px-6"><h1 className="text-3xl font-bold text-center mb-12">
Available Packages
</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{filteredPackages.map((pkg) => (

<div
key={pkg.slug}
className="border rounded-lg p-5 shadow-sm flex flex-col"
><div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
Package Image
</div><h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3><p className="text-primary font-semibold mb-4">
₹{pkg.price} / person
</p><Button
className="mt-auto"
onClick={() => handleSelectPackage(pkg)}

«»

Select Package
</Button>

</div>))}

</div></div>);

};

export default Packages;
