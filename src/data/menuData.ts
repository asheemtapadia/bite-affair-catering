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

const standardVegStarters: string[] = [
  "Paneer Tikka – 40 pc",
  "Malai Paneer Tikka – 40 pc",
  "Haryali Paneer Tikka – 40 pc",
  "Soya Chaap Tikka – 40 pc",
  "Malai Soya Tikka – 40 pc",
  "Tandoori Aloo – 40 pc",
  "Dry Manchurian – 40 pc",
  "Honey Chili Potatoes – 1 kg",
  "Chili Paneer – 40 pc",
  "Hara Bhara Kabab – 40 pc",
  "Shami Kabab – 40 pc",
  "Spring Rolls – 40 pc",
  "Veg Dimsums – 30 pc",
  "Paneer Dimsums – 30 pc",
  "Cajun Potatoes – 40 pc",
];

const standardNonVegStarters: string[] = [
  "Chicken Tikka – 30 pc",
  "Chicken Malai Tikka – 30 pc",
  "Haryali Chicken Tikka – 30 pc",
  "Amritsari Fish Tikka – 30 pc",
  "Chili Chicken – 40 pc",
  "Chicken Fingers – 40 pc",
  "Fish Fingers – 40 pc",
  "Chicken Keema & Pav – 1.5 kg + 30 pc",
  "Chicken Dimsums – 30 pc",
  "Chicken Nuggets – 40 pc",
];

const premiumVegStarters: string[] = [
  "Paneer Tikka – 40 pc",
  "Paneer Malai Tikka – 40 pc",
  "Kesariya Paneer Tikka – 40 pc",
  "Chilli Paneer Tikka – 40 pc",
  "Malai Broccoli Tikka – 40 pc",
  "Stuffed Aloo Tikka – 40 pc",
  "Malai Soya Tikka – 40 pc",
  "Dry Manchurian – 40 pc",
  "Chilli Basil Tofu – 40 pc",
  "Chilli Paneer – 40 pc",
  "Chilli Mushroom – 50 pc",
  "Dahi ke Kabab – 40 pc",
  "Spring Rolls – 30 pc",
  "Dimsums Spicy Veg – 30 pc",
  "Cocktail Samosa – 40 pc",
  "Cottage Cheese Satay – 40 pc",
];

const premiumNonVegStarters: string[] = [
  "Chicken Tikka – 30 pc",
  "Chicken Malai Tikka – 30 pc",
  "Chilli Chicken Tikka – 30 pc",
  "Anjeeri Chicken Tikka – 30 pc",
  "Mutton seekh kabab – 40 pc",
  "Chicken seekh kabab – 40 pc",
  "BBQ Chicken wings – 30 pc",
  "Thai chicken satay – 30 pc",
  "Amritsari Fish Tikka – 30 pc",
  "Chilli Chicken – 40 pc",
  "Kung pao chicken – 40 pc",
  "Fish Otak Otak – 30 pc",
  "Chilli garlic prawns – 30 pc",
  "Chilli oil Chicken Dimsums – 30 pc",
  "Chicken spring roll – 30 pc",
];

const vegMains: string[] = [
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
  "Steamed Rice – 2 kg",
  "Jeera Rice – 2 kg",
  "Veg Fried Rice – 2 kg",
  "Peas Pulao – 2 kg",
  "Veg biryani – 2 kg",
];

const nonVegMains: string[] = [
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

const breads: string[] = [
  "Tandoori Roti – 20 pc",
  "Naan / Butter Naan – 20 pc",
  "Lachcha Paratha – 20 pc",
  "Garlic Naan – 20 pc",
  "Tawa Roti – 30 pc",
];

const desserts: string[] = [
  "Gulab Jamun / Rasgulla – 30 pc",
  "Kheer / Mango Phirni – 2 Kgs",
  "Brownie",
];

const othersInfo: string[] = [
  "Servers – ₹1500 each",
  "Server + dishes – ₹1500 + ₹750 extra",
  "Complimentary – snacks plates, dips, mint chutney, mouth freshener, tooth picks & napkins",
  "Quantities taken here are for 20 pax & it will change according to the final pax confirmation",
  "Transport cost extra",
];

export const menuPackages: MenuPackage[] = [
  {
    slug: "standard-veg",
    name: "Standard Veg",
    price: 499,
    isVeg: true,
    tier: "standard",
    previewItems: ["3 Starters", "3 Main Course", "2 Breads", "1 Dessert"],
    categories: [
      { name: "Veg Starters (Choose 3)", items: standardVegStarters },
      { name: "Veg Mains (Choose 3)", items: vegMains },
      { name: "Breads (Choose 2)", items: breads },
      { name: "Desserts (Choose 1)", items: desserts },
    ],
  },
  {
    slug: "standard-plus-veg",
    name: "Standard ++ Veg",
    price: 599,
    isVeg: true,
    tier: "standard",
    previewItems: ["5 Starters", "5 Main Course", "3 Breads", "2 Desserts"],
    categories: [
      { name: "Veg Starters (Choose 5)", items: standardVegStarters },
      { name: "Veg Mains (Choose 5)", items: vegMains },
      { name: "Breads (Choose 3)", items: breads },
      { name: "Desserts (Choose 2)", items: desserts },
    ],
  },
  {
    slug: "premium-veg",
    name: "Premium Veg",
    price: 599,
    isVeg: true,
    tier: "premium",
    previewItems: ["3 Starters", "3 Main Course", "2 Breads", "1 Dessert"],
    categories: [
      { name: "Veg Starters (Choose 3)", items: premiumVegStarters },
      { name: "Veg Mains (Choose 3)", items: vegMains },
      { name: "Breads (Choose 2)", items: breads },
      { name: "Desserts (Choose 1)", items: desserts },
    ],
  },
  {
    slug: "premium-plus-veg",
    name: "Premium ++ Veg",
    price: 699,
    isVeg: true,
    tier: "premium",
    previewItems: ["5 Starters", "5 Main Course", "3 Breads", "2 Desserts"],
    categories: [
      { name: "Veg Starters (Choose 5)", items: premiumVegStarters },
      { name: "Veg Mains (Choose 5)", items: vegMains },
      { name: "Breads (Choose 3)", items: breads },
      { name: "Desserts (Choose 2)", items: desserts },
    ],
  },
  {
    slug: "standard-non-veg",
    name: "Standard Non Veg",
    price: 699,
    isVeg: false,
    tier: "standard",
    previewItems: ["2 Veg Starters", "2 Non Veg Starters", "2 Veg Mains", "2 Non Veg Mains", "2 Breads", "1 Dessert"],
    categories: [
      { name: "Veg Starters (Choose 2)", items: standardVegStarters },
      { name: "Non Veg Starters (Choose 2)", items: standardNonVegStarters },
      { name: "Veg Mains (Choose 2)", items: vegMains },
      { name: "Non Veg Mains (Choose 2)", items: nonVegMains },
      { name: "Breads (Choose 2)", items: breads },
      { name: "Desserts (Choose 1)", items: desserts },
    ],
  },
  {
    slug: "standard-plus-non-veg",
    name: "Standard + Non Veg",
    price: 799,
    isVeg: false,
    tier: "standard",
    previewItems: ["3 Veg Starters", "3 Non Veg Starters", "3 Veg Mains", "3 Non Veg Mains", "3 Breads", "2 Desserts"],
    categories: [
      { name: "Veg Starters (Choose 3)", items: standardVegStarters },
      { name: "Non Veg Starters (Choose 3)", items: standardNonVegStarters },
      { name: "Veg Mains (Choose 3)", items: vegMains },
      { name: "Non Veg Mains (Choose 3)", items: nonVegMains },
      { name: "Breads (Choose 3)", items: breads },
      { name: "Desserts (Choose 2)", items: desserts },
    ],
  },
  {
    slug: "premium-non-veg",
    name: "Premium Non Veg",
    price: 799,
    isVeg: false,
    tier: "premium",
    previewItems: ["2 Veg Starters", "2 Non Veg Starters", "2 Veg Mains", "2 Non Veg Mains", "2 Breads", "1 Dessert"],
    categories: [
      { name: "Veg Starters (Choose 2)", items: premiumVegStarters },
      { name: "Non Veg Starters (Choose 2)", items: premiumNonVegStarters },
      { name: "Veg Mains (Choose 2)", items: vegMains },
      { name: "Non Veg Mains (Choose 2)", items: nonVegMains },
      { name: "Breads (Choose 2)", items: breads },
      { name: "Desserts (Choose 1)", items: desserts },
    ],
  },
  {
    slug: "premium-plus-non-veg",
    name: "Premium + Non Veg",
    price: 899,
    isVeg: false,
    tier: "premium",
    previewItems: ["3 Veg Starters", "3 Non Veg Starters", "3 Veg Mains", "3 Non Veg Mains", "3 Breads", "2 Desserts"],
    categories: [
      { name: "Veg Starters (Choose 3)", items: premiumVegStarters },
      { name: "Non Veg Starters (Choose 3)", items: premiumNonVegStarters },
      { name: "Veg Mains (Choose 3)", items: vegMains },
      { name: "Non Veg Mains (Choose 3)", items: nonVegMains },
      { name: "Breads (Choose 3)", items: breads },
      { name: "Desserts (Choose 2)", items: desserts },
    ],
  },
];

export { othersInfo };
