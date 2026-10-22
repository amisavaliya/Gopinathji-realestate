import { prisma } from './prisma'

export async function getSchemeDetails(slug: string) {
  const scheme = await prisma.scheme.findUnique({
    where: { slug },
    include: { amenities: { include: { amenity: true } } },
  })
  if (!scheme) return { error: 'Scheme not found' }
  return {
    name: scheme.nameEn,
    tagline: scheme.taglineEn,
    status: scheme.status,
    developer: scheme.developer,
    architect: scheme.architect,
    address: scheme.addressEn,
    totalPlots: scheme.totalPlots,
    amenities: scheme.amenities.map((a) => a.amenity.labelEn),
  }
}

export async function getPlotAvailability(slug: string) {
  const plots = await prisma.plot.findMany({ where: { schemeSlug: slug } })
  const available = plots.filter((p) => p.status === 'AVAILABLE')
  const sizes = [...new Set(plots.map((p) => p.sqYard))]
  return {
    totalPlots: plots.length,
    availableCount: available.length,
    availablePlotNumbers: available.map((p) => p.number),
    sizesOffered: sizes,
  }
}
