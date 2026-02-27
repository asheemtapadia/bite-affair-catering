import { Link } from "react-router-dom";
import { menuPackages } from "@/data/menuData";
import ScrollReveal from "@/components/ScrollReveal";
import { Leaf, Drumstick } from "lucide-react";

const MenuCards = () => {
  return (
    <section id="menu" className="py-20 lg:py-28 section-beige">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4">
              Curated Bulk Menu Packages
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
              Designed for gatherings of 15–50 guests. Structured bulk menus with generous portions and consistent quality across Delhi NCR.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuPackages.map((pkg, i) => (
            <ScrollReveal key={pkg.slug} delay={0.08 * i}>
              <Link
                to={`/menu/${pkg.slug}`}
                className="group block bg-card rounded-lg border border-border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden h-full"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300 w-0 group-hover:w-full" />

                <div className="flex items-center gap-2 mb-3">
                  {pkg.isVeg ? (
                    <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-green-600 text-green-700">
                      <Leaf size={12} /> Veg
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-body font-medium px-2 py-0.5 rounded border border-red-600 text-red-700">
                      <Drumstick size={12} /> Non Veg
                    </span>
                  )}
                  <span className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                    {pkg.tier}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-semibold text-navy mb-1">
                  {pkg.name}
                </h3>
                <p className="font-heading text-2xl font-bold text-primary mb-4">
                  ₹{pkg.price}
                  <span className="text-sm font-body font-normal text-muted-foreground">
                    /- per person
                  </span>
                </p>

                <ul className="space-y-1.5 mb-6">
                  {pkg.previewItems.map((item) => (
                    <li
                      key={item}
                      className="text-sm font-body text-foreground/80 flex items-start gap-2"
                    >
                      <span className="text-primary mt-1 text-xs">●</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="inline-block font-body text-sm font-medium text-primary group-hover:underline">
                  View Complete Menu →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuCards;
};

export default MenuCards;
