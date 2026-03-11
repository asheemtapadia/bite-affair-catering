import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();
const [cart, setCart] = useState<any[]>([]);

const cuisine = searchParams.get("cuisine");

const filteredPackages = cuisine
? menuPackages.filter((pkg) =>
cuisine === "veg" ? pkg.isVeg : !pkg.isVeg
)
: menuPackages;

useEffect(() => {
const storedCart = localStorage.getItem("cart");
if (storedCart) {
setCart(JSON.parse(storedCart));
}
}, []);

const addToCart = (pkg: any) => {

const updatedCart = [...cart];

updatedCart.push(pkg);

setCart(updatedCart);

localStorage.setItem("cart", JSON.stringify(updatedCart));

alert("${pkg.name} added to cart");

};

return (

<div className="min-h-screen py-20 px-6"><h1 className="text-3xl font-bold text-center mb-12">
Available Packages
</h1><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">{filteredPackages.map((pkg) => (

<div
key={pkg.slug}
className="border rounded-lg p-5 shadow-sm flex flex-col"
>{/* Placeholder Image */}

<div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
Package Image
</div><h3 className="text-lg font-semibold mb-1">
{pkg.name}
</h3><p className="text-primary font-semibold mb-4">
₹{pkg.price} / person
</p><Button
className="mt-auto"
onClick={() => addToCart(pkg)}


Add to Cart
</Button>

</div>))}

</div></div>);
};

export default Packages;
