import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

// FIELDS
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
  window.scrollTo({ top: 0, behavior: "smooth" });

  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (Array.isArray(savedCart)) {
    setCart(savedCart);
  } else if (savedCart) {
    setCart([savedCart]);
  }

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

// ✅ TOTAL FIX (item based guests)
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * (item.guests || 1));
},0);

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

// ✅ VALIDATION
if(pin.length !== 6){
  toast.error("Enter valid 6 digit PIN");
  return;
}

if(phone.length !== 10){
  toast.error("Enter valid 10 digit phone");
  return;
}

const message = cart.map((item) => {

  const dishes = item.selectedItems
    ? Object.entries(item.selectedItems)
        .map(([cat, items]: any) => {
          const cleanCat = cat.replace(/\(.*?\)/g, "").trim();
          return `• ${cleanCat}: ${items.join(", ")}`;
        })
        .join("\n")
    : "";

  return `✨ ${item.name} (₹${item.price})

${dishes}

👥 Guests: ${item.guests}

💰 Subtotal: ₹${Number(item.price) * (item.guests || 1)}

📝 Request: ${item.request || "None"}`;
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

  <div className="container mx-auto px-4 pt-28 pb-40 max-w-3xl">

    <h1 className="text-4xl font-serif font-semibold mb-10 tracking-tight">
      Your Cart
    </h1>

    {cart.length === 0 && (
      <p className="text-muted-foreground">
        Your cart is empty.
      </p>
    )}

    <div className="space-y-6">

      {cart.map((item)=>(
        <div
          key={item.id}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_25px_70px_rgba(0,0,0,0.08)] backdrop-blur"
        >

          <div className="flex justify-between items-start">

            <div className="w-full">
              <h3 className="font-semibold text-xl text-gray-900">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                ₹{item.price} / person
              </p>

              {/* ✅ FIXED GUEST DISPLAY */}
              <p className="text-sm mt-3 text-gray-700">
                👥 {item.guests} guests
              </p>

              {/* SUBTOTAL */}
              <p className="text-sm text-orange-500 mt-2 font-medium">
                ₹{Number(item.price) * (item.guests || 1)} total
              </p>

              <div className="mt-3 h-[1px] bg-gray-100"></div>

              {item.selectedItems && (
                <div className="mt-4 space-y-4">
                  {Object.entries(item.selectedItems).map(([cat, items]: any) => {
                    const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

                    return (
                      <div key={cat}>
                        <p className="text-xs text-gray-400 uppercase mb-2">
                          {cleanCat}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {items.map((dish:string)=>(
                            <span
                              key={dish}
                              className="px-3 py-1.5 text-xs bg-orange-50 text-orange-600 rounded-full border border-orange-100"
                            >
                              {dish}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            <button
              onClick={()=>removeItem(item.id)}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-400 hover:text-red-500 transition"
            >
              Remove
            </button>

          </div>

          <textarea
            placeholder="Special request"
            className="w-full border border-gray-200 rounded-xl p-4 text-sm mt-5"
            value={item.request || ""}
            onChange={(e)=>updateRequest(item.id,e.target.value)}
          />

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_25px_80px_rgba(0,0,0,0.08)]">

        {/* TOTAL */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-lg font-medium">Total</span>
          <span className="text-2xl font-bold text-orange-500">
            ₹{total}
          </span>
        </div>

        {/* FORM */}
        <div className="space-y-5">

          <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-4 rounded-xl"/>

          {/* ✅ PIN FIX */}
          <input
            placeholder="PIN Code"
            value={pin}
            maxLength={6}
            onChange={(e)=>{
              const val = e.target.value.replace(/\D/g,"");
              setPin(val);
            }}
            className="w-full border p-4 rounded-xl"
          />

          {/* ✅ PHONE FIX */}
          <input
            placeholder="Phone"
            value={phone}
            maxLength={10}
            onChange={(e)=>{
              const val = e.target.value.replace(/\D/g,"");
              setPhone(val);
            }}
            className="w-full border p-4 rounded-xl"
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
            <p className="text-xs text-orange-500 mt-1">
              Orders after 4:30 PM → next day delivery
            </p>
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input
              type="time"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
            <p className="text-xs text-gray-400 mt-1">
              5 hrs lead time applies
            </p>
          </div>

        </div>

        <div className="mt-6">
          <button
            onClick={whatsappOrder}
            className="w-full py-4 rounded-xl text-white bg-orange-500"
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
