/**
 * Client service catalogue from The Luxè Touch – Service Catalogue sheet.
 * Prices/durations only where the sheet provided them; otherwise quote_required.
 */

export type CatalogueService = {
  name: string;
  slug: string;
  categorySlug: string;
  subcategory?: string;
  brandOrProducts?: string;
  shortDescription: string;
  pricing: {
    mode: "fixed" | "starting_at" | "quote_required" | "hidden";
    amount?: number;
    regularAmount?: number;
    currency: string;
  };
  durationMinutes?: number;
  isFeatured?: boolean;
  displayOrder: number;
};

export const categoriesData = [
  {
    name: "Skincare",
    slug: "skincare",
    description: "Facials, clean-ups, de-tan, bleach, and facial kits at your doorstep.",
    displayOrder: 1,
    isActive: true,
  },
  {
    name: "Haircare",
    slug: "haircare",
    description: "Haircuts, spas, treatments, and colouring — done at home.",
    displayOrder: 2,
    isActive: true,
  },
  {
    name: "Body Care",
    slug: "body-care",
    description: "Body polishing and massage services at home.",
    displayOrder: 3,
    isActive: true,
  },
  {
    name: "Nail Care",
    slug: "nail-care",
    description: "Nail care services — details to be confirmed.",
    displayOrder: 4,
    isActive: true,
  },
  {
    name: "Makeup",
    slug: "makeup",
    description: "Makeup services for every occasion.",
    displayOrder: 5,
    isActive: true,
  },
  {
    name: "Honey Waxing",
    slug: "honey-waxing",
    description: "Honey wax services for face and body.",
    displayOrder: 6,
    isActive: true,
  },
  {
    name: "Rica Waxing",
    slug: "rica-waxing",
    description: "Rica wax services for face and body.",
    displayOrder: 7,
    isActive: true,
  },
];

function quote(
  name: string,
  slug: string,
  categorySlug: string,
  subcategory: string,
  displayOrder: number,
  brandOrProducts?: string
): CatalogueService {
  return {
    name,
    slug,
    categorySlug,
    subcategory,
    brandOrProducts,
    shortDescription: `${name} — at-home beauty service.`,
    pricing: { mode: "quote_required", currency: "INR" },
    displayOrder,
  };
}

function priced(
  name: string,
  slug: string,
  categorySlug: string,
  subcategory: string,
  regular: number,
  offer: number,
  mins: number,
  displayOrder: number,
  brandOrProducts = "Honey Wax",
  featured = false
): CatalogueService {
  return {
    name,
    slug,
    categorySlug,
    subcategory,
    brandOrProducts,
    shortDescription: `${name} with ${brandOrProducts} — at-home service.`,
    pricing: {
      mode: "fixed",
      amount: offer,
      regularAmount: regular,
      currency: "INR",
    },
    durationMinutes: mins,
    isFeatured: featured,
    displayOrder,
  };
}

const skincareKits: [string, string, string][] = [
  ["VLCC Anti-Tan", "vlcc-anti-tan", "VLCC"],
  ["VLCC Insta Glow", "vlcc-insta-glow", "VLCC"],
  ["VLCC Skin Tightening", "vlcc-skin-tightening", "VLCC"],
  ["VLCC Diamond", "vlcc-diamond", "VLCC"],
  ["VLCC Bridal Glow", "vlcc-bridal-glow", "VLCC"],
  ["Lotus Herbals Radiant", "lotus-herbals-radiant", "Lotus Herbals"],
  ["Lotus Radiant Bridal Glow", "lotus-radiant-bridal-glow", "Lotus Herbals"],
  ["Lotus Radiant Glow", "lotus-radiant-glow", "Lotus Herbals"],
  ["Lotus Wine Facial Kit", "lotus-wine-facial-kit", "Lotus Herbals"],
  ["The Body Care Fruit Facial", "the-body-care-fruit-facial", "The Body Care"],
  ["Sara Apples Facial Kit", "sara-apples-facial-kit", "Sara"],
  ["O+3 Bridal Facial Kit", "o3-bridal-facial-kit", "O+3"],
  ["O+3 Professional Shine & Glow Kit", "o3-professional-shine-glow-kit", "O+3"],
  ["O+3 Salon Facial", "o3-salon-facial", "O+3"],
  [
    "O+3 Professional Bridal Facial Kit – Vitamin C Glowing Skin",
    "o3-professional-bridal-facial-vitamin-c",
    "O+3",
  ],
];

export const servicesData: CatalogueService[] = [
  // —— Skincare ——
  quote("All Types of Facials", "all-types-of-facials", "skincare", "Facials", 1),
  quote("All Types of Clean-ups", "all-types-of-clean-ups", "skincare", "Clean-ups", 2),
  quote("D-Tan Treatment", "d-tan-treatment", "skincare", "D-Tan", 3),
  quote("Bleach Treatment", "bleach-treatment", "skincare", "Bleach", 4),
  ...skincareKits.map(([name, slug, brand], i) =>
    quote(name, slug, "skincare", "Facial Kits", 10 + i, brand)
  ),

  // —— Haircare ——
  ...[
    "Women's Haircut",
    "Hair Trim",
    "Layer Cut",
    "Step Cut",
    "U-Cut / V-Cut",
    "Front Bangs",
  ].map((name, i) =>
    quote(name, `haircut-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, "haircare", "Haircut", 1 + i)
  ),
  ...[
    "Hair Spa",
    "Basic Hair Spa",
    "Deep Conditioning Hair Spa",
    "Anti-Dandruff Hair Spa",
    "Hair Fall Control Spa",
    "Dry & Frizzy Hair Spa",
    "Scalp Nourishment Spa",
  ].map((name, i) =>
    quote(name, `spa-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, "haircare", "Hair Spa", 20 + i)
  ),
  ...[
    "Keratin Treatment",
    "Keratin Treatment – Short Hair",
    "Keratin Treatment – Medium Hair",
    "Keratin Treatment – Long Hair",
    "Keratin Treatment – Extra Long Hair",
    "Hair Botox Treatment",
    "Hair Botox – Short Hair",
    "Hair Botox – Medium Hair",
    "Hair Botox – Long Hair",
    "Hair Botox – Extra Long Hair",
  ].map((name, i) =>
    quote(
      name,
      `treatment-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      "haircare",
      "Hair Treatments",
      40 + i
    )
  ),
  ...[
    "Root Touch-Up",
    "Root Touch-Up – Ammonia Based",
    "Root Touch-Up – Ammonia Free",
    "Root Touch-Up – Global Colour",
    "Grey Hair Coverage",
    "Global Hair Colour",
    "Global Colour – Short Hair",
    "Global Colour – Medium Hair",
    "Global Colour – Long Hair",
    "Global Colour – Extra Long Hair",
  ].map((name, i) =>
    quote(
      name,
      `colour-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      "haircare",
      "Hair Colouring",
      60 + i
    )
  ),

  // —— Body Care ——
  quote("Body Polishing", "body-polishing", "body-care", "Body Treatment", 1),
  quote("Body Massage", "body-massage", "body-care", "Massage", 2),
  quote("Head Massage", "head-massage", "body-care", "Massage", 3),

  // —— Makeup ——
  quote(
    "Makeup Services – Details To Be Confirmed",
    "makeup-services-tbc",
    "makeup",
    "Makeup",
    1
  ),

  // —— Honey Waxing (priced where sheet had values) ——
  priced("Half Legs", "honey-half-legs", "honey-waxing", "Honey Wax – Legs", 249, 149, 20, 1, "Honey Wax", true),
  priced("Full Legs", "honey-full-legs", "honey-waxing", "Honey Wax – Legs", 399, 299, 30, 2, "Honey Wax", true),
  priced("Full Front", "honey-full-front", "honey-waxing", "Honey Wax – Front & Body Back", 299, 249, 30, 3),
  priced("Half Front", "honey-half-front", "honey-waxing", "Honey Wax – Front & Body Back", 400, 200, 35, 4),
  priced("Stomach", "honey-stomach", "honey-waxing", "Honey Wax – Front & Body Back", 299, 249, 30, 5),
  priced("Buttocks", "honey-buttocks", "honey-waxing", "Honey Wax – Front & Body Back", 349, 249, 25, 6),
  priced("Full Face", "honey-full-face", "honey-waxing", "Honey Wax – Face", 299, 249, 35, 7, "Honey Wax", true),
  priced("Side Locks", "honey-side-locks", "honey-waxing", "Honey Wax – Face", 200, 100, 20, 8),
  priced("Upper Lip", "honey-upper-lip", "honey-waxing", "Honey Wax – Face", 80, 40, 20, 9),
  priced("Forehead", "honey-forehead", "honey-waxing", "Honey Wax – Face", 80, 40, 15, 10),
  priced("Nose", "honey-nose", "honey-waxing", "Honey Wax – Face", 80, 40, 15, 11),
  priced(
    "Full Body Wax (Excluding Face)",
    "honey-full-body-excluding-face",
    "honey-waxing",
    "Honey Wax – Full Body",
    800,
    549,
    40,
    12,
    "Honey Wax",
    true
  ),
  quote("Bikini Wax", "honey-bikini-wax", "honey-waxing", "Honey Wax – Bikini Waxing", 13, "Honey Wax"),
  priced(
    "Bikini Wax Package (Full Arms + Underarms + Full Legs + Bikini Wax)",
    "honey-bikini-wax-package",
    "honey-waxing",
    "Bikini Wax Package",
    899,
    449,
    50,
    14
  ),
  priced(
    "Bikini Wax Package – Service Details To Be Confirmed",
    "honey-bikini-wax-package-tbc",
    "honey-waxing",
    "Bikini Wax Package",
    1499,
    849,
    60,
    15
  ),

  // —— Rica Waxing ——
  ...[
    ["Full Body Rica Wax", "rica-full-body"],
    ["Bikini Wax", "rica-bikini-wax"],
    ["Buttocks Wax", "rica-buttocks-wax"],
  ].map(([name, slug], i) =>
    quote(name, slug, "rica-waxing", "Rica Wax – Full Body & Bikini", 1 + i, "Rica Wax")
  ),
  ...[
    ["Full Arms with Underarms", "rica-full-arms-with-underarms"],
    ["Half Arms Without Underarms", "rica-half-arms-without-underarms"],
    ["Full Arms Without Underarms", "rica-full-arms-without-underarms"],
    ["Underarms", "rica-underarms"],
  ].map(([name, slug], i) =>
    quote(name, slug, "rica-waxing", "Rica Wax – Arms & Underarms", 10 + i, "Rica Wax")
  ),
  ...[
    ["Full Legs", "rica-full-legs"],
    ["Half Legs", "rica-half-legs"],
  ].map(([name, slug], i) =>
    quote(name, slug, "rica-waxing", "Rica Wax – Legs", 20 + i, "Rica Wax")
  ),
  ...[
    ["Full Back", "rica-full-back"],
    ["Half Back", "rica-half-back"],
    ["Full Front", "rica-full-front"],
    ["Half Front", "rica-half-front"],
    ["Stomach", "rica-stomach"],
  ].map(([name, slug], i) =>
    quote(name, slug, "rica-waxing", "Rica Wax – Front & Back Body", 30 + i, "Rica Wax")
  ),
];
