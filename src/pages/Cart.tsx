import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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

/* TOTAL */
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests || 0));
},0);

/* TIME SLOTS */
const timeSlots = [
"09:00 AM","10:00 AM","11:00 AM","12:00 PM",
"01:00 PM","02:00 PM","03:00 PM","04:00 PM",
"05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM"
];

/* 4:30 RULE */
const isAfterCutoff = () => {
  const now = new Date();
  return now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 30);
};

/* SLOT DISABLE */
const isSlotDisabled = (slot:string) => {
  if (!date) return true;

  const now = new Date();
  const selectedDate = new Date(date);

  const [timeStr, period] = slot.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const slotTime = new Date(selectedDate);
  slotTime.setHours(hours, minutes, 0, 0);

  if (selectedDate.toDateString() === now.toDateString()) {
    const minTime = new Date(now.getTime() + 5 * 60 * 60 * 1000);
    return slotTime < minTime;
  }

  return false;
};

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details", {
    description: "All fields are required before placing order",
  });
  return;
}

let extraNote = "";

if(isAfterCutoff()){
  extraNote = "\n⚠️ Orders placed after 4:30 PM will be delivered next day.";
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

💰 Subtotal: ₹${Number(item.price) * Number(item.guests || 0)}

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
${extraNote}

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

    <div className="space-y-6">

      {cart.map((item)=>(
        <div
          key={item.id}
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow"
        >

          <div className="flex justify-between items-start">

            <div className="w-full">
              <h3 className="font-semibold text-xl text-gray-900">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                ₹{item.price} / person
              </p>

              <p className="text-sm text-blue-600 mt-2">
                👥 {item.guests} guests
              </p>

              <p className="text-sm text-orange-500 mt-2 font-medium">
                ₹{Number(item.price) * Number(item.guests || 0)} total
              </p>

              <div className="mt-3 h-[1px] bg-gray-100"></div>

              {/* ✅ IMPORTANT: SAME QTY FROM MENU */}
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

      <div className="mt-12 bg-white p-8 rounded-3xl border">

        <div className="flex justify-between items-center mb-8">
          <span>Total</span>
          <span className="text-2xl font-bold text-orange-500">
            ₹{total}
          </span>
        </div>

        <div className="space-y-5">

          <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="PIN Code" value={pin} onChange={(e)=>setPin(e.target.value)} className="w-full border p-4 rounded-xl"/>
          <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border p-4 rounded-xl"/>

          {/* DATE */}
          <div>
            <input 
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e)=>{ setDate(e.target.value); setTime(""); }}
              className="w-full border p-4 rounded-xl"
            />

            {isAfterCutoff() && (
              <p className="text-xs text-red-500 mt-1">
                Orders after 4:30 PM will be delivered next day
              </p>
            )}
          </div>

          {/* TIME */}
          <div>
            <select
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              className="w-full border p-4 rounded-xl"
            >
              <option value="">
                {isAfterCutoff()
                  ? "Select time (next day delivery)"
                  : "Select (5 hrs lead time applies)"}
              </option>

              {timeSlots.map((slot)=>(
                <option key={slot} value={slot} disabled={isSlotDisabled(slot)}>
                  {slot}
                </option>
              ))}
            </select>

            <p className="text-xs text-gray-400 mt-1">
              Minimum 5 hours advance booking required
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
