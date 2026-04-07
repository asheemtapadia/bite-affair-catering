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
  window.scrollTo({ top: 0 });

  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (Array.isArray(savedCart)) setCart(savedCart);
  else if (savedCart) setCart([savedCart]);

}, []);

// REMOVE
const removeItem = (id:number) => {
const updated = cart.filter((item) => item.id !== id);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

// TOTAL
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests));
},0);

// 🔥 SAME LOGIC AS MENUDETAILS
const getItemQty = (item: string, guests:number) => {
  const name = item.split("–")[0].trim();

  const match = item.match(/(\d+)\s*(pc|kg|ltr)/i);
  if (!match) return name;

  const baseQty = Number(match[1]);
  const unit = match[2];

  const newQty = Math.round((baseQty * guests) / 20);

  return `${name} – ${newQty} ${unit}`;
};

// TIME SLOTS (FIXED HOURS)
const getTimeSlots = () => {
  const slots:string[] = [];
  const now = new Date();

  const selectedDate = date;
  const today = new Date().toISOString().split("T")[0];

  for(let h=9; h<=21; h++){

    const slot = new Date();
    slot.setHours(h,0,0,0);

    // ❌ past skip
    if(selectedDate === today && slot <= now) continue;

    // ❌ 5hr rule
    const diff = (slot.getTime() - now.getTime())/(1000*60*60);
    if(diff < 5) continue;

    const formatted = slot.toLocaleTimeString([], {
      hour:"2-digit",
      minute:"2-digit"
    });

    slots.push(formatted);
  }

  return slots;
};

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Fill all details");
  return;
}

if(!/^[0-9]{6}$/.test(pin)){
  toast.error("Invalid PIN");
  return;
}

if(!/^[6-9][0-9]{9}$/.test(phone)){
  toast.error("Invalid phone");
  return;
}

// 4:30 rule
const now = new Date();
const today = new Date().toISOString().split("T")[0];

if(date === today){
  const hr = now.getHours();
  const min = now.getMinutes();

  if(hr > 16 || (hr === 16 && min >= 30)){
    toast.error("After 4:30 PM → next day delivery");
    return;
  }
}

const message = cart.map((item) => {

  const dishes = item.selectedItems
    ? Object.entries(item.selectedItems)
        .map(([cat, items]: any) => {
          const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

          const list = items
            .map((d:any)=>getItemQty(d,item.guests))
            .join(", ");

          return `• ${cleanCat}: ${list}`;
        })
        .join("\n")
    : "";

  return `✨ ${item.name}

${dishes}

👥 ${item.guests} guests
💰 ₹${Number(item.price) * Number(item.guests)}`;
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

Total: ₹${total}`
);

window.open(`https://wa.me/919211570030?text=${text}`);
};

return (
<div className="min-h-screen bg-[#faf9f7]">

<Header />

<div className="container mx-auto px-4 pt-28 pb-40 max-w-3xl">

{/* BACK */}
<button onClick={()=>navigate(-1)} className="mb-6 text-sm text-gray-500">
← Back
</button>

<h1 className="text-4xl font-serif mb-8">Your Cart</h1>

{cart.map((item)=>(
<div key={item.id} className="bg-white p-6 rounded-2xl border mb-6">

<h3 className="text-xl font-semibold">{item.name}</h3>

<p className="text-sm text-gray-500">
₹{item.price} / person
</p>

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
{getItemQty(dish,item.guests)}
</span>
))}
</div>
</div>
);
})}
</div>
)}

<button
onClick={()=>removeItem(item.id)}
className="mt-3 text-red-500 text-sm"
>
Remove
</button>

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

<input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-3 mb-2"/>

<input type="tel" inputMode="numeric"
value={pin} maxLength={6}
onChange={(e)=>setPin(e.target.value.replace(/\D/g,""))}
placeholder="PIN"
className="w-full border p-3 mb-2"/>

<input type="tel" inputMode="numeric"
value={phone} maxLength={10}
onChange={(e)=>setPhone(e.target.value.replace(/\D/g,""))}
placeholder="Phone"
className="w-full border p-3 mb-2"/>

{/* DATE */}
<input
type="date"
value={date}
min={new Date().toISOString().split("T")[0]}
onChange={(e)=>setDate(e.target.value)}
className="w-full border p-3 mb-2"
/>

{/* TIME */}
<select value={time} onChange={(e)=>setTime(e.target.value)} className="w-full border p-3 mb-2">
<option value="">Select time</option>
{getTimeSlots().map((t)=>(
<option key={t}>{t}</option>
))}
</select>

<p className="text-xs text-gray-500">
5 hr lead time • after 4:30 → next day
</p>

<button
onClick={whatsappOrder}
className="w-full mt-4 py-3 bg-orange-500 text-white rounded"
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
