import Link from 'next/link'
import type { Metadata } from 'next'
import { prisma } from '../../../lib/prisma'
import SchemeTabs from './SchemeTabs'

const BADGES: Record<string, string> = {
  ONGOING: 'Ongoing',
  COMPLETED: 'Completed',
  UPCOMING: 'Coming soon',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const s = await prisma.scheme.findUnique({ where: { slug }, select: { nameEn: true, taglineEn: true } })
  if (!s) return { title: 'Project not found | Gopinathji Group' }
  return { title: `${s.nameEn} | Gopinathji Group`, description: s.taglineEn ?? undefined }
}

export default async function SchemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scheme = await prisma.scheme.findUnique({
    where: { slug },
    include: { plots: true, amenities: { include: { amenity: true } }, media: true },
  })

  if (!scheme) {
    return (
      <main className="not-found">
        <h1>Project not found</h1>
        <p>We could not find that project.</p>
        <Link href="/" className="hero-cta">Back to home</Link>
      </main>
    )
  }

  const cover = scheme.media.find((m) => m.kind === 'COVER')
  const brochure = scheme.media.find((m) => m.kind === 'BROCHURE_PDF')
  const isPlots = scheme.type !== 'RESIDENTIAL_FLATS'

  return (
    <main>
      <section className="hero hero--scheme">
        {cover && <img src={cover.url} alt={scheme.nameEn} className="hero-bg" />}
        <div className="hero-scrim" />
        <div className="hero-copy">
          <span className="scheme-status-badge" style={{ background: scheme.accentColor }}>
            {BADGES[scheme.status] ?? 'Ongoing'}
          </span>
          <h1 className="gu">{scheme.nameGu}</h1>
          <div className="estate-name-en" style={{ color: 'rgba(255,255,255,0.75)' }}>{scheme.nameEn}</div>
          <p>{scheme.taglineEn}</p>
          <div className="hero-actions">
            {brochure && <a href={brochure.url} target="_blank" className="hero-cta">Download brochure</a>}
            {scheme.phones[0] && <a href={`tel:${scheme.phones[0]}`} className="hero-cta hero-cta-ghost">Call {scheme.phones[0]}</a>}
          </div>
        </div>
      </section>

      <div className="facts-strip">
        <div className="fact"><span className="fact-label">Developer</span><span className="fact-value">{scheme.developer}</span></div>
        {scheme.architect && <div className="fact"><span className="fact-label">Architect</span><span className="fact-value">{scheme.architect}</span></div>}
        {scheme.configuration && <div className="fact"><span className="fact-label">Configuration</span><span className="fact-value">{scheme.configuration}</span></div>}
        {scheme.towers && <div className="fact"><span className="fact-label">Towers</span><span className="fact-value">{scheme.towers}</span></div>}
        {scheme.floorsLabel && <div className="fact"><span className="fact-label">Floors</span><span className="fact-value">{scheme.floorsLabel}</span></div>}
        {isPlots && scheme.totalPlots > 0 && <div className="fact"><span className="fact-label">Total plots</span><span className="fact-value">{scheme.totalPlots}</span></div>}
        {scheme.surveyRef && <div className="fact"><span className="fact-label">Survey no.</span><span className="fact-value">{scheme.surveyRef}</span></div>}
        {scheme.reraNumber && <div className="fact fact-wide"><span className="fact-label">RERA</span><span className="fact-value">{scheme.reraNumber}</span></div>}
        <div className="fact fact-wide">
          <span className="fact-label">Address</span>
          <span className="fact-value">
            {scheme.addressEn}
            {scheme.mapsUrl && <> · <a href={scheme.mapsUrl} target="_blank">Open in Maps</a></>}
          </span>
        </div>
        {scheme.phones.length > 0 && (
          <div className="fact">
            <span className="fact-label">Contact</span>
            <span className="fact-value">
              {scheme.phones.map((ph, i) => (
                <span key={ph}>{i > 0 && ', '}<a href={`tel:${ph}`}>{ph}</a></span>
              ))}
            </span>
          </div>
        )}
      </div>

      <SchemeTabs scheme={scheme} accentColor={scheme.accentColor} />

      {brochure && (
        <section className="section">
          <a href={brochure.url} target="_blank" className="brochure-link" style={{ background: scheme.accentColor }}>Download full brochure</a>
        </section>
      )}
    </main>
  )
}