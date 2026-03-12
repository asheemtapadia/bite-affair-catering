import ScrollReveal from "@/components/ScrollReveal";

const testimonials = [
  {
    name: "Namit Kajar",
    text: "Delicious food with excellent quality and quantity. Delivery was on time and coordination was very professional. Would definitely order again.",
  },
  {
    name: "Urvi Chhokra",
    text: "Bite Affair is just great. The food is amazing — starters, main course and desserts — everything was excellent.",
  },
  {
    name: "Neha Wahi",
    text: "Amazing people, awesome food and timely delivery. Everything from starters to desserts was perfect and well priced for the quantity.",
  },
  {
    name: "Vipin Kumar Mehra",
    text: "Excellent food quality with great variety. Packaging was very efficient and perfect for family gatherings.",
  },
  {
    name: "Rama Singh",
    text: "The food was really tasty and appreciated by all my guests. Quality, quantity and delivery style were very good.",
  },
  {
    name: "Manmohan Arora",
    text: "Booked them for the first time and it was a great arrangement. Everyone enjoyed the food and the taste was excellent.",
  },
  {
    name: "Shalini Prince Bhagat",
    text: "Ordered for my daughter’s birthday and every guest loved the food. Taste was amazing, especially the Manchurian.",
  },
  {
    name: "Riya Kapoor",
    text: "Amazing experience with Bite Affair. Booked them for my baby shower and everything was handled perfectly.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4">

        <ScrollReveal>
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              What Our Customers Say
            </h2>

            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              Real experiences from house parties, office lunches and special celebrations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={0.08 * i}>
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">

                <div>
                  <div className="flex text-yellow-400 mb-3">
                    ★★★★★
                  </div>

                  <p className="font-body text-sm text-foreground/80 leading-relaxed">
                    {t.text}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="font-heading text-sm font-semibold text-navy">
                    {t.name}
                  </p>
                </div>

              </div>
            </ScrollReveal>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
