const legendItems = [
  { label: 'Kurslinie', description: 'historische BTC-Beispieldaten', marker: 'line' },
  { label: 'Punkte', description: 'einzelne Jahreswerte der lokalen Datenreihe', marker: 'point' },
  { label: 'Vertikale Linien', description: 'Bitcoin-Halving-Ereignisse', marker: 'halving' },
  {
    label: 'Hintergrundzonen',
    description: 'Halving-Kontextbereiche',
    marker: 'zone',
  },
]

export function ChartLegend() {
  return (
    <section className="chart-legend" aria-label="Chart-Legende und Datenhinweis">
      <div className="chart-legend__items">
        {legendItems.map((item) => (
          <div className="chart-legend__item" key={item.label}>
            <span
              className={`chart-legend__marker chart-legend__marker--${item.marker}`}
              aria-hidden="true"
            />
            <span>
              <strong>{item.label}</strong> = {item.description}
            </span>
          </div>
        ))}
      </div>
      <p className="chart-legend__note">
        Aktuell verwendet diese Ansicht lokale Beispieldaten. Die Darstellung
        dient der methodischen Visualisierung des Bitcoin-4-Jahres-Zyklus und
        ist keine Live-Kursquelle.
      </p>
    </section>
  )
}
