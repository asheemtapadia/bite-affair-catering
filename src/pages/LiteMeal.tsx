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
          <div className="bg-white/90 border border-red-200 text-red-600 px-5 py-3 rounded-full shadow-xl text-sm">
            {error}
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="relative w-full h-[240px] overflow-hidden">
        <img
          src="/images/lite-meal/litebox-hero.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mt-6 ml-4 text-sm text-gray-500"
        >
          ← Back
        </button>

        {/* GUEST */}
        <div className="px-5 mt-8 mb-10 text-center">
          <h2 className="text-sm text-gray-500 mb-4">
            Number of Guests
          </h2>

          <select
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="px-5 py-3 rounded-2xl border"
          >
            {Array.from({ length: 36 }, (_, i) => i + 15).map((num) => (
              <option key={num} value={num}>
                {num} Guests
              </option>
            ))}
          </select>
        </div>

        {/* MENU */}
        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="px-5 mb-10">

              <img
                src={value.img}
                className="w-full h-32 object-cover rounded-2xl mb-4"
              />

              <h2 className="mb-3 flex justify-between">
                <span>Select {key}</span>
                <span className="text-orange-600">
                  {key === "rice" && `${riceQty} ltr`}
                  {key === "dessert" && `${dessertQty} pcs`}
                  {(key !== "rice" && key !== "dessert") && `${quantity} kg`}
                </span>
              </h2>

              <div className="flex flex-wrap gap-3">
                {items.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      if (key === "dal") setDal(item);
                      if (key === "paneer") setPaneer(item);
                      if (key === "veg") setVeg(item);
                      if (key === "rice") setRice(item);
                      if (key === "dessert") setDessert(item);
                    }}
                    className="px-4 py-2 rounded-full border"
                  >
                    {item}
                  </button>
                ))}
              </div>

            </div>
          );
        })}

        {/* FORM */}
        <div className="px-5 space-y-4 mb-12">
          <input placeholder="Name" className="w-full border p-4 rounded-xl" onChange={(e) => setName(e.target.value)} />
          <input placeholder="Address" className="w-full border p-4 rounded-xl" onChange={(e) => setAddress(e.target.value)} />
          <input type="date" className="w-full border p-4 rounded-xl" onChange={(e) => setDate(e.target.value)} />
          <input type="time" className="w-full border p-4 rounded-xl" onChange={(e) => setTime(e.target.value)} />
        </div>

        <div className="px-5 mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>

        {/* ORDER */}
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
