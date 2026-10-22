import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Story | Gopinathji Group',
  description: 'A Surat family business building homes, plots and industrial land since 1996.',
}

const MILESTONES = [
  { year: '1996', title: 'Founded in Surat', text: 'Kantibhai and Rameshbhai start the group with residential construction in the city.' },
  { year: 'Growth', title: 'Into industrial land', text: 'Industrial plots on the Surat–Navsari corridor open a new segment for the group.' },
  { year: 'Today', title: 'The next generation', text: 'Towers in Mota Varachha and Kosad, plotting schemes, and Gopinath Eco Park on the way.' },
]

const PARTNERS = [
  ['Polygon Design Studio', 'Architect & design consultant'],
  ['Shree Nivas Corporation', 'Architect & passing consultant'],
  ['Sangani Consultant', 'Structural engineer'],
  ['Technocrat Consultant', 'Structural engineer'],
  ['Maruti Corp', 'Developer, Harikrushna Sky'],
  ['Manmohan Enterprise', 'Developer, Nand Heights'],
  ['Nar Narayan Enterprise', 'Developer, Shree Hari Sky'],
  ['Siddheshvar Infra', 'Developer, Maruti Industrial Estate'],
]

export default function AboutPage() {
  return (
    <main>
      <section className="page-head">
        <div className="projects-eyebrow">About us</div>
        <h1>Three generations, one name</h1>
        <p>A Surat family business that has grown from one partnership into a portfolio of homes, plots and industrial land.</p>
      </section>

      <section className="page-section prose">
        <div className="projects-eyebrow">Our story</div>
        <p className="prose-intro">Gopinathji Group was founded in Surat in 1996 by Kantibhai and Rameshbhai Savaliya.</p>
        <p>What began as a two-person partnership is today run by the second generation, with the third now joining the business. Every role sits with a family member: land and deals, sales and customers, documentation and banking.</p>
        <p>Our longest-standing supplier and our longest-serving site staff have been with us for decades. We build across four segments: high-rise residential flats, gated residential plots, industrial plots and ground-floor commercial units within our towers.</p>
        <Link href="/vision" className="hero-cta">Vision &amp; mission</Link>
      </section>

      <section className="page-section">
        <div className="projects-eyebrow">Milestones</div>
        <h2 className="page-subheading">How we have grown</h2>
        <div className="milestones">
          {MILESTONES.map((m) => (
            <div key={m.year} className="milestone">
              <span className="milestone-year">{m.year}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="projects-eyebrow">Project partners</div>
        <h2 className="page-subheading">The teams we build with</h2>
        <div className="partners">
          {PARTNERS.map(([name, role]) => (
            <div key={name} className="partner">
              <strong>{name}</strong>
              <span>{role}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Link href="/#projects" className="brochure-link" style={{ background: 'var(--gold-deep)' }}>See our projects</Link>
      </section>
    </main>
  )
}