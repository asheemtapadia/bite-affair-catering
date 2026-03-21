import { useState } from "react";

const LiteMeal = () => {

  const menu = {
    dal: ["Dal Tadka", "Dal Makhani", "Dal Panchmel"],
    paneer: ["Paneer Butter Masala", "Paneer Lababdar", "Matar Paneer", "Shahi Paneer"],
    veg: ["Mix Veg", "Tawa Veg", "Kadhai Veg", "Aloo Gobhi"],
    rice: ["Plain Rice", "Jeera Rice", "Peas Pulao", "Veg Fried Rice"],
    dessert: ["Gulab Jamun", "Rasgulla"]
  };

  // DEFAULT SELECTED (no empty error)
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

  const total = pax * 250;

  const handleOrder = () => {

    if (!name || !address || !date || !time) {
      alert("Please fill all details");
      return;
    }

    const text = encodeURIComponent(
`*Bite Affair Lite Meal Order*

👤 Name: ${name}
📍 Address: ${address}

📅 Date: ${date}
⏰ Time: ${time}

👥 Guests: ${pax}

🍲 Dal: ${dal}
🧀 Paneer: ${paneer}
🥦 Veg: ${veg}
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

        <h1 className="text-3xl font-bold text-center mb-6">
          Bite Affair Lite Meal
        </h1>

        {/* CATEGORY */}
        {Object.entries(menu).map(([key, items]) => (
          <div key={key} className="mb-5">

            <h2 className="font-semibold capitalize mb-2 text-base">
              Select {key}
            </h2>

            {/* LIGHTWEIGHT PILLS */}
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
                    hover:scale-[1.02] active:scale-[0.97]
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
        ))}

        {/* PAX */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Number of Guests</h2>
          <select
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="border p-3 rounded-lg w-full bg-white"
          >
            {[15, 20, 25, 30, 40, 50].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* FORM */}
        <div className="space-y-4 mb-6">

          <input
            placeholder="Name"
            className="w-full border p-3 rounded-lg bg-white"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Address"
            className="w-full border p-3 rounded-lg bg-white"
            onChange={(e) => setAddress(e.target.value)}
          />

          <div>
            <p className="text-sm mb-1">Delivery Date</p>
            <input
              type="date"
              className="w-full border p-3 rounded-lg bg-white"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <p className="text-sm mb-1">Delivery Time</p>
            <input
              type="time"
              className="w-full border p-3 rounded-lg bg-white"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

        </div>

        {/* TOTAL */}
        <div className="mb-4 text-lg font-semibold">
          Total: ₹{total}
        </div>

      </div>

      {/* CTA (only solid orange = branding) */}
      <div className="fixed bottom-16 left-0 right-0 px-4">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold shadow-md"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
