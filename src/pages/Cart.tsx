
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const Cart = () => {

const [cart,setCart] = useState<any[]>([]);

useEffect(() => {
const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
setCart(savedCart);
}, []);

const removeItem = (slug:string) => {

const updated = cart.filter((item) => item.slug !== slug);

setCart(updated);

localStorage.setItem("cart", JSON.stringify(updated));

};

const whatsappOrder = () => {

const message = cart.map(
  (item)=>`• ${item.name} (₹${item.price})`
).join("\n");

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
      <p className="text-muted-foreground">
        Your cart is empty.
      </p>
    )}

    <div className="space-y-4">

      {cart.map((item)=>(
        <div
          key={item.slug}
          className="border p-4 rounded-lg flex justify-between items-center"
        >
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
            onClick={()=>removeItem(item.slug)}
          >
            Remove
          </Button>

        </div>
      ))}

    </div>

    {cart.length > 0 && (

      <div className="mt-10">

        <Button
          size="lg"
          onClick={whatsappOrder}
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
