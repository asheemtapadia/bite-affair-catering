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
`*Bite Affair Lite Box Order*

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
    <div className="min-h-screen bg-[#faf7f2] px-5 py-6 pb-40">

      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/90 backdrop-blur-md border border-red-200 text-red-600 px-5 py-3 rounded-full shadow-xl text-sm font-medium">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-gray-500"
        >
          ← Back
        </button>

        {/* 🔥 ULTRA PREMIUM HEADER */}
        <div className="relative mb-12 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

          <img
            src="/images/lite-meal/lite-box-banner.png"
            alt="Bite Affair"
            className="w-full h-[240px] object-cover scale-105"
          />

          {/* DARK + GOLD OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,139,44,0.25),transparent_60%)]" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">

            <h1 className="text-3xl font-semibold text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              Bite Affair Lite Box
            </h1>

            <p className="text-sm text-gray-200 mt-3">
              ₹300 per person • Starting ₹4500
            </p>

            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-orange-400 to-transparent mt-4" />

            <p className="text-sm text-orange-200 mt-3 tracking-widest uppercase">
              Simplicity is Luxury
            </p>

          </div>

        </div>

        {/* GUEST */}
        <div className="mb-10">
          <h2 className="text-sm text-gray-500 mb-3 text-center">
            Number of Guests
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {[15, 20, 25, 30, 40, 50].map((p) => (
              <button
                key={p}
                onClick={() => setPax(p)}
                className={`px-5 py-2 rounded-full border text-sm transition-all duration-200
                ${
                  pax === p
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg scale-105"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* MENU */}
        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="mb-10">

              {/* 🔥 IMAGE REFINED (LESS DISTRACTION) */}
              <div className="relative mb-4 rounded-2xl overflow-hidden">
                <img
                  src={value.img}
                  alt={key}
                  className="w-full h-32 object-cover scale-105 brightness-[0.75] contrast-[0.95] saturate-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#faf7f2] via-[#faf7f2]/40 to-transparent" />
              </div>

              <h2 className="font-medium capitalize mb-3 text-base flex justify-between">
                <span>Select {key}</span>

                <span className="text-xl font-bold text-orange-600">
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
                      className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
                      ${
                        selected
                          ? "bg-orange-100 text-orange-700 border-orange-300 shadow-sm"
                          : "bg-white border-gray-200 text-gray-700"
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
        <div className="mb-10">
          <h2 className="flex justify-between mb-3 text-base font-medium">
            <span>Select Bread</span>
            <span className="text-xl font-bold text-orange-600">
              {rotiQty} pcs
            </span>
          </h2>

          <div className="flex gap-3">
            {["Lachha Paratha", "Tandoori Roti"].map((item) => {
              const selected = bread === item;

              return (
                <button
                  key={item}
                  onClick={() => setBread(item)}
                  className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
                  ${
                    selected
                      ? "bg-orange-100 text-orange-700 border-orange-300 shadow-sm"
                      : "bg-white border-gray-200 text-gray-700"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* COMPLIMENTARY */}
        <div className="mb-10">
          <h2 className="font-medium mb-3 text-base">
            Complimentary
          </h2>

          <div className="flex gap-3">
            <div className="px-4 py-2 rounded-full text-sm border bg-white border-gray-200 text-gray-700">
              Raita
            </div>
            <div className="px-4 py-2 rounded-full text-sm border bg-white border-gray-200 text-gray-700">
              Salad
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-7 mb-12">

          <input
            placeholder="Name"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white shadow-sm"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Address"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white shadow-sm"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div>
            <p className="text-sm text-gray-500 mb-2">Delivery Date</p>
            <input
              type="date"
              className="w-full border border-gray-200 p-4 rounded-xl bg-white"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Delivery Time</p>
            <input
              type="time"
              className="w-full border border-gray-200 p-4 rounded-xl bg-white"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

        <div className="mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>

      </div>

      <div className="fixed bottom-20 left-0 right-0 px-5">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-medium shadow-lg active:scale-[0.98] transition"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
