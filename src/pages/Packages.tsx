import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { menuPackages } from "@/data/menuData";

const Packages = () => {

const [searchParams] = useSearchParams();

const vegGuests = Number(searchParams.get("veg") || 0);
const nonVegGuests = Number(searchParams.get("nonveg") || 0);

const area = searchParams.get("area");
const date = searchParams.get("date");
const time = searchParams.get("time");

const [selectedVegPackage, setSelectedVegPackage] = useState<any>(null);
const [selectedNonVegPackage, setSelectedNonVegPackage] = useState<any>(null);

const vegPackages = menuPackages.filter(pkg => pkg.isVeg);
const nonVegPackages = menuPackages.filter(pkg => !pkg.isVeg);

const handleSubmit = () => {

const message = encodeURIComponent(

`New Catering Inquiry

Veg Guests: ${vegGuests}
Non Veg Guests: ${nonVegGuests}

Selected Packages:
Veg: ${selectedVegPackage ? selectedVegPackage.name : "Not selected"}
Non Veg: ${selectedNonVegPackage ? selectedNonVegPackage.name : "Not selected"}

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

return (

<div className="min-h-screen py-20 px-6">

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
            className="border rounded-lg p-5 shadow-sm flex flex-col"
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
              to={`/menu/${pkg.slug}`}
              className="text-sm text-primary underline mb-3"
            >
              View Menu
            </Link>

            <Button
              onClick={() => setSelectedVegPackage(pkg)}
            >
              Select Package
            </Button>

          </div>

        ))}

      </div>
    </>
  )}

  {/* Non-Veg Packages */}

  {nonVegGuests > 0 && (
    <>
      <h2 className="text-2xl font-semibold mb-6">
        Non Veg Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        {nonVegPackages.map((pkg) => (

          <div
            key={pkg.slug}
            className="border rounded-lg p-5 shadow-sm flex flex-col"
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
              to={`/menu/${pkg.slug}`}
              className="text-sm text-primary underline mb-3"
            >
              View Menu
            </Link>

            <Button
              onClick={() => setSelectedNonVegPackage(pkg)}
            >
              Select Package
            </Button>

          </div>

        ))}

      </div>
    </>
  )}

  {/* Selected packages summary */}

  <div className="max-w-xl mx-auto text-center border rounded-lg p-6">

    <h3 className="text-xl font-semibold mb-4">
      Selected Packages
    </h3>

    <p className="mb-2">
      Veg: {selectedVegPackage ? selectedVegPackage.name : "Not selected"}
    </p>

    <p className="mb-4">
      Non Veg: {selectedNonVegPackage ? selectedNonVegPackage.name : "Not selected"}
    </p>

    <Button
      size="lg"
      onClick={handleSubmit}
    >
      Proceed to WhatsApp
    </Button>

  </div>

</div>

);
};

export default Packages;
