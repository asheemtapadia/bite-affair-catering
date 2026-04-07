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

  if (Array.isArray(savedCart)) setCart(savedCart);
  else if (savedCart) setCart([savedCart]);

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

// ✅ TOTAL (guests from menu)
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * (item.guests || 0));
},0);

// ✅ TIME SLOTS
const timeSlots = [
"09:00","10:00","11:00","12:00",
"13:00","14:00","15:00","16:00",
"17:00","18:00","19:00","20:00","21:00"
];

const isToday = (selected:string) => {
  const today = new Date().toISOString().split("T")[0];
  return selected === today;
};

const getDisabledSlots = () => {
  if(!date) return [];

  const now = new Date();

  // 4:30 rule
  if(isToday(date)){
    const cutoff = new Date();
    cutoff.setHours(16,30,0);

    if(now > cutoff){
      return timeSlots; // all disabled
    }

    // 5 hr lead
    const lead = new Date(now.getTime() + 5*60*60*1000);

    return timeSlots.filter((slot)=>{
      const [h,m] = slot.split(":");
      const slotDate = new Date();
      slotDate.setHours(Number(h),Number(m),0);
      return slotDate < lead;
    });
  }

  return [];
};

// ✅ ORDER
const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Fill all fields");
  return;
}

if(pin.length !== 6){
  toast.error("Invalid PIN");
  return;
}

if(phone.length !== 10){
  toast.error("Invalid Phone");
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

💰 Subtotal: ₹${Number(item.price) * (item.guests || 0)}

📝 Request: ${item.request || "None"}`;
}).join("\n\n");

const text = encodeURIComponent(
`Hi Bite Affair,

${message}

👤 ${firstName}
📞 ${phone}

📍 ${address}
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

<h1 className="text-4xl font-serif mb-10">Your Cart</h1>

{cart.map((item)=>(
<div key={item.id} className="bg-white p-6 rounded-3xl border">

<h3>{item.name}</h3>
<p>₹{item.price} / person</p>

<p>👥 {item.guests} guests</p>
<p>₹{Number(item.price) * (item.guests || 0)} total</p>

{/* dishes */}
{item.selectedItems && (
<div>
{Object.entries(item.selectedItems).map(([cat, items]: any)=>(
<div key={cat}>
<p>{cat}</p>
{items.map((dish:string)=>(
<span key={dish}>{dish}</span>
))}
</div>
))}
</div>
)}

<button onClick={()=>removeItem(item.id)}>Remove</button>

</div>
))}

{/* FORM */}
<div className="mt-10 space-y-4">

<input placeholder="Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />

<input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />

<input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />

<input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} />

{/* PIN */}
<input
placeholder="PIN"
value={pin}
maxLength={6}
onChange={(e)=>setPin(e.target.value.replace(/\D/g,""))}
/>

{/* PHONE */}
<input
placeholder="Phone"
value={phone}
maxLength={10}
onChange={(e)=>setPhone(e.target.value.replace(/\D/g,""))}
/>

{/* DATE */}
<div>
<input
type="date"
value={date}
min={new Date().toISOString().split("T")[0]}
onChange={(e)=>setDate(e.target.value)}
/>
<p style={{color:"orange"}}>After 4:30 PM → next day delivery</p>
</div>

{/* TIME */}
<select value={time} onChange={(e)=>setTime(e.target.value)}>
<option value="">Select time (5 hr lead)</option>

{timeSlots.map((slot)=>{
const disabled = getDisabledSlots().includes(slot);

return (
<option key={slot} value={slot} disabled={disabled}>
{slot}
</option>
);
})}

</select>

<button onClick={whatsappOrder}>Order</button>

</div>

</div>

<Footer />

</div>
);
};

export default Cart;
