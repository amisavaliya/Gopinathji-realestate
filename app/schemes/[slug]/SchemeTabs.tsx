'use client'

import { useState } from 'react'
import { AmenityIcon } from '../../icons'

export default function SchemeTabs({ scheme, accentColor }: { scheme: any; accentColor: string }) {
  const [tab, setTab] = useState<'overview' | 'amenities' | 'location'>('overview')

  const layoutPlan = scheme.media.find((m: any) => m.kind === 'LAYOUT_PLAN')
  const locationMap = scheme.media.find((m: any) => m.kind === 'LOCATION_MAP')

  const plotCounts = { AVAILABLE: 0, RESERVED: 0, SOLD: 0 } as Record<string, number>
  for (const p of scheme.plots) plotCounts[p.status] = (plotCounts[p.status] ?? 0) + 1

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'amenities', label: 'Amenities' },
    { key: 'location', label: 'Location' },
  ] as const

  return (
    <section className="section">
      <div className="tabs-row">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={`tab-button ${tab === t.key ? 'active' : ''}`}
            style={tab === t.key ? { background: accentColor, color: '#fff', borderColor: accentColor } : {}}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="tab-panel">
        {tab === 'overview' && (
          scheme.plots.length > 0 ? (
            <>
              <div className="plot-stats">
                {plotCounts.AVAILABLE > 0 && <span className="plot-stat plot-stat-available"><span className="count">{plotCounts.AVAILABLE}</span>Available</span>}
                {plotCounts.RESERVED > 0 && <span className="plot-stat"><span className="count">{plotCounts.RESERVED}</span>Reserved</span>}
                {plotCounts.SOLD > 0 && <span className="plot-stat"><span className="count">{plotCounts.SOLD}</span>Sold</span>}
              </div>
              <table className="plot-table">
                <thead><tr><th>Plot</th><th>Size</th><th>Status</th></tr></thead>
                <tbody>
                  {scheme.plots.map((p: any) => (
                    <tr key={p.id}>
                      <td>{p.number}</td>
                      <td>{p.sqYard} sq yd</td>
                      <td><span className={`status-pill ${p.status.toLowerCase()}`}>{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {layoutPlan && (
                <div style={{ marginTop: '2rem' }}>
                  <h3>Layout plan</h3>
                  <img src={layoutPlan.url} alt="Layout plan" className="plan-image" />
                </div>
              )}
            </>
          ) : layoutPlan ? (
            <img src={layoutPlan.url} alt="Layout plan" className="plan-image" />
          ) : (
            <p>Plot details coming soon.</p>
          )
        )}

        {tab === 'amenities' && (
          <ul className="amenity-grid">
            {scheme.amenities.map((sa: any) => (
              <li key={sa.amenityKey}>
                <AmenityIcon name={sa.amenity.icon} className="amenity-icon" />
                {sa.amenity.labelEn}
              </li>
            ))}
          </ul>
        )}

        {tab === 'location' && (
          locationMap ? (
            <img src={locationMap.url} alt="Location map" className="plan-image" />
          ) : (
            <p>Location map coming soon.</p>
          )
        )}
      </div>
    </section>
  )
}
