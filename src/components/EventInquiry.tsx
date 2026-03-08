import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const EventInquiry = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestError, setGuestError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const guests = (formData.get("guests") as string)?.trim();
    const address = (formData.get("address") as string)?.trim();
    const landmark = (formData.get("landmark") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const pincode = (formData.get("pincode") as string)?.trim();
    const notes = (formData.get("notes") as string)?.trim();

    if (!name || !phone || !guests || !landmark || !city || !date) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    if (Number(guests) < 15 || Number(guests) > 50) {
      setGuestError(
        "We currently accept orders for 15–50 guests only. Please enter a number within this range or contact us directly on WhatsApp for special requests."
      );
      setIsSubmitting(false);
      return;
    }

    const message = encodeURIComponent(
`📝 WEBSITE INQUIRY – Bite Affair

Name: ${name}
Phone: ${phone}
Guests: ${guests}
Delivery Date: ${format(date, "PPP")}

Address: ${address || "Not provided"}
Landmark: ${landmark}
City: ${city}
Postal Code: ${pincode || "Not provided"}

${notes ? `Message: ${notes}` : ""}

Source: Website`
    );

    window.open(`https://wa.me/919211570030?text=${message}`, "_blank");
toast({ title: "Redirecting to WhatsApp…" });

setTimeout(() => {
  setIsSubmitting(false);
}, 1500);

  return (
    <section id="inquiry" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4">
            Check Package Availability
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="font-body text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
            Planning a gathering? Share your details and we'll confirm food delivery availability for your date.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="max-w-2xl mx-auto border-border shadow-lg">
            <CardContent className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-body font-medium text-foreground">Full Name *</Label>
                    <Input id="name" name="name" placeholder="Your full name" maxLength={100} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-body font-medium text-foreground">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" maxLength={15} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-body font-medium text-foreground">Delivery Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) => d < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests" className="font-body font-medium text-foreground">Number of Guests *</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      placeholder="15–50 guests"
                      required
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value < 15 || value > 50) {
                          setGuestError(
                            "We currently accept orders for 15–50 guests only. Please enter a number within this range or contact us directly on WhatsApp for special requests."
                          );
                        } else {
                          setGuestError("");
                        }
                      }}
                    />
                    {guestError && (
                      <p className="text-sm text-red-500">{guestError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="font-body font-medium text-foreground">Delivery Address</Label>
                  <Input id="address" name="address" placeholder="House / Building / Street" maxLength={200} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="landmark" className="font-body font-medium text-foreground">Landmark *</Label>
                    <Input id="landmark" name="landmark" placeholder="Nearby landmark" maxLength={120} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-body font-medium text-foreground">City *</Label>
                    <Input id="city" name="city" placeholder="Gurugram" maxLength={100} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="font-body font-medium text-foreground">Postal Code</Label>
                    <Input id="pincode" name="pincode" placeholder="122003" maxLength={6} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="font-body font-medium text-foreground">Additional Notes</Label>
                  <Textarea id="notes" name="notes" placeholder="Any preferences or special requests…" maxLength={500} rows={4} />
                </div>

                <Button type="submit" size="lg" className="w-full text-base py-6" disabled={isSubmitting}>
                  <Send size={18} className="mr-2" />
                  Check Availability
                </Button>

              </form>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventInquiry;
