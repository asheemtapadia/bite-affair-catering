import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

// ✅ FIELDS
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

/* ✅ TOTAL FIX (item-wise guests) */
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests || 0));
},0);

/* ✅ TIME SLOTS */
const timeSlots = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
  "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
  "05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM"
];

/* ✅ 5HR LOGIC */
const isSlotDisabled = (slot:string) => {
  if (!date) return false;

  const now = new Date();
  const selectedDate = new Date(date);

  if (selectedDate.toDateString() !== now.toDateString()) return false;

  const [timeStr, meridian] = slot.split(" ");
  let [hours] = timeStr.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  const slotTime = new Date();
  slotTime.setHours(hours,0,0,0);

  const diff = (slotTime.getTime() - now.getTime()) / (1000*60*60);

  return diff < 5;
};

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

/* ✅ PHONE + PIN VALIDATION */
if(!/^[0-9]{10}$/.test(phone)){
  toast.error("Enter valid phone");
  return;
}

if(!/^[0-9]{6}$/.test(pin)){
  toast.error("Enter valid PIN");
  return;
}

/* ✅ 4:30 RULE */
const now = new Date();
const afterCutoff = now.getHours() > 16 || 
(now.getHours() === 16 && now.getMinutes() >= 30);

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

💰 Subtotal: ₹${Number(item.price) * item.guests}

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

${afterCutoff ? "⚠️ Order placed after 4:30 PM, delivery will be next day\n" : ""}

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
      <p>Your cart is empty.</p>
    )}

    <div className="space-y-6">

      {cart.map((item)=>(
        <div key={item.id} className="bg-white p-6 rounded-3xl border shadow">

          <div className="flex justify-between">

            <div className="w-full">
              <h3 className="font-semibold text-xl">{item.name}</h3>

              <p className="text-sm mt-1">
                ₹{item.price} / person
              </p>

              {/* ✅ GUEST FIX */}
              <p className="mt-2 text-sm text-blue-600">
                👥 {item.guests} guests
              </p>

              {/* SUBTOTAL */}
              <p className="text-orange-500 mt-2 font-medium">
                ₹{Number(item.price) * item.guests} total
              </p>

              {/* ✅ DISHES */}
              {item.selectedItems && (
                <div className="mt-4 space-y-3">
                  {Object.entries(item.selectedItems).map(([cat, items]: any) => {
                    const cleanCat = cat.replace(/\(.*?\)/g, "").trim();
                    return (
                      <div key={cat}>
                        <p className="text-xs text-gray-400">{cleanCat}</p>
                        <div className="flex flex-wrap gap-2">
                          {items.map((dish:string)=>(
                            <span key={dish} className="px-3 py-1 text-xs bg-orange-50 text-orange-600 rounded-full">
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

            <button onClick={()=>removeItem(item.id)}>Remove</button>

          </div>

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-12 bg-white p-8 rounded-3xl border shadow">

        <div className="flex justify-between mb-8">
          <span>Total</span>
          <span className="text-orange-500 font-bold">₹{total}</span>
        </div>

        <div className="space-y-5">

          <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="PIN Code" value={pin} maxLength={6} onChange={(e)=>setPin(e.target.value)} className="w-full border p-4 rounded-xl"/>

          <input placeholder="Phone" value={phone} maxLength={10} onChange={(e)=>setPhone(e.target.value)} className="w-full border p-4 rounded-xl"/>

          {/* DATE */}
          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e)=>setDate(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
            <p className="text-xs text-orange-500 mt-2">
              Orders after 4:30 PM → next day delivery
            </p>
          </div>

          {/* TIME */}
          <div>
            <p className="text-sm mb-1">Delivery Time (5 hrs lead time)</p>

            <select
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              className="w-full border p-4 rounded-xl"
            >
              <option value="">Select time</option>

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
          className="w-full mt-6 py-4 bg-orange-500 text-white rounded-xl"
        >
          Order on WhatsApp
        </button>

      </div>

    )}

  </div>

  <Footer />

</div>
);
};

export default Cart;
