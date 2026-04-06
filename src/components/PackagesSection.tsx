import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PackagesSection = () => {

  const [vegGuests, setVegGuests] = useState("");
  const [nonVegGuests, setNonVegGuests] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("eventForm");

    if (saved) {
      const data = JSON.parse(saved);

      setVegGuests(data.vegGuests || "");
      setNonVegGuests(data.nonVegGuests || "");

      setName(data.name || "");
      setPhone(data.phone || "");

      setAddress(data.address || "");
      setApartment(data.apartment || "");
      setCity(data.city || "");
      setState(data.state || "");
      setPin(data.pin || "");
    }
  }, []);

  /* ✅ 4:30 PM cutoff */
  const getMinDateTime = () => {
    const now = new Date();

    const cutoff = new Date();
    cutoff.setHours(16, 30, 0, 0);

    if (now > cutoff) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }

    return now.toISOString().split("T")[0];
  };

  const handleFindPackages = () => {

    if (!name || !phone || !address || !city || !state || !date || !time) {
      alert("Please fill all required details");
      return;
    }

    if (!vegGuests && !nonVegGuests) {
      alert("Please enter number of guests");
      return;
    }

    if (
      (vegGuests && (vegGuests < 15 || vegGuests > 50)) ||
      (nonVegGuests && (nonVegGuests < 15 || nonVegGuests > 50))
    ) {
      alert("Guests must be between 15 and 50");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    localStorage.setItem("eventForm", JSON.stringify({
      vegGuests,
      nonVegGuests,
      name,
      phone,
      address,
      apartment,
      city,
      state,
      pin,
      date,
      time
    }));

    const params = new URLSearchParams({
      veg: vegGuests,
      nonveg: nonVegGuests,
      name,
      phone,
      address,
      apartment,
      city,
      state,
      pin,
      date,
      time
    });

    navigate(`/packages?${params.toString()}`);
  };

  return (
    <section id="packages" className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">

      <div className="container mx-auto px-4">

        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Plan Your Event
            </h2>

            <p className="text-gray-500 mt-3 text-lg max-w-xl mx-auto">
              Fill in your details to discover curated catering packages.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 max-w-4xl mx-auto shadow-lg">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm mb-1 block text-gray-600">Name</label>
                <Input className="h-11 rounded-lg" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block text-gray-600">Phone</label>
                <Input
                  type="tel"
                  maxLength={10}
                  className="h-11 rounded-lg"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setPhone(val);
                  }}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm mb-1 block text-gray-600">Address</label>
                <Input className="h-11 rounded-lg" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm mb-1 block text-gray-600">Apartment / Suite</label>
                <Input className="h-11 rounded-lg" value={apartment} onChange={(e) => setApartment(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block text-gray-600">City</label>
                <Input className="h-11 rounded-lg" value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block text-gray-600">State</label>
                <Input className="h-11 rounded-lg" value={state} onChange={(e) => setState(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block text-gray-600">PIN Code</label>
                <Input
                  type="tel"
                  maxLength={6}
                  className="h-11 rounded-lg"
                  value={pin}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setPin(val);
                  }}
                />
              </div>

              {/* Veg Guests */}
              <div>
                <label className="text-sm mb-1 block text-gray-600">Veg Guests</label>
                <select className="h-11 w-full rounded-lg border border-gray-300 px-3" value={vegGuests} onChange={(e) => setVegGuests(e.target.value)}>
                  <option value="">Select</option>
                  {Array.from({ length: 36 }, (_, i) => {
                    const num = i + 15;
                    return <option key={num} value={num}>{num}</option>;
                  })}
                </select>
              </div>

              {/* Non Veg Guests */}
              <div>
                <label className="text-sm mb-1 block text-gray-600">Non Veg Guests</label>
                <select className="h-11 w-full rounded-lg border border-gray-300 px-3" value={nonVegGuests} onChange={(e) => setNonVegGuests(e.target.value)}>
                  <option value="">Select</option>
                  {Array.from({ length: 36 }, (_, i) => {
                    const num = i + 15;
                    return <option key={num} value={num}>{num}</option>;
                  })}
                </select>
              </div>

              {/* DATE */}
              <div>
                <label className="text-sm mb-1 block text-gray-600">Date</label>
                <Input
                  type="date"
                  min={getMinDateTime()}
                  className="h-11 rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Orders after 4:30 PM will be scheduled for next day delivery
                </p>
              </div>

              {/* TIME */}
              <div>
                <label className="text-sm mb-1 block text-gray-600">Delivery Time</label>
                <select
                  className="h-11 w-full rounded-lg border border-gray-300 px-3"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select</option>
                  {[
                    "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
                    "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
                    "05:00 PM","06:00 PM","07:00 PM","08:00 PM","09:00 PM"
                  ].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="text-center mt-10">
              <Button
                size="lg"
                className="px-12 py-6 text-lg rounded-xl bg-black hover:bg-gray-900 text-white shadow-md"
                onClick={handleFindPackages}
              >
                Find Packages
              </Button>
            </div>

          </div>

        </ScrollReveal>

      </div>

    </section>
  );
};

export default PackagesSection;
