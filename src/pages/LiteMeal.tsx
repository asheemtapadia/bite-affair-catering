import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LiteMeal = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const menu = {
    dal: {
      img: "/images/lite-meal/dal.jpg",
      items: ["Dal Tadka", "Dal Makhani", "Dal Panchmel"]
    },
    paneer: {
      img: "/images/lite-meal/paneer.jpg",
      items: ["Paneer Butter Masala", "Paneer Lababdar", "Matar Paneer", "Shahi Paneer"]
    },
    veg: {
      img: "/images/lite-meal/veg.jpg",
      items: ["Mix Veg", "Tawa Veg", "Kadhai Veg", "Aloo Gobhi"]
    },
    rice: {
      img: "/images/lite-meal/rice.jpg",
      items: ["Plain Rice", "Jeera Rice", "Peas Pulao", "Veg Fried Rice"]
    },
    dessert: {
      img: "/images/lite-meal/dessert.jpg",
      items: ["Gulab Jamun", "Rasgulla"]
    }
  };

  const [dal, setDal] = useState("Dal Tadka");
  const [paneer, setPaneer] = useState("Paneer Butter Masala");
  const [veg, setVeg] = useState("Mix Veg");
  const [rice, setRice] = useState("Plain Rice");
  const [dessert, setDessert] = useState("Gulab Jamun");
  const [bread, setBread] = useState("Lachha Paratha");

  const [pax, setPax] = useState(15);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");

  const total = pax * 300;

  const quantity = (pax * 0.1).toFixed(1);

  const riceQty =
    rice === "Plain Rice" || rice === "Jeera Rice"
      ? ((pax / 15) * 2).toFixed(1)
      : ((pax / 15) * 1).toFixed(1);

  const dessertQty = pax * 2;
  const rotiQty = pax;

  const handleOrder = () => {

    if (!name || !address || !date || !time) {
      setError("Complete all details to proceed");
      setTimeout(() => setError(""), 2500);
      return;
    }

    const text = encodeURIComponent(
`Bite Affair Lite Box Order

👤 Name: ${name}
📍 Address: ${address}

📅 Date: ${date}
⏰ Time: ${time}

👥 Guests: ${pax}

🍲 Dal: ${dal} (${quantity} kg)
🧀 Paneer: ${paneer} (${quantity} kg)
🥦 Veg: ${veg} (${quantity} kg)
🍚 Rice: ${rice} (${riceQty} ltr)
🍰 Dessert: ${dessert} (${dessertQty} pcs)

🥖 Bread: ${bread} (${rotiQty} pcs)
🥗 Raita & Salad: Included

💰 Total: ₹${total}`
);

    window.open(`https://wa.me/919211570030?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-40">

      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/90 backdrop-blur-md border border-red-200 text-red-600 px-5 py-3 rounded-full shadow-xl text-sm font-medium">
            {error}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden">
        <img
          src="/images/lite-meal/litebox-hero.jpg"
          alt="Lite Box"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Bite Affair Lite Box
          </h1>

          <p className="text-sm text-white/90 mt-2">
            ₹300 per person
          </p>

          <div className="w-14 h-[2px] bg-orange-400 my-3 rounded-full" />

          <p className="text-xs tracking-[4px] text-orange-300 uppercase">
            Simplicity is Luxury
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mt-6 ml-4 text-sm text-gray-500"
        >
          ← Back
        </button>

        {/* GUEST */}
        <div className="px-5 mt-8 mb-10">
          <h2 className="text-sm text-gray-500 mb-4 text-center">
            Number of Guests
          </h2>

          <div className="flex justify-center">
            <select
              value={pax}
              onChange={(e) => setPax(Number(e.target.value))}
              className="w-52 px-5 py-3 rounded-2xl border"
            >
              {Array.from({ length: 36 }, (_, i) => i + 15).map((num) => (
                <option key={num} value={num}>
                  {num} Guests
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MENU + OTHER SAME (unchanged) */}

        <div className="px-5 mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>

        {/* ORDER BUTTON */}
        <div className="fixed bottom-20 left-0 right-0 px-5">
          <button
            onClick={handleOrder}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl"
          >
            Order on WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
};

export default LiteMeal;
