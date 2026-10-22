// Source data for the seed script (prisma/seed.ts).
// Replace the placeholder values (image paths, phones, addresses, plot areas)
// with your real content. The SHAPE must stay the same — the seed reads these
// exact fields.

type Bilingual = { gu: string; en: string };

export type Amenity = {
  key: string;
  label: Bilingual;
  icon: string; // icon name/id used by the frontend
};

export type AreaRow = {
  plots: string; // "6-30" (range) or "31" (single) — expanded by the seed
  sqYard: number;
};

export type Scheme = {
  slug: string; // primary key — url-safe, unique
  name: Bilingual;
  tagline: Bilingual;
  
  status: "ongoing" | "completed";
  developer: string;
  architect?: string;
  address: Bilingual;
  surveyRef: string;
  mapsUrl?: string;
  phones: string[];
  totalPlots: number;
  amenityKeys: string[]; // must reference keys in AMENITIES
  images: {
    cover: string;
    layoutPlan: string;
    locationMap: string;
    gate?: string;
    aerial?: string;
  };
  brochurePdf: string;
  areaTable?: AreaRow[]; // only schemes with a published plot table
};

// ── Amenities (shared across schemes) ───────────────────────────────────────
export const AMENITIES: Amenity[] = [
  { key: "gated",       label: { gu: "ગેટેડ કમ્યુનિટી", en: "Gated Community" },      icon: "gate" },
  { key: "garden",      label: { gu: "બગીચો",            en: "Garden" },               icon: "tree" },
  { key: "cctv",        label: { gu: "સીસીટીવી",         en: "CCTV Surveillance" },     icon: "camera" },
  { key: "water",       label: { gu: "24 કલાક પાણી",     en: "24hr Water Supply" },     icon: "droplet" },
  { key: "road",        label: { gu: "આરસીસી રોડ",       en: "RCC Roads" },             icon: "road" },
  { key: "streetlight", label: { gu: "સ્ટ્રીટ લાઇટ",     en: "Street Lighting" },       icon: "lamp" },
  { key: "temple",      label: { gu: "મંદિર",            en: "Temple" },                icon: "temple" },
  { key: "playground",  label: { gu: "બાળ ક્રીડાંગણ",    en: "Children's Playground" }, icon: "swing" },
];

// ── Schemes ─────────────────────────────────────────────────────────────────
export const schemes: Scheme[] = [
  {
    slug: "radharaman-bungalows",
    name: { gu: "રાધારમણ બંગ્લોઝ", en: "Radharaman Bungalows" },
    tagline: { gu: "તમારા સપનાનું ઘર", en: "The home of your dreams" },
    status: "ongoing",
    developer: "Gopinathji Developers",
    architect: "TODO Architect",
    address: {
      gu: "TODO સરનામું, ગુજરાત",
      en: "TODO Address, Gujarat",
    },
    surveyRef: "TODO Survey No.",
    mapsUrl: "",
    phones: ["+91 00000 00000"],
    areaTable: [
  { plots: "1-25", sqYard: 150 },
  { plots: "26-30", sqYard: 200 },
],
    totalPlots: 0, // TODO
    amenityKeys: ["gated", "garden", "cctv", "water", "road", "streetlight"],
    
    images: {
      cover: "/images/radharaman-bungalows/cover.jpg",
      layoutPlan: "/images/radharaman-bungalows/layout-plan.jpg",
      locationMap: "/images/radharaman-bungalows/location-map.jpg",
      // gate photo not supplied yet — add gate.jpg to public/images/radharaman-bungalows/
      // and set this back once it exists.
    },
    brochurePdf: "/brochures/radharaman-bungalows.pdf",
  },
  {
    slug: "shyam-sundar",
    name: { gu: "શ્યામ સુંદર", en: "Shyam Sundar" },
    tagline: { gu: "શાંતિ અને સમૃદ્ધિ", en: "Peace and prosperity" },
    status: "completed",
    developer: "Gopinathji Developers",
    architect: "TODO Architect",
    address: {
      gu: "TODO સરનામું, ગુજરાત",
      en: "TODO Address, Gujarat",
    },
    surveyRef: "TODO Survey No.",
    mapsUrl: "",
    phones: ["+91 00000 00000"],
    totalPlots: 30, // TODO — should match the area table below
    amenityKeys: ["gated", "garden", "temple", "water", "road", "playground"],
    images: {
      cover: "/images/shyam-sundar/cover.jpg",
      layoutPlan: "/images/shyam-sundar/layout-plan.jpg",
      locationMap: "/images/shyam-sundar/location-map.jpg",
      aerial: "/images/shyam-sundar/aerial.jpg",
    },
    brochurePdf: "/brochures/shyam-sundar.pdf",
    // Published area table — the seed expands "1-25" into plots 1..25, etc.
    areaTable: [
      { plots: "1-25", sqYard: 150 },
      { plots: "26-30", sqYard: 200 },
    ],
  },
];
