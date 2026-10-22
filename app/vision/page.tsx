import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vision & Mission | Gopinathji Group',
  description: 'What guides every project that carries the Gopinathji name.',
}

const MISSION = [
  "Deliver well-planned flats and plots at honest prices in Surat's growing neighbourhoods.",
  'Keep every title clear and every approval in order before we sell.',
  'Grow into industrial land to support local manufacturing and jobs.',
  'Run the business with structure and good governance as the next generation takes over.',
]

const VALUES = [
  ['Ethics first', 'Fair dealing with every buyer, partner and supplier matters more than the margin on a deal.'],
  ['People over profit', 'Staff and suppliers are treated as family. Many have been with us for decades.'],
  ['Built to last', 'RCC frame structures, planned drainage and underground cabling come as standard.'],
]

const NUMERALS = ['i.', 'ii.', 'iii.', 'iv.']

export default function VisionPage() {
  return (
    <main>
      <section className="page-head">
        <div className="projects-eyebrow"><Link href="/about">About us</Link> / Vision &amp; mission</div>
        <h1>Vision &amp; Mission</h1>
        <p>What guides every project that carries the Gopinathji name.</p>
      </section>

      <section className="page-section prose">
        <div className="projects-eyebrow">Our vision</div>
        <p className="prose-quote">“Better lives for every family we build for, and our own.”</p>
        <p>We want every family that buys from us to own a home or plot they are proud of and can pass on. Success for us means giving families the best life possible. Ethics and people come before the size of a deal, and we have no plans to ever sell the business.</p>
      </section>

      <section className="page-section">
        <div className="projects-eyebrow">Our mission</div>
        <h2 className="page-subheading">How we get there</h2>
        <ul className="mission-list">
          {MISSION.map((m, i) => (
            <li key={i}><span>{NUMERALS[i]}</span>{m}</li>
          ))}
        </ul>
      </section>

      <section className="page-section">
        <div className="projects-eyebrow">Our values</div>
        <h2 className="page-subheading">What we will not compromise on</h2>
        <div className="milestones">
          {VALUES.map(([t, d]) => (
            <div key={t} className="milestone">
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}