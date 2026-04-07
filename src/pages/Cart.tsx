import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Cart = () => {

const navigate = useNavigate();

const [cart,setCart] = useState<any[]>([]);

/* FORM */
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
}, []);

/* REMOVE */
const removeItem = (id:number) => {
const updated = cart.filter((item) => item.id !== id);
setCart(updated);
localStorage.setItem("cart", JSON.stringify(updated));
};

/* TOTAL */
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests));
},0);

/* QTY */
const getItemQty = (dish: string, guests: number) => {

  const baseItem = Object.values(cart[0]?.selectedItems || {})
    .flat()
    .find((i: any) => i.includes(dish));

  if (!baseItem) return dish;

  const match = baseItem.match(/(\d+)\s*(pc|kg|ltr)/i);
  if (!match) return dish;

  const baseQty = Number(match[1]);
  const unit = match[2];

  const newQty = Math.round((baseQty * guests) / 20);

  return `${dish} – ${newQty} ${unit}`;
};

/* TIME SLOTS */
const getTimeSlots = () => {
  const slots:string[] = [];

  for(let h=9; h<=21; h++){
    const hour = h > 12 ? h - 12 : h;
    const ampm = h >= 12 ? "PM" : "AM";
    slots.push(`${hour}:00 ${ampm}`);
  }

  return slots;
};

/* DATE CHANGE LOGIC */
useEffect(() => {
  if(!date) return;

  const now = new Date();
  const today = new Date().toISOString().split("T")[0];

  const hr = now.getHours();
  const min = now.getMinutes();

  if(date === today && (hr > 16 || (hr === 16 && min >= 30))){
    toast.error("Orders after 4:30 PM will be delivered next day");
    setTime("");
    return;
  }

  const future = new Date(now.getTime() + (5 * 60 * 60 * 1000));
  let hour = future.getHours();

  if(hour < 9) hour = 9;
  if(hour > 21) hour = 21;

  const formatted = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? "PM" : "AM"}`;

  setTime(formatted);

  toast.success(`Earliest delivery: ${formatted}`);

}, [date]);

/* ORDER */
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

const message = cart.map((item) => {

  const dishes = Object.entries(item.selectedItems || {})
    .map(([cat, items]: any) => {
      const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

      const list = items.map((d:any)=>getItemQty(d,item.guests)).join(", ");

      return `• ${cleanCat}: ${list}`;
    })
    .join("\n");

  return `✨ ${item.name} (₹${item.price})

${dishes}

👥 Guests: ${item.guests}
💰 ₹${Number(item.price) * Number(item.guests)}
📝 ${item.request || "None"}`;
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
<button onClick={()=>navigate(-1)} className="mb-6 text-sm text-gray-500">
← Back
</button>

<h1 className="text-4xl font-serif mb-10">Your Cart</h1>

{/* ITEMS */}
{cart.map((item)=>(
<div key={item.id} className="bg-white p-6 rounded-3xl border mb-6 relative">

{/* REMOVE */}
<button
onClick={()=>removeItem(item.id)}
className="absolute top-4 left-4 flex items-center gap-1 text-red-500 font-medium bg-red-50 px-3 py-1.5 rounded-full border border-red-200"
>
✕ Remove
</button>

<h3 className="text-xl font-semibold mt-6">{item.name}</h3>

<p>₹{item.price} / person</p>

<p className="text-orange-500 font-medium">
₹{Number(item.price) * Number(item.guests)}
</p>

{/* MENU */}
{Object.entries(item.selectedItems || {}).map(([cat, items]: any) => {
const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

return (
<div key={cat} className="mt-3">
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
))}

{/* FORM */}
<div className="bg-white p-6 rounded-3xl border">

<div className="flex justify-between mb-4">
<span>Total</span>
<span className="font-bold">₹{total}</span>
</div>

<input placeholder="Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-3 mb-2"/>

<input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-3 mb-2"/>

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

{getTimeSlots().map((t)=>{

  const now = new Date();
  const today = new Date().toISOString().split("T")[0];

  let disabled = false;

  if(date === today){

    const [timeStr, ampm] = t.split(" ");
    let hour = Number(timeStr.split(":")[0]);

    if(ampm === "PM" && hour !== 12) hour += 12;
    if(ampm === "AM" && hour === 12) hour = 0;

    const slot = new Date();
    slot.setHours(hour,0,0,0);

    const diff = (slot.getTime() - now.getTime()) / (1000*60*60);

    if(diff < 5) disabled = true;
  }

  return <option key={t} disabled={disabled}>{t}</option>;

})}

</select>

<p className="text-xs text-gray-500">
Minimum 5 hours preparation time required
</p>

<button onClick={whatsappOrder} className="w-full mt-4 py-3 bg-orange-500 text-white rounded-xl">
Order on WhatsApp
</button>

</div>

</div>

<Footer />

</div>
);
};

export default Cart;
