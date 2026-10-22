import Link from 'next/link'
import { prisma } from '../lib/prisma'
import { Icon } from './icons'

export default async function Home() {
  const schemes = await prisma.scheme.findMany({ orderBy: { sortOrder: 'asc' }, include: { media: true, plots: true } })
  const heroScheme = schemes.find((s) => s.slug === 'shyam-sundar') ?? schemes[0]
  const heroCover = heroScheme?.media.find((m) => m.kind === 'COVER')

  return (
    <main>
      {heroCover && (
        <section className="hero">
          <img src={heroCover.url} alt="" className="hero-bg" />
          <div className="hero-scrim" />
          <div className="hero-copy">
            <h1>Your home in Mota Varachha, Surat</h1>
            <p>Two gated residential plotting schemes by Gopinathji Group</p>
            <a href="#projects" className="hero-cta">Explore projects</a>
          </div>
        </section>
      )}

      <section className="projects-section" id="projects">
        <div className="projects-eyebrow">Our projects</div>
        <h2 className="projects-heading">Gated residential plots, planned for long-term living</h2>
        <div className="project-grid">
          {schemes.map((s) => {
            const cover = s.media.find((m) => m.kind === 'COVER')
            const availableCount = s.plots.filter((p) => p.status === 'AVAILABLE').length
            return (
              <Link key={s.slug} href={`/schemes/${s.slug}`} className="project-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="project-card-photo">
                  {cover && <img src={cover.url} alt={s.nameEn} />}
                  <span className="project-badge" style={{ background: s.accentColor }}>
                    {s.status === 'ONGOING' ? 'Available' : 'Completed'}
                  </span>
                </div>
                <div className="project-card-body">
                  <span className="project-category" style={{ color: s.accentColor }}>PLOTTING SCHEME</span>
                  <span className="project-title">{s.nameEn}</span>
                  <div className="project-meta-row"><Icon name="pin" /> {s.addressEn.split(',')[0]}</div>
                  {s.plots.length > 0 && (
                    <div className="project-meta-row"><Icon name="ruler" /> {availableCount} of {s.plots.length} plots available</div>
                  )}
                  <div className="project-divider" />
                  <span className="project-more-link" style={{ color: s.accentColor }}>More info <Icon name="arrow-right" /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
