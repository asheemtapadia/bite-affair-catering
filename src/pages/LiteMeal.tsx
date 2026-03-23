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
    <div className="min-h-screen bg-[#faf7f2] pb-40">

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
          className="mt-6 ml-4 text-sm text-gray-500"
        >
          ← Back
        </button>

        {/* 🔥 ULTRA PREMIUM HEADER */}
        <div className="relative h-[260px] w-full overflow-hidden rounded-b-[40px] mt-4">

          <img
            src="/litebox-hero.jpg"
            alt="Lite Box"
            className="w-full h-full object-cover scale-105 brightness-95 contrast-105"
          />

          {/* CLEAN DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50" />

          {/* TEXT */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">

            <h1 className="text-3xl font-semibold text-white tracking-tight drop-shadow-lg">
              Bite Affair Lite Box
            </h1>

            <p className="text-sm text-white/80 mt-2">
              ₹300 per person • Starting ₹4500
            </p>

            <div className="w-12 h-[2px] bg-orange-400 my-3 rounded-full" />

            <p className="text-xs tracking-[3px] text-orange-300 uppercase">
              Simplicity is Luxury
            </p>

          </div>
        </div>

        {/* GUEST */}
        <div className="px-5 mt-8 mb-10">
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
        <div className="px-5">
        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="mb-10">

              <div className="relative mb-4">
                <img
                  src={value.img}
                  alt={key}
                  className="w-full h-32 object-cover rounded-2xl brightness-90"
                />
                <div className="absolute inset-0 bg-black/10 rounded-2xl" />
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
        </div>

        {/* BREAD */}
        <div className="px-5 mb-10">
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

        {/* FORM */}
        <div className="px-5 space-y-7 mb-12">

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

          <input
            type="date"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white"
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="time"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white"
            onChange={(e) => setTime(e.target.value)}
          />

        </div>

        <div className="px-5 mb-6 text-xl font-semibold">
          Total: ₹{total}
        </div>

      </div>

      <div className="fixed bottom-20 left-0 right-0 px-5">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-medium shadow-lg"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
