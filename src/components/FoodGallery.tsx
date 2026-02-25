import ScrollReveal from "@/components/ScrollReveal";
import paneerTikka from "@/assets/gallery/paneer-tikka.jpg";
import chickenTikka from "@/assets/gallery/chicken-tikka.jpg";
import malaiKofta from "@/assets/gallery/malai-kofta.jpg";
import butterChicken from "@/assets/gallery/butter-chicken.jpg";
import garlicNaan from "@/assets/gallery/garlic-naan.jpg";
import gulabJamun from "@/assets/gallery/gulab-jamun.jpg";
import soyaChaap from "@/assets/gallery/soya-chaap.jpg";
import bbqWings from "@/assets/gallery/bbq-wings.jpg";

const galleryItems = [
  { name: "Paneer Tikka", category: "Veg Starters", image: paneerTikka },
  { name: "Chicken Tikka", category: "Non Veg Starters", image: chickenTikka },
  { name: "Malai Kofta", category: "Veg Mains", image: malaiKofta },
  { name: "Butter Chicken", category: "Non Veg Mains", image: butterChicken },
  { name: "Garlic Naan", category: "Breads", image: garlicNaan },
  { name: "Gulab Jamun", category: "Desserts", image: gulabJamun },
  { name: "Soya Chaap Tikka", category: "Veg Starters", image: soyaChaap },
  { name: "BBQ Chicken Wings", category: "Non Veg Starters", image: bbqWings },
];

const FoodGallery = () => {
  return (
    <section className="py-20 lg:py-28 section-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Food Gallery
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              A visual taste of our catering spread.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={item.name} delay={0.06 * i}>
              <div className="group relative rounded-lg overflow-hidden aspect-square shadow-sm border border-border bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-heading text-sm font-semibold text-white">{item.name}</p>
                  <p className="font-body text-xs text-white/70">{item.category}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoodGallery;
