import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PackagesSection = () => {

const [vegGuests, setVegGuests] = useState("");
const [nonVegGuests, setNonVegGuests] = useState("");
const [area, setArea] = useState("");
const [date, setDate] = useState("");
const [time, setTime] = useState("");

const navigate = useNavigate();

const handleFindPackages = () => {

if(!vegGuests && !nonVegGuests){
alert("Please enter number of guests");
return;
}

const params = new URLSearchParams({
const handleFindPackages = () => {

  if(!area || !date || !time){
    alert("Please fill Area, Date and Delivery Time");
    return;
  }

  if(!vegGuests && !nonVegGuests){
    alert("Please enter number of guests");
    return;
  }

  const params = new URLSearchParams({
    veg: vegGuests,
    nonveg: nonVegGuests,
    area,
    date,
    time
  });

  navigate(`/packages?${params.toString()}`);

};

return (

<section id="packages" className="py-20 lg:py-28 section-white"><div className="container mx-auto px-4"><ScrollReveal>
<div className="text-center mb-16"><h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
Plan Your Event
</h2><p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
Select your event details to explore suitable packages.
</p></div>
</ScrollReveal><ScrollReveal delay={0.1}><div className="bg-card border border-border rounded-lg p-6 md:p-8 max-w-4xl mx-auto shadow-sm mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div>
<label className="text-sm font-medium mb-1 block">Area</label>
<Input
placeholder="Enter delivery area"
value={area}
onChange={(e) => setArea(e.target.value)}
/>
</div><div>
<label className="text-sm font-medium mb-1 block">Veg Guests</label>
<Input
type="number"
placeholder="Number of veg guests"
value={vegGuests}
onChange={(e) => setVegGuests(e.target.value)}
/>
</div><div>
<label className="text-sm font-medium mb-1 block">Non Veg Guests</label>
<Input
type="number"
placeholder="Number of non veg guests"
value={nonVegGuests}
onChange={(e) => setNonVegGuests(e.target.value)}
/>
</div><div>
<label className="text-sm font-medium mb-1 block">Date</label>
<Input
type="date"
value={date}
onChange={(e) => setDate(e.target.value)}
/>
</div><div>
<label className="text-sm font-medium mb-1 block">Delivery Time</label>
<Input
type="time"
value={time}
onChange={(e) => setTime(e.target.value)}
/>
</div></div><div className="text-center"><Button
size="lg"
className="px-10 py-6 text-base"
onClick={handleFindPackages}



Find Packages
</Button>

</div></div></ScrollReveal></div></section>);

};

export default PackagesSection;
