// SAME IMPORTS

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

// FORM
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
  setCart(Array.isArray(savedCart) ? savedCart : [savedCart]);

}, []);

const removeItem = (id:number) => {
const updated = cart.filter((item) => item.id !== id);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

const updateRequest = (id:number,value:string) => {
const updated = cart.map((item)=>
item.id === id ? {...item, request:value} : item
);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

// ✅ TOTAL (per item guest use karega)
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests || 0));
},0);

// ✅ TIME SLOTS
const timeSlots = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
  "05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM"
];

// ✅ DISABLE LOGIC
const isSlotDisabled = (slot:string) => {
  if (!date) return false;

  const now = new Date();
  const selectedDate = new Date(date);

  // future date → sab enable
  if (selectedDate.toDateString() !== now.toDateString()) {
    return false;
  }

  const [timeStr, meridian] = slot.split(" ");
  let [hours, minutes] = timeStr.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const slotTime = new Date();
  slotTime.setHours(hours, minutes, 0, 0);

  const diffHours = (slotTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  return diffHours < 5; // 5 hr rule
};

// ✅ WHATSAPP
const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

const now = new Date();
const afterCutoff = now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 30);

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

💰 Subtotal: ₹${Number(item.price) * Number(item.guests)}

📝 Request: ${item.request || "None"}`;
}).join("\n\n");

const text = encodeURIComponent(
`Hi Bite Affair,

I'd like to order:

${message}

${afterCutoff ? "⚠️ Order placed after 4:30 PM. Delivery will be next day.\n" : ""}

👤 Name: ${firstName}
📞 Phone: ${phone}

📍 Address:
${address}
${apartment || ""}
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

    <h1 className="text-4xl font-serif font-semibold mb-10">
      Your Cart
    </h1>

    <div className="space-y-6">

      {cart.map((item)=>(
        <div key={item.id} className="bg-white p-6 rounded-3xl border">

          <h3 className="font-semibold text-xl">{item.name}</h3>

          <p className="text-sm text-gray-500 mt-1">
            ₹{item.price} / person
          </p>

          <p className="mt-2 text-blue-600">
            👥 {item.guests} guests
          </p>

          <p className="text-orange-500 mt-1 font-medium">
            ₹{Number(item.price) * Number(item.guests)} total
          </p>

        </div>
      ))}

    </div>

    {/* FORM */}
    <div className="mt-12 bg-white p-8 rounded-3xl border">

      <div className="flex justify-between mb-6">
        <span>Total</span>
        <span className="text-xl font-bold text-orange-500">₹{total}</span>
      </div>

      <div className="space-y-4">

        <input placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <input placeholder="Address" onChange={(e)=>setAddress(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <input placeholder="City" onChange={(e)=>setCity(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <input placeholder="State" onChange={(e)=>setUserState(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <input placeholder="PIN Code" onChange={(e)=>setPin(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} className="w-full border p-4 rounded-xl"/>

        <div>
          <p className="text-sm mb-1">Delivery Date</p>
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="w-full border p-4 rounded-xl"/>

          {/* ✅ 4:30 RULE MESSAGE */}
          <p className="text-xs text-gray-500 mt-2">
            Orders placed after 4:30 PM will be delivered next day
          </p>
        </div>

        <div>
          <p className="text-sm mb-1">Delivery Time</p>

          <select
            value={time}
            onChange={(e)=>setTime(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option value="">Select time (5 hrs lead time applies)</option>

            {timeSlots.map((slot)=>(
              <option key={slot} value={slot} disabled={isSlotDisabled(slot)}>
                {slot}
              </option>
            ))}

          </select>
        </div>

      </div>

      <button
        onClick={whatsappOrder}
        className="w-full mt-6 py-4 rounded-xl bg-orange-500 text-white"
      >
        Order on WhatsApp
      </button>

    </div>

  </div>

  <Footer />

</div>
);
};

export default Cart;
