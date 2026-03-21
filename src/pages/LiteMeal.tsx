import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LiteMeal = () => {

  const navigate = useNavigate();

  // MENU DATA + IMAGE PATHS (replace later)
  const menu = {
    dal: {
      img: "/images/dal.jpg",
      items: ["Dal Tadka", "Dal Makhani", "Dal Panchmel"]
    },
    paneer: {
      img: "/images/paneer.jpg",
      items: ["Paneer Butter Masala", "Paneer Lababdar", "Matar Paneer", "Shahi Paneer"]
    },
    veg: {
      img: "/images/veg.jpg",
      items: ["Mix Veg", "Tawa Veg", "Kadhai Veg", "Aloo Gobhi"]
    },
    rice: {
      img: "/images/rice.jpg",
      items: ["Plain Rice", "Jeera Rice", "Peas Pulao", "Veg Fried Rice"]
    },
    dessert: {
      img: "/images/dessert.jpg",
      items: ["Gulab Jamun", "Rasgulla"]
    }
  };

  // DEFAULT SELECTED
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

  const quantity = (pax * 0.1).toFixed(1);

  const handleOrder = () => {

    if (!name || !address || !date || !time) {
      alert("Please fill all details");
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

        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-sm text-gray-600"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Bite Affair Lite Box
        </h1>

        {/* CATEGORY */}
        {Object.entries(menu).map(([key, value]) => {

          const items = value.items;

          return (
            <div key={key} className="mb-6">

              <img
                src={value.img}
                alt={key}
                className="w-full h-28 object-cover rounded-xl mb-3"
              />

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

        <div className="mb-4 text-lg font-semibold">
          Total: ₹{total}
        </div>

      </div>

      {/* CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4">
        <button
          onClick={handleOrder}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"
        >
          Order on WhatsApp
        </button>
      </div>

    </div>
  );
};

export default LiteMeal;
