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

/* ✅ TOTAL FIX (PER ITEM GUESTS) */
const total = cart.reduce((sum,item)=> {
  return sum + (Number(item.price) * Number(item.guests || 0));
},0);

/* ✅ VALIDATIONS */
const isValidPhone = /^[0-9]{10}$/.test(phone);
const isValidPin = /^[0-9]{6}$/.test(pin);

/* ✅ DATE + TIME LOGIC */
const isValidDateTime = () => {
  if(!date || !time) return false;

  const selected = new Date(`${date}T${time}`);
  const now = new Date();

  // 5 hr lead time
  const minTime = new Date(now.getTime() + (5 * 60 * 60 * 1000));

  if(selected < minTime) return false;

  // after 4:30 → next day only
  const today430 = new Date();
  today430.setHours(16,30,0,0);

  if(now > today430){
    const selectedDate = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0,0,0,0);

    if(selectedDate < tomorrow) return false;
  }

  return true;
};

const whatsappOrder = () => {

if(!firstName || !address || !city || !userState || !pin || !phone || !date || !time){
  toast.error("Please fill all details");
  return;
}

if(!isValidPhone){
  toast.error("Invalid phone number");
  return;
}

if(!isValidPin){
  toast.error("Invalid PIN code");
  return;
}

if(!isValidDateTime()){
  toast.error("Invalid delivery time (min 5 hrs / after 4:30 next day)");
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

          <div className="flex justify-between">

            <div>
              <h3 className="font-semibold text-xl">{item.name}</h3>
              <p className="text-sm text-gray-500">₹{item.price} / person</p>

              {/* ✅ FIXED */}
              <p className="text-sm text-blue-500 mt-1">
                👥 {item.guests} guests
              </p>

              <p className="text-orange-500 font-medium mt-1">
                ₹{Number(item.price) * Number(item.guests)} total
              </p>
            </div>

            <button onClick={()=>removeItem(item.id)}>Remove</button>

          </div>

          {item.selectedItems && (
            <div className="mt-4">
              {Object.entries(item.selectedItems).map(([cat, items]: any) => (
                <div key={cat}>
                  <p className="text-xs text-gray-400">{cat}</p>
                  {items.map((dish:string)=>(
                    <span key={dish}>{dish}</span>
                  ))}
                </div>
              ))}
            </div>
          )}

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-12 bg-white p-8 rounded-3xl border">

        <div className="flex justify-between mb-8">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <div className="space-y-5">

          <input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />

          <input placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} />

          <input placeholder="Apartment" value={apartment} onChange={(e)=>setApartment(e.target.value)} />

          <input placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)} />

          <input placeholder="State" value={userState} onChange={(e)=>setUserState(e.target.value)} />

          <input placeholder="PIN Code" value={pin} onChange={(e)=>setPin(e.target.value.replace(/\D/g,''))} />

          <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value.replace(/\D/g,''))} />

          <div>
            <p>Delivery Date</p>
            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
            <p className="text-orange-500 text-sm">
              Orders after 4:30 PM → next day delivery
            </p>
          </div>

          <div>
            <p>Delivery Time</p>
            <input type="time" value={time} onChange={(e)=>setTime(e.target.value)} />
            <p className="text-gray-500 text-sm">
              Minimum 5 hrs lead time
            </p>
          </div>

        </div>

        <button onClick={whatsappOrder}>
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
