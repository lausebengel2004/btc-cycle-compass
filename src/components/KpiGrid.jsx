import { KpiCard } from './KpiCard.jsx'

export function KpiGrid({ items }) {
  return (
    <section className="kpi-section" aria-label="Kennzahlen">
      {items.map((item) => (
        <KpiCard key={item.label} label={item.label} value={item.value} />
      ))}
    </section>
  )
}
