// New Gopinathji Group projects. Facts come from the brochures.
// Anything marked TODO was NOT in the brochure pages I could read — fill it in.

export type ProjectKind = "RESIDENTIAL_PLOTS" | "RESIDENTIAL_FLATS" | "INDUSTRIAL_PLOTS";

export type MoreProject = {
  slug: string;
  type: ProjectKind;
  name: { gu: string; en: string };
  tagline: { gu: string; en: string };
  descriptionEn?: string;
  status: "ongoing" | "completed" | "upcoming";
  developer: string;
  architect?: string;
  address: { gu: string; en: string };
  mapsUrl?: string;
  phones: string[];
  totalPlots: number; // 0 for flat projects
  configuration?: string; // e.g. "2 & 3 BHK"
  towers?: number;
  floorsLabel?: string;
  reraNumber?: string;
  amenityKeys: string[];
  images: { cover?: string; layoutPlan?: string; locationMap?: string };
  brochurePdf?: string;
  areaTable?: { plots: string; sqYard: number }[];
};

// Extra amenities (added to the existing AMENITIES list by the seed)
export const MORE_AMENITIES = [
  { key: "security",   label: { gu: "સિક્યોરિટી કેબિન", en: "Security Cabin" },            icon: "shield" },
  { key: "gazebo",     label: { gu: "ગેઝેબો", en: "Gazebo" },                               icon: "gazebo" },
  { key: "seniors",    label: { gu: "સિનિયર સિટીઝન એરિયા", en: "Senior Citizen Area" },    icon: "bench" },
  { key: "parking",    label: { gu: "બેઝમેન્ટ પાર્કિંગ", en: "Basement Parking" },         icon: "car" },
  { key: "reception",  label: { gu: "રિસેપ્શન લોબી", en: "Reception Lobby" },              icon: "lobby" },
  { key: "walkway",    label: { gu: "વૉકિંગ પાથ", en: "Walking Path" },                    icon: "walk" },
  { key: "compound",   label: { gu: "કમ્પાઉન્ડ વોલ", en: "Compound Wall" },                icon: "wall" },
  { key: "lift",       label: { gu: "લિફ્ટ", en: "Lift" },                                 icon: "lift" },
  { key: "drainage",   label: { gu: "ડ્રેનેજ કનેક્શન", en: "Drainage Connection" },        icon: "pipe" },
  { key: "power",      label: { gu: "અંડરગ્રાઉન્ડ GEB કનેક્શન", en: "Underground GEB Connection" }, icon: "bolt" },
  { key: "cleartitle", label: { gu: "NA ટાઇટલ ક્લિયર", en: "NA, Clear Title" },           icon: "doc" },
];

export const moreProjects: MoreProject[] = [
  {
    slug: "gopinath-sky",
    type: "RESIDENTIAL_FLATS",
    name: { gu: "ગોપીનાથ સ્કાય", en: "Gopinath Sky" },
    tagline: { gu: "લક્ઝરી લિવિંગ", en: "Luxury Living" },
    descriptionEn: "Twin towers facing a landscaped central garden. Every 3 BHK home has a wide balcony, a separate kitchen-dining space and a foyer, with four homes on each floor around a lift lobby.",
    status: "ongoing",
    developer: "Gopinathji Group",
    address: { gu: "સુરત, ગુજરાત", en: "Surat, Gujarat" },
    phones: ["+91 98252 20052"],
    totalPlots: 0,
    configuration: "3 BHK", // TODO confirm
    towers: 2,
    amenityKeys: ["compound", "gated", "security", "cctv", "road", "streetlight", "garden", "gazebo", "seniors", "parking", "reception", "water"],
    images: { cover: "/images/gopinath-sky/cover.jpg", layoutPlan: "/images/gopinath-sky/layout-plan.jpg" },
    brochurePdf: "/brochures/gopinath-sky.pdf",
  },
  {
    slug: "harikrushna-sky",
    type: "RESIDENTIAL_FLATS",
    name: { gu: "હરિકૃષ્ણ સ્કાય", en: "Harikrushna Sky" },
    tagline: { gu: "2 & 3 BHK અફોર્ડેબલ લક્ઝરી ફ્લેટ્સ", en: "2 & 3 BHK Affordable Luxury Flats" },
    descriptionEn: "Three towers on New Ring Road for residents who value a well-planned life: sound construction, harmonious colour, wide roads and open sky. Shops line the ground floor along the main road.",
    status: "ongoing",
    developer: "Maruti Corp",
    architect: "Polygon Design Studio, Adajan, Surat",
    address: {
      gu: "દુખિયા દરબાર જંક્શન, ન્યૂ રિંગ રોડ, મોટા વરાછા, સુરત 394101",
      en: "Dukhiyara Darbar Junction, New Ring Road, Mota Varachha, Surat 394101",
    },
    phones: ["+91 99792 51027"],
    totalPlots: 0,
    configuration: "2 & 3 BHK",
    towers: 3,
    reraNumber: "PR/GJ/SURAT/SURAT CITY/Surat Municipal Corporation/MAA12997/200224/311230", // verify against brochure
    amenityKeys: ["gated", "garden", "parking", "lift", "cctv"], // TODO verify
    images: { cover: "/images/harikrushna-sky/cover.jpg", layoutPlan: "/images/harikrushna-sky/layout-plan.jpg", locationMap: "/images/harikrushna-sky/location-map.jpg" },
    brochurePdf: "/brochures/harikrushna-sky.pdf",
  },
  {
    slug: "nand-heights",
    type: "RESIDENTIAL_FLATS",
    name: { gu: "નંદ હાઇટ્સ", en: "Nand Heights" },
    tagline: { gu: "2 & 3 BHK ફ્લેટ્સ", en: "2 & 3 BHK Flats" },
    descriptionEn: "Six towers inside one secure campus, with CCTV, a landscaped garden, a gazebo and a walking path. A complete package for safety, healthy living and easy movement.",
    status: "ongoing",
    developer: "Manmohan Enterprise",
    address: { gu: "TP 86, FP 131/B, સિલ્વાસા બંગ્લોઝ પાછળ, કોસાડ, સુરત", en: "TP 86, FP 131/B, Behind Silvassa Bungalows, Kosad, Surat" },
    phones: ["+91 98252 20052"],
    totalPlots: 0,
    configuration: "2 & 3 BHK",
    towers: 6,
    floorsLabel: "Ground + 13",
    amenityKeys: ["gated", "security", "cctv", "garden", "gazebo", "walkway", "playground", "parking"], // TODO verify
    images: { cover: "/images/nand-heights/cover.jpg", layoutPlan: "/images/nand-heights/layout-plan.jpg", locationMap: "/images/nand-heights/location-map.jpg" },
    brochurePdf: "/brochures/nand-heights.pdf",
  },
  {
    slug: "shree-hari-sky",
    type: "RESIDENTIAL_FLATS",
    name: { gu: "શ્રી હરિ સ્કાય", en: "Shree Hari Sky" },
    tagline: { gu: "2-BHK લક્ઝરિયસ લિવિંગ", en: "2-BHK Luxurious Living" },
    descriptionEn: "A new address for happiness. Two wings of 2 BHK homes with a reception foyer, a garden and a children's play area, a short walk from Aspire School.",
    status: "ongoing",
    developer: "Nar Narayan Enterprise",
    address: {
      gu: "સિલ્વાસા બંગલોની બાજુમાં, એસ્પાયર સ્કૂલ પાસે, મોટા વરાછા, સુરત",
      en: "Beside Silvasa Bungalow, Nr Aspire School, Mota Varachha, Surat",
    },
    phones: ["+91 79901 26041"],
    totalPlots: 0,
    configuration: "2 BHK",
    towers: 2,
    reraNumber: "PR/GJ/SURAT/SURAT CITY/Surat Municipal Corporation/RAA14799/100225/300628",
    amenityKeys: ["gated", "security", "cctv", "reception", "garden", "road", "streetlight", "parking"],
    images: { cover: "/images/shree-hari-sky/cover.jpg", layoutPlan: "/images/shree-hari-sky/layout-plan.jpg" },
    brochurePdf: "/brochures/shree-hari-sky.pdf",
  },
  {
    slug: "maruti-industrial-estate",
    type: "INDUSTRIAL_PLOTS",
    name: { gu: "મારુતિ ઇન્ડસ્ટ્રિયલ એસ્ટેટ", en: "Maruti Industrial Estate" },
    tagline: { gu: "ઔદ્યોગિક પ્લોટ્સ", en: "Industrial plots, ready to build" },
    descriptionEn: "60 industrial plots, five minutes from Sachin and the GIDC area and 200 metres from the Surat–Navsari main road. NA, title-clear land with a 40' wide road, RCC road, drainage and underground GEB connection.",
    status: "ongoing",
    developer: "Siddheshvar Infra",
    architect: "Polygon Design Studio, Surat",
    address: {
      gu: "નાયરા પેટ્રોલ પંપ પાસે, સુરત-નવસારી રોડ, લાજપોર",
      en: "Nr. Nayara Petrol Pump, Surat-Navsari Road, Lajpore",
    },
    phones: ["+91 89800 22344", "+91 98251 81877"],
    totalPlots: 60,
    amenityKeys: ["gated", "road", "drainage", "power", "garden", "cleartitle"],
    images: { cover: "/images/maruti-industrial-estate/cover.jpg", locationMap: "/images/maruti-industrial-estate/location-map.jpg" },
    brochurePdf: "/brochures/maruti-industrial-estate.pdf",
    // Plots 1–60 exist, but the brochure has no per-plot sizes (average 21'x100' and 21'x80').
    // Add an areaTable here when you have them.
  },
  {
    slug: "gopinath-eco-park",
    type: "RESIDENTIAL_PLOTS",
    name: { gu: "ગોપીનાથ ઇકો પાર્ક", en: "Gopinath Eco Park" },
    tagline: { gu: "ટૂંક સમયમાં આવી રહ્યું છે", en: "Coming soon" },
    descriptionEn: "Our upcoming plotting scheme: 39 large plots of about 504 to 801 sq. yd., planned around three green common plots and served by 12 m wide internal roads off an 18 m approach road.",
    status: "upcoming",
    developer: "Gopinathji Group",
    address: { gu: "સુરત. સાઇટની વિગતો પૂછપરછ પર", en: "Surat. Site details shared on enquiry." },
    phones: ["+91 98252 20052"],
    totalPlots: 39,
    amenityKeys: ["road", "garden"],
    images: { cover: "/images/gopinath-eco-park/cover.jpg", layoutPlan: "/images/gopinath-eco-park/layout-plan.jpg" },
    brochurePdf: "/brochures/gopinath-eco-park.pdf",
    // sq yd per plot, from the brochure layout
    areaTable: [
      ["1", 801.45], ["2", 545.95], ["3", 551.56], ["4", 557.18], ["5", 562.72], ["6", 568.26],
      ["7", 573.81], ["8", 577.62], ["9", 575.70], ["10", 573.36], ["11", 570.96], ["12", 568.56],
      ["13", 566.22], ["14", 564.25], ["15", 660.23], ["16", 526.34], ["17", 550.68], ["18", 566.94],
      ["19", 583.22], ["20", 599.40], ["21", 526.34], ["22", 504.20], ["23", 555.72], ["24", 555.72],
      ["25", 555.72], ["26", 555.72], ["27", 546.46], ["28", 546.46], ["29", 555.72], ["30", 555.72],
      ["31", 555.72], ["32", 555.72], ["33", 531.01], ["34", 668.35], ["35", 698.95], ["36", 713.32],
      ["37", 727.76], ["38", 742.20], ["39", 745.06],
    ].map(([plots, sqYard]) => ({ plots: plots as string, sqYard: sqYard as number })),
  },
];
