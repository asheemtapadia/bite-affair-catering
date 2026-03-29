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

/* ✅ RICE */
const riceItems: string[] = [
  "Steamed Rice – 2 kg",
  "Jeera Rice – 2 kg",
  "Veg Fried Rice – 2 kg",
  "Peas Pulao – 2 kg",
  "Veg biryani – 2 kg",
];

/* ✅ STANDARD VEG STARTERS */
const standardVegStarters = [
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
  "Spring Rolls – 40 pc",
  "Veg Dimsums – 30 pc",
];

/* ✅ STANDARD NON VEG STARTERS */
const standardNonVegStarters = [
  "Chicken Tikka – 30 pc",
  "Chicken Malai Tikka – 30 pc",
  "Haryali Chicken Tikka – 30 pc",
  "Amritsari Fish Tikka – 30 pc",
  "Chili Chicken – 40 pc",
  "Chicken Fingers – 40 pc",
  "Fish Fingers – 40 pc",
  "Chicken Nuggets – 40 pc",
];

/* ✅ PREMIUM VEG STARTERS */
const premiumVegStarters = [
  "Paneer Tikka – 40 pc",
  "Paneer Malai Tikka – 40 pc",
  "Kesariya Paneer Tikka – 40 pc",
  "Chilli Paneer Tikka – 40 pc",
  "Malai Broccoli Tikka – 40 pc",
  "Stuffed Aloo Tikka – 40 pc",
  "Dahi ke Kabab – 40 pc",
  "Spring Rolls – 30 pc",
];

/* ✅ PREMIUM NON VEG STARTERS */
const premiumNonVegStarters = [
  "Chicken Tikka – 30 pc",
  "Chicken Malai Tikka – 30 pc",
  "Chilli Chicken Tikka – 30 pc",
  "Mutton Seekh Kabab – 40 pc",
  "Chicken Seekh Kabab – 40 pc",
  "BBQ Chicken Wings – 30 pc",
  "Amritsari Fish Tikka – 30 pc",
];

/* ✅ VEG MAINS */
const vegMains = [
  "Paneer Lababdar – 2 kg",
  "Paneer Butter Masala – 2 kg",
  "Paneer Tikka Masala – 2 kg",
  "Paneer Shahi – 2 kg",
  "Malai Kofta – 2 kg",
  "Mix Veg – 2 kg",
  "Dal Makhani – 2 kg",
  "Dal Tadka – 2 kg",
  "Amritsari Chole – 2 kg",
];

/* ✅ NON VEG MAINS */
const nonVegMains = [
  "Butter Chicken – 2 kg",
  "Kadhai Chicken – 2 kg",
  "Chicken Lababdar – 2 kg",
  "Chicken Curry – 2 kg",
  "Chicken Do Pyaza – 2 kg",
  "Fish Curry – 2 kg",
  "Mutton Rogan Josh – 2 kg",
];

/* ✅ BREADS */
const breads = [
  "Tandoori Roti – 20 pc",
  "Butter Naan – 20 pc",
  "Lachcha Paratha – 20 pc",
  "Garlic Naan – 20 pc",
];

/* ✅ DESSERTS */
const desserts = [
  "Gulab Jamun – 30 pc",
  "Rasgulla – 30 pc",
  "Kheer – 2 kg",
  "Brownie",
];

/* ✅ VEG STRUCTURE */
const commonVegCategories = (starters: string[]) => [
  { name: "Starters (Choose 2)", items: starters },
  { name: "Main Course (Choose 2)", items: vegMains },
  { name: "Rice (Choose 1)", items: riceItems },
  { name: "Breads (Choose 2)", items: breads },
  { name: "Desserts (Choose 1)", items: desserts },
];

/* ✅ FIXED NON VEG (ONLY NON VEG — NO MIX) */
const commonNonVegCategories = (nonVegS: string[]) => [
  { name: "Starters (Choose 2)", items: nonVegS },
  { name: "Main Course (Choose 2)", items: nonVegMains },
  { name: "Rice (Choose 1)", items: riceItems },
  { name: "Breads (Choose 2)", items: breads },
  { name: "Desserts (Choose 1)", items: desserts },
];

/* ✅ ALL 8 PACKAGES */
export const menuPackages: MenuPackage[] = [
  {
    slug: "standard-veg",
    name: "Standard Veg",
    price: 499,
    isVeg: true,
    tier: "standard",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonVegCategories(standardVegStarters),
  },
  {
    slug: "standard-plus-veg",
    name: "Standard ++ Veg",
    price: 599,
    isVeg: true,
    tier: "standard",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonVegCategories(standardVegStarters),
  },
  {
    slug: "premium-veg",
    name: "Premium Veg",
    price: 599,
    isVeg: true,
    tier: "premium",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonVegCategories(premiumVegStarters),
  },
  {
    slug: "premium-plus-veg",
    name: "Premium ++ Veg",
    price: 699,
    isVeg: true,
    tier: "premium",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonVegCategories(premiumVegStarters),
  },
  {
    slug: "standard-non-veg",
    name: "Standard Non Veg",
    price: 699,
    isVeg: false,
    tier: "standard",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonNonVegCategories(standardNonVegStarters),
  },
  {
    slug: "standard-plus-non-veg",
    name: "Standard + Non Veg",
    price: 799,
    isVeg: false,
    tier: "standard",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonNonVegCategories(standardNonVegStarters),
  },
  {
    slug: "premium-non-veg",
    name: "Premium Non Veg",
    price: 799,
    isVeg: false,
    tier: "premium",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonNonVegCategories(premiumNonVegStarters),
  },
  {
    slug: "premium-plus-non-veg",
    name: "Premium + Non Veg",
    price: 899,
    isVeg: false,
    tier: "premium",
    previewItems: ["2 Starters", "2 Main Course", "1 Rice", "2 Breads", "1 Dessert"],
    categories: commonNonVegCategories(premiumNonVegStarters),
  },
];

export const othersInfo = [
  "Servers – ₹1500 each",
  "Server + dishes – ₹1500 + ₹750 extra",
  "Complimentary – snacks plates, dips, mint chutney, mouth freshener, tooth picks & napkins",
  "Quantities for 20 pax (adjustable)",
  "Transport cost extra",
];
