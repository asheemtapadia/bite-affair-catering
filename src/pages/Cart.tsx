import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { saveOrder } from "@/utils/saveOrder";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

useEffect(() => {

  // always open cart from top
  window.scrollTo(0,0);

  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCart(savedCart);

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

const whatsappOrder = () => {

const message = cart.map(
(item)=>`• ${item.name} (₹${item.price})
Request: ${item.request || "None"}`
).join("\n\n");

const text = encodeURIComponent(

`Hi Bite Affair,

I'd like to order these packages:

${message}

Please confirm availability.`
);

window.open(`https://wa.me/919211570030?text=${text}`,"_blank");

};

return (
<div className="min-h-screen">

  <Header />

  <div className="container mx-auto px-4 py-32 max-w-3xl">

    <h1 className="text-3xl font-bold mb-10">
      Your Cart
    </h1>

    {cart.length === 0 && (
      <>
      <p className="text-muted-foreground">
        Your cart is empty.
      </p>

      <button
        onClick={saveOrder}
        style={{
          background:"#ff6b00",
          color:"white",
          padding:"12px 20px",
          borderRadius:"8px",
          border:"none",
          marginTop:"20px"
        }}
      >
        Test Order
      </button>
      </>
    )}

    <div className="space-y-4">

      {cart.map((item)=>(
        <div
          key={item.id}
          className="border p-4 rounded-lg flex flex-col gap-3 transition-all duration-300 hover:shadow-md"
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { saveOrder } from "@/utils/saveOrder";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);
const [customerName,setCustomerName] = useState("");
const [phone,setPhone] = useState("");

useEffect(() => {

  // always open cart from top
  window.scrollTo(0,0);

  const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setCart(savedCart);

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

const whatsappOrder = () => {

const message = cart.map(
(item)=>`• ${item.name} (₹${item.price})
Request: ${item.request || "None"}`
).join("\n\n");

const text = encodeURIComponent(

`Hi Bite Affair,

I'd like to order these packages:

${message}

Please confirm availability.`
);

window.open(`https://wa.me/919211570030?text=${text}`,"_blank");

};

const handlePlaceOrder = () => {

if(!customerName || !phone){
  alert("Please enter name and phone");
  return;
}

const total = cart.reduce((sum,item)=> sum + item.price,0);

const orderData = {
  customer_name: customerName,
  phone: phone,
  package_name: cart.map(i=>i.name).join(", "),
  persons: cart.length,
  total_price: total,
  status: "pending"
};

saveOrder(orderData);

};

return (
<div className="min-h-screen">

  <Header />

  <div className="container mx-auto px-4 py-32 max-w-3xl">

    <h1 className="text-3xl font-bold mb-10">
      Your Cart
    </h1>

    {cart.length === 0 && (
      <p className="text-muted-foreground">
        Your cart is empty.
      </p>
    )}

    <div className="space-y-4">

      {cart.map((item)=>(
        <div
          key={item.id}
          className="border p-4 rounded-lg flex flex-col gap-3 transition-all duration-300 hover:shadow-md"
        >

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                {item.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                ₹{item.price} / person
              </p>

            </div>

            <Button
              variant="outline"
              onClick={()=>removeItem(item.id)}
            >
              Remove
            </Button>

          </div>

          <textarea
            placeholder="Special request (spice level, delivery timing, extra plates etc.)"
            className="w-full border rounded-md p-2 text-sm"
            value={item.request || ""}
            onChange={(e)=>updateRequest(item.id,e.target.value)}
          />

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-10 space-y-3">

        <input
          placeholder="Your Name"
          value={customerName}
          onChange={(e)=>setCustomerName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <Button
          size="lg"
          onClick={handlePlaceOrder}
          className="w-full bg-orange-500 text-white"
        >
          Place Order
        </Button>

        <Button
          size="lg"
          variant="outline"
          onClick={whatsappOrder}
          className="w-full"
        >
          Order on WhatsApp
        </Button>

      </div>

    )}

  </div>

  <Footer />

</div>

);
};

export default Cart;
