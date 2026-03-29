export interface MenuCategory {
  name: string;
  items: string[];
}

export interface MenuPackage {
  slug: string;
  name: string;
  price: number;
  isVeg: boolean;
  tier: "standard" | "premium";
  categories: MenuCategory[];
  previewItems: string[];
}

/* ✅ RICE SEPARATED */
const riceItems: string[] = [
  "Steamed Rice – 2 kg",
  "Jeera Rice – 2 kg",
  "Veg Fried Rice – 2 kg",
  "Peas Pulao – 2 kg",
  "Veg biryani – 2 kg",
];

const standardVegStarters = [/* SAME */];
const standardNonVegStarters = [/* SAME */];
const premiumVegStarters = [/* SAME */];
const premiumNonVegStarters = [/* SAME */];

/* ✅ RICE REMOVED FROM MAINS */
const vegMains = [
  "Paneer Lababdar – 2.0 kg",
  "Paneer butter masala – 2.0 kg",
  "Paneer tikka masala – 2.0 kg",
  "Paneer Shahi – 2.0 kg",
  "Malai kofta – 2.0 kg",
  "Dum aloo kashmiri – 2.0 kg",
  "Mix veg – 2 kg",
  "Matar mushroom – 2 kg",
  "Aloo Gobhi Adraki – 2 kg",
  "Soya Chaap Masala – 2.0 kg",
  "Dal Makhani – 2.0 kg",
  "Dal Tadka – 2.0 kg",
  "Amritsari Chole – 2.0 kg",
  "Hakka Noodles – 2 kg",
  "Veg Manchurian – 2 kg",
  "Veggies in hot garlic – 2 kg",
  "Veg Thai curry – 2.0 kg",
  "Pasta – Red/White/Pink – 2.0 kgs",
  "Pao Bhaaji – 2 kg + 40 pc",
];

const nonVegMains = [
  "Butter Chicken – 2.0 kg",
  "Kadhai Chicken – 2.0 kg",
  "Chicken Lababdar – 2.0 kg",
  "Chicken Curry – 2.0 kg",
  "Chicken Do Pyaza – 2.0 kg",
  "Fish Curry – 2.0 kg",
  "Mutton Rogan Josh – 2.0 kg",
  "Mutton Curry – 2.0 kg",
  "Chicken Noodles – 2 kg",
  "Chicken Fried Rice – 2 kg",
  "Chicken Manchurian – 2 kg",
  "Chicken Pasta – Red/White – 2.0 kg",
];

const breads = [/* SAME */];
const desserts = [/* SAME */];

export const menuPackages: MenuPackage[] = [

/* ✅ STANDARD VEG */
{
  slug: "standard-veg",
  name: "Standard Veg",
  price: 499,
  isVeg: true,
  tier: "standard",
  previewItems: ["3 Starters", "3 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
  categories: [
    { name: "Veg Starters (Choose 3)", items: standardVegStarters },
    { name: "Veg Mains (Choose 3)", items: vegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 2)", items: breads },
    { name: "Desserts (Choose 1)", items: desserts },
  ],
},

/* ✅ STANDARD ++ VEG */
{
  slug: "standard-plus-veg",
  name: "Standard ++ Veg",
  price: 599,
  isVeg: true,
  tier: "standard",
  previewItems: ["4 Starters", "3 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 4)", items: standardVegStarters },
    { name: "Veg Mains (Choose 3)", items: vegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

/* ✅ PREMIUM VEG */
{
  slug: "premium-veg",
  name: "Premium Veg",
  price: 599,
  isVeg: true,
  tier: "premium",
  previewItems: ["3 Starters", "3 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
  categories: [
    { name: "Veg Starters (Choose 3)", items: premiumVegStarters },
    { name: "Veg Mains (Choose 3)", items: vegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 2)", items: breads },
    { name: "Desserts (Choose 1)", items: desserts },
  ],
},

/* ✅ PREMIUM ++ VEG */
{
  slug: "premium-plus-veg",
  name: "Premium ++ Veg",
  price: 699,
  isVeg: true,
  tier: "premium",
  previewItems: ["4 Starters", "4 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 4)", items: premiumVegStarters },
    { name: "Veg Mains (Choose 4)", items: vegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

/* ✅ STANDARD NON VEG */
{
  slug: "standard-non-veg",
  name: "Standard Non Veg",
  price: 699,
  isVeg: false,
  tier: "standard",
  previewItems: ["2+2 Starters", "3+1 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 2)", items: standardVegStarters },
    { name: "Non Veg Starters (Choose 2)", items: standardNonVegStarters },
    { name: "Veg Mains (Choose 3)", items: vegMains },
    { name: "Non Veg Mains (Choose 1)", items: nonVegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

/* ✅ STANDARD + NON VEG */
{
  slug: "standard-plus-non-veg",
  name: "Standard + Non Veg",
  price: 799,
  isVeg: false,
  tier: "standard",
  previewItems: ["3+3 Starters", "4+1 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 3)", items: standardVegStarters },
    { name: "Non Veg Starters (Choose 3)", items: standardNonVegStarters },
    { name: "Veg Mains (Choose 4)", items: vegMains },
    { name: "Non Veg Mains (Choose 1)", items: nonVegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

/* ✅ PREMIUM NON VEG */
{
  slug: "premium-non-veg",
  name: "Premium Non Veg",
  price: 799,
  isVeg: false,
  tier: "premium",
  previewItems: ["2+2 Starters", "3+1 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 2)", items: premiumVegStarters },
    { name: "Non Veg Starters (Choose 2)", items: premiumNonVegStarters },
    { name: "Veg Mains (Choose 3)", items: vegMains },
    { name: "Non Veg Mains (Choose 1)", items: nonVegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

/* ✅ PREMIUM + NON VEG */
{
  slug: "premium-plus-non-veg",
  name: "Premium + Non Veg",
  price: 899,
  isVeg: false,
  tier: "premium",
  previewItems: ["3+3 Starters", "4+1 Main Course", "1 Rice", "3 Breads", "2 Desserts"],
  categories: [
    { name: "Veg Starters (Choose 3)", items: premiumVegStarters },
    { name: "Non Veg Starters (Choose 3)", items: premiumNonVegStarters },
    { name: "Veg Mains (Choose 4)", items: vegMains },
    { name: "Non Veg Mains (Choose 1)", items: nonVegMains },
    { name: "Rice (Choose 1)", items: riceItems },
    { name: "Breads (Choose 3)", items: breads },
    { name: "Desserts (Choose 2)", items: desserts },
  ],
},

];
const othersInfo: string[] = [
  "Servers – ₹1500 each",
  "Server + dishes – ₹1500 + ₹750 extra",
  "Complimentary – snacks plates, dips, mint chutney, mouth freshener, tooth picks & napkins",
  "Quantities taken here are for 20 pax & it will change according to the final pax confirmation",
  "Transport cost extra",
];

export { othersInfo };
