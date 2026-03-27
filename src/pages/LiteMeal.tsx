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
// ✅ ADD-ONS FEATURE START

const [showAddons, setShowAddons] = useState(false);

const addonMenu = [
  { name: "Kheer", unit: "kg" },
  { name: "Mango Phirni", unit: "kg" },
  { name: "Brownie", unit: "pcs" },
  { name: "Ice Cream", unit: "cups" },
  { name: "Extra Paneer Dish", unit: "kg" },
  { name: "Extra Dal", unit: "kg" },
  { name: "Extra Veg Dish", unit: "kg" },
  { name: "Extra Rice", unit: "ltr" }
];

const [addons, setAddons] = useState([]);

const updateAddon = (item, change) => {
  setAddons((prev) => {
    const existing = prev.find((i) => i.name === item.name);

    if (!existing && change > 0) {
      return [...prev, { ...item, qty: 5 }];
    }

    if (existing) {
      const newQty = existing.qty + change;

      if (newQty <= 0) {
        return prev.filter((i) => i.name !== item.name);
      }

      return prev.map((i) =>
        i.name === item.name ? { ...i, qty: newQty } : i
      );
    }

    return prev;
  });
};

// ✅ ADD-ONS FEATURE END
  
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

${addons.length ? `➕ Add-ons:
${addons.map(a => `• ${a.name} (${a.qty} ${a.unit})`).join("\n")}` : ""}

💰 Total: ₹${total}`

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

      {/* HEADER (HEIGHT REDUCED) */}
      <div className="relative w-full h-[240px] md:h-[260px] overflow-hidden">

        <img
          src="/images/lite-meal/litebox-hero.jpg"
          alt="Lite Box"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">

          <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight drop-shadow-xl">
            Bite Affair Lite Box
          </h1>

          <p className="text-sm md:text-base text-white/90 mt-2">
            ₹300 per person
          </p>

          <div className="w-14 h-[2px] bg-orange-400 my-3 rounded-full opacity-90" />

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
  <h2 className="text-sm text-gray-500 mb-4 text-center tracking-wide">
    Number of Guests
  </h2>

  <div className="flex justify-center">
    <select
      value={pax}
      onChange={(e) => setPax(Number(e.target.value))}
      className="w-52 px-5 py-3 rounded-2xl border border-gray-300 bg-white text-center text-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      {Array.from({ length: 36 }, (_, i) => i + 15).map((num) => (
        <option key={num} value={num}>
          {num} Guests
        </option>
      ))}
    </select>
  </div>

  <p className="text-center text-xs text-gray-400 mt-3">
    Select between 15–50 guests
  </p>
</div>

        {/* MENU */}
        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="px-5 mb-10">

              <div className="relative mb-4">
                <img
                  src={value.img}
                  alt={key}
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl" />
              </div>

              <h2 className="font-medium capitalize mb-3 flex justify-between items-center">
                <span>Select {key}</span>

                <span className="text-orange-600 font-extrabold text-lg tracking-wide">
                  {key === "rice" && `${riceQty} ltr`}
                  {key === "dessert" && `${dessertQty} pcs`}
                  {(key !== "rice" && key !== "dessert") && `${quantity} kg`}
                </span>
              </h2>

              <div className="flex flex-wrap gap-3">
                {items.map((item) => {

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
                      className={`px-4 py-2 rounded-full text-sm border  
                      ${
                        selected
                          ? "bg-orange-100 text-orange-700 border-orange-300"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

            </div>
          );
        })}

        {/* BREAD */}
        <div className="px-5 mb-10">
          <h2 className="flex justify-between mb-3">
            <span>Select Bread</span>
            <span className="text-orange-600 font-bold">{rotiQty} pcs</span>
          </h2>

          <div className="flex gap-3">
            {["Lachha Paratha", "Tandoori Roti"].map((item) => (
              <button
                key={item}
                onClick={() => setBread(item)}
                className={`px-4 py-2 rounded-full border  
                ${
                  bread === item
                    ? "bg-orange-100 border-orange-300"
                    : "bg-white border-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ COMPLIMENTARY (NON-CLICKABLE) */}
        <div className="px-5 mb-10">
          <h2 className="flex justify-between mb-3">
            <span>Complimentary</span>
            <span className="text-green-600 text-sm font-medium">Included</span>
          </h2>

          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-full text-sm bg-green-50 text-green-700 border border-green-200">
              Raita
            </div>
            <div className="px-4 py-2 rounded-full text-sm bg-green-50 text-green-700 border border-green-200">
              Salad
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="px-5 space-y-6 mb-12">

          <input
            placeholder="Name"
            className="w-full border p-4 rounded-xl"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Address"
            className="w-full border p-4 rounded-xl"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border p-4 rounded-xl"
            />
          </div>

        </div>

        <div className="px-5 mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>
        {/* ✅ ADD MORE ITEMS BUTTON */}
<div className="px-5 mb-10">
  <button
    onClick={() => setShowAddons(true)}
    className="w-full border border-orange-400 text-orange-500 py-3 rounded-xl font-medium"
  >
    + Add More Items
  </button>
</div>
 {/* ✅ ADD-ONS POPUP */}
{showAddons && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-end">

    <div className="bg-white w-full rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Add More Items</h2>
        <button onClick={() => setShowAddons(false)}>✕</button>
      </div>

      {/* LIST */}
      {addonMenu.map((item) => {
        const selected = addons.find((i) => i.name === item.name);

        return (
          <div key={item.name} className="flex justify-between items-center border-b py-3">

            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">{item.unit}</p>
            </div>

            <div className="flex items-center gap-3">

              <button
                onClick={() => updateAddon(item, -5)}
                className="w-8 h-8 rounded-full border"
              >
                −
              </button>

              <span className="w-8 text-center">
                {selected ? selected.qty : 0}
              </span>

              <button
                onClick={() => updateAddon(item, 5)}
                className="w-8 h-8 rounded-full bg-orange-500 text-white"
              >
                +
              </button>

            </div>

          </div>
        );
      })}

      {/* DONE BUTTON */}
      <button
        onClick={() => setShowAddons(false)}
        className="w-full mt-5 bg-orange-500 text-white py-3 rounded-xl"
      >
        Done
      </button>

    </div>
  </div>
)}       

      </div>

      <div className="fixed bottom-20 left-0 right-0 px-5">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
