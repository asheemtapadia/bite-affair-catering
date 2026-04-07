import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Cart = () => {

const navigate = useNavigate();

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

  if (Array.isArray(savedCart)) setCart(savedCart);
  else if (savedCart) setCart([savedCart]);

}, []);

// REMOVE
const removeItem = (id:number) => {
const updated = cart.filter((item) => item.id !== id);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
window.dispatchEvent(new Event("cartUpdated"));
};

// REQUEST
const updateRequest = (id:number,value:string) => {
const updated = cart.map((item)=>
item.id === id ? {...item, request:value} : item
);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

// TOTAL
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests));
},0);

// ✅ FIXED QTY
const getItemQty = (dish: string, item: any) => {

  const baseItem = Object.values(item.selectedItems || {})
    .flat()
    .find((i: any) => i.includes(dish));

  if (!baseItem) return dish;

  const match = baseItem.match(/(\d+)\s*(pc|kg|ltr)/i);
  if (!match) return dish;

  const baseQty = Number(match[1]);
  const unit = match[2];

  const newQty = Math.round((baseQty * item.guests) / 20);

  return `${dish} – ${newQty} ${unit}`;
};

// TIME SLOTS (9AM - 9PM + 5hr logic)
const getTimeSlots = () => {
  const slots:any[] = [];
  const now = new Date();

  for(let h=9; h<=21; h++){

    const slot = new Date();
    slot.setHours(h,0,0,0);

    const diff = (slot.getTime() - now.getTime())/(1000*60*60);

    // same day → apply 5hr rule
    if(date === new Date().toISOString().split("T")[0]){
      if(diff < 5) continue;
    }

    slots.push(
      slot.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"})
    );
  }

  return slots;
};

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

// VALIDATION
if(!/^[0-9]{6}$/.test(pin)){
  toast.error("Enter valid PIN");
  return;
}

if(!/^[6-9][0-9]{9}$/.test(phone)){
  toast.error("Enter valid phone");
  return;
}

// 4:30 RULE
const now = new Date();
const today = new Date().toISOString().split("T")[0];

if(date === today){
  if(now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() >= 30)){
    toast.error("Orders after 4:30 PM will be delivered next day");
    return;
  }
}

// MESSAGE
const message = cart.map((item) => {

  const dishes = item.selectedItems
    ? Object.entries(item.selectedItems)
        .map(([cat, items]: any) => {
          const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

          const list = items.map((d:any)=>getItemQty(d,item)).join(", ");

          return `• ${cleanCat}: ${list}`;
        })
        .join("\n")
    : "";

  return `✨ ${item.name} (₹${item.price})

${dishes}

💰 Subtotal: ₹${Number(item.price) * Number(item.guests)}

📝 Request: ${item.request || "None"}`;
}).join("\n\n");

const text = encodeURIComponent(
`Hi Bite Affair,

${message}

👤 ${firstName}
📞 ${phone}

📍 ${address}
${apartment || ""}
${city}, ${userState} - ${pin}

📅 ${date}
⏰ ${time}

💰 Total: ₹${total}`
);

window.open(`https://wa.me/919211570030?text=${text}`,"_blank");
};

return (
<div className="min-h-screen bg-[#faf9f7]">

<Header />

<div className="container mx-auto px-4 pt-28 pb-40 max-w-3xl">

{/* BACK */}
<button onClick={()=>navigate(-1)} className="mb-6 text-gray-500">
← Back
</button>

<h1 className="text-4xl font-serif mb-10">Your Cart</h1>

{cart.map((item)=>(
<div key={item.id} className="bg-white p-6 rounded-2xl border mb-6 relative">

{/* ✅ FIXED REMOVE UI */}
<button
onClick={()=>removeItem(item.id)}
className="absolute top-5 left-5 flex items-center gap-1 text-red-600 font-semibold bg-white px-3 py-1.5 rounded-full border border-red-200 shadow-sm hover:bg-red-50 active:scale-95 transition"
>
✕ Remove
</button>

<h3 className="text-xl font-semibold mt-8">{item.name}</h3>

<p>₹{item.price} / person</p>

<p className="text-orange-500 font-medium">
₹{Number(item.price) * Number(item.guests)}
</p>

{/* MENU */}
{item.selectedItems && (
<div className="mt-4">
{Object.entries(item.selectedItems).map(([cat, items]: any) => {
const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

return (
<div key={cat} className="mb-2">
<p className="text-xs text-gray-400">{cleanCat}</p>

<div className="flex flex-wrap gap-2 mt-1">
{items.map((dish:string)=>(
<span key={dish} className="px-3 py-1 text-xs bg-orange-50 text-orange-600 rounded-full">
{getItemQty(dish,item)}
</span>
))}
</div>
</div>
);
})}
</div>
)}

<textarea
placeholder="Special request"
className="w-full border rounded p-3 mt-3"
value={item.request || ""}
onChange={(e)=>updateRequest(item.id,e.target.value)}
/>

</div>
))}

{/* FORM */}
<div className="bg-white p-6 rounded-2xl border">

<div className="flex justify-between mb-4">
<span>Total</span>
<span className="font-bold">₹{total}</span>
</div>

<input placeholder="Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="Apartment / Flat" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-3 mb-2"/>

<input type="tel" inputMode="numeric" value={pin} maxLength={6}
onChange={(e)=>setPin(e.target.value.replace(/\D/g,""))}
placeholder="PIN" className="w-full border p-3 mb-2"/>

<input type="tel" inputMode="numeric" value={phone} maxLength={10}
onChange={(e)=>setPhone(e.target.value.replace(/\D/g,""))}
placeholder="Phone" className="w-full border p-3 mb-2"/>

{/* DATE */}
<input type="date" value={date}
min={new Date().toISOString().split("T")[0]}
onChange={(e)=>setDate(e.target.value)}
className="w-full border p-3 mb-2"/>

<p className="text-xs text-gray-500 mb-2">
Orders after 4:30 PM will be delivered next day
</p>

{/* TIME */}
<select value={time} onChange={(e)=>setTime(e.target.value)} className="w-full border p-3 mb-2">
<option value="">Select time</option>
{getTimeSlots().map((t)=>(
<option key={t}>{t}</option>
))}
</select>

<p className="text-xs text-gray-500">
Minimum 5 hours preparation time required
</p>

<button onClick={whatsappOrder} className="w-full mt-4 py-3 bg-orange-500 text-white rounded">
Order on WhatsApp
</button>

</div>

</div>

<Footer />

</div>
);
};

export default Cart;
