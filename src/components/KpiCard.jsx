export function KpiCard({ label, value, detail }) {
  return (
    <article className="kpi-card">
      <span>{label}</span>
      <div>
        <strong>{value}</strong>
        {detail ? <small>{detail}</small> : null}
      </div>
    </article>
  )
}
