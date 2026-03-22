import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LiteMeal = () => {

  const navigate = useNavigate();

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

  const [pax, setPax] = useState(15);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [error, setError] = useState("");

  const total = pax * 300;
  const quantity = (pax * 0.1).toFixed(1);

  const handleOrder = () => {

    if (!name || !address || !date || !time) {
      setError("Please fill all details");
      return;
    }

    const text = encodeURIComponent(
`*Bite Affair Lite Box Order*

👤 Name: ${name}
📍 Address: ${address}

📅 Date: ${date}
⏰ Time: ${time}

👥 Guests: ${pax}

🍲 Dal: ${dal} (${quantity}kg)
🧀 Paneer: ${paneer} (${quantity}kg)
🥦 Veg: ${veg} (${quantity}kg)
🍚 Rice: ${rice}
🍰 Dessert: ${dessert}

🥖 Bread: Lachha Paratha & Tandoori Roti
🥗 Raita & Salad: Included

💰 Total: ₹${total}

Please confirm availability.`
    );

    window.open(`https://wa.me/919211570030?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] px-4 py-6 pb-28">

      <div className="max-w-2xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-2">
          Bite Affair Lite Box
        </h1>

        <p className="text-center text-sm text-gray-500 mb-6">
          ₹300 per person • Starting ₹4500
        </p>

        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="mb-6">

              <div className="relative mb-3">
                <img
                  src={value.img}
                  alt={key}
                  className="w-full h-28 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/30 rounded-xl" />
              </div>

              <h2 className="font-semibold capitalize mb-2 text-base flex justify-between">
                <span>Select {key}</span>
                {(key !== "rice" && key !== "dessert") && (
                  <span className="text-sm text-orange-600">
                    {quantity}kg
                  </span>
                )}
              </h2>

              <div className="flex flex-wrap gap-2">
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
                      className={`px-3 py-2 rounded-full text-sm border transition
                      ${
                        selected
                          ? "bg-orange-100 text-orange-700 border-orange-300"
                          : "bg-white border-gray-300 text-gray-700"
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

        {/* ✅ PREMIUM GUEST SELECTOR */}
        <div className="mb-8">
          <h2 className="font-semibold mb-3 text-lg">Number of Guests</h2>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

            {[15, 20, 25, 30, 40, 50].map((p, i) => (
              <button
                key={p}
                onClick={() => setPax(p)}
                className={`w-full flex justify-between items-center px-4 py-4 text-left transition
                ${i !== 5 ? "border-b border-gray-100" : ""}
                ${pax === p ? "bg-orange-50" : "bg-white"}`}
              >
                <span className="text-base text-gray-800">
                  {p} Guests
                </span>

                <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                  ${pax === p ? "border-orange-500" : "border-gray-300"}`}
                >
                  {pax === p && (
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                  )}
                </div>
              </button>
            ))}

          </div>
        </div>

        {/* FORM */}
        <div className="space-y-6 mb-10">

          <input
            placeholder="Name"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Address"
            className="w-full border border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input
              type="date"
              className="w-full border border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input
              type="time"
              className="w-full border border-gray-200 p-4 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-200"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

        <div className="mb-4 text-lg font-semibold">
          Total: ₹{total}
        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="fixed bottom-24 left-4 right-4 bg-red-500 text-white p-3 rounded-xl text-center shadow-lg">
          {error}
        </div>
      )}

      <div className="fixed bottom-16 left-0 right-0 px-4">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold shadow-lg active:scale-[0.98] transition"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
