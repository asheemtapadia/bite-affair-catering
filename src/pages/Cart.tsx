import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

// ✅ NEW FIELDS
const [firstName,setFirstName] = useState("");
const [address,setAddress] = useState("");
const [apartment,setApartment] = useState("");
const [city,setCity] = useState("");
const [userState,setUserState] = useState("");
const [pin,setPin] = useState("");
const [phone,setPhone] = useState("");

const [date,setDate] = useState("");
const [time,setTime] = useState("");

useEffect(() => {
  window.scrollTo(0,0);
  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCart(savedCart);
}, []);

const removeItem = (id:number) => {
const updated = cart.filter((item) => item.id !== id);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
window.dispatchEvent(new Event("cartUpdated"));
};

const updateRequest = (id:number,value:string) => {
const updated = cart.map((item)=>
item.id === id ? {...item, request:value} : item
);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

const total = cart.reduce((sum,item)=> sum + item.price,0);

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  alert("Please fill all details");
  return;
}

/* ✅ UPDATED MESSAGE WITH DISHES */
const message = cart.map((item) => {
  const dishes = item.selectedItems
    ? Object.entries(item.selectedItems)
        .map(([cat, items]: any) => `${cat}: ${items.join(", ")}`)
        .join("\n")
    : "";

  return `• ${item.name} (₹${item.price})

${dishes}

Request: ${item.request || "None"}`;
}).join("\n\n");

const text = encodeURIComponent(
`Hi Bite Affair,

I'd like to order:

${message}

👤 Name: ${firstName}
📞 Phone: ${phone}

📍 Address:
${address}
${apartment ? apartment : ""}
${city}, ${userState} - ${pin}

📅 Date: ${date}
⏰ Time: ${time}

💰 Total: ₹${total}

Please confirm.`
);

window.open(`https://wa.me/919211570030?text=${text}`,"_blank");
};

return (
<div className="min-h-screen bg-[#faf9f7]">

  <Header />

  <div className="container mx-auto px-4 py-28 max-w-3xl">

    <h1 className="text-3xl font-serif font-semibold mb-8">
      Your Cart
    </h1>

    {cart.length === 0 && (
      <p className="text-muted-foreground">
        Your cart is empty.
      </p>
    )}

    <div className="space-y-5">

      {cart.map((item)=>(
        <div
          key={item.id}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm"
        >

          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-semibold text-lg">
                {item.name}
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                ₹{item.price} / person
              </p>

              {/* ✅ SHOW SELECTED DISHES */}
              {item.selectedItems && (
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  {Object.entries(item.selectedItems).map(([cat, items]: any) => (
                    <div key={cat}>
                      <span className="font-medium">{cat}:</span>{" "}
                      {items.join(", ")}
                    </div>
                  ))}
                </div>
              )}

            </div>

            <Button
              variant="outline"
              onClick={()=>removeItem(item.id)}
            >
              Remove
            </Button>

          </div>

          <textarea
            placeholder="Special request (spice level, timing, extras...)"
            className="w-full border rounded-lg p-3 text-sm mt-4"
            value={item.request || ""}
            onChange={(e)=>updateRequest(item.id,e.target.value)}
          />

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">

        {/* TOTAL */}
        <div className="flex justify-between mb-6">
          <span className="text-lg font-medium">Total</span>
          <span className="text-lg font-semibold text-primary">
            ₹{total}
          </span>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="Address"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="Apartment, suite, etc."
            value={apartment}
            onChange={(e)=>setApartment(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="State"
            value={userState}
            onChange={(e)=>setUserState(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="PIN Code"
            value={pin}
            onChange={(e)=>setPin(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <input
            placeholder="Phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="w-full border border-gray-200 p-4 rounded-xl"
          />

          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e)=>setDate(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input
              type="time"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
          </div>

        </div>

        <div className="mt-6">
          <button
            onClick={whatsappOrder}
            className="w-full py-4 rounded-xl text-white text-base font-medium bg-primary"
          >
            Order on WhatsApp
          </button>
        </div>

      </div>

    )}

  </div>

  <Footer />

</div>
);
};

export default Cart;
