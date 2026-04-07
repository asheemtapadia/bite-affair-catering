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

/* ❌ REMOVE GLOBAL GUESTS (NOW COMES FROM ITEM) */

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

/* ✅ TOTAL FIX (USE item.guests) */
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests));
},0);

/* ✅ TIME SLOTS GENERATION (NO PAST TIME) */
const getTimeSlots = () => {
  const slots:any[] = [];
  const now = new Date();

  for(let h=9; h<=21; h++){
    for(let m=0; m<60; m+=30){

      const slot = new Date();
      slot.setHours(h,m,0,0);

      // ❌ skip past time
      if(date === new Date().toISOString().split("T")[0]){
        if(slot <= now) continue;
      }

      // ❌ skip <5hr lead
      const diff = (slot.getTime() - now.getTime())/(1000*60*60);
      if(diff < 5) continue;

      const formatted = slot.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"});
      slots.push(formatted);
    }
  }

  return slots;
};

const whatsappOrder = () => {

/* ✅ BASIC VALIDATION */
if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

/* ✅ PIN VALIDATION */
if(!/^[0-9]{6}$/.test(pin)){
  toast.error("Enter valid 6 digit PIN");
  return;
}

/* ✅ PHONE VALIDATION */
if(!/^[6-9][0-9]{9}$/.test(phone)){
  toast.error("Enter valid phone number");
  return;
}

/* ✅ 4:30 RULE */
const now = new Date();
const today = new Date().toISOString().split("T")[0];

if(date === today){
  const hr = now.getHours();
  const min = now.getMinutes();

  if(hr > 16 || (hr === 16 && min >= 30)){
    toast.error("Orders after 4:30 PM are for next day");
    return;
  }
}

/* ✅ FINAL MESSAGE */
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
        <div key={item.id} className="bg-white p-6 rounded-3xl border shadow">

          <div className="flex justify-between items-start">

            <div className="w-full">
              <h3 className="font-semibold text-xl">{item.name}</h3>

              <p className="text-sm text-gray-500">
                ₹{item.price} / person
              </p>

              {/* ✅ GUEST FIX */}
              <p className="text-blue-500 mt-2">
                👥 {item.guests} guests
              </p>

              <p className="text-orange-500 font-medium">
                ₹{Number(item.price) * Number(item.guests)} total
              </p>

              {/* MENU */}
              {item.selectedItems && (
                <div className="mt-4 space-y-3">
                  {Object.entries(item.selectedItems).map(([cat, items]: any) => {
                    const cleanCat = cat.replace(/\(.*?\)/g, "").trim();

                    return (
                      <div key={cat}>
                        <p className="text-xs text-gray-400 uppercase">
                          {cleanCat}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-1">
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

            <button onClick={()=>removeItem(item.id)}>
              Remove
            </button>

          </div>

          <textarea
            placeholder="Special request"
            className="w-full border rounded-xl p-4 mt-4"
            value={item.request || ""}
            onChange={(e)=>updateRequest(item.id,e.target.value)}
          />

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-12 bg-white p-8 rounded-3xl border">

        <div className="flex justify-between mb-6">
          <span>Total</span>
          <span className="text-xl font-bold">₹{total}</span>
        </div>

        {/* FORM */}
        <div className="space-y-4">

          <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-3 rounded"/>

          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full border p-3 rounded"/>

          <input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} className="w-full border p-3 rounded"/>

          <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} className="w-full border p-3 rounded"/>

          <input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} className="w-full border p-3 rounded"/>

          {/* ✅ ONLY NUMBER INPUT */}
          <input type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="PIN Code" value={pin} maxLength={6} onChange={(e)=>setPin(e.target.value.replace(/\D/g,""))} className="w-full border p-3 rounded"/>

          <input type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="Phone" value={phone} maxLength={10} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,""))} className="w-full border p-3 rounded"/>

          {/* DATE */}
          <div>
            <p>Delivery Date</p>
            <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={(e)=>setDate(e.target.value)} className="w-full border p-3 rounded"/>
            <p className="text-orange-500 text-sm mt-1">
              Orders after 4:30 PM → next day delivery
            </p>
          </div>

          {/* TIME */}
          <div>
            <p>Delivery Time</p>

            <select value={time} onChange={(e)=>setTime(e.target.value)} className="w-full border p-3 rounded">
              <option value="">Select time</option>
              {getTimeSlots().map((t)=>(
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-1">
              Minimum 5 hrs lead time
            </p>
          </div>

        </div>

        <button onClick={whatsappOrder} className="w-full mt-6 py-3 bg-orange-500 text-white rounded">
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
