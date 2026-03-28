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

  // ✅ NEW DELIVERY FIELDS
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [userState, setUserState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

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
    if (!firstName || !address || !city || !userState || !pin || !phone || !date || !time) {
      setError("Complete all details to proceed");
      setTimeout(() => setError(""), 2500);
      return;
    }

    const text = encodeURIComponent(
`Bite Affair Lite Box Order

👤 Name: ${firstName}
📞 Phone: ${phone}

📍 Address:
${address}
${apartment ? apartment : ""}
${city}, ${userState} - ${pin}

📅 Date: ${date}
⏰ Time: ${time}

👥 Guests: ${pax}

🍲 Dal: ${dal} (${quantity} kg)
🧀 Paneer: ${paneer} (${quantity} kg)
🥦 Veg: ${veg} (${quantity} kg)
🍚 Rice: ${rice} (${riceQty} ltr)
🍰 Dessert: ${dessert} (${dessertQty} pcs)

🥖 Bread: ${bread} (${rotiQty} pcs)
🥗 Raita & Salad: Complimentary

💰 Total: ₹${total}`
    );

    window.open(`https://wa.me/919211570030?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] pb-40">

      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white border text-red-600 px-5 py-3 rounded-full shadow text-sm">
            {error}
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <img src="/images/lite-meal/litebox-hero.jpg" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-semibold">Bite Affair Lite Box</h1>
          <p className="mt-2">₹300 per person</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">

        <button onClick={() => navigate(-1)} className="mt-6 ml-4 text-gray-500">
          ← Back
        </button>

        {/* GUEST */}
        <div className="px-5 mt-8 mb-10 text-center">
          <h2 className="text-gray-500 mb-4">Number of Guests</h2>

          <select
            value={pax}
            onChange={(e) => setPax(parseInt(e.target.value))}
            className="px-5 py-3 border rounded-xl"
          >
            {Array.from({ length: 36 }, (_, i) => i + 15).map((num) => (
              <option key={num} value={num}>
                {num} Guests
              </option>
            ))}
          </select>
        </div>

        {/* MENU */}
        {Object.entries(menu).map(([key, value]) => (
          <div key={key} className="px-5 mb-10">
            <img src={value.img} className="w-full h-32 rounded-xl object-cover mb-3" />

            <h2 className="flex justify-between mb-3">
              <span>Select {key}</span>
              <span className="text-orange-600 font-bold">
                {key === "rice" ? `${riceQty} ltr` :
                 key === "dessert" ? `${dessertQty} pcs` :
                 `${quantity} kg`}
              </span>
            </h2>

            <div className="flex flex-wrap gap-3">
              {value.items.map((item) => {
                const selected =
                  (key === "dal" && dal === item) ||
                  (key === "paneer" && paneer === item) ||
                  (key === "veg" && veg === item) ||
                  (key === "rice" && rice === item) ||
                  (key === "dessert" && dessert === item);

                return (
                  <button
                    key={item}
                    onClick={() => {
                      if (key === "dal") setDal(item);
                      if (key === "paneer") setPaneer(item);
                      if (key === "veg") setVeg(item);
                      if (key === "rice") setRice(item);
                      if (key === "dessert") setDessert(item);
                    }}
                    className={`px-4 py-2 rounded-full border ${
                      selected ? "bg-orange-100 border-orange-300" : "bg-white border-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* BREAD */}
        <div className="px-5 mb-4">
          <h2 className="flex justify-between mb-3">
            <span>Select Bread</span>
            <span className="text-orange-600 font-bold">{rotiQty} pcs</span>
          </h2>

          <div className="flex gap-3">
            {["Lachha Paratha", "Tandoori Roti"].map((item) => (
              <button
                key={item}
                onClick={() => setBread(item)}
                className={`px-4 py-2 rounded-full border ${
                  bread === item ? "bg-orange-100 border-orange-300" : "bg-white border-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ COMPLIMENTARY */}
        <div className="px-5 mb-10">
          <p className="text-sm text-green-600 font-medium">
            🥗 Raita & Salad – Complimentary
          </p>
        </div>

        {/* FORM */}
        <div className="px-5 space-y-5 mb-12">

          <input placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="Address" onChange={(e)=>setAddress(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="Apartment, suite, etc." onChange={(e)=>setApartment(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="City" onChange={(e)=>setCity(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="State" onChange={(e)=>setUserState(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="PIN Code" onChange={(e)=>setPin(e.target.value)} className="w-full border p-4 rounded-xl" />
          <input placeholder="Phone" onChange={(e)=>setPhone(e.target.value)} className="w-full border p-4 rounded-xl" />

          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input type="date" onChange={(e)=>setDate(e.target.value)} className="w-full border p-4 rounded-xl" />
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input type="time" onChange={(e)=>setTime(e.target.value)} className="w-full border p-4 rounded-xl" />
          </div>

        </div>

        <div className="px-5 mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>

        <div className="fixed bottom-20 left-0 right-0 px-5">
          <button onClick={handleOrder} className="w-full bg-orange-500 text-white py-4 rounded-2xl">
            Order on WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
};

export default LiteMeal;
