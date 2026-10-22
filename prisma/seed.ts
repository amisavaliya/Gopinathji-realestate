import { PrismaClient, MediaKind, SchemeStatus, ProjectType } from "@prisma/client";
import { AMENITIES, schemes as baseSchemes } from "../data/schemes";
import { MORE_AMENITIES, moreProjects } from "../data/moreProjects";

const prisma = new PrismaClient();

// Old two schemes + the six new projects, in one list
const allAmenities = [...AMENITIES, ...MORE_AMENITIES];
const schemes: any[] = [...baseSchemes, ...moreProjects];

const STATUS: Record<string, SchemeStatus> = {
  ongoing: SchemeStatus.ONGOING,
  completed: SchemeStatus.COMPLETED,
  upcoming: SchemeStatus.UPCOMING,
};
const ACCENT: Record<string, string> = {
  "radharaman-bungalows": "#1F4D3A",
  "gopinath-sky": "#1F2A5C",
  "harikrushna-sky": "#A9793C",
  "nand-heights": "#5A4E54",
  "shree-hari-sky": "#B8672E",
  "maruti-industrial-estate": "#3E4A55",
  "gopinath-eco-park": "#2F6B3F",
};

async function main() {
  // 1. Amenities — shared across schemes
  for (const a of allAmenities) {
    await prisma.amenity.upsert({
      where: { key: a.key },
      update: { labelGu: a.label.gu, labelEn: a.label.en, icon: a.icon },
      create: {
        key: a.key,
        labelGu: a.label.gu,
        labelEn: a.label.en,
        icon: a.icon,
      },
    });
  }
  console.log(`Seeded ${allAmenities.length} amenities`);

  // 2. Schemes
  for (const [index, s] of schemes.entries()) {
    const schemeFields = {
      nameGu: s.name.gu,
      nameEn: s.name.en,
      taglineGu: s.tagline.gu,
      taglineEn: s.tagline.en,
      descriptionEn: s.descriptionEn ?? null,
      status: STATUS[s.status],
      type: ((s.type ?? "RESIDENTIAL_PLOTS") as ProjectType),
      configuration: s.configuration ?? null,
      towers: s.towers ?? null,
      floorsLabel: s.floorsLabel ?? null,
      reraNumber: s.reraNumber ?? null,
      developer: s.developer,
      architect: s.architect,
      addressGu: s.address.gu,
      addressEn: s.address.en,
      surveyRef: s.surveyRef ?? null,
      mapsUrl: s.mapsUrl || null,
      phones: s.phones,
      totalPlots: s.totalPlots,
      accentColor: ACCENT[s.slug] ?? "#7C5726",
      published: true,
      sortOrder: index,
    };
    await prisma.scheme.upsert({
      where: { slug: s.slug },
      update: schemeFields,
      create: { slug: s.slug, ...schemeFields },
    });

    // Amenity links
    for (const [i, key] of s.amenityKeys.entries()) {
      await prisma.schemeAmenity.upsert({
        where: {
          schemeSlug_amenityKey: { schemeSlug: s.slug, amenityKey: key },
        },
        update: { sortOrder: i },
        create: { schemeSlug: s.slug, amenityKey: key, sortOrder: i },
      });
    }

    // Media — only seed what exists on the scheme
    const media: { kind: MediaKind; url: string }[] = [];
    if (s.images.cover) media.push({ kind: "COVER", url: s.images.cover });
    if (s.images.layoutPlan) media.push({ kind: "LAYOUT_PLAN", url: s.images.layoutPlan });
    if (s.images.locationMap) media.push({ kind: "LOCATION_MAP", url: s.images.locationMap });
    if (s.brochurePdf) media.push({ kind: "BROCHURE_PDF", url: s.brochurePdf });
    if (s.images.gate) media.push({ kind: "GATE", url: s.images.gate });
    if (s.images.aerial) media.push({ kind: "AERIAL", url: s.images.aerial });

    for (const [i, m] of media.entries()) {
      const existing = await prisma.media.findFirst({
        where: { schemeSlug: s.slug, kind: m.kind },
      });
      if (!existing) {
        await prisma.media.create({
          data: {
            schemeSlug: s.slug,
            kind: m.kind,
            url: m.url,
            sortOrder: i,
            bytes: 0, // real value gets written by the upload flow later
          },
        });
      }
    }

    // Plots — Shyam Sundar has a published area table
    if (s.areaTable) {
      for (const row of s.areaTable) {
        const numbers = expandPlotRange(row.plots);
        for (const number of numbers) {
          await prisma.plot.upsert({
            where: { schemeSlug_number: { schemeSlug: s.slug, number } },
            update: {},
            create: {
              schemeSlug: s.slug,
              number,
              sqYard: row.sqYard,
              status: "AVAILABLE",
            },
          });
        }
      }
    }

    console.log(`Seeded scheme: ${s.name.en}`);
  }
}

/** Turns "6–30" into ["6","7",...,"30"], and "31" into ["31"]. */
function expandPlotRange(spec: string): string[] {
  const match = spec.match(/^(\d+)\s*[–-]\s*(\d+)$/);
  if (!match) return [spec.trim()];
  const start = Number(match[1]);
  const end = Number(match[2]);
  return Array.from({ length: end - start + 1 }, (_, i) => String(start + i));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });