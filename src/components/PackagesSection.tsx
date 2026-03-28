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

      // ❌ IMPORTANT FIX: Date & Time auto-fill remove
      // setDate(data.date || "");
      // setTime(data.time || "");
    }
  }, []);

  const handleFindPackages = () => {

    if (!name || !phone || !address || !city || !state || !date || !time) {
      alert("Please fill all required details");
      return;
    }

    if (!vegGuests && !nonVegGuests) {
      alert("Please enter number of guests");
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
    <section id="packages" className="py-20 lg:py-28 section-white">

      <div className="container mx-auto px-4">

        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Plan Your Event
            </h2>

            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              Select your event details to explore suitable packages.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>

          <div className="bg-card border rounded-lg p-6 md:p-8 max-w-4xl mx-auto shadow-sm mb-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="text-sm mb-1 block">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm mb-1 block">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm mb-1 block">Apartment / Suite</label>
                <Input value={apartment} onChange={(e) => setApartment(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block">City</label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block">State</label>
                <Input value={state} onChange={(e) => setState(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block">PIN Code</label>
                <Input value={pin} onChange={(e) => setPin(e.target.value)} />
              </div>

              <div>
                <label className="text-sm mb-1 block">Veg Guests</label>
                <Input
                  type="number"
                  value={vegGuests}
                  onChange={(e) => setVegGuests(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Non Veg Guests</label>
                <Input
                  type="number"
                  value={nonVegGuests}
                  onChange={(e) => setNonVegGuests(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Date</label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm mb-1 block">Delivery Time</label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

            </div>

            <div className="text-center mt-8">
              <Button
                size="lg"
                className="px-10 py-6"
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
