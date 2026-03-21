import { useState } from "react";

const LiteMeal = () => {

  // MENU DATA
  const menu = {
    dal: ["Dal Tadka", "Dal Makhani", "Dal Panchmel"],
    paneer: ["Paneer Butter Masala", "Paneer Lababdar", "Matar Paneer", "Shahi Paneer"],
    veg: ["Mix Veg", "Tawa Veg", "Kadhai Veg", "Aloo Gobhi"],
    rice: ["Plain Rice", "Jeera Rice", "Peas Pulao", "Veg Fried Rice"],
    dessert: ["Gulab Jamun", "Rasgulla"]
  };

  // STATES
  const [dal, setDal] = useState("");
  const [paneer, setPaneer] = useState("");
  const [veg, setVeg] = useState("");
  const [rice, setRice] = useState("");
  const [dessert, setDessert] = useState("");

  const [pax, setPax] = useState(15);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const total = pax * 250;

  // WHATSAPP FUNCTION
  const handleOrder = () => {

    if (!dal || !paneer || !veg || !rice || !dessert) {
      alert("Please select all items");
      return;
    }

    if (!name || !phone || !address || !date || !time) {
      alert("Please fill all details");
      return;
    }

    const text = encodeURIComponent(
`*Bite Affair Lite Meal Order*

👤 Name: ${name}
📞 Phone: ${phone}
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

  // UI
  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Bite Affair Lite Meal
      </h1>

      {/* CATEGORY */}
      {Object.entries(menu).map(([key, items]) => (
        <div key={key} className="mb-6">

          <h2 className="font-semibold capitalize mb-2">
            Select {key}
          </h2>

          <div className="space-y-2">
            {items.map((item) => (
              <label key={item} className="block">
                <input
                  type="radio"
                  name={key}
                  value={item}
                  onChange={(e) => {
                    if (key === "dal") setDal(e.target.value);
                    if (key === "paneer") setPaneer(e.target.value);
                    if (key === "veg") setVeg(e.target.value);
                    if (key === "rice") setRice(e.target.value);
                    if (key === "dessert") setDessert(e.target.value);
                  }}
                />{" "}
                {item}
              </label>
            ))}
          </div>

        </div>
      ))}

      {/* PAX */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Number of Guests</h2>
        <select
          value={pax}
          onChange={(e) => setPax(Number(e.target.value))}
          className="border p-2 rounded w-full"
        >
          {[15, 20, 25, 30, 40, 50].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* FORM */}
      <div className="space-y-3 mb-6">
        <input placeholder="Name" className="w-full border p-2 rounded" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Phone" className="w-full border p-2 rounded" onChange={(e) => setPhone(e.target.value)} />
        <input placeholder="Address" className="w-full border p-2 rounded" onChange={(e) => setAddress(e.target.value)} />
        <input type="date" className="w-full border p-2 rounded" onChange={(e) => setDate(e.target.value)} />
        <input type="time" className="w-full border p-2 rounded" onChange={(e) => setTime(e.target.value)} />
      </div>

      {/* PRICE */}
      <div className="mb-4 text-lg font-semibold">
        Total: ₹{total}
      </div>

      {/* BUTTON */}
      <button
        onClick={handleOrder}
        className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
      >
        Order on WhatsApp
      </button>

    </div>
  );
};

export default LiteMeal;
